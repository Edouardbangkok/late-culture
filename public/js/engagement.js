/* ============================================
   LATE CULTURE — Engagement Bar
   Vanilla JS — runs on venue detail pages
   ============================================ */

(function() {
  'use strict';

  // Wait for venue data to be available
  function waitForVenue() {
    return new Promise(resolve => {
      if (window.__lcVenue) return resolve(window.__lcVenue);
      let tries = 0;
      const check = setInterval(() => {
        if (window.__lcVenue || tries > 50) {
          clearInterval(check);
          resolve(window.__lcVenue || null);
        }
        tries++;
      }, 200);
    });
  }

  // Show XP toast
  function showToast(message) {
    let toast = document.querySelector('.lc-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'lc-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('lc-toast--visible');
    setTimeout(() => toast.classList.remove('lc-toast--visible'), 2500);
  }

  // Render engagement bar
  function renderBar(state) {
    const existing = document.querySelector('.lc-engagement');
    if (existing) existing.remove();

    const bar = document.createElement('div');
    bar.className = 'lc-engagement';

    if (!state.authenticated) {
      bar.innerHTML = '<div class="lc-engagement__signin">Sign in to save places and track your Bangkok journey. <a href="/login">Sign In</a></div>';
      document.body.appendChild(bar);
      return;
    }

    const heartSvg = state.saved
      ? '<svg viewBox="0 0 24 24" fill="#D4788A" stroke="#D4788A" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';

    const checkSvg = state.visited
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="#D4788A" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 10"/></svg>';

    const level = state.profile?.level || 1;
    const xpTotal = state.profile?.xp_total || 0;
    const levelXp = 50 * level;
    const progress = levelXp > 0 ? Math.min(100, ((xpTotal % levelXp) / levelXp) * 100) : 0;

    var visitLabel = state.visitedToday ? 'Checked In' : (state.visitCount > 0 ? 'Back Again (' + state.visitCount + ')' : "I've Been Here");
    var visitDisabled = state.visitedToday ? ' lc-engagement__btn--disabled' : '';

    var ambassadorHtml = '';
    if (state.ambassador) {
      var ambAvatar = state.ambassador.avatar_url
        ? '<img src="' + state.ambassador.avatar_url + '" style="width:18px;height:18px;border-radius:50%;object-fit:cover;">'
        : '';
      ambassadorHtml = '<div class="lc-engagement__ambassador">'
        + ambAvatar
        + '<span>Ambassador: <a href="/u/' + state.ambassador.username + '">' + (state.ambassador.display_name || state.ambassador.username) + '</a> (' + state.ambassador.visit_count + ' visits)</span>'
        + '</div>';
    }

    bar.innerHTML = ambassadorHtml
      + '<div class="lc-engagement__actions">'
      + '<button class="lc-engagement__btn ' + (state.saved ? 'lc-engagement__btn--active' : '') + '" id="lc-save-btn">'
      + heartSvg + ' Save <span class="lc-engagement__count">' + (state.saveCount || 0) + '</span>'
      + '</button>'
      + '<div class="lc-engagement__divider"></div>'
      + '<button class="lc-engagement__btn ' + (state.visitCount > 0 ? 'lc-engagement__btn--active' : '') + visitDisabled + '" id="lc-visit-btn">'
      + checkSvg + ' ' + visitLabel
      + '</button>'
      + '<div class="lc-engagement__xp">'
      + '<span class="lc-engagement__level">Lv ' + level + '</span>'
      + '<div class="lc-engagement__bar"><div class="lc-engagement__bar-fill" style="width:' + progress + '%"></div></div>'
      + '<span class="lc-engagement__xp-num">' + xpTotal + ' XP</span>'
      + '</div>'
      + '</div>';

    document.body.appendChild(bar);

    document.getElementById('lc-save-btn').addEventListener('click', handleSave);
    document.getElementById('lc-visit-btn').addEventListener('click', handleVisit);
  }

  let engagementState = { authenticated: false, saved: false, visited: false, saveCount: 0, profile: null };

  async function handleSave() {
    if (!engagementState.authenticated) return;
    const venue = window.__lcVenue;
    if (!venue) return;

    // Optimistic update — instant feedback
    const wasSaved = engagementState.saved;
    engagementState.saved = !wasSaved;
    engagementState.saveCount += wasSaved ? -1 : 1;
    if (!wasSaved) {
      engagementState.profile.xp_total = (engagementState.profile.xp_total || 0) + 5;
      showToast('+5 XP');
    }
    renderBar(engagementState);

    // Background API call
    fetch('/api/engagement/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ venue_id: venue.slug, venue_type: venue.type, venue_slug: venue.slug }),
    }).then(r => r.json()).then(data => {
      if (data.error) { engagementState.saved = wasSaved; renderBar(engagementState); }
      if (data.level) engagementState.profile.level = data.level;
      if (data.total_xp) engagementState.profile.xp_total = data.total_xp;
    }).catch(() => { engagementState.saved = wasSaved; renderBar(engagementState); });
  }

  async function handleVisit() {
    if (!engagementState.authenticated || engagementState.visited) return;
    const venue = window.__lcVenue;
    if (!venue) return;

    // Optimistic update — instant feedback
    engagementState.visited = true;
    engagementState.profile.xp_total = (engagementState.profile.xp_total || 0) + 15;
    showToast('+15 XP');
    renderBar(engagementState);

    // Background API call
    fetch('/api/engagement/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        venue_id: venue.slug,
        venue_type: venue.type,
        venue_slug: venue.slug,
        venue_name: venue.name,
        venue_neighborhood: venue.neighborhood,
        venue_category: venue.category,
      }),
    }).then(r => r.json()).then(data => {
      if (data.level) engagementState.profile.level = data.level;
      if (data.total_xp) engagementState.profile.xp_total = data.total_xp;
      if (data.new_badges && data.new_badges.length > 0) {
        showToast('Badge: ' + data.new_badges[0]);
      }
      renderBar(engagementState);
    }).catch(() => {});
  }

  // Main init — uses API to check auth (server-side cookies)
  async function init() {
    const venue = await waitForVenue();
    if (!venue) return;

    try {
      const res = await fetch(`/api/engagement/status?venue_id=${venue.slug}`, {
        credentials: 'same-origin',
      });
      const data = await res.json();

      engagementState = {
        authenticated: data.authenticated !== false,
        saved: data.saved || false,
        visited: data.visited || false,
        saveCount: data.saveCount || 0,
        profile: data.profile || { xp_total: 0, level: 1 },
      };
    } catch {
      engagementState = { authenticated: false, saved: false, visited: false, saveCount: 0, profile: null };
    }

    renderBar(engagementState);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
