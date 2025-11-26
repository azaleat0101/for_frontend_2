// Управление модальными окнами

document.addEventListener('DOMContentLoaded', function() {
    initProjectModals();
});

function initProjectModals() {
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.
    getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    
    if (!projectModal || !modalClose || !modalBody) return;
    
    // Данные проектов для модальных окон
    const projectsData = {
        1: {
            "title": "Моя родословная",
            "description": "Элегантный дизайн-макет семейной родословной книги в Figma. Чистый и стильный дизайн с акцентом на удобочитаемость и визуальную гармонию. Идеально подходит для печати и цифрового просмотра.",
            "technologies": ["Figma", "Auto Layout", "Components"],
            "features": [
                "Готовый к печати макет родословной книги",
                "Адаптивный дизайн для разных форматов",
                "Простая и понятная структура страниц",
                "Чистая типографика и сбалансированная композиция",
                "Место для фотографий и документов",
                "Готовые шаблоны для биографий"
            ],
            "images": ["../images/project_1.jpg"],
            "liveDemo": "#",
            "sourceCode": "https://github.com/azaleat0101/family-tree-simple"
        },
        2: {
            "title": "Методичка первокурсника 5-го общежития РТУ МИРЭА",
            "description": "Практичный и понятный дизайн-макет методического пособия для студентов первого курса, проживающих в 5-ом общежитии РТУ МИРЭА. Яркий современный дизайн с полезной информацией и навигацией по студенческой жизни.",
            "technologies": ["Figma", "Auto Layout", "Components"],
            "features": [
                "Готовый к печати макет методического пособия",
                "Яркий студенческий дизайн с фирменными цветами МИРЭА",
                "Понятная навигация по разделам",
                "Практичные советы и чек-листы",
                "Карты и схемы кампуса и общежития",
                "Шаблоны для важных документов и заявлений"
            ],
            "images": ["../images/project_2.jpg"],
            "liveDemo": "#",
            "sourceCode": "https://github.com/azaleat0101/freshman-guide-mirea"
        },
        3: {
            "title": "Конвертер валют",
            "description": "Кроссплатформенное приложение для конвертации валют, разработанное на C++ с использованием WinAPI. Приложение features современный интерфейс, актуальные курсы валют и работу в офлайн-режиме.",
            "technologies": ["C++", "WinAPI", "STL", "CMake", "JSON"],
            "features": [
                "Кроссплатформенная архитектура (Windows/Linux)",
                "Современный графический интерфейс на WinAPI",
                "Автоматическое обновление курсов валют",
                "Работа в офлайн-режиме с кэшированием",
                "Поддержка 150+ мировых валют",
                "История конвертаций и избранные валюты"
            ],
            "images": ["../images/project_3.jpg"],
            "liveDemo": "#",
            "sourceCode": "https://github.com/azaleat0101/currency-converter-cpp"
        },
        4: {
            "title": "Личный сайт-портфолио",
            "description": "Современный адаптивный веб-сайт-портфолио, разработанный с использованием чистого HTML, CSS и JavaScript. Сайт демонстрирует профессиональные навыки, проекты и учебные достижения студента-разработчика.",
            "technologies": ["HTML5", "CSS3", "JavaScript", "Flexbox", "Grid", "Responsive Design"],
            "features": [
                "Полностью адаптивный дизайн (Mobile First)",
                "Интерактивная навигация и анимации",
                "Система фильтрации проектов по технологиям",
                "Валидация форм обратной связи",
                "Модальные окна с деталями проектов",
                "Динамический учебный дневник"
            ],
            "images": ["../images/project_4.jpg"],
            "liveDemo": "https://azaleat0101.github.io/for_frontend_2",
            "sourceCode": "https://github.com/azaleat0101/for_frontend_2.git"
        },
        5: {
            "title": "Моя база данных",
            "description": "Настольное приложение с графическим интерфейсом для управления базой данных PostgreSQL. Приложение предоставляет удобный интерфейс для выполнения CRUD операций, построения отчетов и визуализации данных.",
            "technologies": ["Python", "PySide6", "psycopg2", "PostgreSQL", "SQL", "Qt"],
            "features": [
                "Полный набор CRUD операций (Create, Read, Update, Delete)",
                "Интуитивный графический интерфейс на PySide6",
                "Визуализация данных с помощью графиков и диаграмм",
                "Генерация отчетов в формате PDF и Excel",
                "Резервное копирование и восстановление базы данных",
                "Многопользовательский режим с разными уровнями доступа"
            ],
            "images": ["../images/project_5.jpg"],
            "liveDemo": "#",
            "sourceCode": "https://github.com/bergks/Database_project.git"
        }
    };

    // Текущая активная кнопка (для возврата фокуса)
    let activeButton = null;

    // Инициализация кнопок
    viewDetailsButtons.forEach(button => {
        // Устанавливаем начальные ARIA-атрибуты
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-controls', 'project-modal');
        
        // Обработчик клика
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const projectData = projectsData[projectId];
            
            if (projectData) {
                showProjectModal(projectData, this);
            }
        });
        
        // Обработчик клавиатуры (Enter/Space)
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                const projectData = projectsData[projectId];
                
                if (projectData) {
                    showProjectModal(projectData, this);
                }
            }
        });
    });
    
    // Закрытие модального окна по клику на крестик
    modalClose.addEventListener('click', closeModal);
    
    // Закрытие по клику вне окна
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeModal();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Обработчики для кнопок внутри модального окна (демо и исходный код)
    modalBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('button')) {
            e.stopPropagation();
        }
    });

    function showProjectModal(project, button) {
        // Сохраняем активную кнопку для возврата фокуса
        activeButton = button;
        
        // Обновляем ARIA-атрибуты кнопки
        button.setAttribute('aria-expanded', 'true');
        
        // Генерируем контент модального окна
        modalBody.innerHTML = `
            <div class="project-modal" role="document" aria-labelledby="project-modal-title" aria-modal="true">
                <div class="project-modal__images">
                    ${project.images.map(img => `
                        <img src="${img}" alt="Скриншот проекта ${project.title}" loading="lazy">
                    `).join('')}
                </div>
                <div class="project-modal__content">
                    <h2 id="project-modal-title">${project.title}</h2>
                    <p class="project-modal__description">${project.description}</p>
                    
                    <div class="project-modal__section">
                        <h3>Технологии</h3>
                        <div class="tech-tags" role="list" aria-label="Использованные технологии">
                            ${project.technologies.map(tech => `
                                <span class="tech-tag" role="listitem">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="project-modal__section">
                        <h3>Основные функции</h3>
                        <ul class="features-list" aria-label="Основные функции проекта">
                            ${project.features.map(feature => `
                                <li>${feature}</li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-modal__actions">
                        ${project.liveDemo !== '#' ? `
                            <a href="${project.liveDemo}" class="button button--primary" target="_blank" rel="noopener noreferrer">
                                Демо
                            </a>
                        ` : ''}
                        ${project.sourceCode ? `
                            <a href="${project.sourceCode}" class="button button--secondary" target="_blank" rel="noopener noreferrer">
                                Исходный код
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        // Показываем модальное окно
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Фокус на кнопку закрытия для скринридеров
        const closeButton = projectModal.querySelector('.modal__close');
        closeButton.focus();
        
        // Активируем ловушку фокуса
        trapFocus(projectModal);
    }
    
    function closeModal() {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        
        // Возвращаем фокус на кнопку, которая открывала модальное окно
        if (activeButton) {
            activeButton.setAttribute('aria-expanded', 'false');
            activeButton.focus();
            activeButton = null;
        }
    }

    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        function handleKeydown(e) {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }

        // Добавляем обработчик
        modal.addEventListener('keydown', handleKeydown);
        
        // Функция для очистки
        return () => {
            modal.removeEventListener('keydown', handleKeydown);
        };
    }

    // Добавляем стили для модального окна проектов
    addModalStyles();
}

