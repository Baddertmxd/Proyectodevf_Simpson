const container = document.getElementById('characters-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
let characters = [];

function displayCharacters(charactersToDisplay) {
    container.innerHTML = '';
    charactersToDisplay.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <h2>${character.character}</h2>
            <img src="${character.image}" alt="${character.character}">
            <button class="quote-btn">Mostrar frase</button>
            <p class="quote" style="display: none;">${character.quote}</p>
        `;

        const quoteBtn = card.querySelector('.quote-btn');
        const quoteText = card.querySelector('.quote');
        
        quoteBtn.addEventListener('click', () => {
            quoteText.style.display = quoteText.style.display === 'none' ? 'block' : 'none';
        });

        container.appendChild(card);
    });
}

function fetchCharacters() {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=50')
        .then(response => response.json())
        .then(data => {
            const charactersMap = {};
            data.forEach(character => {
                charactersMap[character.character] = character;
            });
            characters = Object.values(charactersMap);
            characters.sort((a, b) => a.character.localeCompare(b.character));
            displayCharacters(characters);
        })
        .catch(error => console.error('Error fetching characters:', error));
}

function searchCharacters() {
    const searchText = searchInput.value.toLowerCase();
    const filteredCharacters = characters.filter(character =>
        character.character.toLowerCase().includes(searchText)
    );
    displayCharacters(filteredCharacters);
}

searchButton.addEventListener('click', searchCharacters);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCharacters();
    }
});

fetchCharacters();