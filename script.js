document.addEventListener("DOMContentLoaded", () => {
  const navTabs = document.querySelectorAll(".nav-tab");
  const pages = document.querySelectorAll(".page");
  const scanCardButton = document.getElementById("scanCard");
  const manualInputButton = document.getElementById("manualInput");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const collectionGrid = document.getElementById("collectionGrid");
  const sortNumber = document.getElementById("sortNumber");
  const sortCompetitor = document.getElementById("sortCompetitor");
  const sortEntrance = document.getElementById("sortEntrance");
  const toggleRemoveButton = document.getElementById("toggleRemoveMode");
  const createDeckButton = document.getElementById("createDeck");
  const deckList = document.getElementById("deckList");

  let collection = [];
  let decks = [];
  let removeMode = false;
  let cardDatabase = [
    { name: "Fire Dragon", number: 5, competitor: "Alpha", entrance: "Main", image: "fire_dragon.jpg" },
    { name: "Water Serpent", number: 10, competitor: "Beta", entrance: "Side", image: "water_serpent.jpg" },
    { name: "Earth Golem", number: 15, competitor: "Gamma", entrance: "Main", image: "earth_golem.jpg" }
  ];

  // Navigation
  function showPage(target) {
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  }
  navTabs.forEach(tab => {
    tab.addEventListener("click", event => {
      event.preventDefault();
      showPage(event.target.dataset.tab);
    });
  });

  // Home page functions
  scanCardButton.addEventListener("click", () => {
    alert("Scanning feature not implemented yet.");
  });
  manualInputButton.addEventListener("click", () => {
    const cardName = prompt("Enter card name:");
    const cardNumber = prompt("Enter card number (1-30):");
    const cardCompetitor = prompt("Enter competitor:") || "Unknown";
    const cardEntrance = prompt("Enter entrance:") || "Unknown";
    const cardImage = prompt("Enter image URL (or leave blank for default):") || "placeholder.jpg";
    
    if (cardName && cardNumber >= 1 && cardNumber <= 30) {
      const card = {
        name: cardName,
        number: parseInt(cardNumber),
        competitor: cardCompetitor,
        entrance: cardEntrance,
        image: cardImage
      };
      collection.push(card);
      displayCollection();
    } else {
      alert("Invalid input. Please enter a valid name and number between 1-30.");
    }
  });

  // Toggle Remove Mode on Collection page
  toggleRemoveButton.addEventListener("click", () => {
    removeMode = !removeMode;
    toggleRemoveButton.textContent = removeMode ? "Disable Remove Mode" : "Enable Remove Mode";
    displayCollection();
  });

  // Search functionality
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";
    const filteredCards = cardDatabase.filter(card =>
      card.name.toLowerCase().includes(query)
    );
    filteredCards.forEach(card => {
      const cardElement = createCardElement(card, "search");
      searchResults.appendChild(cardElement);
    });
  });

  // Display collection with sorting
  function displayCollection() {
    collectionGrid.innerHTML = "";
    let filteredCollection = collection;
    
    const selectedNumber = sortNumber.value;
    const selectedCompetitor = sortCompetitor.value.toLowerCase();
    const selectedEntrance = sortEntrance.value.toLowerCase();
    
    if (selectedNumber !== "all") {
      filteredCollection = filteredCollection.filter(card => card.number == selectedNumber);
    }
    if (selectedCompetitor.trim() !== "" && selectedCompetitor !== "all") {
      filteredCollection = filteredCollection.filter(card =>
        card.competitor.toLowerCase().includes(selectedCompetitor)
      );
    }
    if (selectedEntrance.trim() !== "" && selectedEntrance !== "all") {
      filteredCollection = filteredCollection.filter(card =>
        card.entrance.toLowerCase().includes(selectedEntrance)
      );
    }
    
    filteredCollection.forEach(card => {
      const cardElement = createCardElement(card, "collection");
      collectionGrid.appendChild(cardElement);
    });
  }

  // Create card element based on context:
  // "search": shows "Add to Collection" button.
  // "collection": shows "Add to Deck" if removeMode is off, or "Remove from Collection" if removeMode is on.
  // "deck": shows "Add to Deck" button.
  function createCardElement(card, context) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.name}" class="card-image">
      <strong>${card.name}</strong>
    `;
    if (context === "search") {
      const addToCollectionButton = document.createElement("button");
      addToCollectionButton.textContent = "Add to Collection";
      addToCollectionButton.addEventListener("click", () => {
        collection.push(card);
        displayCollection();
      });
      cardElement.appendChild(addToCollectionButton);
    } else if (context === "collection") {
      if (removeMode) {
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from Collection";
        removeButton.addEventListener("click", () => {
          const index = collection.indexOf(card);
          if (index > -1) {
            collection.splice(index, 1);
            displayCollection();
          }
        });
        cardElement.appendChild(removeButton);
      } else {
        const addToDeckButton = document.createElement("button");
        addToDeckButton.textContent = "Add to Deck";
        addToDeckButton.addEventListener("click", () => {
          addToDeck(card);
        });
        cardElement.appendChild(addToDeckButton);
      }
    } else if (context === "deck") {
      const addToDeckButton = document.createElement("button");
      addToDeckButton.textContent = "Add to Deck";
      addToDeckButton.addEventListener("click", () => {
        addToDeck(card);
      });
      cardElement.appendChild(addToDeckButton);
    }
    return cardElement;
  }

  // Add card to deck (from card element)
  function addToDeck(card) {
    if (decks.length === 0) {
      alert("No decks available. Create a deck first.");
      return;
    }
    const deckName = prompt("Enter the deck name to add this card:");
    const deck = decks.find(d => d.name.toLowerCase() === deckName.toLowerCase());
    if (deck) {
      deck.cards.push(card);
      displayDecks();
    } else {
      alert("Deck not found.");
    }
  }

  // Add card to deck (from deck page)
  function addCardToDeck(deck) {
    const cardName = prompt("Enter the name of the card from your collection to add to this deck:");
    const card = collection.find(c => c.name.toLowerCase() === cardName.toLowerCase());
    if (card) {
      deck.cards.push(card);
      displayDecks();
    } else {
      alert("Card not found in your collection.");
    }
  }

  // Deck functionality
  createDeckButton.addEventListener("click", () => {
    const deckName = prompt("Enter deck name:");
    if (deckName) {
      decks.push({ name: deckName, cards: [], loaded: false });
      displayDecks();
    }
  });

  // Display decks with Load/Hide toggle and an "Add Card" button when loaded.
  function displayDecks() {
    deckList.innerHTML = "";
    decks.forEach(deck => {
      const deckElement = document.createElement("div");
      deckElement.classList.add("deck");
      let deckHtml = `<strong>${deck.name}</strong> `;
      if (deck.loaded) {
        deckHtml += `<button class="toggleDeck" data-deck="${deck.name}">Hide Deck</button>`;
      } else {
        deckHtml += `<button class="toggleDeck" data-deck="${deck.name}">Load Deck</button>`;
      }
      deckElement.innerHTML = deckHtml;
      
      if (deck.loaded) {
        const addCardButton = document.createElement("button");
        addCardButton.textContent = "Add Card from Collection";
        addCardButton.addEventListener("click", () => addCardToDeck(deck));
        deckElement.appendChild(addCardButton);
        
        const deckCardsContainer = document.createElement("div");
        deckCardsContainer.classList.add("deck-cards", "grid-container");
        deck.cards.forEach(card => {
          const cardElement = createCardElement(card, "deck");
          deckCardsContainer.appendChild(cardElement);
        });
        deckElement.appendChild(deckCardsContainer);
      }
      deckList.appendChild(deckElement);
    });
    document.querySelectorAll(".toggleDeck").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const deckName = e.target.dataset.deck;
        const deck = decks.find(d => d.name.toLowerCase() === deckName.toLowerCase());
        deck.loaded = !deck.loaded;
        displayDecks();
      });
    });
  }

  sortNumber.addEventListener("change", displayCollection);
  sortCompetitor.addEventListener("input", displayCollection);
  sortEntrance.addEventListener("input", displayCollection);
});
