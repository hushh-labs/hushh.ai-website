import { NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io",
  "hushh-plaid-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io",
  "hushh-plaid-mcp-server-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io",
]);

const ALLOWED_METHODS = new Set(["GET", "POST"]);

export async function POST(request) {
  try {
    const { endpoint, method = "POST", payload, overrideMethod } = await request.json();

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 });
    }

    const normalizedMethod = method?.toUpperCase() || "POST";
    if (!ALLOWED_METHODS.has(normalizedMethod)) {
      return NextResponse.json({ error: "HTTP method not allowed" }, { status: 405 });
    }

    const url = new URL(endpoint);
    if (!ALLOWED_HOSTS.has(url.host) || url.protocol !== "https:") {
      return NextResponse.json({ error: "Endpoint host not allowed" }, { status: 403 });
    }
    if (normalizedMethod === "GET" && payload) {
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, value);
        }
      });
    }

    const env = request.headers.get("x-plaid-env") || "sandbox";

    let clientId, secret;
    if (env === "production") {
      clientId = process.env.PLAID_CLIENT_ID_PRODUCTION;
      secret = process.env.PLAID_SECRET_PRODUCTION;
    } else {
      clientId = process.env.PLAID_CLIENT_ID_SANDBOX;
      secret = process.env.PLAID_SECRET_SANDBOX;
    }

    const finalPayload = {
      ...(payload || {}),
      client_id: clientId,
      secret: secret,
    };

    console.log(`[Proxy] Environment: ${env}`);
    console.log("[Proxy] Sending to:", url.toString());
    console.log("[Proxy] Payload:", JSON.stringify(finalPayload, null, 2));

    const response = await fetch(url.toString(), {
      method: normalizedMethod,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        ...(overrideMethod ? { "X-HTTP-Method-Override": overrideMethod } : {}),
      },
      body: JSON.stringify(finalPayload),
    });

    const text = await response.text();
    console.log("[Proxy] Response Status:", response.status);
    console.log("[Proxy] Response Body:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }

    return NextResponse.json(
      {
        status: response.status,
        methodUsed: normalizedMethod,
        data,
      },
      { status: response.ok ? 200 : response.status }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message || "Proxy error" }, { status: 500 });
  }
}
