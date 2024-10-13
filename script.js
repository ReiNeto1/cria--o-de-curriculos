document.addEventListener('DOMContentLoaded', function () {
    const resumeForm = document.getElementById('resumeForm');
    const photoInput = document.getElementById('photo');
    const resumePreview = document.getElementById('resumePreview');
    const colorPickerSection = document.getElementById('colorPickerSection');
    let photoURL = '';

    // Captura da imagem selecionada
    photoInput.addEventListener('change', function () {
        if (photoInput.files && photoInput.files[0]) {
            const photo = photoInput.files[0];
            photoURL = URL.createObjectURL(photo);
        }
    });

    // Função para adicionar entrada dinâmica de seções
    function addSection(buttonId, containerId, entryHTML) {
        document.getElementById(buttonId).addEventListener('click', function () {
            const container = document.getElementById(containerId);
            const newEntry = document.createElement('div');
            newEntry.classList.add('entry'); // Adiciona uma classe para identificar entradas dinâmicas
            newEntry.innerHTML = entryHTML;
            container.appendChild(newEntry);

            newEntry.querySelector('.remove-button').addEventListener('click', function () {
                container.removeChild(newEntry);
            });
        });
    }

    // Adicionar seções dinâmicas para Educação
    addSection('addEducation', 'educationContainer', `
        <div class="education-entry">
            <input type="text" class="education-title" placeholder="Nome do Curso">
            <input type="text" class="education-institution" placeholder="Instituição">
            <input type="text" class="education-duration" placeholder="Data de Início - Data de Conclusão">
            <button type="button" class="remove-button">Remover</button>
        </div>
    `);

    // Adicionar seções dinâmicas para Experiência
    addSection('addExperience', 'experienceContainer', `
        <div class="experience-entry">
            <input type="text" class="experience-title" placeholder="Cargo">
            <input type="text" class="experience-company" placeholder="Empresa">
            <input type="text" class="experience-duration" placeholder="Data de Início - Data de Término">
            <textarea class="experience-description" placeholder="Descrição breve das responsabilidades e conquistas."></textarea>
            <button type="button" class="remove-button">Remover</button>
        </div>
    `);

    // Adicionar seções dinâmicas para Projetos
    addSection('addProject', 'projectsContainer', `
        <div class="project-entry">
            <input type="text" class="project-name" placeholder="Nome do Projeto">
            <input type="text" class="project-link" placeholder="Link (se houver)">
            <textarea class="project-description" placeholder="Descrição breve do projeto."></textarea>
            <button type="button" class="remove-button">Remover</button>
        </div>
    `);

    // Adicionar seções dinâmicas para Certificações
    addSection('addCertification', 'certificationsContainer', `
        <div class="certification-entry">
            <input type="text" class="certification-name" placeholder="Nome da Certificação">
            <input type="text" class="certification-institution" placeholder="Instituição | Data de Conclusão">
            <textarea class="certification-description" placeholder="Descrição breve, se necessário."></textarea>
            <button type="button" class="remove-button">Remover</button>
        </div>
    `);

    // Validação de formulário e exibição do currículo
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone1 = document.getElementById('phone1').value;

        // Verificação de campos obrigatórios
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
            photo: photoURL
        };

        displayResumePreview(resumeData);
        colorPickerSection.style.display = 'block'; // Apenas se o seletor de cor for relevante
    });

    function displayResumePreview(data) {
        // Gera a visualização do currículo
        resumePreview.innerHTML = `
            <div class="resume-left custom-bg-color">
                ${data.photo ? `<img src="${data.photo}" alt="Foto">` : ''}
                <h2>${data.name}</h2>
                <div class="contact-info">
                    ${data.address ? `<p><strong>Endereço:</strong> ${data.address}</p>` : ''}
                    <p><strong>Telefone 1:</strong> ${data.phone1}</p>
                    ${data.phone2 ? `<p><strong>Telefone 2:</strong> ${data.phone2}</p>` : ''}
                    <p><strong>Email:</strong> ${data.email}</p>
                    ${data.linkedin ? `<p><strong>LinkedIn:</strong> ${data.linkedin}</p>` : ''}
                </div>
            </div>
            <div class="resume-right">
                ${data.summary ? `<h3>Resumo</h3><p>${data.summary}</p>` : ''}
                
                ${data.education.length ? `<h3>Educação</h3><ul>${data.education.map(edu => `<li>${edu.title} - ${edu.institution} (${edu.duration})</li>`).join('')}</ul>` : ''}

                ${data.experience.length ? `<h3>Experiência Profissional</h3><ul>${data.experience.map(exp => `<li><strong>${exp.title}</strong> - ${exp.company} (${exp.duration})<br>${exp.description}</li>`).join('')}</ul>` : ''}

                ${data.skills ? `<h3>Habilidades</h3><p>${data.skills}</p>` : ''}

                ${data.projects.length ? `<h3>Projetos</h3><ul>${data.projects.map(proj => `<li><strong>${proj.name}</strong> ${proj.link ? `- <a href="${proj.link}" target="_blank">Link</a>` : ''}<br>${proj.description}</li>`).join('')}</ul>` : ''}

                ${data.certifications.length ? `<h3>Certificações</h3><ul>${data.certifications.map(cert => `<li><strong>${cert.name}</strong> - ${cert.institution}<br>${cert.description}</li>`).join('')}</ul>` : ''}

                ${data.languages ? `<h3>Idiomas</h3><p>${data.languages}</p>` : ''}

                ${data.activities ? `<h3>Atividades Extracurriculares</h3><p>${data.activities}</p>` : ''}
            </div>
        `;
    }
});
