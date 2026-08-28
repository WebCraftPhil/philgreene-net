import { MailtrapClient } from 'mailtrap'

interface EmailParams {
  to: string
  from?: string
  fromName?: string
  replyTo?: string
  subject: string
  text?: string
  html?: string
  category?: string
}

export function getMailtrapConfig() {
  return {
    apiKey: process.env.MAILTRAP_API_KEY ?? process.env.MAILTRAP_API_TOKEN ?? '',
    fromEmail: process.env.MAILTRAP_FROM_EMAIL ?? process.env.DEFAULT_FROM_EMAIL ?? '',
    fromName: process.env.MAILTRAP_FROM_NAME ?? 'Phil Greene',
  }
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  const config = getMailtrapConfig()
  const fromEmail = params.from ?? config.fromEmail
  const fromName = params.fromName ?? config.fromName

  if (!config.apiKey || !fromEmail) {
    console.warn('Mailtrap email skipped because credentials or sender are missing')
    return false
  }

  try {
    const mailtrapClient = new MailtrapClient({ token: config.apiKey })

    await mailtrapClient.send({
      to: [{ email: params.to }],
      from: { name: fromName, email: fromEmail },
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
