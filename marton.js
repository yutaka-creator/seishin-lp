const grid = document.querySelector('#marton-grid');
const filters = document.querySelectorAll('[data-filter]');
const moreButton = document.querySelector('#load-more');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');
let activeFilter = 'ALL';
let visibleCount = 6;

function filteredPosts() {
  return [...martonPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(post => activeFilter === 'ALL' || post.category === activeFilter);
}

function renderPosts() {
  const posts = filteredPosts();
  grid.innerHTML = posts.slice(0, visibleCount).map((post, index) => `
    <article class="diary-card ${index % 2 ? 'tilt-right' : 'tilt-left'}">
      <div class="photo-frame">
        <img src="${post.images[0]}" alt="${post.title}" loading="lazy">
      </div>
      <div class="diary-meta"><time datetime="${post.date.replaceAll('.', '-')}">${post.date}</time><span>${post.category}</span></div>
      <h2>${post.title}</h2>
      <p>${post.text}</p>
    </article>
  `).join('');
  moreButton.hidden = visibleCount >= posts.length;
}

filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('is-active'));
  button.classList.add('is-active');
  activeFilter = button.dataset.filter;
  visibleCount = 6;
  renderPosts();
}));

moreButton.addEventListener('click', () => {
  visibleCount += 6;
  renderPosts();
});

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});

renderPosts();
