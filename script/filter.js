document.addEventListener("DOMContentLoaded", function() {
    // Кнопки "Применить" и "Сбросить"
    const applyButton = document.querySelector(".button-apply");
    const resetButton = document.querySelector(".button-reset");

    // Контейнер с вакансиями
    const jobCards = document.querySelectorAll(".job-card");

    // Применение фильтров
    applyButton.addEventListener("click", function() {
        // Получаем выбранные графики работы
        const selectedSchedules = Array.from(document.querySelectorAll('.filter__group:nth-child(1) input[type="checkbox"]:checked'))
            .map(input => input.id);
        // Получаем выбранные возрасты
        const selectedAges = Array.from(document.querySelectorAll('.filter__group:nth-child(2) input[type="checkbox"]:checked'))
            .map(input => input.id);

        // Перебираем все вакансии и фильтруем их
        jobCards.forEach(card => {
            const jobText = card.querySelector('.job-card__text').textContent;

            // Поиск возраста и графика работы в описании вакансии
            const jobAge = jobText.match(/\b\d{2}\b/); // ищем возраст в тексте вакансии
            const jobSchedule = jobText.match(/\d\/\d/); // ищем график работы в тексте вакансии

            // Проверка условий
            const matchesAge = !selectedAges.length || (jobAge && selectedAges.includes(jobAge[0]));
            const matchesSchedule = !selectedSchedules.length || (jobSchedule && selectedSchedules.includes(jobSchedule[0]));

            // Показать или скрыть карточку
            if (matchesAge && matchesSchedule) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Сброс фильтров
    resetButton.addEventListener("click", function() {
        // Сбрасываем все чекбоксы
        document.querySelectorAll('.filter__input input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Показать все вакансии
        jobCards.forEach(card => {
            card.style.display = 'block';
        });
    });
});
