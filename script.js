const header = document.querySelector('#header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#global-nav');
const pageTop = document.querySelector('.page-top');

menuButton?.addEventListener('click', () => {
  const open = menuButton.classList.toggle('open');
  nav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});

document.querySelectorAll('#global-nav a').forEach(link => {
  link.addEventListener('click', () => {
    menuButton?.classList.remove('open');
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 12);
  pageTop?.classList.toggle('show', y > 500);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

pageTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
