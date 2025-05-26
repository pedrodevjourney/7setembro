document.addEventListener('DOMContentLoaded', function () {

    const menuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');

    menuMobile.addEventListener('click', function () {
        this.classList.toggle('active');
        menu.classList.toggle('active');

        if (menu.classList.contains('active')) {
            menu.style.display = 'flex';
            menu.style.flexDirection = 'column';
            menu.style.position = 'absolute';
            menu.style.top = '100%';
            menu.style.left = '0';
            menu.style.width = '100%';
            menu.style.backgroundColor = 'white';
            menu.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
            menu.style.padding = '20px';
        } else {
            menu.style.display = '';
        }
    });

    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuMobile.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    menu.style.display = '';
                }
            }
        });
    });

    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    const animateElements = document.querySelectorAll('.servico-card, .sobre-content, .contato-content');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    const form = document.querySelector('.contato-form form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.querySelector('input[name="nome"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const telefone = document.querySelector('input[name="telefone"]').value;
            const servico = document.querySelector('select[name="servico"]').value;
            const mensagem = document.querySelector('textarea[name="mensagem"]').value;

            if (nome && email && telefone && servico && mensagem) {
                const mensagemWhatsapp =
                    `*Nova mensagem do site - Lavajato 7 de Setembro*\n\n` +
                    `*Nome:* ${nome}\n` +
                    `*E-mail:* ${email}\n` +
                    `*Telefone:* ${telefone}\n` +
                    `*Serviço:* ${servico}\n` +
                    `*Mensagem:* ${mensagem}`;

                const mensagemCodificada = encodeURIComponent(mensagemWhatsapp);

                window.open(`https://wa.me/5537999610452?text=${mensagemCodificada}`, '_blank');

                form.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }

    function initModal() {
        const modalTriggers = document.querySelectorAll('.modal-trigger');
        const closeButtons = document.querySelectorAll('.close-modal');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                const modal = document.getElementById(`${modalId}-modal`);

                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    activeModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    initModal();

    // Flipbox Animation
    const flipboxes = document.querySelectorAll('.flipbox');

    flipboxes.forEach(flipbox => {
        flipbox.addEventListener('click', function () {
            this.querySelector('.flipbox-inner').style.transform =
                this.querySelector('.flipbox-inner').style.transform === 'rotateY(180deg)'
                    ? 'rotateY(0deg)'
                    : 'rotateY(180deg)';
        });

        // Adiciona efeito de hover com delay
        let timeout;
        flipbox.addEventListener('mouseenter', function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.querySelector('.flipbox-inner').style.transform = 'rotateY(180deg)';
            }, 300);
        });

        flipbox.addEventListener('mouseleave', function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.querySelector('.flipbox-inner').style.transform = 'rotateY(0deg)';
            }, 300);
        });
    });
});
