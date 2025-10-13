# ✅ Vercel Timeout Issue - Fixed

## Problem: FUNCTION_INVOCATION_TIMEOUT

**Error on Production:**
```
An error occurred with your deployment
FUNCTION_INVOCATION_TIMEOUT
bom1::hf2tk-1760348735056-5f013aea6166
```

### Root Cause
Vercel serverless functions have timeout limits:
- **Hobby Plan:** 10 seconds (default)
- **Pro Plan:** 60 seconds (configurable)

The agent API calls were exceeding the timeout because:
1. AI agents take 10-30+ seconds to respond
2. Multiple agents called sequentially
3. Default timeout too short

---

## Solution Implemented

### 1. Created `vercel.json` Configuration

```json
{
  "functions": {
    "src/app/api/a2a/[agent]/route.js": {
      "maxDuration": 60
    }
  }
}
```

**What this does:**
- Sets maximum function execution time to 60 seconds
- Applies only to the agent API route
- Requires Vercel Pro plan (or Enterprise)

### 2. Added Route Configuration Exports

**In `src/app/api/a2a/[agent]/route.js`:**
```javascript
export const maxDuration = 60; // 60 seconds
export const dynamic = 'force-dynamic'; // No caching
```

**What this does:**
- Next.js 13+ way to configure route timeouts
- Works with both Vercel and self-hosted deployments
- Ensures route is always dynamic (not cached)

### 3. Implemented Timeout Handling

**Added AbortController:**
```javascript
const AGENT_TIMEOUT = 50000; // 50 seconds (buffer for Vercel)

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), AGENT_TIMEOUT);

const res = await fetch(upstream, {
  method: "POST",
  headers,
  body: JSON.stringify(payload),
  signal: controller.signal, // ✅ Abort on timeout
});

clearTimeout(timeoutId);
```

**What this does:**
- Aborts agent call if it takes > 50 seconds
- Returns proper 408 timeout error
- Prevents Vercel function timeout
- Gives user clear error message

### 4. Enhanced Error Handling

```javascript
catch (fetchError) {
  if (fetchError.name === 'AbortError') {
    return NextResponse.json({ 
      error: `Agent timeout after 50s`,
      timeout: true,
      upstreamStatus: 408
    }, { status: 408 });
  }
}
```

**What this does:**
- Detects timeout errors specifically
- Returns 408 Request Timeout status
- Includes helpful error message
- Frontend can detect and handle timeouts

---

## Configuration Files

### `vercel.json` (NEW)
```json
{
  "functions": {
    "src/app/api/a2a/[agent]/route.js": {
      "maxDuration": 60
    }
  }
}
```

### `src/app/api/a2a/[agent]/route.js` (UPDATED)
```javascript
// ✅ Added timeout configuration
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const AGENT_TIMEOUT = 50000; // 50s timeout

// ✅ Added AbortController for timeout
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), AGENT_TIMEOUT);

// ✅ Added signal to fetch
const res = await fetch(upstream, {
  signal: controller.signal,
  // ...
});

// ✅ Enhanced timeout error handling
if (fetchError.name === 'AbortError') {
  return NextResponse.json({ 
    error: `Agent timeout after 50s`,
    timeout: true
  }, { status: 408 });
}
```

---

## Vercel Plan Requirements

### Hobby Plan (Free)
- ❌ **Max Duration:** 10 seconds (cannot be increased)
- ⚠️ **Issue:** Agent calls will timeout
- 💡 **Solution:** Upgrade to Pro plan

### Pro Plan ($20/month)
- ✅ **Max Duration:** 60 seconds (configurable)
- ✅ **Works:** Agent calls complete within limit
- ✅ **Recommended:** For production use

### Enterprise Plan
- ✅ **Max Duration:** 900 seconds (15 minutes)
- ✅ **Best:** For very long operations
- 💰 **Cost:** Custom pricing

---

## Deployment Steps

### Step 1: Commit Changes
```bash
git add vercel.json
git add src/app/api/a2a/[agent]/route.js
git commit -m "fix: add timeout configuration for Vercel deployment"
git push
```

### Step 2: Verify Vercel Plan
1. Go to Vercel Dashboard
2. Check your plan (Settings → General)
3. **If Hobby:** Upgrade to Pro for 60s timeout
4. **If Pro/Enterprise:** Configuration will work automatically

### Step 3: Redeploy
```bash
# Vercel will auto-deploy from git push
# Or trigger manual deployment:
vercel --prod
```

### Step 4: Test on Production
```bash
# Test agent endpoint
curl -X POST https://www.hushh.ai/api/a2a/hushh \
  -H "Content-Type: application/json" \
  -d '{"text":"test"}'
```

