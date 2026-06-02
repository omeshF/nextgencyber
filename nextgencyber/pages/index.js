import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>NextGenCyber — Network Traffic to Image Converter</title>
        <meta name="description" content="Convert network traffic CSV files into CNN-ready RGB images for anomaly detection, or decode images back to CSV. Free open-source tool by Dr Omesh Fernando, University of Hertfordshire." />
        <meta name="keywords" content="network traffic, CSV to image, CNN, anomaly detection, cybersecurity, machine learning, net2i, i2net, 5G security" />
        <meta name="google-adsense-account" content="ca-pub-3806712449234414" />
        <meta property="og:title" content="NextGenCyber — Network Traffic to Image Converter" />
        <meta property="og:description" content="Convert network traffic CSV to CNN-ready images for ML-based anomaly detection." />
        <meta property="og:url" content="https://www.nextgencyber.co.uk" />
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
            <Link href="/" style={styles.navLinkActive}>TrafficLens</Link>
            <a href="https://learningpark.nextgencyber.co.uk" style={styles.navLink}>LearningPark</a>
            <Link href="/about" style={styles.navLink}>About</Link>
            <Link href="/contact" style={styles.navLink}>Contact</Link>
          </div>
        </nav>

        <main style={styles.main}>
          <header style={styles.header}>
            <h1 style={styles.title}>🔁 TrafficLens</h1>
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

          <section style={styles.infoSection}>
            <h2 style={styles.infoHeading}>What is TrafficLens?</h2>
            <p style={styles.infoText}>
              TrafficLens implements the NeT2I (Network Traffic to Image) and I2NeT (Image to Network)
              algorithms developed at the University of Hertfordshire. It encodes network traffic
              features — including IPv4/IPv6 addresses, MAC addresses, timestamps, and flow statistics —
              into RGB pixel values, producing images that can be directly fed into Convolutional Neural
              Networks (CNNs) for intrusion detection and anomaly classification.
            </p>
            <p style={styles.infoText}>
              This approach introduces CiNeT, a novel deep learning-based Intrusion Detection System
              employing a bijective encoding–decoding framework between network traffic features and
              their RGB representations. The pipeline provides a lossless, deterministic method for
              encoding and decoding both IPv4 and IPv6 network data, validated in 5G and Mobile Edge
              Computing (MEC) environments. The bidirectional design means encoded data can be fully
              reconstructed back to CSV format, making it suitable for research pipelines requiring
              lossless round-trips.
            </p>
            <p style={styles.infoText}>
              Published in{" "}
              <a href="https://www.mdpi.com/2673-8732/5/4/42" style={styles.link}>
                MDPI Network (2025)
              </a>
              {" "}and presented at the{" "}
              <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.link}>
                IEEE Wireless Communications and Networking Conference (WCNC) 2023
              </a>.
            </p>
          </section>

          <section style={styles.cardRow}>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>📤</span>
              <h3 style={styles.featureTitle}>CSV → Images</h3>
              <p style={styles.featureText}>
                Upload a network traffic CSV. Each row is encoded into an RGB image using IEEE 754
                floating-point encoding for numeric fields, and specialised encoders for IP, MAC,
                and timestamp fields.
              </p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>📥</span>
              <h3 style={styles.featureTitle}>Images → CSV</h3>
              <p style={styles.featureText}>
                Upload a ZIP of net2i-generated PNG images or individual files to reconstruct the
                original CSV. Supports both IPv4 and IPv6 encoded datasets with adaptive decoding.
              </p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🧠</span>
              <h3 style={styles.featureTitle}>CNN Ready</h3>
              <p style={styles.featureText}>
                Output images are sized and structured for direct use as input to CNN architectures
                for network intrusion detection systems (NIDS) and traffic classification models.
              </p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🌐</span>
              <h3 style={styles.featureTitle}>IPv4 & IPv6</h3>
              <p style={styles.featureText}>
                Full support for both IPv4 and IPv6 network traffic datasets, with automatic protocol
                detection and separate encoding strategies optimised for each address format.
              </p>
            </div>
          </section>

          <section style={styles.usageSection}>
            <h2 style={styles.infoHeading}>How to Use</h2>
            <div style={styles.stepsRow}>
              <div style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <p style={styles.stepText}>Select the <strong>CSV → Images</strong> tab and upload your network traffic CSV file.</p>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <p style={styles.stepText}>Click <strong>Convert to Images</strong> and wait for processing to complete.</p>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <p style={styles.stepText}>Download the ZIP file containing your encoded PNG images and metadata JSON files.</p>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNumber}>4</div>
                <p style={styles.stepText}>Use the <strong>Images → CSV</strong> tab to decode images back to CSV at any time.</p>
              </div>
            </div>
          </section>

          <section style={styles.citationSection}>
            <h2 style={styles.infoHeading}>Citation</h2>
            <p style={styles.infoText}>If you use TrafficLens or the NeT2I algorithms in your research, please cite:</p>

            <p style={styles.infoText}><strong>Primary paper (MDPI Network 2025):</strong></p>
            <pre style={styles.codeBlock}>{`@article{fernando2025bijective,
  title={Bijective Network-to-Image Encoding for Interpretable
         CNN-Based Intrusion Detection System},
  author={Fernando, Omesh A and Spring, Joseph and Xiao, Hannan},
  journal={Network},
  volume={5},
  number={4},
  pages={42},
  year={2025},
  publisher={MDPI}
}`}</pre>

            <p style={styles.infoText}><strong>Conference paper (IEEE WCNC 2023):</strong></p>
            <pre style={styles.codeBlock}>{`@inproceedings{fernando2023new,
  title={New algorithms for the detection of malicious traffic in 5g-mec},
  author={Fernando, Omesh A and Xiao, Hannan and Spring, Joseph},
  booktitle={2023 IEEE Wireless Communications and Networking
             Conference (WCNC)},
  pages={1--6},
  year={2023},
  organization={IEEE}
}`}</pre>

            <div style={styles.citationLinks}>
              <a href="https://www.mdpi.com/2673-8732/5/4/42" style={styles.pill}>MDPI Network 2025</a>
              <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.pill}>IEEE WCNC 2023</a>
              <a href="https://pypi.org/project/net2i/" style={styles.pill}>net2i on PyPI</a>
              <a href="https://pypi.org/project/i2net/" style={styles.pill}>i2net on PyPI</a>
              <a href="https://github.com/omeshF/NeT2I" style={styles.pill}>GitHub</a>
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
            <a href="https://ieeexplore.ieee.org/abstract/document/10118803" style={styles.footerLink}>IEEE Paper</a>
          </div>
          <p style={styles.footerText}>© {new Date().getFullYear()} Omesh Fernando · University of Hertfordshire · MIT License</p>
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
    lineHeight: "1.6",
  },
  appWrapper: {
    width: "100%",
    maxWidth: "1100px",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #e8e4d8",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    marginBottom: "50px",
  },
  infoSection: {
    width: "100%",
    maxWidth: "1100px",
    marginBottom: "40px",
  },
  infoHeading: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#2a6080",
    marginBottom: "16px",
  },
  infoText: {
    fontSize: "0.95rem",
    color: "#4a4a3a",
    lineHeight: "1.8",
    margin: "0 0 12px 0",
  },
  cardRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "1100px",
    marginBottom: "50px",
  },
  featureCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4d8",
    borderRadius: "14px",
    padding: "22px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  featureIcon: {
    fontSize: "1.8rem",
    display: "block",
    marginBottom: "10px",
  },
  featureTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#2d2d2d",
    margin: "0 0 8px 0",
  },
  featureText: {
    fontSize: "0.85rem",
    color: "#6a6a5a",
    lineHeight: "1.6",
    margin: 0,
  },
  usageSection: {
    width: "100%",
    maxWidth: "1100px",
    marginBottom: "50px",
  },
  stepsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  step: {
    backgroundColor: "#eaf4f8",
    border: "1px solid #c8dfe8",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  stepNumber: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#3a7d5a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.9rem",
  },
  stepText: {
    fontSize: "0.88rem",
    color: "#4a6070",
    lineHeight: "1.6",
    margin: 0,
  },
  citationSection: {
    width: "100%",
    maxWidth: "1100px",
    marginBottom: "50px",
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
    margin: "0 0 16px 0",
  },
  citationLinks: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
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