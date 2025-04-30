// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        });
    }

    // Enhanced Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Enhanced Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100px)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    // Enhanced Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    if (sections.length && navItems.length) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '-100px 0px -50% 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href').slice(1) === id) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    }

    // Enhanced Skills animation
    const skillItems = document.querySelectorAll('.skill-item');
    const animateSkills = () => {
        skillItems.forEach((item, index) => {
            const percent = item.getAttribute('data-percent');
            const progress = item.querySelector('.skill-progress');
            if (progress) {
                setTimeout(() => {
                    progress.style.width = `${percent}%`;
                }, index * 200);
            }
        });
    };

    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills-container')) {
                    animateSkills();
                }
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with enhanced animations
    document.querySelectorAll('.skills-container, .project-card, .about-content, .contact-container').forEach(el => {
        observer.observe(el);
    });

    // Enhanced Stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        statNumbers.forEach((stat, index) => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            setTimeout(() => {
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        stat.textContent = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };

                updateCount();
            }, index * 300);
        });
    };

    // Enhanced Stats observer
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        statsObserver.observe(statsSection);
    }

    // Enhanced Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
                if (menuBtn) {
                    menuBtn.classList.remove('active');
                }
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Enhanced Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            console.log('Form submitted:', data);
            
            // Enhanced success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Message sent successfully!</span>
            `;
            contactForm.appendChild(successMessage);
            
            // Reset form with animation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach((input, index) => {
                setTimeout(() => {
                    input.style.transform = 'translateX(-10px)';
                    setTimeout(() => {
                        input.style.transform = 'translateX(0)';
                        input.value = '';
                    }, 200);
                }, index * 100);
            });
            
            // Remove success message with animation
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 3000);
        });
    }

    // Enhanced Typing effect
    const heroTexts = document.querySelectorAll('.hero h1, .hero h2, .hero p');
    heroTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                text.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30 + Math.random() * 30);
            }
        };
        
        setTimeout(typeWriter, index * 500);
    });

    // Enhanced Parallax effect
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
            
            // Add depth effect to floating shapes
            const shapes = hero.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Enhanced Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Enhanced Scroll reveal
    const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-container, .projects-grid, .contact-container');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Add cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .stat-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}); 