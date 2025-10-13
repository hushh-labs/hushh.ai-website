/* eslint-env node */
import { NextResponse } from "next/server";

// Configure function timeout (for Vercel deployment)
export const maxDuration = 60; // 60 seconds for Pro plan, 10 for Hobby
export const dynamic = 'force-dynamic';

// Map agent slug => upstream URL (from Postman collections - verified working)
const AGENT_URLS = {
  brand: 'https://a2a-crm-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/crm-agent',
  hushh: 'https://a2a-supabase-headless-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/supabase-agent',
  public: 'https://hushh-open-ai-agent-ap-bt5gn1.7y6hwo.usa-e2.cloudhub.io/public-data-agent',
  whatsapp: 'https://hushh-whatsapp-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMessageToWhatsapp',
  email: 'https://hushh-email-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMail',
};

// WhatsApp Cloud API Bearer Token (from Postman collection)
const WHATSAPP_BEARER_TOKEN = 'EAAT3oJUYUDQBPqJOrU4lY7dOaFOmlQsiGunaeACpfaf92PlBFmNwzxJDCbsd9PaMZBQlRHZCepZCZAldz8AZB9anrQRZAoVYoxRx8aQ1vUxL2sXZAohVZBJMJzk43ZCUEfnPoLJCLpdcvQi4UltrKGxUw2dHH4ZBFOLlNZC9oVMJhpKvQtoePZC45eC4WNdK6oeo4AZDZD';

// Timeout for agent API calls (50 seconds to leave buffer for Vercel)
const AGENT_TIMEOUT = 50000;

export async function POST(req, { params }) {
  const agent = params?.agent?.toLowerCase();
  
  try {
    const upstream = AGENT_URLS[agent];
    if (!upstream) {
      return NextResponse.json({ error: `Unknown agent '${agent}'` }, { status: 400 });
    }

    // Expecting { text?: string, payload?: object, sessionId?: string, id?: string }
    const body = await req.json();
    const text = body?.text;
    let customPayload = body?.payload;
    const sessionId = body?.sessionId || `session-${Date.now()}`;
    const id = body?.id || `task-${Math.random().toString(36).slice(2)}`;

    // For Email/WhatsApp agents, allow top-level payloads (Postman-style) without a "payload" wrapper.
    if (!customPayload) {
      if (agent === 'email' && (typeof body?.to === 'string') && (typeof body?.subject === 'string') && (typeof body?.body === 'string')) {
        customPayload = {
          to: body.to,
          subject: body.subject,
          body: body.body,
          mimeType: body?.mimeType || 'text/html',
        };
      } else if (agent === 'whatsapp' && (typeof body?.messaging_product === 'string') && (typeof body?.to === 'string') && (typeof body?.type === 'string')) {
        customPayload = body;
      }
    }

    // Default JSON-RPC payload for "ai chain" style agents. For non-JSON-RPC
    // services like WhatsApp or Email, callers should pass a custom `payload`.
    const payload = customPayload ?? {
      jsonrpc: "2.0",
      id,
      method: "tasks/send",
      params: {
        sessionId,
        message: {
          role: "user",
          parts: [{ type: "text", text: text ?? "Hello!" }],
        },
      },
    };

    // Build headers - WhatsApp needs Authorization Bearer token
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    
    // Add Authorization header for WhatsApp Cloud API
    if (agent === 'whatsapp') {
      headers.Authorization = `Bearer ${WHATSAPP_BEARER_TOKEN}`;
    }

    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AGENT_TIMEOUT);

    try {
      const res = await fetch(upstream, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));
      return NextResponse.json({ 
        upstreamUrl: upstream, 
        upstreamStatus: res.status, 
        data,
        timestamp: new Date().toISOString()
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Handle timeout specifically
      if (fetchError.name === 'AbortError') {
        return NextResponse.json({ 
          error: `Agent timeout after ${AGENT_TIMEOUT/1000}s`,
          upstreamUrl: upstream,
          upstreamStatus: 408,
          data: {},
          timeout: true
        }, { status: 408 });
      }
      
      throw fetchError;
    }
  } catch (err) {
    console.error(`Error in /api/a2a/${agent}:`, err);
    return NextResponse.json({ 
      error: err?.message ?? "Unknown error",
      agent,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}


