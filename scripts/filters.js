// Фильтрация проектов

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
});

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        // Добавляем обработчики клавиатуры
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateFilter(this);
            }
        });
        
        button.addEventListener('click', function() {
            activateFilter(this);
        });
    });
    
    function activateFilter(activeButton) {
        // Убираем активный класс и aria-pressed у всех кнопок
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Добавляем активный класс текущей кнопке
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
        
        const filterValue = activeButton.getAttribute('data-filter');
        
        // Фильтруем проекты
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                card.removeAttribute('aria-hidden');
            } else {
                const categories = card.getAttribute('data-categories');
                if (categories && categories.includes(filterValue)) {
                    card.style.display = 'block';
                    card.removeAttribute('aria-hidden');
                } else {
                    card.style.display = 'none';
                    card.setAttribute('aria-hidden', 'true');
                }
            }
        });
        
        // Обновляем live region для скринридеров
        updateFilterStatus(filterValue);
        
        // Добавляем анимацию появления
        setTimeout(() => {
            const visibleCards = document.querySelectorAll('.project-card[style="display: block"]');
            visibleCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('fade-in');
            });
        }, 50);
    }
    
    function updateFilterStatus(filterValue) {
        let statusMessage = '';
        const visibleCount = document.querySelectorAll('.project-card[style="display: block"]').length;
        const totalCount = projectCards.length;
        
        if (filterValue === 'all') {
            statusMessage = `Показаны все проекты. ${visibleCount} из ${totalCount} проектов отображается.`;
        } else {
            const filterName = getFilterName(filterValue);
            statusMessage = `Фильтр применен: ${filterName}. ${visibleCount} из ${totalCount} проектов отображается.`;
        }
        
        // Создаем или обновляем live region
        let liveRegion = document.getElementById('filter-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'filter-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'visually-hidden';
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = statusMessage;
    }
    
    function getFilterName(filterValue) {
        const filterNames = {
            'all': 'Все',
            'html': 'HTML/CSS',
            'cplusplus': 'C++',
            'winapi': 'WinAPI',
            'js': 'JavaScript',
            'figma': 'Figma',
            'python': 'Python',
            'postgres': 'PostgreSQL'
        };
        return filterNames[filterValue] || filterValue;
    }
}

// Добавляем CSS для анимации и доступности
const style = document.createElement('style');
style.textContent = `
    .projects__filters {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
    }
    
    .filter-btn {
        padding: 0.5rem 1rem;
        border: 2px solid var(--border-color);
        background: var(--bg-white);
        color: var(--text-secondary);
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
        font-weight: 500;
        font-family: inherit;
        font-size: 1rem;
    }
    
    .filter-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }
    
    .filter-btn:focus-visible {
        outline: 3px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .filter-btn.active,
    .filter-btn[aria-pressed="true"] {
        border-color: var(--primary-color);
        background-color: var(--primary-color);
        color: white;
    }
    
    .project-card {
        transition: all 0.3s ease;
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    /* Улучшенные стили для фокуса */
    .filter-btn:focus:not(:focus-visible) {
        outline: none;
    }
    
    /* Адаптивность */
    @media (max-width: 768px) {
        .projects__filters {
            gap: 0.5rem;
        }
        
        .filter-btn {
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
        }
    }
    
    @media (max-width: 480px) {
        .projects__filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 0.5rem;
        }
        
        .filter-btn {
            flex-shrink: 0;
        }
    }
`;
document.head.appendChild(style);