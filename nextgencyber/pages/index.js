import Head from 'next/head'

const projects = [
  {
    name: "TrafficLens / NeT2I",
    description: "Convert network traffic CSV files into CNN-ready RGB images, or decode images back to CSV. Built for ML-based anomaly detection in 5G-MEC networks.",
    url: "https://net2i.nextgencyber.co.uk",
    badge: "ML · Security · Research",
    icon: "🔁",
  },
  // Add more projects here later
]

export default function Home() {
  return (
    <>
      <Head>
        <title>NextGenCyber — Research Tools</title>
        <meta name="description" content="Cybersecurity and ML research tools by Omesh Fernando." />
      </Head>

      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>NextGenCyber</h1>
          <p style={styles.subtitle}>
            Cybersecurity &amp; Machine Learning Research Tools
          </p>
        </header>

        <section style={styles.grid}>
          {projects.map((p) => (
            <a key={p.name} href={p.url} style={styles.card}>
              <div style={styles.cardIcon}>{p.icon}</div>
              <h2 style={styles.cardTitle}>{p.name}</h2>
              <p style={styles.cardDesc}>{p.description}</p>
              <span style={styles.badge}>{p.badge}</span>
            </a>
          ))}
        </section>

        <footer style={styles.footer}>
          <p>© {new Date().getFullYear()} Omesh Fernando · MIT License</p>
          <p>
            <a href="https://github.com/omeshF" style={styles.link}>GitHub</a>
            {" · "}
            <a href="https://pypi.org/user/omeshf91/" style={styles.link}>PyPI</a>
            {" · "}
            <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.link}>IEEE Paper</a>
          </p>
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
    padding: "60px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "700",
    background: "linear-gradient(90deg, #00c6ff, #0072ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#888",
    marginTop: "12px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "900px",
  },
  card: {
    backgroundColor: "#141414",
    border: "1px solid #222",
    borderRadius: "12px",
    padding: "28px",
    textDecoration: "none",
    color: "#f0f0f0",
    transition: "border-color 0.2s, transform 0.2s",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    cursor: "pointer",
  },
  cardIcon: {
    fontSize: "2rem",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    margin: 0,
    color: "#fff",
  },
  cardDesc: {
    fontSize: "0.9rem",
    color: "#aaa",
    lineHeight: "1.6",
    margin: 0,
    flexGrow: 1,
  },
  badge: {
    fontSize: "0.75rem",
    backgroundColor: "#0072ff22",
    color: "#00c6ff",
    padding: "4px 10px",
    borderRadius: "20px",
    alignSelf: "flex-start",
  },
  footer: {
    marginTop: "80px",
    textAlign: "center",
    color: "#555",
    fontSize: "0.85rem",
    lineHeight: "2",
  },
  link: {
    color: "#0072ff",
    textDecoration: "none",
  },
}