// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

tg.setHeaderColor('#1c1c1d');
tg.setBackgroundColor('#1c1c1d');
tg.disableVerticalSwipes();

// Фразы-мотиваторы
const quotes = [
    '🔥 Так держать!',
    '⭐ Отлично! Ты молодец!',
    '💫 Великолепно! Продолжай!',
    '🏆 Правильно! Ты настоящий знаток!',
    '🎯 Браво! Именно так!',
    '✨ Супер! Ты всё лучше!',
    '🚀 Молодец! Так держать!',
    '💎 Идеально! Гордишься собой?',
    '🌟 Правильно! Ты звезда!',
    '👑 Король подарков!',
];


// База данных подарков (названия и пути к файлам)
const giftsData = [
    { name: "Artisan Bricks", file: "artisanbrick.webp" },
    { name: "Astral Shards", file: "astralshard.webp" },
    { name: "B-Day Candles", file: "bdaycandle.webp" },
    { name: "Berry Boxes", file: "berrybox.webp" },
    { name: "Big Years", file: "bigyear.webp" },
    { name: "Bling Binkies", file: "blingbinky.webp" },
    { name: "Bonded Rings", file: "bondedring.webp" },
    { name: "Bow Ties", file: "bowtie.webp" },
    { name: "Bunny Muffins", file: "bunnymuffin.webp" },
    { name: "Candy Canes", file: "candycane.webp" },
    { name: "Clover Pins", file: "cloverpin.webp" },
    { name: "Cookie Hearts", file: "cookieheart.webp" },
    { name: "Crystal Balls", file: "crystalball.webp" },
    { name: "Cupid Charms", file: "cupidcharm.webp" },
    { name: "Desk Calendars", file: "deskcalendar.webp" },
    { name: "Diamond Rings", file: "diamondring.webp" },
    { name: "Durov’s Caps", file: "durovscap.webp" },
    { name: "Easter Eggs", file: "easteregg.webp" },
    { name: "Electric Skulls", file: "electricskull.webp" },
    { name: "Eternal Candles", file: "eternalcandle.webp" },
    { name: "Eternal Roses", file: "eternalrose.webp" },
    { name: "Evil Eyes", file: "evileye.webp" },
    { name: "Faith Amulets", file: "faithamulet.webp" },
    { name: "Flying Brooms", file: "flyingbroom.webp" },
    { name: "Fresh Socks", file: "freshsocks.webp" },
    { name: "Gem Signets", file: "gemsignet.webp" },
    { name: "Genie Lamps", file: "genielamp.webp" },
    { name: "Ginger Cookies", file: "gingercookie.webp" },
    { name: "Hanging Stars", file: "hangingstar.webp" },
    { name: "Happy Brownies", file: "happybrownie.webp" },
    { name: "Heart Lockets", file: "heartlocket.webp" },
    { name: "Heroic Helmets", file: "heroichelmet.webp" },
    { name: "Hex Pots", file: "hexpot.webp" },
    { name: "Holiday Drinks", file: "holidaydrink.webp" },
    { name: "Homemade Cakes", file: "homemadecake.webp" },
    { name: "Hypno Lollipops", file: "hypnolollipop.webp" },
    { name: "Ice Cream", file: "icecream.webp" },
    { name: "Input Keys", file: "inputkey.webp" },
    { name: "Instant Ramens", file: "instantramen.webp" },
    { name: "Ion Gems", file: "iongem.webp" },
    { name: "Ionic Dryers", file: "ionicdryer.webp" },
    { name: "Jack-in-the-Box", file: "jackinthebox.webp" },
    { name: "Jelly Bunnies", file: "jellybunny.webp" },
    { name: "Jester Hats", file: "jesterhat.webp" },
    { name: "Jingle Bellses", file: "jinglebells.webp" },
    { name: "Jolly Chimps", file: "jollychimp.webp" },
    { name: "Joyful Bundles", file: "joyfulbundle.webp" },
    { name: "Khabib’s Papakhas", file: "khabibspapakha.webp" },
    { name: "Kissed Frogs", file: "kissedfrog.webp" },
    { name: "Light Swords", file: "lightsword.webp" },
    { name: "Lol Pops", file: "lolpop.webp" },
    { name: "Loot Bags", file: "lootbag.webp" },
    { name: "Love Candles", file: "lovecandle.webp" },
    { name: "Love Potions", file: "lovepotion.webp" },
    { name: "Low Riders", file: "lowrider.webp" },
    { name: "Lunar Snakes", file: "lunarsnake.webp" },
    { name: "Lush Bouquets", file: "lushbouquet.webp" },
    { name: "Mad Pumpkins", file: "madpumpkin.webp" },
    { name: "Magic Potions", file: "magicpotion.webp" },
    { name: "Mighty Arms", file: "mightyarm.webp" },
    { name: "Mini Oscars", file: "minioscar.webp" },
    { name: "Money Pots", file: "moneypot.webp" },
    { name: "Moon Pendants", file: "moonpendant.webp" },
    { name: "Mousse Cakes", file: "moussecake.webp" },
    { name: "Nail Bracelets", file: "nailbracelet.webp" },
    { name: "Neko Helmets", file: "nekohelmet.webp" },
    { name: "Party Sparklers", file: "partysparkler.webp" },
    { name: "Perfume Bottles", file: "perfumebottle.webp" },
    { name: "Pet Snakes", file: "petsnake.webp" },
    { name: "Plush Pepes", file: "plushpepe.webp" },
    { name: "Precious Peaches", file: "preciouspeach.webp" },
    { name: "Pretty Posies", file: "prettyposy.webp" },
    { name: "Rare Birds", file: "rarebird.webp" },
    { name: "Record Players", file: "recordplayer.webp" },
    { name: "Restless Jars", file: "restlessjar.webp" },
    { name: "Sakura Flowers", file: "sakuraflower.webp" },
    { name: "Santa Hats", file: "santahat.webp" },
    { name: "Scared Cats", file: "scaredcat.webp" },
    { name: "Sharp Tongues", file: "sharptongue.webp" },
    { name: "Signet Rings", file: "signetring.webp" },
    { name: "Skull Flowers", file: "skullflower.webp" },
    { name: "Sky Stilettoses", file: "skystilettos.webp" },
    { name: "Snake Boxes", file: "snakebox.webp" },
    { name: "Snoop Cigars", file: "snoopcigar.webp" },
    { name: "Snoop Doggs", file: "snoopdogg.webp" },
    { name: "Snow Globes", file: "snowglobe.webp" },
    { name: "Snow Mittenses", file: "snowmittens.webp" },
    { name: "Spiced Wines", file: "spicedwine.webp" },
    { name: "Spring Baskets", file: "springbasket.webp" },
    { name: "Spy Agarics", file: "spyagaric.webp" },
    { name: "Star Notepads", file: "starnotepad.webp" },
    { name: "Stellar Rockets", file: "stellarrocket.webp" },
    { name: "Swag Bags", file: "swagbag.webp" },
    { name: "Swiss Watch", file: "swisswatch.webp" },
    { name: "Tama Gadgets", file: "tamagadget.webp" },
    { name: "Top Hats", file: "tophat.webp" },
    { name: "Toy Bears", file: "toybear.webp" },
    { name: "Trapped Hearts", file: "trappedheart.webp" },
    { name: "UFC Strikes", file: "ufcstrike.webp" },
    { name: "Valentine Boxes", file: "valentinebox.webp" },
    { name: "Victory Medals", file: "victorymedal.webp" },
    { name: "Vintage Cigars", file: "vintagecigar.webp" },
    { name: "Voodoo Dolls", file: "voodoodoll.webp" },
    { name: "Westside Signs", file: "westsidesign.webp" },
    { name: "Whip Cupcakes", file: "whipcupcake.webp" },
    { name: "Winter Wreaths", file: "winterwreath.webp" },
    { name: "Witch Hats", file: "witchhat.webp" },
    { name: "Xmas Stockings", file: "xmasstocking.webp" }
];



