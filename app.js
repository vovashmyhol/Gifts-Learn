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
    { name: "Artisan Bricks", file: "gifts/artisanbrick.webp" },
    { name: "Astral Shards", file: "gifts/astralshard.webp" },
    { name: "B-Day Candles", file: "gifts/bdaycandle.webp" },
    { name: "Berry Boxes", file: "gifts/berrybox.webp" },
    { name: "Big Years", file: "gifts/bigyear.webp" },
    { name: "Bling Binkies", file: "gifts/blingbinky.webp" },
    { name: "Bonded Rings", file: "gifts/bondedring.webp" },
    { name: "Bow Ties", file: "gifts/bowtie.webp" },
    { name: "Bunny Muffins", file: "gifts/bunnymuffin.webp" },
    { name: "Candy Canes", file: "gifts/candycane.webp" },
    { name: "Clover Pins", file: "gifts/cloverpin.webp" },
    { name: "Cookie Hearts", file: "gifts/cookieheart.webp" },
    { name: "Crystal Balls", file: "gifts/crystalball.webp" },
    { name: "Cupid Charms", file: "gifts/cupidcharm.webp" },
    { name: "Desk Calendars", file: "gifts/deskcalendar.webp" },
    { name: "Diamond Rings", file: "gifts/diamondring.webp" },
    { name: "Durov’s Caps", file: "gifts/durovscap.webp" },
    { name: "Easter Eggs", file: "gifts/easteregg.webp" },
    { name: "Electric Skulls", file: "gifts/electricskull.webp" },
    { name: "Eternal Candles", file: "gifts/eternalcandle.webp" },
    { name: "Eternal Roses", file: "gifts/eternalrose.webp" },
    { name: "Evil Eyes", file: "gifts/evileye.webp" },
    { name: "Faith Amulets", file: "gifts/faithamulet.webp" },
    { name: "Flying Brooms", file: "gifts/flyingbroom.webp" },
    { name: "Fresh Socks", file: "gifts/freshsocks.webp" },
    { name: "Gem Signets", file: "gifts/gemsignet.webp" },
    { name: "Genie Lamps", file: "gifts/genielamp.webp" },
    { name: "Ginger Cookies", file: "gifts/gingercookie.webp" },
    { name: "Hanging Stars", file: "gifts/hangingstar.webp" },
    { name: "Happy Brownies", file: "gifts/happybrownie.webp" },
    { name: "Heart Lockets", file: "gifts/heartlocket.webp" },
    { name: "Heroic Helmets", file: "gifts/heroichelmet.webp" },
    { name: "Hex Pots", file: "gifts/hexpot.webp" },
    { name: "Holiday Drinks", file: "gifts/holidaydrink.webp" },
    { name: "Homemade Cakes", file: "gifts/homemadecake.webp" },
    { name: "Hypno Lollipops", file: "gifts/hypnolollipop.webp" },
    { name: "Ice Cream", file: "gifts/icecream.webp" },
    { name: "Input Keys", file: "gifts/inputkey.webp" },
    { name: "Instant Ramens", file: "gifts/instantramen.webp" },
    { name: "Ion Gems", file: "gifts/iongem.webp" },
    { name: "Ionic Dryers", file: "gifts/ionicdryer.webp" },
    { name: "Jack-in-the-Box", file: "gifts/jackinthebox.webp" },
    { name: "Jelly Bunnies", file: "gifts/jellybunny.webp" },
    { name: "Jester Hats", file: "gifts/jesterhat.webp" },
    { name: "Jingle Bellses", file: "gifts/jinglebells.webp" },
    { name: "Jolly Chimps", file: "gifts/jollychimp.webp" },
    { name: "Joyful Bundles", file: "gifts/joyfulbundle.webp" },
    { name: "Khabib’s Papakhas", file: "gifts/khabibspapakha.webp" },
    { name: "Kissed Frogs", file: "gifts/kissedfrog.webp" },
    { name: "Light Swords", file: "gifts/lightsword.webp" },
    { name: "Lol Pops", file: "gifts/lolpop.webp" },
    { name: "Loot Bags", file: "gifts/lootbag.webp" },
    { name: "Love Candles", file: "gifts/lovecandle.webp" },
    { name: "Love Potions", file: "gifts/lovepotion.webp" },
    { name: "Low Riders", file: "gifts/lowrider.webp" },
    { name: "Lunar Snakes", file: "gifts/lunarsnake.webp" },
    { name: "Lush Bouquets", file: "gifts/lushbouquet.webp" },
    { name: "Mad Pumpkins", file: "gifts/madpumpkin.webp" },
    { name: "Magic Potions", file: "gifts/magicpotion.webp" },
    { name: "Mighty Arms", file: "gifts/mightyarm.webp" },
    { name: "Mini Oscars", file: "gifts/minioscar.webp" },
    { name: "Money Pots", file: "gifts/moneypot.webp" },
    { name: "Moon Pendants", file: "gifts/moonpendant.webp" },
    { name: "Mousse Cakes", file: "gifts/moussecake.webp" },
    { name: "Nail Bracelets", file: "gifts/nailbracelet.webp" },
    { name: "Neko Helmets", file: "gifts/nekohelmet.webp" },
    { name: "Party Sparklers", file: "gifts/partysparkler.webp" },
    { name: "Perfume Bottles", file: "gifts/perfumebottle.webp" },
    { name: "Pet Snakes", file: "gifts/petsnake.webp" },
    { name: "Plush Pepes", file: "gifts/plushpepe.webp" },
    { name: "Precious Peaches", file: "gifts/preciouspeach.webp" },
    { name: "Pretty Posies", file: "gifts/prettyposy.webp" },
    { name: "Rare Birds", file: "gifts/rarebird.webp" },
    { name: "Record Players", file: "gifts/recordplayer.webp" },
    { name: "Restless Jars", file: "gifts/restlessjar.webp" },
    { name: "Sakura Flowers", file: "gifts/sakuraflower.webp" },
    { name: "Santa Hats", file: "gifts/santahat.webp" },
    { name: "Scared Cats", file: "gifts/scaredcat.webp" },
    { name: "Sharp Tongues", file: "gifts/sharptongue.webp" },
    { name: "Signet Rings", file: "gifts/signetring.webp" },
    { name: "Skull Flowers", file: "gifts/skullflower.webp" },
    { name: "Sky Stilettoses", file: "gifts/skystilettos.webp" },
    { name: "Snake Boxes", file: "gifts/snakebox.webp" },
    { name: "Snoop Cigars", file: "gifts/snoopcigar.webp" },
    { name: "Snoop Doggs", file: "gifts/snoopdogg.webp" },
    { name: "Snow Globes", file: "gifts/snowglobe.webp" },
    { name: "Snow Mittenses", file: "gifts/snowmittens.webp" },
    { name: "Spiced Wines", file: "gifts/spicedwine.webp" },
    { name: "Spring Baskets", file: "gifts/springbasket.webp" },
    { name: "Spy Agarics", file: "gifts/spyagaric.webp" },
    { name: "Star Notepads", file: "gifts/starnotepad.webp" },
    { name: "Stellar Rockets", file: "gifts/stellarrocket.webp" },
    { name: "Swag Bags", file: "gifts/swagbag.webp" },
    { name: "Swiss Watch", file: "gifts/swisswatch.webp" },
    { name: "Tama Gadgets", file: "gifts/tamagadget.webp" },
    { name: "Top Hats", file: "gifts/tophat.webp" },
    { name: "Toy Bears", file: "gifts/toybear.webp" },
    { name: "Trapped Hearts", file: "gifts/trappedheart.webp" },
    { name: "UFC Strikes", file: "gifts/ufcstrike.webp" },
    { name: "Valentine Boxes", file: "gifts/valentinebox.webp" },
    { name: "Victory Medals", file: "gifts/victorymedal.webp" },
    { name: "Vintage Cigars", file: "gifts/vintagecigar.webp" },
    { name: "Voodoo Dolls", file: "gifts/voodoodoll.webp" },
    { name: "Westside Signs", file: "gifts/westsidesign.webp" },
    { name: "Whip Cupcakes", file: "gifts/whipcupcake.webp" },
    { name: "Winter Wreaths", file: "gifts/winterwreath.webp" },
    { name: "Witch Hats", file: "gifts/witchhat.webp" },
    { name: "Xmas Stockings", file: "gifts/xmasstocking.webp" }
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
const quizContainer = document.getElementById('quiz-container');

