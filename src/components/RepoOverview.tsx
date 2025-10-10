import React, { useEffect, useState } from "react"
import "./RepoOverview.css"

interface RepoOverviewProps {
  repo: string // e.g. "ayuspoudel/tms-infra"
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


        const contentsRes = await fetch(`https://api.github.com/repos/${repo}/contents`, {
          headers,
        })
        const contents = await contentsRes.json()

        const commitsRes = await fetch(
          `https://api.github.com/repos/${repo}/commits?per_page=1`,
          { headers }
        )
        const commits = await commitsRes.json()
        const latest = commits[0]
        const commitMsg = latest?.commit?.message ?? "No recent commit"
        const commitSha = latest?.sha?.substring(0, 7) ?? "-"
        const commitDate = new Date(latest?.commit?.author?.date).toLocaleDateString()

        const langRes = await fetch(`https://api.github.com/repos/${repo}/languages`, {
          headers,
        })
        const languages = await langRes.json()

        const commitCount = parseInt(
          commitsRes.headers.get("link")?.match(/page=(\d+)>; rel="last"/)?.[1] ?? "1",
          10
        )

        const repoData: RepoInfo = {
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
        }

        setData(repoData)
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

  const total = Object.values(data.languages).reduce((a, b) => a + b, 0)
  const langStats = Object.entries(data.languages).map(([lang, bytes]) => ({
    lang,
    percent: ((bytes / total) * 100).toFixed(1),
  }))

  return (
    <div className="repo-container">
      <div className="repo-header">
        <div className="repo-meta">
          <h3>{repo}</h3>
          <p>
            {data.commitMsg} · <span>{data.commitSha}</span> · {data.commitDate} ·{" "}
            {data.commitCount} commits
          </p>
        </div>
        <a
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-link"
        >
          Open on GitHub →
        </a>
      </div>

      <div className="repo-contents">
        {data.contents.map((item) => (
          <div
            key={item.name}
            className={`repo-item ${item.type === "dir" ? "folder" : "file"}`}
          >
            <a href={item.html_url} target="_blank" rel="noopener noreferrer">
              {item.type === "dir" ? "📁" : "🧾"} {item.name}
            </a>
          </div>
        ))}
      </div>

      <div className="repo-languages">
        {langStats.map(({ lang, percent }) => (
          <span key={lang}>
            {lang} {percent}%
          </span>
        ))}
      </div>
    </div>
  )
}
