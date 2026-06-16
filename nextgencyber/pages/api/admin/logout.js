import cookie from 'cookie'

export default function handler(req, res) {
  res.setHeader('Set-Cookie', cookie.serialize('ngc_admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  }))
  res.status(200).json({ success: true })
}