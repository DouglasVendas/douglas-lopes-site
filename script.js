// Smooth scroll
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile navigation
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('open');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('open');
        });
    });
}

// Navbar on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    const handleScroll = () => {
        if (window.scrollY > 48) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

// Quotes slider
const quotes = document.querySelectorAll('.quote');
const dots = document.querySelectorAll('.quote-dot');
let activeQuote = 0;

function showQuote(index) {
    quotes.forEach((quote, i) => {
        quote.classList.toggle('active', i === index);
        if (dots[i]) {
            dots[i].classList.toggle('active', i === index);
        }
    });
}

if (quotes.length && dots.length) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            activeQuote = index;
            showQuote(activeQuote);
        });
    });

    setInterval(() => {
        activeQuote = (activeQuote + 1) % quotes.length;
        showQuote(activeQuote);
    }, 8000);
}

// Reveal on scroll
const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealItems.forEach(item => observer.observe(item));
