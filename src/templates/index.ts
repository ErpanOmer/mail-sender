import * as React from 'react';
import { SubmissionData } from '../types';
import { WelcomeEmail } from './welcome';

export type TemplateType = 'welcome';

export function getEmailTemplate(
  templateType: TemplateType,
  data: SubmissionData,
  isSupport: boolean = false
): React.ReactElement {
  switch (templateType) {
    case 'welcome':
      return React.createElement(WelcomeEmail, { data, isSupport });
    default:
      throw new Error(`Unknown template: ${templateType}`);
  }
}

export function getTemplateSubject(templateType: TemplateType, isSupport: boolean = false): string {
  if (templateType === 'welcome') {
    return isSupport
      ? '⚠️ Action Required | New Recall Service Request – Fat Tire Trike'
      : '✅ Confirmation | New Recall Service Request – Fat Tire Trike';
  }
  return 'Hello';
}
