/**
 * main.js — Application Entry Point
 *
 * Wires up all modules: rendering, filtering, animations, and modal logic.
 * This is the only file imported by index.html.
 */

import { renderGrid, buildLinksHTML } from './modules/render.js';
import { PROJECTS } from './data/projects.js';
import {
    initFadeInObserver,
    initNavbarScroll,
    initActiveNavHighlight,
    initMobileNav,
    initTypingAnimation,
} from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {

    // ── MODAL LOGIC ─────────────────────────────────────────
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDesc = document.getElementById('modal-description');
    const modalTags = document.getElementById('modal-tags');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalImageContainer = document.getElementById('modal-image-container');
    const modalLinks = document.getElementById('modal-links');

    const openModal = (projectId) => {
        const project = PROJECTS.find(p => p.id === projectId);
        if (!project) return;

        // Populate Text
        modalTitle.textContent = project.title;
        modalSubtitle.textContent = project.subtitle || project.category;
        modalDesc.textContent = project.description;

        // Populate Tags
        modalTags.innerHTML = project.techStack
            .map(t => `<span class="project-tag">${t}</span>`)
            .join('');

        // Populate Highlights
        if (project.highlights && project.highlights.length > 0) {
            modalHighlights.style.display = 'block';
            modalHighlights.innerHTML = project.highlights
                .map(h => `<li>${h}</li>`) // Icons handled by CSS list-style or manual SVG? Let's use simple bullets for now
                .join('');
            document.querySelector('.modal-highlights-title').style.display = 'block';
        } else {
            modalHighlights.style.display = 'none';
            document.querySelector('.modal-highlights-title').style.display = 'none';
        }

        // Populate Media (Priority: YouTube > Video > Image)
        modalImageContainer.innerHTML = '';
        if (project.youtubeId) {
            modalImageContainer.innerHTML = `
                <div class="modal-video-container">
                    <iframe 
                        src="https://www.youtube.com/embed/${project.youtubeId}?autoplay=1" 
                        title="${project.title} Video Presentation"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen
                        loading="lazy"
                        class="modal-video">
                    </iframe>
                </div>
            `;
        } else if (project.video) {
            // Autoplay video in modal
            modalImageContainer.innerHTML = `
                <video src="${project.video}" controls autoplay loop playsinline class="modal-video"></video>
            `;
            const v = modalImageContainer.querySelector('video');
            if (v) v.playbackRate = 0.70;
        } else if (project.image) {
            modalImageContainer.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="modal-image">
            `;
        } else {
            modalImageContainer.innerHTML = `<div class="modal-placeholder" style="height: 200px; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">No Preview Available</div>`;
        }

        // Populate Links
        modalLinks.innerHTML = buildLinksHTML(project.links);

        // Show Modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        // Stop media playback (YouTube, Video) by clearing container
        modalImageContainer.innerHTML = '';
    };

    // Close on overlay click or close button
    modal.addEventListener('click', (e) => {
        if (e.target.closest('[data-close]') || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ── CARD INTERACTIONS (Hover + Click) ───────────────────
    const attachCardInteractions = () => {
        document.querySelectorAll('.project-card').forEach(card => {
            const video = card.querySelector('video');
            const projectId = card.dataset.projectId;

            // 1. Hover Video Preview (Card)
            if (video) {
                video.muted = true; // Required for autoplay
                video.playbackRate = 1.0; // Normal Speed

                let playPromise;

                card.addEventListener('mouseenter', () => {
                    playPromise = video.play();

                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log('Autoplay prevented:', error);
                        });
                    }
                });

                card.addEventListener('mouseleave', () => {
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            video.pause();
                            video.currentTime = 0;
                        }).catch(() => {
                            // Video might not have started yet, ensuring pause
                            video.pause();
                            video.currentTime = 0;
                        });
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            }

            // 2. Click to Open Modal
            card.addEventListener('click', (e) => {
                // Ignore clicks on links inside the card (Source/Demo buttons)
                if (e.target.closest('a')) return;

                openModal(projectId);
            });

            // Add cursor pointer to indicate clickable
            card.style.cursor = 'pointer';
        });
    };

    // ── INITIALIZATION ──────────────────────────────────────

    // 1. Render Grid
    renderGrid('all');
    attachCardInteractions();

    // 2. Animations
    initFadeInObserver();
    initNavbarScroll();
    initActiveNavHighlight();
    initMobileNav();
    initTypingAnimation('hero-typed', [
        'I build things that are genuinely useful.',
        'Full-Stack Developer & Data Enthusiast.',
        'Turning ideas into real products.',
    ]);

    // 3. Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Prevent clicks during transition
            if (btn.classList.contains('disabled')) return;

            // UI Toggle
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.classList.add('disabled'); // Lock all buttons
                b.style.pointerEvents = 'none'; // Extra safety
            });
            btn.classList.add('active');

            const category = btn.dataset.category;

            // Wait for Cinematic Render
            await renderGrid(category);

            // Re-attach listeners to new cards
            attachCardInteractions();

            // Unlock buttons
            filterButtons.forEach(b => {
                b.classList.remove('disabled');
                b.style.pointerEvents = '';
            });
        });
    });

    // 4. Hero Carousel
    const initHeroCarousel = () => {
        const carousel = document.getElementById('hero-carousel');
        if (!carousel) return;

        // Configuration
        const cardWidth = 260; // Must match CSS width
        const gap = 20; // Space between cards replacement

        // Take top 5 projects for performance
        const carouselProjects = PROJECTS.slice(0, 5);
        const count = carouselProjects.length;

        // Calculate Radius (Z-Translation)
        const theta = 360 / count;
        // radius = (width / 2) / tan( half_theta )
        const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / count)) + gap;

        carouselProjects.forEach((project, i) => {
            const card = document.createElement('div');
            card.className = 'carousel-card';

            // Calculate rotation
            const angle = theta * i;
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

            // Interaction: Click to open modal
            card.addEventListener('click', () => openModal(project.id));

            // Populate Content
            if (project.video) {
                const vid = document.createElement('video');
                vid.src = project.video;
                vid.muted = true;
                vid.loop = true;
                vid.autoplay = true;
                vid.playsInline = true;
                card.appendChild(vid);
            } else if (project.image) {
                const img = document.createElement('img');
                img.src = project.image;
                card.appendChild(img);
            } else {
                // Fallback text
                card.textContent = project.title;
                card.style.color = 'var(--text-secondary)';
                card.style.fontFamily = 'monospace';
                card.style.padding = '1rem';
                card.style.textAlign = 'center';
            }

            carousel.appendChild(card);
        });
    };

    initHeroCarousel();

});
