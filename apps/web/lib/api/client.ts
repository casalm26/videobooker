const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function handleResponse<ResponseType>(response: Response): Promise<ResponseType> {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with status ${response.status}`);
  }
  return response.json() as Promise<ResponseType>;
}

export async function apiGet<ResponseType>(path: string, init?: RequestInit): Promise<ResponseType> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });
  return handleResponse<ResponseType>(response);
}

export async function apiPut<RequestType, ResponseType>(path: string, body: RequestType, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
  });
  return handleResponse<ResponseType>(response);
}

export async function apiPost<RequestType, ResponseType>(path: string, body: RequestType, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
  });
  return handleResponse<ResponseType>(response);
}

export async function apiPatch<RequestType, ResponseType>(path: string, body: RequestType, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
  });
  return handleResponse<ResponseType>(response);
}
