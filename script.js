const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const yearTarget = document.querySelector('#current-year');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open', !expanded);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    });
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const heroSection = document.querySelector('.hero');

if (heroSection) {
  let ticking = false;
  let maxHeight = 0;
  let minHeight = 0;

  const recalcHeroRange = () => {
    const viewportBasedMax = Math.min(window.innerHeight * 0.92, 880);
    maxHeight = Math.max(viewportBasedMax, 460);
    minHeight = Math.max(Math.min(maxHeight * 0.58, 560), 320);
  };

  const applyHeroHeight = () => {
    const scrollRange = Math.max(maxHeight - minHeight, 1);
    const progress = Math.min(window.scrollY / scrollRange, 1);
    const nextHeight = maxHeight - (maxHeight - minHeight) * progress;
    heroSection.style.minHeight = `${nextHeight}px`;
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) {
      return;
    }
    ticking = true;
    window.requestAnimationFrame(applyHeroHeight);
  };

  recalcHeroRange();
  applyHeroHeight();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    recalcHeroRange();
    onScroll();
  });
}