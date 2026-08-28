# Phil Greene welcome email series

Three Mailtrap-compatible HTML templates for people who request a website checkup, lead-loss audit, or updates from philgreene.net.

## Sequence

| Send time | Template | Goal | Primary CTA |
| --- | --- | --- | --- |
| Immediately | `01-welcome-and-quick-win.html` | Welcome the reader and deliver an immediate diagnostic checklist | Check the lead journey |
| Day 2 | `02-where-leads-get-lost.html` | Help the reader recognize response and follow-up leaks | See the recovery workflow |
| Day 5 | `03-free-lead-loss-audit.html` | Convert an engaged subscriber into an audit request | Request my free audit |

## Mailtrap variables

Each template uses Mailtrap Handlebars syntax:

- `first_name`: optional. The greeting falls back to "Hi there" when it is empty.
- `business_name`: optional. Email 3 falls back to "your business" when it is empty.

When sending through Mailtrap's Templates API, pass these values in `template_variables`. The footer uses Mailtrap's bulk-stream unsubscribe placeholder, `__unsubscribe_url__`.

## Suggested subjects and preview text

1. Subject: `Your lead-recovery quick start`
   Preview: `A five-minute check for the places good local leads commonly get stuck.`
2. Subject: `Where good leads disappear`
   Preview: `The inquiry is only the beginning. What happens next determines whether it becomes a job.`
3. Subject: `Want me to find the leaks?`
   Preview: `I will review your lead journey and show you the most useful place to start.`

## Before sending

1. Create one Mailtrap template for each HTML file.
2. Add the matching subject and preview text.
3. Send tests to Gmail, Apple Mail, and Outlook.
4. Verify the CTA, reply-to address, privacy link, and unsubscribe link.
5. Use this sequence only for contacts who requested the audit/checkup or otherwise opted in.
