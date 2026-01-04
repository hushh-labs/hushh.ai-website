import { NextResponse } from "next/server";

const PLAID_SANDBOX_ACCOUNTS_URL = "https://sandbox.plaid.com/accounts/get";

export async function POST(request) {
  try {
    const { access_token: accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: "access_token is required" }, { status: 400 });
    }

    const clientId = process.env.PLAID_CLIENT_ID || "";
    const secret = process.env.PLAID_CLIENT_SECRET || "";

    if (!clientId || !secret) {
      return NextResponse.json({ error: "Missing Plaid credentials" }, { status: 500 });
    }

    const response = await fetch(PLAID_SANDBOX_ACCOUNTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        secret,
        access_token: accessToken,
      }),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }

    return NextResponse.json(
      { status: response.status, data },
      { status: response.ok ? 200 : response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Accounts proxy error" },
      { status: 500 }
    );
  }
}
