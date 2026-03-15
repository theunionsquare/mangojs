/* ========================================
   MangoJS Website - JavaScript
   Interactive effects and animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCursorGlow();
    initParticles();
    initNavbar();
    initTypingEffect();
    initCodeTabs();
    initScrollAnimations();
    initCopyButtons();
});

/* ===== Cursor Glow Effect ===== */
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        
        currentX += dx * 0.1;
        currentY += dy * 0.1;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

/* ===== Floating Particles ===== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    const opacity = Math.random() * 0.3 + 0.1;
    
    // Random color from mango palette
    const colors = ['#ff6b35', '#ffa500', '#ffb347', '#ffe4c4'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: ${color};
        opacity: ${opacity};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;
    
    container.appendChild(particle);
}

/* ===== Navigation ===== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/* ===== Typing Effect ===== */
function initTypingEffect() {
    const promptText = document.querySelector('.prompt-text');
    const outputLines = document.getElementById('output-lines');
    
    if (!promptText || !outputLines) return;
    
    const prompts = [
        {
            text: "Create a user authentication service with JWT tokens",
            outputs: [
                { text: "✓ Analyzing requirements...", type: "info", delay: 500 },
                { text: "✓ Generating User entity with secure fields", type: "success", delay: 800 },
                { text: "✓ Creating AuthService with JWT handling", type: "success", delay: 600 },
                { text: "✓ Building AuthController with routes", type: "success", delay: 600 },
                { text: "→ POST /api/v1/auth/login", type: "highlight", delay: 400 },
                { text: "→ POST /api/v1/auth/register", type: "highlight", delay: 400 },
                { text: "→ POST /api/v1/auth/refresh", type: "highlight", delay: 400 },
                { text: "✓ Service ready! Run 'npm start' to launch", type: "success", delay: 800 }
            ]
        },
        {
            text: "Add a product catalog with categories and search",
            outputs: [
                { text: "✓ Analyzing requirements...", type: "info", delay: 500 },
                { text: "✓ Generating Product & Category entities", type: "success", delay: 700 },
                { text: "✓ Creating relationships and indexes", type: "success", delay: 600 },
                { text: "✓ Building ProductService with filters", type: "success", delay: 600 },
                { text: "→ GET /api/v1/products?search=...", type: "highlight", delay: 400 },
                { text: "→ GET /api/v1/categories/:id/products", type: "highlight", delay: 400 },
                { text: "✓ Elasticsearch integration added", type: "success", delay: 600 },
                { text: "✓ Catalog ready with full-text search!", type: "success", delay: 800 }
            ]
        },
        {
            text: "Set up a real-time notification system with queues",
            outputs: [
                { text: "✓ Analyzing requirements...", type: "info", delay: 500 },
                { text: "✓ Configuring BullMQ notification queue", type: "success", delay: 700 },
                { text: "✓ Creating NotificationWorker", type: "success", delay: 600 },
                { text: "✓ Adding WebSocket support", type: "success", delay: 600 },
                { text: "→ Queue: notifications (concurrency: 10)", type: "highlight", delay: 400 },
                { text: "→ WS: /ws/notifications", type: "highlight", delay: 400 },
                { text: "✓ Redis connection configured", type: "success", delay: 600 },
                { text: "✓ Real-time notifications ready!", type: "success", delay: 800 }
            ]
        }
    ];
    
    let currentPromptIndex = 0;
    
    async function typePrompt(prompt) {
        // Clear previous output
        outputLines.innerHTML = '';
        promptText.textContent = '';
        
        // Type the prompt
        for (let i = 0; i < prompt.text.length; i++) {
            promptText.textContent += prompt.text[i];
            await sleep(30 + Math.random() * 50);
        }
        
        await sleep(800);
        
        // Show outputs one by one
        for (const output of prompt.outputs) {
            await sleep(output.delay);
            const line = document.createElement('div');
            line.className = `output-line ${output.type}`;
            line.textContent = output.text;
            outputLines.appendChild(line);
        }
        
        // Wait before next prompt
        await sleep(4000);
        
        // Move to next prompt
        currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
        typePrompt(prompts[currentPromptIndex]);
    }
    
    // Start typing
    setTimeout(() => {
        typePrompt(prompts[0]);
    }, 1000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ===== Code Tabs ===== */
function initCodeTabs() {
    const tabs = document.querySelectorAll('.code-tab');
    const panels = document.querySelectorAll('.code-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update panels
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `panel-${targetTab}`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Stagger animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

/* ===== Copy Buttons ===== */
function initCopyButtons() {
    window.copyCode = function(button) {
        const codeBlock = button.closest('.code-block');
        const code = codeBlock.querySelector('code').textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            // Visual feedback
            const originalColor = button.style.color;
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            `;
            button.style.color = '#10b981';
            
            setTimeout(() => {
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                `;
                button.style.color = originalColor;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };
}

/* ===== Parallax Effect on Hero ===== */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrolled = window.scrollY;
    const heroWrapper = hero.querySelector('.hero-wrapper');
    
    if (scrolled < window.innerHeight && heroWrapper) {
        heroWrapper.style.transform = `translateY(${scrolled * 0.2}px)`;
        heroWrapper.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});

/* ===== Magnetic Buttons Effect ===== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

/* ===== Feature Cards Hover Effect ===== */
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/* ===== Architecture Layers Animation ===== */
const archLayers = document.querySelectorAll('.arch-layer');
archLayers.forEach((layer, index) => {
    layer.addEventListener('mouseenter', () => {
        archLayers.forEach((l, i) => {
            if (i < index) {
                l.style.opacity = '0.5';
            }
        });
    });
    
    layer.addEventListener('mouseleave', () => {
        archLayers.forEach(l => {
            l.style.opacity = '1';
        });
    });
});

/* ===== Console Easter Egg ===== */
console.log(`
%c🥭 MangoJS %c- The AI-First Backend Framework

%cBuilt with ❤️ for developers who love clean code.

GitHub: https://github.com/mangojs/mangojs
`, 
'color: #ff6b35; font-size: 24px; font-weight: bold;',
'color: #ffa500; font-size: 18px;',
'color: #a0a0b0; font-size: 12px;'
);

/* ===== Service Worker Registration (for PWA) ===== */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js');
    });
}

/* ===== Performance Optimization ===== */
// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
    
    // Disable cursor glow
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) cursorGlow.style.display = 'none';
    
    // Disable particles
    const particles = document.getElementById('particles');
    if (particles) particles.style.display = 'none';
}
