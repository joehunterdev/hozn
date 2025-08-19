// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  }
} as const;

// Add logging to see what's happening
console.log('🔍 Environment Debug Info:');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('API_CONFIG.baseUrl:', API_CONFIG.baseUrl);
console.log('window.location:', typeof window !== 'undefined' ? window.location.href : 'server-side');
console.log('NODE_ENV:', process.env.NODE_ENV);

// API Helper function
export const apiRequest = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Auth helper
export const getAuthHeader = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
