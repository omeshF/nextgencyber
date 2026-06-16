import cookie from 'cookie'
import crypto from 'crypto'

export function isAuthenticated(req) {
  const cookies = cookie.parse(req.headers.cookie || '')
  const token = cookies['ngc_admin_session']
  if (!token) return false

  const expected = crypto
    .createHmac('sha256', process.env.ADMIN_PASSWORD)
    .update('ngc_admin')
    .digest('hex')

  return token === expected
}