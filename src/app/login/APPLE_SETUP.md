# Apple Sign-In and Wallet Setup Guide for Hushh Website

This guide provides complete instructions for setting up Apple Sign-In with Supabase authentication in the Hushh website.

## 📋 Prerequisites

- Apple Developer Account (paid)
- Supabase project with authentication enabled
- Access to your website's environment variables

## 🍎 Apple Developer Console Setup

### Step 1: Create App ID

1. Go to [Apple Developer Console](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles** > **Identifiers**
3. Click the **+** button to create a new identifier
4. Select **App IDs** and click **Continue**
5. Choose **App** and click **Continue**
6. Fill in the details:
   - **Description**: `Hushh App`
   - **Bundle ID**: `com.hushh.app` (or your preferred format)
7. Under **Capabilities**, enable **Sign In with Apple**
8. Click **Continue** and then **Register**

### Step 2: Create Services ID

1. In **Identifiers**, click **+** again
2. Select **Services IDs** and click **Continue**
3. Fill in the details:
   - **Description**: `Hushh Web Service`
   - **Identifier**: `com.hushh.web` (this will be your `APPLE_CLIENT_ID`)
4. Click **Continue** and **Register**
5. Click on your newly created Services ID
6. Enable **Sign In with Apple**
7. Click **Configure** next to Sign In with Apple
8. Select your App ID as the **Primary App ID**
9. Add Website URLs:
   - **Domains**: `localhost`, `hushh.ai`
   - **Return URLs**: 
     - `http://localhost:3000/login/callback`
     - `https://hushh.ai/login/callback`
10. Click **Save** and **Continue**, then **Save**

### Step 3: Create Private Key

1. Navigate to **Keys** section
2. Click **+** to create a new key
3. Fill in:
   - **Key Name**: `Hushh Apple Sign In Key`
   - Enable **Sign In with Apple**
4. Click **Configure** and select your App ID
5. Click **Save**, then **Continue**, then **Register**
6. **Download the `.p8` file immediately** (you can't download it again)
7. Note the **Key ID** (you'll need this for `APPLE_KEY_ID`)

### Step 4: Configure Email Communication

1. Navigate to **Services** section
2. Find **Sign in with Apple for Email Communication**
3. Click **Configure**
4. Add your email domains (e.g., `hushh.ai`, `noreply@hushh.ai`)
5. Complete the verification process

### Step 5: Get Team ID

1. Go to **Membership** in your Apple Developer account
2. Note your **Team ID** (10-character alphanumeric string)

## 🏗️ Supabase Configuration

### Step 1: Enable Apple Provider

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Authentication** > **Providers**
3. Find **Apple** and toggle it **ON**

### Step 2: Configure Apple Settings

1. **Apple OAuth client ID**: Enter your Services ID (e.g., `com.hushh.web`)
2. **Apple OAuth client secret**: Generate using the tool below

### Step 3: Generate Client Secret

Use the tool provided in the Supabase documentation or create one manually:

```javascript
// You can use this in a Node.js script to generate the secret
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('path/to/your/AuthKey_XXXXXXXXXX.p8', 'utf8');

const secret = jwt.sign({}, privateKey, {
  algorithm: 'ES256',
  expiresIn: '180d', // 6 months
  audience: 'https://appleid.apple.com',
  issuer: 'YOUR_TEAM_ID',
  subject: 'YOUR_SERVICES_ID',
  keyid: 'YOUR_KEY_ID'
});

console.log(secret);
```

### Step 4: Update Redirect URLs

Add these redirect URLs in your Supabase Auth settings:
- `http://localhost:3000/login/callback`
- `https://hushh.ai/login/callback`

## 🔧 Environment Variables

Create or update your `.env.local` file with these variables:

```bash
# Apple Sign-In Configuration
APPLE_CLIENT_ID=com.hushh.web
NEXT_PUBLIC_APPLE_CLIENT_ID=com.hushh.web
APPLE_TEAM_ID=YOUR_TEAM_ID_HERE
APPLE_KEY_ID=YOUR_KEY_ID_HERE
APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----"

# Apple Wallet Pass (PKPass) Configuration
# Base64 strings of certificates
APPLE_WWDR_CERT_BASE64=
APPLE_PASS_CERT_P12_BASE64=
APPLE_PASS_CERT_PASSWORD=
APPLE_ORG_NAME=Hushh
APPLE_PASS_TYPE_IDENTIFIER=pass.hushh.id

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://gsqmwxqgqrgzhlhmbscg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcW13eHFncXJnemhsaG1ic2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NTk5ODYsImV4cCI6MjA1NDMzNTk4Nn0.a30I6aLvNNIS6coxJbgTeGBUmKR0NvTkZUDG5uyloFY

# NextAuth Secret
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## 🍎 Apple Wallet Pass Route

- API: `GET /api/wallet/pass?hushh_id=H12345&name=John%20Doe`
- Response: `application/vnd.apple.pkpass` (download triggers Wallet on iOS)
- Desktop flow: The profile page shows a QR containing the URL above to scan on iPhone.

Ensure you upload the correct certificates and identifiers in env before testing in production.

## 📁 File Structure

Your Apple Sign-In implementation includes these files:

```
src/app/login/
├── config/
│   └── appleAuth.js          # Apple auth configuration
├── services/
│   └── appleAuthService.js   # Apple auth service logic
├── components/
│   └── AppleSignInButton.jsx # Apple sign-in button component
├── callback/
│   └── page.jsx             # Apple OAuth callback handler
├── page.jsx                 # Updated login page with Apple button
└── APPLE_SETUP.md          # This setup guide
```

## 🧪 Testing

### Local Testing
1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Click the "Continue with Apple" button
4. You should be redirected to Apple's sign-in page
5. After authentication, you should return to the callback page

### Production Testing
1. Deploy your changes to production
2. Test with `https://hushh.ai/login`
3. Verify the callback works correctly

## 🔍 Troubleshooting

### Common Issues

#### 1. "Invalid Client" Error
- **Cause**: Services ID not properly configured
- **Solution**: Check that your Services ID has the correct return URLs

#### 2. "Invalid Scope" Error
- **Cause**: Scope configuration issue
- **Solution**: Ensure scope is set to "name email"

#### 3. "Invalid Grant" Error
- **Cause**: Client secret expired or incorrect
- **Solution**: Generate a new client secret

#### 4. Redirect URI Mismatch
- **Cause**: Return URL doesn't match configured URLs
- **Solution**: Check both Apple Developer Console and Supabase settings

#### 5. Private Key Format Error
- **Cause**: Incorrect private key format in environment variables
- **Solution**: Ensure newlines are properly escaped as `\n`

### Debug Mode

To enable debug logging, add this to your environment:

```bash
DEBUG=apple-auth:*
```

### Network Debugging

Check browser network tab for:
- OAuth request to Apple
- Callback to your site
- Session creation in Supabase

## 📞 Support

For additional help:
- [Apple Developer Documentation](https://developer.apple.com/documentation/sign_in_with_apple)
- [Supabase Apple Auth Docs](https://supabase.com/docs/guides/auth/social-login/auth-apple)
- Check browser console for error messages
- Verify all environment variables are set correctly

## 🔄 Maintenance

### Regular Tasks

1. **Monitor Client Secret Expiration**
   - Apple client secrets expire every 6 months
   - Set a calendar reminder to regenerate before expiration

2. **Update Return URLs**
   - When adding new domains, update both Apple and Supabase

3. **Monitor Error Logs**
   - Check for authentication failures
   - Monitor callback success rates

### Security Best Practices

1. Keep private keys secure and never commit them to version control
2. Use environment variables for all sensitive data
3. Regularly rotate client secrets
4. Monitor for unauthorized access attempts
5. Keep Apple Developer account credentials secure

## ✅ Verification Checklist

- [ ] App ID created with Sign in with Apple enabled
- [ ] Services ID created and configured with correct return URLs
- [ ] Private key generated and downloaded
- [ ] Email communication configured
- [ ] Supabase Apple provider enabled
- [ ] Client secret generated and added to Supabase
- [ ] Environment variables set correctly
- [ ] Local testing successful
- [ ] Production testing successful
- [ ] Error handling tested
- [ ] Callback page working correctly

---

**Last Updated**: January 2025
**Version**: 1.0.0 