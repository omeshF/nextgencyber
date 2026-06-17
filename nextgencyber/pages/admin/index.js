import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/articles/all')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { setArticles(data); setLoading(false) })
      .catch(() => { router.push('/admin/login'); setLoading(false) })
  }, [])

  const handleDelete = async (slug) => {
    if (!confirm('Delete this article?')) return
    await fetch(`/api/article/${slug}`, { method: 'DELETE' })
    setArticles(articles.filter(a => a.slug !== slug))
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard — NextGenCyber</title>
        <link rel="icon" href="/trafficlens.jpg" />
      </Head>

      <div style={styles.page}>
        <nav style={styles.nav}>
          <span style={styles.navBrand}>🛡️ Admin Dashboard</span>
          <div style={styles.navRight}>
            <Link href="/admin/editor" style={styles.newBtn}>+ New Article</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </nav>

        <main style={styles.main}>
          <h1 style={styles.title}>Articles</h1>

          {loading ? (
            <p style={{ color: "#9aaa9e" }}>Loading...</p>
          ) : articles.length === 0 ? (
            <div style={styles.empty}>
              <p style={styles.emptyText}>No articles yet.</p>
              <Link href="/admin/editor" style={styles.emptyLink}>Write your first article →</Link>
            </div>
          ) : (
            <div style={styles.list}>
              {articles.map(article => (
                <div key={article.id} style={styles.row}>
                  <div style={styles.rowLeft}>
                    <div style={styles.rowMeta}>
                      <span style={article.published ? styles.published : styles.draft}>
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                      <span style={styles.rowCategory}>{article.category}</span>
                    </div>
                    <h3 style={styles.rowTitle}>{article.title}</h3>
                    <p style={styles.rowDate}>
                      {new Date(article.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div style={styles.rowActions}>
                    <Link href={`/admin/editor?slug=${article.slug}`} style={styles.editBtn}>Edit</Link>
                    <button onClick={() => handleDelete(article.slug)} style={styles.deleteBtn}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#FFF7EA",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  nav: {
    backgroundColor: "#C1E1D2",
    padding: "14px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #a8cfc0",
    flexWrap: "wrap",
    gap: "12px",
  },
  navBrand: { fontSize: "1.1rem", fontWeight: "700", color: "#556B5A" },
  navRight: { display: "flex", gap: "12px", alignItems: "center" },
  newBtn: {
    backgroundColor: "#D18B5B", color: "#fff", padding: "8px 18px",
    borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "0.9rem",
  },
  logoutBtn: {
    backgroundColor: "transparent", color: "#556B5A", border: "1px solid #556B5A",
    padding: "8px 18px", borderRadius: "8px", cursor: "pointer",
    fontWeight: "500", fontSize: "0.9rem", fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  main: { maxWidth: "900px", margin: "0 auto", padding: "40px 20px" },
  title: { fontSize: "1.8rem", fontWeight: "700", color: "#556B5A", marginBottom: "28px" },
  list: { display: "flex", flexDirection: "column", gap: "12px" },
  row: {
    backgroundColor: "#ffffff", border: "1px solid #e0d8cc", borderRadius: "14px",
    padding: "20px 24px", display: "flex", justifyContent: "space-between",
    alignItems: "center", gap: "16px", flexWrap: "wrap",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  rowLeft: { flex: 1 },
  rowMeta: { display: "flex", gap: "8px", marginBottom: "6px", flexWrap: "wrap" },
  published: {
    fontSize: "0.72rem", backgroundColor: "#C1E1D2", color: "#3a7d5a",
    padding: "2px 10px", borderRadius: "20px", fontWeight: "600",
  },
  draft: {
    fontSize: "0.72rem", backgroundColor: "#f0ebe0", color: "#9a8060",
    padding: "2px 10px", borderRadius: "20px", fontWeight: "600",
  },
  rowCategory: {
    fontSize: "0.72rem", backgroundColor: "#C9D8C4", color: "#556B5A",
    padding: "2px 10px", borderRadius: "20px", fontWeight: "500",
  },
  rowTitle: { fontSize: "1rem", fontWeight: "600", color: "#3a4a3e", margin: "0 0 4px 0" },
  rowDate: { fontSize: "0.78rem", color: "#9aaa9e", margin: 0 },
  rowActions: { display: "flex", gap: "10px" },
  editBtn: {
    backgroundColor: "#C9D8C4", color: "#556B5A", padding: "7px 16px",
    borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "0.85rem",
  },
  deleteBtn: {
    backgroundColor: "#fef0f0", color: "#c0392b", border: "1px solid #f5c6c6",
    padding: "7px 16px", borderRadius: "8px", cursor: "pointer",
    fontWeight: "600", fontSize: "0.85rem", fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  empty: { textAlign: "center", padding: "60px 20px" },
  emptyText: { color: "#9aaa9e", fontSize: "1rem", marginBottom: "12px" },
  emptyLink: { color: "#D18B5B", textDecoration: "none", fontWeight: "600" },
}