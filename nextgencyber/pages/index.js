import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import LecturePreview from '../components/LecturePreview'

const CATEGORIES = ['All', 'Further Education', 'Higher Education', 'Learner Engagement', 'Gamified Learning', 'AI & Education', 'AI & Cyber']

const NAV = () => (
  <nav style={styles.nav}>
    <Link href="/" style={styles.navBrand}>
      <img src="/logo.jpg" alt="NextGenCyber logo" style={styles.navLogo} />
      NextGenCyber
    </Link>
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

function CardPlaceholder({ index = 0 }) {
  const delay = (index % 5) * 0.7
  return (
    <div style={styles.cardImgPlaceholder}>
      <svg
        className="ngc-ph"
        viewBox="0 0 120 120"
        width="92"
        height="92"
        style={{ '--ngc-delay': delay + 's', overflow: 'visible' }}
        aria-hidden="true"
      >
        <circle className="ngc-ring" cx="60" cy="60" r="33" />
        <circle className="ngc-ring ngc-ring2" cx="60" cy="60" r="33" />
        <path
          className="ngc-shield"
          d="M60 24 L86 34 V60 C86 78 74 90 60 96 C46 90 34 78 34 60 V34 Z"
        />
        <path className="ngc-check" d="M50 60 L57 68 L72 50" />
        <circle className="ngc-node ngc-node1" cx="26" cy="40" r="3" />
        <circle className="ngc-node ngc-node2" cx="94" cy="46" r="3" />
        <circle className="ngc-node ngc-node3" cx="90" cy="86" r="3" />
      </svg>
    </div>
  )
}

const PER_PAGE = 9

export default function Home() {
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.json())
      .then(data => { setArticles(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = category === 'All' ? articles : articles.filter(a => a.categories && a.categories.includes(category))

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  const selectCategory = (cat) => { setCategory(cat); setPage(1) }
  const goToPage = (p) => {
    setPage(p)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>NextGenCyber — Education, AI, & Cybersecurity Articles</title>
        <meta name="description" content="Articles on further education, higher education, learner engagement, gamified learning, AI tools for education, and AI in cybersecurity." />
        <meta name="google-adsense-account" content="ca-pub-3806712449234414" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
        <style>{`
          .ngc-ring {
            fill: none;
            stroke: #556B5A;
            stroke-width: 1.5;
            opacity: 0;
            transform-box: fill-box;
            transform-origin: center;
            animation: ngcRing 3.2s ease-out infinite;
            animation-delay: var(--ngc-delay, 0s);
          }
          .ngc-ring2 { animation-delay: calc(var(--ngc-delay, 0s) + 1.6s); }
          .ngc-shield {
            fill: #FFF7EA;
            stroke: #556B5A;
            stroke-width: 2.5;
            stroke-linejoin: round;
          }
          .ngc-check {
            fill: none;
            stroke: #D18B5B;
            stroke-width: 4;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 40;
            stroke-dashoffset: 40;
            animation: ngcDraw 1.1s ease-out forwards;
            animation-delay: calc(var(--ngc-delay, 0s) + 0.3s);
          }
          .ngc-node {
            fill: #D18B5B;
            animation: ngcFloat 4s ease-in-out infinite;
            animation-delay: var(--ngc-delay, 0s);
          }
          .ngc-node2 { fill: #7a8f7e; animation-delay: calc(var(--ngc-delay, 0s) + 0.9s); }
          .ngc-node3 { animation-delay: calc(var(--ngc-delay, 0s) + 1.7s); }
          @keyframes ngcRing {
            0%   { transform: scale(0.8); opacity: 0.5; }
            70%  { opacity: 0; }
            100% { transform: scale(1.45); opacity: 0; }
          }
          @keyframes ngcDraw { to { stroke-dashoffset: 0; } }
          @keyframes ngcFloat {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-6px); }
          }
          @media (prefers-reduced-motion: reduce) {
            .ngc-ring, .ngc-check, .ngc-node { animation: none; }
            .ngc-ring { opacity: 0; }
            .ngc-check { stroke-dashoffset: 0; }
          }
        `}</style>
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
            <h1 style={styles.heroTitle}>Insights in Education, AI, & Cybersecurity</h1>
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
                onClick={() => selectCategory(cat)}
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
            <>
            <div style={styles.grid}>
              {paged.map((article, i) => (
                <Link key={article.id} href={'/article/' + article.slug} style={styles.card}>
                  {article.cover_image ? (
                    <div style={styles.cardImgWrap}>
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 700px) 100vw, 350px"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>
                  ) : (article.content || '').includes('[[lecture-demo]]') ? (
                    <LecturePreview variant="card" />
                  ) : (
                    <CardPlaceholder index={i} />
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

            {totalPages > 1 && (
              <nav style={styles.pagination} aria-label="Article pages">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={currentPage === 1 ? styles.pageNavDisabled : styles.pageNav}
                >
                  ← Newer
                </button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    style={p === currentPage ? styles.pageNumActive : styles.pageNum}
                    aria-current={p === currentPage ? 'page' : undefined}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={currentPage === totalPages ? styles.pageNavDisabled : styles.pageNav}
                >
                  Older →
                </button>
              </nav>
            )}
            </>
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
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navLogo: {
    width: "32px",
    height: "32px",
    objectFit: "cover",
    borderRadius: "8px",
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
    background: "linear-gradient(135deg, #C1E1D2, #C9D8C4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "-40px",
    marginBottom: "60px",
  },
  pageNav: {
    backgroundColor: "#C9D8C4",
    color: "#556B5A",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  pageNavDisabled: {
    backgroundColor: "#e8eee5",
    color: "#b3c0b3",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "not-allowed",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  pageNum: {
    backgroundColor: "#ffffff",
    color: "#556B5A",
    border: "1px solid #e0d8cc",
    minWidth: "38px",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  pageNumActive: {
    backgroundColor: "#556B5A",
    color: "#FFF7EA",
    border: "1px solid #556B5A",
    minWidth: "38px",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
}