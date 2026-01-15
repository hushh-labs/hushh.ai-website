import { NextResponse } from "next/server";

const PLAID_ACCOUNTS_URL = "https://production.plaid.com/accounts/get";

export async function POST(request) {
  try {
    const { access_token: accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: "access_token is required" }, { status: 400 });
    }

    const clientId = process.env.PLAID_CLIENT_ID || "6934322f139fbf00216faf36";
    const secret = process.env.PLAID_CLIENT_SECRET || "3800cc352586fd410bb82f63ab020f";

    if (!clientId || !secret) {
      return NextResponse.json({ error: "Missing Plaid credentials" }, { status: 500 });
    }

    const response = await fetch(PLAID_ACCOUNTS_URL, {
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
