document.addEventListener("DOMContentLoaded", () => {
    const scanCardButton = document.getElementById("scanCard");
    const manualInputButton = document.getElementById("manualInput");
    const createDeckButton = document.getElementById("createDeck");
    const collectionDisplay = document.getElementById("collectionDisplay");
    const deckList = document.getElementById("deckList");
    const sortNumber = document.getElementById("sortNumber");
    
    let collection = [];
    let decks = [];
    
    scanCardButton.addEventListener("click", () => {
        alert("Scanning feature not implemented yet.");
    });
    
    manualInputButton.addEventListener("click", () => {
        const cardName = prompt("Enter card name:");
        const cardNumber = prompt("Enter card number (1-30):");
        
        if (cardName && cardNumber >= 1 && cardNumber <= 30) {
            const card = { name: cardName, number: parseInt(cardNumber) };
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
    
    sortNumber.addEventListener("change", () => {
        displayCollection();
    });
    
    function displayCollection() {
        collectionDisplay.innerHTML = "";
        let filteredCollection = collection;
        const selectedNumber = sortNumber.value;
        
        if (selectedNumber !== "all") {
            filteredCollection = collection.filter(card => card.number == selectedNumber);
        }
        
        filteredCollection.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.textContent = `${card.name} (No. ${card.number})`;
            collectionDisplay.appendChild(cardElement);
        });
    }
    
    function displayDecks() {
        deckList.innerHTML = "";
        decks.forEach(deck => {
            const deckElement = document.createElement("div");
            deckElement.classList.add("deck");
            deckElement.textContent = deck.name;
            deckList.appendChild(deckElement);
        });
    }
});
