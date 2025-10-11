
# A2A Agents — Website Integration Guide
**Version:** 1.0 • **Last updated:** 22 Sep 2025 (IST)

This document explains (1) what the Interaction Agent and connected agents are, (2) how to add agents to the Interaction Agent UI, and (3) how to integrate the agents into your website using secure server-side routes (Next.js/Node) plus a simple frontend widget. It also includes ready‑to‑use payloads and troubleshooting tips.

---

## 1) Concept Primer — How these agents fit together

**Interaction Agent (Domain):** The central UI/app where you register other agents (e.g., Brand Agent, Hushh Agent). You can then send prompts/queries to any agent you’ve added.

**Operational agents:**
- **Brand Agent (CRM Agent):** Typically used to query brand/CRM-like data.
- **Hushh Agent (Supabase Headless Agent):** Typically used to query and mutate user profiles backed by Supabase.

> In short: you **register** agents in the Interaction Agent UI, then **call** the agent endpoints with a JSON-RPC style payload from your backend (or Next.js route).

---

## 2) Add agents in the Interaction Agent UI

1. Open **Interaction Agent UI**  
   `https://a2a-interaction-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/ui/index.html`

2. Go to **Agents** tab → **Add Agent**  
3. For each agent, fill:
   - **Agent URL**
     - **Brand Agent (CRM):** `https://a2a-crm-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/crm-agent`
     - **Hushh Agent (Supabase):** `https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent`
   - **Agent Type:** `mulesoft ai chain`
4. Click **Save Agent** for each.

**Quick verification:** Ask a simple prompt like _“Can you fetch all the details of the user with phone number (637) 940‑5403?”_ If the agent is wired correctly, you’ll get a response.

---

## 3) JSON-RPC request format (what the agents expect)

Both agents accept **HTTP POST** with a JSON body that follows this structure:

```json
{
  "jsonrpc": "2.0",
  "id": "task-id-123",
  "method": "tasks/send",
  "params": {
    "sessionId": "session-abc",
    "message": {
      "role": "user",
      "parts": [
        { "type": "text", "text": "YOUR NATURAL LANGUAGE PROMPT HERE" }
      ]
    }
  }
}
```

- `id`: Any unique string for tracking.
- `sessionId`: Use a deterministic or random session per user/session.
- `message.parts[0].text`: Your actual query/prompt, e.g., asking for user details by phone number.

---

## 4) Website integration (recommended patterns)

### Option A — Next.js Route Handlers (App Router)

**Why:** Keeps agent URLs/config on the server, avoids CORS issues, and prevents exposing internal endpoints in the browser.

> Create a file: `app/api/a2a/[agent]/route.ts`

```ts
// app/api/a2a/[agent]/route.ts
import { NextRequest, NextResponse } from "next/server";

// Map agent slug => upstream URL from environment vars
const AGENT_URLS: Record<string, string | undefined> = {
  brand: process.env.A2A_BRAND_AGENT_URL,   // e.g. https://.../crm-agent
  hushh: process.env.A2A_HUSHH_AGENT_URL    // e.g. https://.../supabase-agent
};

export async function POST(req: NextRequest, { params }: { params: { agent: string } }) {
  try {
    const agent = params.agent?.toLowerCase();
    const upstream = AGENT_URLS[agent];
    if (!upstream) {
      return NextResponse.json({ error: `Unknown agent '${agent}'` }, { status: 400 });
    }

    // Expecting { text?: string, payload?: object, sessionId?: string, id?: string }
    const body = await req.json();
    const text: string | undefined = body?.text;
    const customPayload = body?.payload;
    const sessionId = body?.sessionId || `session-${Date.now()}`;
    const id = body?.id || `task-${Math.random().toString(36).slice(2)}`;

    const payload = customPayload ?? {
      jsonrpc: "2.0",
      id,
      method: "tasks/send",
      params: {
        sessionId,
        message: {
          role: "user",
          parts: [{ type: "text", text: text ?? "Hello!" }]
        }
      }
    };

    const res = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
      // You can add timeouts via AbortController if needed
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ upstreamStatus: res.status, data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
```

**.env.local**

