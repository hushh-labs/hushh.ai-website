import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { endpoint, method = "POST", payload } = await request.json();

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 });
    }

    const normalizedMethod = method?.toUpperCase() || "POST";

    const url = new URL(endpoint);
    if (normalizedMethod === "GET" && payload) {
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, value);
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: normalizedMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        normalizedMethod === "GET" ? undefined : JSON.stringify(payload || {}),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }

    return NextResponse.json({ status: response.status, methodUsed: normalizedMethod, data });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Proxy error" }, { status: 500 });
  }
}