// Функция генерации вопросов
function generateQuestions(count = 13) {
    const questions = [];
    const shuffledGifts = [...giftsData].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < Math.min(count, shuffledGifts.length); i++) {
        const correct = shuffledGifts[i];
        const options = [correct.name];
        
        // Добавляем 2 случайных неправильных ответа
        while (options.length < 3) {
            const randomGift = giftsData[Math.floor(Math.random() * giftsData.length)];
            if (!options.includes(randomGift.name)) {
                options.push(randomGift.name);
            }
        }
        
        questions.push({
            image: correct.file,
            correct: correct.name,
            options: options.sort(() => 0.5 - Math.random())
        });
    }
    return questions;
}


// Очередь вопросов (будет изменяться при ошибках)
let questionQueue = [];
let mistakesQueue = [];
let isRepetitionPhase = false;
let currentQueueIndex = 0;
let selectedAnswer = null;
let isManualMode = false;

// Статистика
let lessonStartTime = 0;
let totalMistakes = 0;

// Элементы
const mainHeader = document.querySelector('.main-header');
const mainMenu = document.getElementById('main-menu');
const lessonScreen = document.getElementById('lesson-screen');
const progressBar = document.getElementById('progress-bar');
const optionsContainer = document.getElementById('options-container');
const inputContainer = document.getElementById('input-container');
const quizQuestion = document.getElementById('quiz-question');
const checkBtn = document.getElementById('check-btn');
const loadingScreen = document.getElementById('loading-screen');
const modalOverlay = document.getElementById('modal-overlay');
const learnModal = document.getElementById('learn-modal');
const reviewModal = document.getElementById('review-modal');
const breakModal = document.getElementById('break-modal');
const finalModal = document.getElementById('final-modal');
const quizContainer = document.getElementById('quiz-container');

