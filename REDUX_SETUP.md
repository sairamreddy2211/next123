# Redux Toolkit Setup for User Authentication

This document explains the Redux Toolkit setup for managing user authentication state in our Next.js application.

## 📁 Folder Structure

```
store/
├── index.ts                    # Store configuration and typed hooks
├── slices/
│   └── userSlice.ts           # User authentication state slice
└── selectors/
    └── userSelectors.ts       # User state selectors

components/
├── ReduxProvider.tsx          # Redux Provider wrapper
└── UserSync.tsx              # Clerk-Redux sync component

hooks/
└── useClerkReduxSync.ts       # Hook to sync Clerk with Redux
```

## 🔧 Components Overview

### 1. Store Configuration (`store/index.ts`)
- Configures the Redux store with Redux Toolkit
- Exports typed hooks (`useAppDispatch`, `useAppSelector`)
- Defines TypeScript types for the store state

### 2. User Slice (`store/slices/userSlice.ts`)
Manages user authentication state with actions:
- `setLoading` - Set loading state
- `loginSuccess` - Set user data after successful login
- `loginFailure` - Handle login errors
- `logout` - Clear user data
- `updateUser` - Update user profile information
- `setUser` - Set user data from external auth (Clerk)
- `clearError` - Clear error messages

### 3. Selectors (`store/selectors/userSelectors.ts`)
Provides reusable state selectors:
- `selectUser` - Get current user object
- `selectIsAuthenticated` - Check if user is authenticated
- `selectIsLoading` - Get loading state
- `selectUserError` - Get error messages
- `selectUserDisplayName` - Get formatted display name
- `selectUserInitials` - Get user initials for avatars

### 4. Redux Provider (`components/ReduxProvider.tsx`)
Wraps the app with Redux Provider to make store available globally.

### 5. Clerk-Redux Sync (`hooks/useClerkReduxSync.ts`)
Automatically syncs Clerk authentication state with Redux store.

## 🚀 Usage Examples

### Using Selectors in Components

```tsx
import { useAppSelector } from '../store'
import { selectUser, selectIsAuthenticated } from '../store/selectors/userSelectors'

function MyComponent() {
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  
  if (!isAuthenticated) {
    return <div>Please sign in</div>
  }
  
  return <div>Welcome, {user?.firstName}!</div>
}
```

### Dispatching Actions

```tsx
import { useAppDispatch } from '../store'
import { updateUser, logout } from '../store/slices/userSlice'

function ProfileSettings() {
  const dispatch = useAppDispatch()
  
  const handleUpdateProfile = () => {
    dispatch(updateUser({ 
      firstName: 'New Name',
      lastName: 'New Last Name'
    }))
  }
  
  const handleLogout = () => {
    dispatch(logout())
    // Also call your auth provider's logout method
  }
  
  return (
    <div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
```

### Custom Hooks with Redux

```tsx
import { useAppSelector } from '../store'
import { selectUser, selectIsAuthenticated } from '../store/selectors/userSelectors'

function useAuthUser() {
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  
  return {
    user,
    isAuthenticated,
    isAdmin: user?.role === 'admin',
    displayName: user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email
  }
}

// Usage in component
function Dashboard() {
  const { user, isAuthenticated, isAdmin } = useAuthUser()
  
  if (!isAuthenticated) return <Login />
  if (!isAdmin) return <AccessDenied />
  
  return <AdminDashboard user={user} />
}
```

## 🔄 Integration with Clerk

The setup includes automatic synchronization with Clerk:

1. **UserSync Component** - Added to layout.tsx to sync auth state
2. **Automatic Updates** - User state updates when Clerk auth changes
3. **Type Safety** - Full TypeScript support for user data

## 🎯 Key Benefits

1. **Global State** - User data available anywhere in the app
2. **Type Safety** - Full TypeScript support with typed hooks
3. **Automatic Sync** - Seamless integration with Clerk authentication
4. **Reusable Selectors** - Clean, reusable state access patterns
5. **Predictable Updates** - Redux DevTools for debugging state changes

## 🔧 Setup Steps Completed

1. ✅ Installed Redux Toolkit and React Redux
2. ✅ Created store configuration with TypeScript support
3. ✅ Built user authentication slice with actions and reducers
4. ✅ Added reusable selectors for common user data access
5. ✅ Integrated Redux Provider in app layout
6. ✅ Created Clerk-Redux synchronization hook
7. ✅ Added automatic user state sync component
8. ✅ Built example components demonstrating usage

## 🎮 Testing the Setup

Visit `/redux-demo` to see the Redux state management in action:
- View current user data from Redux state
- See real-time sync with Clerk authentication
- Test state updates and actions
- Explore code examples for common patterns

The demo page shows how user data flows from Clerk → Redux → Components, providing a complete example of the authentication state management system.
