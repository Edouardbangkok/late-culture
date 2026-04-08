/* ============================================
   LATE CULTURE — Auth Nav (Simplified)
   Sign In button only — gamification moved to app
   ============================================ */

(function() {
  'use strict';

  function renderAuthNav() {
    var nav = document.querySelector('.glass-nav__inner');
    if (!nav) return;

    var existing = document.querySelector('.lc-auth-nav');
    if (existing) existing.remove();

    var el = document.createElement('div');
    el.className = 'lc-auth-nav';
    el.innerHTML = '<a href="/login" class="lc-auth-nav__signin">Sign In</a>';

    var hamburger = nav.querySelector('.glass-nav__hamburger');
    if (hamburger) nav.insertBefore(el, hamburger);
    else nav.appendChild(el);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAuthNav);
  } else {
    renderAuthNav();
  }
})();
