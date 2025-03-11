document.addEventListener('DOMContentLoaded', function () {

    const menuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');

    menuMobile.addEventListener('click', function () {
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


    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section');
        const menuItems = document.querySelectorAll('.menu a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        menuItems.forEach(item => {
            item.classList.remove('active');
            if (current && item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
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

            let isValid = true;
            const inputs = form.querySelectorAll('input, textarea, select');

            inputs.forEach(input => {
                if (input.value.trim() === '' || (input.tagName === 'SELECT' && input.value === '')) {
                    isValid = false;
                    input.classList.add('error');


                    input.addEventListener('input', function () {
                        this.classList.remove('error');
                    }, { once: true });
                }
            });

            if (isValid) {

                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
});
