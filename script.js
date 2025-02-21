document.addEventListener("DOMContentLoaded", () => {
    const navTabs = document.querySelectorAll(".nav-tab");
    const pages = document.querySelectorAll(".page");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const collectionGrid = document.getElementById("collectionGrid");
    const sortNumber = document.getElementById("sortNumber");
    const sortCompetitor = document.getElementById("sortCompetitor");
    const sortEntrance = document.getElementById("sortEntrance");
    const createDeckButton = document.getElementById("createDeck");
    const deckList = document.getElementById("deckList");
    
    let collection = [];
    let decks = [];
    let cardDatabase = [
        { name: "Fire Dragon", number: 5, competitor: "Alpha", entrance: "Main", image: "fire_dragon.jpg" },
        { name: "Water Serpent", number: 10, competitor: "Beta", entrance: "Side", image: "water_serpent.jpg" },
        { name: "Earth Golem", number: 15, competitor: "Gamma", entrance: "Main", image: "earth_golem.jpg" }
    ];
    
    function showPage(target) {
        pages.forEach(page => page.style.display = "none");
        document.getElementById(target).style.display = "block";
    }
    
    navTabs.forEach(tab => {
        tab.addEventListener("click", event => {
            event.preventDefault();
            showPage(event.target.dataset.tab);
        });
    });
    
    showPage("home"); // Ensure the home page is visible by default
    
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
        let filteredCollection = collection;
        
        const selectedNumber = sortNumber.value;
        const selectedCompetitor = sortCompetitor.value.toLowerCase();
        const selectedEntrance = sortEntrance.value.toLowerCase();
        
        if (selectedNumber !== "all") {
            filteredCollection = filteredCollection.filter(card => card.number == selectedNumber);
        }
        if (selectedCompetitor !== "all") {
            filteredCollection = filteredCollection.filter(card => card.competitor.toLowerCase().includes(selectedCompetitor));
        }
        if (selectedEntrance !== "all") {
            filteredCollection = filteredCollection.filter(card => card.entrance.toLowerCase().includes(selectedEntrance));
        }
        
        filteredCollection.forEach(card => {
            const cardElement = createCardElement(card, false);
            collectionGrid.appendChild(cardElement);
        });
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
            addToCollectionButton.addEventListener("click", () => {
                collection.push(card);
                displayCollection();
            });
            cardElement.appendChild(addToCollectionButton);
        }
        
        return cardElement;
    }
    
    createDeckButton.addEventListener("click", () => {
        const deckName = prompt("Enter deck name:");
        if (deckName) {
            decks.push({ name: deckName, cards: [] });
            displayDecks();
        }
    });
    
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
    
    sortNumber.addEventListener("change", displayCollection);
    sortCompetitor.addEventListener("input", displayCollection);
    sortEntrance.addEventListener("input", displayCollection);
});
