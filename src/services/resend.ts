import { Resend } from 'resend';
import { SubmissionData, ResendResponse, Env } from '../types';

export async function sendEmailWithResend(
  env: Env,
  subject: string,
  react: React.ReactElement
): Promise<ResendResponse> {
  try {
    // Example of using the secret safely in an API request
    const APIkey = await env.RESEND_API_KEY.get()
    const resend = new Resend(APIkey);

    const data = await resend.emails.send({
      from: 'Pedego Recall<pedego@resend.dev>', // Change to your verified Resend domain
      to: env.SEND_SUPPORT_EMAIL,
      subject,
      react,
    });

    if (data.error) {
      return {
        error: data.error.message || 'Failed to send email',
      };
    }

    return {
      id: data.data?.id,
      message: 'Email sent successfully',
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
