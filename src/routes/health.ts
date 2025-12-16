import { successResponse } from '../utils/response';

export function handleHealth(): Response {
  return successResponse({ status: 'ok', timestamp: new Date().toISOString() });
}