// ─── ЗАГРУЗКА ────────────────────────────────────────────────────────────────

async function startLesson() {
    tg.HapticFeedback.impactOccurred('medium');

    // Плавное появление загрузочного экрана
    loadingScreen.classList.add('active');

    // Инициализация очереди
    questionQueue = generateQuestions(13);
    mistakesQueue = [];
    isRepetitionPhase = false;
    currentQueueIndex = 0;
    
    lessonStartTime = Date.now();
    totalMistakes = 0;
    window.bonusAdded = false;

    // Предзагрузка всех картинок для плавности на телефонах
    const preloadPromises = questionQueue.map(q => {
        return new Promise(resolve => {
            const img = new Image();
            img.src = q.image;
            img.onload = resolve;
            img.onerror = resolve;
        });
    });

    const minDelay = new Promise(resolve => setTimeout(resolve, 1500));
    
    // Ждем загрузки всех 13 картинок и минимальную анимацию Lottie
    await Promise.all([minDelay, ...preloadPromises]);

    mainMenu.classList.add('hidden');
    mainHeader.classList.add('hidden');
    lessonScreen.classList.remove('hidden');

    // Плавное скрытие загрузочного экрана
    loadingScreen.classList.remove('active');

    document.getElementById('repetition-badge').classList.add('hidden');

    selectedAnswer = null;
    isManualMode = false;

    renderQuestion();
}

// ─── ВЫХОД ───────────────────────────────────────────────────────────────────

function exitLesson() {
    tg.HapticFeedback.impactOccurred('light');
    lessonScreen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
    mainHeader.classList.remove('hidden');
}

// ─── РЕНДЕР ВОПРОСА ──────────────────────────────────────────────────────────

function renderQuestion() {
    let currentQueue = isRepetitionPhase ? mistakesQueue : questionQueue;

    // На всякий случай защита
    if (currentQueueIndex >= currentQueue.length) return;

    const q = currentQueue[currentQueueIndex];
    const total = currentQueue.length;

    // Прогресс
    progressBar.style.width = `${(currentQueueIndex / total) * 100}%`;

    // Вопрос
    quizQuestion.innerText = 'Как называется этот подарок?';

    // Картинка
    document.getElementById('quiz-image').src = q.image;

    // Определяем ручной режим бонусных вопросов
    isManualMode = (!isRepetitionPhase && window.bonusAdded && currentQueueIndex >= 13);

    // Сброс состояния
    selectedAnswer = null;
    checkBtn.classList.add('hidden');

    if (isManualMode) {
        optionsContainer.classList.add('hidden');
        inputContainer.classList.remove('hidden');
        const inputField = document.getElementById('quiz-input');
        inputField.value = '';
        inputField.style.borderColor = '';
        inputField.style.color = '';
        document.getElementById('submit-btn').disabled = false;
        quizQuestion.innerText = 'Введите название этого подарка:';
    } else {
        optionsContainer.classList.remove('hidden');
        inputContainer.classList.add('hidden');
        quizQuestion.innerText = 'Как называется этот подарок?';
        
        // Варианты ответов
        const btns = optionsContainer.querySelectorAll('.option-btn');
        btns.forEach((btn, i) => {
            btn.innerText = q.options[i] || '';
            btn.classList.remove('selected', 'wrong', 'correct');
        });
    }
}

