// --- LÓGICA PARA O MODAL DO CONCÍLIO DE NICEIA ---
function setupCouncilModal() {
    const modal = document.getElementById("councilModal");
    const figures = document.querySelectorAll(".council-figure");
    const closeBtn = document.querySelector(".close-button");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");

    const arguments = {
        "atnasio": {
            title: "Argumento de Atanásio",
            text: "Cristo é 'homoousios' (da mesma substância) que o Pai. Ele não é uma criatura, mas é eternamente Deus. Se Cristo fosse menos que Deus, não poderia nos salvar."
        },
        "ario": {
            title: "Argumento de Ário",
            text: "Cristo é 'homoiousios' (de substância semelhante) ao Pai. Houve um tempo em que o Filho não existia. Ele é a primeira e mais elevada de todas as criaturas de Deus, mas não é Deus."
        }
    };

    figures.forEach(figure => {
        figure.addEventListener("click", () => {
            const person = figure.dataset.person;
            modalTitle.textContent = arguments[person].title;
            modalText.textContent = arguments[person].text;
            modal.style.display = "block";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

// --- LÓGICA PARA O CARROSSEL DA SABEDORIA ---
function setupWisdomCarousel() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
    }

    prevBtn.addEventListener("click", () => {
        slideIndex = (slideIndex > 0) ? slideIndex - 1 : slides.length - 1;
        showSlide(slideIndex);
    });

    nextBtn.addEventListener("click", () => {
        slideIndex = (slideIndex < slides.length - 1) ? slideIndex + 1 : 0;
        showSlide(slideIndex);
    });
    
    // Mostra o primeiro slide
    if(slides.length > 0) showSlide(slideIndex);
}

// Dentro de "DOMContentLoaded", adicione as chamadas para as novas funções
document.addEventListener("DOMContentLoaded", () => {
    // ... seu código existente ...

    // --- CHAMADAS PARA O MÓDULO 3 ---
    if (document.getElementById("councilModal")) {
        setupCouncilModal();
    }
    if (document.querySelector(".wisdom-carousel")) {
        setupWisdomCarousel();
    }
    // Reutilizando a função de scroll para as colunas
    if (document.querySelector('.world-column')) {
        const columns = document.querySelectorAll(".world-column");
        function revealColumns() {
             const windowHeight = window.innerHeight;
             columns.forEach(col => {
                if (col.getBoundingClientRect().top < windowHeight - 100) {
                    col.classList.add("visible");
                }
             });
        }
        revealColumns();
        window.addEventListener("scroll", revealColumns);
    }
});
// Implementação do "Clique para Revelar"
document.addEventListener("DOMContentLoaded", () => {
    const revealToggles = document.querySelectorAll(".reveal-toggle");

    revealToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const targetId = toggle.dataset.target;
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                if (targetContent.style.display === "block") {
                    targetContent.style.display = "none";
                    toggle.textContent = "Clique para Revelar";
                } else {
                    targetContent.style.display = "block";
                    toggle.textContent = "Ocultar";
                }
            }
        });
    });

    // Implementação do Acordeão/Sanfona
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});
// --- LÓGICA PARA ANIMAÇÃO DE SCROLL (TIMELINE) ---
function revealOnScroll() {
    const timelineContainers = document.querySelectorAll(".timeline-container");
    const windowHeight = window.innerHeight;

    timelineContainers.forEach(container => {
        const elementTop = container.getBoundingClientRect().top;
        // Revela o elemento um pouco antes de ele atingir o meio da tela
        if (elementTop < windowHeight - 150) {
            container.classList.add("visible");
        }
    });
}

// --- LÓGICA PARA O QUIZ RÁPIDO ---
function setupQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const feedbackEl = document.getElementById('quiz-feedback');
    let answered = false;

    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (answered) return; // Impede múltiplas respostas
            answered = true;

            const isCorrect = option.dataset.correct === 'true';

            if (isCorrect) {
                option.classList.add('correct');
                feedbackEl.textContent = 'Correto! A perseguição ajudou a espalhar a fé.';
                feedbackEl.style.color = '#28a745';
            } else {
                option.classList.add('incorrect');
                feedbackEl.textContent = 'Incorreto. A resposta correta é que a perseguição, embora terrível, espalhou os cristãos, que levaram o evangelho a novas regiões.';
                feedbackEl.style.color = '#dc3545';
                // Mostra a resposta correta
                document.querySelector("[data-correct='true']").classList.add('correct');
            }
        });
    });
}


// Adiciona os event listeners quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    // ... seu código de acordeão/reveal existente fica aqui ...

    // Verifica se os elementos da timeline e do quiz existem na página antes de executar
    if (document.querySelector('.timeline')) {
        // Executa uma vez no carregamento e depois a cada scroll
        revealOnScroll(); 
        window.addEventListener("scroll", revealOnScroll);
    }
    
    if (document.querySelector('.quiz-container')) {
        setupQuiz();
    }
// --- LÓGICA GENÉRICA PARA REVELAR SEÇÕES AO ROLAR ---
function setupScrollReveal() {
    const sectionsToReveal = document.querySelectorAll(".home-section");

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Para a animação não repetir
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sectionsToReveal.forEach(section => {
        sectionObserver.observe(section);
    });
}


// Dentro de "DOMContentLoaded", adicione a chamada para a nova função
document.addEventListener("DOMContentLoaded", () => {
    // ... seu código existente ...

    // --- CHAMADA PARA A NOVA PÁGINA INICIAL ---
    if (document.querySelector('.home-section')) {
        setupScrollReveal();
    }
});
});

