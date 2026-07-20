import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set - email sending will be disabled");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey || !params.from) {
    console.warn('SendGrid email skipped because credentials or sender are missing');
    return false;
  }

  try {
    const emailData = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text ?? '',
      ...(params.html ? { html: params.html } : {}),
      ...(params.replyTo ? { replyTo: params.replyTo } : {}),
    };

    await mailService.send(emailData);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}
