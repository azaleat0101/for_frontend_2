// Фильтрация проектов

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
});

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Фильтруем проекты
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-categories');
                    if (categories && categories.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
            
            // Добавляем анимацию появления
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.project-card[style="display: block"]');
                visibleCards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.classList.add('fade-in');
                });
            }, 50);
        });
    });
}

// Добавляем CSS для анимации
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);