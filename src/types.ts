export interface SubmissionData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serialNumber: string;
  addressResult: string;
  country: string;
  state: string;
  zip: string;
  dealer?: string;
  affirmation: string;
}

export interface ResendResponse {
  id?: string;
  error?: string;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

export interface Env {
  RESEND_API_KEY: any;
  SEND_SUPPORT_EMAIL: string;
  ENV: 'development' | 'production';
  API_KEY: string;
  AUTH_TOKEN: string;
  DEBUG_TOKEN: string;
  ENVIRONMENT: 'development' | 'production';
}
