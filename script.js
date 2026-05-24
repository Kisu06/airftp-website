/**
 * AIR FTP SERVER — Main Website Interactions
 * Elegant micro-interactions, responsive navigation, and performance-optimized animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const spans = mobileToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            // Only remove if not on the privacy page (which is styled as always scrolled)
            if (!document.querySelector('.privacy-page')) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 3. Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animates once
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Interactive Phone Mockup Simulation (100% Screenshot Match)
    const mockActionBtn = document.getElementById('mockActionBtn');
    const mockStatusVal = document.getElementById('mockStatusVal');
    const mockBtnContent = document.getElementById('mockBtnContent');
    const mockDynamicContainer = document.getElementById('mockDynamicContainer');
    const mockStoppedContainer = document.getElementById('mockStoppedContainer');
    const mockCopyUrlBtn = document.getElementById('mockCopyUrlBtn');

    let isServerRunning = true;

    if (mockActionBtn) {
        mockActionBtn.addEventListener('click', () => {
            isServerRunning = !isServerRunning;
            
            if (isServerRunning) {
                // Change to RUNNING State
                mockStatusVal.textContent = 'Running';
                mockStatusVal.className = 'status-value running';
                mockBtnContent.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon" style="width:16px; height:16px;">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Stop Server
                `;
                mockDynamicContainer.style.display = 'flex';
                mockStoppedContainer.style.display = 'none';
            } else {
                // Change to STOPPED State
                mockStatusVal.textContent = 'Stopped';
                mockStatusVal.className = 'status-value stopped';
                mockBtnContent.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon" style="width:16px; height:16px;">
                        <path d="M12 3v13M5 10l7-7 7 7M4 21h16"/>
                    </svg>
                    Start Server
                `;
                mockDynamicContainer.style.display = 'none';
                mockStoppedContainer.style.display = 'flex';
            }
        });
    }

    if (mockCopyUrlBtn) {
        mockCopyUrlBtn.addEventListener('click', () => {
            const originalText = mockCopyUrlBtn.textContent;
            mockCopyUrlBtn.textContent = 'Copied!';
            mockCopyUrlBtn.style.color = '#34C759';
            mockCopyUrlBtn.style.borderColor = '#34C759';
            
            setTimeout(() => {
                mockCopyUrlBtn.textContent = originalText;
                mockCopyUrlBtn.style.color = '#2196F3';
                mockCopyUrlBtn.style.borderColor = 'var(--border-color)';
            }, 1500);
        });
    }

    // 6. Smooth scroll on load and automatically wipe hash from browser address bar
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    // Instantly and smoothly erase the hash (#) from the browser address bar!
                    history.replaceState("", document.title, window.location.pathname + window.location.search);
                }, 300);
            });
        }
    }
});

