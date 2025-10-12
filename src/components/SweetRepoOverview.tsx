import React, { useEffect, useState } from "react"

interface SweetRepoOverviewProps {
  repo: string
}

interface RepoInfo {
  name: string
  html_url: string
  commitMsg: string
  commitSha: string
  commitDate: string
  languages: Record<string, number>
}

export default function SweetRepoOverview({ repo }: SweetRepoOverviewProps) {
  const [data, setData] = useState<RepoInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const token = import.meta.env.VITE_GITHUB_TOKEN

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/vnd.github.v3+json",
        }

        // --- Repo Info ---
        const repoRes = await fetch(`https://api.github.com/repos/${repo}`, { headers })
        const repoData = await repoRes.json()

        // --- Latest Commit ---
        const commitsRes = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, { headers })
        const commits = await commitsRes.json()
        const latest = commits[0]
        const commitMsg = latest?.commit?.message?.split("\n")[0] ?? "No commits yet"
        const commitSha = latest?.sha?.substring(0, 7) ?? "-"
        const commitDate = latest?.commit?.author?.date
          ? new Date(latest.commit.author.date).toLocaleDateString()
          : "N/A"

        // --- Languages ---
        const langRes = await fetch(`https://api.github.com/repos/${repo}/languages`, { headers })
        const languages = await langRes.json()

        setData({
          name: repoData.name,
          html_url: repoData.html_url,
          commitMsg,
          commitSha,
          commitDate,
          languages,
        })
      } catch (err) {
        console.error(err)
        setError("Failed to load repository")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [repo])

  if (loading) return <p className="sweetrepo-loading">Loading...</p>
  if (error) return <p className="sweetrepo-error">{error}</p>
  if (!data) return null

  const total = Object.values(data.languages).reduce((a, b) => a + b, 0) || 1
  const langStats = Object.entries(data.languages)
    .map(([lang, bytes]) => ({
      lang,
      percent: ((bytes / total) * 100).toFixed(1),
    }))
    .slice(0, 3) // show top 3 languages only

  const getLangClass = (lang: string) => {
    const lower = lang.toLowerCase()
    if (["typescript"].includes(lower)) return "typescript"
    if (["python"].includes(lower)) return "python"
    if (["rust"].includes(lower)) return "rust"
    if (["javascript"].includes(lower)) return "javascript"
    if (["go"].includes(lower)) return "go"
    if (["hcl"].includes(lower)) return "hcl"
    return "default"
  }

  return (
    <div className="sweetrepo-card">
      {/* === Header === */}
      <div className="sweetrepo-header">
        <a
          href={data.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="sweetrepo-title"
        >
          {data.name}
        </a>
        <a
          href={data.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="sweetrepo-link"
        >
          Open on GitHub →
        </a>
      </div>

      {/* === Commit Info === */}
      <p className="sweetrepo-commit">
        {data.commitMsg} · <span>{data.commitSha}</span> · {data.commitDate}
      </p>

      {/* === Language Dots Row === */}
      {langStats.length > 0 && (
        <div className="sweetrepo-langs">
          {langStats.map(({ lang }) => (
            <div key={lang} className="lang">
              <div className={`dot ${getLangClass(lang)}`} />
              <span>{lang}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
