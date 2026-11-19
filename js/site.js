/* =============================================================================
   site.js — shared behaviour + renderers.
   Every list on the site is drawn from js/data.js, so content is edited in
   exactly one place. Blocks opt in with  <div data-render="cases"></div>.
   ========================================================================== */

(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const ARROW = '<svg class="btn__arrow" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M1 6.5h10M7 2.5l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const BACK  = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M12 6.5H2M6 2.5l-4 4 4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* --------------------------- navigation -------------------------------- */
  function nav() {
    const toggle = $('.nav__toggle');
    const links  = $('.nav__links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        const open = links.dataset.open === 'true';
        links.dataset.open = String(!open);
        toggle.setAttribute('aria-expanded', String(!open));
        toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      });
      $$('.nav__link', links).forEach(function (a) {
        a.addEventListener('click', function () {
          links.dataset.open = 'false';
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // mark the current page
    let here = location.pathname.split('/').pop() || 'index.html';
    $$('.nav__link').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === here || (here === 'index.html' && href === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      }
      // case-study pages light up "Projects"
      if (here.indexOf('case-') === 0 && href === 'projects.html') {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ------------------------- scroll reveal ------------------------------- */
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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
      io.observe(el);
    });
  }

  /* ---------------------------- renderers -------------------------------- */
  const render = {};

  render.pillars = function (el) {
    el.className = 'pillars';
    el.innerHTML = PILLARS.map(function (p) {
      return '<article class="pillar reveal">' +
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
      // A video wins if one is set; the still stays on as its poster, so the
      // card is never empty while the file loads and reduced-motion visitors
      // simply keep the still.
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
        plate = '<div class="case__plate case__plate--empty"><span class="label">figures in progress</span></div>';
      }
      return '<article class="case reveal">' +
        '<div class="case__body">' +
          '<span class="label case__kicker">' + esc(c.kicker) + '</span>' +
          '<h3 class="display"><a href="' + esc(c.slug) + '">' + esc(c.title) + '</a></h3>' +
          '<p>' + esc(c.summary) + '</p>' +
          '<div class="case__metric"><span class="fig">' + esc(c.metric) + '</span>' +
            '<span>' + esc(c.metricLabel) + '</span></div>' +
          '<a class="case__more" href="' + esc(c.slug) + '">Read the case study ' + ARROW + '</a>' +
        '</div>' + plate +
      '</article>';
    }).join('');

    caseVideos(el);
  };

  /* Only play a card's video while it is actually on screen, and never at all
     for visitors who asked for reduced motion — they keep the poster still. */
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
          v.play().catch(function () {});   // autoplay blocked → poster stays
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.25 });

    vids.forEach(function (v) { io.observe(v); });
  }

  render.papers = function (el) {
    el.className = 'papers';
    el.innerHTML = PAPERS.map(function (p, i) {
      const authors = p.authors.length
        ? '<p class="paper__authors">' + p.authors.map(function (a) {
            return a === 'Jai Sharma' ? '<b>Jai Sharma</b>' : esc(a);
          }).join(', ') + '</p>'
        : '';

      const hasDeep = p.problem || (p.did && p.did.length) || (p.results && p.results.length);

      let inner = '<div class="paper__inner">';
      if (p.headline) inner += '<p class="paper__lede">' + esc(p.headline) + '</p>';
      if (p.problem) {
        inner += '<div class="prose"><span class="label" style="display:block;margin-bottom:.9rem">The problem</span><p>' + esc(p.problem) + '</p>';
        if (p.data) inner += '<p style="font-size:.88rem;color:var(--dim)"><b>Data:</b> ' + esc(p.data) + '</p>';
        inner += '</div>';
      }
      if (p.did && p.did.length) {
        inner += '<div><span class="label" style="display:block;margin-bottom:.9rem">What I did</span><ol class="stepped">' +
          p.did.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ol></div>';
      }
      if (p.results && p.results.length) {
        inner += '<div><span class="label" style="display:block;margin-bottom:.9rem">Results</span><dl class="kv">' +
          p.results.map(function (r) {
            return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
          }).join('') + '</dl></div>';
      }
      if (p.compare && p.compare.length) {
        const max = Math.max.apply(null, p.compare.map(function (c) { return c[1]; }));
        inner += '<div data-bars><span class="label" style="display:block;margin-bottom:1.1rem">' +
          esc(p.compareLabel) + '</span><div class="bars">' +
          p.compare.map(function (c, idx) {
            return '<div class="bar__row' + (idx === 0 ? ' bar__row--lead' : '') + '">' +
              '<div class="bar__top"><span class="bar__name">' + esc(c[0]) + '</span>' +
              '<span class="bar__val">' + esc(c[1]) + '</span></div>' +
              '<div class="bar__track"><div class="bar__fill" style="transition-delay:' +
                (idx * 70) + 'ms;width:' + (c[1] / max * 100).toFixed(1) + '%"></div></div>' +
            '</div>';
          }).join('') + '</div></div>';
      }
      if (p.why) {
        inner += '<div style="grid-column:1/-1"><span class="label" style="display:block;margin-bottom:.9rem">Why it matters</span>' +
          '<p class="finding" style="font-size:1.12rem">' + esc(p.why) + '</p></div>';
      }
      inner += '<div style="grid-column:1/-1;display:flex;flex-wrap:wrap;gap:1.5rem;align-items:center;justify-content:space-between">' +
        '<div class="chips">' + p.tools.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<a class="btn" href="' + esc(p.url) + '" target="_blank" rel="noopener">Read on ' + esc(p.venue.split(' · ')[0]) + ' ' + ARROW + '</a></div>';
      inner += '</div>';

      if (!hasDeep) {
        inner = '<div class="paper__inner"><p class="paper__lede">' + esc(p.headline) + '</p>' +
          '<div style="grid-column:1/-1"><a class="btn" href="' + esc(p.url) + '" target="_blank" rel="noopener">Read the chapter ' + ARROW + '</a></div></div>';
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

  render.projects = function (el) {
    const cats = ['All'].concat(PROJECTS.map(function (p) { return p.cat; })
      .filter(function (c, i, a) { return a.indexOf(c) === i; }).sort());

    const filters = '<div class="filters" role="group" aria-label="Filter projects by area">' +
      cats.map(function (c, i) {
        return '<button class="filter" type="button" data-cat="' + esc(c) + '" aria-pressed="' +
          (i === 0 ? 'true' : 'false') + '">' + esc(c) + '</button>';
      }).join('') + '</div>';

    const cards = '<div class="grid-projects" data-grid>' + PROJECTS.map(function (p) {
      const links = [];
      if (p.featured) links.push('<a href="' + esc(p.featured) + '">Case study</a>');
      if (p.repo)     links.push('<a href="' + esc(p.repo) + '" target="_blank" rel="noopener">Code</a>');
      var cls = 'project reveal' + (p.featured ? ' project--featured' : '');
      return '<article class="' + cls + '" data-cat="' + esc(p.cat) + '"' +
        (p.featured ? ' data-href="' + esc(p.featured) + '"' : '') + '>' +
        (p.featured ? '<div class="project__overlay"><span>View case study &#8594;</span></div>' : '') +
        '<div class="project__cat">' + (p.featured ? '<span class="project__star" aria-hidden="true">★</span>' : '') +
          '<span class="label">' + esc(p.cat) + '</span></div>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p>' + esc(p.desc) + '</p>' +
        '<div class="project__foot">' +
          '<span class="project__stat">' + esc(p.stat) + '</span>' +
          '<div class="chips">' + p.tech.slice(0, 4).map(function (t) {
            return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
          (links.length ? '<div class="project__links">' + links.join('') + '</div>' : '') +
        '</div>' +
      '</article>';
    }).join('') + '</div>';

    el.innerHTML = filters + cards;

    const count = document.createElement('p');
    count.className = 'label';
    count.style.marginTop = '1.75rem';
    el.appendChild(count);
    const setCount = function (n) { count.textContent = n + (n === 1 ? ' project' : ' projects'); };
    setCount(PROJECTS.length);

    $$('.filter', el).forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cat = btn.dataset.cat;
        $$('.filter', el).forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        let n = 0;
        $$('.project', el).forEach(function (card) {
          const show = cat === 'All' || card.dataset.cat === cat;
          card.hidden = !show;
          if (show) n++;
        });
        setCount(n);
      });
    });

    $$('.project--featured', el).forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        window.location.href = card.dataset.href;
      });
    });
  };

  render.interests = function (el) {
    el.className = 'interests';
    el.innerHTML = INTERESTS.map(function (i) {
      return '<article class="interest reveal">' +
        '<h3>' + esc(i.name) + '</h3>' +
        '<p>' + esc(i.body) + '</p>' +
      '</article>';
    }).join('');
  };

  render.life = function (el) {
    el.className = 'life';
    el.innerHTML = LIFE.map(function (l) {
      return '<article class="life__item reveal">' +
        '<h3>' + esc(l.title) + '</h3>' +
        '<span class="label life__meta">' + esc(l.meta) + '</span>' +
        '<p>' + esc(l.body) + '</p>' +
        (l.why ? '<p class="life__why">' + esc(l.why) + '</p>' : '') +
      '</article>';
    }).join('');
  };

  render.posts = function (el) {
    if (!POSTS.length) {
      el.innerHTML = '<p class="lede" style="max-width:52ch">Nothing published yet. ' +
        'The first pieces are being written up — they\'ll appear here.</p>';
      return;
    }
    el.className = 'posts';
    el.innerHTML = POSTS.map(function (p) {
      var meta = esc(p.dateLabel || p.date);
      if (p.readingTime) meta += ' · ' + p.readingTime + ' min read';
      return '<article class="post-card reveal">' +
        (p.cover ? '<a class="post-card__cover" href="' + esc(p.slug) + '" tabindex="-1" aria-hidden="true">' +
          '<img src="' + esc(p.cover) + '" alt="" loading="lazy"></a>' : '') +
        '<div class="post-card__body">' +
          '<span class="label">' + meta + '</span>' +
          '<h3><a href="' + esc(p.slug) + '">' + esc(p.title) + '</a></h3>' +
          '<p>' + esc(p.excerpt) + '</p>' +
          (p.tags && p.tags.length ? '<div class="chips">' + p.tags.map(function (t) {
            return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
        '</div>' +
      '</article>';
    }).join('');
  };

  /* Home page teaser — the two most recent, or nothing at all. */
  render.postsTeaser = function (el) {
    var section = el.closest('section');
    if (!POSTS.length) { if (section) section.hidden = true; return; }
    el.className = 'posts';
    el.innerHTML = POSTS.slice(0, 2).map(function (p) {
      return '<article class="post-card reveal">' +
        (p.cover ? '<a class="post-card__cover" href="' + esc(p.slug) + '" tabindex="-1" aria-hidden="true">' +
          '<img src="' + esc(p.cover) + '" alt="" loading="lazy"></a>' : '') +
        '<div class="post-card__body">' +
          '<span class="label">' + esc(p.dateLabel || p.date) + '</span>' +
          '<h3><a href="' + esc(p.slug) + '">' + esc(p.title) + '</a></h3>' +
          '<p>' + esc(p.excerpt) + '</p>' +
        '</div></article>';
    }).join('');
  };

  render.docs = function (el) {
    el.className = 'docs';
    el.innerHTML = DOCS.map(function (d) {
      return '<a class="doc reveal" href="' + esc(d.file) + '" target="_blank" rel="noopener">' +
        '<span>' + esc(d.label) + '</span>' +
        '<span class="doc__kind">' + esc(d.kind) + '</span></a>';
    }).join('');
  };

  render.experience = function (el) {
    let html = '';

    if (WORK.roles.length) {
      html += '<div class="timeline">' + WORK.roles.map(function (r, i) {
        // A role can carry a date range, its own `period` text, or neither —
        // the lab entry deliberately shows involvement without dates.
        const period = r.period || (r.start && r.end ? r.start + ' — ' + r.end : r.start || r.end || '');
        return '<div class="tl reveal' + (i === 0 ? ' tl--now' : '') + '">' +
          (period ? '<span class="label tl__period">' + esc(period) + '</span>' : '') +
          '<h3>' + esc(r.title) + '</h3>' +
          '<p class="tl__where">' + esc(r.company) + (r.location ? ' · ' + esc(r.location) : '') + '</p>' +
          (r.bullets && r.bullets.length ? '<ul class="tl__bullets">' + r.bullets.map(function (b) {
            return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' : '') +
          (r.tech && r.tech.length ? '<div class="chips">' + r.tech.map(function (t) {
            return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
          // Linked to the full-size file: these schematics carry small labels
          // that are unreadable once the figure is a phone-width thumbnail.
          (r.image ? '<figure class="tl__fig">' +
            '<a href="' + esc(r.image) + '" target="_blank" rel="noopener">' +
            '<img src="' + esc(r.image) + '" alt="' + esc(r.imageAlt) +
            '" loading="lazy" width="1440" height="600"></a>' +
            '<figcaption>Tap to enlarge</figcaption></figure>' : '') +
        '</div>';
      }).join('') + '</div>';
    }

    el.innerHTML = html;
    el.hidden = !WORK.roles.length;
    const heading = document.querySelector('[data-experience-heading]');
    if (heading) heading.hidden = !WORK.roles.length;
  };

  render.education = function (el) {
    el.innerHTML = '<div class="timeline">' + WORK.education.map(function (e, i) {
      return '<div class="tl reveal' + (i === 0 ? ' tl--now' : '') + '">' +
        '<span class="label tl__period">' + esc(e.period) + '</span>' +
        '<h3>' + esc(e.degree) + '</h3>' +
        '<p class="tl__where">' + esc(e.school) + ' · ' + esc(e.location) + '</p>' +
        (e.detail ? '<p class="tl__detail">' + esc(e.detail) + '</p>' : '') +
        (e.courses.length ? '<div class="chips">' + e.courses.map(function (c) {
          return '<span class="chip">' + esc(c) + '</span>'; }).join('') + '</div>' : '') +
      '</div>';
    }).join('') + '</div>';
  };

  /* compact publication list used on the home and experience pages */
  render.publist = function (el) {
    el.innerHTML = '<div class="timeline">' + PAPERS.map(function (p) {
      return '<div class="tl reveal">' +
        '<span class="label tl__period">' + esc(p.venue) + ' · ' + esc(p.year) + '</span>' +
        '<h3 style="font-size:1.12rem">' + esc(p.title) + '</h3>' +
        '<p style="margin-top:.9rem"><a class="doi" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
          '<span class="doi__id">' + esc(p.doi) + '</span>' +
          '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">' +
          '<path d="M3 8L8 3M8 3H4M8 3v4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '<span class="sr">, opens on the publisher’s site</span></a></p>' +
      '</div>';
    }).join('') + '</div>';
  };

  /* ---------------------------- location strip --------------------------- */
  /* Renders SITE.based as a single line. */
  function availability() {
    $$('[data-availability]').forEach(function (el) {
      if (!SITE.based) { el.hidden = true; return; }
      el.className = 'avail';
      el.innerHTML = '<span class="label" style="color:var(--soft)">' + esc(SITE.based) + '</span>';
      el.hidden = false;   // ships hidden so it never flashes as an empty box
    });
  }

  /* --------------------------- resume button ----------------------------- */
  /* Buttons ship hidden and reveal only once the file is on the server, so no
     one clicks through to a 404. Drop assets/documents/resume.pdf in place. */
  function resume() {
    const btns = $$('[data-resume]');
    if (!btns.length) return;
    const show = function () {
      btns.forEach(function (b) {
        b.setAttribute('href', SITE.resumeUrl);
        b.hidden = false;
      });
    };
    if (location.protocol === 'file:') { show(); return; }  // can't probe file://
    fetch(SITE.resumeUrl, { method: 'HEAD' })
      .then(function (r) { if (r.ok) show(); })
      .catch(function () { /* leave hidden */ });
  }

  /* ---------------------------- contact form ----------------------------- */
  function contactForm() {
    const form = $('[data-contact-form]');
    if (!form) return;

    const status = $('.form__status', form);
    const note   = $('[data-form-note]');

    // Netlify only captures forms on a deployed Netlify site, so locally there
    // is nothing to POST to. Formspree accepts submissions from any origin,
    // localhost included, so it needs no such guard and can be tested here.
    const local = location.protocol === 'file:' ||
                  /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

    const mode = SITE.formspreeId ? 'formspree'
               : (SITE.netlifyForms && !local) ? 'netlify'
               : 'mailto';

    if (note) {
      note.textContent = mode === 'mailto'
        ? 'This opens your own mail app. Or write to ' + SITE.email + ' directly.'
        : 'Goes straight to my inbox.';
    }

    function openMailClient(email, subject, message) {
      const body = message + '\n\n— ' + email;
      window.location.href = 'mailto:' + SITE.email +
        '?subject=' + encodeURIComponent(subject || 'Portfolio enquiry') +
        '&body=' + encodeURIComponent(body);
    }

    /* Optional mirror into a Google Sheet. Fire-and-forget: the primary capture
       is the source of truth, so a failure here must never block the visitor. */
    function mirrorToSheet(payload) {
      if (!SITE.sheetWebhook) return;
      fetch(SITE.sheetWebhook, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      }).catch(function () { /* the Netlify record still has it */ });
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      const fd      = new FormData(form);
      const email   = (fd.get('email')   || '').toString().trim();
      const subject = (fd.get('subject') || '').toString().trim();
      const message = (fd.get('message') || '').toString().trim();

      if (fd.get('bot-field')) return;        // honeypot tripped — drop silently

      if (!email || !message) {
        status.dataset.state = 'err';
        status.textContent = 'Add your email and a message so Jai can reply.';
        return;
      }

      if (mode === 'mailto') {
        openMailClient(email, subject, message);
        status.dataset.state = 'ok';
        status.textContent = 'Opening your mail app…';
        return;
      }

      status.dataset.state = 'busy';
      status.textContent = 'Sending…';

      let request;
      if (mode === 'netlify') {
        // Netlify wants the whole form url-encoded, posted back to the page.
        const body = new URLSearchParams();
        fd.forEach(function (v, k) { body.append(k, v); });
        request = fetch(location.pathname, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString()
        });
      } else {
        request = fetch('https://formspree.io/f/' + SITE.formspreeId, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: email, subject: subject, message: message })
        });
      }

      request
        .then(function (r) {
          if (!r.ok) throw new Error('http ' + r.status);
          mirrorToSheet({ email: email, subject: subject, message: message,
                          sentAt: new Date().toISOString() });
          form.reset();
          status.dataset.state = 'ok';
          status.textContent = 'Sent. Jai will get back to you.';
        })
        .catch(function () {
          // Never strand someone who took the time to write — hand them their
          // own mail client with the message already in it.
          status.dataset.state = 'err';
          status.textContent = 'That did not send — opening your mail app instead.';
          openMailClient(email, subject, message);
        });
    });
  }

  /* ------------------------------- boot ---------------------------------- */
  function boot() {
    nav();
    $$('[data-render]').forEach(function (el) {
      const fn = render[el.dataset.render];
      if (fn) fn(el);
    });
    // Keep "Writing" out of the nav until there is something to read.
    if (typeof POSTS !== 'undefined' && !POSTS.length) {
      $$('.nav__link[href="writing.html"], .nav__link[href="/writing.html"]')
        .forEach(function (a) { a.hidden = true; });
    }

    availability();
    resume();
    contactForm();

    // fill any element marked with a value from SITE
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
