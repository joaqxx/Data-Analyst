        // Floating navbar scroll effect
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Smooth scroll navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-element').forEach(el => {
            observer.observe(el);
        });

        // Contact Modal - safely register listeners only when elements exist
        const contactBtn = document.getElementById('contactBtn');
        const footerContactBtn = document.getElementById('footerContactBtn'); // optional element
        const contactModal = document.getElementById('contactModal');
        const closeModal = document.getElementById('closeModal');

        if (contactBtn && contactModal) {
            contactBtn.addEventListener('click', () => {
                contactModal.classList.add('active');
            });
        }

        if (footerContactBtn && contactModal) {
            footerContactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                contactModal.classList.add('active');
            });
        }

        if (closeModal && contactModal) {
            closeModal.addEventListener('click', () => {
                contactModal.classList.remove('active');
            });
        }

        if (contactModal) {
            contactModal.addEventListener('click', (e) => {
                if (e.target === contactModal) {
                    contactModal.classList.remove('active');
                }
            });
        }

        // Projects Modal - safe handlers
        const viewAllBtn = document.getElementById('viewAllBtn');
        const projectsModal = document.getElementById('projectsModal');
        const closeProjectsModal = document.getElementById('closeProjectsModal');

        if (viewAllBtn && projectsModal) {
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                projectsModal.classList.add('active');
            });
        }

        if (closeProjectsModal && projectsModal) {
            closeProjectsModal.addEventListener('click', () => {
                projectsModal.classList.remove('active');
            });
        }

        if (projectsModal) {
            projectsModal.addEventListener('click', (e) => {
                if (e.target === projectsModal) {
                    projectsModal.classList.remove('active');
                }
            });
        }

        // Note: download is handled by a native HTML anchor (<a href="Resume.pdf" download>) in index.html.
        // This avoids generating blob-based downloads in JS and lets the browser handle file retrieval.

        // Project card click handlers
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project-id');
                console.log("[v0] Clicked project:", projectId);
                // Navigate to project detail page or open project info
                // Example: window.location.href = `/project/${projectId}`;
            });
        });

        if (projectsModal) {
            projectsModal.querySelectorAll('.card[data-project-id]').forEach(card => {
                card.addEventListener('click', function() {
                    const projectId = this.getAttribute('data-project-id');
                    console.log("[v0] Clicked project from modal:", projectId);
                    // Navigate to project detail page
                    // Example: window.location.href = `/project/${projectId}`;
                });
            });
        }