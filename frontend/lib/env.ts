/**
 * Typed and validated environment variables for DIYA AI frontend.
 */

function getBooleanEnv(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === '') return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

export interface EnvConfig {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_USE_MOCKS: boolean;
  AUTH_SECRET?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

export const env: EnvConfig = {
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL || 'https://api.diya.mentneo.ai/v1',
  NEXT_PUBLIC_USE_MOCKS: getBooleanEnv(
    process.env.NEXT_PUBLIC_USE_MOCKS,
    true // Defaults to true so mock adapter is active until backend is connected
  ),
  AUTH_SECRET: process.env.AUTH_SECRET,
  NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
};
