// =================================================================
// ARQUIVO JAVASCRIPT DEFINITIVO E ORGANIZADO PARA O CURSO
// Criado por: Parceiro de Programacao
// =================================================================

// -----------------------------------------------------------------
// DEFINIÇÃO DE TODAS AS FUNÇÕES GLOBAIS
// -----------------------------------------------------------------

/**
 * Função Universal para Animação de Scroll.
 * Procura por elementos com classes específicas e adiciona a classe 'visible'
 * quando eles entram na tela.
 */
function setupUniversalScrollReveal() {
    const elementsToReveal = document.querySelectorAll('.home-section, .timeline-container, .world-column, .glass-panel');
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
 * Configura os botões "Leia Mais" para expandir/recolher conteúdo.
 */
function setupReadMore() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const button = event.target;
            const content = button.parentElement.querySelector('.detailed-content');
            
            if (content) {
                const isVisible = content.style.maxHeight && content.style.maxHeight !== "0px";
                if (isVisible) {
                    content.style.maxHeight = null;
                    button.textContent = "Leia Mais";
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    button.textContent = "Mostrar Menos";
                }
            }
        });
    });
}

/**
 * Configura o Quiz Rápido.
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

/**
 * Configura a interatividade dos painéis do vitral (Módulo 4).
 */
function setupStainedGlass() {
    const panels = document.querySelectorAll('.glass-panel');
    const overlay = document.querySelector('.panel-content-overlay');
    
    if (!panels.length || !overlay) return;
    
    const contentContainer = overlay.querySelector('.panel-content-inner');

    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            const topic = panel.dataset.topic;
            const sourceContent = document.querySelector(`#content-${topic}`);
            if (sourceContent) {
                contentContainer.innerHTML = sourceContent.innerHTML;
                contentContainer.innerHTML += '<span class="close-button" onclick="closePanelOverlay()">&times;</span>';
                overlay.style.display = 'block';
            }
        });
    });
}

// Função global para fechar o overlay do vitral (Módulo 4)
function closePanelOverlay() {
    const overlay = document.querySelector('.panel-content-overlay');
    if (overlay) overlay.style.display = 'none';
}

/**
 * Configura o desafio de arrastar e soltar da Escolástica (Módulo 4).
 */
function setupScholasticChallenge() {
    const draggables = document.querySelectorAll('.draggable-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    if (draggables.length === 0) return;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => draggable.classList.add('dragging'));
        draggable.addEventListener('dragend', () => draggable.classList.remove('dragging'));
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.classList.add('hovered');
        });
        zone.addEventListener('dragleave', () => zone.classList.remove('hovered'));
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('hovered');
            const draggable = document.querySelector('.dragging');
            if (draggable.dataset.thinker === zone.dataset.idea) {
                zone.innerHTML = '';
                zone.appendChild(draggable);
                zone.classList.add('correct');
                draggable.setAttribute('draggable', 'false');
                draggable.style.cursor = 'default';
            }
        });
    });
}

// -----------------------------------------------------------------
// EVENT LISTENER PRINCIPAL - EXECUTA QUANDO A PÁGINA CARREGA
// -----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    // --- LÓGICA GERAL E ATIVAÇÃO DE FUNÇÕES ---

    // Ativa animações de scroll em todas as páginas
    setupUniversalScrollReveal();

    // Ativa a funcionalidade "Leia Mais" (se houver botões)
    if (document.querySelector('.read-more-btn')) {
        setupReadMore();
    }

    // Ativa o Quiz (se existir na página)
    if (document.querySelector('.quiz-container')) {
        setupQuiz();
    }
    
    // Ativa as interatividades do Vitral (Módulo 4)
    if (document.querySelector('.stained-glass-container')) {
        setupStainedGlass();
        setupScholasticChallenge();
        // A animação da rachadura é parte do setupUniversalScrollReveal
    }

    // Lógica do Acordeão (Módulo 1 e outros que possam usar)
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            header.classList.toggle("active");
            const content = header.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });

}); // Fim do addEventListener
