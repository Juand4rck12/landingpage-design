// Animaciones al scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observar elementos
        document.querySelectorAll('.skill-card, .gallery-item').forEach(el => {
            observer.observe(el);
        });

        // Filtros de galería
        const galleryBtns = document.querySelectorAll('.gallery-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover clase active
                galleryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;

                // Filtrar items
                galleryItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 100);
                    } else {
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Modal para imágenes
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.close');

        // Abrir modal al hacer clic en imagen
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' && e.target.closest('.gallery-item')) {
                modal.style.display = 'block';
                modalImg.src = e.target.src;
                modalImg.alt = e.target.alt;
            }
        });

        // Cerrar modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Cerrar modal al hacer clic fuera de la imagen
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Efectos de scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Parallax mejorado y overlay oscuro
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3; // Parallax más sutil
            
            // Aplicar parallax solo si no estamos muy abajo
            if (scrolled < window.innerHeight) {
                header.style.transform = `translateY(${rate}px)`;
            }
            
            // Agregar overlay oscuro cuando se hace scroll
            if (scrolled > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });