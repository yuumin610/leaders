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
const topFront = document.querySelector('.s-top__front');

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

  if (topFront) {
  topFront.style.transform =
    `translateY(${progress * -120}px) scale(${1 + progress * 0.18})`;
}

topSection.style.setProperty(
  '--top-whiteout',
  Math.min(Math.max((progress - 0.28) * 2.2, 0), 0.85)
);

topSection.style.setProperty(
  '--top-foreground-y',
  `${progress * -150}px`
);

topSection.style.setProperty(
  '--top-foreground-scale',
  `${1 + progress * 0.35}`
);
});

/* ===== FIGHT Button Animation ===== */
const fightSection = document.querySelector('.s-fight');
const fightBtn = document.querySelector('.s-fight .fight-btn');
const fightMessage = document.querySelector('.s-fight .fight-message');
const fightBtnLabel = document.querySelector('.s-fight .fight-btn__label');

if (fightSection && fightBtn) {
  const fightEffects = [
    { type: 'note', text: '♪', x: 0, y: -132, r: '-8deg', size: '18px', delay: '.05s', color: '#33AD8B' },
    { type: 'note', text: '♩', x: 92, y: -84, r: '14deg', size: '17px', delay: '.12s', color: '#5CC7A5' },
    { type: 'note', text: '♫', x: 128, y: 0, r: '-6deg', size: '20px', delay: '.08s', color: '#33AD8B' },
    { type: 'note', text: '♪', x: 78, y: 88, r: '18deg', size: '17px', delay: '.18s', color: '#42301D' },
    { type: 'note', text: '♬', x: -122, y: 18, r: '-16deg', size: '18px', delay: '.14s', color: '#42301D' },
    { type: 'note', text: '♪', x: -86, y: -92, r: '12deg', size: '18px', delay: '.1s', color: '#5CC7A5' },
    { type: 'leaf', x: -18, y: -68, r: '-18deg', size: '15px', delay: '.02s', color: '#33AD8B' },
    { type: 'leaf', x: 54, y: -118, r: '38deg', size: '17px', delay: '.06s', color: '#5CC7A5' },
    { type: 'leaf', x: 112, y: -54, r: '-32deg', size: '18px', delay: '.13s', color: '#2A9476' },
    { type: 'leaf', x: 150, y: 26, r: '42deg', size: '16px', delay: '.1s', color: '#33AD8B' },
    { type: 'leaf', x: 88, y: 112, r: '-28deg', size: '17px', delay: '.17s', color: '#5CC7A5' },
    { type: 'leaf', x: -6, y: 142, r: '24deg', size: '16px', delay: '.2s', color: '#2A9476' },
    { type: 'leaf', x: -112, y: 74, r: '-44deg', size: '18px', delay: '.12s', color: '#33AD8B' },
    { type: 'leaf', x: -142, y: -34, r: '34deg', size: '15px', delay: '.15s', color: '#5CC7A5' },
    { type: 'petal', x: 20, y: -150, r: '28deg', size: '17px', delay: '.05s', color: '#F3A6B8' },
    { type: 'petal', x: 120, y: -96, r: '-20deg', size: '18px', delay: '.14s', color: '#E16B8C' },
    { type: 'petal', x: 84, y: 42, r: '30deg', size: '15px', delay: '.03s', color: '#F6EEF0' },
    { type: 'petal', x: 118, y: 102, r: '-36deg', size: '17px', delay: '.18s', color: '#F3A6B8' },
    { type: 'petal', x: 28, y: 76, r: '18deg', size: '15px', delay: '.09s', color: '#E16B8C' },
    { type: 'petal', x: -70, y: 116, r: '-26deg', size: '18px', delay: '.2s', color: '#F6EEF0' },
    { type: 'petal', x: -150, y: 6, r: '36deg', size: '16px', delay: '.07s', color: '#F3A6B8' },
    { type: 'petal', x: -114, y: -112, r: '-22deg', size: '17px', delay: '.16s', color: '#E16B8C' }
  ];

  fightBtn.addEventListener('click', function () {
    const sectionRect = fightSection.getBoundingClientRect();
    const btnRect = fightBtn.getBoundingClientRect();
    const startX = btnRect.left - sectionRect.left + btnRect.width / 2;
    const startY = btnRect.top - sectionRect.top + btnRect.height / 2;

    fightBtn.classList.remove('is-pressed');
    void fightBtn.offsetWidth;
    fightBtn.classList.add('is-pressed');
    fightBtn.classList.add('is-complete');

    if (fightBtnLabel) {
      fightBtnLabel.textContent = '楽しむ準備完了！';
    }

    if (fightMessage) {
      fightMessage.classList.remove('is-bright');
      void fightMessage.offsetWidth;
      fightMessage.classList.add('is-bright');
    }

    fightSection.querySelectorAll('.fight-effect').forEach(function (effect) {
      effect.remove();
    });

    const ring = document.createElement('span');
    ring.className = 'fight-effect fight-effect--ring';
    ring.style.setProperty('--start-x', startX + 'px');
    ring.style.setProperty('--start-y', startY + 'px');
    fightSection.appendChild(ring);
    ring.addEventListener('animationend', function () {
      ring.remove();
    }, { once: true });

    fightEffects.forEach(function (item) {
      const effect = document.createElement('span');
      effect.className = 'fight-effect fight-effect--' + item.type;
      effect.style.setProperty('--start-x', startX + 'px');
      effect.style.setProperty('--start-y', startY + 'px');
      effect.style.setProperty('--move-x', item.x + 'px');
      effect.style.setProperty('--move-y', item.y + 'px');
      effect.style.setProperty('--rotate', item.r);
      effect.style.setProperty('--size', item.size);
      effect.style.setProperty('--delay', item.delay);
      effect.style.setProperty('--effect-color', item.color);

      if (item.text) {
        effect.textContent = item.text;
      }

      fightSection.appendChild(effect);
      effect.addEventListener('animationend', function () {
        effect.remove();
      }, { once: true });
    });
  });
}
