import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>About — NextGenCyber</title>
        <meta name="description" content="About NextGenCyber — open-source cybersecurity and ML research tools by Omesh Fernando, IEEE published researcher." />
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
            <Link href="/about" style={styles.navLinkActive}>About</Link>
            <Link href="/contact" style={styles.navLink}>Contact</Link>
          </div>
        </nav>

        <main style={styles.main}>
          <div style={styles.container}>
            <h1 style={styles.title}>About NextGenCyber</h1>
            <div style={styles.divider} />

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>🔬 What is NextGenCyber?</h2>
              <p style={styles.text}>
                NextGenCyber is an open-source platform hosting cybersecurity and machine learning
                research tools. The goal is to make cutting-edge research accessible — turning
                academic work into practical, usable software that researchers, engineers, and
                students can build on.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>👨‍💻 About the Author</h2>
              <p style={styles.text}>
                NextGenCyber is developed and maintained by <strong>Omesh Fernando</strong>,
                a cybersecurity researcher with a focus on machine learning applications in
                network security, particularly in 5G and Mobile Edge Computing (MEC) environments.
              </p>
              <p style={styles.text}>
                Omesh's research has been published at the{" "}
                <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.link}>
                  IEEE Wireless Communications and Networking Conference (WCNC) 2023
                </a>
                , where the foundational algorithms behind the NeT2I tool were first presented.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>🛠️ Current Tools</h2>
              <div style={styles.toolCard}>
                <div style={styles.toolHeader}>
                  <span style={styles.toolIcon}>🔁</span>
                  <h3 style={styles.toolName}>TrafficLens (NeT2I / I2NeT)</h3>
                </div>
                <p style={styles.text}>
                  Converts network traffic CSV data into RGB images suitable for CNN-based
                  anomaly detection, and decodes images back to CSV. Available as a Python
                  package on PyPI and as an interactive web tool.
                </p>
                <div style={styles.toolLinks}>
                  <a href="https://pypi.org/project/net2i/" style={styles.pill}>net2i on PyPI</a>
                  <a href="https://pypi.org/project/i2net/" style={styles.pill}>i2net on PyPI</a>
                  <a href="https://github.com/omeshF/NeT2I" style={styles.pill}>GitHub</a>
                  <Link href="/net2i" style={styles.pillGreen}>Try it →</Link>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>📚 Citation</h2>
              <p style={styles.text}>If you use these tools in your research, please cite:</p>
              <pre style={styles.codeBlock}>{`@inproceedings{fernando2023new,
  title={New algorithms for the detection of malicious 
         traffic in 5g-mec},
  author={Fernando, Omesh A and Xiao, Hannan 
          and Spring, Joseph},
  booktitle={2023 IEEE Wireless Communications 
             and Networking Conference (WCNC)},
  pages={1--6},
  year={2023},
  organization={IEEE}
}`}</pre>
            </section>

            <div style={styles.ctaRow}>
              <Link href="/contact" style={styles.ctaButton}>Get in Touch</Link>
              <Link href="/" style={styles.ctaOutline}>← Back to Tools</Link>
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
    marginBottom: "40px",
  },
  section: { marginBottom: "40px" },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#2a6080",
    marginBottom: "12px",
  },
  text: {
    fontSize: "0.95rem",
    color: "#4a4a3a",
    lineHeight: "1.8",
    margin: "0 0 12px 0",
  },
  toolCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4d8",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  toolHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  toolIcon: { fontSize: "1.8rem" },
  toolName: {
    fontSize: "1.1rem",
    fontWeight: "600",
    margin: 0,
    color: "#2d2d2d",
  },
  toolLinks: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "14px",
  },
  pill: {
    fontSize: "0.78rem",
    backgroundColor: "#eaf4f8",
    color: "#2a6080",
    padding: "5px 12px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "500",
  },
  pillGreen: {
    fontSize: "0.78rem",
    backgroundColor: "#e8f5ee",
    color: "#3a7d5a",
    padding: "5px 12px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "600",
  },
  codeBlock: {
    backgroundColor: "#f4f0e8",
    border: "1px solid #e0dac8",
    borderRadius: "10px",
    padding: "20px",
    fontSize: "0.8rem",
    lineHeight: "1.6",
    overflowX: "auto",
    color: "#3a3a2a",
    fontFamily: "monospace",
  },
  ctaRow: {
    display: "flex",
    gap: "16px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  ctaButton: {
    backgroundColor: "#3a7d5a",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
  ctaOutline: {
    backgroundColor: "transparent",
    color: "#3a7d5a",
    padding: "12px 24px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    border: "2px solid #3a7d5a",
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