// ─── ВЫБОР ВАРИАНТА ──────────────────────────────────────────────────────────

function selectOption(btn) {
    // Снимаем выделение со всех
    optionsContainer.querySelectorAll('.option-btn').forEach(b => {
        b.classList.remove('selected');
    });

    btn.classList.add('selected');
    selectedAnswer = btn.innerText;

    // Показываем кнопку «Проверить»
    checkBtn.classList.remove('hidden');

    tg.HapticFeedback.selectionChanged();
}

// ─── ПРОВЕРКА ОТВЕТА ─────────────────────────────────────────────────────────

function checkAnswer() {
    if (!selectedAnswer) return;

    let currentQueue = isRepetitionPhase ? mistakesQueue : questionQueue;
    if (currentQueueIndex >= currentQueue.length) return; // Защита от двойного клика в конце урока

    tg.HapticFeedback.impactOccurred('medium');

    const q = currentQueue[currentQueueIndex];
    let isCorrect = false;

    if (isManualMode) {
        const normalize = (str) => {
            let s = str.trim().toLowerCase();
            if (s.endsWith('s')) s = s.slice(0, -1);
            return s;
        };
        isCorrect = normalize(selectedAnswer) === normalize(q.correct);
    } else {
        isCorrect = selectedAnswer === q.correct;
    }

    if (isCorrect) {
        tg.HapticFeedback.notificationOccurred('success');
        
        selectedAnswer = null; // Сбрасываем выбранный ответ

        if (isManualMode) {
            const inputField = document.getElementById('quiz-input');
            inputField.style.borderColor = 'var(--success-color)';
            inputField.style.color = 'var(--success-color)';
            document.getElementById('submit-btn').disabled = true;
            
            setTimeout(() => {
                inputField.style.borderColor = '';
                inputField.style.color = '';
                continueLesson();
            }, 500);
        } else {
            // Подсвечиваем зеленым
            optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.innerText === selectedAnswer) btn.classList.add('correct');
            });
            checkBtn.classList.add('hidden');
            
            // Быстрый переход
            setTimeout(() => {
                continueLesson();
            }, 500);
        }
    } else {
        tg.HapticFeedback.notificationOccurred('error');
        showLearnModal(q);
    }
}

// ─── НЕПРАВИЛЬНЫЙ ОТВЕТ (РЕЖИМ ОБУЧЕНИЯ) ─────────────────────────────────────

function showLearnModal(q) {
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
        if (btn.innerText === selectedAnswer) btn.classList.add('wrong');
        if (btn.innerText === q.correct) btn.classList.add('correct');
    });

    checkBtn.classList.add('hidden');
    selectedAnswer = null;

    totalMistakes++;

    // Добавляем вопрос в очередь для повтора
    mistakesQueue.push(q);

    // Заполняем модальное окно
    document.getElementById('learn-image').src = q.image;
    document.getElementById('learn-name').innerText = q.correct;
    
    learnModal.classList.add('active');
    modalOverlay.classList.add('active');
}

// ─── ОШИБКИ И ПОВТОРЕНИЕ ─────────────────────────────────────────────────────

function showReviewModal() {
    reviewModal.classList.add('active');
    modalOverlay.classList.add('active');
}

document.getElementById('start-review-btn').addEventListener('click', () => {
    reviewModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    
    isRepetitionPhase = true;
    currentQueueIndex = 0;
    document.getElementById('repetition-badge').classList.remove('hidden');
    renderQuestion();
});

document.getElementById('learned-btn').addEventListener('click', () => {
    learnModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    continueLesson();
});

// ─── ИТОГОВОЕ ОКНО ───────────────────────────────────────────────────────────

function showFinalModal() {
    tg.HapticFeedback.notificationOccurred('success');
    
    const timeTaken = Math.floor((Date.now() - lessonStartTime) / 1000);
    const minutes = Math.floor(timeTaken / 60).toString().padStart(2, '0');
    const seconds = (timeTaken % 60).toString().padStart(2, '0');
    
    document.getElementById('final-time').innerText = `${minutes}:${seconds}`;
    document.getElementById('final-mistakes').innerText = totalMistakes;
    
    let earnedPoints = Math.max(5, 15 - totalMistakes);
    document.getElementById('final-points').innerText = `+${earnedPoints}`;
    
    const pointsEl = document.querySelector('.streaks .count');
    pointsEl.innerText = parseInt(pointsEl.innerText) + earnedPoints;
    
    finalModal.classList.add('active');
}

