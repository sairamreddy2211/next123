/**
 * API Hooks using TanStack Query
 * 
 * These hooks provide a simple interface for API calls with automatic
 * caching, background updates, and error handling.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { apiClient, Course, Problem, User, PaginatedResponse } from '../lib/api';

/**
 * Hook to automatically set auth token when user signs in
 */
export function useApiAuth() {
  const { getToken } = useAuth();

  useEffect(() => {
    const updateToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          apiClient.setToken(token);
        } else {
          apiClient.clearToken();
        }
      } catch (error) {
        console.error('Failed to get auth token:', error);
        apiClient.clearToken();
      }
    };

    updateToken();
  }, [getToken]);
}

// ==================== COURSE HOOKS ====================

/**
 * Fetch all courses
 * 
 * @example
 * const { data: courses, isLoading, error } = useCourses();
 */
export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => apiClient.get<PaginatedResponse<Course>>('/courses'),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Fetch a single course by ID
 * 
 * @example
 * const { data: course, isLoading } = useCourse('123');
 */
export function useCourse(courseId: string | undefined) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: () => apiClient.get<Course>(`/courses/${courseId}`),
    enabled: !!courseId, // Only run query if courseId exists
  });
}

/**
 * Create a new course
 * 
 * @example
 * const createCourse = useCreateCourse();
 * const handleCreate = () => {
 *   createCourse.mutate({
 *     title: 'New Course',
 *     description: 'Course description'
 *   });
 * };
 */
export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData: Partial<Course>) =>
      apiClient.post<Course>('/courses', courseData),
    
    // Optimistically update the UI
    onSuccess: () => {
      // Invalidate and refetch courses list
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    
    onError: (error) => {
      console.error('Failed to create course:', error);
    },
  });
}

// ==================== PROBLEM HOOKS ====================

/**
 * Fetch all problems with optional filtering
 * 
 * @example
 * const { data: problems, isLoading } = useProblems({ difficulty: 'easy' });
 */
export function useProblems(filters?: { 
  difficulty?: string; 
  category?: string; 
  page?: number 
}) {
  const queryKey = ['problems', filters];
  
  return useQuery({
    queryKey,
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters?.difficulty) params.append('difficulty', filters.difficulty);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.page) params.append('page', filters.page.toString());
      
      const query = params.toString() ? `?${params.toString()}` : '';
      return apiClient.get<PaginatedResponse<Problem>>(`/problems${query}`);
    },
  });
}

/**
 * Fetch a single problem by ID
 * 
 * @example
 * const { data: problem, isLoading } = useProblem('problem-123');
 */
export function useProblem(problemId: string | undefined) {
  return useQuery({
    queryKey: ['problem', problemId],
    queryFn: () => apiClient.get<Problem>(`/problems/${problemId}`),
    enabled: !!problemId,
  });
}

/**
 * Submit a solution to a problem
 * 
 * @example
 * const submitSolution = useSubmitSolution();
 * const handleSubmit = () => {
 *   submitSolution.mutate({
 *     problemId: '123',
 *     code: 'def solution(): return True'
 *   });
 * };
 */
export function useSubmitSolution() {
  return useMutation({
    mutationFn: (submission: { 
      problemId: string; 
      code: string; 
      language?: string 
    }) =>
      apiClient.post(`/problems/${submission.problemId}/submit`, {
        code: submission.code,
        language: submission.language || 'python',
      }),
    
    onSuccess: (result) => {
      console.log('Solution submitted successfully:', result);
    },
    
    onError: (error) => {
      console.error('Failed to submit solution:', error);
    },
  });
}

// ==================== USER HOOKS ====================

/**
 * Fetch current user profile
 * 
 * @example
 * const { data: user, isLoading } = useUserProfile();
 */
export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => apiClient.get<User>('/user/profile'),
  });
}

/**
 * Update user profile
 * 
 * @example
 * const updateProfile = useUpdateProfile();
 * const handleUpdate = () => {
 *   updateProfile.mutate({ name: 'New Name' });
 * };
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Partial<User>) =>
      apiClient.patch<User>('/user/profile', userData),
    
    onSuccess: () => {
      // Update the cached user data
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
}

// ==================== PROGRESS HOOKS ====================

/**
 * Fetch user's learning progress
 * 
 * @example
 * const { data: progress, isLoading } = useUserProgress();
 */
export function useUserProgress() {
  return useQuery({
    queryKey: ['user', 'progress'],
    queryFn: () => apiClient.get('/user/progress'),
  });
}

/**
 * Fetch user's completed courses
 * 
 * @example
 * const { data: completedCourses } = useCompletedCourses();
 */
export function useCompletedCourses() {
  return useQuery({
    queryKey: ['user', 'completed-courses'],
    queryFn: () => apiClient.get<Course[]>('/user/completed-courses'),
  });
}

// ==================== HELPER HOOKS ====================

/**
 * A combined hook that sets up auth and provides common loading states
 * Use this in components that need API access
 * 
 * @example
 * export default function MyComponent() {
 *   useApiAuth(); // This sets up authentication automatically
 *   
 *   const { data: courses, isLoading } = useCourses();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   
 *   return <div>{courses?.data.map(course => ...)}</div>;
 * }
 */
