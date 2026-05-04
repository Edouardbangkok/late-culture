/* ============================================
   LATE CULTURE — Auth Nav State
   Shows avatar + dropdown when signed in, Sign In when not.
   Uses localStorage cache for instant render, then refreshes from server.
   ============================================ */

(function() {
  'use strict';

  var CACHE_KEY = 'lc_auth_state';

  function getCache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) { return null; }
  }
  function setCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch (e) {}
  }
  function clearCache() {
    try { localStorage.removeItem(CACHE_KEY); } catch (e) {}
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderAuthNav(state) {
    var nav = document.querySelector('.glass-nav__inner');
    if (!nav) return;

    var existing = document.querySelector('.lc-auth-nav');
    if (existing) existing.remove();

    var el = document.createElement('div');
    el.className = 'lc-auth-nav';

    if (state && state.authenticated && state.user) {
      var u = state.user;
      var name = u.display_name || 'You';
      var initial = (name.charAt(0) || 'U').toUpperCase();
      var avatarHtml = u.avatar_url
        ? '<img src="' + escapeHtml(u.avatar_url) + '" alt="" class="lc-auth-nav__avatar" referrerpolicy="no-referrer">'
        : '<div class="lc-auth-nav__avatar-placeholder">' + escapeHtml(initial) + '</div>';

      el.innerHTML =
        '<button type="button" class="lc-auth-nav__trigger" id="lc-nav-trigger" aria-haspopup="true" aria-expanded="false">'
        + avatarHtml
        + '<span class="lc-auth-nav__name">' + escapeHtml(name) + '</span>'
        + '</button>'
        + '<div class="lc-auth-nav__dropdown" id="lc-nav-dropdown" role="menu">'
        + '  <div class="lc-auth-nav__dropdown-header">'
        + '    <div class="lc-auth-nav__dropdown-name">' + escapeHtml(name) + '</div>'
        + (u.email ? '    <div class="lc-auth-nav__dropdown-email">' + escapeHtml(u.email) + '</div>' : '')
        + '  </div>'
        + '  <div class="lc-auth-nav__dropdown-divider"></div>'
        + '  <button type="button" class="lc-auth-nav__dropdown-item lc-auth-nav__dropdown-item--signout" id="lc-signout">Sign Out</button>'
        + '</div>';
    } else {
      el.innerHTML = '<a href="/login" class="lc-auth-nav__signin">Sign In</a>';
    }

    var hamburger = nav.querySelector('.glass-nav__hamburger');
    if (hamburger) nav.insertBefore(el, hamburger);
    else nav.appendChild(el);

    // Wire up dropdown toggle
    var trigger = document.getElementById('lc-nav-trigger');
    var dropdown = document.getElementById('lc-nav-dropdown');
    if (trigger && dropdown) {
      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.toggle('lc-auth-nav__dropdown--open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      document.addEventListener('click', function() {
        dropdown.classList.remove('lc-auth-nav__dropdown--open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    }

    // Wire up sign out
    var signout = document.getElementById('lc-signout');
    if (signout) {
      signout.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        clearCache();
        try {
          await fetch('/api/auth/me', { method: 'DELETE', credentials: 'same-origin' });
        } catch (err) { /* ignore */ }
        window.location.href = '/';
      });
    }
  }

  async function fetchAndUpdate() {
    try {
      var res = await fetch('/api/auth/me', { credentials: 'same-origin' });
      var data = await res.json();
      if (data.authenticated) {
        setCache(data);
        renderAuthNav(data);
      } else {
        clearCache();
        renderAuthNav({ authenticated: false });
      }
    } catch (err) {
      // If server check fails, fall back to whatever cache we had (or signed-out state)
      if (!getCache()) renderAuthNav({ authenticated: false });
    }
  }

  function init() {
    var cached = getCache();
    renderAuthNav(cached || { authenticated: false });
    fetchAndUpdate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
