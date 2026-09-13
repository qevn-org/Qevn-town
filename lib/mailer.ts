import { Resend } from 'resend';

let _resendClient: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!_resendClient) {
    _resendClient = new Resend(apiKey);
  }
  return _resendClient;
}

export interface DispatchEmailPayload {
  dispatchId: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message?: string;
  phone?: string;
}

export async function sendDispatchNotification(payload: DispatchEmailPayload) {
  const resend = getResend();
  if (!resend) {
    console.warn('[MAILER] RESEND_API_KEY is not set. Skipping email dispatch.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  const { dispatchId, name, email, projectType, budget, timeline, message } = payload;
  const recipients = ['hello@qevn.in', 'qevngroup@gmail.com'];

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0A0A; color: #F7F7F2; margin: 0; padding: 24px; }
      .container { max-width: 600px; margin: 0 auto; background-color: #141414; border: 3px solid #000000; box-shadow: 8px 8px 0px #B7FF00; padding: 32px; }
      .header { border-bottom: 2px solid #262626; padding-bottom: 16px; margin-bottom: 24px; }
      .badge { display: inline-block; background-color: #B7FF00; color: #000000; font-weight: 900; font-size: 11px; padding: 4px 10px; text-transform: uppercase; letter-spacing: 1px; }
      .title { font-size: 24px; font-weight: 900; color: #FFFFFF; margin-top: 12px; margin-bottom: 4px; text-transform: uppercase; letter-spacing: -0.5px; }
      .dispatch-id { font-family: monospace; font-size: 13px; color: #A3A3A3; }
      .grid { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 24px; }
      .grid td { padding: 12px; border: 1px solid #262626; font-size: 13px; font-family: monospace; }
      .grid td.label { width: 35%; background-color: #0A0A0A; color: #A3A3A3; font-weight: bold; text-transform: uppercase; }
      .grid td.value { background-color: #1A1A1A; color: #FFFFFF; font-weight: bold; }
      .message-box { background-color: #0A0A0A; border-left: 4px solid #B7FF00; padding: 16px; margin-bottom: 24px; font-family: monospace; font-size: 13px; color: #E5E5E5; line-height: 1.6; }
      .footer { border-top: 1px solid #262626; padding-top: 16px; font-size: 11px; font-family: monospace; color: #737373; text-align: center; }
      .action-btn { display: inline-block; background-color: #B7FF00; color: #000000; font-weight: 900; font-size: 13px; text-decoration: none; padding: 12px 24px; border: 2px solid #000000; text-transform: uppercase; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <span class="badge">QEVN TOWN // NEW DISPATCH INQUIRY</span>
        <h1 class="title">${name} Commission Request</h1>
        <div class="dispatch-id">TRANSMISSION ID: ${dispatchId}</div>
      </div>

      <table class="grid">
        <tr>
          <td class="label">Project Type</td>
          <td class="value" style="color: #B7FF00;">${projectType}</td>
        </tr>
        <tr>
          <td class="label">Client Name</td>
          <td class="value">${name}</td>
        </tr>
        <tr>
          <td class="label">Contact Email</td>
          <td class="value"><a href="mailto:${email}" style="color: #38BDF8; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Estimated Budget</td>
          <td class="value">${budget}</td>
        </tr>
        <tr>
          <td class="label">Target Timeline</td>
          <td class="value">${timeline}</td>
        </tr>
      </table>

      ${
        message
          ? `
        <div style="font-family: monospace; font-size: 11px; color: #A3A3A3; text-transform: uppercase; margin-bottom: 8px;">Project Vision / Specifications:</div>
        <div class="message-box">${message.replace(/\n/g, '<br/>')}</div>
      `
          : ''
      }

      <div style="text-align: center; margin-top: 28px; margin-bottom: 24px;">
        <a href="mailto:${email}?subject=Re:%20QEVN%20Town%20Dispatch%20[${dispatchId}]" class="action-btn">
          Reply to ${name} →
        </a>
      </div>

      <div class="footer">
        ORIGIN: QEVN TOWN POST OFFICE (3D LIVING DIGITAL CITY)<br/>
        TRANSMITTED VIA QEVN EDGE DISPATCH ENGINE
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const data = await resend.emails.send({
      from: 'QEVN Town <town@qevn.in>',
      to: recipients,
      subject: `⚡ New Dispatch: [${projectType}] from ${name} (${budget})`,
      replyTo: email,
      html: emailHtml,
    });

    return { success: true, data };
  } catch (error) {
    console.error('[MAILER] Error sending dispatch email via Resend:', error);
    return { success: false, error };
  }
}
