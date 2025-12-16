import * as React from 'react';
import { SubmissionData } from '../types';
import { WelcomeEmail } from './welcome';

export type TemplateType = 'welcome';

export function getEmailTemplate(
  templateType: TemplateType,
  data: SubmissionData
): React.ReactElement {
  switch (templateType) {
    case 'welcome':
      return React.createElement(WelcomeEmail, { data });
    default:
      throw new Error(`Unknown template: ${templateType}`);
  }
}

export function getTemplateSubject(templateType: TemplateType): string {
  const subjects: Record<TemplateType, string> = {
    welcome: '⚠️ Action Required | New Recall Service Request – Fat Tire Trike',
  };
  return subjects[templateType] || 'Hello';
}
