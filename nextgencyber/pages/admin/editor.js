import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Link as TiptapLink } from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

const CATEGORIES = ['Further Education', 'Higher Education', 'Learner Engagement', 'Gamified Learning', 'AI & Education', 'AI & Cyber']

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function buildInTextCitation(fields) {
  const { authors, year } = fields
  const surnames = authors
    .split(/\s+and\s+|,\s*&\s*/i)
    .map(part => part.split(',')[0].trim())
    .filter(Boolean)

  let inText = ''
  if (surnames.length === 1) {
    inText = surnames[0]
  } else if (surnames.length === 2) {
    inText = surnames[0] + ' and ' + surnames[1]
  } else if (surnames.length > 2) {
    inText = surnames[0] + ' et al.'
  }

  return '(' + inText + ', ' + year + ')'
}

function buildHarvardReference(fields) {
  const { authors, year, title, source, publisher, url, accessDate } = fields
  let citation = ''

  if (authors) citation += authors + ' '
  if (year) citation += '(' + year + ') '
  if (title) citation += "'" + title + "', "
  if (source) citation += source + '. '
  if (publisher) citation += publisher + '. '
  if (url) {
    citation += 'Available at: ' + url + ' '
    if (accessDate) citation += '(Accessed: ' + accessDate + ').'
  }

  return citation.trim()
}

function CitationModal({ onInsert, onClose }) {
  const [authors, setAuthors] = useState('')
  const [year, setYear] = useState('')
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [publisher, setPublisher] = useState('')
  const [url, setUrl] = useState('')
  const [accessDate, setAccessDate] = useState('')

  const fields = { authors, year, title, source, publisher, url, accessDate }
  const inTextPreview = authors && year ? buildInTextCitation(fields) : ''
  const referencePreview = buildHarvardReference(fields)

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalBox}>
        <h3 style={styles.modalTitle}>Insert Harvard Citation</h3>

        <div style={styles.modalGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Author(s) *</label>
            <input
              value={authors}
              onChange={e => setAuthors(e.target.value)}
              placeholder="Smith, J. and Doe, A."
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Year *</label>
            <input
              value={year}
              onChange={e => setYear(e.target.value)}
              placeholder="2025"
              style={styles.input}
            />
          </div>
          <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
            <label style={styles.label}>Title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title of the work"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Source / Journal</label>
            <input
              value={source}
              onChange={e => setSource(e.target.value)}
              placeholder="Journal name, vol(issue), pages"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Publisher</label>
            <input
              value={publisher}
              onChange={e => setPublisher(e.target.value)}
              placeholder="Publisher name"
              style={styles.input}
            />
          </div>
          <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
            <label style={styles.label}>URL</label>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://..."
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Accessed Date</label>
            <input
              value={accessDate}
              onChange={e => setAccessDate(e.target.value)}
              placeholder="17 June 2026"
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.previewBox}>
          <p style={styles.previewLabel}>In-text citation (inserted at cursor):</p>
          <p style={styles.previewText}>{inTextPreview || 'Fill in author and year...'}</p>
        </div>

        <div style={styles.previewBox}>
          <p style={styles.previewLabel}>Full reference (added to reference list):</p>
          <p style={styles.previewText}>{referencePreview || 'Reference preview will appear here...'}</p>
        </div>

        <div style={styles.modalActions}>
          <button onClick={onClose} style={styles.modalCancelBtn}>Cancel</button>
          <button
            onClick={() => onInsert(inTextPreview, referencePreview)}
            disabled={!authors || !year || !title}
            style={(!authors || !year || !title) ? styles.modalInsertBtnDisabled : styles.modalInsertBtn}
          >
            Insert Citation
          </button>
        </div>
      </div>
    </div>
  )
}

