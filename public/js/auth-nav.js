/* ============================================
   LATE CULTURE — Auth Nav State
   Shows avatar when logged in, "Sign In" when not
   Runs on all static HTML pages
   ============================================ */

(function() {
  'use strict';

  async function initAuthNav() {
    try {
      const res = await fetch('/api/engagement/status?venue_id=_check', { credentials: 'same-origin' });
      const data = await res.json();

      const nav = document.querySelector('.glass-nav__inner');
      if (!nav) return;

      // Remove existing auth elements
      const existing = document.querySelector('.lc-auth-nav');
      if (existing) existing.remove();

      const el = document.createElement('div');
      el.className = 'lc-auth-nav';

      if (data.authenticated) {
        // Fetch profile for avatar
        const profileRes = await fetch('/api/profile/me', { credentials: 'same-origin' });
        const profileData = await profileRes.json();
        const profile = profileData.profile || {};
        const avatar = profile.avatar_url;
        const level = profile.level || 1;

        el.innerHTML = `
          <a href="/profile" class="lc-auth-nav__user" title="My Profile">
            ${avatar
              ? `<img src="${avatar}" alt="" class="lc-auth-nav__avatar">`
              : `<div class="lc-auth-nav__avatar-placeholder">${(profile.display_name || 'U')[0].toUpperCase()}</div>`
            }
            <span class="lc-auth-nav__level">Lv ${level}</span>
          </a>
        `;
      } else {
        el.innerHTML = `<a href="/login" class="lc-auth-nav__signin">Sign In</a>`;
      }

      // Insert before hamburger or at the end
      const hamburger = nav.querySelector('.glass-nav__hamburger');
      if (hamburger) {
        nav.insertBefore(el, hamburger);
      } else {
        nav.appendChild(el);
      }
    } catch (err) {
      // Fallback: show Sign In link even if API fails
      const nav = document.querySelector('.glass-nav__inner');
      if (nav && !document.querySelector('.lc-auth-nav')) {
        const el = document.createElement('div');
        el.className = 'lc-auth-nav';
        el.innerHTML = '<a href="/login" class="lc-auth-nav__signin">Sign In</a>';
        const hamburger = nav.querySelector('.glass-nav__hamburger');
        if (hamburger) nav.insertBefore(el, hamburger);
        else nav.appendChild(el);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthNav);
  } else {
    initAuthNav();
  }
})();
