import React, { useEffect, useState } from "react"

interface RepoOverviewProps {
  repo: string
}

interface RepoContentItem {
  name: string
  type: "file" | "dir"
  html_url: string
}

interface RepoInfo {
  commitMsg: string
  commitSha: string
  commitCount?: number
  commitDate: string
  contents: RepoContentItem[]
  languages: Record<string, number>
}

export default function RepoOverview({ repo }: RepoOverviewProps) {
  const [data, setData] = useState<RepoInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const token = import.meta.env.VITE_GITHUB_TOKEN

  useEffect(() => {
    async function fetchRepoData() {
      try {
        setLoading(true)
        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/vnd.github.v3+json",
        }

        const contentsRes = await fetch(`https://api.github.com/repos/${repo}/contents`, { headers })
        const contents = (await contentsRes.json().catch(() => [])) || []

        const commitsRes = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, { headers })
        const commits = (await commitsRes.json().catch(() => [])) || []
        const latest = commits[0]
        const commitMsg = latest?.commit?.message ?? "No recent commit"
        const commitSha = latest?.sha?.substring(0, 7) ?? "-"
        const commitDate = latest?.commit?.author?.date
          ? new Date(latest.commit.author.date).toLocaleDateString()
          : "N/A"

        const langRes = await fetch(`https://api.github.com/repos/${repo}/languages`, { headers })
        const languages = (await langRes.json().catch(() => ({}))) || {}

        const commitCount = parseInt(
          commitsRes.headers.get("link")?.match(/page=(\d+)>; rel="last"/)?.[1] ?? "1",
          10
        )

        setData({
          commitMsg,
          commitSha,
          commitCount,
          commitDate,
          contents: Array.isArray(contents)
            ? contents.map((c) => ({
                name: c.name,
                type: c.type,
                html_url: c.html_url,
              }))
            : [],
          languages,
        })
      } catch (err) {
        console.error(err)
        setError("Failed to fetch repository data")
      } finally {
        setLoading(false)
      }
    }

    fetchRepoData()
  }, [repo])

  if (loading) return <p className="repo-loading">Loading code overview...</p>
  if (error) return <p className="repo-error">{error}</p>
  if (!data) return null

  const total = Object.values(data.languages).reduce((a, b) => a + b, 0) || 1
  const langStats = Object.entries(data.languages).map(([lang, bytes]) => ({
    lang,
    percent: ((bytes / total) * 100).toFixed(1),
  }))

  const FolderIcon = (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="#c8d1e0"
      aria-hidden="true"
    >
      <path d="M9.828 3H2.5A1.5 1.5 0 001 4.5v8A1.5 1.5 0 002.5 14h11a1.5 1.5 0 001.5-1.5V6a1 1 0 00-1-1H9.828a1 1 0 01-.707-.293L7.586 3.172A1 1 0 006.879 3H2.5z"></path>
    </svg>
  )

  const FileIcon = (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="#9aa4b7"
      aria-hidden="true"
    >
      <path d="M4 1.75A.75.75 0 014.75 1h6.5a.75.75 0 01.53.22l3 3a.75.75 0 01.22.53v9.5a.75.75 0 01-.75.75h-9.5A.75.75 0 014 14.25v-12.5zM5.5 2.5v11h7v-8h-3a.75.75 0 01-.75-.75v-3h-3.25z"></path>
    </svg>
  )

  return (
    <div className="repo-card">
      <div className="repo-header">
        <div>
          <a
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-title"
          >
            {repo}
          </a>
          <div className="repo-commit">
            {data.commitMsg} · <span>{data.commitSha}</span> · {data.commitDate} ·{" "}
            {data.commitCount} commits
          </div>
        </div>
        <a
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-action"
        >
          Open on GitHub →
        </a>
      </div>

      <div className="repo-filelist">
        {data.contents.map((item) => (
          <a
            key={item.name}
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-file-row"
          >
            <span className="repo-file-icon">
              {item.type === "dir" ? FolderIcon : FileIcon}
            </span>
            <span className="repo-filename">{item.name}</span>
          </a>
        ))}
      </div>

      {langStats.length > 0 && (
        <div className="repo-langbar">
          {langStats.map(({ lang, percent }) => (
            <div key={lang} className="repo-lang">
              <span className="lang-name">{lang}</span>
              <span className="lang-bar">
                <span
                  className="lang-fill"
                  style={{
                    width: `${percent}%`,
                    backgroundColor:
                      lang === "TypeScript"
                        ? "#2f88ff"
                        : lang === "JavaScript"
                        ? "#f1e05a"
                        : lang === "Python"
                        ? "#3572A5"
                        : lang === "Rust"
                        ? "#dea584"
                        : "#58a6ff",
                  }}
                />
              </span>
              <span className="lang-percent">{percent}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
