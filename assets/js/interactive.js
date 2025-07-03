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


