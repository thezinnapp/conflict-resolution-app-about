// The Conflict Resolution App — marketing site. No trackers, no third-party code.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Header turns to glass after a little scroll
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-nav');
  function setMenu(open) {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
  }
  btn.addEventListener('click', function () { setMenu(menu.hidden); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); btn.focus(); } });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Screenshot gallery arrows
  var track = document.querySelector('.gallery-track');
  document.querySelectorAll('.gallery-controls .round-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var step = track.querySelector('img').getBoundingClientRect().width + 22;
      track.scrollBy({ left: Number(b.dataset.dir) * step * 2, behavior: 'smooth' });
    });
  });
})();
