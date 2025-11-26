// Валидация форм

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initSuccessModal();
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            // Имитация отправки формы
            simulateFormSubmission();
        }
    });
    
    // Валидация в реальном времени
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

function validateContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.name + '-error');
    
    // Очищаем предыдущую ошибку
    clearError(field);
    
    // Сбрасываем ARIA-атрибуты
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    
    // Проверка на обязательное поле
    if (field.hasAttribute('required') && !value) {
        showError(field, 'Это поле обязательно для заполнения');
        return false;
    }
    
    // Проверка email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Введите корректный email адрес');
            return false;
        }
    }
    
    // Проверка минимальной длины для сообщения
    if (field.name === 'message' && value.length < 10) {
        showError(field, 'Сообщение должно содержать минимум 10 символов');
        return false;
    }
    
    return true;
}

function showError(field, message) {
    field.style.borderColor = 'var(--error-color)';
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', field.name + '-error');
    
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
    }
}

function clearError(field) {
    field.style.borderColor = '';
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.removeAttribute('role');
    }
}

function simulateFormSubmission() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Показываем индикатор загрузки
    submitButton.innerHTML = '<span>Отправка...</span>';
    submitButton.disabled = true;
    
    // Имитация задержки сети
    setTimeout(() => {
        // Сбрасываем форму
        form.reset();
        
        // Восстанавливаем кнопку
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Показываем модальное окно успеха
        showSuccessModal();
    }, 1500);
}

function initSuccessModal() {
    const successModal = document.getElementById('success-modal');
    const closeButtons = document.querySelectorAll('#success-modal-close, #success-modal-ok');
    
    if (!successModal) return;
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

function showSuccessModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Дополнительные стили для форм
const formStyles = document.createElement('style');
formStyles.textContent = `
    .contact-form .form-group {
        position: relative;
    }
    
    .error-message {
        color: var(--error-color);
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
        min-height: 1.25rem;
    }
    
    input:invalid, textarea:invalid {
        border-color: var(--error-color);
    }
    
    input:valid, textarea:valid {
        border-color: var(--success-color);
    }
    
    .success-icon {
        width: 64px;
        height: 64px;
        background-color: var(--success-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin: 0 auto 1rem;
    }
`;
document.head.appendChild(formStyles);