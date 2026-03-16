(function () {
  var base = document.querySelector('script[src*="load-header-footer.js"]');
  base = base ? base.getAttribute('src').replace(/\/[^/]+$/, '') : 'includes';
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');

  function setActiveNav() {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item[data-page="' + page + '"]').forEach(function (a) {
      a.classList.add('text-primary', 'bg-primary/5');
      a.classList.remove('text-gray-700');
    });
    document.querySelectorAll('.nav-mobile-item[data-page="' + page + '"]').forEach(function (a) {
      a.classList.add('text-primary', 'bg-primary/5');
      a.classList.remove('text-gray-700');
    });
  }

  function initNav() {
    var navToggle = document.getElementById('nav-toggle');
    var navMobile = document.getElementById('nav-mobile');
    var navBackdrop = document.getElementById('nav-mobile-backdrop');
    if (navToggle && navMobile) {
      function setMenuOpen(open) {
        navMobile.classList.toggle('open', open);
        navMobile.setAttribute('aria-hidden', !open);
        if (navBackdrop) {
          navBackdrop.classList.toggle('open', open);
          navBackdrop.setAttribute('aria-hidden', !open);
        }
        var icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars', !open);
          icon.classList.toggle('fa-times', open);
        }
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      }
      navToggle.addEventListener('click', function () {
        setMenuOpen(!navMobile.classList.contains('open'));
      });
      if (navBackdrop) {
        navBackdrop.addEventListener('click', function () {
          setMenuOpen(false);
        });
      }
    }
    /* Desktop: Programs dropdown (hover) */
    document.querySelectorAll('.nav-dropdown-trigger').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (window.innerWidth < 768) {
          e.preventDefault();
          var menu = btn.nextElementSibling;
          if (menu) menu.classList.toggle('open');
        }
      });
    });
    /* Mobile: Programs collapsible */
    var programsBtn = document.querySelector('.nav-mobile-programs-btn');
    var programsContent = document.getElementById('nav-mobile-programs-content');
    if (programsBtn && programsContent) {
      programsBtn.addEventListener('click', function () {
        var open = programsContent.classList.toggle('open');
        programsBtn.classList.toggle('open', open);
        programsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    setActiveNav();
  }

  if (headerEl) {
    fetch(base + '/header.html').then(function (r) { return r.text(); }).then(function (html) {
      headerEl.innerHTML = html;
      initNav();
    }).catch(function () { headerEl.innerHTML = '<p class="p-4 text-gray-500">Header could not be loaded. Please use a local server (e.g. npm start).</p>'; });
  }
  if (footerEl) {
    fetch(base + '/footer.html').then(function (r) { return r.text(); }).then(function (html) {
      footerEl.innerHTML = html;
    }).catch(function () { footerEl.innerHTML = '<p class="p-4 text-gray-500">Footer could not be loaded.</p>'; });
  }
})();
