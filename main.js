function toggleMenu() {
  document.getElementById('menu-overlay').classList.toggle('active');
}

function goTo(id) {
  toggleMenu();
  setTimeout(function () {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

document.getElementById('menu-overlay').addEventListener('click', function (e) {
  if (e.target === this) toggleMenu();
});
/* ===== TOP 3D Scroll ===== */

const topSection = document.querySelector('.s-top');
const topBg = document.querySelector('.s-top__bg');
const topText = document.querySelector('.tpo-text');

window.addEventListener('scroll', () => {

  if (!topSection || !topBg || !topText) return;

  const scroll = window.scrollY;
  const progress = Math.min(scroll / 847, 1);

 topBg.style.transform =
  `translateY(${progress * -24}px) scale(${1 + progress * 0.12})`;

topText.style.transform =
  `translateY(${progress * -60}px) scale(${1 + progress * 0.12})`;

topText.style.opacity =
  `${Math.max(1 - progress * 1.4, 0)}`;

topSection.style.setProperty(
  '--top-whiteout',
  Math.min(Math.max((progress - 0.28) * 2.2, 0), 0.85)
)});