import sql from '../../../lib/db'
import { isAuthenticated } from '../../../lib/adminAuth'

export default async function handler(req, res) {
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorised' })

  try {
    const articles = await sql`
      SELECT * FROM articles
      ORDER BY created_at DESC
    `
    return res.status(200).json(articles)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}