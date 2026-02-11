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

        // Populate Media (Video or Image)
        modalImageContainer.innerHTML = '';
        if (project.video) {
            // Autoplay video in modal
            modalImageContainer.innerHTML = `
                <video src="${project.video}" controls autoplay loop playsinline class="modal-video"></video>
            `;
            const v = modalImageContainer.querySelector('video');
            if (v) v.playbackRate = 0.33;
        } else if (project.image) {
            modalImageContainer.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="modal-image">
            `;
        } else {
            // Fallback: CSS placeholder in modal? Or just hide.
            // For now, hide if no media.
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

        // Stop video playback
        const video = modalImageContainer.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
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
                video.playbackRate = 0.33; // 3x Slower (Cinematic)
                video.pause(); // Ensure paused initially
                card.addEventListener('mouseenter', () => {
                    video.play().catch(e => { /* Ignore autoplay errors */ });
                });
                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
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
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            renderGrid(category);
            attachCardInteractions(); // Re-attach listeners
        });
    });
});
