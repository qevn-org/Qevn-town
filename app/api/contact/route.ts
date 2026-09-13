import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectType, budget, timeline, name, email, message } = body;

    if (!name || !email || !projectType) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, projectType)' },
        { status: 400 }
      );
    }

    // In production, dispatch email via Resend, Sendgrid, or Slack webhook.
    // console.log('[QEVN POST OFFICE DISPATCH RECEIVED]', {
    //   projectType,
    //   budget,
    //   timeline,
    //   name,
    //   email,
    //   message,
    //   receivedAt: new Date().toISOString(),
    // });

    return NextResponse.json({
      success: true,
      dispatchId: `QEVN-POST-${Math.floor(100000 + Math.random() * 900000)}`,
      message: 'Transmission received at QEVN Post Office. Dispatch queued for engineering triage.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error processing dispatch' },
      { status: 500 }
    );
  }
}
