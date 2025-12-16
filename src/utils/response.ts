import { ApiResponse } from '../types';

export function successResponse<T>(data: T, message?: string): Response {
  return new Response(
    JSON.stringify({
      success: true,
      data,
      message: message || 'Success',
    } as ApiResponse<T>),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export function errorResponse(error: string, status: number = 400): Response {
  return new Response(
    JSON.stringify({
      success: false,
      error,
    } as ApiResponse),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export function htmlResponse(html: string, status: number = 200): Response {
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
