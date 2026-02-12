/**
 * render.js — Project Card Renderer
 *
 * Takes project data objects and renders them into DOM elements.
 * All projects are rendered as standard cards. Clicking a card opens the detail modal.
 * Pure functions — no side effects, no global state.
 */

import { PROJECTS } from '../data/projects.js';

// SVG icon constants
const ICONS = {
  github: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
  demo: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/></svg>`,
  live: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`,
};

// Category-specific gradient palettes for CSS placeholders
const CATEGORY_GRADIENTS = {
  'full-stack': ['#6c63ff', '#a78bfa'],
  'data': ['#06b6d4', '#3b82f6'],
  'open-source': ['#10b981', '#6ee7b7'],
  'ml': ['#f59e0b', '#ef4444'],
};

/**
 * Returns the initials from a project title (max 2 chars).
 */
function getInitials(title) {
  return title
    .split(/[\s\-&]+/)
    .filter(w => w.length > 0 && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('') || title.slice(0, 2).toUpperCase();
}

/**
 * Generates a deterministic hue offset from the project id so each card looks unique.
 */
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Builds the image area HTML — real image or CSS placeholder.
 */
function buildImageHTML(project, badgeHTML = '') {
  if (project.video) {
    return `
      <div class="project-card-image">
        <video src="${project.video}" poster="${project.image || ''}" loop muted playsinline></video>
        ${badgeHTML}
        <div class="project-card-overlay" aria-hidden="true">
          <span class="project-card-overlay-text">View Details</span>
        </div>
      </div>`;
  }

  if (project.image) {
    return `
      <div class="project-card-image">
        <img src="${project.image}" alt="Screenshot of ${project.title}" loading="lazy" />
        ${badgeHTML}
        <div class="project-card-overlay" aria-hidden="true">
          <span class="project-card-overlay-text">View Details</span>
        </div>
      </div>`;
  }

  // CSS-only placeholder
  const colors = CATEGORY_GRADIENTS[project.category] || CATEGORY_GRADIENTS['full-stack'];
  const hueShift = hashCode(project.id) % 40 - 20;
  const initials = getInitials(project.title);
  const angle = 135 + (hashCode(project.id) % 60);

  return `
    <div class="project-card-image project-card-placeholder" style="background: linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]}); filter: hue-rotate(${hueShift}deg);">
      <div class="placeholder-content">
        <span class="placeholder-initials">${initials}</span>
        <span class="placeholder-label">${project.subtitle || project.category}</span>
      </div>
      <div class="placeholder-grid"></div>
      ${badgeHTML}
      <div class="project-card-overlay" aria-hidden="true">
        <span class="project-card-overlay-text">View Details</span>
      </div>
    </div>`;
}

/**
 * Builds the HTML for project link buttons (GitHub/Demo).
 */
export function buildLinksHTML(links) {
  let html = '';
  if (links.github) {
    html += `<a href="${links.github}" target="_blank" rel="noopener noreferrer" class="project-link" title="View Source">${ICONS.github} GitHub</a>`;
  }
  if (links.demo) {
    html += `<a href="${links.demo}" target="_blank" rel="noopener noreferrer" class="project-link" title="Watch Demo">${ICONS.demo} Demo</a>`;
  }
  if (links.live) {
    html += `<a href="${links.live}" target="_blank" rel="noopener noreferrer" class="project-link" title="Visit Live Site">${ICONS.live} Live</a>`;
  }
  return html;
}

/**
 * Creates a standard project card with interactions.
 */
function createCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card fade-in';
  card.dataset.category = project.category;
  card.dataset.projectId = project.id; // Critical for modal lookup

  const linksHTML = buildLinksHTML(project.links);
  const noteHTML = project.note ? `<span class="project-note">${project.note}</span>` : '';

  // Badge Logic Removed (User Request)
  const badgeHTML = '';

  card.innerHTML = `
    ${buildImageHTML(project, badgeHTML)}
    <div class="project-card-body">
      <h3>${project.title}</h3>
      ${project.subtitle ? `<p class="project-subtitle">${project.subtitle}</p>` : ''}
      <div class="tags-wrapper">
        <div class="project-tags">
          ${(project.techStack || []).map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-links">
        ${linksHTML}
        ${noteHTML}
      </div>
    </div>
  `;

  return card;
}

/**
 * Renders the project grid, optionally filtering by category.
 */
export function renderGrid(filterCategory = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = filterCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filterCategory);

  filtered.forEach(project => {
    grid.appendChild(createCard(project));
  });

  // Re-observe new cards for fade-in animation
  if (window.__fadeObserver) {
    grid.querySelectorAll('.fade-in').forEach(el => {
      window.__fadeObserver.observe(el);
    });
  }
}
