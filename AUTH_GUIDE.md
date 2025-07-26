# Auth Guard Implementation Guide

## Overview
This guide explains how to implement authentication guards (auth guards) in a Next.js application using Clerk. An auth guard ensures that certain pages or components are only accessible to authenticated users.

## Key Concepts

### 1. What is an Auth Guard?
An auth guard is a mechanism that protects routes/pages from unauthorized access. It checks if a user is authenticated before allowing them to view protected content.

### 2. Clerk Components Used

#### `<SignedIn>`
- Only renders content when user is authenticated
- Children are only visible to logged-in users
- Perfect for protected content

#### `<SignedOut>`
- Only renders content when user is NOT authenticated  
- Children are only visible to users who are logged out
- Used for login prompts or redirections

#### `<RedirectToSignIn>`
- Automatically redirects unauthenticated users to sign-in page
- This is the main component that enforces the auth guard
- No manual redirect logic needed

## Implementation Examples

### 1. Page-Level Auth Guard (courses/page.tsx)

```tsx
"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function CoursesPage() {
  return (
    <>
      {/* ✅ PROTECTED CONTENT - Only visible to authenticated users */}
      <SignedIn>
        <div>
          {/* Your protected page content goes here */}
          <h1>Welcome to Courses!</h1>
          {/* This entire section is only rendered for signed-in users */}
        </div>
      </SignedIn>

      {/* 🚫 AUTH GUARD - Redirects unauthenticated users */}
      <SignedOut>
        {/* 
          This component automatically redirects users to sign-in page
          if they try to access this page without being authenticated
        */}
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
```

### 2. Component-Level Auth Guard (Navigation.tsx)

```tsx
export default function Navigation() {
  return (
    <nav>
      {/* 🌍 PUBLIC LINKS - Always visible */}
      <Link href="/">Home</Link>

      {/* 🔒 PROTECTED LINKS - Only visible to authenticated users */}
      <SignedIn>
        <Link href="/courses">Courses</Link>
        <Link href="/problems">Problems</Link>
      </SignedIn>

      {/* 👤 GUEST CONTENT - Only visible to unauthenticated users */}
      <SignedOut>
        <span>Sign in to access courses</span>
      </SignedOut>
    </nav>
  );
}
```

## How the Auth Guard Works

### Flow for Authenticated Users:
1. User visits `/courses`
2. Clerk checks authentication status
3. User is signed in → `<SignedIn>` renders content
4. `<SignedOut>` does not render (user is authenticated)
5. ✅ User sees the courses page

### Flow for Unauthenticated Users:
1. User visits `/courses`
2. Clerk checks authentication status  
3. User is not signed in → `<SignedIn>` does not render
4. `<SignedOut>` renders → `<RedirectToSignIn>` executes
5. 🚫 User is automatically redirected to sign-in page

## Key Benefits

### 1. **Automatic Protection**
- No manual authentication checks needed
- Clerk handles all the authentication logic
- Works seamlessly with client-side navigation

### 2. **Declarative Approach**
- Simply wrap content in `<SignedIn>` to protect it
- Easy to understand and maintain
- No complex conditional logic

### 3. **User Experience**
- Smooth redirects to sign-in page
- After signing in, users can be redirected back to intended page
- No broken pages or error states

## Best Practices

### 1. **Page Structure**
```tsx
export default function ProtectedPage() {
  return (
    <>
      <SignedIn>
        {/* All protected content here */}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
```

### 2. **Navigation Awareness**
- Show different navigation items based on auth status
- Provide clear indicators about what requires authentication
- Don't show links to protected pages for unauthenticated users

### 3. **Public vs Protected Routes**
- **Public routes**: Dashboard, landing page, about page
- **Protected routes**: Courses, user profile, progress tracking
- **Mixed routes**: Some content public, some protected within same page

## Testing the Auth Guard

### Test Cases:
1. **Unauthenticated access**: Try visiting `/courses` without signing in
   - Expected: Redirect to sign-in page
   
2. **Authenticated access**: Sign in, then visit `/courses`
   - Expected: See the courses content
   
3. **Navigation visibility**: Check navigation links
   - Unauthenticated: Should not see "Courses" link
   - Authenticated: Should see "Courses" link

## Advanced Patterns

### 1. **Role-based Access**
You can extend this pattern for role-based access:

```tsx
<SignedIn>
  {/* Check user role/permissions here */}
  {user?.role === 'admin' && <AdminPanel />}
</SignedIn>
```

### 2. **Loading States**
```tsx
<SignedIn>
  <Suspense fallback={<Loading />}>
    <ProtectedContent />
  </Suspense>
</SignedIn>
```

### 3. **Custom Redirect Logic**
```tsx
<SignedOut>
  <RedirectToSignIn 
    afterSignInUrl="/courses"
    afterSignUpUrl="/courses" 
  />
</SignedOut>
```

This auth guard pattern ensures secure access control while maintaining a smooth user experience!
