import { Env } from '../types';

export function verifyAuthToken(request: Request, env: Env): boolean {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  return token === env.AUTH_TOKEN;
}

export function verifyDebugToken(token: string, env: Env): boolean {
  return token === env.DEBUG_TOKEN;
}

// Simple in-memory rate limit (for production, use Durable Objects)
const rateLimitStore: Record<string, { count: number; resetTime: number }> = {};

export function checkRateLimit(key: string, maxRequests: number = 10, windowMs: number = 3600000): boolean {
  const now = Date.now();
  const record = rateLimitStore[key];

  if (!record || now > record.resetTime) {
    rateLimitStore[key] = { count: 1, resetTime: now + windowMs };
    return true;
  }

  if (record.count < maxRequests) {
    record.count++;
    return true;
  }

  return false;
}

export function getRateLimitInfo(key: string): { remaining: number; resetTime: number } | null {
  const record = rateLimitStore[key];
  if (!record) return null;

  const remaining = Math.max(0, 10 - record.count);
  return {
    remaining,
    resetTime: record.resetTime,
  };
}
