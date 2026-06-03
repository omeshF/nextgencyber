export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NextGenCyber <noreply@nextgencyber.co.uk>',
        to: ['customer.support@nextgencyber.co.uk'],
        reply_to: email,
        subject: `[NextGenCyber Enquiry] ${subject || 'New message from ' + name}`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(90deg, #b8e4c9, #ffe599, #b8d8f0); height: 4px; border-radius: 4px;"></div>
            <div style="padding: 32px; background: #fdf9f0; border: 1px solid #e8e4d8; border-radius: 12px; margin-top: 16px;">
              <h2 style="color: #3a7d5a; margin: 0 0 24px 0;">📬 New Enquiry — NextGenCyber</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #7a7a6a; font-size: 0.85rem; width: 100px;"><strong>Name</strong></td>
                  <td style="padding: 8px 0; color: #2d2d2d;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #7a7a6a; font-size: 0.85rem;"><strong>Email</strong></td>
                  <td style="padding: 8px 0; color: #2d2d2d;"><a href="mailto:${email}" style="color: #3a7d5a;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #7a7a6a; font-size: 0.85rem;"><strong>Subject</strong></td>
                  <td style="padding: 8px 0; color: #2d2d2d;">${subject || 'Not specified'}</td>
                </tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: #ffffff; border: 1px solid #e8e4d8; border-radius: 8px;">
                <p style="color: #7a7a6a; font-size: 0.85rem; margin: 0 0 8px 0;"><strong>Message</strong></p>
                <p style="color: #2d2d2d; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="color: #9a9a8a; font-size: 0.78rem; margin-top: 24px; border-top: 1px solid #e8e4d8; padding-top: 16px;">
                Sent from nextgencyber.co.uk contact form · Reply directly to this email to respond to ${name}
              </p>
            </div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true })

  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}