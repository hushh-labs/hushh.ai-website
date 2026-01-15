import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const env = searchParams.get("env") || "sandbox"; // Default to sandbox if not specified

  let clientId, secret;

  if (env === "production") {
    // MuleSoft / Plaid Production Credentials
    clientId = process.env.PLAID_CLIENT_ID_PRODUCTION;
    secret = process.env.PLAID_SECRET_PRODUCTION;
  } else {
    // MuleSoft / Plaid Sandbox Credentials
    clientId = process.env.PLAID_CLIENT_ID_SANDBOX;
    secret = process.env.PLAID_SECRET_SANDBOX;
  }

  if (!clientId || !secret) {
    return NextResponse.json({ error: "Missing Plaid credentials" }, { status: 500 });
  }

  return NextResponse.json(
    { client_id: clientId, secret, environment: env },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
