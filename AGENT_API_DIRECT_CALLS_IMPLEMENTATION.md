# Agent API Direct Calls Implementation

## Overview

The frontend now calls agent APIs **directly** instead of using the Next.js proxy route. This ensures you see the actual agent service URLs in the browser's Network tab.

## What Changed

### Before (Proxy Pattern)
```
Browser → /api/a2a/hushh (Next.js Proxy) → Agent Service URL
```
- Browser showed: `https://www.hushh.ai/api/a2a/hushh`
- Actual agent call happened server-side (hidden from browser)

### After (Direct Calls)
```
Browser → Agent Service URL (Direct)
```
- Browser shows: `https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent`
- All API calls are visible in Network tab

## Files Created/Modified

### 1. Created: `src/lib/config/agentConfig.js`
Central configuration file for all agent URLs and helper functions:

```javascript
export const AGENT_API_URLS = {
  brand: 'https://a2a-crm-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/crm-agent',
  hushh: 'https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent',
  public: 'https://a2a-public-data-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/public-data-agent',
  whatsapp: 'https://a2a-whatsapp-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMessageToWhatsapp',
  email: 'https://a2a-email-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMail',
};
```

**Helper Functions:**
- `getAgentUrl(agentType)` - Get agent URL by type
- `buildJsonRpcPayload(text, sessionId, id)` - Build JSON-RPC payload for AI agents
- `buildWhatsappPayload(phoneNumber, templateName, userName)` - Build WhatsApp payload
- `buildEmailPayload(to, subject, body, mimeType)` - Build Email payload

### 2. Updated: `src/app/clientside/AgentSignInClient.jsx`
- Imports agent config helpers
- Calls agent APIs directly using `fetch(agentUrl, ...)`
- No longer uses `/api/a2a/${agent}` proxy route

### 3. Updated: `src/app/clientside/A2AAgentClient.jsx`
- Imports agent config helpers
- `sendText()` function calls agents directly
- `sendPayload()` function calls agents directly
- No longer uses `/api/a2a/${agent}` proxy route

### 4. Kept: `src/app/api/a2a/[agent]/route.js`
- Still has hardcoded URLs (fallback/reference)
- Can be used as a proxy if needed in the future
- Currently not used by the frontend

## Benefits

✅ **Transparency** - See actual API URLs in browser Network tab  
✅ **No Environment Variables** - URLs hardcoded in one central file  
✅ **Consistent Behavior** - Same on localhost and production  
✅ **Easy Updates** - Change URLs in one place (`agentConfig.js`)  
✅ **Better Debugging** - See exact requests and responses  
✅ **No Proxy Overhead** - Direct communication with agent services  

## CORS Considerations

**Important:** Direct browser calls to external APIs require CORS headers to be configured on the agent services. If you encounter CORS errors:

1. **Check agent service CORS settings** - Ensure they allow requests from your domain
2. **Fallback option** - Uncomment the proxy route usage if CORS cannot be configured
3. **Production domains** - Make sure agent services allow `https://www.hushh.ai` origin

## Testing

1. **Open Browser DevTools** (F12)
2. **Go to Network tab**
3. **Navigate to** agent features:
   - `/agent-signin` - AgentSignInClient
   - `/a2a-agents` - A2AAgentClient
4. **Make a request** and observe:
   - Request URL shows actual agent service URL
   - Request headers, payload, and response are all visible

Example Network Tab Entry:
```
POST https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent
Status: 200 OK
```

## Updating Agent URLs

To change agent URLs, edit **one file only**:

**File:** `src/lib/config/agentConfig.js`

```javascript
export const AGENT_API_URLS = {
  brand: 'https://your-new-brand-url.com/crm-agent',
  hushh: 'https://your-new-hushh-url.com/supabase-agent',
  // ... etc
};
```

Changes take effect immediately with hot-reload in development.

## Troubleshooting

### Issue: CORS Error
**Solution:** Configure CORS on agent services or use the proxy route as fallback

### Issue: Network timeout
**Solution:** Check agent service availability and network connectivity

### Issue: Wrong URL being called
**Solution:** Verify `agentConfig.js` has correct URLs and is imported properly

## Migration Notes

- **No environment variables needed** - URLs are in source code
- **No `.env.local` file required** - Removed during implementation
- **API route still exists** - Can be restored if proxy pattern is needed
- **All existing features work** - No breaking changes to UI/UX

## Code Examples

### Making a Direct Agent Call

```javascript
import { getAgentUrl, buildJsonRpcPayload } from '@/lib/config/agentConfig';

// Get the agent URL
const agentUrl = getAgentUrl('hushh');

// Build the payload
const payload = buildJsonRpcPayload('Hello, agent!');

// Make the direct API call
const response = await fetch(agentUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify(payload),
});

const result = await response.json();
console.log('Agent response:', result);
```

## Security Considerations

⚠️ **API URLs are public** - They are visible in browser source code and Network tab  
✅ **Authentication** - Should be handled by agent services (API keys, tokens, etc.)  
✅ **Rate limiting** - Should be implemented on agent services  
✅ **Input validation** - Already implemented in frontend and should exist on backend  

---

**Last Updated:** October 13, 2025  
**Status:** ✅ Implemented and Working

