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
            
            const addToDeckButton = document.createElement("button");
            addToDeckButton.textContent = "Add to Deck";
            addToDeckButton.addEventListener("click", () => addToDeck(card));
            
            cardElement.appendChild(addToDeckButton);
            collectionDisplay.appendChild(cardElement);
        });
    }
    
    function displayDecks() {
        deckList.innerHTML = "";
        decks.forEach(deck => {
            const deckElement = document.createElement("div");
            deckElement.classList.add("deck");
            deckElement.textContent = deck.name;
            
            const deckCards = document.createElement("ul");
            deck.cards.forEach(card => {
                const cardItem = document.createElement("li");
                cardItem.textContent = `${card.name} (No. ${card.number})`;
                deckCards.appendChild(cardItem);
            });
            
            deckElement.appendChild(deckCards);
            deckList.appendChild(deckElement);
        });
    }
    
    function addToDeck(card) {
        if (decks.length === 0) {
            alert("No decks available. Create a deck first.");
            return;
        }
        
        const deckName = prompt("Enter the deck name to add this card:");
        const deck = decks.find(d => d.name === deckName);
        
        if (deck) {
            deck.cards.push(card);
            displayDecks();
        } else {
            alert("Deck not found.");
        }
    }
});
