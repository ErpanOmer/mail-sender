# Mail Sender Worker

A Cloudflare Worker project designed to send transactional emails using [Resend](https://resend.com) and [React Email](https://react.email). This service handles form submissions and sends confirmation emails with dynamic content.

## Features

- **Serverless**: Built on Cloudflare Workers.
- **Email Sending**: Uses Resend API for reliable email delivery.
- **Dynamic Templates**: React-based email templates for consistent branding.
- **Authentication**: Bearer token authentication for API security.
- **Rate Limiting**: Built-in rate limiting to prevent abuse.
- **Preview Endpoint**: Endpoint to preview email templates with dynamic data.

## API Endpoints

### 1. Send Email

Sends an email based on the submitted data.

- **URL**: `/send`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: `Bearer <YOUR_AUTH_TOKEN>`
  - `Content-Type`: `application/json`
- **Body** (JSON):

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "serialNumber": "SN123456",
  "addressResult": "123 Main St, City, Country",
  "country": "USA",
  "state": "CA",
  "zip": "90210",
  "affirmation": "on"
}
```

### 2. Template Preview

Preview the email template with mock data.

- **URL**: `/template`
- **Method**: `GET`
- **Query Parameters**:
  - `template`: (Optional) Template name (default: `welcome`).
  - `debug`: (Required in production) Debug token for access.
  - *You can also pass query parameters to override mock data fields (e.g., `?firstName=Alice`)*

### 3. Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Response**: Returns simple health status.

## Setup & Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- [Resend Account](https://resend.com/)

### Installation

1.  Clone the repository.
2.  Install dependencies:

```bash
npm install
```

### Configuration

Create a `.dev.vars` file for local development (which simulates the secrets) or set these secrets in your Cloudflare Worker settings:

```ini
RESEND_API_KEY=re_123...
AUTH_TOKEN=your_secure_auth_token
DEBUG_TOKEN=your_secure_debug_token
SEND_SUPPORT_EMAIL=recall@pedego.com
ENV=development
```

Note: `RESEND_API_KEY` is typically stored as a secret in Cloudflare.

### Running Locally

To start the local development server:

```bash
npm run dev
# or
npx wrangler dev
```

The worker will be available at `http://localhost:8787`.

### Deployment

Deploy to Cloudflare Workers:

```bash
npm run wrangler deploy
```

## Project Structure

- `src/index.tsx`: Main entry point and router dispatcher.
- `src/routes/`: Contains route handlers (`send.ts`, `template.ts`, `health.ts`).
- `src/emails/`: React components defining the email templates.
- `src/utils/`: Utility functions for authentication, rate limiting, and response formatting.
- `src/types.ts`: TypeScript interface definitions.
- `wrangler.toml`: Cloudflare Workers configuration file.

## License

MIT
