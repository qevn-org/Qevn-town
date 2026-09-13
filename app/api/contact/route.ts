import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { sendDispatchNotification } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectType, budget, timeline, name, email, message, phone } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email)' },
        { status: 400 }
      );
    }

    const dispatchId = `QEVN-POST-${Math.floor(100000 + Math.random() * 900000)}`;
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 1. Store lead in Supabase database
    let dbSuccess = false;
    try {
      const { error: dbError } = await supabaseServer
        .from('qevn_leads')
        .insert({
          id: leadId,
          session_id: null,
          name: name.trim(),
          email: email.trim(),
          phone: phone?.trim() || null,
          company: `[QEVN Town] Budget: ${budget || 'Flexible'} | Timeline: ${timeline || 'Standard'}`,
          inquiry_type: `QEVN Town: ${projectType || 'Commission Inquire'}`,
          message: [
            `[DISPATCH ID]: ${dispatchId}`,
            `[PROJECT TYPE]: ${projectType || 'General Inquire'}`,
            `[BUDGET]: ${budget || 'Flexible'}`,
            `[TIMELINE]: ${timeline || 'Standard'}`,
            message ? `\n[SPECIFICATIONS / BRIEF]:\n${message}` : '',
          ]
            .filter(Boolean)
            .join('\n'),
        });

      if (dbError) {
        console.error('[DATABASE ERROR] Failed to insert into qevn_leads:', dbError);
      } else {
        dbSuccess = true;
      }
    } catch (dbErr) {
      console.error('[DATABASE EXCEPTION] Error connecting to Supabase:', dbErr);
    }

    // 2. Dispatch real-time email notification via Resend
    let emailSuccess = false;
    try {
      const mailRes = await sendDispatchNotification({
        dispatchId,
        name: name.trim(),
        email: email.trim(),
        projectType: projectType || 'Custom Commission',
        budget: budget || 'Flexible',
        timeline: timeline || 'Standard',
        message: message?.trim(),
        phone: phone?.trim(),
      });

      emailSuccess = mailRes.success;
      if (!mailRes.success) {
        console.warn('[MAILER NOTICE] Resend notification status:', mailRes.error);
      }
    } catch (mailErr) {
      console.error('[MAILER EXCEPTION] Error dispatching mailer:', mailErr);
    }

    return NextResponse.json({
      success: true,
      dispatchId,
      dbLogged: dbSuccess,
      emailSent: emailSuccess,
      message: 'Transmission received at QEVN Post Office. Dispatch logged and engineering team alerted.',
    });
  } catch (err) {
    console.error('[DISPATCH API ERROR]', err);
    return NextResponse.json(
      { error: 'Internal server error processing dispatch' },
      { status: 500 }
    );
  }
}

