import { PKPass } from 'passkit-generator';
import path from 'path';
import crypto from 'crypto';
import { APPLE_WALLET_CONFIG, decodeBase64 } from './config';

/**
 * Generate Apple Wallet Pass
 * @param {Object} userData - User data for the pass
 * @param {string} userData.fullName - User's full name
 * @param {string} userData.handle - User's handle (optional)
 * @param {string} userData.uid - User ID (optional)
 * @returns {Promise<Buffer>} - Pass buffer
 */
export async function generateAppleWalletPass(userData) {
  try {
    const { fullName, handle, uid } = userData;

    // Generate unique identifiers
    const timestamp = Date.now();
    const randomId = crypto.randomBytes(3).toString('hex').toUpperCase();
    const serialNumber = `HW-${timestamp}-${randomId}`;
    const authenticationToken = crypto.randomBytes(32).toString('hex');
    const qrToken = `hw_${crypto.randomBytes(16).toString('hex')}`;

    // Decode certificates from base64
    const signerCert = decodeBase64(APPLE_WALLET_CONFIG.signerCertBase64);
    const signerKey = decodeBase64(APPLE_WALLET_CONFIG.signerKeyBase64);
    const wwdr = decodeBase64(APPLE_WALLET_CONFIG.wwdrCertBase64);

    // Verify PEM format
    if (!signerCert.includes('-----BEGIN CERTIFICATE-----')) {
      throw new Error('Invalid signer certificate PEM format');
    }
    if (!signerKey.includes('-----BEGIN PRIVATE KEY-----')) {
      throw new Error('Invalid signer key PEM format');
    }
    if (!wwdr.includes('-----BEGIN CERTIFICATE-----')) {
      throw new Error('Invalid WWDR certificate PEM format');
    }

    console.log('✓ Certificates decoded and validated');

    // Create pass from model directory
    const modelPath = path.join(process.cwd(), 'passkit', 'model');
    
    const pass = await PKPass.from({
      model: modelPath,
      certificates: {
        wwdr,
        signerCert,
        signerKey,
      },
    });

    console.log('✓ Pass instance created');

    // Set pass identifiers
    pass.serialNumber = serialNumber;
    pass.authenticationToken = authenticationToken;

    // Set pass data
    pass.type = 'generic';
    
    // Primary field - Name
    pass.primaryFields.push({
      key: 'name',
      label: 'NAME',
      value: fullName,
      textAlignment: 'PKTextAlignmentLeft'
    });

    // Auxiliary fields
    if (handle) {
      pass.auxiliaryFields.push({
        key: 'handle',
        label: 'HANDLE',
        value: `@${handle}`,
        textAlignment: 'PKTextAlignmentLeft'
      });
    }

    pass.auxiliaryFields.push({
      key: 'member',
      label: 'MEMBER',
      value: 'Hushh ID',
      textAlignment: 'PKTextAlignmentLeft'
    });

    pass.auxiliaryFields.push({
      key: 'issued',
      label: 'ISSUED',
      value: new Date().toISOString().split('T')[0],
      textAlignment: 'PKTextAlignmentRight'
    });

    // Back fields
    pass.backFields.push({
      key: 'privacy',
      label: 'Privacy',
      value: 'Your Hushh Social Card is private by default. Share only what you choose.'
    });

    pass.backFields.push({
      key: 'support',
      label: 'Support',
      value: 'support@hushh.ai'
    });

    pass.backFields.push({
      key: 'website',
      label: 'Website',
      value: 'https://hushh.ai'
    });

    // Add QR code for verification
    const verifyUrl = `https://hushh.ai/verify?token=${qrToken}`;
    pass.setBarcodes({
      message: verifyUrl,
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1'
    });

    console.log('✓ Pass data configured');

    // Generate the pass buffer
    const passBuffer = pass.getAsBuffer();
    
    console.log('✓ Pass generated successfully');

    return {
      passBuffer,
      serialNumber,
      authenticationToken,
      qrToken,
      verifyUrl
    };

  } catch (error) {
    console.error('Error generating Apple Wallet pass:', error);
    throw new Error(`Failed to generate Apple Wallet pass: ${error.message}`);
  }
}

