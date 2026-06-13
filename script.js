let knowledge = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        knowledge = data;
        displayResults(knowledge);
    });

const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('input', function() {

    const searchTerm = this.value.toLowerCase();

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

    results.forEach(item => {

        container.innerHTML += `
            <div class="card">
                <h3>${item.title}</h3>
                <p><strong>Tags:</strong> ${item.tags.join(', ')}</p>
                <p>${item.description}</p>
                <a href="${item.link}" target="_blank">Learn More</a>
            </div>
        `;

    });

}