```bash
A2A_BRAND_AGENT_URL="https://a2a-crm-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/crm-agent"
A2A_HUSHH_AGENT_URL="https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent"
```

**Simple frontend call**

```tsx
// Example React hook or component
async function askBrandAgent(text: string) {
  const res = await fetch("/api/a2a/brand", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const json = await res.json();
  return json;
}
```

### Option B — Plain Node/Express proxy (if not using Next.js)

```js
// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const BRAND_URL = process.env.A2A_BRAND_AGENT_URL;
const HUSHH_URL = process.env.A2A_HUSHH_AGENT_URL;

app.post("/api/agents/:agent", async (req, res) => {
  try {
    const { agent } = req.params;
    const upstream = agent === "brand" ? BRAND_URL : agent === "hushh" ? HUSHH_URL : null;
    if (!upstream) return res.status(400).json({ error: "Unknown agent" });

    const body = req.body;
    const text = body?.text ?? "Hello!";
    const payload = body?.payload ?? {
      jsonrpc: "2.0",
      id: `task-${Date.now()}`,
      method: "tasks/send",
      params: {
        sessionId: body?.sessionId ?? "session-web",
        message: { role: "user", parts: [{ type: "text", text }] }
      }
    };

    const upstreamRes = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await upstreamRes.json().catch(() => ({}));
    res.status(upstreamRes.status).json({ data });
  } catch (e) {
    res.status(500).json({ error: (e && e.message) || "Unknown error" });
  }
});

app.listen(3000, () => console.log("Proxy listening on http://localhost:3000"));
```

---

## 5) Ready‑to‑use payload templates

> You can pass these as `payload` from your frontend to your Next.js/Express route (or construct on the server directly).

### A) Query user details by phone (Brand Agent example)

```json
{
  "jsonrpc": "2.0",
  "id": "task12",
  "method": "tasks/send",
  "params": {
    "sessionId": "session456",
    "message": {
      "role": "user",
      "parts": [
        { "type": "text", "text": "can you fetch all the details of this user having Phone:(815) 529-0244" }
      ]
    }
  }
}
```

### B) Query user details (Hushh Agent example)

```json
{
  "jsonrpc": "2.0",
  "id": "task124",
  "method": "tasks/send",
  "params": {
    "sessionId": "session456",
    "message": {
      "role": "user",
      "parts": [
        { "type": "text", "text": "Can you fetch all the details of the user with phone number 425 555 234?" }
      ]
    }
  }
}
```

> Change only the **text** string to run other queries (see §6 for a catalog).

---

## 6) Useful prompts to test

Try these after wiring your proxy:

- “Can you fetch all the details of the user with phone number (637) 940‑5403?”  
- “Can you fetch all the intentions/wants/desires of the user with phone number (637) 940‑5403?”  
- “What is the occupation of the user with phone number (637) 940‑5403?”  
- “Can you fetch all the future purchase intents of the user with phone number (637) 940‑5403? If no data is available, please forecast based on past purchase history.”  
- “What about the fitness details of the user with phone number (637) 940‑540?”  
- “Can you fetch the marital status of the user with phone number (637) 940‑5403?”  

**Create/Update examples:**  
- “Can you create a user profile with the following details: Full Name: Karlos Mende, Email: caarlos.mendes71@example.com, Phone: (208) 555‑9164?”  
- “Can you update the full name to Karlos for the user having phone: (208) 555‑9164 and User ID: c0c37784‑3097‑47ae‑9e0a‑21a4e3c48f1d?”  
- “Can you update the user’s need to grocery, with the following details: Full Name: Aiden Hernandez, Email: aiden.hernandez401@proton.me, Phone: (637) 940‑5403?”

---

## 7) Minimal frontend widget (drop‑in)

```html
<!-- index.html (if using a static site that talks to your Node/Next.js proxy) -->
<div id="a2a-widget">
  <h3>A2A Demo</h3>
  <label>
    Agent
    <select id="agent">
      <option value="brand">Brand Agent</option>
      <option value="hushh">Hushh Agent</option>
    </select>
  </label>
  <label>
    Prompt
    <input id="prompt" placeholder="Ask something…" />
  </label>
  <button id="send">Send</button>
  <pre id="out"></pre>
</div>
<script>
  document.getElementById("send").onclick = async () => {
    const agent = document.getElementById("agent").value;
    const text = document.getElementById("prompt").value || "Hello!";
    const r = await fetch(`/api/a2a/${agent}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const j = await r.json();
    document.getElementById("out").textContent = JSON.stringify(j, null, 2);
  };
