'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useAppDispatch } from '../store'
import { setUser } from '../store/slices/userSlice'
import type { User } from '../store/slices/userSlice'

/**
 * Hook to sync Clerk user data with Redux store
 * This should be used in a component that's rendered on every page
 */
export function useClerkReduxSync() {
  const { user, isLoaded } = useUser()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        // Transform Clerk user to our User interface
        const reduxUser: User = {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
          username: user.username || undefined,
          profileImageUrl: user.imageUrl || undefined,
          createdAt: user.createdAt?.toISOString(),
        }
        dispatch(setUser(reduxUser))
      } else {
        // User is not logged in
        dispatch(setUser(null))
      }
    }
  }, [user, isLoaded, dispatch])

  return { isLoaded, user }
}
