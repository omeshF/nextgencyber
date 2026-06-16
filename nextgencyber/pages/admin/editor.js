import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Link as TiptapLink } from '@tiptap/extension-link'

const CATEGORIES = ['Further Education', 'Higher Education', 'Learner Engagement', 'Gamified Learning', 'AI & Education', 'AI & Cyber']

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function MenuBar({ editor }) {
  if (!editor) return null
  const btn = (action, label, active) => (
    <button
      onClick={action}
      style={active ? styles.menuBtnActive : styles.menuBtn}
      type="button"
    >
      {label}
    </button>
  )

  return (
    <div style={styles.menuBar}>
      {btn(() => editor.chain().focus().toggleBold().run(), 'B', editor.isActive('bold'))}
      {btn(() => editor.chain().focus().toggleItalic().run(), 'I', editor.isActive('italic'))}
      {btn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), 'H2', editor.isActive('heading', { level: 2 }))}
      {btn(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), 'H3', editor.isActive('heading', { level: 3 }))}
      {btn(() => editor.chain().focus().toggleBulletList().run(), '• List', editor.isActive('bulletList'))}
      {btn(() => editor.chain().focus().toggleOrderedList().run(), '1. List', editor.isActive('orderedList'))}
      {btn(() => editor.chain().focus().toggleBlockquote().run(), 'Quote', editor.isActive('blockquote'))}
      {btn(() => editor.chain().focus().toggleCodeBlock().run(), 'Code', editor.isActive('codeBlock'))}
      <button
        onClick={() => {
          const url = window.prompt('Enter URL:')
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }}
        style={editor.isActive('link') ? styles.menuBtnActive : styles.menuBtn}
        type="button"
      >
        Link
      </button>
      {btn(() => editor.chain().focus().setHorizontalRule().run(), 'HR', false)}
      {btn(() => editor.chain().focus().undo().run(), 'Undo', false)}
      {btn(() => editor.chain().focus().redo().run(), 'Redo', false)}
    </div>
  )
}

