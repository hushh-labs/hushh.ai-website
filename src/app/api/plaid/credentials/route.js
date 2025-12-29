import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.PLAID_CLIENT_ID || "";
  const secret = process.env.PLAID_CLIENT_SECRET || "";

  if (!clientId || !secret) {
    return NextResponse.json({ error: "Missing Plaid credentials" }, { status: 500 });
  }

  return NextResponse.json(
    { client_id: clientId, secret },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
