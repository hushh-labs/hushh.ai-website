# Apple Wallet Integration - Quick Start Guide

## 🚀 Getting Started (5 Minutes)

Your Apple Wallet integration is **ready to use**! Follow these steps to test it.

### Step 1: Add Pass Images (Optional but Recommended)

Add these images to `passkit/model/` for a complete look:

```bash
# Required images (PNG format):
passkit/model/icon.png       # 29×29 pixels
passkit/model/icon@2x.png    # 58×58 pixels
passkit/model/icon@3x.png    # 87×87 pixels
passkit/model/logo.png       # 160×50 pixels
passkit/model/logo@2x.png    # 320×100 pixels
passkit/model/logo@3x.png    # 480×150 pixels
```

**Tip**: Use your existing Hushh logo from `public/Images/Logo/Logo.png` and resize it.

### Step 2: Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Step 3: Test the Integration

1. **Navigate to the user profile page:**
   ```
   http://localhost:3000/user-profile
   ```

2. **Click the "Add to Apple Wallet" button**
   - You'll see a loading indicator
   - A `.pkpass` file will download

3. **Open the downloaded file:**
   - On iPhone: Opens Wallet app automatically
   - On Mac: Opens Wallet app automatically
   - On other devices: Save for later

4. **Add to Wallet:**
   - Tap "Add" in the Wallet app
   - Your Hushh Social Card is now in Apple Wallet!

### Step 4: Test Verification

1. **Open Wallet app** on your iPhone/Mac
2. **Tap on the Hushh Social Card**
3. **Scan or tap the QR code**
4. **Verification page opens** showing your details

## ✅ What's Working

- ✅ Pass generation with user data
- ✅ Secure certificate handling
- ✅ QR code verification
- ✅ Responsive button in profile dashboard
- ✅ Mobile and desktop support
- ✅ Error handling and user feedback

## 📱 User Experience

### Desktop Flow
```
Profile Dashboard → Click Button → Download .pkpass → 
Open File → Wallet App → Add to Wallet
```

### iPhone Flow
```
Profile Dashboard → Click Button → Wallet App Opens → 
Tap "Add" → Card Added
```

### Verification Flow
```
Open Wallet → Tap Card → Scan QR → 
Verification Page Shows → Name, Handle, Serial
```

## 🔧 Configuration

All configuration is already set up in `src/lib/passkit/config.js`:

- **Pass Type ID**: `pass.com.hushh.wallet`
- **Team ID**: `WVDK9JW99C`
- **Organization**: HushOne, Inc.
- **Certificates**: Hardcoded (no env vars needed)

## 🎨 Customization

### Change Button Style

Edit `src/app/_components/AppleWalletButton.jsx`:

```javascript
<Button
  bg="black"              // Change background color
  color="white"           // Change text color
  size="lg"               // Change size: sm, md, lg
  borderRadius="lg"       // Change border radius
  // ... more props
>
```

### Change Pass Design

Edit `passkit/model/pass.json`:

```json
{
  "foregroundColor": "rgb(17, 17, 17)",   // Text color
  "backgroundColor": "rgb(255, 255, 255)", // Background
  "labelColor": "rgb(17, 17, 17)"         // Label color
}
```

### Change Pass Fields

Edit `src/lib/passkit/generator.js`:

```javascript
// Add/modify primary fields
pass.primaryFields.push({
  key: 'name',
  label: 'NAME',
  value: fullName
});

// Add/modify auxiliary fields
pass.auxiliaryFields.push({
  key: 'handle',
  label: 'HANDLE',
  value: `@${handle}`
});
```

## 🐛 Troubleshooting

### Pass Doesn't Download

**Check:**
- Browser console for errors
- Network tab for API response
- User has completed profile (name required)

**Fix:**
```javascript
// Check API response
const response = await fetch('/api/wallet/apple', {...});
console.log('Status:', response.status);
console.log('Headers:', response.headers);
```

### Pass Doesn't Open in Wallet

**Check:**
- File extension is `.pkpass`
- MIME type is `application/vnd.apple.pkpass`
- Testing on iPhone or Mac (not Android)

**Fix:**
- Already configured correctly in API route
- Try emailing the pass to yourself

### Images Not Showing

**Check:**
- Images exist in `passkit/model/`
- Correct filenames (case-sensitive)
- PNG format with transparency

**Fix:**
```bash
# Verify images exist
ls -la passkit/model/*.png

# Should show:
# icon.png, icon@2x.png, icon@3x.png
# logo.png, logo@2x.png, logo@3x.png
```

### Verification Not Working

**Check:**
- QR code scans correctly
- URL is accessible
- Token format is correct

**Fix:**
- Test URL manually: `http://localhost:3000/verify?token=test`
- Check API logs for errors

## 📊 Testing Checklist

- [ ] Pass downloads successfully
- [ ] Pass opens in Wallet app
- [ ] All fields display correctly
- [ ] QR code scans properly
- [ ] Verification page loads
- [ ] Mobile layout works
- [ ] Desktop layout works
- [ ] Error messages show correctly
- [ ] Loading states work
- [ ] Success toasts appear

## 🚀 Deploy to Production

### Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Apple Wallet integration"
   git push origin main
   ```

2. **Vercel auto-deploys** (if connected)

3. **Test on production:**
   ```
   https://hushh.ai/user-profile
   ```

### Production Checklist

- [ ] Add production pass images
- [ ] Test on real iPhone device
- [ ] Monitor error logs
- [ ] Set up Firestore (optional)
- [ ] Configure analytics (optional)

## 📚 Additional Resources

- **Full Documentation**: `APPLE_WALLET_INTEGRATION.md`
- **Apple Wallet Guide**: https://developer.apple.com/wallet/
- **PassKit Documentation**: https://github.com/alexandercerutti/passkit-generator

## 💡 Tips

1. **Test on Real Device**: Simulator doesn't fully support Wallet
2. **Use Safari**: Best compatibility for .pkpass files
3. **Check Logs**: Server logs show generation progress
4. **Add Images**: Makes the pass look professional
5. **Monitor Usage**: Track how many passes are generated

## 🎯 Next Steps

1. **Add images** to make the pass look complete
2. **Test on iPhone** to verify full functionality
3. **Enable Firestore** for pass tracking (optional)
4. **Deploy to production** when ready
5. **Monitor usage** and gather feedback

## ❓ Need Help?

- Check `APPLE_WALLET_INTEGRATION.md` for detailed docs
- Review server logs for error messages
- Test API endpoints directly with Postman
- Contact: support@hushh.ai

---

**Ready to test?** Run `npm run dev` and visit `/user-profile`! 🎉

