// Управление учебным дневником (упрощенная версия)

document.addEventListener('DOMContentLoaded', function() {
    initDiary();
});

function initDiary() {
    const stubButton = document.getElementById('add-entry-stub-btn');
    const stubModal = document.getElementById('stub-modal');
    const closeButtons = document.querySelectorAll('#stub-modal-close, #stub-modal-ok');
    
    if (stubButton && stubModal) {
        // Обработчик для кнопки-заглушки
        stubButton.addEventListener('click', function() {
            showStubModal();
        });
        
        // Закрытие модального окна
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                closeStubModal();
            });
        });
        
        // Закрытие по клику вне окна
        stubModal.addEventListener('click', function(e) {
            if (e.target === stubModal) {
                closeStubModal();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && stubModal.classList.contains('active')) {
                closeStubModal();
            }
        });
    }
    
    // Обновляем статистику
    updateStats();
    
    // Добавляем анимации для записей
    animateEntries();
}

function showStubModal() {
    const stubModal = document.getElementById('stub-modal');
    if (stubModal) {
        stubModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Добавляем небольшой эффект для кнопки
        const stubButton = document.getElementById('add-entry-stub-btn');
        stubButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            stubButton.style.transform = 'scale(1)';
        }, 150);
    }
}

function closeStubModal() {
    const stubModal = document.getElementById('stub-modal');
    if (stubModal) {
        stubModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function updateStats() {
    const entries = document.querySelectorAll('.entry');
    let completedCount = 0;
    let inProgressCount = 0;
    let plannedCount = 0;
    
    entries.forEach(entry => {
        if (entry.classList.contains('completed')) {
            completedCount++;
        } else if (entry.classList.contains('in-progress')) {
            inProgressCount++;
        } else if (entry.classList.contains('planned')) {
            plannedCount++;
        }
    });
    
    const totalCount = entries.length;
    
    // Обновляем счетчики
    const completedElement = document.getElementById('completed-count');
    const inProgressElement = document.getElementById('in-progress-count');
    const plannedElement = document.getElementById('planned-count');
    const totalElement = document.getElementById('total-count');
    
    if (completedElement) completedElement.textContent = completedCount;
    if (inProgressElement) inProgressElement.textContent = inProgressCount;
    if (plannedElement) plannedElement.textContent = plannedCount;
    if (totalElement) totalElement.textContent = totalCount;
}

function animateEntries() {
    const entries = document.querySelectorAll('.entry');
    
    entries.forEach((entry, index) => {
        entry.style.opacity = '0';
        entry.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            entry.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            entry.style.opacity = '1';
            entry.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Простая функция для демонстрации (можно удалить если не нужно)
function demonstrateStubFunctionality() {
    console.log('Функция добавления записей в разработке!');
    console.log('В будущем здесь будет:');
    console.log('1. Форма для ввода данных');
    console.log('2. Валидация полей');
    console.log('3. Сохранение в Local Storage');
    console.log('4. Динамическое обновление интерфейса');
}

// Инициализируем демонстрацию при загрузке
document.addEventListener('DOMContentLoaded', demonstrateStubFunctionality);