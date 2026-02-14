# Testing Guide

This document provides testing procedures to verify all features work correctly.

## Pre-Test Checklist

- [ ] Using a desktop browser (Chrome, Firefox, Edge, Safari)
- [ ] JavaScript is enabled
- [ ] Screen width > 768px
- [ ] Not using mobile device or emulator
- [ ] Developer tools are closed

## Test 1: Mobile Detection

**Objective**: Verify mobile devices are blocked

**Steps**:
1. Open `index.html` on a mobile device OR
2. Resize browser window to < 768px wide OR
3. Open browser DevTools and enable mobile device emulation

**Expected Result**:
- Mobile block screen appears immediately
- Message: "Desktop Access Required"
- Cannot proceed to verification

**Pass Criteria**: ✅ Mobile block displays correctly

---

## Test 2: Basic Verification Flow

**Objective**: Complete normal verification as a human user

**Steps**:
1. Open `index.html` in desktop browser
2. Wait 2-3 seconds
3. Move mouse around naturally (make 5-10 movements)
4. Click the "Verify you are human" checkbox
5. Wait for verification to complete

**Expected Result**:
- Checkbox shows loading spinner (orange)
- After 2-4 seconds, shows green checkmark
- Windows Run prompt appears

**Pass Criteria**: ✅ Verification succeeds with score ≥ 100

---

## Test 3: Windows Run Prompt

**Objective**: Verify Windows Run dialog functionality

**Steps**:
1. Complete Test 2 successfully
2. Windows Run prompt should appear
3. Try typing in the input field
4. Press Enter or click "OK"
5. Click "Cancel" or X button

**Expected Result**:
- Prompt has Windows 10/11 styling
- Input field is functional
- Keyboard shortcuts work (Enter = OK, Esc = Cancel)
- Close button (X) works
- Overlay appears behind prompt

**Pass Criteria**: ✅ All Windows Run interactions work

---

## Test 4: Bot Detection (Too Fast)

**Objective**: Verify timing-based bot detection

**Steps**:
1. Open `index.html`
2. **Immediately** click verification checkbox (< 500ms after page load)
3. Wait for result

**Expected Result**:
- Verification may fail or reload
- Score is reduced by 50 points
- May not reach required 100 points

**Pass Criteria**: ✅ Fast clicks are penalized

---

## Test 5: Mouse Movement Tracking

**Objective**: Verify mouse tracking awards points

**Steps**:
1. Open `index.html`
2. Open browser console (F12)
3. Move mouse naturally around page (6+ movements)
4. Click verification checkbox
5. Check console for "Bot Score" log

**Expected Result**:
- Console shows: "Bot Score: XXX / Required: 100"
- Score should be > 100 if mouse moved naturally
- Score includes +15 for mouse movements

**Pass Criteria**: ✅ Score increases with mouse activity

---

## Test 6: Fingerprinting

**Objective**: Verify device fingerprinting works

**Steps**:
1. Open `index.html`
2. Open browser console
3. Type: `SecuritySystem` or check Network tab
4. Look for canvas/WebGL operations

**Expected Result**:
- Canvas fingerprint created
- WebGL vendor/renderer detected
- Fonts detected
- Audio context created
- No errors in console

**Pass Criteria**: ✅ All fingerprinting methods execute

---

## Test 7: Anti-Debug Protection

**Objective**: Verify developer tool detection

**Steps**:
1. Open `index.html`
2. Open browser console (should trigger detection)
3. Check console messages

**Expected Result**:
- May log "Developer tools detected"
- Keyboard shortcuts (F12, Ctrl+Shift+I) are blocked
- Context menu (right-click) is disabled

**Pass Criteria**: ✅ Debug protections active

---

## Test 8: Headless Browser Detection

**Objective**: Verify automation detection

**Steps**:
1. Use Selenium/Puppeteer to load page
2. Try to complete verification

**Expected Result**:
- `navigator.webdriver` detected
- Verification likely fails
- Score reduced or auto-reject

**Pass Criteria**: ✅ Automation frameworks detected

---

## Test 9: Multiple Browser Test

**Objective**: Verify cross-browser compatibility

