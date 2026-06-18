import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const CATEGORIES = ['All', 'Further Education', 'Higher Education', 'Learner Engagement', 'Gamified Learning', 'AI & Education', 'AI & Cyber']

const NAV = () => (
  <nav style={styles.nav}>
    <Link href="/" style={styles.navBrand}>🛡️ NextGenCyber</Link>
    <div style={styles.navLinks}>
      <Link href="/" style={styles.navLinkActive}>Articles</Link>
      <Link href="/tools" style={styles.navLink}>Tools</Link>
      <a href="https://learningpark.nextgencyber.co.uk" style={styles.navLink}>LearningPark</a>
      <Link href="/about" style={styles.navLink}>About</Link>
      <Link href="/contact" style={styles.navLink}>Contact</Link>
    </div>
  </nav>
)

const FOOTER = () => (
  <footer style={styles.footer}>
    <div style={styles.footerLinks}>
      <Link href="/" style={styles.footerLink}>Home</Link>
      <Link href="/tools" style={styles.footerLink}>Tools</Link>
      <Link href="/about" style={styles.footerLink}>About</Link>
      <Link href="/contact" style={styles.footerLink}>Contact</Link>
      <a href="https://github.com/omeshF" style={styles.footerLink}>GitHub</a>
    </div>
    <p style={styles.footerText}>© {new Date().getFullYear()} Omesh Fernando · University of Hertfordshire · MIT License</p>
  </footer>
)

