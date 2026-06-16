document.addEventListener('DOMContentLoaded', () => {
  const doneButtons = document.querySelectorAll('.done-btn');
  const page = document.querySelector('.page');
  let finalePlayed = false;

  const imagePairs = [
    ['image/step1-before.png', 'image/step1-after.png'],
    ['image/step2-before.png', 'image/step2-after.png'],
    ['image/step3-before.png', 'image/step3-after.png'],
  ];

  document.querySelectorAll('.illus-box').forEach((box, index) => {
    const pair = imagePairs[index];

    if (!pair) {
      return;
    }

    const switcher = document.createElement('div');
    switcher.className = 'illus-switch';

    const beforeImage = document.createElement('img');
    beforeImage.className = 'step-illus step-illus--before';
    beforeImage.src = pair[0];
    beforeImage.alt = '';

    const afterImage = document.createElement('img');
    afterImage.className = 'step-illus step-illus--after';
    afterImage.src = pair[1];
    afterImage.alt = '';

    switcher.append(beforeImage, afterImage);
    box.appendChild(switcher);

    let loadedCount = 0;
    const markLoaded = () => {
      loadedCount += 1;

      if (loadedCount === 2) {
        box.classList.add('has-illus-images');
      }
    };

    [beforeImage, afterImage].forEach((image) => {
      if (image.complete && image.naturalWidth > 0) {
        markLoaded();
      } else {
        image.addEventListener('load', markLoaded, { once: true });
      }
    });
  });

  const addCardParticles = (card) => {
    const particles = document.createElement('div');
    particles.className = 'growth-particles';

    for (let i = 0; i < 4; i += 1) {
      particles.appendChild(document.createElement('span'));
    }

    card.appendChild(particles);

    window.setTimeout(() => {
      particles.remove();
    }, 1200);
  };

  const createFinaleItem = (item) => {
    const element = document.createElement('span');
    element.className = item.className;

    if (item.text) {
      element.textContent = item.text;
    }

    Object.entries(item.style).forEach(([property, value]) => {
      element.style.setProperty(property, value);
    });

    return element;
  };

  const playForestFinale = () => {
    if (!page) {
      return;
    }

    const finale = document.createElement('div');
    finale.className = 'forest-finale';

    const items = [
      { className: 'finale-leaf', style: { '--x': '18%', '--y': '72%', '--delay': '0s', '--peak': '0.56', '--drift-mid': '12px', '--drift-end': '-4px', '--rot': '-18deg', '--rot-mid': '8deg', '--rot-end': '18deg', '--scale': '1.1' } },
      { className: 'finale-petal', style: { '--x': '32%', '--y': '68%', '--delay': '0.08s', '--peak': '0.52', '--drift-mid': '-10px', '--drift-end': '8px', '--rot': '12deg', '--rot-mid': '-10deg', '--rot-end': '-18deg', '--scale': '0.9' } },
      { className: 'finale-leaf', style: { '--x': '46%', '--y': '76%', '--delay': '0.16s', '--peak': '0.48', '--drift-mid': '8px', '--drift-end': '16px', '--rot': '-10deg', '--rot-mid': '12deg', '--rot-end': '20deg', '--scale': '0.85' } },
      { className: 'finale-petal', style: { '--x': '62%', '--y': '70%', '--delay': '0.24s', '--peak': '0.6', '--drift-mid': '13px', '--drift-end': '-8px', '--rot': '-8deg', '--rot-mid': '10deg', '--rot-end': '16deg', '--scale': '1' } },
      { className: 'finale-leaf', style: { '--x': '76%', '--y': '74%', '--delay': '0.32s', '--peak': '0.5', '--drift-mid': '-12px', '--drift-end': '-18px', '--rot': '18deg', '--rot-mid': '-6deg', '--rot-end': '-16deg', '--scale': '0.95' } },
      { className: 'finale-petal', style: { '--x': '24%', '--y': '61%', '--delay': '0.4s', '--peak': '0.42', '--drift-mid': '10px', '--drift-end': '2px', '--rot': '6deg', '--rot-mid': '-12deg', '--rot-end': '-20deg', '--scale': '0.82' } },
      { className: 'finale-leaf', style: { '--x': '58%', '--y': '58%', '--delay': '0.48s', '--peak': '0.45', '--drift-mid': '-8px', '--drift-end': '10px', '--rot': '-16deg', '--rot-mid': '9deg', '--rot-end': '15deg', '--scale': '0.78' } },
      { className: 'finale-note', text: '\u266a', style: { '--x': '35%', '--y': '66%', '--delay': '0.18s', '--peak': '0.62', '--drift-mid': '-6px', '--drift-end': '-12px', '--rot': '-4deg', '--rot-mid': '4deg', '--rot-end': '8deg', '--scale': '0.95', '--size': '18px', '--color': '#33AD8B' } },
      { className: 'finale-note', text: '\u2669', style: { '--x': '68%', '--y': '63%', '--delay': '0.36s', '--peak': '0.48', '--drift-mid': '7px', '--drift-end': '12px', '--rot': '3deg', '--rot-mid': '-3deg', '--rot-end': '-8deg', '--scale': '0.85', '--size': '16px', '--color': '#5CC7A5' } },
      { className: 'finale-note', text: '\u266b', style: { '--x': '50%', '--y': '55%', '--delay': '0.56s', '--peak': '0.4', '--drift-mid': '5px', '--drift-end': '-6px', '--rot': '-5deg', '--rot-mid': '5deg', '--rot-end': '10deg', '--scale': '0.8', '--size': '15px', '--color': '#33AD8B' } },
    ];

    items.forEach((item) => {
      finale.appendChild(createFinaleItem(item));
    });

    page.appendChild(finale);

    window.setTimeout(() => {
      finale.remove();
    }, 2800);
  };

  const updateFinale = () => {
    const allDone = Array.from(doneButtons).every((button) => button.classList.contains('done'));

    if (allDone && !finalePlayed) {
      finalePlayed = true;
      playForestFinale();
    }

    if (!allDone) {
      finalePlayed = false;
    }
  };

  doneButtons.forEach((button) => {
    const card = button.closest('.card');

    button.addEventListener('click', () => {
      const isDone = button.classList.toggle('done');

      if (card) {
        card.classList.toggle('is-done', isDone);
        card.classList.remove('is-growing');

        if (isDone) {
          void card.offsetWidth;
          card.classList.add('is-growing');
          addCardParticles(card);
        }
      }

      updateFinale();
    });
  });
});
