const skills = ["HTML", "CSS", "UX/UI", "Bootstrap 5", "JavaScript", "C#", "C/C++", "Python", "PHP"];

const projects = [
    {
        title: "Projeto jogo Clone Asteroid",
        description: "Projeto criado com Html, JavaScript, CSS e Bootstrap 5. Focado em uma grande utilizaçao do Bootstrap e Css",
        image: "img/img2.png",
        link: "https://fffadini.github.io/asteroids-clone/",
        tags: ["HTML", "JavaScript", "CSS"]
    },
    {
        title: "Projeto jogo Clone Tetris",
        description: "Projeto criado no mesmo padrão do Clone Asteroid com Html, JavaScript, CSS e Bootstrap 5. Focado em uma grande utilizaçao do Bootstrap e Css",
        image: "img/img3.png",
        link: "https://fffadini.github.io/Clone-Tetris/",
        tags: ["HTML", "JavaScript", "CSS"]
    },
    {
        title: "Projeto jogo Clone Snake",
        description: "Projeto criado no mesmo padrão do Clone Asteroid com Html, JavaScript, CSS e Bootstrap 5. Focado em uma grande utilizaçao do Bootstrap e Css",
        image: "img/img5.png",
        link: "https://fffadini.github.io/Clone-Snake/",
        tags: ["HTML", "JavaScript", "CSS"]
    },
    {
        title: "Desenvolvimento de site",
        description: "Site criado para divulgar trabalho, com foco em um design simples e versátil",
        image: "img/img4.png",
        link: "https://fisiokathkoike.netlify.app/",
        tags: ["HTML", "CSS", "JavaScript", "UX/UI"]
    }
];

// Funções de Renderização
function renderSkills() {
    const container = document.getElementById('skill-tags');
    if (!container) return;
    container.innerHTML = skills.map(skill =>
        `<span class="badge-skill">${skill}</span>`
    ).join('');
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = projects.map((proj, index) => `
        <div class="col-md-4 reveal reveal-delay-${(index % 3) + 1}">
            <div class="project-card">
                <img src="${proj.image}" class="project-img w-100" alt="${proj.title}">
                <div class="p-4">
                    <div class="d-flex flex-wrap gap-1 mb-2">
                        ${proj.tags.map(tag => `
                            <span class="badge bg-primary bg-opacity-10 text-primary" style="font-size: 0.75rem">${tag}</span>
                        `).join('')}
                    </div>
                    <h5 class="card-title">${proj.title}</h5>
                    <p class="card-text small mb-4">${proj.description}</p>
                    <a href="${proj.link}" class="btn btn-sm btn-outline-primary w-100" target="_blank">Ver mais</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Gerenciamento de UI (scroll suave + formulário — listener único)
function setupUI() {
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id !== '#' && id.startsWith('#')) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Formulário de contato — listener único aqui
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            const originalClass = btn.className;

            btn.disabled = true;
            btn.innerText = "Enviando...";

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.innerText = "Mensagem Enviada!";
                    btn.className = "btn btn-success px-5 py-3";
                    this.reset();
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.className = originalClass;
                        btn.disabled = false;
                    }, 3500);
                } else {
                    throw new Error("Erro no envio");
                }
            } catch (error) {
                btn.innerText = "Erro ao enviar. Tente novamente.";
                btn.className = "btn btn-danger px-5 py-3";
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.className = originalClass;
                    btn.disabled = false;
                }, 3500);
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    setupUI();
    setupScrollReveal();
});

/* =============================================
   SCROLL REVEAL — IntersectionObserver
=============================================== */
function setupScrollReveal() {
    const revealClasses = ['.reveal', '.reveal-left', '.reveal-right'];

    // Aguarda os cards de projeto serem renderizados antes de observar
    const allElements = () => document.querySelectorAll(revealClasses.join(', '));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                // Fade out apenas se o elemento já foi visto (evita piscar no load)
                if (entry.target.classList.contains('visible')) {
                    entry.target.classList.remove('visible');
                    entry.target.classList.add('hidden');
                }
            }
        });
    }, {
        threshold: 0.12,       // dispara quando 12% do elemento está visível
        rootMargin: '0px 0px -40px 0px'  // margem inferior para antecipar levemente
    });

    // Observa elementos existentes no DOM
    allElements().forEach(el => observer.observe(el));

    // Observa cards de projeto após renderização dinâmica
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        new MutationObserver(() => {
            projectsContainer.querySelectorAll(revealClasses.join(', ')).forEach(el => {
                observer.observe(el);
            });
        }).observe(projectsContainer, { childList: true });
    }
}