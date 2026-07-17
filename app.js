// Initialize Telegram WebApp SDK if available
const tg = window.Telegram?.WebApp;

const TELEGRAM_THEME_COLORS = {
  default: '--bg-primary',
  games: '--bg-games',
  mainWindow: '--bg-main-window',
};

const TELEGRAM_THEME_FALLBACKS = {
  default: '#0a0a0d',
  games: '#0e0c06',
  mainWindow: '#06162f',
};

function getThemeColor(themeName = 'default') {
  const cssVariable = TELEGRAM_THEME_COLORS[themeName] || TELEGRAM_THEME_COLORS.default;
  const fallback = TELEGRAM_THEME_FALLBACKS[themeName] || TELEGRAM_THEME_FALLBACKS.default;
  const color = getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();

  return color || fallback;
}

function setTelegramChromeColor(themeName = 'default') {
  if (!tg) return;

  const color = getThemeColor(themeName);
  tg.setBackgroundColor(color);
  tg.setHeaderColor(color);
}

if (tg) {
  // Let Telegram know the app is ready and expand it to full viewport height
  tg.ready();
  tg.expand();
  tg.disableVerticalSwipes?.();
  
  // Keep Telegram's native top bar visually merged with the current app background.
  setTelegramChromeColor('default');

  function applyTelegramSafeArea() {
    const contentInsets = tg.contentSafeAreaInset;
    const safeInsets = tg.safeAreaInset;
    const rawTopInset = Math.max(contentInsets?.top || 0, safeInsets?.top || 0);
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const hasModernIphoneSafeArea = isIos && rawTopInset >= 44;
    const fullscreenControlsTopInset = hasModernIphoneSafeArea ? 88 : 0;

    const insets = {
      top: Math.max(rawTopInset, fullscreenControlsTopInset),
      right: Math.max(contentInsets?.right || 0, safeInsets?.right || 0),
      bottom: Math.max(contentInsets?.bottom || 0, safeInsets?.bottom || 0),
      left: Math.max(contentInsets?.left || 0, safeInsets?.left || 0),
    };

    document.body.style.paddingTop = `${insets.top}px`;
    document.body.style.paddingRight = `${insets.right}px`;
    document.body.style.paddingBottom = '0px';
    document.body.style.paddingLeft = `${insets.left}px`;
    document.documentElement.style.setProperty('--telegram-safe-area-bottom', `${insets.bottom}px`);
  }

  applyTelegramSafeArea();
  tg.onEvent?.('safeAreaChanged', applyTelegramSafeArea);
  tg.onEvent?.('contentSafeAreaChanged', applyTelegramSafeArea);
  tg.onEvent?.('safe_area_changed', applyTelegramSafeArea);
  tg.onEvent?.('content_safe_area_changed', applyTelegramSafeArea);
  tg.onEvent?.('fullscreenChanged', applyTelegramSafeArea);
  tg.onEvent?.('fullscreen_changed', applyTelegramSafeArea);
  tg.onEvent?.('viewportChanged', () => {
    tg.expand();
    tg.disableVerticalSwipes?.();
  });
  tg.onEvent?.('viewport_changed', () => {
    tg.expand();
    tg.disableVerticalSwipes?.();
  });
}

// App State
let gems = 1250;

// DOM Elements
const gemsBlock = document.getElementById('gemsBlock');
const gemsCount = document.getElementById('gemsCount');

// Helper to format numbers with commas (e.g., 1,250)
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Set initial value
gemsCount.textContent = formatNumber(gems);

// Trigger standard haptic vibration via Telegram WebApp
function triggerHaptic(style = 'light') {
  if (tg && tg.HapticFeedback) {
    tg.HapticFeedback.impactOccurred(style);
  }
}

function mockSendToServer(element, payload = {}) {
  const action = element.dataset.mockAction || element.id || 'mock-action';
  const endpoint = element.dataset.mockEndpoint || '/api/mock';
  const loadingText = element.dataset.mockLoadingText || 'Отправка...';
  const successText = element.dataset.mockSuccessText || 'Готово';
  const mockStatus = element.dataset.mockStatus || 'success';

  if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.tagName === 'INPUT') {
    const originalText = element.textContent?.trim() || '';
    element.dataset.__originalText = originalText;
    element.disabled = true;
    element.textContent = loadingText;
  }

  console.info(`[mock] -> POST ${endpoint}`, { action, payload });

  return new Promise((resolve) => setTimeout(resolve, 700)).then(() => {
    const response = {
      ok: mockStatus === 'success',
      mocked: true,
      action,
      endpoint,
      payload,
      status: mockStatus === 'success' ? 200 : 500,
      message: mockStatus === 'success' ? 'mock response: success' : 'mock response: error'
    };

    console.info(`[mock] <- ${endpoint}`, response);

    if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.tagName === 'INPUT') {
      element.textContent = successText;
    }

    return response;
  }).finally(() => {
    if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.tagName === 'INPUT') {
      const originalText = element.dataset.__originalText || '';
      element.disabled = false;
      element.textContent = originalText;
    }
  });
}

