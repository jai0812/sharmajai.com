/* =============================================================================
   site.js — Modern Interactive Behaviour & Renderers for Jai Sharma
   Data Scientist & Machine Learning Engineer Portfolio
   ========================================================================== */

(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const ARROW = '<svg class="btn__arrow" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M1 6.5h10M7 2.5l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const BACK  = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M12 6.5H2M6 2.5l-4 4 4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const SEARCH_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';

  /* ------------------- Interactive Modern Navigation ---------------------- */
  function buildHeader() {
    let oldNav = $('header.nav') || $('header.masthead-header');
    if (!oldNav) return;

    // Remove any legacy ticker bars or dateline strips
    const legacyTicker = $('.ticker-bar');
    if (legacyTicker) legacyTicker.remove();
    const legacyDateline = $('.dateline-strip');
    if (legacyDateline) legacyDateline.remove();

    const headerHTML = '<header class="nav">' +
      '<div class="wrap nav__in">' +
        '<a class="brand" href="index.html">' +
          '<div class="brand__mark" aria-hidden="true">JS</div>' +
          '<div class="brand__text">' +
            '<span class="brand__name">Jai Sharma</span>' +
            '<span class="brand__role">Data Scientist &amp; ML Engineer</span>' +
          '</div>' +
        '</a>' +

        '<nav class="nav__links" id="nav-links" data-open="false" aria-label="Primary Navigation">' +
          '<a class="nav__link" href="index.html">Home</a>' +
          '<a class="nav__link" href="experience.html">Experience</a>' +
          '<a class="nav__link" href="research.html">Research</a>' +
          '<a class="nav__link" href="projects.html">Projects</a>' +
          '<a class="nav__link" href="writing.html">Writing</a>' +
          '<a class="nav__link" href="about.html">About</a>' +
          '<a class="nav__link" href="contact.html">Contact</a>' +
        '</nav>' +

        '<div class="nav__actions">' +
          '<div class="status-badge" title="Open for Data Science & ML Engineering Opportunities">' +
            '<span class="status-dot"></span>' +
            '<span>Available for roles</span>' +
          '</div>' +
          '<a class="btn btn--primary btn--sm" href="contact.html">Get in Touch</a>' +
          '<button class="nav__toggle" type="button" aria-expanded="false" aria-label="Toggle navigation menu" aria-controls="nav-links">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</header>';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerHTML;
    const newHeader = tempDiv.firstElementChild;
    oldNav.parentNode.replaceChild(newHeader, oldNav);

    // Wire up mobile toggle
    const toggle = $('.nav__toggle');
    const links  = $('#nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        const open = links.dataset.open === 'true';
        links.dataset.open = String(!open);
        toggle.setAttribute('aria-expanded', String(!open));
      });
      $$('.nav__link', links).forEach(function (a) {
        a.addEventListener('click', function () {
          links.dataset.open = 'false';
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  function navHighlight() {
    let here = location.pathname.split('/').pop() || 'index.html';
    if (here === '' || here === '/') here = 'index.html';

    $$('.nav__link').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === here || (here === 'index.html' && href === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      }
      if (here.indexOf('case-') === 0 && href === 'projects.html') {
        a.setAttribute('aria-current', 'page');
      }
      if (here.indexOf('post-') === 0 && href === 'writing.html') {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ------------------------- Interactive Toast ---------------------------- */
  function showToast(msg) {
    let toast = $('#toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ' + esc(msg);
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2800);
  }

  /* ------------------- Interactive Copy-to-Clipboard ---------------------- */
  function setupCopyButtons() {
    $$('[data-copy-email]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const email = btn.getAttribute('data-copy-email') || SITE.email;
        navigator.clipboard.writeText(email).then(function () {
          showToast('Email address copied to clipboard: ' + email);
        }).catch(function () {
          window.location.href = 'mailto:' + email;
        });
      });
    });
  }

  /* -------------------- Interactive Back to Top --------------------------- */
  function setupBackToTop() {
    let btn = $('.back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', 'Scroll back to top');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';
      document.body.appendChild(btn);
    }

    window.addEventListener('scroll', function () {
      if (window.scrollY > 350) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------- Scroll Reveal Observer ------------------------ */
  function reveal() {
    const targets = $$('.reveal, [data-bars]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
      io.observe(el);
    });
  }

  /* --------------------------- Renderers --------------------------------- */
  const render = {};

  render.pillars = function (el) {
    el.className = 'pillars';
    const icons = [
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>'
    ];
    el.innerHTML = PILLARS.map(function (p, idx) {
      return '<article class="pillar reveal">' +
        '<div class="pillar__icon">' + (icons[idx] || icons[0]) + '</div>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p>' + esc(p.body) + '</p>' +
        '<div class="chips">' + p.chips.map(function (c) {
          return '<span class="chip">' + esc(c) + '</span>';
        }).join('') + '</div>' +
      '</article>';
    }).join('');
  };

  render.cases = function (el) {
    el.className = 'cases';
    el.innerHTML = CASES.map(function (c) {
      let plate;
      if (c.video) {
        plate = '<div class="case__plate">' +
          '<video class="case__media" data-case-video muted loop playsinline preload="none" ' +
            'aria-label="' + esc(c.thumbAlt) + '"' +
            (c.thumb ? ' poster="' + esc(c.thumb) + '"' : '') + '>' +
            (c.videoWebm ? '<source src="' + esc(c.videoWebm) + '" type="video/webm">' : '') +
            '<source src="' + esc(c.video) + '" type="video/mp4">' +
          '</video></div>';
      } else if (c.thumb) {
        plate = '<div class="case__plate"><img class="case__media" src="' + esc(c.thumb) +
          '" alt="' + esc(c.thumbAlt) + '" loading="lazy" width="1600" height="1000"></div>';
      } else {
        plate = '<div class="case__plate case__plate--empty"><span class="label">Figure in progress</span></div>';
      }
      return '<article class="case reveal">' +
        '<div class="case__body">' +
          '<div class="case__kicker">' + esc(c.kicker) + '</div>' +
          '<h3><a href="' + esc(c.slug) + '">' + esc(c.title) + '</a></h3>' +
          '<p>' + esc(c.summary) + '</p>' +
          '<div class="case__metric">' +
            '<span class="fig">' + esc(c.metric) + '</span>' +
            '<span>' + esc(c.metricLabel) + '</span>' +
          '</div>' +
          '<div class="chips">' + c.tech.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
          '<a class="case__more" href="' + esc(c.slug) + '">Read full case study ' + ARROW + '</a>' +
        '</div>' + plate +
      '</article>';
    }).join('');

    caseVideos(el);
  };

  function caseVideos(root) {
    const vids = $$('[data-case-video]', root);
    if (!vids.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) {
      vids.forEach(function (v) { v.preload = 'metadata'; v.play().catch(function () {}); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        const v = e.target;
        if (e.isIntersecting) {
          if (v.preload !== 'auto') v.preload = 'auto';
          v.play().catch(function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { io.observe(v); });
  }

  /* -------------------- Interactive Projects Hub -------------------------- */
  render.projects = function (el) {
    const cats = ['All'].concat(PROJECTS.map(function (p) { return p.cat; })
      .filter(function (c, i, a) { return a.indexOf(c) === i; }).sort());

    const toolbarHTML = '<div class="projects-toolbar">' +
      '<div class="filters" role="group" aria-label="Filter projects by category">' +
        cats.map(function (c, i) {
          const count = c === 'All' ? PROJECTS.length : PROJECTS.filter(function (p) { return p.cat === c; }).length;
          return '<button class="filter" type="button" data-cat="' + esc(c) + '" aria-pressed="' +
            (i === 0 ? 'true' : 'false') + '">' + esc(c) + ' (' + count + ')</button>';
        }).join('') +
      '</div>' +
      '<div class="search-box">' +
        SEARCH_ICON +
        '<input type="search" placeholder="Search projects by tech, keyword..." aria-label="Search projects">' +
      '</div>' +
    '</div>';

    const cardsHTML = '<div class="grid-projects" data-grid>' + PROJECTS.map(function (p, idx) {
      const links = [];
      if (p.featured) links.push('<a href="' + esc(p.featured) + '">Case Study</a>');
      if (p.repo) links.push('<a href="' + esc(p.repo) + '" target="_blank" rel="noopener">Code ↗</a>');

      return '<article class="project reveal' + (p.featured ? ' project--featured' : '') + '" data-cat="' + esc(p.cat) + '" data-idx="' + idx + '">' +
        '<div class="project__top">' +
          '<span class="project__cat-badge">' + esc(p.cat) + '</span>' +
          (p.featured ? '<span class="status-badge" style="font-size:0.68rem;padding:0.15rem 0.5rem">Featured</span>' : '') +
        '</div>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p>' + esc(p.desc) + '</p>' +
        '<div class="project__foot">' +
          '<span class="project__stat">' + esc(p.stat) + '</span>' +
          '<div class="chips">' + p.tech.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
          '<div class="project__actions">' +
            '<button type="button" class="btn btn--sm" data-quickview="' + idx + '">Quick View</button>' +
            '<div class="project__links">' + links.join('') + '</div>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('') + '</div>';

    el.innerHTML = toolbarHTML + cardsHTML;

    // Filter & Search Logic
    const searchInput = $('input[type="search"]', el);
    let activeCat = 'All';
    let searchQuery = '';

    function applyFilterAndSearch() {
      const q = searchQuery.toLowerCase().trim();
      let matchedCount = 0;
      $$('.project', el).forEach(function (card) {
        const cat = card.dataset.cat;
        const idx = parseInt(card.dataset.idx, 10);
        const p = PROJECTS[idx];
        const text = (p.name + ' ' + p.desc + ' ' + p.cat + ' ' + p.tech.join(' ') + ' ' + p.stat).toLowerCase();

        const catMatches = (activeCat === 'All' || cat === activeCat);
        const searchMatches = (!q || text.indexOf(q) !== -1);

        const show = catMatches && searchMatches;
        card.hidden = !show;
        if (show) matchedCount++;
      });
    }

    $$('.filter', el).forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCat = btn.dataset.cat;
        $$('.filter', el).forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        applyFilterAndSearch();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = searchInput.value;
        applyFilterAndSearch();
      });
    }

    // Interactive Quick View Modal
    $$('[data-quickview]', el).forEach(function (btn) {
      btn.addEventListener('click', function () {
        const idx = parseInt(btn.dataset.quickview, 10);
        openProjectModal(PROJECTS[idx]);
      });
    });
  }

  function openProjectModal(p) {
    let overlay = $('#project-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'project-modal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = '<div class="modal-card">' +
        '<button class="modal-close" type="button" aria-label="Close dialog">✕</button>' +
        '<div id="modal-content"></div>' +
      '</div>';
      document.body.appendChild(overlay);

      $('.modal-close', overlay).addEventListener('click', function () {
        overlay.dataset.open = 'false';
      });

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.dataset.open = 'false';
      });

      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.dataset.open === 'true') {
          overlay.dataset.open = 'false';
        }
      });
    }

    const content = $('#modal-content', overlay);
    const links = [];
    if (p.featured) links.push('<a class="btn btn--primary" href="' + esc(p.featured) + '">Read Full Case Study ' + ARROW + '</a>');
    if (p.repo) links.push('<a class="btn" href="' + esc(p.repo) + '" target="_blank" rel="noopener">View Source Code ↗</a>');

    content.innerHTML = '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem">' +
      '<span class="project__cat-badge">' + esc(p.cat) + '</span>' +
      '<span class="stat-item__label" style="font-family:var(--font-mono)">' + esc(p.stat) + '</span>' +
    '</div>' +
    '<h2 style="font-size:1.65rem;font-weight:800;margin-bottom:1rem;color:var(--text)">' + esc(p.name) + '</h2>' +
    '<p style="font-size:1.02rem;color:var(--text-secondary);line-height:1.65;margin-bottom:1.5rem">' + esc(p.desc) + '</p>' +
    '<div style="margin-bottom:1.75rem"><span class="label" style="display:block;margin-bottom:0.6rem">Technologies &amp; Libraries</span>' +
      '<div class="chips">' + p.tech.map(function (t) { return '<span class="chip" style="font-size:0.8rem;padding:0.35rem 0.75rem">' + esc(t) + '</span>'; }).join('') + '</div>' +
    '</div>' +
    '<div style="display:flex;flex-wrap:wrap;gap:0.75rem;padding-top:1.25rem;border-top:1px solid var(--border)">' +
      links.join('') +
    '</div>';

    overlay.dataset.open = 'true';
  }

  /* ------------------- Interactive Publications Accordion ----------------- */
  render.papers = function (el) {
    el.className = 'papers';
    el.innerHTML = PAPERS.map(function (p) {
      const authors = p.authors.length
        ? '<p class="paper__authors">' + p.authors.map(function (a) {
            return a === 'Jai Sharma' ? '<b>Jai Sharma</b>' : esc(a);
          }).join(', ') + '</p>'
        : '';

      const hasDeep = p.problem || (p.did && p.did.length) || (p.results && p.results.length);

      let inner = '<div class="paper__inner">';
      if (p.headline) inner += '<p class="paper__lede">' + esc(p.headline) + '</p>';
      if (p.problem) {
        inner += '<div><span class="label" style="display:block;margin-bottom:.6rem">Problem Statement</span><p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.6">' + esc(p.problem) + '</p>';
        if (p.data) inner += '<p style="font-size:.84rem;color:var(--text-muted);margin-top:0.4rem"><b>Corpus / Dataset:</b> ' + esc(p.data) + '</p>';
        inner += '</div>';
      }
      if (p.did && p.did.length) {
        inner += '<div><span class="label" style="display:block;margin-bottom:.6rem">What I Did</span><ol class="stepped">' +
          p.did.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ol></div>';
      }
      if (p.results && p.results.length) {
        inner += '<div><span class="label" style="display:block;margin-bottom:.6rem">Key Results</span><dl class="kv">' +
          p.results.map(function (r) {
            return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
          }).join('') + '</dl></div>';
      }
      if (p.compare && p.compare.length) {
        const max = Math.max.apply(null, p.compare.map(function (c) { return c[1]; }));
        inner += '<div data-bars><span class="label" style="display:block;margin-bottom:.8rem">' +
          esc(p.compareLabel) + '</span><div class="bars">' +
          p.compare.map(function (c, idx) {
            return '<div class="bar__row">' +
              '<div class="bar__top"><span class="bar__name">' + esc(c[0]) + '</span>' +
              '<span class="bar__val">' + esc(c[1]) + '</span></div>' +
              '<div class="bar__track"><div class="bar__fill" style="transition-delay:' +
                (idx * 70) + 'ms;width:' + (c[1] / max * 100).toFixed(1) + '%"></div></div>' +
            '</div>';
          }).join('') + '</div></div>';
      }
      if (p.why) {
        inner += '<div style="grid-column:1/-1"><span class="label" style="display:block;margin-bottom:.6rem">Why It Matters</span>' +
          '<p class="finding">' + esc(p.why) + '</p></div>';
      }
      inner += '<div style="grid-column:1/-1;display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;padding-top:1rem;border-top:1px solid var(--border-subtle)">' +
        '<div class="chips">' + p.tools.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<a class="btn btn--sm btn--primary" href="' + esc(p.url) + '" target="_blank" rel="noopener">Access Paper on ' + esc(p.venue.split(' · ')[0]) + ' ' + ARROW + '</a></div>';
      inner += '</div>';

      if (!hasDeep) {
        inner = '<div class="paper__inner"><p class="paper__lede">' + esc(p.headline) + '</p>' +
          '<div style="grid-column:1/-1"><a class="btn btn--sm btn--primary" href="' + esc(p.url) + '" target="_blank" rel="noopener">Read Book Chapter ' + ARROW + '</a></div></div>';
      }

      const id = 'paper-' + esc(p.id);
      return '<article class="paper reveal">' +
        '<h3><button class="paper__head" aria-expanded="false" aria-controls="' + id + '">' +
          '<span class="paper__venue"><b>' + esc(p.venue) + '</b>' + esc(p.vol) + '<br>' + esc(p.year) + '</span>' +
          '<span><span class="paper__title">' + esc(p.title) + '</span>' + authors + '</span>' +
          '<span class="paper__plus" aria-hidden="true">+</span>' +
        '</button></h3>' +
        '<div class="paper__panel" id="' + id + '" data-open="false"><div>' + inner + '</div></div>' +
      '</article>';
    }).join('');

    $$('.paper__head', el).forEach(function (btn) {
      btn.addEventListener('click', function () {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        const open  = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        panel.dataset.open = String(!open);
        if (!open) {
          $$('[data-bars]', panel).forEach(function (b) { b.classList.add('is-in'); });
        }
      });
    });
  };

  /* ------------------- Interactive Experience Switcher -------------------- */
  render.experience = function (el) {
    let rolesHTML = '<div class="timeline" id="exp-roles">' + WORK.roles.map(function (r, i) {
      const period = r.period || (r.start && r.end ? r.start + ' — ' + r.end : r.start || r.end || '');
      return '<div class="tl reveal' + (i === 0 ? ' tl--now' : '') + '">' +
        '<div class="tl__header">' +
          (period ? '<span class="tl__period">' + esc(period) + '</span>' : '') +
          '<h3>' + esc(r.title) + '</h3>' +
          '<p class="tl__where">' + esc(r.company) + (r.location ? ' · ' + esc(r.location) : '') + '</p>' +
        '</div>' +
        (r.bullets && r.bullets.length ? '<ul class="tl__bullets">' + r.bullets.map(function (b) {
          return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' : '') +
        (r.tech && r.tech.length ? '<div class="chips">' + r.tech.map(function (t) {
          return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
        (r.image ? '<figure class="tl__fig">' +
          '<a href="' + esc(r.image) + '" target="_blank" rel="noopener">' +
          '<img src="' + esc(r.image) + '" alt="' + esc(r.imageAlt) + '" loading="lazy" width="1440" height="600"></a>' +
          '</figure>' : '') +
      '</div>';
    }).join('') + '</div>';

    let eduHTML = '<div class="timeline" id="exp-edu" hidden>' + WORK.education.map(function (e) {
      return '<div class="tl reveal">' +
        '<div class="tl__header">' +
          '<span class="tl__period">' + esc(e.period) + '</span>' +
          '<h3>' + esc(e.degree) + '</h3>' +
          '<p class="tl__where">' + esc(e.school) + ' · ' + esc(e.location) + '</p>' +
        '</div>' +
        (e.detail ? '<p style="color:var(--text-secondary);font-size:0.95rem">' + esc(e.detail) + '</p>' : '') +
        (e.courses.length ? '<div class="chips">' + e.courses.map(function (c) {
          return '<span class="chip">' + esc(c) + '</span>'; }).join('') + '</div>' : '') +
      '</div>';
    }).join('') + '</div>';

    const tabsHTML = '<div class="timeline-toggle" role="tablist">' +
      '<button class="timeline-toggle-btn" type="button" role="tab" id="tab-roles" aria-selected="true" data-target="exp-roles">Work &amp; Research Roles (' + WORK.roles.length + ')</button>' +
      '<button class="timeline-toggle-btn" type="button" role="tab" id="tab-edu" aria-selected="false" data-target="exp-edu">Academic Background (' + WORK.education.length + ')</button>' +
    '</div>';

    el.innerHTML = tabsHTML + rolesHTML + eduHTML;

    $$('.timeline-toggle-btn', el).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('.timeline-toggle-btn', el).forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
        btn.setAttribute('aria-selected', 'true');
        const targetId = btn.getAttribute('data-target');
        $('#exp-roles', el).hidden = targetId !== 'exp-roles';
        $('#exp-edu', el).hidden = targetId !== 'exp-edu';
      });
    });
  };

  render.education = function (el) {
    el.innerHTML = '<div class="timeline">' + WORK.education.map(function (e) {
      return '<div class="tl reveal">' +
        '<span class="tl__period">' + esc(e.period) + '</span>' +
        '<h3>' + esc(e.degree) + '</h3>' +
        '<p class="tl__where">' + esc(e.school) + ' · ' + esc(e.location) + '</p>' +
        (e.detail ? '<p style="color:var(--text-secondary);font-size:0.95rem">' + esc(e.detail) + '</p>' : '') +
        (e.courses.length ? '<div class="chips">' + e.courses.map(function (c) {
          return '<span class="chip">' + esc(c) + '</span>'; }).join('') + '</div>' : '') +
      '</div>';
    }).join('') + '</div>';
  };

  render.publist = function (el) {
    el.innerHTML = '<div class="timeline">' + PAPERS.map(function (p) {
      return '<div class="tl reveal">' +
        '<span class="tl__period">' + esc(p.venue) + ' · ' + esc(p.year) + '</span>' +
        '<h3 style="font-size:1.15rem">' + esc(p.title) + '</h3>' +
        '<p style="margin-top:.5rem"><a class="doi" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
          '<span>' + esc(p.doi) + '</span>' +
          '<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M3 8L8 3M8 3H4M8 3v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</a></p>' +
      '</div>';
    }).join('') + '</div>';
  };

  render.posts = function (el) {
    if (!POSTS.length) {
      el.innerHTML = '<p class="lede">Dispatches and technical writeups in preparation.</p>';
      return;
    }
    el.className = 'grid-projects';
    el.innerHTML = POSTS.map(function (p) {
      var meta = esc(p.dateLabel || p.date);
      if (p.readingTime) meta += ' · ' + p.readingTime + ' min read';
      return '<article class="project reveal">' +
        '<span class="project__cat-badge">' + meta + '</span>' +
        '<h3><a href="' + esc(p.slug) + '">' + esc(p.title) + '</a></h3>' +
        '<p>' + esc(p.excerpt) + '</p>' +
        (p.tags && p.tags.length ? '<div class="chips">' + p.tags.map(function (t) {
          return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
        '<div style="margin-top:auto;padding-top:1rem">' +
          '<a class="btn btn--sm btn--primary" href="' + esc(p.slug) + '">Read Article ' + ARROW + '</a>' +
        '</div>' +
      '</article>';
    }).join('');
  };

  /* -------------------------- Contact Form -------------------------------- */
  function contactForm() {
    const form = $('[data-contact-form]');
    if (!form) return;
    const status = $('.form__status', form);
    const note   = $('[data-form-note]');
    const local  = location.protocol === 'file:' ||
                  /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
    const mode   = SITE.formspreeId ? 'formspree'
                 : (SITE.netlifyForms && !local) ? 'netlify'
                 : 'mailto';

    if (note) {
      note.textContent = mode === 'mailto'
        ? 'Direct email transmission to ' + SITE.email + '.'
        : 'Transmits securely directly to Jai’s inbox.';
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const fd      = new FormData(form);
      const email   = (fd.get('email')   || '').toString().trim();
      const subject = (fd.get('subject') || '').toString().trim();
      const message = (fd.get('message') || '').toString().trim();

      if (fd.get('bot-field')) return;
      if (!email || !message) {
        status.dataset.state = 'err';
        status.textContent = 'Please provide both your email address and a message.';
        return;
      }

      if (mode === 'mailto') {
        const body = message + '\n\n— ' + email;
        window.location.href = 'mailto:' + SITE.email +
          '?subject=' + encodeURIComponent(subject || 'Portfolio Inquiry') +
          '&body=' + encodeURIComponent(body);
        status.dataset.state = 'ok';
        status.textContent = 'Opening your email client…';
        return;
      }

      status.dataset.state = 'busy';
      status.textContent = 'Sending message…';

      fetch('https://formspree.io/f/' + SITE.formspreeId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email, subject: subject, message: message })
      })
      .then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        form.reset();
        status.dataset.state = 'ok';
        status.textContent = 'Message sent successfully! Jai will reply soon.';
        showToast('Message sent cleanly to Jai Sharma.');
      })
      .catch(function () {
        status.dataset.state = 'err';
        status.textContent = 'Could not send online — opening mail client instead.';
        window.location.href = 'mailto:' + SITE.email +
          '?subject=' + encodeURIComponent(subject || 'Portfolio Inquiry') +
          '&body=' + encodeURIComponent(message + '\n\n— ' + email);
      });
    });
  }

  function resume() {
    const btns = $$('[data-resume]');
    if (!btns.length) return;
    const show = function () {
      btns.forEach(function (b) {
        b.setAttribute('href', SITE.resumeUrl);
        b.hidden = false;
      });
    };
    if (location.protocol === 'file:') { show(); return; }
    fetch(SITE.resumeUrl, { method: 'HEAD' })
      .then(function (r) { if (r.ok) show(); })
      .catch(function () {});
  }

  /* ------------------------------- Boot ---------------------------------- */
  function boot() {
    buildHeader();
    navHighlight();
    setupCopyButtons();
    setupBackToTop();

    $$('[data-render]').forEach(function (el) {
      const fn = render[el.dataset.render];
      if (fn) fn(el);
    });

    resume();
    contactForm();

    $$('[data-site]').forEach(function (el) {
      const key = el.dataset.site;
      const val = key.split('.').reduce(function (o, k) { return o && o[k]; }, SITE);
      if (val == null) return;
      if (el.tagName === 'A') {
        el.setAttribute('href', key === 'email' ? 'mailto:' + val : val);
        if (!el.textContent.trim()) el.textContent = val;
      } else {
        el.textContent = val;
      }
    });

    $$('[data-back]').forEach(function (el) { el.insertAdjacentHTML('afterbegin', BACK); });
    $$('[data-arrow]').forEach(function (el) { el.insertAdjacentHTML('beforeend', ARROW); });

    reveal();

    const y = $('[data-year]');
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
