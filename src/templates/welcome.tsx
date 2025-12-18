import * as React from 'react';
import { Html, Body, Head, Container, Preview, Section, Text, Row, Column, Hr, Heading } from '@react-email/components';
import { SubmissionData } from '../types';

interface WelcomeEmailProps {
  data: SubmissionData;
  isSupport?: boolean;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ data, isSupport = false }) => (
  <Html>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </Head>
    <Preview>New Recall Submission: {data.firstName} {data.lastName}</Preview>
    <Body style={main}>
      <Container style={container}>

        {/* Header Strip */}
        <Section style={headerStrip} />

        <Section style={content}>
          {/* Title Section */}
          <Section style={header}>
            {isSupport ? (
              <>
                <Heading style={h1}>Hello Support Team,</Heading>
                <Text style={subtitle}>
                  A new Fat Tire Trike recall / service registration has been submitted by a customer.
                  Please review the details below and proceed with the next steps.
                </Text>
              </>
            ) : (
              <>
                <Heading style={h1}>Hi Customer,</Heading>
                <Text style={subtitle}>
                  Your registration has been submitted and is being processed.
                  We will notify you when the parts ship to the dealer. The dealer will install and repair your Fat Tire Trike free of charge.
                </Text>
              </>
            )}
          </Section>

          <Hr style={divider} />

          {/* Primary Info (Name & Contact) */}
          <Section style={section}>
            <Text style={sectionTitle}>Customer Information</Text>

            <Row style={row}>
              <Column style={column}>
                <Text style={label}>Full Name</Text>
                <Text style={value}>{data.firstName} {data.lastName}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column style={column}>
                <Text style={label}>Email Address</Text>
                <Text style={linkValue}>{data.email}</Text>
              </Column>
              <Column style={column}>
                <Text style={label}>Phone Number</Text>
                <Text style={linkValue}>{data.phone}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Product Details */}
          <Section style={section}>
            <Text style={sectionTitle}>Product Details</Text>

            <Row style={row}>
              <Column>
                <Text style={label}>Product</Text>
                <Text style={value}>Pedego Fat Tire Trike</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column>
                <Text style={label}>Serial Number</Text>
                <Text style={data.serialNumber ? codeValue : notProvidedValue}>
                  {data.serialNumber || 'Not provided'}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Location & Dealer */}
          <Section style={section}>
            <Text style={sectionTitle}>Location & Dealer</Text>

            <Row style={row}>
              <Column>
                <Text style={label}>Customer Address</Text>
                <Text style={value}>{data.addressResult}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column style={column}>
                <Text style={label}>State/Province</Text>
                <Text style={value}>{data.state}</Text>
              </Column>
              <Column style={column}>
                <Text style={label}>Zip/Postal</Text>
                <Text style={value}>{data.zip}</Text>
              </Column>
              <Column style={column}>
                <Text style={label}>Country</Text>
                <Text style={value}>{data.country}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column>
                <Text style={label}>Dealer</Text>
                <Text style={data.dealer ? dealerValue : notProvidedValue}>
                  {data.dealer || 'Not selected'}
                </Text>
              </Column>
            </Row>
          </Section>


          {/* Affirmation Status */}
          {data.affirmation === 'on' && isSupport ? (
            <>
              <Hr style={divider} />
              <Section style={section}>
                <Text style={sectionTitle}>Verification</Text>
                <Row style={row}>
                  <Column>
                    <Text style={verificationBadge}>✓ Customer Confirmed</Text>
                  </Column>
                </Row>
              </Section>
            </>
          ) : null}

          <Hr style={divider} />

          {/* Footer / Action hint */}
          <Section style={footer}>
            <Text style={footerText}>
              This is an automated notification from the Recall Support System.
            </Text>
          </Section>

        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

// ============ Styles ============

// Layout & Reset
const main = {
  backgroundColor: '#f3f4f6', // Light gray background
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  maxWidth: '600px',
  width: '100%',
  border: '1px solid #e5e7eb',
  overflow: 'hidden' as const,
};

const content = {
  padding: '32px 40px',
};

// Header
const headerStrip = {
  backgroundColor: '#3b82f6', // Brand Blue (change to your brand color)
  height: '6px',
  width: '100%',
};

const header = {
  marginBottom: '24px',
};

const h1 = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 12px',
  lineHeight: '32px',
};

const subtitle = {
  color: '#6b7280',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
};

// Layout Utils
const section = {
  marginBottom: '24px',
};

const sectionTitle = {
  color: '#9ca3af',
  fontSize: '14px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0',
};

const row = {
  marginBottom: '16px',
};

const column = {
  verticalAlign: 'top',
};

const divider = {
  borderTop: '1px solid #e5e7eb', // Very light gray
  margin: '24px 0',
};

// Data Typography
const label = {
  color: '#6b7280',
  fontSize: '13px',
  marginBottom: '4px',
  fontWeight: '500',
};

const value = {
  color: '#1f2937',
  fontSize: '15px',
  fontWeight: '500',
  margin: '0',
  lineHeight: '20px',
};

const linkValue = {
  ...value,
  color: '#2563eb',
  textDecoration: 'none',
};

const codeValue = {
  ...value,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  backgroundColor: '#f9fafb',
  padding: '4px 8px',
  borderRadius: '4px',
  border: '1px solid #e5e7eb',
  display: 'inline-block',
};

// Badges
const statusBadgeSuccess = {
  display: 'inline-block',
  padding: '6px 12px',
  backgroundColor: '#dcfce7',
  color: '#166534',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '0.025em',
};

const statusBadgePending = {
  display: 'inline-block',
  padding: '6px 12px',
  backgroundColor: '#f3f4f6',
  color: '#4b5563',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '0.025em',
};

// Footer
const footer = {
  marginTop: '32px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#9ca3af',
  lineHeight: '18px',
  margin: '0',
};

const dealerValue = {
  ...value,
  backgroundColor: '#eff6ff',
  padding: '6px 10px',
  borderRadius: '6px',
  border: '1px solid #bfdbfe',
  color: '#1e40af',
  fontWeight: '600',
  display: 'inline-block',
};

const verificationBadge = {
  display: 'inline-block',
  padding: '8px 14px',
  backgroundColor: '#dcfce7',
  color: '#166534',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: '700',
  letterSpacing: '0.025em',
};

const notProvidedValue = {
  ...value,
  color: '#9ca3af',
  fontStyle: 'italic',
  backgroundColor: '#f3f4f6',
  padding: '4px 8px',
  borderRadius: '4px',
  display: 'inline-block',
};