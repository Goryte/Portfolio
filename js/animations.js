// Анимации и интерактивные элементы для портфолио

// Функция для инициализации всех анимаций
function initAnimations() {
    // Инициализация AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Инициализация счетчиков
    initCounters();
    
    // Инициализация параллакс-эффекта
    initParallax();
    
    // Инициализация анимированных навыков
    initSkillsAnimation();
    
    // Инициализация частиц для фона шапки
    initParticles();
    
    // Инициализация прелоадера
    initPreloader();
    
    // Плавная прокрутка для навигации
    initSmoothScroll();
    
    // Анимация для кнопок
    initButtonAnimations();
}

// Функция для инициализации счетчиков
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 секунды
        const step = Math.ceil(target / (duration / 16)); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = current;
            requestAnimationFrame(updateCounter);
        };
        
        // Запускаем счетчик только когда элемент в зоне видимости
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Функция для инициализации параллакс-эффекта
function initParallax() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 600) {
            header.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });
}

// Функция для анимации навыков
function initSkillsAnimation() {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.classList.add('skill-animated');
        });
        
        skill.addEventListener('mouseleave', () => {
            setTimeout(() => {
                skill.classList.remove('skill-animated');
            }, 300);
        });
    });
}

// Функция для инициализации частиц
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Функция для инициализации прелоадера
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('preloader-hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

// Функция для плавной прокрутки
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Функция для анимации кнопок
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const x = e.clientX - button.getBoundingClientRect().left;
            const y = e.clientY - button.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Инициализация всех анимаций при загрузке страницы
document.addEventListener('DOMContentLoaded', initAnimations);

// Функция для переключения темной темы
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Обновляем иконку переключателя
    const themeToggleIcon = document.querySelector('.theme-toggle i');
    if (themeToggleIcon) {
        themeToggleIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Проверяем сохраненную тему при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        const themeToggleIcon = document.querySelector('.theme-toggle i');
        if (themeToggleIcon) {
            themeToggleIcon.className = 'fas fa-sun';
        }
    }
});

// Функция для открытия модального окна с проектом
function openProjectModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    if (modal) {
        modal.classList.add('modal-active');
        document.body.style.overflow = 'hidden';
    }
}

// Функция для закрытия модального окна
function closeProjectModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    if (modal) {
        modal.classList.remove('modal-active');
        document.body.style.overflow = '';
    }
}

// Закрытие модального окна при клике вне его содержимого
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('modal-active');
        document.body.style.overflow = '';
    }
});

// Функция для фильтрации проектов
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Обновляем активную кнопку фильтра
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
    
    // Фильтруем проекты
    projects.forEach(project => {
        if (category === 'all') {
            project.style.display = 'block';
            setTimeout(() => {
                project.classList.remove('hidden');
            }, 10);
        } else {
            if (project.getAttribute('data-category') === category) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.classList.remove('hidden');
                }, 10);
            } else {
                project.classList.add('hidden');
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        }
    });
}

// Функция для анимации прогресса навыков
function animateSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = `${progress}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar.parentElement);
    });
}

// Инициализация анимации прогресса навыков при загрузке
document.addEventListener('DOMContentLoaded', animateSkillProgress);

// Функция для анимации печатающегося текста
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const phrases = JSON.parse(typewriterElement.getAttribute('data-phrases'));
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // Пауза перед удалением
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Пауза перед новой фразой
            }
            
            setTimeout(type, typingSpeed);
        }
        
        type();
    }
}

// Инициализация печатающегося текста при загрузке
document.addEventListener('DOMContentLoaded', initTypewriter);
