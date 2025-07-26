/**
 * Enhanced API Client with Clerk Token Interceptors
 * 
 * This file sets up the base API client with automatic Clerk authentication support.
 * It handles token management, interceptors, and provides typed API functions.
 */

// API base URL - change this to your backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Type for API call options
export interface ApiCallOptions {
  requireAuth?: boolean;  // Whether this call requires authentication
  useTemplate?: string;   // Custom Clerk template to use
  customHeaders?: Record<string, string>; // Additional headers
}

/**
 * Enhanced API Client Class with Interceptors
 * Handles all HTTP requests with automatic Clerk token injection
 */
export class ApiClient {
  private baseURL: string;
  private getTokenFunction: ((options?: { template?: string }) => Promise<string | null>) | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Set the Clerk getToken function for automatic token injection
   * This should be called from a component that has access to useAuth()
   */
  setTokenFunction(getToken: (options?: { template?: string }) => Promise<string | null>) {
    this.getTokenFunction = getToken;
    console.log('✅ API Client: Clerk token function registered');
  }

  /**
   * Clear the token function (when user signs out)
   */
  clearTokenFunction() {
    this.getTokenFunction = null;
    console.log('🔒 API Client: Token function cleared');
  }

  /**
   * Get token from Clerk with optional template
   */
  private async getToken(template?: string): Promise<string | null> {
    if (!this.getTokenFunction) {
      console.warn('⚠️ API Client: No token function available. User might not be signed in.');
      return null;
    }

    try {
      const options = template ? { template } : undefined;
      const token = await this.getTokenFunction(options);
      
      if (token) {
        console.log(`🔑 API Client: Token obtained${template ? ` (template: ${template})` : ''}`);
      }
      
      return token;
    } catch (error) {
      console.error('❌ API Client: Failed to get token:', error);
      return null;
    }
  }

  /**
   * Request interceptor - automatically adds auth headers
   */
  private async interceptRequest(
    endpoint: string,
    options: RequestInit = {},
    apiOptions: ApiCallOptions = {}
  ): Promise<RequestInit> {
    const { requireAuth = true, useTemplate, customHeaders = {} } = apiOptions;

    // Default headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
      ...(options.headers as Record<string, string>),
    };

    // Add authorization header if required
    if (requireAuth) {
      const token = await this.getToken(useTemplate);
      if (token) {
        headers.Authorization = `Bearer ${token}`;
        console.log(`🔐 API Client: Auth header added for ${endpoint}`);
      } else if (requireAuth) {
        console.warn(`⚠️ API Client: Auth required but no token available for ${endpoint}`);
      }
    }

    return {
      ...options,
      headers,
    };
  }

  /**
   * Response interceptor - handles common response patterns
   */
  private async interceptResponse<T>(response: Response, endpoint: string): Promise<T> {
    console.log(`📡 API Client: ${response.status} ${response.statusText} - ${endpoint}`);

    // Handle different response types
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle specific error cases
      if (response.status === 401) {
        console.error('🚫 API Client: Unauthorized - Token might be invalid or expired');
        // You could trigger a token refresh here or redirect to login
      }
      
      const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    // Try to parse JSON response
    try {
      const data = await response.json();
      console.log(`✅ API Client: Success response from ${endpoint}`);
      return data;
    } catch (error) {
      // Handle non-JSON responses
      console.warn(`⚠️ API Client: Non-JSON response from ${endpoint}`);
      return response.text() as unknown as T;
    }
  }

  /**
   * Generic request method with interceptors
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    apiOptions: ApiCallOptions = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      // Apply request interceptor
      const interceptedOptions = await this.interceptRequest(endpoint, options, apiOptions);
      
      // Make the request
      const response = await fetch(url, interceptedOptions);
      
      // Apply response interceptor
      return await this.interceptResponse<T>(response, endpoint);
      
    } catch (error) {
      console.error(`❌ API Client: Request failed for ${url}:`, error);
      throw error;
    }
  }

  // HTTP Methods with auth options

  /**
   * GET request
   * @param endpoint - API endpoint
   * @param apiOptions - Authentication and header options
   */
  async get<T>(endpoint: string, apiOptions?: ApiCallOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, apiOptions);
  }

  /**
   * POST request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @param apiOptions - Authentication and header options
   */
  async post<T>(endpoint: string, data?: any, apiOptions?: ApiCallOptions): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, apiOptions);
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, apiOptions?: ApiCallOptions): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, apiOptions);
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any, apiOptions?: ApiCallOptions): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }, apiOptions);
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, apiOptions?: ApiCallOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, apiOptions);
  }

  // Convenience methods for different auth scenarios

  /**
   * Make a request without authentication
   */
  async publicRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, options, { requireAuth: false });
  }

  /**
   * Make a request with custom Clerk template
   */
  async templatedRequest<T>(
    endpoint: string, 
    template: string, 
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, options, { 
      requireAuth: true, 
      useTemplate: template 
    });
  }

  /**
   * Make a request with custom headers
   */
  async customRequest<T>(
    endpoint: string,
    customHeaders: Record<string, string>,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, options, { 
      requireAuth: true, 
      customHeaders 
    });
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();

// Types for your API responses (unchanged)
export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  instructor: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  testCases: any[];
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
