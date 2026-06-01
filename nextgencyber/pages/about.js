import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>About — NextGenCyber</title>
        <meta name="description" content="About NextGenCyber — open-source cybersecurity and ML research tools by Dr Omesh Fernando and Dr Sajid Fadlelseed, IEEE published researchers at the University of Hertfordshire." />
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

            {/* What is NextGenCyber */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>🔬 What is NextGenCyber?</h2>
              <p style={styles.text}>
                NextGenCyber is an open-source platform hosting cybersecurity and machine learning
                research tools, along with various educational tools — including{" "}
                <a href="https://learningpark.nextgencyber.co.uk" style={styles.link}>LearningPark</a>,
                a gamified learning platform designed to increase learner engagement and interactivity
                through innovative educational tools.
              </p>
              <p style={styles.text}>
                The goal is to make cutting-edge research accessible — turning academic work into
                practical, usable software that researchers, engineers, educators, and students can
                build on.
              </p>
            </section>

            {/* Current Tools */}
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

              <div style={{ ...styles.toolCard, marginTop: "20px" }}>
                <div style={styles.toolHeader}>
                  <span style={styles.toolIcon}>"/favicon.svg"</span>
                  <h3 style={styles.toolName}>LearningPark</h3>
                </div>
                <p style={styles.text}>
                  An interactive learning platform for educators to improve learner engagement
                  using various gamified learning tools. Designed to make teaching more dynamic,
                  measurable, and enjoyable for both educators and students.
                </p>
                <div style={styles.toolLinks}>
                  <a href="https://learningpark.nextgencyber.co.uk" style={styles.pillGreen}>Visit LearningPark →</a>
                </div>
              </div>
            </section>

            {/* Authors */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>👨‍💻 The Team</h2>

              {/* Omesh */}
              <div style={styles.authorCard}>
                <div style={styles.authorTop}>
                  <div style={styles.authorAvatar}>OF</div>
                  <div>
                    <h3 style={styles.authorName}>Dr Omesh Anthony Fernando</h3>
                    <p style={styles.authorRole}>Cybersecurity Researcher & Educator  </p>
                  </div>
                </div>
                <p style={styles.text}>
                  Dr Omesh Anthony Fernando is a Cybersecurity and Networking Researcher and Lecturer
                  at the University of Hertfordshire, teaching across Cybersecurity, Networking, and
                  Data Science. He completed his BSc (Hons) in Applied Computing with Networks at
                  Sheffield Hallam University (2015), his MSc in Computer Networks Practice and
                  Principles at the University of Hertfordshire (2018), and his PhD in Computer
                  Science at the University of Hertfordshire (2023).
                </p>
                <p style={styles.text}>
                  He has presented at leading international conferences including IEEE WCNC, MDPI,
                  and EAI CollaborateCom, and is actively involved in developing testbeds and
                  algorithms for securing future network infrastructures. His research interests span
                  5G, B5G, 6G, Software-Defined Networking (SDN), Data Plane Programming,
                  Multi-Access Edge Computing (MEC), and Deep Learning (DL), with a focus on enabling
                  secure and intelligent future telecommunications infrastructures.
                </p>
                <div style={styles.toolLinks}>
                  <a href="https://scholar.google.co.uk/citations?user=KEuh_MkAAAAJ&hl=en&oi=ao" style={styles.pill}>
                    Google Scholar
                  </a>
                  <a href="https://github.com/omeshF" style={styles.pill}>GitHub</a>
                </div>
              </div>

              {/* Sajid */}
              <div style={{ ...styles.authorCard, marginTop: "20px" }}>
                <div style={styles.authorTop}>
                  <div style={{ ...styles.authorAvatar, backgroundColor: "#b8d8f0" }}>SF</div>
                  <div>
                    <h3 style={styles.authorName}>Dr Sajid Fadlelseed</h3>
                    <p style={styles.authorRole}>Computer Science Researcher & Educator </p>
                  </div>
                </div>
                <p style={styles.text}>
                  Dr Sajid Fadlelseed is a Computer Science Researcher and Lecturer at the University
                  of Hertfordshire, where he teaches modules in Embedded Systems and Fault Tolerance
                  Algorithms. He received both his MSc and PhD in Computer Science from the University
                  of Hertfordshire, with his studies supported by the National University of Sudan (NUSU).
                </p>
                <p style={styles.text}>
                  His research interests include mixed-criticality scheduling, real-time embedded systems,
                  fault tolerance, Network-on-Chip (NoC) architectures, and optimisation techniques.
                  He has conducted research on Dependable Real-Time (DRT) services and Software
                  Integrity Levels (SIL).
                </p>
                <div style={styles.toolLinks}>
                  <a href="https://scholar.google.co.uk/citations?user=IUiwG8gAAAAJ&hl=en&oi=ao" style={styles.pill}>
                    Google Scholar
                  </a>
                </div>
              </div>
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
    marginBottom: "16px",
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
  authorCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4d8",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  authorTop: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  },
  authorAvatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: "#b8e4c9",
    color: "#3a7d5a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "1rem",
    flexShrink: 0,
  },
  authorName: {
    fontSize: "1.1rem",
    fontWeight: "700",
    margin: "0 0 4px 0",
    color: "#2d2d2d",
  },
  authorRole: {
    fontSize: "0.82rem",
    color: "#7a7a6a",
    margin: 0,
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
  link: {
    color: "#3a7d5a",
    textDecoration: "none",
    fontWeight: "500",
  },
}