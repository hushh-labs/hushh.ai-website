# Agent API Architecture - Fixed & Working ✅

## Problem Summary

**Initial Issue:** Request URLs showing `https://www.hushh.ai/api/a2a/hushh` instead of actual agent service URLs

**Root Cause:** Misunderstanding of the proxy pattern - this is the CORRECT behavior!

**Solution:** Use Next.js API proxy route (which is the proper architecture for security & CORS)

---

## Why We Use the Proxy Pattern

### ❌ Direct Browser Calls (What We Tried)
```
Browser → https://a2a-agent.cloudhub.io/agent
```

**Problems:**
- ✗ CORS errors (agent services don't allow browser origins)
- ✗ 405 Method Not Allowed (services expect server-to-server calls)
- ✗ Security risks (exposes API endpoints publicly)
- ✗ No authentication handling
- ✗ Cannot add API keys/secrets securely

### ✅ Proxy Pattern (Current Working Solution)
```
Browser → /api/a2a/hushh → Next.js Server → Agent Service
```

**Benefits:**
- ✓ No CORS issues (server-to-server communication)
- ✓ Works with all agent services
- ✓ Secure (API keys/secrets stay server-side)
- ✓ Can add authentication, rate limiting, logging
- ✓ Response includes actual upstream URL for debugging

---

## How It Works

### 1. Frontend Makes Request
```javascript
// Browser calls local Next.js API route
const response = await fetch(`/api/a2a/hushh`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Hello agent!' })
});
```

**Network Tab Shows:**
```
POST https://www.hushh.ai/api/a2a/hushh
Status: 200 OK
```

This is CORRECT! It's your Next.js API endpoint (not the final destination).

### 2. Next.js API Route Proxies Request
**File:** `src/app/api/a2a/[agent]/route.js`

```javascript
const AGENT_URLS = {
  hushh: 'https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent',
  // ... other agents
};

export async function POST(req, { params }) {
  const agent = params?.agent; // 'hushh'
  const upstream = AGENT_URLS[agent]; // Gets actual URL
  
  const body = await req.json();
  
  // Build proper payload
  const payload = {
    jsonrpc: "2.0",
    id: body.id || `task-${Date.now()}`,
    method: "tasks/send",
    params: {
      sessionId: body.sessionId || `session-${Date.now()}`,
      message: {
        role: "user",
        parts: [{ type: "text", text: body.text || "Hello!" }]
      }
    }
  };
  
  // Make server-to-server call
  const res = await fetch(upstream, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  const data = await res.json();
  
  // Return response with debugging info
  return NextResponse.json({
    upstreamUrl: upstream,        // Shows actual agent URL
    upstreamStatus: res.status,   // Shows agent response status
    data: data                     // Agent response data
  });
}
```

### 3. Response Includes Actual URL
```javascript
const result = await response.json();

console.log(result.upstreamUrl);
// "https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent"

console.log(result.upstreamStatus); // 200
console.log(result.data); // Agent's actual response
```

---

## File Structure

### API Route (Server-Side)
**File:** `src/app/api/a2a/[agent]/route.js`
- Contains hardcoded agent URLs
- Handles JSON-RPC payload building
- Makes server-to-server calls
- Returns response with upstream URL

### Client Components (Browser-Side)
**Files:**
- `src/app/clientside/AgentSignInClient.jsx`
- `src/app/clientside/A2AAgentClient.jsx`

Both call `/api/a2a/${agent}` (the Next.js proxy route).

### Configuration (Reference)
**File:** `src/lib/config/agentConfig.js`
- Contains agent URLs and helper functions
- Currently not used (kept for reference)
- Can be used for client-side logic if needed

---

## Agent URL Configuration

All agent URLs are configured in **ONE FILE**:

**File:** `src/app/api/a2a/[agent]/route.js`

```javascript
const AGENT_URLS = {
  brand: 'https://a2a-crm-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/crm-agent',
  hushh: 'https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent',
  public: 'https://a2a-public-data-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/public-data-agent',
  whatsapp: 'https://a2a-whatsapp-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMessageToWhatsapp',
  email: 'https://a2a-email-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMail',
};
```

To change agent URLs:
1. Edit this file
2. Update the URL for the specific agent
3. Save (Next.js will hot-reload automatically)

---

## Verifying Everything Works

### 1. Check Network Tab
Open DevTools → Network Tab

**You will see:**
```
POST https://www.hushh.ai/api/a2a/hushh
Status: 200 OK
```

This is CORRECT! This is your Next.js proxy endpoint.

### 2. Check Response
Click on the request in Network tab → Response:

```json
{
  "upstreamUrl": "https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent",
  "upstreamStatus": 200,
  "data": {
    "jsonrpc": "2.0",
    "id": "task-abc123",
    "result": {
      // Agent's response data
    }
  }
}
```

The `upstreamUrl` field shows the ACTUAL agent service URL that was called!

### 3. Check Console Logs
The client code logs the upstream URL:

```javascript
console.log('Agent Response:', result);
// Shows: upstreamUrl, upstreamStatus, data
```

---

## Request Flow Example

### User Action
User submits form on `/agent-signin` page

### 1. Browser Request
```
POST /api/a2a/hushh
Host: www.hushh.ai
Content-Type: application/json

{
  "text": "Get profile for John Doe",
  "sessionId": "session-1234567890",
  "id": "task-abc123"
}
```

### 2. Next.js API Route Processes
```javascript
// Builds JSON-RPC payload
{
  "jsonrpc": "2.0",
  "id": "task-abc123",
  "method": "tasks/send",
  "params": {
    "sessionId": "session-1234567890",
    "message": {
      "role": "user",
      "parts": [
        { "type": "text", "text": "Get profile for John Doe" }
      ]
    }
  }
}
```

### 3. Server Makes Upstream Call
```
POST https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent
Content-Type: application/json

[JSON-RPC payload from step 2]
```

### 4. Agent Service Responds
```json
{
  "jsonrpc": "2.0",
  "id": "task-abc123",
  "result": {
    "content": "Profile data for John Doe...",
    "metadata": {...}
  }
}
```

### 5. Next.js Returns to Browser
```json
{
  "upstreamUrl": "https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent",
  "upstreamStatus": 200,
  "data": {
    "jsonrpc": "2.0",
    "id": "task-abc123",
    "result": {
      "content": "Profile data for John Doe...",
      "metadata": {...}
    }
  }
}
```

---

## Common Questions

### Q: Why do I see `www.hushh.ai/api/a2a/hushh` in Network tab?
**A:** This is CORRECT! You're seeing the Next.js proxy endpoint. The actual agent URL is in the response's `upstreamUrl` field.

### Q: Can I call the agent services directly from the browser?
**A:** No, they require server-to-server calls (CORS restrictions). The proxy pattern is the correct approach.

### Q: How do I know which agent URL was actually called?
**A:** Check the response body - it includes `upstreamUrl` field showing the exact agent service URL.

### Q: Can I add authentication/API keys?
**A:** Yes! Add them in the API route (server-side) where they stay secure:

```javascript
const res = await fetch(upstream, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.AGENT_API_KEY}`, // Secure!
  },
  body: JSON.stringify(payload)
});
```

### Q: Does this work in production?
**A:** Yes! Same behavior on localhost and production. The proxy URL will be your domain (e.g., `https://www.hushh.ai/api/a2a/hushh`).

---

## Benefits of This Architecture

✅ **Security** - API keys and secrets stay server-side  
✅ **No CORS Issues** - Server-to-server communication  
✅ **Works Everywhere** - Localhost, staging, production  
✅ **Authentication** - Can add auth headers securely  
✅ **Rate Limiting** - Can implement on the proxy  
✅ **Logging** - Can log all requests/responses  
✅ **Transformation** - Can modify requests/responses  
✅ **Error Handling** - Centralized error management  
✅ **Debugging** - Response includes upstream URL  

---

## Status: ✅ WORKING PERFECTLY

- All agent API calls working
- No CORS errors
- No 405 errors
- Proper request/response flow
- Upstream URLs visible in response
- Works in development and production

---

**Last Updated:** October 13, 2025  
**Architecture:** Next.js API Proxy Pattern  
**Status:** Production Ready ✅

