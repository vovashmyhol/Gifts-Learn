// Telegram Web App Initialization
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// State
let state = {
    hearts: 5,
    lastHeartDate: Date.now(),
    streak: 5,
    xp: 1250,
    currentLessonStep: 0,
    totalLessonSteps: 5,
    isProfileOpen: false
};

// UI Elements
const heartsCountEl = document.getElementById('hearts-count');
const streakCountEl = document.getElementById('streak-count');
const modalOverlay = document.getElementById('modal-overlay');
const profileModal = document.getElementById('profile-modal');
const heartModal = document.getElementById('heart-modal');
const streakModal = document.getElementById('streak-modal');
const lessonModal = document.getElementById('lesson-modal');
const mapScroll = document.getElementById('map-scroll');

// Initialize User Info from TG
if (tg.initDataUnsafe?.user) {
    const user = tg.initDataUnsafe.user;
    document.getElementById('profile-name').innerText = `${user.first_name} ${user.last_name || ''}`;
    document.getElementById('profile-username').innerText = `@${user.username || 'user'}`;
    if (user.photo_url) {
        document.getElementById('user-avatar').src = user.photo_url;
        document.getElementById('profile-img-large').src = user.photo_url;
    }
}

// Map Generation (Zig-zag)
function generateMap() {
    const totalNodes = 10;
    for (let i = 2; i <= totalNodes; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.id = `node-${i}`;
        node.innerHTML = `<div class="node-icon">🔒</div><div class="node-label">Уровень ${i}</div>`;
        mapScroll.prepend(node); // Add to top for scroll history
    }
}

// Modal Management
function openModal(modalId) {
    modalOverlay.classList.add('show');
    [profileModal, heartModal, streakModal, lessonModal].forEach(m => m.style.display = 'none');
    document.getElementById(modalId).style.display = 'flex';
    if (modalId === 'lesson-modal') document.getElementById(modalId).style.display = 'flex';
    else document.getElementById(modalId).style.display = 'block';
}

function closeModal() {
    modalOverlay.classList.remove('show');
}

// Event Listeners
document.getElementById('profile-trigger').addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    openModal('profile-modal');
});

document.getElementById('hearts-trigger').addEventListener('click', () => {
    openModal('heart-modal');
});

document.getElementById('streak-trigger').addEventListener('click', () => {
    openModal('streak-modal');
});

document.getElementById('close-profile').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Lesson Logic
const lessonData = [
    {
        q: "Какую валюту используют для покупки подарков в Telegram?",
        options: ["Stars", "TON", "Bitcoin", "RUB"],
        correct: 0
    },
    {
        q: "Что такое 'Mint' подарка?",
        options: ["Превращение в NFT", "Удаление", "Покупка", "Отправка другу"],
        correct: 0
    }
];

document.getElementById('node-1').addEventListener('click', () => {
    if (state.hearts <= 0) {
        openModal('heart-modal');
        return;
    }
    state.currentLessonStep = 0;
    startLesson();
});

function startLesson() {
    openModal('lesson-modal');
    renderQuestion();
}

function renderQuestion() {
    const qData = lessonData[state.currentLessonStep];
    const content = document.getElementById('lesson-content');
    
    let optionsHtml = '';
    qData.options.forEach((opt, idx) => {
        optionsHtml += `<div class="option-card" onclick="selectOption(${idx})">${opt}</div>`;
    });

    content.innerHTML = `
        <h2 style="margin-bottom: 20px;">${qData.q}</h2>
        <div class="options-grid">
            ${optionsHtml}
        </div>
    `;
    
    document.getElementById('check-btn').disabled = true;
    document.getElementById('check-btn').classList.remove('active');
}

window.selectOption = (idx) => {
    tg.HapticFeedback.selectionChanged();
    const cards = document.querySelectorAll('.option-card');
    cards.forEach(c => c.classList.remove('selected'));
    cards[idx].classList.add('selected');
    
    const btn = document.getElementById('check-btn');
    btn.disabled = false;
    btn.classList.add('active');
    state.selectedIdx = idx;
};

document.getElementById('check-btn').addEventListener('click', () => {
    const qData = lessonData[state.currentLessonStep];
    const isCorrect = state.selectedIdx === qData.correct;
    
    if (isCorrect) {
        tg.HapticFeedback.notificationOccurred('success');
        state.currentLessonStep++;
        updateProgressBar();
        if (state.currentLessonStep >= lessonData.length) {
            finishLesson();
        } else {
            renderQuestion();
        }
    } else {
        tg.HapticFeedback.notificationOccurred('error');
        state.hearts--;
        updateHeartsUI();
        if (state.hearts <= 0) {
            closeModal();
            openModal('heart-modal');
        } else {
            alert('Неверно! -1 ❤️');
        }
    }
});

function updateProgressBar() {
    const progress = (state.currentLessonStep / lessonData.length) * 100;
    document.getElementById('lesson-progress').style.width = `${progress}%`;
}

function updateHeartsUI() {
    heartsCountEl.innerText = state.hearts;
}

function finishLesson() {
    alert('Урок завершен! +50 XP');
    state.xp += 50;
    document.getElementById('profile-xp').innerText = state.xp;
    closeModal();
}

document.getElementById('quit-lesson').addEventListener('click', closeModal);

// Add styles for options dynamically
const lessonStyles = document.createElement('style');
lessonStyles.innerHTML = `
    .options-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 30px;
    }
    .option-card {
        background: var(--glass-bg);
        border: 2px solid var(--glass-border);
        border-radius: 15px;
        padding: 18px;
        font-size: 18px;
        transition: 0.2s;
        cursor: pointer;
    }
    .option-card.selected {
        background: rgba(52, 152, 219, 0.2);
        border-color: var(--primary-blue);
    }
`;
document.head.appendChild(lessonStyles);

// Initial Load
generateMap();
updateHeartsUI();
`;
