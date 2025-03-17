/* ============================ Toggle Navbar =========================== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
});

/* ============================ Scroll Handling =========================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

const handleScroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            let activeLink = document.querySelector(`header nav a[href*='${id}']`);
            if (activeLink) activeLink.classList.add('active');
        }
    });

    /* Sticky Navbar */
    header.classList.toggle('sticky', top > 100);

    /* Remove Toggle Icon and Navbar on Scroll */
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/* Optimize scroll event listener */
window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScroll);
});

/* ============================ Scroll Reveal =========================== */
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

/* ============================ Typed.js =========================== */
new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Backend Developer', 'Problem Solver'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true
});
