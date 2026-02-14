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

## Files

- `index.html` - Main HTML page with UI structure
- `verify.js` - Unobfuscated JavaScript source code
- `verify.min.js` - Obfuscated and minified production code

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

## Security Notice

This is a demonstration of web security techniques and browser fingerprinting. Use responsibly and in accordance with applicable laws and regulations.

## License

Educational and research purposes only.