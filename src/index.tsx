import { Env } from './types';
import { handleHealth } from './routes/health';
import { handleSend } from './routes/send';
import { handleTemplate } from './routes/template';
import { errorResponse } from './utils/response';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Route dispatcher
    let response: Response;

    try {
      if (pathname === '/health') {
        response = handleHealth();
      } else if (pathname === '/send') {
        response = await handleSend(request, env);
      } else if (pathname === '/template') {
        response = await handleTemplate(request, env);
      } else {
        response = errorResponse('Route not found', 404);
      }
    } catch (error) {
      console.error('Unhandled error:', error);
      response = errorResponse('Internal server error', 500);
    }

    // Add CORS headers to response
    const newResponse = new Response(response.body, response);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      newResponse.headers.set(key, value);
    });

    return newResponse;
  },
} satisfies ExportedHandler<Env>;
