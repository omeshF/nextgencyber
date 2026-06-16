import { put } from '@vercel/blob'
import { isAuthenticated } from '../../lib/adminAuth'

export const config = { api: { bodyParser: { sizeLimit: '5mb' } } }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorised' })

  const { base64, filename, mimetype } = req.body

  try {
    const buffer = Buffer.from(base64, 'base64')
    const blob = await put(`covers/${Date.now()}-${filename}`, buffer, {
      access: 'public',
      contentType: mimetype,
    })
    return res.status(200).json({ url: blob.url })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}