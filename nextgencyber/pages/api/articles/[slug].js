import sql from '../../../lib/db'
import { isAuthenticated } from '../../../lib/adminAuth'

export default async function handler(req, res) {
  const { slug } = req.query

  if (req.method === 'GET') {
    try {
      const result = await sql`
        SELECT * FROM articles WHERE slug = ${slug} LIMIT 1
      `
      if (result.length === 0) return res.status(404).json({ error: 'Article not found' })
      return res.status(200).json(result[0])
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'PUT') {
    if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorised' })

    const { title, excerpt, content, categories, cover_image, published } = req.body

    try {
      const result = await sql`
        UPDATE articles SET
        title = ${title},
        excerpt = ${excerpt},
        content = ${content},
        categories = ${categories},
        cover_image = ${cover_image},
        published = ${published},
        updated_at = now()
      WHERE slug = ${slug}
      RETURNING *
      `
      return res.status(200).json(result[0])
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'DELETE') {
    if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorised' })

    try {
      await sql`DELETE FROM articles WHERE slug = ${slug}`
      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.status(405).end()
}