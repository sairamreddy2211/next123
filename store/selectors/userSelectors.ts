import type { RootState } from '../index'

// User selectors - properly typed for the user slice
export const selectUser = (state: RootState) => state.user.user
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectIsLoading = (state: RootState) => state.user.isLoading
export const selectUserError = (state: RootState) => state.user.error

// Derived selectors
export const selectUserDisplayName = (state: RootState) => {
  const user = state.user.user
  if (!user) return null
  
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`
  }
  
  if (user.username) {
    return user.username
  }
  
  return user.email
}

export const selectUserInitials = (state: RootState) => {
  const user = state.user.user
  if (!user) return ''
  
  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`
  }
  
  if (user.username) {
    return user.username.slice(0, 2).toUpperCase()
  }
  
  return user.email.slice(0, 2).toUpperCase()
}
