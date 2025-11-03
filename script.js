document.documentElement.classList.add('has-js');

const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('nav');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('is-open');
        navLinks.classList.toggle('nav__links--open');
    });

    document.querySelectorAll('.nav__links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('is-open');
            navLinks.classList.remove('nav__links--open');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            event.preventDefault();
            const offset = nav ? nav.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset + 10;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    });
}

const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const revealElements = document.querySelectorAll('.section, .manifesto__card, .timeline__item, .method__card, .case, .masterclass__container, .testimonial, .contact__link');
let current = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, idx) => {
        testimonial.classList.toggle('active', idx === index);
        if (dots[idx]) {
            dots[idx].classList.toggle('active', idx === index);
        }
    });
}

if (testimonials.length && dots.length) {
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            current = Number(dot.dataset.index);
            showTestimonial(current);
            resetInterval();
        });
    });

    let sliderInterval = setInterval(() => {
        current = (current + 1) % testimonials.length;
        showTestimonial(current);
    }, 9000);

    function resetInterval() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            current = (current + 1) % testimonials.length;
            showTestimonial(current);
        }, 9000);
    }
}

showTestimonial(current);

if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => observer.observe(element));
} else if (revealElements.length) {
    revealElements.forEach(element => element.classList.add('is-visible'));
}
