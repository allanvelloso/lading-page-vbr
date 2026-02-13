/* ===================================
   VINICIUS BRASIL - MAIN SCRIPT
   Interactivity, Navigation & Validation
   =================================== */

// ===================================
// LOGO FALLBACK (tenta .png, .jpg, .jpeg, .webp)
// ===================================
(function() {
    const logoPaths = ['images/logo-dourada.png', 'images/logo-dourada.jpg', 'images/logo-dourada.jpeg', 'images/logo-dourada.webp', '../images/logo-dourada.png', '../images/logo-dourada.jpg'];
    document.querySelectorAll('.navbar-logo').forEach(function(img) {
        let index = 0;
        img.onerror = function() {
            index++;
            if (index < logoPaths.length) {
                this.src = logoPaths[index];
            } else {
                this.style.display = 'none';
            }
        };
    });
})();

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isActive = navbarMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Update ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        hamburger.setAttribute('aria-label', isActive ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        hamburger.classList.remove('active');
        if (hamburger) {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
        }
    });
});

// ===================================
// ACTIVE NAV LINK INDICATOR
// ===================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set active link on page load
setActiveNavLink();

// ===================================
// FADE IN ANIMATION ON SCROLL
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// CONTACT FORM VALIDATION & SUBMISSION
// ===================================

const contactForm = document.getElementById('contactForm');

// EmailJS Configuration
// IMPORTANTE: Substitua estes valores pelos seus IDs do EmailJS
// Veja o arquivo IMPLEMENTACAO_EMAILJS.md para instruções detalhadas
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'SUA_PUBLIC_KEY_AQUI', // Substitua pela sua Public Key
    SERVICE_ID: 'SEU_SERVICE_ID_AQUI',  // Substitua pelo seu Service ID
    TEMPLATE_ID: 'SEU_TEMPLATE_ID_AQUI' // Substitua pelo seu Template ID
};

// Check if EmailJS is available
const isEmailJSConfigured = () => {
    return EMAILJS_CONFIG.PUBLIC_KEY !== 'SUA_PUBLIC_KEY_AQUI' && 
           typeof emailjs !== 'undefined';
};

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const company = document.getElementById('company').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset error messages
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        nameError.classList.remove('show');
        emailError.classList.remove('show');
        messageError.classList.remove('show');
        
        // Remove previous error messages
        const existingErrors = contactForm.querySelectorAll('.form-error');
        existingErrors.forEach(error => error.remove());
        
        let isValid = true;
        
        // Validate name
        if (name.length < 3) {
            nameError.textContent = 'Nome deve ter pelo menos 3 caracteres';
            nameError.classList.add('show');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Email inválido';
            emailError.classList.add('show');
            isValid = false;
        }
        
        // Validate message
        if (message.length < 10) {
            messageError.textContent = 'Mensagem deve ter pelo menos 10 caracteres';
            messageError.classList.add('show');
            isValid = false;
        }
        
        if (isValid) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            const formSuccess = document.getElementById('formSuccess');
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            submitButton.style.opacity = '0.7';
            submitButton.style.cursor = 'not-allowed';
            
            try {
                // Try to send via EmailJS if configured
                if (isEmailJSConfigured()) {
                    await emailjs.send(
                        EMAILJS_CONFIG.SERVICE_ID,
                        EMAILJS_CONFIG.TEMPLATE_ID,
                        {
                            name: name,
                            email: email,
                            company: company || 'Não informado',
                            message: message,
                            timestamp: new Date().toLocaleString('pt-BR')
                        }
                    );
                    
                    // Track successful submission
                    trackEvent('form_submission_success', {
                        form_name: 'contact_form',
                        method: 'emailjs',
                        page: window.location.pathname
                    });
                } else {
                    // Fallback: Log to console and show success (for development)
                    console.log('Form submitted (EmailJS not configured):', {
                        name: name,
                        email: email,
                        company: company,
                        message: message,
                        timestamp: new Date().toISOString()
                    });
                    
                    // Show warning that EmailJS needs to be configured
                    console.warn('⚠️ EmailJS não configurado. Configure seguindo o guia IMPLEMENTACAO_EMAILJS.md');
                    
                    trackEvent('form_submission_success', {
                        form_name: 'contact_form',
                        method: 'console_log',
                        page: window.location.pathname
                    });
                }
                
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Track event
                trackEvent('form_submission', {
                    form_name: 'contact_form',
                    page: window.location.pathname
                });
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.style.opacity = '1';
                    submitButton.style.cursor = 'pointer';
                }, 5000);
                
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.style.cssText = `
                    background-color: rgba(255, 107, 107, 0.1);
                    border: 1px solid #ff6b6b;
                    color: #ff6b6b;
                    padding: 15px;
                    border-radius: 5px;
                    text-align: center;
                    margin-top: 20px;
                    font-size: 14px;
                `;
                errorDiv.innerHTML = `
                    <strong>Erro ao enviar mensagem.</strong><br>
                    Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp: 
                    <a href="https://wa.me/5522999008197" target="_blank" rel="noopener noreferrer" style="color: #ff6b6b; text-decoration: underline;">(22) 99900-8197</a>
                `;
                contactForm.appendChild(errorDiv);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
                
                // Remove error message after 8 seconds
                setTimeout(() => {
                    errorDiv.remove();
                }, 8000);
                
                // Track error
                trackEvent('form_submission_error', {
                    form_name: 'contact_form',
                    error: error.message,
                    page: window.location.pathname
                });
            }
        }
    });
}

// ===================================
// REDIRECT TO WHATSAPP
// ===================================

function redirectWhatsApp(planName) {
    const phoneNumber = '5522999008197';
    const message = `Olá Vinicius! Gostaria de saber mais sobre a ${planName}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ===================================
// COUNTER ANIMATION
// ===================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

// Animate stat numbers when they come into view
const statNumbers = document.querySelectorAll('.stat-number, .audiencia-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                animateCounter(entry.target, number);
                statObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(element => {
    statObserver.observe(element);
});

// ===================================
// BUTTON HOVER EFFECTS
// ===================================

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo da página');
document.body.appendChild(scrollToTopBtn);

// Throttle scroll event for better performance
let ticking = false;
function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    // Track event
    trackEvent('scroll_to_top', {
        page: window.location.pathname
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// PAGE LOAD ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navbarMenu && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
        }
    }
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// ANALYTICS TRACKING (Optional)
// ===================================

function trackEvent(eventName, eventData = {}) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log(`Event tracked: ${eventName}`, eventData);
}

// Track button clicks
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            page: window.location.pathname
        });
    });
});

// Track form submissions
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        trackEvent('form_submission', {
            form_name: 'contact_form',
            page: window.location.pathname
        });
    });
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================

console.log(
    '%c🏋️ Vinicius Brasil - Site Oficial',
    'font-size: 20px; font-weight: bold; color: #d4af37;'
);
console.log(
    '%cEx-atleta de fisiculturismo | Consultoria Personalizada | Parcerias Estratégicas',
    'font-size: 14px; color: #cccccc;'
);
console.log(
    '%cPara mais informações: https://viniciusbrasil.com',
    'font-size: 12px; color: #999999;'
);
