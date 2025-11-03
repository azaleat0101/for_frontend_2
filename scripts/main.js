// Основной скрипт для общих функций

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация прогресс-баров
    initProgressBars();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
});

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = nav.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Анимация прогресс-баров
function initProgressBars() {
    const progressBars = document.querySelectorAll('.skill__progress, .course__progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width') + '%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .skill, .entry');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Утилита для форматирования даты
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

// Утилита для проверки видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}