// Animate the gems count incrementing smoothly
function animateGemsCount(targetValue) {
  const startValue = gems;
  const duration = 800; // ms
  const startTime = performance.now();
  
  gems = targetValue; // Update state
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out expo curve for standard decelerating feel
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
    
    gemsCount.textContent = formatNumber(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      gemsCount.textContent = formatNumber(targetValue);
    }
  }
  
  requestAnimationFrame(update);
}

// Pulse the entire gems block to give visual feedback
function pulseGemsBlock() {
  gemsBlock.style.transform = 'scale(1.12)';
  
  setTimeout(() => {
    gemsBlock.style.transform = '';
  }, 150);
}

// Tab Switching Logic
const navItems = document.querySelectorAll('.nav-item');
const tabPages = document.querySelectorAll('.tab-page');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const tabName = item.getAttribute('data-tab');
    if (!tabName) return;

    // Trigger haptic response
    triggerHaptic('light');

    if (tabName === 'cases') {
      showSoonToast();
      return;
    }

    // Update active tab button style
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    // Switch visible tab page
    tabPages.forEach(page => {
      if (page.id === `tab-${tabName}`) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    // Restore default logo when switching to any standard tab
    if (brandLogo) {
      brandLogo.src = 'TeleFest.webp';
      brandLogo.alt = 'Tele Fest';
      brandLogo.style.height = '';
    }

    document.body.classList.remove('theme-feastables', 'theme-games', 'theme-main-window');

    if (tabName === 'games') {
      document.body.classList.add('theme-games');
      setTelegramChromeColor('games');
    } else {
      setTelegramChromeColor('default');
    }
  });
});

// Gems Counter click animation
gemsBlock.addEventListener('click', () => {
  triggerHaptic('light');
  pulseGemsBlock();
  
  const img = gemsBlock.querySelector('.gems-icon');
  if (img) {
    img.style.transform = 'scale(1.3) rotate(15deg)';
    setTimeout(() => {
      img.style.transform = '';
    }, 200);
  }
});

// Main page remains simple and case-based flow is removed.
const photoCard = document.getElementById('photoCard');
const photoView = document.getElementById('photoView');
const brandLogo = document.getElementById('brandLogo');
const mainOverlay = document.getElementById('mainOverlay');
const mainOverlayBackdrop = document.getElementById('mainOverlayBackdrop');
const closeMainOverlayBtn = document.getElementById('closeMainOverlayBtn');

function openMainOverlay() {
  if (brandLogo) {
    brandLogo.src = 'Feastables.png';
    brandLogo.alt = 'Feastables';
  }

  mainOverlay?.classList.add('active');
  mainOverlayBackdrop?.classList.add('active');
}

function closeMainOverlay() {
  mainOverlay?.classList.remove('active');
  mainOverlayBackdrop?.classList.remove('active');

  if (brandLogo) {
    brandLogo.src = 'TeleFest.webp';
    brandLogo.alt = 'Tele Fest';
  }
}

