/* eslint-env node */
/* global process */
import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// This route generates a basic Apple Wallet pass (.pkpass) with the user's name and Hushh ID.
// Certificates are loaded from env or mocked in development. Replace with real certs for prod.

export async function GET(request) {
  try {
    const { PKPass } = await import("passkit-generator");
    const { searchParams } = new URL(request.url);
    const hushhId = searchParams.get("hushh_id") || "";
    const name = searchParams.get("name") || "Hushh User";

    if (!hushhId) {
      return NextResponse.json({ error: "Missing hushh_id" }, { status: 400 });
    }

    // Required Apple Wallet certs and IDs
    const WWDR_CERT = process.env.APPLE_WWDR_CERT_BASE64;
    const SIGNING_CERT = process.env.APPLE_PASS_CERT_P12_BASE64;
    const SIGNING_PASSWORD = process.env.APPLE_PASS_CERT_PASSWORD;
    const PASS_TEAM_ID = process.env.APPLE_TEAM_ID || "TEAMID";
    const PASS_ORG_NAME = process.env.APPLE_ORG_NAME || "Hushh";
    const PASS_ID = process.env.APPLE_PASS_TYPE_IDENTIFIER || "pass.hushh.id";

    if (!WWDR_CERT || !SIGNING_CERT || !SIGNING_PASSWORD) {
      return NextResponse.json({
        error: "Apple Wallet certificates are not configured",
        hint: "Set APPLE_WWDR_CERT_BASE64, APPLE_PASS_CERT_P12_BASE64, APPLE_PASS_CERT_PASSWORD",
      }, { status: 500 });
    }

    const wwdr = Buffer.from(WWDR_CERT, "base64");
    const signerCert = Buffer.from(SIGNING_CERT, "base64");

    const pass = await PKPass.from({
      model: {
        description: "Hushh ID Card",
        organizationName: PASS_ORG_NAME,
        passTypeIdentifier: PASS_ID,
        teamIdentifier: PASS_TEAM_ID,
        serialNumber: hushhId,
        formatVersion: 1,
        logoText: "Hushh",
        foregroundColor: "#ffffff",
        backgroundColor: "#1B4CAD",
        labelColor: "#ffffff",
        generic: {
          headerFields: [
            { key: "title", label: "Hushh ID", value: hushhId }
          ],
          primaryFields: [
            { key: "name", label: "Name", value: name }
          ],
          auxiliaryFields: [],
          secondaryFields: [],
          backFields: [
            { key: "privacy", label: "Private by Design", value: "Hushh" }
          ],
          barcode: {
            message: hushhId,
            format: "PKBarcodeFormatQR",
            messageEncoding: "iso-8859-1",
          },
        },
      },
      certificates: {
        wwdr,
        signerCert,
        signerKey: signerCert,
        signerKeyPassphrase: SIGNING_PASSWORD,
      },
    });

    const stream = await pass.asBuffer();

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename=hushh-${hushhId}.pkpass`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Wallet pass error:", err);
    return NextResponse.json({ error: "Failed to generate pass" }, { status: 500 });
  }
}


