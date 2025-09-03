import https from "node:https";
import { Buffer } from "node:buffer";

function getWithBody(urlString, jsonBody, headers = {}) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(urlString);
      const bodyStr = JSON.stringify(jsonBody);
      const options = {
        method: "GET",
        hostname: url.hostname,
        path: url.pathname + (url.search || ""),
        protocol: url.protocol,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Content-Length": Buffer.byteLength(bodyStr),
          ...headers,
        },
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode || 200,
            headers: res.headers,
            body: data,
          });
        });
      });
      req.on("error", reject);
      req.write(bodyStr);
      req.end();
    } catch (e) {
      reject(e);
    }
  });
}

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const upstream = await getWithBody(
      "https://hushh-techh.onrender.com/api/hushh/user-details",
      { email }
    );

    return new Response(upstream.body, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Proxy failed", error: String(error) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  if (!email) {
    return new Response(
      JSON.stringify({ success: false, message: "Email is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  return POST(new Request(request.url, { method: "POST", body: JSON.stringify({ email }) }));
}


