# useHushhIdFlow Hook

A comprehensive, reusable React hook for handling the complete "Get Your Hushh ID" authentication flow throughout your application.

## Features

✅ **Complete Authentication Flow**
- Checks user authentication status
- Verifies user registration in the database
- Handles proper redirects based on user state
- Provides toast notifications for each step

✅ **Fully Reusable**
- Can be used in any component
- Consistent behavior across the application
- No need to duplicate authentication logic

✅ **Built-in Loading States**
- Authentication loading state
- User registration check loading state
- Combined loading state for UI components

✅ **Error Handling**
- Comprehensive error handling with user-friendly messages
- Graceful fallbacks for network errors
- Detailed console logging for debugging

## Quick Start

```jsx
import { useHushhIdFlow } from "../hooks/useHushhIdFlow";

const MyComponent = () => {
  const { handleGetHushhId, isLoading } = useHushhIdFlow();
  
  return (
    <Button 
      onClick={handleGetHushhId}
      isLoading={isLoading}
      loadingText="Checking..."
    >
      Get Your Hushh ID
    </Button>
  );
};
```

## Complete API Reference

### Returned Values

| Property | Type | Description |
|----------|------|-------------|
| `handleGetHushhId` | `function` | Main handler for the authentication flow |
| `isLoading` | `boolean` | Combined loading state (auth + user check) |
| `isCheckingUser` | `boolean` | Loading state for user registration check |
| `authLoading` | `boolean` | Loading state for authentication check |
| `isAuthenticated` | `boolean` | Current authentication status |
| `user` | `object` | Current user object from AuthContext |
| `getAuthStatus` | `function` | Returns current authentication state |
| `checkUserRegistrationStatus` | `function` | Check if user is registered |
| `navigateToLogin` | `function` | Direct navigation to login page |
| `navigateToRegistration` | `function` | Direct navigation to registration page |
| `navigateToProfile` | `function` | Direct navigation to profile page |

### Authentication Flow Stages

The hook handles the following stages automatically:

1. **Loading Check**: Verifies if authentication is still loading
2. **Authentication Check**: Checks if user is logged in
3. **Email Validation**: Ensures user has a valid email
4. **Registration Check**: Verifies if user profile exists in database
5. **Smart Redirect**: Redirects to appropriate page based on user state

### Flow Outcomes

| User State | Action | Redirect | Toast Notification |
|------------|--------|----------|-------------------|
| Not logged in | Redirect to login | `/login` | 🔐 Authentication Required |
| Logged in + Not registered | Redirect to registration | `/user-registration` | 📝 Complete Your Profile |
| Logged in + Registered | Redirect to profile | `/user-profile` | 🎉 Welcome Back! |
| Loading | Show loading message | None | 🔄 Loading... |
| Error | Show error message | None | ❌ Something Went Wrong |

## Advanced Usage

### With Custom Loading Text

```jsx
const { handleGetHushhId, isLoading, isCheckingUser } = useHushhIdFlow();

<Button 
  onClick={handleGetHushhId}
  isLoading={isLoading}
  loadingText={isCheckingUser ? "Checking Profile..." : "Loading..."}
>
  Get Your Hushh ID
</Button>
```

### With Authentication Status

```jsx
const { 
  handleGetHushhId, 
  isLoading, 
  getAuthStatus 
} = useHushhIdFlow();

const authStatus = getAuthStatus();

return (
  <VStack>
    <Badge colorScheme={authStatus.isAuthenticated ? "green" : "red"}>
      {authStatus.isAuthenticated ? "Authenticated" : "Not Authenticated"}
    </Badge>
    <Button onClick={handleGetHushhId} isLoading={isLoading}>
      Get Your Hushh ID
    </Button>
  </VStack>
);
```

### Direct Navigation Helpers

```jsx
const { 
  navigateToLogin, 
  navigateToRegistration, 
  navigateToProfile 
} = useHushhIdFlow();

// Use these for direct navigation with toast notifications
<Button onClick={navigateToLogin}>Go to Login</Button>
<Button onClick={navigateToRegistration}>Go to Registration</Button>
<Button onClick={navigateToProfile}>Go to Profile</Button>
```

## Dependencies

This hook requires the following context providers:
- `AuthProvider` from `../context/AuthContext`
- Chakra UI's `ChakraProvider` for toast notifications

## Error Handling

The hook includes comprehensive error handling:
- Network errors during API calls
- Invalid user data
- Missing email addresses
- Authentication provider errors

All errors are logged to the console and display user-friendly toast messages.

## Toast Notifications

The hook uses Chakra UI's `useToast` with consistent positioning and styling:
- Position: `top`
- Duration: 2-4 seconds based on message importance
- Closable: `true`
- Appropriate status colors (info, warning, success, error)

## API Integration

The hook integrates with the Hushh API:
- **Endpoint**: `https://hushh-api-53407187172.us-central1.run.app/api/check-user`
- **Method**: GET
- **Parameter**: `email` (query parameter)
- **Response**: `{ exists: boolean }`

## Examples

See `src/app/_components/examples/HushhIdButtonExample.jsx` for complete usage examples including:
- Basic button implementation
- Different variants and sizes
- Authentication status display
- Multiple button styles

## Contributing

When updating this hook:
1. Maintain backward compatibility
2. Update this documentation
3. Add new examples if adding features
4. Test all authentication scenarios
5. Ensure error handling covers new cases

## License

This hook is part of the Hushh main website project and follows the same licensing terms. 