</script>
```

---

## 8) Security, CORS & deployment notes

- **Never call the agent URLs directly from the browser.** Use a server route to avoid leaking URLs/keys and to control CORS/timeouts.
- **Rate limiting & logging:** Add basic rate limiting and request logs in your proxy to prevent abuse and to trace issues.
- **Timeouts & retries:** Use `AbortController` (in Node 18+/Next) or library-based timeouts. Implement simple retries for transient 5xx errors.
- **Input validation:** Sanitize/validate the `text` coming from the client before forwarding.
- **Session strategy:** Use a stable `sessionId` per user-session if you want context continuity within the agent.

---

## 9) Testing with cURL

```bash
# Brand Agent (via your proxy)
curl -X POST https://your-domain.com/api/a2a/brand \
  -H "Content-Type: application/json" \
  -d '{ "text": "Can you fetch all the details of the user with phone number (637) 940-5403?" }'

# Hushh Agent (via your proxy)
curl -X POST https://your-domain.com/api/a2a/hushh \
  -H "Content-Type: application/json" \
  -d '{ "text": "Can you create a user profile with Full Name: Karlos Mende, Email: caarlos.mendes71@example.com, Phone: (208) 555-9164?" }'
```

---

## 10) Troubleshooting

- **CORS error in browser:** You’re likely calling the agent URL directly. Move the call **server-side** (Next.js route/Express).  
- **HTTP 4xx from upstream:** Check payload shape (`jsonrpc`, `id`, `method: "tasks/send"`, `params.sessionId`, `message.role`, `message.parts` array).  
- **No/empty responses:** Try simpler prompts first (“Hello” / “Fetch user details by phone”). Confirm the agent is **added** in the Interaction Agent UI.  
- **Timeouts:** Ensure your hosting allows outbound requests to the CloudHub URLs. Add timeouts and retries in your proxy.  
- **Environment vars not loaded:** In Next.js, put them in `.env.local` and **restart** the dev server.

---

## 11) Quick architecture sketch

```mermaid
flowchart LR
  subgraph Browser
    UI[Prompt Input]
  end
  subgraph WebApp
    API[/Next.js Route or Express Proxy/]
  end
  subgraph CloudHub
    IA[Interaction Agent UI]
    BA[Brand Agent]
    HA[Hushh Agent]
  end

  UI -->|POST /api/a2a/{agent}| API
  API -->|JSON-RPC tasks/send| BA
  API -->|JSON-RPC tasks/send| HA
  IA -. used to register agents .- BA
  IA -. used to register agents .- HA
```

---

## 12) Appendix — Copy/paste snippets

**Generic JSON-RPC shell:**

```json
{
  "jsonrpc": "2.0",
  "id": "task-<unique>",
  "method": "tasks/send",
  "params": {
    "sessionId": "session-<id>",
    "message": {
      "role": "user",
      "parts": [{ "type": "text", "text": "<your natural language prompt>" }]
    }
  }
}
```

**Sample prompts (paste into `text`):**

- Can you fetch all the details of the user with phone number (637) 940‑5403?
- Can you fetch all the intentions/wants/desires of the user with phone number (637) 940‑5403?
- What is the occupation of the user with phone number (637) 940‑5403?
- Can you fetch all the future purchase intents of the user with phone number (637) 940‑5403? If no data is available, please forecast based on past purchase history.
- What about the fitness details of the user with phone number (637) 940‑540?
- Can you fetch the marital status of the user with phone number (637) 940‑5403?
- Create a user profile — Full Name: Karlos Mende, Email: caarlos.mendes71@example.com, Phone: (208) 555‑9164
- Update name to Karlos for phone: (208) 555‑9164 and User ID: c0c37784‑3097‑47ae‑9e0a‑21a4e3c48f1d

---

**You’re set.** Add agents in the Interaction UI, drop in the proxy route, and you can start querying from your site in minutes.