document.getElementById('finish-lesson-btn').addEventListener('click', () => {
    finalModal.classList.remove('active');
    exitLesson();
});

// ─── ПРОДОЛЖИТЬ ──────────────────────────────────────────────────────────────

function continueLesson() {
    tg.HapticFeedback.impactOccurred('light');

    currentQueueIndex++;
    
    let currentQueue = isRepetitionPhase ? mistakesQueue : questionQueue;

    // Проверка на бонусный раунд (идеально пройдено 13 вопросов)
    if (!isRepetitionPhase && currentQueueIndex === 13 && totalMistakes === 0 && !window.bonusAdded) {
        window.bonusAdded = true;
        const bonus = generateQuestions(2);
        
        // Предзагрузка
        bonus.forEach(q => {
            const img = new Image();
            img.src = q.image;
        });

        questionQueue.push(...bonus);
        slideToNext();
        return;
    }

    if (currentQueueIndex >= currentQueue.length) {
        // Очередь закончилась
        if (!isRepetitionPhase && mistakesQueue.length > 0) {
            // Переход к повторению (показываем модалку без слайда)
            showReviewModal();
        } else {
            // Урок полностью завершён
            showFinalModal();
        }
    } else {
        // Есть следующий вопрос — делаем анимацию перехода
        slideToNext();
    }
}

// ─── АНИМАЦИЯ ПЕРЕХОДА ───────────────────────────────────────────────────────

function slideToNext() {
    // Слайд влево (текущий улетает)
    quizContainer.classList.add('slide-out-left');

    setTimeout(() => {
        quizContainer.classList.remove('slide-out-left');
        quizContainer.classList.add('slide-in-right');

        renderQuestion();

        // Убираем класс slide-in после завершения анимации
        setTimeout(() => {
            quizContainer.classList.remove('slide-in-right');
        }, 350);
    }, 300);
}

// ─── ОБРАБОТЧИКИ СОБЫТИЙ ────────────────────────────────────────────────────

document.getElementById('education-engine').addEventListener('click', startLesson);
document.getElementById('back-btn').addEventListener('click', exitLesson);

optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => selectOption(btn));
});

checkBtn.addEventListener('click', checkAnswer);

document.getElementById('submit-btn').addEventListener('click', () => {
    const val = document.getElementById('quiz-input').value;
    if (val.trim() !== '') {
        selectedAnswer = val;
        checkAnswer();
    } else {
        tg.HapticFeedback.notificationOccurred('error');
    }
});

// ─── РЕЖИМ ПАРЫ (MEMORY GAME) ────────────────────────────────────────────────

let memorySeries = 1;
const MAX_MEMORY_SERIES = 3;
let memoryPool = []; 
let memorySelectedTile = null;
let memoryMatchesLeft = 0;

function startMemoryGame() {
    tg.HapticFeedback.impactOccurred('medium');
    memorySeries = 1;
    lessonStartTime = Date.now();
    totalMistakes = 0;

    mainMenu.classList.add('hidden');
    mainHeader.classList.add('hidden');
    document.getElementById('memory-screen').classList.remove('hidden');

    startMemorySeries();
}

function startMemorySeries() {
    document.getElementById('memory-series-count').innerText = `Серия ${memorySeries}/${MAX_MEMORY_SERIES}`;
    document.getElementById('memory-progress-bar').style.width = '0%';
    
    // Берем случайные подарки для серии
    const gifts = [...giftsData].sort(() => 0.5 - Math.random()).slice(0, 8); // 8 пар на одну серию
    memoryPool = [...gifts];
    memoryMatchesLeft = 8;
    
    const colImg = document.getElementById('memory-col-img');
    const colText = document.getElementById('memory-col-text');
    colImg.innerHTML = '';
    colText.innerHTML = '';
    
    // Выставляем 4 пары на стол
    const initialPairs = memoryPool.splice(0, 4);
    
    let imgTiles = [];
    let textTiles = [];
    initialPairs.forEach(g => {
        imgTiles.push(createMemoryTile({ type: 'img', data: g }));
        textTiles.push(createMemoryTile({ type: 'text', data: g }));
    });
    
    // Перемешиваем колонки отдельно
    imgTiles.sort(() => 0.5 - Math.random());
    textTiles.sort(() => 0.5 - Math.random());
    
    imgTiles.forEach(tile => colImg.appendChild(tile));
    textTiles.forEach(tile => colText.appendChild(tile));
}

