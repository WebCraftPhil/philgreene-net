import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./sendgrid";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission API
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, projectType, budget, message } = req.body;

      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ 
          ok: false, 
          error: 'Name, email, and message are required' 
        });
      }

      if (!email.includes('@')) {
        return res.status(400).json({ 
          ok: false, 
          error: 'Please provide a valid email address' 
        });
      }

      if (message.length < 10) {
        return res.status(400).json({ 
          ok: false, 
          error: 'Message must be at least 10 characters long' 
        });
      }

      // Send email notification to me@philgreene.net
      const emailSent = await sendEmail({
        to: 'me@philgreene.net',
        from: 'noreply@philgreene.net', // This needs to be a verified sender in SendGrid
        subject: `New Contact Form Submission from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Project Type: ${projectType || 'Not specified'}
Budget: ${budget || 'Not specified'}

Message:
${message}

Submitted at: ${new Date().toISOString()}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
<p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
<p><strong>Budget:</strong> ${budget || 'Not specified'}</p>

<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>

<p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
        `
      });

      if (emailSent) {
        console.log(`Contact form submission emailed successfully from ${email}`);
      } else {
        console.log('Contact form submission (email not sent):', {
          name,
          email,
          projectType,
          budget,
          message,
          timestamp: new Date().toISOString()
        });
      }

      // TODO: Consider storing in database for backup
      // storage.insertContactSubmission({ name, email, projectType, budget, message });

      return res.json({ ok: true });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ 
        ok: false, 
        error: 'Internal server error' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
