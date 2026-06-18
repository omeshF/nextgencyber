import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Article() {
  const router = useRouter()
  const { slug } = router.query
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch('/api/articles/' + slug)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setArticle(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div style={styles.loadingPage}>
      <p style={{ color: "#9aaa9e" }}>Loading...</p>
    </div>
  )

  if (!article) return (
    <div style={styles.loadingPage}>
      <p style={{ color: "#9aaa9e" }}>Article not found.</p>
      <Link href="/" style={{ color: "#D18B5B" }}>← Back to articles</Link>
    </div>
  )

  return (
    <>
      <Head>
        <title>{article.title} — NextGenCyber</title>
        <meta name="description" content={article.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/trafficlens.png" />
      <style>{`
        .article-content table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; }
        .article-content table td, .article-content table th { border: 1px solid #e0d8cc; padding: 10px 14px; text-align: left; }
        .article-content table th { background-color: #C9D8C4; font-weight: 600; color: #3a4a3e; }
        .article-content img { max-width: 100%; border-radius: 8px; margin: 1.5rem 0; }
      `}</style>
      </Head>

      <div style={styles.page}>
        <nav style={styles.nav}>
          <Link href="/" style={styles.navBrand}>🛡️ NextGenCyber</Link>
          <div style={styles.navLinks}>
            <Link href="/" style={styles.navLink}>Articles</Link>
            <Link href="/tools" style={styles.navLink}>Tools</Link>
            <a href="https://learningpark.nextgencyber.co.uk" style={styles.navLink}>LearningPark</a>
            <Link href="/about" style={styles.navLink}>About</Link>
            <Link href="/contact" style={styles.navLink}>Contact</Link>
          </div>
        </nav>

        <main style={styles.main}>
          <div style={styles.container}>
            <Link href="/" style={styles.backLink}>← Back to Articles</Link>

            {article.cover_image && (
              <div style={styles.coverImgWrap}>
                <Image
                  src={article.cover_image}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 780px) 100vw, 780px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}

            <div style={styles.meta}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  {(article.categories || []).map(c => (
    <span key={c} style={styles.category}>{c}</span>
  ))}
</div>
              <span style={styles.date}>
                {new Date(article.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
            </div>

            <h1 style={styles.title}>{article.title}</h1>
            <p style={styles.excerpt}>{article.excerpt}</p>

            <div
            className="article-content"
            style={styles.content}
            dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </main>

        <footer style={styles.footer}>
          <div style={styles.footerLinks}>
            <Link href="/" style={styles.footerLink}>Home</Link>
            <Link href="/about" style={styles.footerLink}>About</Link>
            <Link href="/contact" style={styles.footerLink}>Contact</Link>
          </div>
          <p style={styles.footerText}>© {new Date().getFullYear()} Omesh Fernando · MIT License</p>
        </footer>
      </div>
    </>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#FFF7EA",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  loadingPage: {
    minHeight: "100vh",
    backgroundColor: "#FFF7EA",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  nav: {
    backgroundColor: "#C1E1D2",
    borderBottom: "1px solid #a8cfc0",
    padding: "14px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  navBrand: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#556B5A",
    textDecoration: "none",
  },
  navLinks: { display: "flex", gap: "28px", flexWrap: "wrap" },
  navLink: {
    color: "#556B5A",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "50px 20px",
  },
  container: {
    width: "100%",
    maxWidth: "780px",
  },
  backLink: {
    color: "#D18B5B",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
    display: "inline-block",
    marginBottom: "24px",
  },
  coverImgWrap: {
    position: "relative",
    width: "100%",
    height: "320px",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "28px",
  },
  meta: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  category: {
    fontSize: "0.75rem",
    backgroundColor: "#C1E1D2",
    color: "#556B5A",
    padding: "4px 12px",
    borderRadius: "20px",
    fontWeight: "600",
  },
  date: {
    fontSize: "0.82rem",
    color: "#9aaa9e",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#3a4a3e",
    margin: "0 0 16px 0",
    lineHeight: "1.3",
  },
  excerpt: {
    fontSize: "1.05rem",
    color: "#7a8f7e",
    lineHeight: "1.7",
    margin: "0 0 32px 0",
    borderLeft: "4px solid #C1E1D2",
    paddingLeft: "16px",
  },
  content: {
    fontSize: "0.97rem",
    color: "#3a4a3e",
    lineHeight: "1.9",
  },
  footer: {
    backgroundColor: "#C1E1D2",
    borderTop: "1px solid #a8cfc0",
    padding: "24px 40px",
    textAlign: "center",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },
  footerLink: {
    color: "#556B5A",
    textDecoration: "none",
    fontSize: "0.88rem",
    fontWeight: "500",
  },
  footerText: {
    color: "#7a8f7e",
    fontSize: "0.82rem",
    margin: 0,
  },
}