import cookie from 'cookie'
import crypto from 'crypto'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const token = crypto
    .createHmac('sha256', process.env.ADMIN_PASSWORD)
    .update('ngc_admin')
    .digest('hex')

  res.setHeader('Set-Cookie', cookie.serialize('ngc_admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  }))

  return res.status(200).json({ success: true })
}