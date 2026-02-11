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
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px',
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


/**
 * Simple typing animation for the hero subtitle.
 * @param {string} elementId - ID of the element to type into
 * @param {string[]} phrases - Array of phrases to cycle through
 * @param {number} typeSpeed - ms per character
 * @param {number} deleteSpeed - ms per character when deleting
 * @param {number} pauseDuration - ms to pause at end of phrase
 */
export function initTypingAnimation(elementId, phrases, typeSpeed = 60, deleteSpeed = 30, pauseDuration = 2000) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            el.textContent = currentPhrase.substring(0, charIndex);
        } else {
            charIndex++;
            el.textContent = currentPhrase.substring(0, charIndex);
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        // Finished typing the phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = pauseDuration;
            isDeleting = true;
        }

        // Finished deleting the phrase
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400; // Short pause before typing next
        }

        setTimeout(tick, delay);
    }

    tick();
}
