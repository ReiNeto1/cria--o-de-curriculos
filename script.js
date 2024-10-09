document.addEventListener('DOMContentLoaded', function () {
    const resumeForm = document.getElementById('resumeForm');
    const photoInput = document.getElementById('photo');
    const resumePreview = document.getElementById('resumePreview');
    let photoURL = ''; 

    // Captura da imagem selecionada sem exibir ainda
    photoInput.addEventListener('change', function (event) {
        if (photoInput.files && photoInput.files[0]) {
            const photo = photoInput.files[0];
            photoURL = URL.createObjectURL(photo); 
        }
    });

    // Função para adicionar entrada de certificação
    document.getElementById('addCertification').addEventListener('click', function () {
        const certificationsContainer = document.getElementById('certificationsContainer');
        const newEntry = document.createElement('div');
        newEntry.classList.add('certification-entry');
        newEntry.innerHTML = `
            <input type="text" class="certification-name" placeholder="Nome da Certificação">
            <input type="text" class="certification-institution" placeholder="Instituição | Data de Conclusão">
            <textarea class="certification-description" placeholder="Descrição breve, se necessário."></textarea>
            <button type="button" class="remove-button">Remover</button>
        `;
        certificationsContainer.appendChild(newEntry);

        newEntry.querySelector('.remove-button').addEventListener('click', function () {
            certificationsContainer.removeChild(newEntry);
        });
    });

    // Função para adicionar entrada de experiência
    document.getElementById('addExperience').addEventListener('click', function () {
        const experienceContainer = document.getElementById('experienceContainer');
        const newEntry = document.createElement('div');
        newEntry.classList.add('experience-entry');
        newEntry.innerHTML = `
            <input type="text" class="experience-title" placeholder="Cargo">
            <input type="text" class="experience-company" placeholder="Empresa">
            <input type="text" class="experience-duration" placeholder="Data de Início - Data de Término">
            <textarea class="experience-description" placeholder="Descrição breve das responsabilidades e conquistas."></textarea>
            <button type="button" class="remove-button">Remover</button>
        `;
        experienceContainer.appendChild(newEntry);

        newEntry.querySelector('.remove-button').addEventListener('click', function () {
            experienceContainer.removeChild(newEntry);
        });
    });

    // Função para adicionar entrada de projeto
    document.getElementById('addProject').addEventListener('click', function () {
        const projectsContainer = document.getElementById('projectsContainer');
        const newEntry = document.createElement('div');
        newEntry.classList.add('project-entry');
        newEntry.innerHTML = `
            <input type="text" class="project-name" placeholder="Nome do Projeto">
            <input type="text" class="project-link" placeholder="Link (se houver)">
            <textarea class="project-description" placeholder="Descrição breve do projeto."></textarea>
            <button type="button" class="remove-button">Remover</button>
        `;
        projectsContainer.appendChild(newEntry);

        newEntry.querySelector('.remove-button').addEventListener('click', function () {
            projectsContainer.removeChild(newEntry);
        });
    });

    // Função para adicionar entrada de educação
    document.getElementById('addEducation').addEventListener('click', function () {
        const educationContainer = document.getElementById('educationContainer');
        const newEntry = document.createElement('div');
        newEntry.classList.add('education-entry');
        newEntry.innerHTML = `
            <input type="text" class="education-title" placeholder="Nome do Curso">
            <input type="text" class="education-institution" placeholder="Instituição">
            <input type="text" class="education-duration" placeholder="Data de Início - Data de Conclusão">
            <button type="button" class="remove-button">Remover</button>
        `;
        educationContainer.appendChild(newEntry);

        newEntry.querySelector('.remove-button').addEventListener('click', function () {
            educationContainer.removeChild(newEntry);
        });
    });

    // Tooltip hover
    document.querySelectorAll('.info-card').forEach(infoCard => {
        infoCard.addEventListener('mouseenter', function () {
            const tooltip = this.querySelector('.tooltip');
            tooltip.textContent = this.getAttribute('data-text');
            tooltip.style.display = 'block';
        });
        infoCard.addEventListener('mouseleave', function () {
            const tooltip = this.querySelector('.tooltip');
            tooltip.style.display = 'none';
        });
    });

    // Validação de formulário
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone1 = document.getElementById('phone1').value;

        if (!name || !email || !phone1) {
            alert("Por favor, preencha os campos obrigatórios.");
            return;
        }

        const resumeData = {
            name: name,
            address: document.getElementById('address').value,
            phone1: phone1,
            phone2: document.getElementById('phone2').value,
            email: email,
            linkedin: document.getElementById('linkedin').value,
            summary: document.getElementById('summary').value,
            education: Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
                title: entry.querySelector('.education-title').value,
                institution: entry.querySelector('.education-institution').value,
                duration: entry.querySelector('.education-duration').value,
            })),
            experience: Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
                title: entry.querySelector('.experience-title').value,
                company: entry.querySelector('.experience-company').value,
                duration: entry.querySelector('.experience-duration').value,
                description: entry.querySelector('.experience-description').value,
            })),
            skills: document.getElementById('skills').value,
            projects: Array.from(document.querySelectorAll('.project-entry')).map(entry => ({
                name: entry.querySelector('.project-name').value,
                link: entry.querySelector('.project-link').value,
                description: entry.querySelector('.project-description').value,
            })),
            certifications: Array.from(document.querySelectorAll('.certification-entry')).map(entry => ({
                name: entry.querySelector('.certification-name').value,
                institution: entry.querySelector('.certification-institution').value,
                description: entry.querySelector('.certification-description').value,
            })),
            languages: document.getElementById('languages').value,
            activities: document.getElementById('activities').value,
            photo: photoURL // Adiciona a URL da foto
        };

        // Exibir a pré-visualização do currículo
        displayResumePreview(resumeData);
    });

    function displayResumePreview(data) {
        resumePreview.innerHTML = `
            <h2>${data.name}</h2>
            ${data.photo ? `<img src="${data.photo}" alt="Foto" style="width: 150px; height: auto;">` : ''}
            <p>${data.address}</p>
            <p>${data.phone1}</p>
            <p>${data.phone2}</p>
            <p>${data.email}</p>
            <p>${data.linkedin}</p>
            <h3>Resumo</h3>
            <p>${data.summary}</p>
            <h3>Educação</h3>
            <ul>${data.education.map(edu => `<li>${edu.title} - ${edu.institution} (${edu.duration})</li>`).join('')}</ul>
            <h3>Experiência</h3>
            <ul>${data.experience.map(exp => `<li>${exp.title} - ${exp.company} (${exp.duration})<br>${exp.description}</li>`).join('')}</ul>
            <h3>Habilidades</h3>
            <p>${data.skills}</p>
            <h3>Projetos</h3>
            <ul>${data.projects.map(proj => `<li>${proj.name} - ${proj.link ? `<a href="${proj.link}">Link</a>` : ''}<br>${proj.description}</li>`).join('')}</ul>
            <h3>Certificações</h3>
            <ul>${data.certifications.map(cert => `<li>${cert.name} - ${cert.institution}<br>${cert.description}</li>`).join('')}</ul>
            <h3>Idiomas</h3>
            <p>${data.languages}</p>
            <h3>Atividades Extracurriculares</h3>
            <p>${data.activities}</p>
        `;
    }

    // Lógica para baixar o currículo em PDF ou Word
    document.getElementById('downloadPdf').addEventListener('click', function () {
        // Implementar a lógica para download em PDF
        alert("Função de download em PDF ainda não implementada.");
    });

    document.getElementById('downloadWord').addEventListener('click', function () {
        // Implementar a lógica para download em Word
        alert("Função de download em Word ainda não implementada.");
    });

    
});

// Service worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('ServiceWorker registration successful: ', registration);
      }).catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
    });
  }
  