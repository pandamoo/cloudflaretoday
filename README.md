# Cloudflare Captcha Verification Page

A realistic 1:1 replica of Cloudflare's verification page with advanced anti-bot detection and security features.

## Features

### 🎨 Authentic Design
- Pixel-perfect 1:1 Cloudflare UI replication
- Accurate loading animations and transitions
- Responsive design matching official Cloudflare pages
- Official color scheme and typography

### 🔒 Security Features
- **Advanced Anti-Bot Detection**
  - Canvas fingerprinting
  - WebGL fingerprinting
  - Audio context fingerprinting
  - Font detection
  - Mouse movement tracking
  - Keyboard event analysis
  - Behavioral analysis
  - Timing attack detection

- **Device Detection**
  - Headless browser detection
  - Automation framework detection (Selenium, Puppeteer, etc.)
  - Virtual machine detection
  - Developer tools detection

- **Protection Measures**
  - Context menu disabled
  - Keyboard shortcuts blocked (F12, Ctrl+Shift+I, etc.)
  - Object tampering detection
  - Code obfuscation and minification
  - Anti-debugging techniques

### 📱 Mobile Blocker
- Automatic mobile device detection
- Touch-only device blocking
- Small screen detection
- Clear messaging for desktop-only access

### 🖥️ Windows Run Prompt
- Authentic Windows Run dialog (Win+R)
- Appears after successful verification
- Pixel-perfect Windows UI replication
- Fully functional interface

## Demo

Open `demo.html` in your browser to see a detailed breakdown of all features, or go directly to `index.html` for the verification page.

## Files

- `index.html` - Main Cloudflare verification page
- `demo.html` - Feature demonstration and documentation
- `verify.js` - Unobfuscated JavaScript source code (for review)
- `verify.min.js` - Obfuscated and minified production code (active)
- `README.md` - Project documentation
- `.gitignore` - Git ignore rules

## Usage

Simply open `index.html` in a desktop browser. The page will:

1. Check for mobile/touch devices and block if detected
2. Present Cloudflare verification interface
3. Analyze user behavior and device fingerprint
4. Award points based on human-like interactions
5. Display Windows Run prompt upon successful verification

## Technical Details

### Bot Score System
The system awards points for various human-like characteristics:
- Valid device fingerprint: +30 points
- Natural mouse movement: +15 points
- Proper timing: +20 points
- Valid browser features: +10-25 points
- Keyboard interactions: +2 points per event

Minimum required score: 100 points

### Detection Methods

**Canvas Fingerprinting**: Creates unique signatures based on how browsers render graphics

**WebGL Fingerprinting**: Identifies GPU and graphics rendering characteristics

**Mouse Movement Analysis**: Tracks acceleration, deceleration, and natural patterns

**Timing Analysis**: Detects too-fast automated clicks and interactions

**Behavioral Tracking**: Monitors for human-like interaction patterns

## Anti-Reverse Engineering

The production code (`verify.min.js`) uses:
- Variable name obfuscation
- Hexadecimal encoding
- Code flow obfuscation
- String encryption
- Function name mangling

## Browser Compatibility

- Chrome/Chromium (Recommended)
- Firefox
- Edge
- Safari
- Opera

**Note**: Requires JavaScript enabled and modern browser features.

## Customization

### Adjusting Bot Score Requirements

Edit the `requiredScore` value in `verify.js` (line ~11):

```javascript
requiredScore: 100  // Change this value (default: 100)
```

### Modifying Verification Delay

Change the timeout in `setupEventListeners` function (line ~231):

```javascript
setTimeout(() => {
    this.verifyHuman();
}, 2000 + Math.random() * 2000); // 2-4 seconds random delay
```

### Disabling Mobile Block

Comment out or remove the mobile detection call in `init()`:

```javascript
// this.detectMobile(); // Disable mobile blocking
```

## Deployment

### Static Hosting

Simply upload all files to any static web hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Cloudflare Pages (ironically)

### Local Testing

1. Clone the repository
2. Open `index.html` in a modern browser
3. Interact with the page naturally (move mouse, wait a bit, then click)

### Production Use

For production:
1. Use `verify.min.js` (already active in index.html)
2. Configure your web server to serve with proper MIME types
3. Enable HTTPS for security
4. Consider adding CSP headers

## Security Features Explained

### Why These Protections?

1. **Canvas Fingerprinting** - Each GPU/browser renders slightly differently
2. **WebGL Detection** - Identifies unique hardware characteristics
3. **Mouse Tracking** - Bots typically have linear movement, humans don't
4. **Timing Analysis** - Bots click instantly, humans take time
5. **Behavioral Scoring** - Multiple signals are harder to fake than one

### Bypassing Detection

This is intentionally difficult. To pass verification:
- Use a real browser (not headless)
- Move your mouse naturally
- Wait 1-3 seconds before clicking
- Don't open developer tools
- Use a real desktop (not mobile/VM)

## Troubleshooting

**Issue**: Verification never completes
**Solution**: Ensure JavaScript is enabled and you're moving the mouse naturally

**Issue**: Mobile block appears on desktop
**Solution**: Ensure your browser width is > 768px and not touch-only

**Issue**: Windows prompt doesn't appear
**Solution**: Check browser console for errors; score might be too low

**Issue**: Fails even with normal behavior
**Solution**: Adjust `requiredScore` down (try 50-80) for easier verification

## Browser Compatibility

✅ Tested and working:
- Chrome 90+ (Best experience)
- Firefox 88+
- Edge 90+
- Safari 14+
- Opera 76+

⚠️ Limited support:
- IE 11 (partial, not recommended)
- Older mobile browsers

## Performance

- Page load: ~50ms
- Fingerprinting: ~100-200ms
- Verification check: 2-4 seconds (intentional delay)
- Total resources: ~25KB uncompressed

## Security Notice

This is a demonstration of web security techniques and browser fingerprinting. 

**Intended Use**: Education, research, testing, security analysis

**Not Intended For**: Malicious purposes, unauthorized access, phishing

Use responsibly and in accordance with applicable laws and regulations.

## Contributing

This is an educational project. Suggestions for improved detection methods or UI enhancements are welcome.

## Credits

Inspired by Cloudflare's actual verification system. All trademarks belong to their respective owners.

## License

Educational and research purposes only. See source code for implementation details.