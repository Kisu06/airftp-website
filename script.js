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

    // 5. Interactive Phone Mockup Simulation
    const mockPowerBtn = document.getElementById('mockPowerBtn');
    const mockStatusCard = document.getElementById('mockStatusCard');
    const mockStatusText = document.getElementById('mockStatusText');
    const mockServerUrl = document.getElementById('mockServerUrl');
    const mockUpload = document.getElementById('mockUpload');
    const mockDownload = document.getElementById('mockDownload');

    let isServerRunning = true;
    let statsInterval = null;

    function startStatsSimulation() {
        statsInterval = setInterval(() => {
            if (isServerRunning) {
                const upSpeed = (Math.random() * 15).toFixed(1);
                const downSpeed = (Math.random() * 3).toFixed(1);
                mockUpload.textContent = `${upSpeed} MB/s`;
                mockDownload.textContent = `${downSpeed} MB/s`;
            }
        }, 1500);
    }

    if (mockPowerBtn) {
        // Start simulation initially
        startStatsSimulation();

        mockPowerBtn.addEventListener('click', () => {
            isServerRunning = !isServerRunning;
            
            if (isServerRunning) {
                // Turn Server ON
                mockPowerBtn.classList.remove('stopped');
                mockStatusCard.classList.remove('stopped');
                mockStatusText.innerHTML = '<span class="status-dot"></span> Server Running';
                mockStatusText.style.color = '#4CAF50';
                mockServerUrl.textContent = 'ftp://192.168.1.102:2121';
                mockUpload.textContent = '12.8 MB/s';
                mockDownload.textContent = '1.4 MB/s';
                startStatsSimulation();
            } else {
                // Turn Server OFF
                mockPowerBtn.classList.add('stopped');
                mockStatusCard.classList.add('stopped');
                mockStatusText.innerHTML = '<span class="status-dot" style="background:#ef4444; box-shadow:none;"></span> Server Stopped';
                mockStatusText.style.color = '#ef4444';
                mockServerUrl.textContent = '—';
                mockUpload.textContent = '0.0 KB/s';
                mockDownload.textContent = '0.0 KB/s';
                clearInterval(statsInterval);
            }
        });
    }
});
