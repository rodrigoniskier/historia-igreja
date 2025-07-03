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
});

