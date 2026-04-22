(function initClock() {
  const clockEl = document.getElementById('clock');
  function updateClock() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('uk-UA', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
  updateClock();
  setInterval(updateClock, 1000);
})();

function showText() {
  const text     = document.getElementById('fontText').value || 'Привіт!';
  const size     = parseInt(document.getElementById('fontSize').value) || 24;
  const outputEl = document.getElementById('fontOutput');
  outputEl.textContent      = text;
  outputEl.style.fontSize   = size + 'px';
  outputEl.style.fontWeight = size > 40 ? '800' : '400';
  outputEl.style.color      = '#1b5e20';
}

(function initMovingImage() {
  const img   = document.getElementById('movingImg');
  const arena = document.getElementById('imgArena');
  function moveImage() {
    const arenaW = arena.offsetWidth  - 60;
    const arenaH = arena.offsetHeight - 60;
    img.style.top  = Math.floor(Math.random() * Math.max(arenaH, 10)) + 'px';
    img.style.left = Math.floor(Math.random() * Math.max(arenaW, 10)) + 'px';
  }
  setInterval(moveImage, 1000);
})();

function changePSize() {
  const container  = document.getElementById('pContainer');
  const paragraphs = container.getElementsByTagName('p');
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].setAttribute('style', 'font-size: 15px; color: #2e7d32; font-weight: 600;');
  }
  document.getElementById('pMsg').textContent = `✓ ${paragraphs.length} абзаців → 15 px`;
}

let fadeTimer = null;

function startFade() {
  const block = document.getElementById('fadeBlock');
  if (fadeTimer) return;
  let opacity = parseFloat(block.style.opacity) || 1;
  fadeTimer = setInterval(function () {
    opacity -= 0.025;
    if (opacity <= 0) {
      opacity = 0;
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
    block.style.opacity = opacity;
  }, 50);
}

function resetFade() {
  if (fadeTimer) { clearInterval(fadeTimer); fadeTimer = null; }
  document.getElementById('fadeBlock').style.opacity = '1';
}

function toggleTooltip(event) {
  event.stopPropagation();
  const tooltip = document.getElementById('tooltip');
  const btn     = document.getElementById('tooltipBtn');

  if (!tooltip.classList.contains('hidden')) {
    tooltip.classList.add('hidden');
    return;
  }

  const btnRect  = btn.getBoundingClientRect();
  const tooltipW = 240;
  const tooltipH = 110;
  const gap      = 10;
  const viewW    = window.innerWidth;
  const viewH    = window.innerHeight;

  tooltip.className = 'tooltip';

  let top, left;

  if (btnRect.bottom + tooltipH + gap < viewH) {
    top = btnRect.bottom + gap;
    tooltip.classList.add('arrow-top');
  } else {
    top = btnRect.top - tooltipH - gap;
    tooltip.classList.add('arrow-bottom');
  }

  left = btnRect.left + tooltipW < viewW
    ? btnRect.left
    : Math.max(8, viewW - tooltipW - 8);

  tooltip.style.top  = top  + 'px';
  tooltip.style.left = left + 'px';
}

document.addEventListener('click', function (e) {
  const tooltip = document.getElementById('tooltip');
  if (!tooltip.classList.contains('hidden') && !tooltip.contains(e.target) && e.target.id !== 'tooltipBtn') {
    tooltip.classList.add('hidden');
  }
});

function colorizeText() {
  const text   = document.getElementById('colorText').value;
  const colors = [
    '#e53935','#f4511e','#fb8c00','#f9a825',
    '#7cb342','#00897b','#039be5','#1e88e5',
    '#3949ab','#8e24aa','#d81b60','#6d4c41'
  ];
  const output = document.getElementById('colorOutput');
  output.innerHTML = '';
  [...text].forEach(function (char, index) {
    const span = document.createElement('span');
    span.textContent  = char === ' ' ? '\u00A0' : char;
    span.style.color  = colors[index % colors.length];
    output.appendChild(span);
  });
}

function calcCredit() {
  const S     = parseFloat(document.getElementById('credS').value);
  const p     = parseFloat(document.getElementById('credP').value);
  const years = parseFloat(document.getElementById('credY').value);
  const monthlyRate = p / 100 / 12;
  const n           = years * 12;
  let PMT;
  if (monthlyRate === 0) {
    PMT = S / n;
  } else {
    const factor = Math.pow(1 + monthlyRate, n);
    PMT = S * monthlyRate * factor / (factor - 1);
  }
  const totalPaid = PMT * n;
  const perepl    = totalPaid - S;
  const result = document.getElementById('creditResult');
  result.classList.add('visible');
  result.innerHTML = `
    <strong>Щомісячний платіж:</strong> ${PMT.toFixed(2)} грн<br>
    <strong>Загальна виплата:</strong> ${totalPaid.toFixed(2)} грн<br>
    <strong>Переплата (perepl):</strong> <span style="color:#c62828;font-weight:800">${perepl.toFixed(2)} грн</span>
  `;
}

(function initMouseKeyTracker() {
  const coordsEl = document.getElementById('mouseCoords');
  const keyEl    = document.getElementById('keyCode');
  document.addEventListener('mousemove', function (e) {
    coordsEl.textContent = ` X: ${e.clientX} · Y: ${e.clientY}`;
  });
  document.addEventListener('keydown', function (e) {
    keyEl.textContent = ` Клавіша: "${e.key}" · Код: ${e.code}`;
  });
})();

let countdownTimer = null;

function startCountdown() {
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  let seconds   = parseInt(document.getElementById('cdSecs').value) || 60;
  const display = document.getElementById('countdownDisplay');
  const note    = document.getElementById('closeNote');

  display.classList.add('active');
  note.classList.remove('hidden');

  function tick() {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    display.textContent = `${min}:${sec}`;
    if (seconds <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      display.classList.remove('active');
      display.textContent = ' Час вийшов!';
      note.classList.add('hidden');
      window.close();
      return;
    }
    seconds--;
  }

  tick();
  countdownTimer = setInterval(tick, 1000);
}

function stopCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
    document.getElementById('countdownDisplay').classList.remove('active');
    document.getElementById('closeNote').classList.add('hidden');
  }
}

