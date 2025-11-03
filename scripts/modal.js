// Управление модальными окнами

document.addEventListener('DOMContentLoaded', function() {
    initProjectModals();
});

function initProjectModals() {
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
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
            "designElements": {
                "colorScheme": ["#2C1810", "#8B4513", "#D4AF37", "#F5F5DC"],
                "fonts": {
                    "headings": "Playfair Display",
                    "body": "Cormorant Garamond"
                },
                "layout": "Чистая сетка с достаточными полями"
            },
            "pages": [
                "Обложка с названием семьи",
                "Родословное древо (основная схема)",
                "Биографии ключевых предков", 
                "Семейные фотографии и документы",
                "Заключительная страница"
            ],
            "specialFeatures": [
                "Готовые места для вставки фотографий",
                "Шаблоны для разных типов информации",
                "Сбалансированные отступы и интерлиньяж",
                "Простая навигация по разделам"
            ],
            "deliverables": [
                "Figma файл с макетом книги",
                "PDF версия для печати",
                "Инструкция по заполнению",
                "Примеры заполненных страниц"
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
            "designElements": {
                "colorScheme": ["#0056A3", "#FF6B00", "#FFFFFF", "#F5F5F5", "#333333"],
                "fonts": {
                    "headings": "Inter Bold",
                    "body": "Inter Regular"
                },
                "layout": "Четкая сетка с акцентами на важной информации"
            },
            "pages": [
                "Обложка с логотипом МИРЭА и номером общежития",
                "Приветствие от старшекурсников",
                "Карта кампуса и 5-го общежития",
                "Расписание работы столовой, медпункта, библиотеки",
                "Чек-лист документов для заселения",
                "Правила проживания в общежитии",
                "Контакты кураторов и администрации",
                "Полезные телефоны и экстренные службы"
            ],
            "specialFeatures": [
                "QR-коды на важные ресурсы университета",
                "Шаблоны заявлений и документов",
                "Календарь академических событий",
                "Советы по адаптации к студенческой жизни",
                "Карта местности вокруг общежития",
                "Чек-листы для первокурсника"
            ],
            "deliverables": [
                "Figma файл с полным макетом методички",
                "PDF версия для печати в типографии",
                "Цифровая версия для рассылки",
                "Отдельные графические элементы для соцсетей"
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
            "architecture": {
                "core": "C++17 с модульной архитектурой",
                "ui": "Нативный WinAPI с кастомными контролами",
                "data": "JSON API ЦБ РФ и ECB",
                "build": "CMake для кроссплатформенной сборки"
            },
            "modules": [
                {
                    "name": "CurrencyCore",
                    "description": "Ядро приложения с логикой конвертации"
                },
                {
                    "name": "DataManager", 
                    "description": "Менеджер данных с кэшированием и API"
                },
                {
                    "name": "UIEngine",
                    "description": "Движок интерфейса на WinAPI"
                },
                {
                    "name": "SettingsManager",
                    "description": "Управление настройками и историей"
                }
            ],
            "uiComponents": [
                "Главное окно с выбором валют",
                "Поле ввода с валидацией",
                "Выпадающие списки валют с поиском",
                "Панель результатов с детализацией",
                "Окно истории конвертаций",
                "Настройки и обновление курсов"
            ],
            "technicalFeatures": [
                "Многопоточная загрузка данных",
                "Валидация ввода и обработка ошибок",
                "Локализация (русский/английский)",
                "Автообновление по расписанию",
                "Резервные источники данных",
                "Минимальное потребление ресурсов"
            ],
            "apis": [
                {
                    "name": "Центральный Банк РФ",
                    "url": "https://www.cbr-xml-daily.ru/daily_json.js"
                },
                {
                    "name": "European Central Bank", 
                    "url": "https://api.exchangerate-api.com/v4/latest/USD"
                }
            ],
            "buildInstructions": [
                "Требуется C++17 компилятор",
                "CMake 3.16+ для сборки",
                "Windows SDK для WinAPI",
                "Дополнительные либы: cURL, nlohmann/json"
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
            "pages": [
                {
                    "name": "Главная страница",
                    "sections": ["Герой-секция", "Навыки с прогресс-барами", "Лучшие проекты", "Call-to-action"]
                },
                {
                    "name": "Проекты", 
                    "sections": ["Галерея проектов", "Фильтры по технологиям", "Модальные окна деталей", "Быстрая навигация"]
                },
                {
                    "name": "Учебный дневник",
                    "sections": ["Хронология обучения", "Прогресс по курсам", "Статистика достижений", "Интерактивные элементы"]
                },
                {
                    "name": "Контакты",
                    "sections": ["Форма обратной связи", "Валидация данных", "Способы связи", "Карта и контакты"]
                }
            ],
            "technicalImplementation": {
                "layout": "CSS Grid и Flexbox для адаптивности",
                "animations": "CSS transitions и JavaScript",
                "forms": "HTML5 валидация + кастомная JS валидация",
                "navigation": "Single Page Application-like опыт",
                "performance": "Оптимизированные изображения и код"
            },
            "designSystem": {
                "colorPalette": ["#2563eb", "#64748b", "#1e293b", "#f8fafc", "#ffffff"],
                "typography": {
                    "headings": "Inter, sans-serif",
                    "body": "Inter, sans-serif"
                },
                "components": ["Кнопки", "Карточки", "Навигация", "Формы", "Модальные окна"]
            },
            "javascriptFeatures": [
                "Динамическая фильтрация контента",
                "Управление модальными окнами",
                "Валидация и обработка форм",
                "Плавная прокрутка и навигация",
                "Анимации при скролле",
                "Интерактивные элементы интерфейса"
            ],
            "responsiveBreakpoints": [
                "Mobile: < 768px",
                "Tablet: 768px - 1024px", 
                "Desktop: > 1024px"
            ],
            "browserSupport": [
                "Chrome 60+",
                "Firefox 55+",
                "Safari 12+",
                "Edge 79+"
            ],
            "performanceOptimizations": [
                "Оптимизированные изображения WebP",
                "Минифицированные CSS/JS",
                "Ленивая загрузка контента",
                "Эффективное использование кэша"
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
            "architecture": {
                "frontend": "PySide6 (Qt для Python)",
                "backend": "Python 3.9+ с psycopg2",
                "database": "PostgreSQL 12+",
                "reports": "Matplotlib + pandas для аналитики"
            },
            "modules": [
                {
                    "name": "DatabaseManager",
                    "description": "Управление подключениями и выполнение SQL запросов"
                },
                {
                    "name": "UIManager", 
                    "description": "Построение интерфейса и обработка пользовательского ввода"
                },
                {
                    "name": "DataVisualization",
                    "description": "Генерация графиков и диаграмм"
                },
                {
                    "name": "ReportGenerator",
                    "description": "Создание отчетов в различных форматах"
                },
                {
                    "name": "BackupManager",
                    "description": "Резервное копирование и восстановление БД"
                }
            ],
            "uiComponents": [
                "Главное окно с навигационной панелью",
                "Таблицы данных с сортировкой и фильтрацией",
                "Формы для добавления и редактирования записей",
                "Панель построителя запросов",
                "Визуализация данных в реальном времени",
                "Настройки подключения к базе данных"
            ],
            "databaseFeatures": [
                "Поддержка нескольких схем базы данных",
                "Транзакции с откатом изменений",
                "Оптимизированные запросы с индексацией",
                "Логирование всех операций",
                "Валидация данных на стороне БД",
                "Автоматическое обновление связанных данных"
            ],
            "technicalFeatures": [
                "Многопоточные операции с базой данных",
                "Кэширование часто запрашиваемых данных",
                "Валидация ввода и обработка ошибок",
                "Локализация интерфейса",
                "Темное/светлое оформление",
                "Горячие клавиши для быстрого доступа"
            ],
            "supportedOperations": [
                "Создание и управление таблицами",
                "Импорт/экспорт данных (CSV, JSON, Excel)",
                "Выполнение произвольных SQL запросов",
                "Построение сложных отчетов",
                "Анализ производительности запросов",
                "Управление пользователями и правами доступа"
            ],
            "systemRequirements": [
                "Python 3.9 или выше",
                "PostgreSQL 12+",
                "Минимум 4GB оперативной памяти",
                "100MB свободного места на диске",
                "Windows 10/11, Linux или macOS"
            ],
            "images": ["../images/project_5.jpg"],
            "liveDemo": "#",
            "sourceCode": "https://github.com/bergks/Database_project.git"
        }
    };
    
    // Обработчики для кнопок "Подробнее"
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const projectData = projectsData[projectId];
            
            if (projectData) {
                showProjectModal(projectData);
            }
        });
    });
    
    // Закрытие модального окна
    modalClose.addEventListener('click', closeModal);
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
    
    function showProjectModal(project) {
        modalBody.innerHTML = `
            <div class="project-modal">
                <div class="project-modal__images">
                    ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
                </div>
                <div class="project-modal__content">
                    <h2>${project.title}</h2>
                    <p class="project-modal__description">${project.description}</p>
                    
                    <div class="project-modal__section">
                        <h3>Технологии</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-modal__section">
                        <h3>Основные функции</h3>
                        <ul class="features-list">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-modal__actions">
                        ${project.liveDemo !== '#' ? `<a href="${project.liveDemo}" class="button button--primary" target="_blank">Демо</a>` : ''}
                        ${project.sourceCode ? `<a href="${project.sourceCode}" class="button button--secondary" target="_blank">Исходный код</a>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Стили для модального окна проектов
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .project-modal {
        display: grid;
        gap: 2rem;
    }
    
    .project-modal__images img {
        width: 100%;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
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
    
    @media (min-width: 768px) {
        .project-modal {
            grid-template-columns: 1fr 1fr;
        }
    }
`;
document.head.appendChild(modalStyles);