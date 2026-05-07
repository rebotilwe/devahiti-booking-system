// Simple app params without Base44 dependencies
export const appParams = {
  appName: 'Devahiti Wellness',
  environment: 'production',
  apiUrl: import.meta.env.VITE_API_URL || '',
}