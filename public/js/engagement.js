/* ============================================
   LATE CULTURE — Engagement Bar
   Vanilla JS — runs on venue detail pages
   ============================================ */

(function() {
  'use strict';

  const SUPABASE_URL = 'https://gwwqzmepcppmqzlyywjq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3d3F6bWVwY3BwbXF6bHl5d2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MzM0OTIsImV4cCI6MjA5MDUwOTQ5Mn0.TkNNPalkhwvnKnybgONzF_l9QnQTjgEQNIN81sJcHLA';

  let supabase = null;
  let currentUser = null;

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

  // Initialize Supabase client
  async function initSupabase() {
    if (!window.supabase) return null;
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: { session } } = await supabase.auth.getSession();
    currentUser = session?.user || null;
    return supabase;
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

    if (!currentUser) {
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

    const progress = state.profile ? Math.min(100, (state.profile.xp_total % (50 * (state.profile.level || 1))) / (50 * (state.profile.level || 1)) * 100) : 0;

    bar.innerHTML = `
      <button class="lc-engagement__btn ${state.saved ? 'lc-engagement__btn--active' : ''}" id="lc-save-btn">
        ${heartSvg}
        Save <span class="lc-engagement__count">${state.saveCount || 0}</span>
      </button>
      <button class="lc-engagement__btn ${state.visited ? 'lc-engagement__btn--active' : ''}" id="lc-visit-btn">
        ${checkSvg}
        ${state.visited ? 'Been Here' : "I've Been Here"}
      </button>
      <div class="lc-engagement__xp">
        <span class="lc-engagement__level">Lv ${state.profile?.level || 1}</span>
        <div class="lc-engagement__bar">
          <div class="lc-engagement__bar-fill" style="width:${progress}%"></div>
        </div>
        <span>${state.profile?.xp_total || 0} XP</span>
      </div>
    `;

    document.body.appendChild(bar);

    // Attach events
    document.getElementById('lc-save-btn').addEventListener('click', handleSave);
    document.getElementById('lc-visit-btn').addEventListener('click', handleVisit);
  }

  let engagementState = { saved: false, visited: false, saveCount: 0, profile: null };

  async function handleSave() {
    const venue = window.__lcVenue;
    if (!venue || !currentUser) return;

    const res = await fetch('/api/engagement/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ venue_id: venue.slug, venue_type: venue.type, venue_slug: venue.slug }),
    });
    const data = await res.json();

    engagementState.saved = data.saved;
    engagementState.saveCount += data.saved ? 1 : -1;
    if (data.xp_gained > 0) {
      engagementState.profile.xp_total = data.total_xp;
      engagementState.profile.level = data.level;
      showToast(`+${data.xp_gained} XP`);
    }
    renderBar(engagementState);
  }

  async function handleVisit() {
    const venue = window.__lcVenue;
    if (!venue || !currentUser || engagementState.visited) return;

    const res = await fetch('/api/engagement/visit', {
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
    });
    const data = await res.json();

    engagementState.visited = true;
    if (data.xp_gained > 0) {
      engagementState.profile.xp_total = data.total_xp;
      engagementState.profile.level = data.level;
      showToast(`+${data.xp_gained} XP`);
    }
    if (data.new_badges && data.new_badges.length > 0) {
      setTimeout(() => showToast(`Badge unlocked: ${data.new_badges[0]}`), 3000);
    }
    renderBar(engagementState);
  }

  // Main init
  async function init() {
    await initSupabase();
    const venue = await waitForVenue();
    if (!venue) return;

    if (!currentUser) {
      renderBar({ saved: false, visited: false, saveCount: 0, profile: null });
      return;
    }

    // Fetch engagement status
    try {
      const res = await fetch(`/api/engagement/status?venue_id=${venue.slug}`);
      const data = await res.json();
      engagementState = {
        saved: data.saved,
        visited: data.visited,
        saveCount: data.saveCount || 0,
        profile: data.profile || { xp_total: 0, level: 1 },
      };
    } catch {
      engagementState = { saved: false, visited: false, saveCount: 0, profile: { xp_total: 0, level: 1 } };
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
