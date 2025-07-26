'use client'

import { useAppSelector, useAppDispatch } from '../store'
import { 
  selectUser, 
  selectIsAuthenticated, 
  selectUserDisplayName,
  selectUserInitials 
} from '../store/selectors/userSelectors'
import { updateUser, logout } from '../store/slices/userSlice'

/**
 * Example component showing how to use Redux for user state
 */
export function UserProfile() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const displayName = useAppSelector(selectUserDisplayName)
  const initials = useAppSelector(selectUserInitials)

  const handleUpdateProfile = () => {
    if (user) {
      dispatch(updateUser({
        firstName: 'Updated',
        lastName: 'Name'
      }))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    // Note: In a real app, you'd also call your auth provider's logout method
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p>User not authenticated</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4">User Profile (Redux State)</h2>
      
      {/* Profile Picture Placeholder */}
      <div className="flex items-center mb-4">
        {user.profileImageUrl ? (
          <img 
            src={user.profileImageUrl} 
            alt="Profile" 
            className="w-12 h-12 rounded-full mr-3"
          />
        ) : (
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
            {initials}
          </div>
        )}
        <div>
          <p className="font-semibold">{displayName}</p>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-2 mb-4">
        <p><span className="font-medium">ID:</span> {user.id}</p>
        {user.username && (
          <p><span className="font-medium">Username:</span> {user.username}</p>
        )}
        {user.createdAt && (
          <p><span className="font-medium">Member since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button 
          onClick={handleUpdateProfile}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Update Profile (Demo)
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
        >
          Logout (Redux Only)
        </button>
      </div>
    </div>
  )
}
