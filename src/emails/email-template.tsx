import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serialNumber: string;
  addressResult: string;
  country: string;
  state: string;
  zip: string;
  affirmation: string;
}

export function EmailTemplate({
  firstName,
  lastName,
  email,
  phone,
  serialNumber,
  addressResult,
  country,
  state,
  zip,
  affirmation,
}: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Welcome, {firstName} {lastName}!</h1>
      
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2 style={{ marginTop: 0 }}>Submission Details</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Name:</strong> {firstName} {lastName}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Email:</strong> {email}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Phone:</strong> {phone}
        </div>
        
        {serialNumber && (
          <div style={{ marginBottom: '15px' }}>
            <strong>Serial Number:</strong> {serialNumber}
          </div>
        )}
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Address:</strong> {addressResult}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Country:</strong> {country}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>State:</strong> {state}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>ZIP Code:</strong> {zip}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Affirmation:</strong> {affirmation === 'on' ? 'Confirmed' : 'Not confirmed'}
        </div>
      </div>
      
      <p style={{ marginTop: '30px', color: '#666', fontSize: '12px' }}>
        Thank you for your submission.
      </p>
    </div>
  );
}

export default EmailTemplate;