// ─── ЗАГРУЗКА ────────────────────────────────────────────────────────────────

async function startLesson() {
    tg.HapticFeedback.impactOccurred('medium');

    // Плавное появление загрузочного экрана
    loadingScreen.classList.add('active');

    const waitForImages = (container) => {
        const images = container.querySelectorAll('img');
        const promises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        });
        return Promise.all(promises);
    };

    const minDelay = new Promise(resolve => setTimeout(resolve, 1500));
    const contentLoaded = waitForImages(lessonScreen);

    await Promise.all([minDelay, contentLoaded]);

    mainMenu.classList.add('hidden');
    mainHeader.classList.add('hidden');
    lessonScreen.classList.remove('hidden');

    // Плавное скрытие загрузочного экрана
    loadingScreen.classList.remove('active');


    // Инициализация очереди
    questionQueue = generateQuestions(13);
    mistakesQueue = [];
    isRepetitionPhase = false;
    currentQueueIndex = 0;
    
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

    if (currentQueueIndex >= currentQueue.length) {
        if (!isRepetitionPhase && mistakesQueue.length > 0) {
            // Переход к повторению
            showReviewModal();
            return;
        }
        // Урок полностью завершён
        exitLesson();
        return;
    }

    const q = currentQueue[currentQueueIndex];
    const total = currentQueue.length;

    // Прогресс
    progressBar.style.width = `${(currentQueueIndex / total) * 100}%`;

    // Вопрос
    quizQuestion.innerText = 'Как называется этот подарок?';

    // Картинка
    document.getElementById('quiz-image').src = q.image;

    // Варианты ответов
    const btns = optionsContainer.querySelectorAll('.option-btn');
    btns.forEach((btn, i) => {
        btn.innerText = q.options[i] || '';
        btn.classList.remove('selected', 'wrong', 'correct');
    });

    // Сброс состояния
    selectedAnswer = null;
    checkBtn.classList.add('hidden');
    optionsContainer.classList.remove('hidden');
    inputContainer.classList.add('hidden');
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

    tg.HapticFeedback.impactOccurred('medium');

    let currentQueue = isRepetitionPhase ? mistakesQueue : questionQueue;
    const q = currentQueue[currentQueueIndex];
    const isCorrect = selectedAnswer === q.correct;

    if (isCorrect) {
        tg.HapticFeedback.notificationOccurred('success');
        
        // Подсвечиваем зеленым
        optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.innerText === selectedAnswer) btn.classList.add('correct');
        });
        checkBtn.classList.add('hidden');
        
        // Быстрый переход без модального окна
        setTimeout(() => {
            continueLesson();
        }, 500);
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

// ─── ПРОДОЛЖИТЬ ──────────────────────────────────────────────────────────────

function continueLesson() {
    tg.HapticFeedback.impactOccurred('light');

    currentQueueIndex++;
    slideToNext();
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
