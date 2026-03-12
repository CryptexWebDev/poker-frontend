function getEnv(key: string): string {
  const value = import.meta.env[key]
  if (value === undefined || value === '') {
    throw new Error(`Missing env: ${key}`)
  }
  return value
}

export const env = {
  apiUrl: (import.meta.env.VITE_API_URL as string) || 'https://main.redbluemountainvalley.click',
  appUrl: (import.meta.env.VITE_APP_URL as string) || 'https://luckyspin777.xyz',
} as const

export function getEnvStrict() {
  return {
    apiUrl: getEnv('VITE_API_URL'),
    appUrl: getEnv('VITE_APP_URL'),
  }
}
