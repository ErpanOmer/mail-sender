import { Resend } from 'resend';
import { SubmissionData, ResendResponse, Env } from '../types';
import { getEmailTemplate, getTemplateSubject } from '../templates';

export async function sendRecallEmails(
  env: Env,
  data: SubmissionData
): Promise<ResendResponse> {
  try {
    const RESEND_API_KEY = env.ENV === "development" ? env.API_KEY : await env.RESEND_API_KEY.get();
    const resend = new Resend(RESEND_API_KEY);

    // 1. Send to Support Team
    const supportRecipients = env.ENV === "development"
      ? ['erpanomer@gmail.com']
      : ['erpanomer@gmail.com', 'seven@newurtopia.com', 'paul@pedego.com'];

    const supportTemplate = getEmailTemplate('welcome', data, true);
    const supportSubject = getTemplateSubject('welcome', true);

    const supportResult = await resend.emails.send({
      from: 'Pedego Recall<pedego@nurverse.com>',
      to: supportRecipients,
      subject: supportSubject,
      react: supportTemplate,
    });

    if (supportResult.error) {
      console.error("Failed to send support email:", supportResult.error);
      return { error: supportResult.error.message || 'Failed to send support email' };
    }

    // 2. Send to Customer
    if (data.email) {
      const customerTemplate = getEmailTemplate('welcome', data, false);
      const customerSubject = getTemplateSubject('welcome', false);

      const customerResult = await resend.emails.send({
        from: 'Pedego Recall<pedego@nurverse.com>',
        to: [data.email],
        subject: customerSubject,
        react: customerTemplate,
      });

      if (customerResult.error) {
        console.warn("Failed to send customer email:", customerResult.error);
        // We don't fail the whole request if customer email fails, but maybe log it?
        // For now, let's just return the support email ID as the main success indicator.
      }
    }

    return {
      id: supportResult.data?.id,
      message: 'Emails sent successfully',
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export function validateSubmissionData(data: any): { valid: boolean; error?: string } {
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'addressResult', 'country', 'state', 'zip'];

  for (const field of requiredFields) {
    if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
      return { valid: false, error: `Missing or invalid field: ${field}` };
    }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
}
