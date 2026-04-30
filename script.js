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
    const navbar = document.getElementById('mainNav');

    // Scroll suave com offset da navbar fixa
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id !== '#' && id.startsWith('#')) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();

                    // Fecha o menu mobile se estiver aberto
                    const navCollapse = document.querySelector('.navbar-collapse');
                    if (navCollapse && navCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navCollapse)?.hide();
                    }

                    const navHeight = navbar ? navbar.offsetHeight : 70;
                    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });

    // Highlight do link ativo ao rolar
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const navHeight = navbar ? navbar.offsetHeight : 70;
        let current = '';

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - navHeight - 10) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // Formulário de contato
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
    renderProjects();   // renderiza os cards primeiro
    setupUI();
    setupScrollReveal(); // observa depois que os cards já estão no DOM
});

/* =============================================
   SCROLL REVEAL — IntersectionObserver
=============================================== */
function setupScrollReveal() {
    const revealClasses = ['.reveal', '.reveal-left', '.reveal-right'];
    const elements = document.querySelectorAll(revealClasses.join(', '));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                if (entry.target.classList.contains('visible')) {
                    entry.target.classList.remove('visible');
                    entry.target.classList.add('hidden');
                }
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}