import { MailtrapClient } from 'mailtrap'

const apiKey = process.env.MAILTRAP_API_KEY

if (!apiKey) {
  console.warn('MAILTRAP_API_KEY environment variable not set - email sending will be disabled')
}

const mailtrapClient = apiKey ? new MailtrapClient({ token: apiKey }) : null

interface EmailParams {
  to: string
  from: string
  replyTo?: string
  subject: string
  text?: string
  html?: string
  category?: string
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!mailtrapClient || !params.from) {
    console.warn('Mailtrap email skipped because credentials or sender are missing')
    return false
  }

  try {
    await mailtrapClient.send({
      to: [{ email: params.to }],
      from: { name: 'Phil Greene', email: params.from },
      subject: params.subject,
      text: params.text ?? '',
      ...(params.html ? { html: params.html } : {}),
      ...(params.replyTo ? { reply_to: { email: params.replyTo } } : {}),
      category: params.category ?? 'audit-request',
    })
    return true
  } catch (error) {
    if (error instanceof Error) {
      console.error('Mailtrap email error:', error.message)
    } else {
      console.error('Mailtrap email error:', error)
    }
    return false
  }
}