**Browsers to Test**:
- [ ] Google Chrome
- [ ] Mozilla Firefox  
- [ ] Microsoft Edge
- [ ] Safari (macOS)
- [ ] Opera

**Expected Result**:
- Works identically in all browsers
- Fingerprints are different per browser
- All features functional

**Pass Criteria**: ✅ Works in all major browsers

---

## Test 10: Demo Page

**Objective**: Verify demo page displays correctly

**Steps**:
1. Open `demo.html`
2. Scroll through all sections
3. Click "Launch Demo" button

**Expected Result**:
- All feature cards display
- Styling is attractive
- Button links to `index.html`
- Information is clear and accurate

**Pass Criteria**: ✅ Demo page is professional and functional

---

## Debugging Tips

### Verification Always Fails

**Check**:
1. Open console and look for "Bot Score: X / Required: 100"
2. If score is low, you may need to:
   - Move mouse more before clicking
   - Wait longer (1-3 seconds)
   - Ensure browser supports all APIs

**Fix**: Lower `requiredScore` in `verify.js` to 50-80 for testing

### Windows Prompt Doesn't Appear

**Check**:
1. Verification must succeed first (score ≥ 100)
2. Check console for JavaScript errors
3. Ensure overlay and prompt elements exist in DOM

**Fix**: Verify checkbox shows green checkmark before prompt should appear

### Mobile Block on Desktop

**Check**:
1. Browser window width > 768px
2. Not using touch screen only
3. User agent is desktop

**Fix**: Disable mobile detection temporarily in `verify.js`

### Fingerprinting Errors

**Check**:
1. Browser supports Canvas API
2. Browser supports WebGL
3. No browser extensions blocking fingerprinting

**Fix**: Try different browser or disable privacy extensions

---

## Expected Console Output

Normal successful verification should log:

```
Bot Score: 105 / Required: 100
Executing: cmd
```

Failed verification might show:

```
Bot Score: 45 / Required: 100
Developer tools detected
Automation detected
```

---

## Performance Benchmarks

**Page Load**: < 100ms  
**Fingerprint Generation**: 100-200ms  
**Verification Duration**: 2-4 seconds (intentional)  
**Total Time to Windows Prompt**: 3-7 seconds

---

## Test Results Template

```
Date: ___________
Browser: ___________
Version: ___________

✅ Test 1: Mobile Detection         [ PASS / FAIL ]
✅ Test 2: Basic Verification       [ PASS / FAIL ]
✅ Test 3: Windows Run Prompt       [ PASS / FAIL ]
✅ Test 4: Bot Detection            [ PASS / FAIL ]
✅ Test 5: Mouse Tracking           [ PASS / FAIL ]
✅ Test 6: Fingerprinting           [ PASS / FAIL ]
✅ Test 7: Anti-Debug               [ PASS / FAIL ]
✅ Test 8: Headless Detection       [ PASS / FAIL ]
✅ Test 9: Cross-Browser            [ PASS / FAIL ]
✅ Test 10: Demo Page               [ PASS / FAIL ]

Notes:
_________________________________
_________________________________
```

---

## Automated Testing

For automated testing with Puppeteer/Selenium (intentionally difficult):

```javascript
// This will likely FAIL due to anti-bot measures
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8000/index.html');
    
    // Will be detected as automation
    await page.click('#checkboxContainer');
    
    // Expected: Verification fails
    await browser.close();
})();
```

**Expected**: Automation should be detected and verification should fail.

---

## Success Criteria

All tests should PASS for a fully functional implementation:

- ✅ Mobile devices are blocked
- ✅ Desktop verification works smoothly
- ✅ Bot detection identifies automated access
- ✅ Mouse tracking awards appropriate points
- ✅ Fingerprinting completes without errors
- ✅ Windows Run prompt appears after verification
- ✅ All security measures are active
- ✅ Works across all major browsers
- ✅ Demo page is professional

---

## Reporting Issues

If any test fails, check:

1. Browser console for errors
2. Network tab for failed resources
3. Bot score in console logs
4. Browser compatibility

Document:
- Browser name and version
- Operating system
- Test number that failed
- Console errors
- Expected vs actual behavior
