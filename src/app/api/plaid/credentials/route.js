import { NextResponse } from "next/server";

export async function GET() {
  // MuleSoft / Plaid Production Credentials
  const clientId = process.env.PLAID_CLIENT_ID || "6934322f139fbf00216faf36";
  const secret = process.env.PLAID_CLIENT_SECRET || "3800cc352586fd410bb82f63ab020f";

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
