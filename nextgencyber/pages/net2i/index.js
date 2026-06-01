import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

export default function Net2I() {
  return (
    <>
      <Head>
        <title>TrafficLens — NeT2I · NextGenCyber</title>
        <meta name="description" content="Convert network traffic CSV to CNN-ready images, or decode images back to CSV." />
        <meta name="google-adsense-account" content="ca-pub-3806712449234414" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3806712449234414"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/6.14.0/gradio.js"
        strategy="afterInteractive"
      />

      <div style={styles.page}>
        <nav style={styles.nav}>
          <Link href="/" style={styles.navBrand}>🛡️ NextGenCyber</Link>
          <div style={styles.navLinks}>
            <Link href="/" style={styles.navLink}>Home</Link>
            <Link href="/net2i" style={styles.navLinkActive}>TrafficLens</Link>
            <Link href="/about" style={styles.navLink}>About</Link>
            <Link href="/contact" style={styles.navLink}>Contact</Link>
          </div>
        </nav>

        <main style={styles.main}>
          <header style={styles.header}>
            <h1 style={styles.title}>🔁 TrafficLens</h1>
            <div style={styles.divider} />
            <p style={styles.subtitle}>
              Network traffic CSV ↔ CNN-ready images · Powered by{" "}
              <a href="https://pypi.org/project/net2i/" style={styles.link}>net2i</a>
              {" & "}
              <a href="https://pypi.org/project/i2net/" style={styles.link}>i2net</a>
            </p>
          </header>

          <div style={styles.appWrapper}>
            <gradio-app src="https://omeshf91-trafficlens.hf.space" />
          </div>

          <div style={styles.infoRow}>
            <div style={styles.infoCard}>
              <span style={styles.infoIcon}>📤</span>
              <div>
                <h3 style={styles.infoTitle}>CSV → Images</h3>
                <p style={styles.infoText}>Upload a network traffic CSV to generate RGB images for CNN training.</p>
              </div>
            </div>
            <div style={styles.infoCard}>
              <span style={styles.infoIcon}>📥</span>
              <div>
                <h3 style={styles.infoTitle}>Images → CSV</h3>
                <p style={styles.infoText}>Upload a ZIP or individual PNG files to reconstruct the original CSV.</p>
              </div>
            </div>
            <div style={styles.infoCard}>
              <span style={styles.infoIcon}>📄</span>
              <div>
                <h3 style={styles.infoTitle}>Research</h3>
                <p style={styles.infoText}>
                  Based on peer-reviewed{" "}
                  <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.link}>
                    IEEE WCNC 2023
                  </a>{" "}
                  research.
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer style={styles.footer}>
          <div style={styles.footerLinks}>
            <Link href="/" style={styles.footerLink}>Home</Link>
            <Link href="/about" style={styles.footerLink}>About</Link>
            <Link href="/contact" style={styles.footerLink}>Contact</Link>
            <a href="https://github.com/omeshF/NeT2I" style={styles.footerLink}>GitHub</a>
            <a href="https://pypi.org/project/net2i/" style={styles.footerLink}>PyPI</a>
            <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.footerLink}>IEEE Paper</a>
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
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    width: "100%",
    maxWidth: "1100px",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#3a7d5a",
    margin: "0 0 12px 0",
  },
  divider: {
    height: "4px",
    width: "60px",
    borderRadius: "4px",
    background: "linear-gradient(90deg, #b8e4c9, #ffe599, #b8d8f0)",
    margin: "0 auto 16px",
  },
  subtitle: {
    color: "#7a7a6a",
    fontSize: "1rem",
  },
  appWrapper: {
    width: "100%",
    maxWidth: "1100px",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #e8e4d8",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    marginBottom: "40px",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "1100px",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4d8",
    borderRadius: "14px",
    padding: "20px 24px",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  infoIcon: { fontSize: "1.8rem", flexShrink: 0 },
  infoTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#2d2d2d",
    margin: "0 0 6px 0",
  },
  infoText: {
    fontSize: "0.85rem",
    color: "#6a6a5a",
    lineHeight: "1.6",
    margin: 0,
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