/* ============================================
   LATE CULTURE — Auth Nav State
   Avatar with dropdown menu when logged in
   Uses localStorage cache for instant display
   ============================================ */

(function() {
  'use strict';

  var CACHE_KEY = 'lc_auth_nav';

  function getCache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY)); } catch(e) { return null; }
  }
  function setCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch(e) {}
  }
  function clearCache() {
    try { localStorage.removeItem(CACHE_KEY); } catch(e) {}
  }

  function renderAuthNav(state) {
    var nav = document.querySelector('.glass-nav__inner');
    if (!nav) return;

    var existing = document.querySelector('.lc-auth-nav');
    if (existing) existing.remove();

    var el = document.createElement('div');
    el.className = 'lc-auth-nav';

    if (state && state.authenticated) {
      var avatar = state.avatar_url;
      var level = state.level || 1;
      var name = state.display_name || 'U';
      var initial = name.charAt(0).toUpperCase();

      var avatarHtml = avatar
        ? '<img src="' + avatar + '" alt="" class="lc-auth-nav__avatar">'
        : '<div class="lc-auth-nav__avatar-placeholder">' + initial + '</div>';

      el.innerHTML = '<div class="lc-auth-nav__trigger" id="lc-nav-trigger">'
        + avatarHtml
        + '<span class="lc-auth-nav__level">Lv ' + level + '</span>'
        + '</div>'
        + '<div class="lc-auth-nav__dropdown" id="lc-nav-dropdown">'
        + '<a href="/profile" class="lc-auth-nav__dropdown-item">My Profile</a>'
        + '<a href="/plan-my-night" class="lc-auth-nav__dropdown-item">Plan My Night</a>'
        + '<a href="/collections" class="lc-auth-nav__dropdown-item">Collections</a>'
        + '<a href="/community" class="lc-auth-nav__dropdown-item">Find People</a>'
        + '<a href="/the-people-spoke" class="lc-auth-nav__dropdown-item">The People Spoke</a>'
        + '<div class="lc-auth-nav__dropdown-divider"></div>'
        + '<a href="#" class="lc-auth-nav__dropdown-item lc-auth-nav__dropdown-item--signout" id="lc-signout">Sign Out</a>'
        + '</div>';
    } else {
      el.innerHTML = '<a href="/login" class="lc-auth-nav__signin">Sign In</a>';
    }

    var hamburger = nav.querySelector('.glass-nav__hamburger');
    if (hamburger) nav.insertBefore(el, hamburger);
    else nav.appendChild(el);

    // Dropdown toggle
    var trigger = document.getElementById('lc-nav-trigger');
    var dropdown = document.getElementById('lc-nav-dropdown');
    if (trigger && dropdown) {
      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('lc-auth-nav__dropdown--open');
      });
      document.addEventListener('click', function() {
        dropdown.classList.remove('lc-auth-nav__dropdown--open');
      });
    }

    // Sign out
    var signout = document.getElementById('lc-signout');
    if (signout) {
      signout.addEventListener('click', function(e) {
        e.preventDefault();
        clearCache();
        // Clear Supabase cookies by calling a simple endpoint or just redirect
        window.location.href = '/login';
      });
    }
  }

  // Add Plan My Night, Collections, Find People to mobile menu
  function updateMobileMenu() {
    var mobileNav = document.querySelector('.mobile-menu__nav');
    if (!mobileNav) return;
    if (mobileNav.querySelector('[href="/plan-my-night"]')) return; // already added

    var cached = getCache();

    var extraLinks = '<div style="margin-top:32px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1);display:flex;flex-direction:column;align-items:center;gap:24px;">'
      + '<a href="/plan-my-night" class="mobile-menu__link" style="display:block;font-size:clamp(20px,5vw,32px);">Plan My Night</a>'
      + '<a href="/collections" class="mobile-menu__link" style="display:block;font-size:clamp(20px,5vw,32px);">Collections</a>'
      + '<a href="/community" class="mobile-menu__link" style="display:block;font-size:clamp(20px,5vw,32px);">Find People</a>'
      + '</div>';

    if (cached && cached.authenticated) {
      extraLinks += '<div style="margin-top:32px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1);display:flex;flex-direction:column;align-items:center;gap:16px;">'
        + '<a href="/profile" class="mobile-menu__link" style="display:block;font-size:clamp(18px,4vw,24px);color:#D4788A;">My Profile</a>'
        + '</div>';
    } else {
      extraLinks += '<div style="margin-top:32px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1);display:flex;flex-direction:column;align-items:center;gap:16px;">'
        + '<a href="/login" class="mobile-menu__link" style="font-size:clamp(18px,4vw,24px);color:#D4788A;">Sign In</a>'
        + '</div>';
    }

    mobileNav.insertAdjacentHTML('beforeend', extraLinks);
  }

  async function fetchAndUpdate() {
    try {
      var res = await fetch('/api/engagement/status?venue_id=_check', { credentials: 'same-origin' });
      var data = await res.json();

      if (data.authenticated) {
        var profileRes = await fetch('/api/profile/me', { credentials: 'same-origin' });
        var profileData = await profileRes.json();
        var profile = profileData.profile || {};

        var state = {
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
    } catch(e) {
      if (!getCache()) renderAuthNav({ authenticated: false });
    }
  }

  function init() {
    var cached = getCache();
    renderAuthNav(cached || { authenticated: false });
    updateMobileMenu();
    fetchAndUpdate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
