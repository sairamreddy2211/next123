'use client'

import { useClerkReduxSync } from '../hooks/useClerkReduxSync'

/**
 * Component to sync Clerk authentication state with Redux
 * Should be rendered in the app layout to keep user state in sync
 */
export function UserSync() {
  useClerkReduxSync()
  return null // This component doesn't render anything
}
