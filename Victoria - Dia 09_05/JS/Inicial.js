document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const dots = document.querySelectorAll('.dot');
    const btnNext = document.querySelector('.carousel-control.next');
    const btnPrev = document.querySelector('.carousel-control.prev');
    const carouselContainer = document.querySelector('.carousel-container');

    let currentSlide = 0;
    const intervalTime = 5000;
    let slideTimer = null;

    function updateCarousel() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.opacity = '1';
                slide.style.transition = 'opacity 0.8s ease-in-out';
                slide.classList.add('active');
            } else {
                slide.style.opacity = '0';
                slide.style.transition = 'opacity 0.8s ease-in-out';
                slide.classList.remove('active');
            }
        });

        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        console.log(`Slide atual: ${currentSlide}`);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function resetTimer() {
        if (slideTimer) {
            clearInterval(slideTimer);
            slideTimer = null;
        }
        slideTimer = setInterval(() => {
            nextSlide();
        }, intervalTime);
        console.log('Timer resetado');
    }

    

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            resetTimer();
        });
    });

    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            console.log('Mouse entrou - pausando autoplay');
        });

        carouselContainer.addEventListener('mouseleave', () => {
            console.log('Mouse saiu - retomando autoplay');
            resetTimer();
        });
    }

    console.log(`Carrossel inicializado com ${slides.length} slides`);
    updateCarousel();
    resetTimer();
});