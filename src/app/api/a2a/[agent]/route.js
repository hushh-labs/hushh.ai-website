/* eslint-env node */
import { NextResponse } from "next/server";

// Map agent slug => upstream URL from environment vars
const AGENT_URLS = {
  brand: process.env.A2A_BRAND_AGENT_URL, // e.g. https://.../crm-agent
  hushh: process.env.A2A_HUSHH_AGENT_URL, // e.g. https://.../supabase-agent
  public: process.env.A2A_PUBLIC_DATA_AGENT_URL, // e.g. https://.../public-data-agent
  whatsapp: process.env.A2A_WHATSAPP_AGENT_URL, // e.g. https://.../sendMessageToWhatsapp
  email: process.env.A2A_EMAIL_AGENT_URL, // e.g. https://.../sendMail
};

export async function POST(req, { params }) {
  try {
    const agent = params?.agent?.toLowerCase();
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

    const res = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ upstreamStatus: res.status, data });
  } catch (err) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}


