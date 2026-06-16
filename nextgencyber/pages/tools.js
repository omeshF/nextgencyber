import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

export default function Tools() {
  return (
    <>
      <Head>
        <title>TrafficLens — NextGenCyber</title>
        <meta name="description" content="Convert network traffic CSV to CNN-ready images for anomaly detection." />
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

      <Script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/6.14.0/gradio.js"
        strategy="afterInteractive"
      />

      <div style={styles.page}>
        <nav style={styles.nav}>
          <Link href="/" style={styles.navBrand}>🛡️ NextGenCyber</Link>
          <div style={styles.navLinks}>
            <Link href="/" style={styles.navLink}>Articles</Link>
            <Link href="/tools" style={styles.navLinkActive}>Tools</Link>
            <a href="https://learningpark.nextgencyber.co.uk" style={styles.navLink}>LearningPark</a>
            <Link href="/about" style={styles.navLink}>About</Link>
            <Link href="/contact" style={styles.navLink}>Contact</Link>
          </div>
        </nav>

        <main style={styles.main}>
          <header style={styles.header}>
            <Link href="/" style={styles.backLink}>← Back</Link>
            <h1 style={styles.title}>
              <img src="/trafficlens.png" alt="TrafficLens" style={styles.titleLogo} />
              TrafficLens
            </h1>
            <div style={styles.divider} />
            <p style={styles.subtitle}>
              Convert network traffic CSV files into CNN-ready RGB images for anomaly detection,
              or decode images back to CSV. Powered by{" "}
              <a href="https://pypi.org/project/net2i/" style={styles.link}>net2i</a>
              {" & "}
              <a href="https://pypi.org/project/i2net/" style={styles.link}>i2net</a>
              {" · "}
              <a href="https://www.mdpi.com/2673-8732/5/4/42" style={styles.link}>MDPI Network 2025</a>
              {" · "}
              <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.link}>IEEE WCNC 2023</a>
            </p>
          </header>

          <div style={styles.appWrapper}>
            <gradio-app src="https://omeshf91-trafficlens.hf.space" />
          </div>
        </main>

        <footer style={styles.footer}>
          <div style={styles.footerLinks}>
            <Link href="/" style={styles.footerLink}>Home</Link>
            <Link href="/about" style={styles.footerLink}>About</Link>
            <Link href="/contact" style={styles.footerLink}>Contact</Link>
            <a href="https://github.com/omeshF" style={styles.footerLink}>GitHub</a>
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
  navBrand: { fontSize: "1.2rem", fontWeight: "700", color: "#556B5A", textDecoration: "none" },
  navLinks: { display: "flex", gap: "28px", flexWrap: "wrap" },
  navLink: { color: "#556B5A", textDecoration: "none", fontSize: "0.95rem", fontWeight: "500" },
  navLinkActive: {
    color: "#556B5A", textDecoration: "none", fontSize: "0.95rem", fontWeight: "700",
    borderBottom: "2px solid #556B5A", paddingBottom: "2px",
  },
  main: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" },
  header: { textAlign: "center", marginBottom: "30px", width: "100%", maxWidth: "1100px" },
  backLink: { color: "#D18B5B", textDecoration: "none", fontSize: "0.9rem", display: "inline-block", marginBottom: "16px" },
  title: {
    fontSize: "2.2rem", fontWeight: "700", color: "#556B5A", margin: "0 0 12px 0",
    display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
  },
  titleLogo: { width: "48px", height: "48px", objectFit: "contain", borderRadius: "10px" },
  divider: {
    height: "4px", width: "60px", borderRadius: "4px",
    background: "linear-gradient(90deg, #C1E1D2, #D18B5B, #C9D8C4)",
    margin: "0 auto 16px",
  },
  subtitle: { color: "#7a8f7e", fontSize: "1rem", lineHeight: "1.6" },
  appWrapper: {
    width: "100%", maxWidth: "1100px", borderRadius: "16px", overflow: "hidden",
    border: "1px solid #e0d8cc", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "50px",
  },
  link: { color: "#D18B5B", textDecoration: "none", fontWeight: "500" },
  footer: { backgroundColor: "#C1E1D2", borderTop: "1px solid #a8cfc0", padding: "24px 40px", textAlign: "center" },
  footerLinks: { display: "flex", justifyContent: "center", gap: "24px", marginBottom: "10px", flexWrap: "wrap" },
  footerLink: { color: "#556B5A", textDecoration: "none", fontSize: "0.88rem", fontWeight: "500" },
  footerText: { color: "#7a8f7e", fontSize: "0.82rem", margin: 0 },
}