function MenuBar({ editor, onCiteClick }) {
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
      {btn(() => editor.chain().focus().toggleBulletList().run(), 'List', editor.isActive('bulletList'))}
      {btn(() => editor.chain().focus().toggleOrderedList().run(), 'Ordered', editor.isActive('orderedList'))}
      {btn(() => editor.chain().focus().toggleBlockquote().run(), 'Quote', editor.isActive('blockquote'))}
      {btn(() => editor.chain().focus().toggleCodeBlock().run(), 'Code', editor.isActive('codeBlock'))}
      <button
        onClick={() => {
          const url = window.prompt('Enter URL:')
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }}
        style={editor.isActive('link') ? styles.menuBtnActive : styles.menuBtn}
        type="button"
      >Link</button>

      <span style={styles.menuDivider} />

      {btn(() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), 'Table', false)}
      {btn(() => editor.chain().focus().addColumnAfter().run(), '+Col', false)}
      {btn(() => editor.chain().focus().addRowAfter().run(), '+Row', false)}
      {btn(() => editor.chain().focus().deleteColumn().run(), '-Col', false)}
      {btn(() => editor.chain().focus().deleteRow().run(), '-Row', false)}
      {btn(() => editor.chain().focus().deleteTable().run(), 'Del Table', false)}

      <span style={styles.menuDivider} />

      <button onClick={onCiteClick} style={styles.citeBtn} type="button">
        Cite (Harvard)
      </button>

      <span style={styles.menuDivider} />

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
  const [categories, setCategories] = useState([])
  const [coverImage, setCoverImage] = useState('')
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadingFigure, setUploadingFigure] = useState(false)
  const [showCiteModal, setShowCiteModal] = useState(false)
  const [references, setReferences] = useState([])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TiptapLink.configure({ openOnClick: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
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
    fetch('/api/articles/' + editSlug)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setTitle(data.title)
        setSlug(data.slug)
        setExcerpt(data.excerpt || '')
        setCategories(data.categories || [])
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

  const handleFigureUpload = useCallback(async (e) => {
    const file = e.target.files[0]
    if (!file || !editor) return
    setUploadingFigure(true)
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1]
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, filename: file.name, mimetype: file.type }),
      })
      const data = await res.json()
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url, alt: file.name }).run()
      }
      setUploadingFigure(false)
    }
    reader.readAsDataURL(file)
  }, [editor])

  const handleInsertCitation = (inTextCitation, fullReference) => {
    if (editor) {
      editor.chain().focus().insertContent(inTextCitation + ' ').run()
    }
    setReferences(prev => prev.includes(fullReference) ? prev : [...prev, fullReference])
    setShowCiteModal(false)
  }

  const handleInsertReferenceList = () => {
    if (!editor || references.length === 0) return
    const list = [...references]
      .sort()
      .map(ref => '<p>' + ref + '</p>')
      .join('')
    editor.chain().focus().insertContent('<h2>References</h2>' + list).run()
  }

  const handleSave = async (publishOverride) => {
    setSaving(true)
    setStatus(null)
    const content = editor?.getHTML() || ''
    const body = {
      title,
      slug,
      excerpt,
      content,
      categories,
      cover_image: coverImage,
      published: publishOverride !== undefined ? publishOverride : published,
}

    const res = await fetch(
      isEditing ? '/api/articles/' + editSlug : '/api/articles',
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
        router.push('/admin/editor?slug=' + data.slug)
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
        <link rel="icon" href="/trafficlens.png" />
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
          .ProseMirror table { border-collapse: collapse; width: 100%; margin: 1rem 0; overflow: hidden; }
          .ProseMirror table td, .ProseMirror table th { border: 1px solid #e0d8cc; padding: 8px 12px; text-align: left; vertical-align: top; }
          .ProseMirror table th { background-color: #C9D8C4; font-weight: 600; color: #3a4a3e; }
          .ProseMirror table .selectedCell { background-color: #C1E1D2; }
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
                <MenuBar editor={editor} onCiteClick={() => setShowCiteModal(true)} />
                <div style={styles.figureUploadRow}>
                  <label style={styles.figureUploadBtn}>
                    {uploadingFigure ? 'Uploading figure...' : 'Insert Figure / Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFigureUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                <div style={styles.editorWrapper}>
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>

            <div style={styles.rightCol}>
              <div style={styles.sideCard}>
                <h3 style={styles.sideTitle}>Settings</h3>

                <div style={styles.formGroup}>
  <label style={styles.label}>Categories (select one or more)</label>
  <div style={styles.checkboxList}>
    {CATEGORIES.map(c => (
      <label key={c} style={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={categories.includes(c)}
          onChange={() => {
            setCategories(prev =>
              prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
            )
          }}
        />
        <span>{c}</span>
      </label>
    ))}
  </div>
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

              <div style={styles.sideCard}>
                <h3 style={styles.sideTitle}>References ({references.length})</h3>
                {references.length === 0 ? (
                  <p style={{ fontSize: "0.82rem", color: "#9aaa9e", margin: 0 }}>
                    No citations added yet. Use the Cite (Harvard) button in the toolbar.
                  </p>
                ) : (
                  <>
                    <ul style={{ paddingLeft: "18px", margin: "0 0 12px 0" }}>
                      {[...references].sort().map((ref, i) => (
                        <li key={i} style={{ fontSize: "0.78rem", color: "#556B5A", marginBottom: "6px", lineHeight: "1.5" }}>
                          {ref}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={handleInsertReferenceList}
                      style={styles.uploadBtn}
                    >
                      Insert Reference List at Cursor
                    </button>
                  </>
                )}
              </div>

              {isEditing && (
                <div style={styles.sideCard}>
                  <h3 style={styles.sideTitle}>Preview</h3>
                  <a href={'/article/' + slug} target="_blank" rel="noreferrer" style={styles.previewLink}>View Article</a>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showCiteModal && (
        <CitationModal
          onInsert={handleInsertCitation}
          onClose={() => setShowCiteModal(false)}
        />
      )}
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
    alignItems: "center",
  },
  menuDivider: {
    width: "1px",
    height: "20px",
    backgroundColor: "#e0d8cc",
    margin: "0 4px",
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
  citeBtn: {
    padding: "4px 12px",
    borderRadius: "6px",
    border: "1px solid #D18B5B",
    backgroundColor: "#fdf0e6",
    color: "#D18B5B",
    fontSize: "0.78rem",
    cursor: "pointer",
    fontWeight: "700",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  figureUploadRow: {
    padding: "10px 12px",
    borderBottom: "1px solid #e0d8cc",
    backgroundColor: "#fbf7ee",
  },
  figureUploadBtn: {
    display: "inline-block",
    padding: "6px 14px",
    backgroundColor: "#C9D8C4",
    color: "#556B5A",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.8rem",
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
    width: "100%",
    textAlign: "center",
    padding: "9px",
    backgroundColor: "#C9D8C4",
    color: "#556B5A",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.85rem",
    marginBottom: "8px",
    border: "none",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
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
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modalBox: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "28px",
    width: "100%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  modalTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#556B5A",
    margin: "0 0 20px 0",
  },
  modalGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "20px",
  },
  previewBox: {
    backgroundColor: "#FFF7EA",
    border: "1px solid #e0d8cc",
    borderRadius: "10px",
    padding: "14px 16px",
    marginBottom: "16px",
  },
  previewLabel: {
    fontSize: "0.78rem",
    fontWeight: "600",
    color: "#9aaa9e",
    margin: "0 0 6px 0",
    textTransform: "uppercase",
  },
  previewText: {
    fontSize: "0.9rem",
    color: "#3a4a3e",
    lineHeight: "1.6",
    margin: 0,
    fontStyle: "italic",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  modalCancelBtn: {
    backgroundColor: "transparent",
    color: "#9aaa9e",
    border: "1px solid #e0d8cc",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.88rem",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  modalInsertBtn: {
    backgroundColor: "#D18B5B",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.88rem",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  modalInsertBtnDisabled: {
    backgroundColor: "#e0d0c0",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "not-allowed",
    fontWeight: "600",
    fontSize: "0.88rem",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  checkboxList: {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
},
checkboxRow: {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "0.85rem",
  color: "#3a4a3e",
  cursor: "pointer",
},
}