if (photoCard && photoView) {
  photoCard.addEventListener('click', async () => {
    triggerHaptic('light');
    
    // Switch visible tab page to the empty one
    tabPages.forEach(page => {
      if (page.id === 'tab-main-window') {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
    
    // Remove active class from nav items
    navItems.forEach(nav => nav.classList.remove('active'));
    
    // Change logo to Feastables
    if (brandLogo) {
      brandLogo.src = 'Feastables.png';
      brandLogo.alt = 'Feastables';
      brandLogo.style.height = '40px';
    }

    document.body.classList.remove('theme-feastables', 'theme-games');
    document.body.classList.add('theme-main-window');
    setTelegramChromeColor('mainWindow');
  });
}

// Generate scattered dots for the Games tab background
(function spawnGamesDots() {
  const containers = document.querySelectorAll('.games-dots');
  if (!containers.length) return;

  const DOT_COUNT = 70;

  containers.forEach(container => {
    for (let i = 0; i < DOT_COUNT; i++) {
      const dot = document.createElement('div');
      dot.className = 'games-dot';

    const size  = 1 + Math.random() * 2;          // 1–3 px
      const x     = Math.random() * 100;
      const y     = Math.random() * 100;
      const op    = (0.2 + Math.random() * 0.6).toFixed(2);

      dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      opacity: ${op};
      `;

      container.appendChild(dot);
    }
  });
})();

let soonToast = null;
let soonToastTimeout = null;


function showSoonToast() {
  if (!soonToast) {
    soonToast = document.createElement('div');
    soonToast.className = 'soon-toast';
    soonToast.textContent = 'Скоро...';
    document.body.appendChild(soonToast);
  }
  
  soonToast.classList.remove('show');
  clearTimeout(soonToastTimeout);
  
  setTimeout(() => {
    soonToast.classList.add('show');
    triggerHaptic('medium');
    soonToastTimeout = setTimeout(() => {
      soonToast.classList.remove('show');
    }, 1500);
  }, 10);
}

if (closeMainOverlayBtn) {
  closeMainOverlayBtn.addEventListener('click', closeMainOverlay);
}

if (mainOverlayBackdrop) {
  mainOverlayBackdrop.addEventListener('click', closeMainOverlay);
}

const possiblePrizes = [
  { name: "100 Gems", img: "gems.webp", desc: "Куча драгоценных камней для вашего баланса!" },
  { name: "500 Gems", img: "gems.webp", desc: "Огромный мешок с сверкающими гемами!" },
  { name: "Telegram Star", img: "stars-DBKMczxe.png", desc: "Официальная золотая звезда Telegram." },
  { name: "TeleFest WebApp", img: "TeleFest.webp", desc: "Официальный логотип-награда TeleFest." },
  { name: "1,000 Gems", img: "gems.webp", desc: "Невероятное богатство драгоценных камней!" },
  { name: "Супер-Приз", img: "forzaBnner", desc: "Легендарный секретный подарок от организаторов." }
];

const caseCards = document.querySelectorAll('.case-card');
const confirmBackdrop = document.getElementById('confirmBackdrop');
const confirmBottomSheet = document.getElementById('confirmBottomSheet');
const sheetCasePhoto = document.getElementById('sheetCasePhoto');
const sheetCasePrice = document.getElementById('sheetCasePrice');
const confirmCancelBtn = document.getElementById('confirmCancelBtn');
const confirmOpenBtn = document.getElementById('confirmOpenBtn');

const rouletteOverlay = document.getElementById('rouletteOverlay');
const rouletteReel = document.getElementById('rouletteReel');
const skipAnimBtn = document.getElementById('skipAnimBtn');
const winOverlay = document.getElementById('winOverlay');
const winPrizeImg = document.getElementById('winPrizeImg');
const winPrizeName = document.getElementById('winPrizeName');
const winPrizeDesc = document.getElementById('winPrizeDesc');
const winPhotoWrapper = document.getElementById('winPhotoWrapper');
const collectBtn = document.getElementById('collectBtn');

let selectedCase = null;
let activeTickCancel = null;
let spinTimeout = null;
let winningPrize = null;
let isCollectingPrize = false;

function closeBottomSheet() {
  confirmBackdrop.classList.remove('active');
  confirmBottomSheet.classList.remove('active');
}

caseCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    triggerHaptic('medium');
    selectedCase = {
      index: index + 1,
      price: card.querySelector('.price-val').textContent,
      gradientClass: `case-card-${index + 1}`,
      photoHTML: card.querySelector('.case-photo-container').innerHTML
    };

    sheetCasePhoto.innerHTML = selectedCase.photoHTML;
    sheetCasePhoto.className = `sheet-case-photo ${selectedCase.gradientClass}`;
    sheetCasePrice.textContent = selectedCase.price;

    confirmBackdrop.classList.add('active');
    confirmBottomSheet.classList.add('active');
  });
});

confirmBackdrop.addEventListener('click', closeBottomSheet);
confirmCancelBtn.addEventListener('click', () => {
  triggerHaptic('light');
  closeBottomSheet();
});

confirmOpenBtn.addEventListener('click', () => {
  if (!selectedCase) return;
  closeBottomSheet();
  triggerHaptic('heavy');
  winningPrize = possiblePrizes[Math.floor(Math.random() * possiblePrizes.length)];
  rouletteOverlay.classList.add('active');

  requestAnimationFrame(() => requestAnimationFrame(() => {
    const ITEM_H  = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--roulette-item-height')) || 152;
    const TOTAL   = 60;
    const WIN_IDX = 52;
    const SPIN_MS = 8000;

    rouletteReel.innerHTML = '';
    rouletteReel.style.transition = 'none';
    rouletteReel.style.transform  = 'translateY(0)';

    const items = [];
    for (let i = 0; i < TOTAL; i++) {
      const prize = (i === WIN_IDX)
        ? winningPrize
        : possiblePrizes[Math.floor(Math.random() * possiblePrizes.length)];

      const div = document.createElement('div');
      div.className = 'roulette-item';
      div.innerHTML = `
        <img src="${prize.img}" class="roulette-item-img" alt="${prize.name}">
        <span class="roulette-item-name">${prize.name}</span>
      `;
      rouletteReel.appendChild(div);
      items.push(div);
    }

    rouletteReel.offsetHeight;

    const viewport   = document.getElementById('rouletteViewport');
    const vpH        = viewport.clientHeight || window.innerHeight * 0.75;
    const centreOfVp = vpH / 2;
    const targetY = centreOfVp - (WIN_IDX * ITEM_H + ITEM_H / 2);

    rouletteReel.style.transition = `transform ${SPIN_MS}ms cubic-bezier(0.03, 0.9, 0.2, 1)`;
    rouletteReel.style.transform  = `translateY(${targetY}px)`;

    let rafId = null;

    function highlightCentre() {
      const matrix    = new DOMMatrix(getComputedStyle(rouletteReel).transform);
      const currentY  = matrix.m42;
      const centreInReel = centreOfVp - currentY;
      const idx       = Math.round((centreInReel - ITEM_H / 2) / ITEM_H);
      const clamped   = Math.max(0, Math.min(TOTAL - 1, idx));

      items.forEach((item, itemIdx) => {
        const itemCentre = itemIdx * ITEM_H + ITEM_H / 2;
        const distance = Math.abs(itemCentre - centreInReel) / ITEM_H;
        const proximity = Math.max(0, 1 - Math.min(distance / 3.6, 1));
        const focus = proximity * proximity * (3 - 2 * proximity);
        const scale = 0.84 + focus * 0.3;
        const opacity = 0.3 + focus * 0.7;

        item.classList.toggle('roulette-item--active', itemIdx === clamped);
        item.style.setProperty('--roulette-item-scale', scale.toFixed(3));
        item.style.setProperty('--roulette-item-opacity', opacity.toFixed(3));
      });

      rafId = requestAnimationFrame(highlightCentre);
    }
    rafId = requestAnimationFrame(highlightCentre);

    activeTickCancel = startHapticTicks();

    spinTimeout = setTimeout(() => {
      cancelAnimationFrame(rafId);
      endSpinAndShowWin();
    }, SPIN_MS);
  }));
});

skipAnimBtn.addEventListener('click', () => {
  triggerHaptic('light');
  endSpinAndShowWin();
});

function startHapticTicks() {
  let delay    = 30;
  let maxDelay = 600;
  let timerId  = null;

  function tick() {
    triggerHaptic('light');
    delay = delay * 1.07;
    if (delay < maxDelay) {
      timerId = setTimeout(tick, delay);
    }
  }
  tick();
  return () => { if (timerId) clearTimeout(timerId); };
}

function endSpinAndShowWin() {
  if (activeTickCancel) activeTickCancel();
  if (spinTimeout) clearTimeout(spinTimeout);

  rouletteOverlay.classList.remove('active');
  winPrizeImg.src = winningPrize.img;
  winPrizeName.textContent = winningPrize.name;
  winPrizeDesc.textContent = winningPrize.desc;
  winPhotoWrapper.className = 'win-photo-wrapper';
  winOverlay.classList.add('active');
  triggerHaptic('heavy');
  spawnConfetti();
}

function spawnConfetti() {
  const container = document.getElementById('fireworksContainer');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#ffd23f', '#ff9f1c', '#a855f7', '#3b82f6', '#14b8a6', '#ef4444'];

  for (let i = 0; i < 45; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';

    const angle = Math.random() * Math.PI * 2;
    const velocity = 90 + Math.random() * 140;
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity - 60;

    particle.style.setProperty('--tx', `${x}px`);
    particle.style.setProperty('--ty', `${y}px`);
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const size = 6 + Math.random() * 8;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(particle);
  }
}

collectBtn.addEventListener('click', async () => {
  if (isCollectingPrize) return;
  isCollectingPrize = true;
  collectBtn.disabled = true;
  triggerHaptic('medium');
  await mockSendToServer(collectBtn, { action: 'collect-prize', prize: winningPrize?.name || 'unknown' });

  winPhotoWrapper.classList.add('dive-down');
  setTimeout(() => triggerHaptic('light'), 160);
  setTimeout(() => triggerHaptic('medium'), 340);

  setTimeout(() => {
    winOverlay.classList.add('fade-out');
  }, 320);

  setTimeout(() => {
    winOverlay.classList.remove('active');
    winOverlay.classList.remove('fade-out');
    winPhotoWrapper.classList.remove('dive-down');
    collectBtn.disabled = false;
    isCollectingPrize = false;

    if (winningPrize.name.includes('Gems')) {
      const amount = parseInt(winningPrize.name.replace(/[^0-9]/g, ''));
      if (!isNaN(amount)) {
        animateGemsCount(gems + amount);
      }
    }

    selectedCase = null;
  }, 980);
});
