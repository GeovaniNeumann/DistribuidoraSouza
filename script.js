
        // Efeito de partículas
        function createParticles() {
            const particlesContainer = document.getElementById('particles-js');
            // Remove as partículas existentes antes de criar novas (útil para redimensionamento)
            particlesContainer.innerHTML = ''; 
            const particleCount = window.innerWidth < 768 ? 20 : 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Posição aleatória
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                // Tamanho aleatório
                const size = Math.random() * 5 + 2;
                
                // Duração da animação aleatória
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Animação de flutuação para partículas
        let styleTag = document.getElementById('float-keyframes');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'float-keyframes';
            styleTag.innerHTML = `
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    25% { transform: translate(10px, 10px); }
                    50% { transform: translate(-10px, 10px); }
                    75% { transform: translate(-10px, -10px); }
                }
            `;
            document.head.appendChild(styleTag);
        }
        
        // Menu Mobile
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Correção de acessibilidade: atualiza o aria-label corretamente
            const isActive = navMenu.classList.contains('active');
            mobileMenu.innerHTML = isActive ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            mobileMenu.setAttribute('aria-label', isActive ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
                    mobileMenu.setAttribute('aria-label', 'Abrir menu de navegação');
                }   
            });
        });
        
        // Slider de Depoimentos
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.slider-dot');
        
        function showTestimonial(index) {
            // Garante que o índice esteja dentro dos limites
            if (index < 0 || index >= testimonials.length) {
                index = (index + testimonials.length) % testimonials.length;
            }

            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentTestimonial = index;
            testimonials[currentTestimonial].classList.add('active');
            dots[currentTestimonial].classList.add('active');
        }
        
        // Auto-rotacionar depoimentos
        let testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Pausar auto-rotação quando o usuário interagir
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Se o usuário clicar, mude o depoimento imediatamente e reinicie o timer
                showTestimonial(index); 
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(() => {
                    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                    showTestimonial(currentTestimonial);
                }, 5000);
            });
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // O valor 80 é a altura do header fixo
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Animação ao rolar (Scroll reveal)
        function animateOnScroll() {
            const serviceCards = document.querySelectorAll('.service-card:not(.animated)');
            const windowHeight = window.innerHeight;
            
            serviceCards.forEach((card, index) => {
                const cardPosition = card.getBoundingClientRect().top;
                const animationPoint = windowHeight - 100; // Ponto de animação (100px antes do fim da tela)
                
                if (cardPosition < animationPoint) {
                    // Aplica um pequeno delay para a animação em cascata
                    setTimeout(() => {
                        card.classList.add('animated');
                        // Removida a linha de style.transitionDelay, pois a lógica de delay está no setTimeout
                    }, index * 100);
                }
            });
        }
        
        // Header scroll effect e Back to Top visibility
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            const backToTop = document.getElementById('back-to-top');
            
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            animateOnScroll();
        });
        
        // Botão "Voltar ao Topo"
        const backToTopButton = document.getElementById('back-to-top');
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Inicialização
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            showTestimonial(0); // Garante que o primeiro depoimento seja exibido
            
            // Animação inicial dos cards de serviço, após um pequeno atraso para melhor visualização
            setTimeout(() => {
                animateOnScroll();
            }, 300); // 300ms de atraso
        });
        
        // Redimensionamento da janela
        window.addEventListener('resize', () => {
            // Recriar partículas para ajustar a quantidade
            createParticles();
            
            // Rechecar se cards precisam ser animados
            animateOnScroll();
        });
