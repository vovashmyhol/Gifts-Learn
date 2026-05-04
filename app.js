// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Подстройка цвета "чёлки" (статус-бара) под цвет приложения
tg.setHeaderColor('#1c1c1d');
tg.setBackgroundColor('#1c1c1d');

// Отключаем вертикальные свайпы, чтобы приложение не закрывалось при оттягивании вниз
tg.disableVerticalSwipes();

// Обработка кликов по баннерам
document.getElementById('education-engine').addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    console.log('Запуск Движка Обучения');
    // Здесь будет переход к логике обучения
});

document.getElementById('memory-game').addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    console.log('Запуск Игры "Пары"');
    // Здесь будет переход к логике мемори
});

// Настройка кнопок заголовка (пока неактивны)
console.log('Приложение готово. Ожидание ассетов и логики.');
