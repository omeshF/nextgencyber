import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

const projects = [
  {
    name: "TrafficLens / NeT2I",
    description: "Convert network traffic CSV files into CNN-ready RGB images, or decode images back to CSV. Built for ML-based anomaly detection in 5G-MEC networks.",
    url: "/net2i",
    badge: "ML · Security · Research",
    emoji: "🔁",
    icon: null,
    accent: "#b8e4c9",
  },
  {
    name: "LearningPark",
    description: "An interactive learning platform for Educators to imporve learner engagement using various gamified learning tools.",
    url: "https://learningpark.nextgencyber.co.uk",
    badge: "Education · Gamified Learning · AI",
    emoji: null,
    icon: "/favicon.svg",
    accent: "#ffe599",
  },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>NextGenCyber — Cybersecurity, AI & Educational Tools</title>
        <meta name="description" content="Open-source cybersecurity and machine learning research tools by Omesh Fernando. Convert network traffic data to CNN-ready images for anomaly detection." />
        <meta name="keywords" content="cybersecurity, machine learning, network traffic, CNN, anomaly detection, net2i, i2net" />
        <meta name="google-adsense-account" content="ca-pub-3806712449234414" />
        <meta property="og:title" content="NextGenCyber — Cybersecurity & ML Research Tools" />
        <meta property="og:description" content="Open-source tools for cybersecurity and ML research." />
        <meta property="og:url" content="https://nextgencyber.co.uk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3806712449234414"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div style={styles.page}>
        <nav style={styles.nav}>
          <Link href="/" style={styles.navBrand}>🛡️ NextGenCyber</Link>
          <div style={styles.navLinks}>
            <Link href="/" style={styles.navLink}>Home</Link>
            <Link href="/net2i" style={styles.navLink}>TrafficLens</Link>
            <Link href="/about" style={styles.navLink}>About</Link>
            <Link href="/contact" style={styles.navLink}>Contact</Link>
          </div>
        </nav>

        <main style={styles.main}>
          <header style={styles.header}>
            <div style={styles.logoRow}>
              <span style={styles.logoIcon}>🛡️</span>
              <h1 style={styles.title}>NextGenCyber</h1>
            </div>
            <p style={styles.subtitle}>
              Cybersecurity &amp; Machine Learning Research Tools
            </p>
            <div style={styles.divider} />
          </header>

          <section style={styles.grid}>
            {projects.map((p) => (
              <Link key={p.name} href={p.url} style={styles.card}>
                <div style={{ ...styles.cardTop, backgroundColor: p.accent }}>
                  {p.icon
                    ? <img src={p.icon} alt={p.name} style={styles.cardImage} />
                    : <span style={styles.cardIcon}>{p.emoji}</span>
                  }
                </div>
                <div style={styles.cardBody}>
                  <h2 style={styles.cardTitle}>{p.name}</h2>
                  <p style={styles.cardDesc}>{p.description}</p>
                  <span style={styles.badge}>{p.badge}</span>
                </div>
              </Link>
            ))}

            <div style={styles.placeholderCard}>
              <span style={styles.placeholderIcon}>🔜</span>
              <p style={styles.placeholderText}>More tools coming soon</p>
            </div>
          </section>

          <section style={styles.aboutBox}>
            <h2 style={styles.aboutTitle}>About NextGenCyber</h2>
            <p style={styles.aboutText}>
              NextGenCyber is a collection of open-source research tools for cybersecurity
              and machine learning, developed by{" "}
              <a href="https://github.com/omeshF" style={styles.link}>Omesh Fernando</a>.
              Tools are published on{" "}
              <a href="https://pypi.org/user/omeshf91/" style={styles.link}>PyPI</a> and
              peer-reviewed research is available via{" "}
              <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.link}>
                IEEE Xplore
              </a>.
            </p>
            <div style={styles.aboutLinks}>
              <Link href="/about" style={styles.aboutCta}>Learn more →</Link>
              <Link href="/contact" style={styles.aboutCta}>Get in touch →</Link>
            </div>
          </section>
        </main>

        <footer style={styles.footer}>
          <div style={styles.footerLinks}>
            <Link href="/" style={styles.footerLink}>Home</Link>
            <Link href="/about" style={styles.footerLink}>About</Link>
            <Link href="/contact" style={styles.footerLink}>Contact</Link>
            <a href="https://github.com/omeshF" style={styles.footerLink}>GitHub</a>
            <a href="https://pypi.org/user/omeshf91/" style={styles.footerLink}>PyPI</a>
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
    backgroundColor: "#fdf9f0",
    color: "#2d2d2d",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e8e4d8",
    padding: "14px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  navBrand: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#3a7d5a",
    textDecoration: "none",
  },
  navLinks: { display: "flex", gap: "28px" },
  navLink: {
    color: "#4a4a3a",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
    width: "100%",
    maxWidth: "900px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "10px",
  },
  logoIcon: { fontSize: "2.5rem" },
  title: {
    fontSize: "2.8rem",
    fontWeight: "700",
    color: "#3a7d5a",
    margin: 0,
  },
  subtitle: {
    fontSize: "1.05rem",
    color: "#7a7a6a",
    marginTop: "10px",
    marginBottom: "24px",
  },
  divider: {
    height: "4px",
    width: "80px",
    margin: "0 auto",
    borderRadius: "4px",
    background: "linear-gradient(90deg, #b8e4c9, #ffe599, #b8d8f0)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "900px",
    marginBottom: "50px",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4d8",
    borderRadius: "16px",
    textDecoration: "none",
    color: "#2d2d2d",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
  },
  cardTop: {
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIcon: { fontSize: "2.5rem" },
  cardImage: {
    width: "52px",
    height: "52px",
    objectFit: "contain",
    borderRadius: "10px",
  },
  cardBody: {
    padding: "20px 24px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: 0,
    color: "#2d2d2d",
  },
  cardDesc: {
    fontSize: "0.88rem",
    color: "#6a6a5a",
    lineHeight: "1.6",
    margin: 0,
    flexGrow: 1,
  },
  badge: {
    fontSize: "0.72rem",
    backgroundColor: "#e8f5ee",
    color: "#3a7d5a",
    padding: "4px 10px",
    borderRadius: "20px",
    alignSelf: "flex-start",
    fontWeight: "500",
  },
  placeholderCard: {
    backgroundColor: "#fef9ec",
    border: "2px dashed #f0d98a",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
    gap: "12px",
  },
  placeholderIcon: { fontSize: "2rem" },
  placeholderText: {
    color: "#b0a060",
    fontSize: "0.9rem",
    margin: 0,
  },
  aboutBox: {
    backgroundColor: "#eaf4f8",
    border: "1px solid #c8dfe8",
    borderRadius: "16px",
    padding: "32px 36px",
    width: "100%",
    maxWidth: "900px",
    marginBottom: "50px",
  },
  aboutTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#2a6080",
    marginTop: 0,
    marginBottom: "12px",
  },
  aboutText: {
    fontSize: "0.92rem",
    color: "#4a6070",
    lineHeight: "1.7",
    margin: "0 0 16px 0",
  },
  aboutLinks: {
    display: "flex",
    gap: "20px",
  },
  aboutCta: {
    color: "#3a7d5a",
    fontWeight: "600",
    fontSize: "0.9rem",
    textDecoration: "none",
  },
  footer: {
    backgroundColor: "#ffffff",
    borderTop: "1px solid #e8e4d8",
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
    color: "#3a7d5a",
    textDecoration: "none",
    fontSize: "0.88rem",
    fontWeight: "500",
  },
  footerText: {
    color: "#9a9a8a",
    fontSize: "0.82rem",
    margin: 0,
  },
  link: {
    color: "#3a7d5a",
    textDecoration: "none",
    fontWeight: "500",
  },
}