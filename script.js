let knowledge = [];
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const modalBody = document.getElementById('modalBody');

// Load data
fetch('data.json')
    .then(response => {
        console.log('Fetch response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data loaded:', data);
        knowledge = data;
        displayResults(knowledge);
    })
    .catch(error => {
        console.error('Error loading data:', error);
        document.getElementById('results').innerHTML = '<p style="color: red;">Error loading data. Check console for details.</p>';
    });

// Search functionality
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();

    if (searchTerm === '') {
        displayResults(knowledge);
        return;
    }

    const filtered = knowledge.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        item.description.toLowerCase().includes(searchTerm)
    );

    displayResults(filtered);
});

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p>No results found</p>';
        return;
    }

    results.forEach(item => {
        const card = createCard(item);
        container.appendChild(card);
    });
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';

    // Image
    const imageHtml = item.image 
        ? `<img src="${item.image}" alt="${item.title}" class="card-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23667eea%22 width=%22400%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2224%22 fill=%22white%22%3EImage Not Available%3C/text%3E%3C/svg%3E'">` 
        : `<div class="card-image placeholder">📄</div>`;

    // Tags
    const tagsHtml = item.tags 
        ? item.tags.map(tag => `<span class="tag">${tag}</span>`).join('') 
        : '';

    card.innerHTML = `
        ${imageHtml}
        <div class="card-content">
            <h3>${item.title}</h3>
            <div class="card-tags">
                ${tagsHtml}
            </div>
            <p>${item.description}</p>
            <div class="card-footer">
                <button onclick="viewDetails(${item.id})">View Details</button>
                <a href="${item.link}" target="_blank">Learn More</a>
            </div>
        </div>
    `;

    return card;
}

function viewDetails(id) {
    const item = knowledge.find(k => k.id === id);
    if (!item) return;

    let detailsHtml = `
        <div>
            ${item.image ? `<img src="${item.image}" alt="${item.title}" style="max-width: 100%; border-radius: 10px;">` : ''}
            <h2>${item.title}</h2>
            <p><strong>Description:</strong> ${item.description}</p>
    `;

    // Display tags
    if (item.tags && item.tags.length > 0) {
        detailsHtml += `
            <div class="card-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
    }

    // Display compliance notice if exists
    if (item.content && item.content.complianceNotice) {
        detailsHtml += `
            <div class="compliance-notice">
                <strong>⚠️ Security & Compliance Notice:</strong>
                <p>${item.content.complianceNotice}</p>
            </div>
        `;
    }

    // Display overview if exists
    if (item.content && item.content.overview) {
        detailsHtml += `
            <h3>Overview</h3>
            <p>${item.content.overview}</p>
        `;
    }

    // Display agent action steps if exists
    if (item.content && item.content.agentActionSteps && item.content.agentActionSteps.length > 0) {
        detailsHtml += `
            <h3>Agent Action Steps</h3>
            <div class="action-steps">
                <ul>
                    ${item.content.agentActionSteps.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Display process flow if exists
    if (item.content && item.content.processFlow && item.content.processFlow.length > 0) {
        detailsHtml += `
            <h3>Process Flow</h3>
            <div class="details-list">
                ${item.content.processFlow.map(flow => {
                    let flowHtml = `<strong>${flow.step}</strong>`;
                    if (flow.options && flow.options.length > 0) {
                        flowHtml += `<br><em>Options: ${flow.options.join(', ')}</em>`;
                    }
                    return `<div style="margin: 10px 0; padding: 10px; background: white; border-radius: 5px;">${flowHtml}</div>`;
                }).join('')}
            </div>
        `;
    }

    // Display sections if exists
    if (item.sections && item.sections.length > 0) {
        detailsHtml += `
            <h3>Step-by-Step Guide</h3>
            ${item.sections.map(section => `
                <section>
                    <h4>${section.step}</h4>
                    <p>${section.description}</p>
                    ${section.details ? `
                        <ul class="details-list">
                            ${section.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    ` : ''}
                </section>
            `).join('')}
        `;
    }

    detailsHtml += `
        <div style="margin-top: 20px;">
            <a href="${item.link}" target="_blank" style="display: inline-block; background: #11998e; color: white; padding: 12px 24px; border-radius: 20px; text-decoration: none; font-weight: bold;">Full Article</a>
        </div>
        </div>
    `;

    modalBody.innerHTML = detailsHtml;
    modal.classList.add('show');
}

// Modal close functionality
closeBtn.addEventListener('click', function() {
    modal.classList.remove('show');
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modal.classList.remove('show');
    }
});