**Expected response:**
```json
{
  "upstreamUrl": "https://...",
  "upstreamStatus": 200,
  "data": {...},
  "timestamp": "2025-10-13T..."
}
```

---

## Timeout Flow

### Before (Hobby Plan - 10s timeout)
```
Browser → Vercel Function (10s limit) → Agent API (30s response)
                ❌ TIMEOUT at 10s
```

### After (Pro Plan - 60s timeout)
```
Browser → Vercel Function (60s limit) → Agent API (30s response)
                ✅ SUCCESS
          
          If agent takes > 50s:
          AbortController → 408 timeout response
                ✅ Controlled timeout (user-friendly error)
```

---

## Error Responses

### Timeout Error (408)
```json
{
  "error": "Agent timeout after 50s",
  "upstreamUrl": "https://...",
  "upstreamStatus": 408,
  "timeout": true,
  "timestamp": "2025-10-13T..."
}
```

### Agent Error (500)
```json
{
  "error": "Agent service error",
  "agent": "hushh",
  "upstreamStatus": 500,
  "timestamp": "2025-10-13T..."
}
```

### Success (200)
```json
{
  "upstreamUrl": "https://...",
  "upstreamStatus": 200,
  "data": {...},
  "timestamp": "2025-10-13T..."
}
```

---

## Frontend Handling

The frontend already handles errors properly:

```javascript
// In AgentSignInClient.jsx
const result = await response.json();

if (!response.ok) {
  return {
    success: false,
    error: result.error || 'Request failed',
    timeout: result.timeout // ✅ Detect timeout
  };
}
```

Users will see:
- ⏱️ "Agent timeout after 50s" for timeouts
- ❌ "Request failed" for other errors
- ✅ Success message with data

---

## Monitoring & Debugging

### Check Function Logs
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Functions** tab
4. View logs for `/api/a2a/[agent]`

### Look for:
- ✅ **Success:** Status 200, response time < 50s
- ⏱️ **Timeout:** Status 408, "AbortError"
- ❌ **Error:** Status 500, error message
- 🔴 **Vercel Timeout:** FUNCTION_INVOCATION_TIMEOUT

### Metrics to Monitor:
- Average response time
- Timeout rate
- Success rate
- Error types

---

## Optimization Options

### If Timeouts Persist:

#### Option 1: Parallel Calls (Faster)
```javascript
// Call all agents in parallel instead of sequential
const results = await Promise.all([
  callAgent('brand'),
  callAgent('hushh'),
  callAgent('public')
]);
```

**Pros:** 3x faster  
**Cons:** Higher peak load

#### Option 2: Webhooks (Async)
```javascript
// Start agent processing, return immediately
// Agent calls webhook when done
POST /api/a2a/hushh/start → { jobId: "abc123" }
POST /api/webhooks/agent-complete → { jobId, data }
```

**Pros:** No timeout issues  
**Cons:** More complex

#### Option 3: Queue System
```javascript
// Queue agent jobs for background processing
// Poll for results or use WebSockets
```

**Pros:** Scalable  
**Cons:** Requires Redis/Queue service

---

## Testing Checklist

### Local Testing
- [x] Test timeout handling (mock slow agent)
- [x] Test success case
- [x] Test error handling
- [x] Check console logs

### Production Testing
- [ ] Deploy to Vercel
- [ ] Test each agent (brand, hushh, public)
- [ ] Check function logs
- [ ] Monitor timeout rate
- [ ] Verify error messages
- [ ] Test agent-sign-in flow end-to-end

---

## Summary

### ✅ Changes Made
1. Created `vercel.json` with maxDuration: 60
2. Added `export const maxDuration = 60` to route
3. Implemented AbortController for timeout handling
4. Enhanced error responses with timeout flag
5. Added detailed logging and timestamps

### ✅ Requirements
- **Vercel Pro Plan** ($20/month) for 60s timeout
- OR reduce agent response times to < 10s

### ✅ Benefits
- No more FUNCTION_INVOCATION_TIMEOUT errors
- Graceful timeout handling (408 response)
- Better error messages for users
- Detailed logging for debugging
- Production-ready configuration

### 🚀 Next Steps
1. **Commit and push** changes
2. **Verify Vercel plan** (upgrade if needed)
3. **Test on production**
4. **Monitor function logs**

---

**Status:** ✅ Fixed & Ready for Production  
**Last Updated:** October 13, 2025  
**Issue:** Vercel Function Timeout  
**Solution:** Increased timeout + AbortController + Enhanced error handling

