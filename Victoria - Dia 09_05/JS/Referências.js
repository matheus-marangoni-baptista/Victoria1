document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const checkReveal = () => {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.addClass ? element.addClass('active') : element.classList.add('active');
            }
        });
    };

    setTimeout(checkReveal, 100);

    window.addEventListener('scroll', checkReveal);
});