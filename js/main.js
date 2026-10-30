

document.addEventListener('DOMContentLoaded', function () {
  initFooter();
  initActiveNav();
  initReveal();
  initLightbox();
  initAccordion();
  initTabs();
  initBackToTop();
});

/* ---------- Footer: year + last modified ---------- */
function initFooter() {
  var el = document.getElementById('footer-credit');
  if (!el) return;
  var year = new Date().getFullYear();
  var modified = new Date(document.lastModified).toDateString();
  el.textContent = '\u00A9 ' + year + " Chichi's Bakery. All rights reserved. Last modified: " + modified;
}

/* ---------- Highlight the current page in the nav ---------- */
function initActiveNav() {
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (link) {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ---------- Fade-in animation when sections scroll into view ---------- */
function initReveal() {
  var items = document.querySelectorAll('main section');
  if (!('IntersectionObserver' in window)) return; // content simply stays visible
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(function (s) {
    s.classList.add('reveal');
    observer.observe(s);
  });
}

/* ---------- Lightbox gallery---------- */
function initLightbox() {
  var selector = '.featured-products img, .product-category img, .team img';
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image viewer');
  overlay.hidden = true;
  overlay.innerHTML =
    '<button class="lb-close" aria-label="Close image">&times;</button>' +
    '<button class="lb-prev" aria-label="Previous image">&#10094;</button>' +
    '<figure><img src="" alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-next" aria-label="Next image">&#10095;</button>';
  document.body.appendChild(overlay);

  var bigImg = overlay.querySelector('img');
  var caption = overlay.querySelector('figcaption');
  var images = [];
  var index = 0;
  var lastFocus = null;

  function show(i) {
    index = (i + images.length) % images.length;
    bigImg.src = images[index].src;
    bigImg.alt = images[index].alt;
    caption.textContent = images[index].alt;
  }
  function open(i) {
    images = Array.prototype.slice.call(document.querySelectorAll(selector));
    lastFocus = document.activeElement;
    show(i);
    overlay.hidden = false;
    document.body.classList.add('no-scroll');
    overlay.querySelector('.lb-close').focus();
  }
  function close() {
    overlay.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  }

  // Event delegation: one listener handles every matching image
  document.addEventListener('click', function (e) {
    var img = e.target.closest ? e.target.closest(selector) : null;
    if (img && overlay.hidden) {
      var all = Array.prototype.slice.call(document.querySelectorAll(selector));
      open(all.indexOf(img));
    }
  });
  overlay.querySelector('.lb-close').addEventListener('click', close);
  overlay.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  overlay.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function (e) {
    if (overlay.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Make the images keyboard friendly + show a pointer cursor
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.matches && e.target.matches(selector)) e.target.click();
  });
  document.querySelectorAll(selector).forEach(function (img) {
    img.setAttribute('tabindex', '0');
  });
}

/* ---------- Accordion (FAQ) ---------- */
function initAccordion() {
  document.querySelectorAll('.accordion-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
}

/* ---------- Tabs---------- */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(function (group) {
    var tabs = group.querySelectorAll('[role="tab"]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          var selected = t === tab;
          t.setAttribute('aria-selected', String(selected));
          t.classList.toggle('active', selected);
          document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
        });
      });
    });
  });
}

/* ---------- Back to top button ---------- */
function initBackToTop() {
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '&uarr;';
  btn.hidden = true;
  document.body.appendChild(btn);
  window.addEventListener('scroll', function () {
    btn.hidden = window.scrollY < 400;
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
