/* eslint-env node */
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PUBLIC_AGENT_URL = "https://hushh-open-ai-agent-ap-bt5gn1.7y6hwo.usa-e2.cloudhub.io/public-data-agent";
const AGENT_TIMEOUT = 45000;

function decodeToken(token) {
  if (!token || typeof token !== "string") {
    throw new Error("Missing token");
  }
  const normalized = token.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  const json = Buffer.from(padded, "base64").toString("utf8");
  return JSON.parse(json);
}

function buildPrompt({ fullName, email, phone }) {
  const namePart = fullName ? `of ${fullName}` : "for this user";
  const phonePart = phone ? ` and phone ${phone}` : "";
  const emailPart = email ? ` having email ${email}` : "";

  return `Can you provide me with a detailed JSON profile ${namePart}${emailPart}${phonePart} that includes all possible fields such as user ID, full name, phone, email, address, age, gender, marital status, household size, children count, education level, occupation, income bracket, home ownership, city tier, transport, diet preference, favorite cuisine, coffee or tea choice, fitness routine, gym membership, shopping preference, grocery store type, fashion style, tech affinity, primary device, favorite social platform, social media usage time, content preference, sports interest, gaming preference, travel frequency, eco-friendliness, sleep chronotype, needs, wants, desires, and 24h/48h/72h intents with category, budget, time window, and confidence. The output should strictly be in JSON format. If some information is not available from public sources, please generate reasonable and relevant placeholder data instead of leaving fields blank, while keeping it realistic and respectful.`;
}

async function callPublicAgent(prompt) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AGENT_TIMEOUT);

  try {
    const res = await fetch(PUBLIC_AGENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: `task-${Date.now()}`,
        method: "tasks/send",
        params: {
          sessionId: `session-${Date.now()}`,
          message: {
            role: "user",
            parts: [{ type: "text", text: prompt }],
          },
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = res.headers.get("content-type") || "";
    let data;

    if (contentType.includes("application/json")) {
      data = await res.json().catch(() => ({}));
    } else {
      const text = await res.text().catch(() => "");
      data = text ? { message: text } : {};
    }

    return {
      ok: res.ok,
      status: res.status,
      data,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      return {
        ok: false,
        status: 408,
        data: { error: `Public agent timeout after ${AGENT_TIMEOUT / 1000}s` },
        timeout: true,
      };
    }
    throw error;
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token") || "";

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    let decoded;
    try {
      decoded = decodeToken(token);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const fullName = (decoded.fullName || decoded.name || "").trim();
    const email = (decoded.email || "").trim();
    const phone = (decoded.phone || decoded.phoneNumber || "").trim();

    if (!fullName && !email && !phone) {
      return NextResponse.json(
        { error: "Token missing user identifiers" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt({ fullName, email, phone });
    const upstream = await callPublicAgent(prompt);

    return NextResponse.json(
      {
        user: { fullName, email, phone },
        prompt,
        upstreamUrl: PUBLIC_AGENT_URL,
        upstreamStatus: upstream.status,
        data: upstream.data,
        fetchedAt: new Date().toISOString(),
        token,
      },
      { status: upstream.ok ? 200 : upstream.status || 500 }
    );
  } catch (error) {
    console.error("Error in /api/pda/public:", error);
    return NextResponse.json(
      { error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