function createMemoryTile(tileData) {
    const div = document.createElement('div');
    div.className = 'memory-tile';
    div.dataset.name = tileData.data.name;
    div.dataset.type = tileData.type;
    
    if (tileData.type === 'img') {
        const img = document.createElement('img');
        img.src = tileData.data.file;
        img.className = 'memory-img';
        div.appendChild(img);
    } else {
        const span = document.createElement('span');
        span.className = 'memory-text';
        span.innerText = tileData.data.name;
        div.appendChild(span);
    }
    
    div.addEventListener('click', () => handleTileClick(div));
    return div;
}

function handleTileClick(tile) {
    if (tile.classList.contains('matched') || tile.classList.contains('selected')) return;
    
    tg.HapticFeedback.selectionChanged();
    
    if (!memorySelectedTile) {
        memorySelectedTile = tile;
        tile.classList.add('selected');
        return;
    }
    
    const first = memorySelectedTile;
    const second = tile;
    memorySelectedTile = null;
    
    // Проверка совпадения (имя одинаковое, но типы разные - картинка и текст)
    if (first.dataset.name === second.dataset.name && first.dataset.type !== second.dataset.type) {
        first.classList.remove('selected');
        first.classList.add('matched');
        second.classList.add('matched');
        tg.HapticFeedback.notificationOccurred('success');
        
        memoryMatchesLeft--;
        const total = 8; // Так как всего 8 пар в серии
        const progress = ((total - memoryMatchesLeft) / total) * 100;
        document.getElementById('memory-progress-bar').style.width = `${progress}%`;
        
        setTimeout(() => {
            // Если есть в пуле, заменяем исчезнувшие плитки новыми прямо на их месте
            if (memoryPool.length > 0) {
                const nextGift = memoryPool.shift();
                const newImgTile = createMemoryTile({ type: 'img', data: nextGift });
                const newTextTile = createMemoryTile({ type: 'text', data: nextGift });
                
                // Анимация плавного появления
                newImgTile.style.animation = 'fade-in 0.3s ease forwards';
                newTextTile.style.animation = 'fade-in 0.3s ease forwards';
                
                if (first.dataset.type === 'img') {
                    first.replaceWith(newImgTile);
                    second.replaceWith(newTextTile);
                } else {
                    first.replaceWith(newTextTile);
                    second.replaceWith(newImgTile);
                }
            } else {
                // Пул пуст. Чтобы не смещались остальные, просто делаем их невидимыми
                first.style.visibility = 'hidden';
                second.style.visibility = 'hidden';
            }
            
            if (memoryMatchesLeft === 0) {
                endMemorySeries();
            }
        }, 300);
        
    } else {
        // Ошибка
        totalMistakes++;
        first.classList.remove('selected');
        first.classList.add('wrong');
        second.classList.add('wrong');
        tg.HapticFeedback.notificationOccurred('error');
        
        setTimeout(() => {
            first.classList.remove('wrong');
            second.classList.remove('wrong');
        }, 400);
    }
}

const breakQuotes = [
    "Отличная память!",
    "Вы невероятно быстры!",
    "Продолжайте в том же духе!",
    "Превосходный результат!",
    "Вы настоящий эксперт!"
];

function endMemorySeries() {
    if (memorySeries >= MAX_MEMORY_SERIES) {
        // Конец игры
        document.getElementById('memory-screen').classList.add('hidden');
        showFinalModal();
    } else {
        // Перерыв
        document.getElementById('break-quote').innerText = breakQuotes[Math.floor(Math.random() * breakQuotes.length)];
        breakModal.classList.add('active');
        modalOverlay.classList.add('active');
    }
}

document.getElementById('break-continue-btn').addEventListener('click', () => {
    breakModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    memorySeries++;
    startMemorySeries();
});

document.getElementById('memory-back-btn').addEventListener('click', () => {
    document.getElementById('memory-screen').classList.add('hidden');
    mainMenu.classList.remove('hidden');
    mainHeader.classList.remove('hidden');
});

document.getElementById('memory-game').addEventListener('click', startMemoryGame);
