import { sendEmail } from '../server/email'

const recipient = process.env.MAILTRAP_TEST_RECIPIENT ?? 'vtguy65@gmail.com'

const sent = await sendEmail({
  to: recipient,
  subject: 'You are awesome!',
  text: 'Congrats for sending test email with Mailtrap!',
  category: 'Integration Test',
})

if (!sent) {
  throw new Error('Mailtrap test email was not sent. Check MAILTRAP_API_TOKEN and MAILTRAP_FROM_EMAIL.')
}

console.log(`Mailtrap test email queued for ${recipient}.`)
console.log('Check sent logs: https://mailtrap.io/sending/email_logs')
