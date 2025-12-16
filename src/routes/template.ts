import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Env, SubmissionData } from '../types';
import { errorResponse, htmlResponse } from '../utils/response';
import { verifyDebugToken } from '../utils/auth';
import { getEmailTemplate, TemplateType } from '../templates';

export async function handleTemplate(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'GET') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    const url = new URL(request.url);
    const debugToken = url.searchParams.get('debug');
    const templateType = (url.searchParams.get('template') || 'welcome') as TemplateType;

    // [DEV] Allow template preview without token in development
    if (env.ENVIRONMENT === 'production' && !verifyDebugToken(debugToken || '', env)) {
      return errorResponse('Unauthorized: Invalid or missing debug token', 401);
    }

    // Sample data for preview
    const mockData: SubmissionData = {
      firstName: url.searchParams.get('firstName') || 'Erpan',
      lastName: url.searchParams.get('lastName') || 'Omer',
      email: url.searchParams.get('email') || 'owenz@newurtopia.com',
      phone: url.searchParams.get('phone') || '13025436606',
      serialNumber: url.searchParams.get('serialNumber') || '',
      addressResult:
        url.searchParams.get('addressResult') ||
        'NewYork-Presbyterian Ambulance Entrance, New York City, New York 10065, United States',
      country: url.searchParams.get('country') || 'USA',
      state: url.searchParams.get('state') || 'NY',
      zip: url.searchParams.get('zip') || '10065',
      affirmation: url.searchParams.get('affirmation') || 'on',
    };

    // Get email template React element
    const emailTemplate = getEmailTemplate(templateType, mockData);

    // Render to HTML string for preview
    const html = renderToString(emailTemplate);

    return htmlResponse(html);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in /template:', message);
    return errorResponse(`Failed to render template: ${message}`, 500);
  }
}
