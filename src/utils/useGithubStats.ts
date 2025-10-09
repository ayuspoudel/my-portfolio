export interface RepoStats {
  repo: string
  stars: number
  forks: number
  totalIssues: number
  totalPRs: number
  totalCommits: number
}

export interface AggregatedStats {
  project: string
  stars: number
  forks: number
  totalIssues: number
  totalPRs: number
  totalCommits: number
}

const GITHUB_API_BASE = "https://api.github.com"

async function getSearchCount(query: string, headers: Record<string, string>): Promise<number> {
  const res = await fetch(`${GITHUB_API_BASE}/search/issues?q=${encodeURIComponent(query)}`, { headers })
  if (!res.ok) return 0
  const json = await res.json()
  return json.total_count || 0
}

async function fetchRepoStats(repo: string, headers: Record<string, string>): Promise<RepoStats> {
  try {
    const repoRes = await fetch(`${GITHUB_API_BASE}/repos/${repo}`, { headers })
    const repoData = await repoRes.json()

    const [issuesCount, prsCount] = await Promise.all([
      getSearchCount(`repo:${repo} is:issue`, headers),
      getSearchCount(`repo:${repo} is:pr`, headers)
    ])

    const branchesRes = await fetch(`${GITHUB_API_BASE}/repos/${repo}/branches?per_page=100`, { headers })
    const branches = await branchesRes.json()
    let totalCommits = 0

    for (const branch of Array.isArray(branches) ? branches : []) {
      const commitsRes = await fetch(`${GITHUB_API_BASE}/repos/${repo}/commits?sha=${branch.name}&per_page=1`, { headers })
      const link = commitsRes.headers.get("Link")
      const count = Number(link?.match(/page=(\d+)>; rel="last"/)?.[1])
      if (count && count > 0) totalCommits += count
      else {
        const json = await commitsRes.json()
        totalCommits += Array.isArray(json) ? json.length : 0
      }
    }

    return {
      repo,
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      totalIssues: issuesCount,
      totalPRs: prsCount,
      totalCommits
    }
  } catch {
    return { repo, stars: 0, forks: 0, totalIssues: 0, totalPRs: 0, totalCommits: 0 }
  }
}

export async function fetchGitHubStatsForProjects(
  projects: { name: string; repos: string[] }[],
  token?: string
): Promise<AggregatedStats[]> {
  const headers = token
    ? { Authorization: `token ${token}`, Accept: "application/vnd.github+json" }
    : { Accept: "application/vnd.github+json" }

  const results = await Promise.allSettled(
    projects.map(async (project) => {
      const repoStats = await Promise.allSettled(project.repos.map((r) => fetchRepoStats(r, headers)))
      const validStats = repoStats
        .filter((r) => r.status === "fulfilled")
        .map((r) => (r as PromiseFulfilledResult<RepoStats>).value)
      const totals = validStats.reduce(
        (acc, r) => ({
          stars: acc.stars + r.stars,
          forks: acc.forks + r.forks,
          totalIssues: acc.totalIssues + r.totalIssues,
          totalPRs: acc.totalPRs + r.totalPRs,
          totalCommits: acc.totalCommits + r.totalCommits
        }),
        { stars: 0, forks: 0, totalIssues: 0, totalPRs: 0, totalCommits: 0 }
      )
      return { project: project.name, ...totals }
    })
  )

  return results
    .filter((r) => r.status === "fulfilled")
    .map((r) => (r as PromiseFulfilledResult<AggregatedStats>).value)
}
