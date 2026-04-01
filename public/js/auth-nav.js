/* ============================================
   LATE CULTURE — Auth Nav State
   Shows avatar when logged in, "Sign In" when not
   Uses localStorage cache for instant display
   ============================================ */

(function() {
  'use strict';

  const CACHE_KEY = 'lc_auth_nav';

  function getCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function setCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch {}
  }

  function clearCache() {
    try { localStorage.removeItem(CACHE_KEY); } catch {}
  }

  function renderAuthNav(state) {
    const nav = document.querySelector('.glass-nav__inner');
    if (!nav) return;

    const existing = document.querySelector('.lc-auth-nav');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className = 'lc-auth-nav';

    if (state && state.authenticated) {
      var avatar = state.avatar_url;
      var level = state.level || 1;
      var name = state.display_name || 'U';
      var initial = name.charAt(0).toUpperCase();

      var avatarHtml = avatar
        ? '<img src="' + avatar + '" alt="" class="lc-auth-nav__avatar">'
        : '<div class="lc-auth-nav__avatar-placeholder">' + initial + '</div>';

      el.innerHTML = '<a href="/profile" class="lc-auth-nav__user" title="My Profile">'
        + avatarHtml
        + '<span class="lc-auth-nav__level">Lv ' + level + '</span>'
        + '</a>';
    } else {
      el.innerHTML = '<a href="/login" class="lc-auth-nav__signin">Sign In</a>';
    }

    // Insert right after the CTA button, before hamburger
    const hamburger = nav.querySelector('.glass-nav__hamburger');
    if (hamburger) {
      nav.insertBefore(el, hamburger);
    } else {
      nav.appendChild(el);
    }
  }

  async function fetchAndUpdate() {
    try {
      const res = await fetch('/api/engagement/status?venue_id=_check', { credentials: 'same-origin' });
      const data = await res.json();

      if (data.authenticated) {
        const profileRes = await fetch('/api/profile/me', { credentials: 'same-origin' });
        const profileData = await profileRes.json();
        const profile = profileData.profile || {};

        const state = {
          authenticated: true,
          avatar_url: profile.avatar_url || null,
          display_name: profile.display_name || 'User',
          level: profile.level || 1,
        };
        setCache(state);
        renderAuthNav(state);
      } else {
        clearCache();
        renderAuthNav({ authenticated: false });
      }
    } catch {
      // If API fails and no cache, show Sign In
      if (!getCache()) {
        renderAuthNav({ authenticated: false });
      }
    }
  }

  function init() {
    // Step 1: render immediately from cache (instant, no flash)
    const cached = getCache();
    renderAuthNav(cached || { authenticated: false });

    // Step 2: update from API in background
    fetchAndUpdate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
