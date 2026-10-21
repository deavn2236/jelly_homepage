(() => {
  const root = document.documentElement;
  let summaryLayoutFrame = 0;
  const layoutProjectSummaries = () => {
    summaryLayoutFrame = 0;
    const summaries = [...document.querySelectorAll('.project-card:not([hidden]) .project-summary')];
    summaries.forEach(summary => summary.querySelector('.project-details')?.classList.remove('is-wrapped'));
    const wrapped = summaries.filter(summary => {
      const text = summary.querySelector(`:scope > [data-lang="${root.dataset.lang}"]`);
      const link = summary.querySelector('.project-details');
      if (!text || !link) return false;
      const lines = text.getClientRects();
      const last = lines[lines.length - 1];
      return last && link.getBoundingClientRect().top > last.bottom;
    });
    wrapped.forEach(summary => summary.querySelector('.project-details').classList.add('is-wrapped'));
  };
  const scheduleSummaryLayout = () => {
    if (!summaryLayoutFrame) summaryLayoutFrame = requestAnimationFrame(layoutProjectSummaries);
  };
  let initial = 'zh';
  try { initial = sessionStorage.getItem('academic-language-v2') === 'en' ? 'en' : 'zh'; } catch {}
  const videoControlLabel = video => root.dataset.lang === 'en' ? (video.paused ? 'Play video' : 'Pause video') : (video.paused ? '播放视频' : '暂停视频');
  const setLang = (lang) => {
    root.dataset.lang = lang;
    root.lang = lang === 'zh' ? 'zh-CN' : 'en';
    try { sessionStorage.setItem('academic-language-v2', lang); } catch {}
    document.title = document.body.dataset[lang === 'zh' ? 'titleZh' : 'titleEn'];
    document.querySelectorAll('[data-set-lang]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.setLang === lang));
    });
    document.querySelectorAll('[data-title-zh]').forEach(item => { item.title = item.dataset[lang === 'zh' ? 'titleZh' : 'titleEn']; });
    document.querySelectorAll('[data-aria-zh]').forEach(item => { item.setAttribute('aria-label', item.dataset[lang === 'zh' ? 'ariaZh' : 'ariaEn']); });
    document.querySelectorAll('[data-alt-zh]').forEach(img => {
      img.alt = img.dataset[lang === 'zh' ? 'altZh' : 'altEn'];
    });
    document.querySelectorAll('video[data-label-zh]').forEach(video => {
      video.setAttribute('aria-label', video.dataset[lang === 'zh' ? 'labelZh' : 'labelEn']);
      video.parentElement.querySelector('[data-video-toggle]')?.setAttribute('aria-label', videoControlLabel(video));
    });
    scheduleSummaryLayout();
  };
  setLang(initial);
  document.querySelectorAll('[data-set-lang]').forEach(button => button.addEventListener('click', () => setLang(button.dataset.setLang)));

  const filterButtons = [...document.querySelectorAll('[data-project-filter]')];
  const projectCards = [...document.querySelectorAll('#work .project-card[data-category]')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.projectFilter;
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    projectCards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
    document.querySelectorAll('[data-project-group]').forEach(group => {
      group.hidden = ![...group.querySelectorAll('.project-card')].some(card => !card.hidden);
    });
    scheduleSummaryLayout();
  }));
  if (projectCards.length) {
    window.addEventListener('resize', scheduleSummaryLayout, { passive: true });
    document.fonts?.ready.then(scheduleSummaryLayout);
  }

  const videos = [...document.querySelectorAll('.autoplay-video')];
  const visibleVideos = new Set();
  const setSpeed = (video) => {
    const rate = Number(video.dataset.playbackRate) || 1.5;
    video.defaultPlaybackRate = rate;
    video.playbackRate = rate;
  };
  const loadPoster = (video) => {
    if (video.dataset.poster) {
      video.poster = video.dataset.poster;
      delete video.dataset.poster;
    }
  };
  const loadVideo = (video) => {
    loadPoster(video);
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    setSpeed(video);
    const source = video.querySelector('source[data-src]');
    if (source) {
      video.preload = 'metadata';
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
      video.load();
    }
  };
  const setControl = (video) => {
    const button = video.parentElement.querySelector('[data-video-toggle]');
    if (!button) return;
    button.classList.toggle('is-paused', video.paused);
    button.setAttribute('aria-label', videoControlLabel(video));
  };
  const pendingPlay = new WeakSet();
  const tryAutoplay = (video) => {
    if (document.hidden || video.dataset.userPaused || !visibleVideos.has(video) || pendingPlay.has(video)) return;
    loadVideo(video);
    if (!video.paused) return;
    pendingPlay.add(video);
    const request = video.play();
    if (!request?.then) { pendingPlay.delete(video); return; }
    request.then(() => { delete video.dataset.autoplayBlocked; }).catch(() => {
      video.dataset.autoplayBlocked = 'true';
    }).finally(() => { pendingPlay.delete(video); setControl(video); });
  };
  videos.forEach(video => {
    // Source assignment stays lazy; every visible video starts muted at 1.5×.
    video.autoplay = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    setSpeed(video);
    video.addEventListener('loadedmetadata', () => setSpeed(video));
    // Safari/Android can defer playback until the lazy source becomes playable.
    video.addEventListener('loadeddata', () => tryAutoplay(video));
    video.addEventListener('canplay', () => tryAutoplay(video));
    const button = video.parentElement.querySelector('[data-video-toggle]');
    button?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (video.paused) {
        loadVideo(video);
        delete video.dataset.userPaused;
        video.play().catch(() => setControl(video));
      } else {
        video.dataset.userPaused = 'true';
        video.pause();
      }
      setControl(video);
    });
    video.addEventListener('play', () => { setSpeed(video); setControl(video); });
    video.addEventListener('pause', () => setControl(video));
  });
  const posterObserver = new IntersectionObserver(entries => entries.forEach(({ target: video, isIntersecting }) => {
    if (isIntersecting) {
      loadPoster(video);
      posterObserver.unobserve(video);
    }
  }), { rootMargin: '200px 0px', threshold: 0 });
  const observer = new IntersectionObserver(entries => entries.forEach(({ target: video, isIntersecting, intersectionRatio }) => {
    if (isIntersecting && intersectionRatio >= 0.01) {
      visibleVideos.add(video);
      if (!video.dataset.userPaused && !document.hidden) {
        tryAutoplay(video);
      }
    } else {
      visibleVideos.delete(video);
      video.pause();
    }
  }), { rootMargin: '0px', threshold: [0, 0.01] });
  videos.forEach(video => {
    posterObserver.observe(video);
    observer.observe(video);
  });
  document.addEventListener('visibilitychange', () => videos.forEach(video => {
    if (document.hidden) video.pause();
    else if (!video.dataset.userPaused && visibleVideos.has(video)) {
      tryAutoplay(video);
    }
  }));
  window.addEventListener('pageshow', () => visibleVideos.forEach(tryAutoplay));
  window.addEventListener('focus', () => visibleVideos.forEach(tryAutoplay));
  // A browser's power/data-saving policy may require a gesture. Resume only
  // blocked visible videos, preserving an intentional pause by the visitor.
  const resumeBlocked = () => visibleVideos.forEach(video => {
    if (video.dataset.autoplayBlocked) tryAutoplay(video);
  });
  document.addEventListener('touchend', resumeBlocked, { passive: true });
  document.addEventListener('pointerdown', resumeBlocked, { passive: true });
})();
