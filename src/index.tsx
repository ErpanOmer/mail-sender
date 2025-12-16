import * as React from 'react';
import { Resend } from 'resend';
import { EmailTemplate } from './emails/email-template';

export default {
  async fetch(request, env, context): Promise<Response> {
    const resend = new Resend('re_R2nj1goy_Giiy8QT1b1VLYQw9oL2cV64U');

    const data = await resend.emails.send({
      from: 'Pedego <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'hello world',
      react: <EmailTemplate firstName="John" />,
    });

    return Response.json(data);
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
