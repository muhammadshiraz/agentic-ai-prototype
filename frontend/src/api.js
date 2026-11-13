// Local development uses Vite's proxy. Deployments can override the API URL.
export const API_BASE = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? '/api'
    : 'https://agentic-ai-prototype-production-1c87.up.railway.app/api')
).replace(/\/+$/, '');

export function getApiError(error) {
  const detail = error.response?.data?.detail;
  if (typeof detail === 'string' && detail.trim()) return detail;
  if (Array.isArray(detail)) return detail.map(item => item.msg).join('; ');
  if (error.response) return `Request failed (HTTP ${error.response.status}). Please try again.`;
  return 'Unable to reach the backend. Check that it is running and the API address is correct.';
}