export default function Home() {
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.json())
      .then(data => { setArticles(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = category === 'All' ? articles : articles.filter(a => a.categories && a.categories.includes(category))

  return (
    <>
      <Head>
        <title>NextGenCyber — Education & Cybersecurity Articles</title>
        <meta name="description" content="Articles on further education, higher education, learner engagement, gamified learning, AI tools for education, and AI in cybersecurity." />
        <meta name="google-adsense-account" content="ca-pub-3806712449234414" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/trafficlens.jpg" />
      </Head>

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3806712449234414"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div style={styles.page}>
        <NAV />

        <main style={styles.main}>
          <header style={styles.hero}>
            <h1 style={styles.heroTitle}>Insights in Education & Cybersecurity</h1>
            <div style={styles.divider} />
            <p style={styles.heroSubtitle}>
              Articles on further education, higher education, learner engagement,
              gamified learning, AI tools for education, and AI in cybersecurity.
            </p>
          </header>

          <div style={styles.categoryRow}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={category === cat ? styles.catActive : styles.catBtn}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={styles.loadingRow}>
              {[1,2,3].map(i => <div key={i} style={styles.skeleton} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={styles.empty}>
              <p style={styles.emptyText}>No articles yet in this category. Check back soon!</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {filtered.map(article => (
                <Link key={article.id} href={'/article/' + article.slug} style={styles.card}>
                  {article.cover_image ? (
                    <div style={styles.cardImgWrap}>
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 700px) 100vw, 350px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={styles.cardImgPlaceholder}>📝</div>
                  )}
                  <div style={styles.cardBody}>
                    <div style={styles.cardCategoryRow}>
                    {(article.categories || []).map(c => (
                    <span key={c} style={styles.cardCategory}>{c}</span>
                    ))}
                  </div>
                    <h2 style={styles.cardTitle}>{article.title}</h2>
                    <p style={styles.cardExcerpt}>{article.excerpt}</p>
                    <div style={styles.cardFooter}>
                      <span style={styles.cardDate}>
                        {new Date(article.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span style={styles.cardRead}>Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Tools section */}
          <section style={styles.toolsSection}>
            <h2 style={styles.toolsHeading}>Research Tools</h2>
            <div style={styles.toolsGrid}>
              <Link href="/tools" style={styles.toolCard}>
                <img src="/trafficlens.png" alt="TrafficLens" style={styles.toolLogo} />
                <div>
                  <h3 style={styles.toolName}>TrafficLens</h3>
                  <p style={styles.toolDesc}>Convert network traffic CSV to CNN-ready images for anomaly detection.</p>
                  <span style={styles.toolLink}>Open Tool →</span>
                </div>
              </Link>
              <a href="https://learningpark.nextgencyber.co.uk" style={styles.toolCard}>
                <img src="/favicon.svg" alt="LearningPark" style={styles.toolLogo} />
                <div>
                  <h3 style={styles.toolName}>LearningPark</h3>
                  <p style={styles.toolDesc}>Gamified learning platform for educators to improve learner engagement.</p>
                  <span style={styles.toolLink}>Visit Platform →</span>
                </div>
              </a>
            </div>
          </section>
        </main>

        <FOOTER />
      </div>
    </>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#FFF7EA",
    color: "#556B5A",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
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
  navLinkActive: {
    color: "#556B5A",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "700",
    borderBottom: "2px solid #556B5A",
    paddingBottom: "2px",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 20px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "40px",
    maxWidth: "700px",
  },
  heroTitle: {
    fontSize: "2.4rem",
    fontWeight: "700",
    color: "#556B5A",
    margin: "0 0 12px 0",
    lineHeight: "1.3",
  },
  divider: {
    height: "4px",
    width: "60px",
    borderRadius: "4px",
    background: "linear-gradient(90deg, #C1E1D2, #D18B5B, #C9D8C4)",
    margin: "0 auto 16px",
  },
  heroSubtitle: {
    fontSize: "1rem",
    color: "#7a8f7e",
    lineHeight: "1.7",
    margin: 0,
  },
  categoryRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "40px",
    maxWidth: "900px",
    width: "100%",
  },
  catBtn: {
    backgroundColor: "#C9D8C4",
    color: "#556B5A",
    border: "none",
    padding: "7px 16px",
    borderRadius: "20px",
    fontSize: "0.82rem",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  catActive: {
    backgroundColor: "#556B5A",
    color: "#FFF7EA",
    border: "none",
    padding: "7px 16px",
    borderRadius: "20px",
    fontSize: "0.82rem",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "1100px",
    marginBottom: "60px",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0d8cc",
    borderRadius: "16px",
    textDecoration: "none",
    color: "#556B5A",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
  },
  cardImgWrap: {
    position: "relative",
    width: "100%",
    height: "180px",
  },
  cardImgPlaceholder: {
    width: "100%",
    height: "180px",
    backgroundColor: "#C9D8C4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
  },
  cardBody: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1,
  },
  cardCategory: {
    fontSize: "0.72rem",
    backgroundColor: "#C1E1D2",
    color: "#556B5A",
    padding: "3px 10px",
    borderRadius: "20px",
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    margin: 0,
    color: "#3a4a3e",
    lineHeight: "1.4",
  },
  cardExcerpt: {
    fontSize: "0.87rem",
    color: "#7a8f7e",
    lineHeight: "1.6",
    margin: 0,
    flexGrow: 1,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
    paddingTop: "12px",
    borderTop: "1px solid #f0ebe0",
  },
  cardDate: {
    fontSize: "0.78rem",
    color: "#9aaa9e",
  },
  cardRead: {
    fontSize: "0.82rem",
    color: "#D18B5B",
    fontWeight: "600",
  },
  loadingRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "1100px",
    marginBottom: "60px",
  },
  skeleton: {
    height: "320px",
    backgroundColor: "#C9D8C4",
    borderRadius: "16px",
    opacity: 0.5,
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    marginBottom: "60px",
  },
  emptyText: {
    color: "#9aaa9e",
    fontSize: "1rem",
  },
  toolsSection: {
    width: "100%",
    maxWidth: "1100px",
    marginBottom: "40px",
  },
  toolsHeading: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#556B5A",
    marginBottom: "20px",
  },
  toolsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  toolCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0d8cc",
    borderRadius: "16px",
    padding: "24px",
    textDecoration: "none",
    color: "#556B5A",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  toolLogo: {
    width: "48px",
    height: "48px",
    objectFit: "contain",
    borderRadius: "10px",
    flexShrink: 0,
  },
  toolName: {
    fontSize: "1.05rem",
    fontWeight: "700",
    margin: "0 0 6px 0",
    color: "#3a4a3e",
  },
  toolDesc: {
    fontSize: "0.85rem",
    color: "#7a8f7e",
    lineHeight: "1.6",
    margin: "0 0 8px 0",
  },
  toolLink: {
    fontSize: "0.82rem",
    color: "#D18B5B",
    fontWeight: "600",
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
  cardCategoryRow: {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
},
}