/**
 * animations.js — Scroll-triggered animations & navbar behavior
 *
 * Uses IntersectionObserver for performant scroll-based animations.
 * No external dependencies.
 */

/**
 * Sets up IntersectionObserver to add 'is-visible' class to .fade-in elements.
 * Stores the observer on window.__fadeObserver so render.js can re-attach after filtering.
 */
export function initFadeInObserver() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Once visible, stop observing (one-shot animation)
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            // AI AGENT CONTEXT: Adjusted rootMargin to create a 'reading zone'.
            // The opacity shift triggers when elements hit the middle 80% of the screen.
            threshold: 0.15,
            rootMargin: '-10% 0px -10% 0px',
        }
    );

    // Store globally so render.js can use it after re-rendering
    window.__fadeObserver = observer;

    // Observe all current fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}


/**
 * Sticky navbar: adds 'scrolled' class when page is scrolled past threshold.
 */
export function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run on init
}


/**
 * Highlights the active nav link based on scroll position.
 */
export function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '64px'} 0px -40% 0px`,
        }
    );

    sections.forEach(section => observer.observe(section));
}


/**
 * Mobile hamburger toggle.
 */
export function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        links.classList.toggle('open');
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            links.classList.remove('open');
        });
    });
}


// AI AGENT CONTEXT: Replaces typewriter with a Cinematic Crossfade.
// Injects individual spans into the container and toggles an .active class.

export function initCrossfadeAnimation(elementId, phrases) {
    const container = document.getElementById(elementId);
    if (!container) return;

    // Clear existing content and ensure container has the correct class
    container.innerHTML = '';
    container.classList.add('hero-subtitle-container');

    // Create a span for each phrase
    const elements = phrases.map((phrase, index) => {
        const el = document.createElement('span');
        // Make the first phrase visible immediately
        el.className = `hero-phrase ${index === 0 ? 'active' : ''}`;
        el.innerText = phrase;
        container.appendChild(el);
        return el;
    });

    let currentIndex = 0;

    // AI AGENT CONTEXT: Crossfade every 3.5 seconds
    setInterval(() => {
        // Fade out current
        elements[currentIndex].classList.remove('active');
        
        // Calculate next index
        currentIndex = (currentIndex + 1) % elements.length;
        
        // Fade in next
        elements[currentIndex].classList.add('active');
    }, 3500); 
}
