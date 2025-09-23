import { NextResponse } from "next/server";

// Map agent slug => upstream URL from environment vars
const AGENT_URLS = {
  brand: process.env.A2A_BRAND_AGENT_URL, // e.g. https://.../crm-agent
  hushh: process.env.A2A_HUSHH_AGENT_URL, // e.g. https://.../supabase-agent
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


