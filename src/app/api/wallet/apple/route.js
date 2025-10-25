import { NextResponse } from 'next/server';
import { generateAppleWalletPass } from '../../../../lib/passkit/generator';

/**
 * POST /api/wallet/apple
 * Generate and return an Apple Wallet pass
 * 
 * Request body:
 * {
 *   "fullName": "John Doe",
 *   "handle": "johndoe",  // optional
 *   "uid": "user123"       // optional
 * }
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { fullName, handle, uid } = body;

    // Validate required fields
    if (!fullName || fullName.trim() === '') {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      );
    }

    console.log('Generating Apple Wallet pass for:', fullName);

    // Generate the pass
    const passData = await generateAppleWalletPass({
      fullName: fullName.trim(),
      handle: handle?.trim(),
      uid: uid?.trim()
    });

    const { passBuffer, serialNumber, qrToken, verifyUrl } = passData;

    // TODO: Save pass metadata to Firestore
    // await savePassToFirestore({
    //   serialNumber,
    //   qrToken,
    //   fullName,
    //   handle,
    //   uid,
    //   issuedAt: new Date().toISOString(),
    //   status: 'active'
    // });

    console.log('✓ Pass generated:', serialNumber);
    console.log('✓ Verify URL:', verifyUrl);

    // Return the pass with correct headers
    return new NextResponse(passBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename="hushh-${serialNumber}.pkpass"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('Error in Apple Wallet API:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate Apple Wallet pass',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/wallet/apple
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Apple Wallet Pass Generator',
    version: '1.0.0'
  });
}

