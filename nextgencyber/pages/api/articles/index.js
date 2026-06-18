import sql from '../../../lib/db'
import { isAuthenticated } from '../../../lib/adminAuth'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const articles = await sql`
        SELECT * FROM articles
        WHERE published = true
        ORDER BY created_at DESC
      `
      return res.status(200).json(articles)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorised' })

    const { title, slug, excerpt, content, categories, cover_image, published } = req.body

    try {
      const result = await sql`
      INSERT INTO articles (title, slug, excerpt, content, categories, cover_image, published)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${categories}, ${cover_image}, ${published})
      RETURNING *
      `
      return res.status(201).json(result[0])
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.status(405).end()
}