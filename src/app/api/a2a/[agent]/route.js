/* eslint-env node */
import { NextResponse } from "next/server";

// Configure function timeout (for Vercel deployment)
export const maxDuration = 60; // 60 seconds for Pro plan, 10 for Hobby
export const dynamic = 'force-dynamic';

// Map agent slug => upstream URL (from Postman collections - verified working)
const AGENT_URLS = {
  brand: 'https://hushh-brand-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/crm-agent',
  // Legacy headless endpoint now returns 500s because its upstream Supabase call fails
  // with a 400 that lacks a Content-Type header. Switch to the new Query Agent host.
  hushh: 'https://hushh-supabase-query-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-query-agent',
  'hushh-profile': 'https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent',
  'supabase-profile-creation-agent': 'https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent',
  'hushh-profile-update': 'https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent',
  public: 'https://hushh-open-ai-agent-ap-bt5gn1.7y6hwo.usa-e2.cloudhub.io/public-data-agent',
  gemini: 'https://hushh-geminiai-agent-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/public-data-agent',
  'gemini-proxy': 'https://hushh-geminiai-proxy-bt5gn1.7y6hwo.usa-e2.cloudhub.io/public-data-agent',
  whatsapp: 'https://hushh-whatsapp-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMessageToWhatsapp',
  email: 'https://hushh-email-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMail',
};

// Optional: Facebook Graph API endpoint for WhatsApp Cloud API (used when provider === 'facebook')
const FACEBOOK_WHATSAPP_URL = 'https://graph.facebook.com/v22.0/829639396896769/messages';

// WhatsApp Cloud API Bearer Token (used only when provider === 'facebook')
const WHATSAPP_BEARER_TOKEN = 'EAAT3oJUYUDQBPqJOrU4lY7dOaFOmlQsiGunaeACpfaf92PlBFmNwzxJDCbsd9PaMZBQlRHZCepZCZAldz8AZB9anrQRZAoVYoxRx8aQ1vUxL2sXZAohVZBJMJzk43ZCUEfnPoLJCLpdcvQi4UltrKGxUw2dHH4ZBFOLlNZC9oVMJhpKvQtoePZC45eC4WNdK6oeo4AZDZD';

// Timeout for agent API calls (50 seconds to leave buffer for Vercel)
const AGENT_TIMEOUT = 50000;

export async function POST(req, { params }) {
  const agent = params?.agent?.toLowerCase();

  try {
    let upstream = AGENT_URLS[agent];
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
        // Normalize email payload
        const to = String(body.to).trim();
        customPayload = {
          to,
          subject: String(body.subject),
          body: String(body.body),
          mimeType: body?.mimeType || 'text/html',
        };
      } else if (agent === 'whatsapp' && (typeof body?.messaging_product === 'string') && (typeof body?.to === 'string') && (typeof body?.type === 'string')) {
        customPayload = body;
      }
    }

    // Provider selection for WhatsApp: 'facebook' (Graph API) or 'mulesoft' (CloudHub proxy)
    // Priority: explicit body.provider -> infer from template/language -> default 'mulesoft'
    let whatsappProvider = 'mulesoft';
    if (agent === 'whatsapp') {
      const explicitProvider = (body?.provider || body?.payload?.provider || '').toLowerCase();
      const templateName = body?.template?.name || body?.payload?.template?.name || customPayload?.template?.name;
      const langCode = body?.template?.language?.code || body?.payload?.template?.language?.code || customPayload?.template?.language?.code;
      if (explicitProvider === 'facebook' || explicitProvider === 'mulesoft') {
        whatsappProvider = explicitProvider;
      } else if (templateName === 'hello_world' || langCode === 'en_US') {
        whatsappProvider = 'facebook';
      }

      // Choose upstream based on provider
      if (whatsappProvider === 'facebook') {
        upstream = FACEBOOK_WHATSAPP_URL;
      } else {
        upstream = AGENT_URLS.whatsapp; // Mulesoft
      }

      // Normalize phone number format per provider
      if (customPayload?.to) {
        const digitsOnly = String(customPayload.to).replace(/[^0-9]/g, '');
        customPayload.to = whatsappProvider === 'mulesoft' ? `+${digitsOnly}` : digitsOnly;
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

    // Build headers
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Add Authorization header only when calling Facebook Graph API
    if (agent === 'whatsapp' && upstream === FACEBOOK_WHATSAPP_URL) {
      headers.Authorization = `Bearer ${WHATSAPP_BEARER_TOKEN}`;
    }

    // Ensure UTF-8 for email payloads (HTML content and unicode subject)
    if (agent === 'email') {
      headers["Content-Type"] = "application/json; charset=utf-8";
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

      // Try to parse JSON; otherwise include raw text for debugging
      const contentType = res.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await res.json().catch(() => ({}));
      } else {
        const text = await res.text().catch(() => '');
        data = text ? { message: text } : {};
      }

      return NextResponse.json({
        upstreamUrl: upstream,
        upstreamStatus: res.status,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);

      // Handle timeout specifically
      if (fetchError.name === 'AbortError') {
        return NextResponse.json({
          error: `Agent timeout after ${AGENT_TIMEOUT / 1000}s`,
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


