/**
 * React Query Provider Setup with Clerk Integration
 * 
 * This provider wraps the entire app to enable React Query functionality.
 * It provides caching, background updates, and error handling for API calls.
 * It also automatically connects Clerk authentication to the API client.
 */

"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { apiClient } from '../lib/api';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn } = useAuth();

  // Create a new QueryClient instance for each app instance
  // This prevents sharing state between different users/sessions
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Cache data for 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry failed requests 3 times
            retry: 3,
            // Don't refetch on window focus by default
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry failed mutations once
            retry: 1,
          },
        },
      })
  );

  // Connect Clerk authentication to the API client
  useEffect(() => {
    if (isSignedIn && getToken) {
      // Register the Clerk getToken function with the API client
      apiClient.setTokenFunction(getToken);
      console.log('🔗 QueryProvider: Clerk auth connected to API client');
    } else {
      // Clear the token function when user signs out
      apiClient.clearTokenFunction();
      console.log('🔌 QueryProvider: Clerk auth disconnected from API client');
    }
  }, [isSignedIn, getToken]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools for debugging - only shows in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
