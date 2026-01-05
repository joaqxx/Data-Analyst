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

        // Projects Modal - show only first N projects and populate modal when needed
        const viewAllBtn = document.getElementById('viewAllBtn');
        const projectsModal = document.getElementById('projectsModal');
        const closeProjectsModal = document.getElementById('closeProjectsModal');
        const projectsGrid = document.querySelector('.projects-grid');
        const projectCards = projectsGrid ? Array.from(projectsGrid.querySelectorAll('.project-card')) : [];

        const MAX_VISIBLE = 4;

        function updateProjectVisibility() {
            if (!projectsGrid) return;
            if (projectCards.length > MAX_VISIBLE) {
                projectCards.forEach((card, idx) => {
                    card.style.display = idx < MAX_VISIBLE ? '' : 'none';
                });
                if (viewAllBtn) viewAllBtn.style.display = '';
            } else {
                projectCards.forEach(card => card.style.display = '');
                if (viewAllBtn) viewAllBtn.style.display = 'none';
            }
        }

        function populateProjectsModal() {
            if (!projectsModal) return;
            const modalGrid = projectsModal.querySelector('.projects-modal-grid');
            if (!modalGrid) return;
            modalGrid.innerHTML = '';
            projectCards.forEach((card, idx) => {
                // Create a modal link that points to the project's dedicated page
                const projectId = card.getAttribute('data-project-id') || (idx + 1);
                const anchor = document.createElement('a');
                anchor.href = `projects/project-${projectId}.html`;
                anchor.className = 'card p-6 transition hover:scale-105 block';
                // Clone inner contents so we preserve image/title/description
                const inner = card.cloneNode(true).innerHTML;
                anchor.innerHTML = inner;
                // Ensure no duplicated fade-in classes
                anchor.querySelectorAll('.fade-in-element').forEach(el => el.classList.remove('fade-in-element'));
                modalGrid.appendChild(anchor);
            });

            // Attach click handlers to modal entries
            modalGrid.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', function (e) {
                    // Let the anchor navigate normally; close modal for better UX
                    projectsModal.classList.remove('active');
                });
            });
        }

        // Initialize visibility
        updateProjectVisibility();

        if (viewAllBtn && projectsModal) {
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                populateProjectsModal();
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

        // Project card click handlers (visible grid)
        projectCards.forEach(card => {
            // Ensure anchor cards link to the project page
            const projectId = card.getAttribute('data-project-id');
            const targetUrl = `projects/project-${projectId}.html`;
            if (card.tagName && card.tagName.toLowerCase() === 'a') {
                card.href = targetUrl;
            }
            card.addEventListener('click', function (e) {
                // Allow default anchor navigation, but also handle non-anchor cards
                if (card.tagName && card.tagName.toLowerCase() !== 'a') {
                    window.location.href = targetUrl;
                }
            });
        });

        // If there are existing modal static cards, attach handlers too (fallback)
        if (projectsModal) {
            projectsModal.querySelectorAll('.card[data-project-id]').forEach(card => {
                card.addEventListener('click', function () {
                    const projectId = this.getAttribute('data-project-id');
                    console.log('[v0] Clicked project from modal:', projectId);
                });
            });
        }