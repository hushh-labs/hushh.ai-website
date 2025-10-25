#!/usr/bin/env node

/**
 * Apple Wallet Integration - Quick Test Script
 * 
 * This script verifies that all required files and configurations are in place.
 * Run: node test-apple-wallet.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🍎 Apple Wallet Integration - System Check\n');
console.log('='.repeat(60));

let allChecks = true;

// Check 1: Required files exist
console.log('\n📁 Checking Required Files...\n');

const requiredFiles = [
  'src/lib/passkit/config.js',
  'src/lib/passkit/generator.js',
  'src/lib/passkit/firestore.js',
  'src/app/api/wallet/apple/route.js',
  'src/app/api/wallet/verify/route.js',
  'src/app/_components/AppleWalletButton.jsx',
  'src/app/verify/page.jsx',
  'passkit/model/pass.json',
  'passkit/certs/signerCert.pem',
  'passkit/certs/signerKey.pem',
  'passkit/certs/wwdr.pem',
];

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allChecks = false;
});

// Check 2: Optional image files
console.log('\n🎨 Checking Optional Image Files...\n');

const imageFiles = [
  'passkit/model/icon.png',
  'passkit/model/icon@2x.png',
  'passkit/model/icon@3x.png',
  'passkit/model/logo.png',
  'passkit/model/logo@2x.png',
  'passkit/model/logo@3x.png',
];

let hasImages = true;
imageFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`${exists ? '✅' : '⚠️ '} ${file} ${!exists ? '(optional)' : ''}`);
  if (!exists) hasImages = false;
});

// Check 3: Certificate validation
console.log('\n🔐 Checking Certificates...\n');

try {
  const signerCert = fs.readFileSync(path.join(__dirname, 'passkit/certs/signerCert.pem'), 'utf8');
  const signerKey = fs.readFileSync(path.join(__dirname, 'passkit/certs/signerKey.pem'), 'utf8');
  const wwdr = fs.readFileSync(path.join(__dirname, 'passkit/certs/wwdr.pem'), 'utf8');

  const certValid = signerCert.includes('-----BEGIN CERTIFICATE-----');
  const keyValid = signerKey.includes('-----BEGIN PRIVATE KEY-----');
  const wwdrValid = wwdr.includes('-----BEGIN CERTIFICATE-----');

  console.log(`${certValid ? '✅' : '❌'} Signer Certificate (PEM format)`);
  console.log(`${keyValid ? '✅' : '❌'} Private Key (PEM format)`);
  console.log(`${wwdrValid ? '✅' : '❌'} WWDR Certificate (PEM format)`);

  if (!certValid || !keyValid || !wwdrValid) allChecks = false;
} catch (error) {
  console.log('❌ Error reading certificates:', error.message);
  allChecks = false;
}

// Check 4: Dependencies
console.log('\n📦 Checking Dependencies...\n');

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  const hasPasskit = packageJson.dependencies && packageJson.dependencies['passkit-generator'];
  
  console.log(`${hasPasskit ? '✅' : '❌'} passkit-generator installed`);
  
  if (!hasPasskit) {
    console.log('   Run: npm install passkit-generator --legacy-peer-deps');
    allChecks = false;
  }
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  allChecks = false;
}

// Check 5: Configuration
console.log('\n⚙️  Checking Configuration...\n');

try {
  const configPath = path.join(__dirname, 'src/lib/passkit/config.js');
  const config = fs.readFileSync(configPath, 'utf8');
  
  const hasPassTypeId = config.includes('pass.com.hushh.wallet');
  const hasTeamId = config.includes('WVDK9JW99C');
  const hasCertBase64 = config.includes('signerCertBase64');
  
  console.log(`${hasPassTypeId ? '✅' : '❌'} Pass Type ID configured`);
  console.log(`${hasTeamId ? '✅' : '❌'} Team ID configured`);
  console.log(`${hasCertBase64 ? '✅' : '❌'} Certificates encoded`);
  
  if (!hasPassTypeId || !hasTeamId || !hasCertBase64) allChecks = false;
} catch (error) {
  console.log('❌ Error reading config:', error.message);
  allChecks = false;
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 Summary\n');

if (allChecks) {
  console.log('✅ All critical checks passed!');
  console.log('✅ Apple Wallet integration is ready to use.');
  
  if (!hasImages) {
    console.log('\n⚠️  Note: Pass images are missing (optional)');
    console.log('   Add icon and logo files to passkit/model/ for a complete look.');
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Visit: http://localhost:3000/user-profile');
  console.log('   3. Click "Add to Apple Wallet"');
  console.log('   4. Test the downloaded .pkpass file');
  
} else {
  console.log('❌ Some checks failed!');
  console.log('   Please review the errors above and fix them.');
  console.log('\n📚 Documentation:');
  console.log('   - Quick Start: APPLE_WALLET_QUICKSTART.md');
  console.log('   - Full Docs: APPLE_WALLET_INTEGRATION.md');
}

console.log('\n' + '='.repeat(60) + '\n');

process.exit(allChecks ? 0 : 1);

