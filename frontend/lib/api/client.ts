import { env } from '@/lib/env';
import {
  ApiError,
  NetworkError,
  NotFoundError,
  TimeoutError,
  UnauthorizedError,
  ValidationError,
} from './errors';

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
  token?: string;
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout = 10000;
  private defaultRetries = 2;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('diya_auth_token');
    }
    return null;
  }

  public setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('diya_auth_token', token);
    }
  }

  public clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('diya_auth_token');
    }
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = new URL(`${this.baseUrl}${cleanEndpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val));
        }
      });
    }

    return url.toString();
  }

  private async executeFetch<T>(
    url: string,
    options: RequestInit,
    timeoutMs: number
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const errorMsg =
          (isJson && data?.error?.message) ||
          (isJson && data?.message) ||
          response.statusText ||
          'API request failed';
        const errorCode = (isJson && data?.error?.code) || 'API_ERROR';
        const errorDetails = isJson && data?.error?.details;

        switch (response.status) {
          case 401:
            throw new UnauthorizedError(errorMsg);
          case 404:
            throw new NotFoundError(errorMsg);
          case 422:
            throw new ValidationError(errorMsg, errorDetails);
          default:
            throw new ApiError(errorMsg, response.status, errorCode, errorDetails);
        }
      }

      // If envelope contains data field, return data; else return root
      if (isJson && data && typeof data === 'object' && 'data' in data && data.success === true) {
        return data.data as T;
      }

      return data as T;
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (err instanceof ApiError) {
        throw err;
      }

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          throw new TimeoutError(`Request to ${url} timed out after ${timeoutMs}ms`);
        }
        throw new NetworkError(err.message);
      }

      throw new NetworkError('Unknown network failure encountered.');
    }
  }

  public async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const {
      timeoutMs = this.defaultTimeout,
      retries = this.defaultRetries,
      token,
      params,
      headers: customHeaders,
      ...fetchOptions
    } = options;

    const url = this.buildUrl(endpoint, params);
    const authToken = token || this.getAuthToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(customHeaders as Record<string, string>),
    };

    let attempt = 0;
    let lastError: unknown;

    while (attempt <= retries) {
      try {
        return await this.executeFetch<T>(
          url,
          {
            ...fetchOptions,
            headers,
          },
          timeoutMs
        );
      } catch (err) {
        lastError = err;

        // Do not retry 4xx errors (client faults)
        if (err instanceof ApiError && err.status >= 400 && err.status < 500) {
          throw err;
        }

        attempt++;
        if (attempt <= retries) {
          // Exponential backoff: 300ms, 600ms...
          const backoff = 300 * Math.pow(2, attempt - 1);
          await new Promise((resolve) => setTimeout(resolve, backoff));
        }
      }
    }

    throw lastError;
  }

  public get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public post<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  public put<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  public patch<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  public delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(env.NEXT_PUBLIC_API_URL);
