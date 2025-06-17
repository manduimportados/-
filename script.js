// ===== SLIDER COM SWIPE E TEMPOS PERSONALIZADOS =====
document.addEventListener("DOMContentLoaded", () => {
    const sliderWrapper = document.querySelector(".slides-wrapper");
    const slides = document.querySelectorAll(".slide");
    
    // Configurações
    let currentIndex = 0;
    let touchStartX = 0;
    let autoSlideInterval;
    const SLIDE_INTERVAL = 3000; // 3s entre slides automáticos

    // Mostra slide com tempo de transição personalizado
    function showSlide(index, transitionTime = '1s') {
        sliderWrapper.style.transition = `transform ${transitionTime} ease-out`;
        currentIndex = (index + slides.length) % slides.length;
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Navegação automática (transição mais lenta)
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            showSlide(currentIndex + 1, '1s'); // Transição de 1s para automático
        }, SLIDE_INTERVAL);
    }

    // Controle por touch (swipe com transição mais rápida)
    sliderWrapper.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(autoSlideInterval);
        sliderWrapper.style.transition = 'none'; // Remove transição momentaneamente
    }, { passive: true });

    sliderWrapper.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            showSlide(currentIndex + (diff > 0 ? 1 : -1), '0.4s'); // Transição de 0.4s para swipe
        } else {
            showSlide(currentIndex, '0.4s'); // Volta ao atual se não houver swipe suficiente
        }
        startAutoSlide();
    }, { passive: true });

    // Inicialização
    showSlide(0); // Mostra primeiro slide
    startAutoSlide();
});

// ===== FOOTER COM ANO ATUAL =====
const currentYear = new Date().getFullYear();
const footer = document.createElement('footer');
footer.innerHTML = `<p style="text-align: center; margin-top: 30px; color: #555; font-size: 12px;">© ${currentYear} Mandu Importados. Todos os direitos reservados.</p>`;

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.container');
    if (container) container.appendChild(footer);
});