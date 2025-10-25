import { NextResponse } from 'next/server';

/**
 * GET /api/wallet/verify?token=<qrToken>
 * Verify a Hushh Social Card by QR token
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { valid: false, reason: 'missing_token' },
        { status: 400 }
      );
    }

    console.log('Verifying token:', token);

    // TODO: Look up token in Firestore
    // const passData = await getPassByToken(token);
    // 
    // if (!passData) {
    //   return NextResponse.json(
    //     { valid: false, reason: 'not_found' },
    //     { status: 404 }
    //   );
    // }
    //
    // if (passData.status === 'revoked') {
    //   return NextResponse.json(
    //     { valid: false, reason: 'revoked' },
    //     { status: 410 }
    //   );
    // }
    //
    // // Log verification event
    // await logVerification(token);
    //
    // return NextResponse.json({
    //   valid: true,
    //   name: passData.fullName,
    //   handle: passData.handle,
    //   serial: passData.serialNumber,
    //   issuedAt: passData.issuedAt
    // });

    // Temporary response (until Firestore is integrated)
    return NextResponse.json({
      valid: true,
      name: 'Hushh User',
      handle: 'hushh',
      serial: 'HW-TEMP-123',
      issuedAt: new Date().toISOString(),
      message: 'Verification system is being set up. This is a temporary response.'
    });

  } catch (error) {
    console.error('Error verifying pass:', error);
    
    return NextResponse.json(
      { 
        valid: false,
        reason: 'server_error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

