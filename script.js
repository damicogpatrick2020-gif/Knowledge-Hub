let knowledge = [];

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

    if (results.length === 0) {
        container.innerHTML = '<p>No results found</p>';
        return;
    }

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
