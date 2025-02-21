document.addEventListener("DOMContentLoaded", () => {
    const scanCardButton = document.getElementById("scanCard");
    const manualInputButton = document.getElementById("manualInput");
    const createDeckButton = document.getElementById("createDeck");
    const collectionDisplay = document.getElementById("collectionDisplay");
    const deckList = document.getElementById("deckList");
    const sortNumber = document.getElementById("sortNumber");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const collectionGrid = document.getElementById("collectionGrid");
    
    let collection = [];
    let decks = [];
    let cardDatabase = [
        { name: "Fire Dragon", number: 5, image: "fire_dragon.jpg" },
        { name: "Water Serpent", number: 10, image: "water_serpent.jpg" },
        { name: "Earth Golem", number: 15, image: "earth_golem.jpg" }
    ];
    
    scanCardButton.addEventListener("click", () => {
        alert("Scanning feature not implemented yet.");
    });
    
    manualInputButton.addEventListener("click", () => {
        const cardName = prompt("Enter card name:");
        const cardNumber = prompt("Enter card number (1-30):");
        const cardImage = prompt("Enter image URL (or leave blank for default):") || "placeholder.jpg";
        
        if (cardName && cardNumber >= 1 && cardNumber <= 30) {
            const card = { name: cardName, number: parseInt(cardNumber), image: cardImage };
            collection.push(card);
            displayCollection();
        } else {
            alert("Invalid input. Please enter a valid name and number between 1-30.");
        }
    });
    
    createDeckButton.addEventListener("click", () => {
        const deckName = prompt("Enter deck name:");
        if (deckName) {
            decks.push({ name: deckName, cards: [] });
            displayDecks();
        }
    });
    
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = "";
        
        const filteredCards = cardDatabase.filter(card => card.name.toLowerCase().includes(query));
        
        filteredCards.forEach(card => {
            const cardElement = createCardElement(card, true);
            searchResults.appendChild(cardElement);
        });
    });
    
    function displayCollection() {
        collectionGrid.innerHTML = "";
        collection.forEach(card => {
            const cardElement = createCardElement(card, false);
            collectionGrid.appendChild(cardElement);
        });
    }
    
    function displayDecks() {
        deckList.innerHTML = "";
        decks.forEach(deck => {
            const deckElement = document.createElement("div");
            deckElement.classList.add("deck");
            deckElement.innerHTML = `<strong>${deck.name}</strong>`;
            
            const deckCards = document.createElement("div");
            deckCards.classList.add("deck-cards");
            deck.cards.forEach(card => {
                const cardElement = createCardElement(card, false);
                deckCards.appendChild(cardElement);
            });
            
            deckElement.appendChild(deckCards);
            deckList.appendChild(deckElement);
        });
    }
    
    function addToCollection(card) {
        collection.push(card);
        displayCollection();
    }
    
    function createCardElement(card, addButton) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}" class="card-image">
            <strong>${card.name}</strong>
        `;
        
        if (addButton) {
            const addToCollectionButton = document.createElement("button");
            addToCollectionButton.textContent = "Add to Collection";
            addToCollectionButton.addEventListener("click", () => addToCollection(card));
            cardElement.appendChild(addToCollectionButton);
        }
        
        return cardElement;
    }
    
    document.body.insertAdjacentHTML("beforeend", `
        <input type="text" id="searchInput" placeholder="Search for a card...">
        <div id="searchResults" class="card-grid"></div>
        
        <h2>Your Collection</h2>
        <div id="collectionGrid" class="card-grid"></div>
        
        <style>
            .card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 10px;
            }
            
            .card {
                border: 1px solid #ccc;
                padding: 10px;
                text-align: center;
            }
            
            .card img {
                width: 100%;
                height: auto;
            }
        </style>
    `);
});
