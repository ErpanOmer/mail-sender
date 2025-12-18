import * as React from 'react';
import { Env, SubmissionData } from '../types';
import { successResponse, errorResponse } from '../utils/response';
import { verifyAuthToken, checkRateLimit } from '../utils/auth';
import { sendRecallEmails, validateSubmissionData } from '../services/resend';

export async function handleSend(request: Request, env: Env): Promise<Response> {
  // Verify authentication
  if (!verifyAuthToken(request, env)) {
    return errorResponse('Unauthorized: Invalid or missing auth token', 401);
  }

  // Check rate limit (10 requests per hour per IP)
  const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!checkRateLimit(clientIp, 10000, 3600000)) {
    return errorResponse('Too many requests. Please try again later.', 429);
  }

  if (request.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    const data = (await request.json()) as SubmissionData;

    // Validate required fields
    const validation = validateSubmissionData(data);
    if (!validation.valid) {
      return errorResponse(validation.error || 'Validation failed', 400);
    }

    // Send emails (Support + Customer)
    const result = await sendRecallEmails(env, data);

    if (result.error) {
      return errorResponse(`Failed to send email: ${result.error}`, 500);
    }

    return successResponse(
      {
        id: result.id,
        data,
        message: 'Email sent successfully',
      },
      'Email sent successfully'
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in /send:', message);
    return errorResponse(`Server error: ${message}`, 500);
  }
}
