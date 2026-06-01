import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — NextGenCyber</title>
        <meta name="description" content="Get in touch with NextGenCyber — report issues, ask questions, or collaborate on cybersecurity and ML research." />
        <meta name="google-adsense-account" content="ca-pub-3806712449234414" />
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
            <Link href="/contact" style={styles.navLinkActive}>Contact</Link>
          </div>
        </nav>

        <main style={styles.main}>
          <div style={styles.container}>
            <h1 style={styles.title}>Contact</h1>
            <div style={styles.divider} />
            <p style={styles.intro}>
              Have a question, found a bug, or want to collaborate? Here's how to reach us.
            </p>

            <div style={styles.grid}>
              <a href="https://github.com/omeshF/NeT2I/issues" style={styles.contactCard}>
                <span style={styles.contactIcon}>🐛</span>
                <h2 style={styles.contactTitle}>Bug Reports & Issues</h2>
                <p style={styles.contactDesc}>
                  Found a problem with net2i or i2net? Open an issue on GitHub and we'll look into it.
                </p>
                <span style={styles.contactLink}>Open GitHub Issues →</span>
              </a>

              <a href="https://github.com/omeshF/NeT2I/discussions" style={styles.contactCard}>
                <span style={styles.contactIcon}>💬</span>
                <h2 style={styles.contactTitle}>Discussions & Questions</h2>
                <p style={styles.contactDesc}>
                  General questions about the tools, usage, or research? Start a discussion on GitHub.
                </p>
                <span style={styles.contactLink}>GitHub Discussions →</span>
              </a>

              <a href="mailto:omeshf@gmail.com" style={styles.contactCard}>
                <span style={styles.contactIcon}>📧</span>
                <h2 style={styles.contactTitle}>Research & Collaboration</h2>
                <p style={styles.contactDesc}>
                  Interested in research collaboration, citing the work, or academic enquiries?
                  Get in touch by email.
                </p>
                <span style={styles.contactLink}>omeshf@gmail.com →</span>
              </a>

              <a href="https://scholar.google.co.uk/citations?user=KEuh_MkAAAAJ&hl=en&oi=ao" style={styles.contactCard}>
                <span style={styles.contactIcon}>📄</span>
                <h2 style={styles.contactTitle}>Google Scholar</h2>
                <p style={styles.contactDesc}>
                  View published research papers and citations by Dr Omesh Fernando on Google Scholar.
                </p>
                <span style={styles.contactLink}>View Profile →</span>
              </a>
            </div>

            <div style={styles.noteBox}>
              <p style={styles.noteText}>
                ⏱️ <strong>Response times:</strong> GitHub issues are monitored regularly.
                Email responses may take 2–5 business days.
              </p>
            </div>
          </div>
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
  navLinkActive: {
    color: "#3a7d5a",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "700",
    borderBottom: "2px solid #3a7d5a",
    paddingBottom: "2px",
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
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#3a7d5a",
    margin: "0 0 16px 0",
  },
  divider: {
    height: "4px",
    width: "60px",
    borderRadius: "4px",
    background: "linear-gradient(90deg, #b8e4c9, #ffe599, #b8d8f0)",
    marginBottom: "20px",
  },
  intro: {
    fontSize: "1rem",
    color: "#6a6a5a",
    lineHeight: "1.7",
    marginBottom: "36px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  contactCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4d8",
    borderRadius: "16px",
    padding: "24px",
    textDecoration: "none",
    color: "#2d2d2d",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  contactIcon: { fontSize: "1.8rem" },
  contactTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    margin: 0,
    color: "#2d2d2d",
  },
  contactDesc: {
    fontSize: "0.87rem",
    color: "#6a6a5a",
    lineHeight: "1.6",
    margin: 0,
    flexGrow: 1,
  },
  contactLink: {
    fontSize: "0.85rem",
    color: "#3a7d5a",
    fontWeight: "600",
    marginTop: "4px",
  },
  noteBox: {
    backgroundColor: "#fef9ec",
    border: "1px solid #f0d98a",
    borderRadius: "12px",
    padding: "16px 20px",
  },
  noteText: {
    fontSize: "0.88rem",
    color: "#7a6a30",
    margin: 0,
    lineHeight: "1.6",
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
}