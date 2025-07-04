// =================================================================
// ARQUIVO JAVASCRIPT CENTRALIZADO E ORGANIZADO
// =================================================================

// -----------------------------------------------------------------
// DEFINIÇÃO DE TODAS AS FUNÇÕES DE INTERATIVIDADE
// -----------------------------------------------------------------

/**
 * Função Universal para Animação de Scroll.
 * Procura por elementos com classes específicas e adiciona a classe 'visible'
 * quando eles entram na tela.
 */
function setupUniversalScrollReveal() {
    const elementsToReveal = document.querySelectorAll('.timeline-container, .world-column, .home-section');
    if (elementsToReveal.length === 0) return;

    const observerOptions = {
        root: null,
        threshold: 0.1,
    };

    const revealElement = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealElement, observerOptions);
    elementsToReveal.forEach(el => observer.observe(el));
}

/**
 * Configura o Modal para o Concílio de Niceia (Módulo 3).
 */
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

/**
 * Configura o Carrossel da Sabedoria Monástica (Módulo 3).
 */
function setupWisdomCarousel() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (slides.length === 0) return;

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
    
    showSlide(slideIndex);
}

/**
 * Configura o Quiz Rápido (Módulo 2).
 */
function setupQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const feedbackEl = document.getElementById('quiz-feedback');
    if (!feedbackEl) return;

    let answered = false;

    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (answered) return;
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
                document.querySelector("[data-correct='true']").classList.add('correct');
            }
        });
    });
}

// -----------------------------------------------------------------
// EVENT LISTENER PRINCIPAL - EXECUTA QUANDO A PÁGINA CARREGA
// -----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    // --- LÓGICA BÁSICA (sempre ativa) ---

    // Implementação do "Clique para Revelar"
    const revealToggles = document.querySelectorAll(".reveal-toggle");
    revealToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const targetId = toggle.dataset.target;
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                const isVisible = targetContent.style.display === "block";
                targetContent.style.display = isVisible ? "none" : "block";
                toggle.textContent = isVisible ? "Clique para Revelar" : "Ocultar";
            }
        });
    });

    // Implementação do Acordeão/Sanfona
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            // Adiciona/remove a classe para a animação do ícone
            header.classList.toggle("active");
            
            const content = header.nextElementSibling;
            const isVisible = content.style.display === "block";
            content.style.display = isVisible ? "none" : "block";
        });
    });

    // --- LÓGICAS CONDICIONAIS (só ativam nas páginas certas) ---

    // Ativa as animações de scroll em todas as páginas
    setupUniversalScrollReveal();

    // Ativa o Quiz se ele existir na página
    if (document.querySelector('.quiz-container')) {
        setupQuiz();
    }
    
    // Ativa o Modal do Concílio se ele existir na página
    if (document.getElementById("councilModal")) {
        setupCouncilModal();
    }

    // Ativa o Carrossel se ele existir na página
    if (document.querySelector(".wisdom-carousel")) {
        setupWisdomCarousel();
    }
// =================================================================
// FUNÇÕES PARA O MÓDULO 4 (VITRAL)
// =================================================================

/**
 * Configura a interatividade dos painéis do vitral.
 */
function setupStainedGlass() {
    const panels = document.querySelectorAll('.glass-panel');
    const overlay = document.querySelector('.panel-content-overlay');
    const contentContainer = document.querySelector('.panel-content-inner');
    
    if (!overlay) return;

    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            const topic = panel.dataset.topic;
            const sourceContent = document.querySelector(`#content-${topic}`);
            if (sourceContent) {
                contentContainer.innerHTML = sourceContent.innerHTML;
                // Adiciona o botão de fechar ao conteúdo
                contentContainer.innerHTML += '<span class="close-button" onclick="closePanelOverlay()">&times;</span>';
                overlay.style.display = 'block';
            }
        });
    });
}

// Função global para fechar o overlay (para ser chamada pelo botão)
function closePanelOverlay() {
    const overlay = document.querySelector('.panel-content-overlay');
    if (overlay) overlay.style.display = 'none';
}


/**
 * Configura a animação da rachadura do Grande Cisma.
 */
function setupSchismAnimation() {
    const crack = document.querySelector('.schism-crack');
    if (!crack) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            crack.classList.add('visible');
            observer.unobserve(crack);
        }
    }, { threshold: 0.8 });

    observer.observe(crack.parentElement);
}

/**
 * Configura o desafio de arrastar e soltar da Escolástica.
 */
function setupScholasticChallenge() {
    const draggables = document.querySelectorAll('.draggable-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    if (draggables.length === 0) return;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.classList.add('hovered');
        });
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('hovered');
        });
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('hovered');
            const draggable = document.querySelector('.dragging');
            const draggableId = draggable.dataset.thinker;
            const zoneId = zone.dataset.idea;

            if (draggableId === zoneId) {
                zone.innerHTML = ''; // Limpa a zona
                zone.appendChild(draggable);
                zone.classList.add('correct');
                draggable.setAttribute('draggable', 'false');
                draggable.style.cursor = 'default';
            }
        });
    });
}


// Dentro de "DOMContentLoaded", adicione as chamadas para as novas funções
document.addEventListener("DOMContentLoaded", () => {
    // ... seu código existente ...

    // --- CHAMADAS PARA O MÓDULO 4 ---
    setupStainedGlass();
    setupSchismAnimation();
    setupScholasticChallenge();
});
    /**
 * Configura os botões "Leia Mais" para expandir conteúdo.
 */
function setupReadMore() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const content = event.target.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                btn.textContent = "Leia Mais";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                btn.textContent = "Mostrar Menos";
            }
        });
    });
}

// Dentro do seu addEventListener "DOMContentLoaded", adicione a chamada:
document.addEventListener("DOMContentLoaded", () => {
    // ... seu código existente ...
    
    // --- CHAMADA PARA O NOVO MÓDULO 2 ---
    setupReadMore();
});
}); // Fim do addEventListener