export default function Editor() {
  const router = useRouter()
  const { slug: editSlug } = router.query
  const isEditing = !!editSlug

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [coverImage, setCoverImage] = useState('')
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TiptapLink.configure({ openOnClick: false }),
    ],
    content: '',
    editorProps: {
      attributes: {
        style: 'min-height: 400px; padding: 20px; outline: none; font-family: Segoe UI, system-ui, sans-serif; font-size: 0.95rem; line-height: 1.8; color: #3a4a3e;',
      },
    },
  })

  useEffect(() => {
    if (!editSlug) return
    fetch(`/api/articles/${editSlug}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setTitle(data.title)
        setSlug(data.slug)
        setExcerpt(data.excerpt || '')
        setCategory(data.category || CATEGORIES[0])
        setCoverImage(data.cover_image || '')
        setPublished(data.published)
        editor?.commands.setContent(data.content || '')
      })
      .catch(() => router.push('/admin/login'))
  }, [editSlug, editor])

  useEffect(() => {
    if (!isEditing && title) {
      setSlug(slugify(title))
    }
  }, [title, isEditing])

  const handleCoverUpload = useCallback(async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1]
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, filename: file.name, mimetype: file.type }),
      })
      const data = await res.json()
      if (data.url) setCoverImage(data.url)
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleSave = async (publishOverride) => {
    setSaving(true)
    setStatus(null)
    const content = editor?.getHTML() || ''
    const body = {
      title,
      slug,
      excerpt,
      content,
      category,
      cover_image: coverImage,
      published: publishOverride !== undefined ? publishOverride : published,
    }

    const res = await fetch(
      isEditing ? `/api/articles/${editSlug}` : '/api/articles',
      {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )

    if (res.ok) {
      setStatus('success')
      if (!isEditing) {
        const data = await res.json()
        router.push(`/admin/editor?slug=${data.slug}`)
      }
    } else {
      const err = await res.json()
      setStatus(err.error || 'error')
    }
    setSaving(false)
  }

  return (
    <>
      <Head>
        <title>{isEditing ? 'Edit Article' : 'New Article'} -- NextGenCyber Admin</title>
        <link rel="icon" href="/trafficlens.jpg" />
        <style>{`
          .ProseMirror h2 { font-size: 1.4rem; font-weight: 700; color: #3a4a3e; margin: 1.5rem 0 0.8rem; }
          .ProseMirror h3 { font-size: 1.15rem; font-weight: 600; color: #3a4a3e; margin: 1.2rem 0 0.6rem; }
          .ProseMirror p { margin: 0 0 1rem 0; }
          .ProseMirror ul, .ProseMirror ol { padding-left: 1.5rem; margin-bottom: 1rem; }
          .ProseMirror li { margin-bottom: 0.3rem; }
          .ProseMirror blockquote { border-left: 4px solid #C1E1D2; padding-left: 1rem; color: #7a8f7e; margin: 1rem 0; font-style: italic; }
          .ProseMirror pre { background: #f4f0e8; border-radius: 8px; padding: 1rem; font-size: 0.85rem; overflow-x: auto; margin-bottom: 1rem; }
          .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
          .ProseMirror a { color: #D18B5B; text-decoration: underline; }
          .ProseMirror hr { border: none; border-top: 2px solid #e0d8cc; margin: 1.5rem 0; }
        `}</style>
      </Head>

      <div style={styles.page}>
        <nav style={styles.nav}>
          <Link href="/admin" style={styles.navBrand}>Back to Dashboard</Link>
          <div style={styles.navRight}>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              style={styles.draftBtn}
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              style={saving ? styles.publishBtnDisabled : styles.publishBtn}
            >
              {saving ? 'Saving...' : published ? 'Update' : 'Publish'}
            </button>
          </div>
        </nav>

        <main style={styles.main}>
          {status === 'success' && (
            <div style={styles.successBanner}>Article saved successfully!</div>
          )}
          {status && status !== 'success' && (
            <div style={styles.errorBanner}>Error: {status}</div>
          )}

          <div style={styles.formGrid}>
            <div style={styles.leftCol}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Article title..."
                  style={styles.titleInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Slug</label>
                <input
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="article-slug"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="Short summary shown on the homepage..."
                  rows={3}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.editorCard}>
                <label style={styles.label}>Content</label>
                <MenuBar editor={editor} />
                <div style={styles.editorWrapper}>
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>

            <div style={styles.rightCol}>
              <div style={styles.sideCard}>
                <h3 style={styles.sideTitle}>Settings</h3>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={styles.select}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <div style={styles.toggleRow}>
                    <span style={{ fontSize: "0.88rem", color: "#556B5A" }}>
                      {published ? 'Published' : 'Draft'}
                    </span>
                    <button
                      onClick={() => setPublished(!published)}
                      style={published ? styles.toggleOn : styles.toggleOff}
                    >
                      {published ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>

              <div style={styles.sideCard}>
                <h3 style={styles.sideTitle}>Cover Image</h3>
                {coverImage && (
                  <img src={coverImage} alt="Cover" style={styles.coverPreview} />
                )}
                <label style={styles.uploadBtn}>
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {coverImage && (
                  <button
                    onClick={() => setCoverImage('')}
                    style={styles.removeBtn}
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {isEditing && (
  <div style={styles.sideCard}>
    <h3 style={styles.sideTitle}>Preview</h3>
    
      href={'/articles/' + slug}
      target="_blank"
      rel="noreferrer"
      style={styles.previewLink}
    >
      View Article
        </a>
        </div>
    )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#FFF7EA",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  nav: {
    backgroundColor: "#C1E1D2",
    padding: "12px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #a8cfc0",
    flexWrap: "wrap",
    gap: "12px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navBrand: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#556B5A",
    textDecoration: "none",
  },
  navRight: { display: "flex", gap: "10px" },
  draftBtn: {
    backgroundColor: "#C9D8C4",
    color: "#556B5A",
    border: "none",
    padding: "8px 18px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.88rem",
    cursor: "pointer",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  publishBtn: {
    backgroundColor: "#D18B5B",
    color: "#fff",
    border: "none",
    padding: "8px 18px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.88rem",
    cursor: "pointer",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  publishBtnDisabled: {
    backgroundColor: "#c9b8a8",
    color: "#fff",
    border: "none",
    padding: "8px 18px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.88rem",
    cursor: "not-allowed",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 20px",
  },
  successBanner: {
    backgroundColor: "#e8f5ee",
    border: "1px solid #C1E1D2",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#3a7d5a",
    marginBottom: "24px",
    fontSize: "0.9rem",
  },
  errorBanner: {
    backgroundColor: "#fef0f0",
    border: "1px solid #f5c6c6",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#c0392b",
    marginBottom: "24px",
    fontSize: "0.9rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 300px",
    gap: "24px",
    alignItems: "start",
  },
  leftCol: { display: "flex", flexDirection: "column", gap: "20px" },
  rightCol: { display: "flex", flexDirection: "column", gap: "16px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: {
    fontSize: "0.82rem",
    fontWeight: "600",
    color: "#556B5A",
    marginBottom: "4px",
    display: "block",
  },
  titleInput: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #e0d8cc",
    backgroundColor: "#ffffff",
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#3a4a3e",
    outline: "none",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #e0d8cc",
    backgroundColor: "#ffffff",
    fontSize: "0.9rem",
    color: "#3a4a3e",
    outline: "none",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #e0d8cc",
    backgroundColor: "#ffffff",
    fontSize: "0.9rem",
    color: "#3a4a3e",
    outline: "none",
    resize: "vertical",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  editorCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0d8cc",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  menuBar: {
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
    padding: "10px 12px",
    borderBottom: "1px solid #e0d8cc",
    backgroundColor: "#FFF7EA",
  },
  menuBtn: {
    padding: "4px 10px",
    borderRadius: "6px",
    border: "1px solid #e0d8cc",
    backgroundColor: "#ffffff",
    color: "#556B5A",
    fontSize: "0.78rem",
    cursor: "pointer",
    fontWeight: "500",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  menuBtnActive: {
    padding: "4px 10px",
    borderRadius: "6px",
    border: "1px solid #556B5A",
    backgroundColor: "#C1E1D2",
    color: "#556B5A",
    fontSize: "0.78rem",
    cursor: "pointer",
    fontWeight: "700",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  editorWrapper: {
    backgroundColor: "#ffffff",
    minHeight: "400px",
  },
  sideCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0d8cc",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  sideTitle: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#556B5A",
    margin: "0 0 16px 0",
  },
  select: {
    padding: "9px 12px",
    borderRadius: "8px",
    border: "1px solid #e0d8cc",
    backgroundColor: "#FFF7EA",
    fontSize: "0.88rem",
    color: "#3a4a3e",
    outline: "none",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    width: "100%",
  },
  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleOn: {
    backgroundColor: "#3a7d5a",
    color: "#fff",
    border: "none",
    padding: "5px 14px",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "0.78rem",
    cursor: "pointer",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  toggleOff: {
    backgroundColor: "#e0d8cc",
    color: "#9aaa9e",
    border: "none",
    padding: "5px 14px",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "0.78rem",
    cursor: "pointer",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  coverPreview: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  uploadBtn: {
    display: "block",
    textAlign: "center",
    padding: "9px",
    backgroundColor: "#C9D8C4",
    color: "#556B5A",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.85rem",
    marginBottom: "8px",
  },
  removeBtn: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#c0392b",
    border: "1px solid #f5c6c6",
    borderRadius: "8px",
    padding: "7px",
    cursor: "pointer",
    fontSize: "0.82rem",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  previewLink: {
    color: "#D18B5B",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
}