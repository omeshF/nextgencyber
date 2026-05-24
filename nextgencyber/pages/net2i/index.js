import Head from 'next/head'
import Script from 'next/script'

export default function Net2I() {
  return (
    <>
      <Head>
        <title>TrafficLens — NeT2I · NextGenCyber</title>
        <meta name="description" content="Convert network traffic CSV to CNN-ready images, or decode images back to CSV." />
      </Head>

      <Script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/6.14.0/gradio.js"
        strategy="afterInteractive"
      />

      <main style={styles.main}>
        <header style={styles.header}>
          <a href="https://nextgencyber.co.uk" style={styles.backLink}>← nextgencyber.co.uk</a>
          <h1 style={styles.title}>🔁 TrafficLens</h1>
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

        <footer style={styles.footer}>
          <p>
            <a href="https://github.com/omeshF/NeT2I" style={styles.link}>GitHub</a>
            {" · "}
            <a href="https://pypi.org/project/net2i/" style={styles.link}>PyPI</a>
            {" · "}
            <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.link}>IEEE Paper</a>
          </p>
          <p style={{ color: "#555" }}>© {new Date().getFullYear()} Omesh Fernando · MIT License</p>
        </footer>
      </main>
    </>
  )
}

const styles = {
  main: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#f0f0f0",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    width: "100%",
    maxWidth: "1100px",
  },
  backLink: {
    display: "inline-block",
    marginBottom: "16px",
    color: "#555",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    background: "linear-gradient(90deg, #00c6ff, #0072ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0 0 10px 0",
  },
  subtitle: {
    color: "#888",
    fontSize: "1rem",
  },
  appWrapper: {
    width: "100%",
    maxWidth: "1100px",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #222",
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
    fontSize: "0.85rem",
    lineHeight: "2",
  },
  link: {
    color: "#0072ff",
    textDecoration: "none",
  },
}