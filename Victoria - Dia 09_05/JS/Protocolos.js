document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const checkReveal = () => {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    setTimeout(checkReveal, 100);
    window.addEventListener('scroll', checkReveal);
});