function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const modalStyles = document.createElement('style');
    modalStyles.id = 'modal-styles';
    modalStyles.textContent = `
        .project-modal {
            display: grid;
            gap: 2rem;
        }
        
        .project-modal__images img {
            width: 100%;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            height: auto;
        }
        
        .project-modal__content h2 {
            color: var(--text-primary);
            margin-bottom: 1rem;
        }
        
        .project-modal__description {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .project-modal__section {
            margin-bottom: 1.5rem;
        }
        
        .project-modal__section h3 {
            font-size: 1.125rem;
            margin-bottom: 0.75rem;
            color: var(--text-primary);
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .features-list {
            list-style: none;
            padding: 0;
        }
        
        .features-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-color);
            position: relative;
            padding-left: 1.5rem;
        }
        
        .features-list li:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--success-color);
            font-weight: bold;
        }
        
        .features-list li:last-child {
            border-bottom: none;
        }
        
        .project-modal__actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .project-modal__actions .button {
            min-width: 120px;
        }
        
        @media (max-width: 767px) {
            .project-modal__actions {
                flex-direction: column;
            }
            
            .project-modal__actions .button {
                width: 100%;
                justify-content: center;
            }
        }
        
        @media (min-width: 768px) {
            .project-modal {
                grid-template-columns: 1fr 1fr;
            }
        }
    `;
    document.head.appendChild(modalStyles);
}
