import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid password. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login — NextGenCyber</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/trafficlens.jpg" />
      </Head>

      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>🛡️ Admin Login</h1>
          <p style={styles.subtitle}>NextGenCyber Content Management</p>
          <div style={styles.divider} />

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              style={styles.input}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={loading ? styles.btnDisabled : styles.btn}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#FFF7EA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0d8cc",
    borderRadius: "20px",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  title: { fontSize: "1.6rem", fontWeight: "700", color: "#556B5A", margin: "0 0 6px 0", textAlign: "center" },
  subtitle: { fontSize: "0.88rem", color: "#9aaa9e", textAlign: "center", margin: "0 0 20px 0" },
  divider: {
    height: "3px", width: "50px", borderRadius: "4px",
    background: "linear-gradient(90deg, #C1E1D2, #D18B5B)",
    margin: "0 auto 28px",
  },
  formGroup: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" },
  label: { fontSize: "0.85rem", fontWeight: "600", color: "#556B5A" },
  input: {
    padding: "10px 14px", borderRadius: "8px", border: "1px solid #e0d8cc",
    backgroundColor: "#FFF7EA", fontSize: "0.92rem", color: "#3a4a3e",
    outline: "none", fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  btn: {
    width: "100%", backgroundColor: "#D18B5B", color: "#fff", padding: "12px",
    borderRadius: "10px", border: "none", fontWeight: "600", fontSize: "1rem",
    cursor: "pointer", marginTop: "8px", fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  btnDisabled: {
    width: "100%", backgroundColor: "#c9b8a8", color: "#fff", padding: "12px",
    borderRadius: "10px", border: "none", fontWeight: "600", fontSize: "1rem",
    cursor: "not-allowed", marginTop: "8px", fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  error: {
    backgroundColor: "#fef0f0", border: "1px solid #f5c6c6",
    borderRadius: "8px", padding: "10px 14px", color: "#c0392b",
    fontSize: "0.85rem", margin: "0 0 12px 0",
  },
}