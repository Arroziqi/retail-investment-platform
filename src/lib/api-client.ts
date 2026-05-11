const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function apiClient<T>(
  endpoint: string,
  { body, ...customConfig }: Omit<RequestInit, 'body'> & { body?: unknown } = {}
): Promise<T> {
  const headers = { 'content-type': 'application/json' }
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }))
    return Promise.reject(error)
  }

  return response.json()
}
