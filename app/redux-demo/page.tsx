import { UserProfile } from '../../components/UserProfile'

export default function ReduxDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Redux User State Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This page demonstrates how user authentication state is managed with Redux Toolkit.
            The user data is automatically synced from Clerk and available throughout the app.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Redux User Profile */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Redux User State</h2>
            <UserProfile />
          </div>

          {/* Redux State Explanation */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium text-green-600">✅ Automatic Sync</h3>
                <p className="text-gray-600">
                  User data is automatically synced from Clerk to Redux when you sign in/out.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-green-600">✅ Global State</h3>
                <p className="text-gray-600">
                  User data is available in any component using Redux selectors.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-green-600">✅ Type Safety</h3>
                <p className="text-gray-600">
                  Full TypeScript support with typed hooks and selectors.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-blue-600">🔧 Actions Available</h3>
                <ul className="text-gray-600 list-disc list-inside ml-4">
                  <li>loginSuccess / loginFailure</li>
                  <li>logout</li>
                  <li>updateUser</li>
                  <li>setUser (for external auth sync)</li>
                  <li>setLoading / clearError</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
          <div className="space-y-6">
            
            {/* Selector Example */}
            <div>
              <h3 className="font-medium mb-2">Using Selectors</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`import { useAppSelector } from '../store'
import { selectUser, selectIsAuthenticated } from '../store/selectors/userSelectors'

function MyComponent() {
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.firstName}!</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  )
}`}
              </pre>
            </div>

            {/* Dispatch Example */}
            <div>
              <h3 className="font-medium mb-2">Dispatching Actions</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`import { useAppDispatch } from '../store'
import { updateUser, logout } from '../store/slices/userSlice'

function ProfileSettings() {
  const dispatch = useAppDispatch()
  
  const handleUpdate = () => {
    dispatch(updateUser({ firstName: 'New Name' }))
  }
  
  const handleLogout = () => {
    dispatch(logout())
  }
  
  return (
    <div>
      <button onClick={handleUpdate}>Update Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
