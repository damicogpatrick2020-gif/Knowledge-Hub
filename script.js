let knowledge = [];

fetch('json.data.txt')
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
        item.category.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm)
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
                <p><strong>Category:</strong> ${item.category}</p>
                <p>${item.content}</p>
            </div>
        `;

    });

}
