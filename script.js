const skills = ["HTML", "CSS", "UX/UI", "Bootstrap 5", "JavaScript", "C#", "C/C++", "Python", "PHP"];

const projects = [
    {
        title: "Projeto jogo Clone Asteroid",
        description: "Projeto criado com Html, JavaScript, CSS e Bootstrap 5. Focado em uma grande utilizaçao do Bootstrap e Css",
        image: "img/img2.png",
        link: "https://fffadini.github.io/asteroids-clone/",
        tag: "HTML",
        tag2: "JavaScript"
    },
    {
        title: "Projeto jogo Clone Tetris",
        description: "Projeto criado no mesmo padrão do Clone Asteroid com Html, JavaScript, CSS e Bootstrap 5. Focado em uma grande utilizaçao do Bootstrap e Css",
        image: "img/img3.png",
        link: "https://fffadini.github.io/Clone-Tetris/",
        tag: "HTML",
        tag2: "JavaScript"
    },
    {
        title: "Desenvolvimento de site",
        description: "Site criado para divulgar trabalho, com foco em um design simples e versátil",
        image: "img/img4.png",
        link: "https://fisiokathkoike.netlify.app/",
        tag: "HTML",
        tag2: "JavaScript"
    }
];

// 2. Funções de Renderização
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
    container.innerHTML = projects.map(proj => `
        <div class="col-md-4">
            <div class="project-card">
                <img src="${proj.image}" class="project-img w-100" alt="${proj.title}">
                <div class="p-4">
                    <span class="badge bg-primary bg-opacity-10 text-primary mb-2" style="font-size: 0.75rem">${proj.tag}</span>
                    <span class="badge bg-primary bg-opacity-10 text-primary mb-2" style="font-size: 0.75rem">${proj.tag2}</span>
                    <h5 class="card-title">${proj.title}</h5>
                    <p class="card-text small mb-4">${proj.description}</p>
                    <a href="${proj.link}" class="btn btn-sm btn-outline-primary w-100" target="_blank">Ver mais</a>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. Gerenciamento de Contato
function setupUI() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button');
            const formUrl = this.action;

            const text = btn.innerText;
            btn.disabled = true;
            btn.innerText = "Enviando...";

            // Coleta os dados do formulário
            const formData = new FormData(this);

            try {
                const response = await fetch(formUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    btn.innerText = "Mensagem Enviada!";
                    btn.className = "btn btn-success px-5 py-3";
                    this.reset();
                    setTimeout(() => {
                        btn.innerText = text;
                        btn.className = "btn btn-primary px-5 py-3";
                        btn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error("Erro no envio");
                }
            } catch (error) {
                alert("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
                btn.innerText = text;
                btn.disabled = false;
            }
        });
    }

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
}

window.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    setupUI();
});