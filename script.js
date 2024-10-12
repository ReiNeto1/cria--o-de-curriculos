document.addEventListener('DOMContentLoaded', function () {
    const resumeForm = document.getElementById('resumeForm');
    const photoInput = document.getElementById('photo');
    const resumePreview = document.getElementById('resumePreview');
    const colorPicker = document.getElementById('colorPicker');
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
            newEntry.innerHTML = entryHTML;
            container.appendChild(newEntry);

            // Função para remover a entrada
            newEntry.querySelector('.remove-button').addEventListener('click', function () {
                container.removeChild(newEntry);
            });
        });
    }

    // Adicionar seções dinâmicas
    addSection('addCertification', 'certificationsContainer', `
        <input type="text" class="certification-name" placeholder="Nome da Certificação">
        <input type="text" class="certification-institution" placeholder="Instituição | Data de Conclusão">
        <textarea class="certification-description" placeholder="Descrição breve, se necessário."></textarea>
        <button type="button" class="remove-button">Remover</button>
    `);

    addSection('addExperience', 'experienceContainer', `
        <input type="text" class="experience-title" placeholder="Cargo">
        <input type="text" class="experience-company" placeholder="Empresa">
        <input type="text" class="experience-duration" placeholder="Data de Início - Data de Término">
        <textarea class="experience-description" placeholder="Descrição breve das responsabilidades e conquistas."></textarea>
        <button type="button" class="remove-button">Remover</button>
    `);

    addSection('addProject', 'projectsContainer', `
        <input type="text" class="project-name" placeholder="Nome do Projeto">
        <input type="text" class="project-link" placeholder="Link (se houver)">
        <textarea class="project-description" placeholder="Descrição breve do projeto."></textarea>
        <button type="button" class="remove-button">Remover</button>
    `);

    addSection('addEducation', 'educationContainer', `
        <div class="education-entry">
            <input type="text" class="education-title" placeholder="Nome do Curso">
            <input type="text" class="education-institution" placeholder="Instituição">
            <input type="text" class="education-duration" placeholder="Data de Início - Data de Conclusão">
            <button type="button" class="remove-button">Remover</button>
        </div>
    `);

    // Validação de formulário e exibição do currículo
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
            photo: photoURL
        };

        // Exibir a pré-visualização do currículo
        displayResumePreview(resumeData);

        // Exibe o seletor de cor após o currículo ser gerado
        colorPickerSection.style.display = 'block';
    });

    function displayResumePreview(data) {
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
                <h3>Resumo</h3>
                ${data.summary ? `<p>${data.summary}</p>` : '<p>(Sem resumo preenchido)</p>'}
                
                <h3>Educação</h3>
                ${data.education.length ? `<ul>${data.education.map(edu => `<li>${edu.title} - ${edu.institution} (${edu.duration})</li>`).join('')}</ul>` : '<p>(Sem educação preenchida)</p>'}
    
                <h3>Experiência Profissional</h3>
                ${data.experience.length ? `<ul>${data.experience.map(exp => `<li><strong>${exp.title}</strong> - ${exp.company} (${exp.duration})<br>${exp.description}</li>`).join('')}</ul>` : '<p>(Sem experiência profissional preenchida)</p>'}
    
                <h3>Habilidades</h3>
                ${data.skills ? `<p>${data.skills}</p>` : '<p>(Sem habilidades preenchidas)</p>'}
    
                <h3>Projetos</h3>
                ${data.projects.length ? `<ul>${data.projects.map(proj => `<li><strong>${proj.name}</strong> ${proj.link ? `- <a href="${proj.link}" target="_blank">Link</a>` : ''}<br>${proj.description}</li>`).join('')}</ul>` : '<p>(Sem projetos preenchidos)</p>'}
    
                <h3>Certificações</h3>
                ${data.certifications.length ? `<ul>${data.certifications.map(cert => `<li><strong>${cert.name}</strong> - ${cert.institution}<br>${cert.description}</li>`).join('')}</ul>` : '<p>(Sem certificações preenchidas)</p>'}
    
                <h3>Idiomas</h3>
                ${data.languages ? `<p>${data.languages}</p>` : '<p>(Sem idiomas preenchidos)</p>'}
    
                <h3>Atividades Extracurriculares</h3>
                ${data.activities ? `<p>${data.activities}</p>` : '<p>(Sem atividades extracurriculares preenchidas)</p>'}
            </div>
        `;
    }

            document.addEventListener('DOMContentLoaded', function () {
                const infoCards = document.querySelectorAll('.info-card');
            
                // Exibe ou oculta a tooltip ao passar o mouse
                infoCards.forEach(card => {
                    card.addEventListener('mouseenter', function () {
                        const tooltip = this.querySelector('.tooltip');
                        tooltip.style.display = 'block';
                    });
            
                    card.addEventListener('mouseleave', function () {
                        const tooltip = this.querySelector('.tooltip');
                        tooltip.style.display = 'none';
                    });
                });
            });
    
    
    // Download em PDF usando jsPDF
    document.getElementById('downloadPdf').addEventListener('click', async function () {
        const doc = new jsPDF();
        
        // Adiciona classe A4 ao preview
        resumePreview.classList.add('a4');
        
        // Renderiza o PDF a partir do HTML
        await doc.html(resumePreview, {
            callback: function (doc) {
                doc.save('curriculo.pdf');
            },
            x: 10,
            y: 10,
            autoPaging: 'text',
            width: 180, // Ajusta largura do conteúdo
            windowWidth: document.body.scrollWidth
        });
        
        // Remove a classe A4 após o download
        resumePreview.classList.remove('a4');
    });
    

    // Download em Word
    document.getElementById('downloadWord').addEventListener('click', function () {
        const content = document.getElementById('resumePreview').outerHTML;
        const blob = new Blob([content], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'curriculo.doc';
        link.click();
    });
});
