document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
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

  // Data storage
  let collection = [];
  let decks = [];
  let removeMode = false;
  
  // Card database: each card object can be customized here.
  // You can specify if a card is sorted by number, competitor, or entrance by
  // assigning appropriate values to these fields.
  let cardDatabase = [
    // #1
    // {name:"",number:1,competitor:"",entrance:"",image:""},
    { name: "American Double Punch", number: 1, competitor: "", entrance: "", image: "https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/1-American-Double-Punch.jpg?fit=450%2C614&ssl=1" },
    { name: "Body Punches", number: 1, competitor:"", entrance: "", image: "https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Body-Punches.jpg?fit=450%2C614&ssl=1" },
    { name: "Boot off the Apron", number: 1, competitor:"", entrance:"", image: "https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/01-BootOfTheApron.png?fit=1502%2C2048&ssl=1" },
    { name:"Boss-Rate Boot", number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/1-Boss-Rate-Boot.jpg?fit=450%2C614&ssl=1"},
    {name:"Chain-Wrapped Fist",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-Chain-Wrapped-Fist.jpg?fit=1502%2C2048&ssl=1"},
    {name: "Cheap Shot", number:1, competitor:"", entrance:"", image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Cheap-Shot.jpg?fit=450%2C614&ssl=1" },
    {name:"Chop Down", number:1, competitor:"", entrance: "", image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Chop-Down.jpg?fit=450%2C614&ssl=1"},
    {name:"Chop in the Corner",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/1-Chop-in-the-Corner.jpg?fit=450%2C614&ssl=1"},
    {name:"Chortling Low Blow",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/02/1-Chortling-Low-Blow.jpg?fit=450%2C614&ssl=1"},
    {name:"Cold Snap",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/1-Cold-Snap.jpg?fit=450%2C614&ssl=1"},
    {name:"Cosmic Smash",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/1-Cosmic-Smash-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Deflect",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/1-Deflect.jpg?fit=450%2C614&ssl=1"},
    {name:"Drumstick Solo",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-DrumstickSolo.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Eye Poke",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/1-Eye-Poke.jpg?fit=450%2C614&ssl=1"},
    {name:"Felt That",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/1-Felt-That.jpg?fit=450%2C614&ssl=1"},
    {name:"Finger Poke of Doom",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Finger-Poke-of-Doom.jpg?fit=450%2C614&ssl=1"},
    {name:"Flying Super Snape Face Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Flying-Super-Snap-Face-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Gunfire",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/1-Gunfire.jpg?fit=450%2C614&ssl=1"},
    {name:"Hold Back",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/01-PushBack.png?fit=1502%2C2048&ssl=1"},
    {name:"Kendo Stick",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Kendo-Stick.jpg?fit=450%2C614&ssl=1"},
    {name:"Knuckle Sandwich",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Knuckle-Sandwich.jpg?fit=450%2C614&ssl=1"},
    {name:"Knock It off",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/1-Knock-It-Off.jpg?fit=450%2C614&ssl=1"},
    {name:"Knuckle Up",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/1-Knuckle-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Ladder",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Ladder.jpg?fit=450%2C614&ssl=1"},
    {name:"Leap Frog",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Leap-Frog.jpg?fit=450%2C614&ssl=1"},
    {name:"Ledgendary Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/1-Legendary-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Lift the Boot",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Lift-the-Boot.jpg?fit=450%2C614&ssl=1"},
    {name:"Monogolian Chop",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/1-Mongolian-Chop.jpg?fit=450%2C614&ssl=1"},
    {name:"Machine Gun Chops",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-Machine-Gun-Chops.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Mule Kick",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/1-Mule-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"One-Two Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-One-Two-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Overshot",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Overshot.jpg?fit=450%2C614&ssl=1"},
    {name:"Palm Strike",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-Palm-Strike.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Pineapple",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/1-Pineapple.jpg?fit=450%2C614&ssl=1"},
    {name:"Rib Jab",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/06/1-Rib-Jab.jpg?fit=450%2C614&ssl=1"},
    {name:"Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/01/1-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Sheepish Collection",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/1-Sheepish-Collection.jpg?fit=450%2C614&ssl=1"},
    {name:"Smack in the Head",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/1-Smack-in-the-Head.jpg?fit=450%2C614&ssl=1"},
    {name:"Smack in the Head",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/1-Smack-in-the-Head-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"Snap Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Snap-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Splash off the Apron",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/01-SplashOffTheApron.png?fit=1502%2C2048&ssl=1"},
    {name:"Stiff Right Hand",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-Stiff-Right-Hand.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Tackle",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Tackle.jpg?fit=450%2C614&ssl=1"},
    {name:"Thunderbolt & Lightning Very, Very Frightening!",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/1-Thunderbolt-Lightning-Very-Very-Frightening.jpg?fit=450%2C614&ssl=1"},
    {name:"Springboard",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/1-Springboard.jpg?fit=450%2C614&ssl=1"},
    {name:"Trip Up",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/1-Trip-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Volley of Strikes",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Volley-of-Strikes.jpg?fit=450%2C614&ssl=1"},
    {name:"Wind Up",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Wind-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Yellow Card",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/1-Yellow-Card-1.jpg?fit=450%2C614&ssl=1"},
    // #2
    // {name:"",number:2,competitor:"",entrance:"",image:""},
    {name:"",number:2,competitor:"",entrance:"",image:""},
  ];

  // Navigation: show one page at a time.
  function showPage(target) {
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  }
  navTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.getAttribute("data-tab");
      showPage(target);
    });
  });

  // Home page functions
  scanCardButton.addEventListener("click", () => {
    alert("Scanning feature not implemented yet.");
  });
  manualInputButton.addEventListener("click", () => {
    const cardName = prompt("Enter card name:");
    const cardNumber = prompt("Enter card number (or leave blank if not applicable):");
    const cardCompetitor = prompt("Enter competitor (or leave blank if not applicable):") || "";
    const cardEntrance = prompt("Enter entrance (or leave blank if not applicable):") || "";
    const cardImage = prompt("Enter image URL (or leave blank for default):") || "placeholder.jpg";
    
    // You can decide what fields are required based on your data model.
    if (cardName && (cardNumber || cardCompetitor || cardEntrance)) {
      const card = {
        name: cardName,
        // Convert cardNumber to a number if provided; otherwise, keep it null.
        number: cardNumber ? parseInt(cardNumber) : null,
        competitor: cardCompetitor,
        entrance: cardEntrance,
        image: cardImage
      };
      collection.push(card);
      displayCollection();
    } else {
      alert("Invalid input. Please enter a valid card name and at least one category value.");
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
      const cardEl = createCardElement(card, "search");
      searchResults.appendChild(cardEl);
    });
  });

  // Display collection with sorting
  function displayCollection() {
    collectionGrid.innerHTML = "";
    let filtered = collection.slice();
    
    const selectedNumber = sortNumber.value;
    const competitorText = sortCompetitor.value.toLowerCase().trim();
    const entranceText = sortEntrance.value.toLowerCase().trim();
    
    if (selectedNumber !== "all") {
      filtered = filtered.filter(card => card.number == selectedNumber);
    }
    if (competitorText !== "") {
      filtered = filtered.filter(card =>
        card.competitor.toLowerCase().includes(competitorText)
      );
    }
    if (entranceText !== "") {
      filtered = filtered.filter(card =>
        card.entrance.toLowerCase().includes(entranceText)
      );
    }
    
    filtered.forEach(card => {
      const cardEl = createCardElement(card, "collection");
      collectionGrid.appendChild(cardEl);
    });
  }

  // Create card element for "search" and "collection" contexts.
  function createCardElement(card, context) {
    const el = document.createElement("div");
    el.classList.add("card");
    el.innerHTML = `
      <img src="${card.image}" alt="${card.name}" class="card-image">
      <strong>${card.name}</strong>
    `;
    if (context === "search") {
      const btn = document.createElement("button");
      btn.textContent = "Add to Collection";
      btn.addEventListener("click", () => {
        collection.push(card);
        displayCollection();
      });
      el.appendChild(btn);
    } else if (context === "collection") {
      if (removeMode) {
        const btn = document.createElement("button");
        btn.textContent = "Remove from Collection";
        btn.addEventListener("click", () => {
          const idx = collection.findIndex(c => c === card);
          if (idx > -1) {
            collection.splice(idx, 1);
            displayCollection();
          }
        });
        el.appendChild(btn);
      } else {
        const btn = document.createElement("button");
        btn.textContent = "Add to Deck";
        btn.addEventListener("click", () => {
          addToDeck(card);
        });
        el.appendChild(btn);
      }
    }
    return el;
  }

  // Function to add a card to a deck (from collection or search)
  function addToDeck(card) {
    if (decks.length === 0) {
      alert("No decks available. Create one first.");
      return;
    }
    const deckName = prompt("Enter the deck name to add this card:");
    if (!deckName) return;
    const deck = decks.find(d => d.name.toLowerCase() === deckName.toLowerCase());
    if (deck) {
      deck.cards.push(card);
      displayDecks();
    } else {
      alert("Deck not found.");
    }
  }

  // Function to remove a card from a deck
  function removeCardFromDeck(deck, cardIndex) {
    deck.cards.splice(cardIndex, 1);
    displayDecks();
  }

  // Function to add a card from the collection to a specific deck (from deck page)
  function addCardToDeck(deck) {
    const cardName = prompt("Enter the name of the card from your collection to add to this deck:");
    if (!cardName) return;
    const card = collection.find(c => c.name.toLowerCase() === cardName.toLowerCase());
    if (card) {
      deck.cards.push(card);
      displayDecks();
    } else {
      alert("Card not found in your collection.");
    }
  }

  // Deck functionality: Create a new deck.
  createDeckButton.addEventListener("click", () => {
    const deckName = prompt("Enter deck name:");
    if (deckName) {
      decks.push({ name: deckName, cards: [], loaded: false });
      displayDecks();
    }
  });

  // Display decks with Load/Hide toggle, Remove Deck, and card removal within deck.
  function displayDecks() {
    deckList.innerHTML = "";
    decks.forEach((deck, deckIndex) => {
      const deckEl = document.createElement("div");
      deckEl.classList.add("deck");
      
      // Deck header with deck name, toggle button, and remove deck button.
      const header = document.createElement("div");
      header.innerHTML = `<strong>${deck.name}</strong>`;
      
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = deck.loaded ? "Hide Deck" : "Load Deck";
      toggleBtn.addEventListener("click", () => {
        deck.loaded = !deck.loaded;
        displayDecks();
      });
      header.appendChild(toggleBtn);
      
      const removeDeckBtn = document.createElement("button");
      removeDeckBtn.textContent = "Remove Deck";
      removeDeckBtn.addEventListener("click", () => {
        decks.splice(deckIndex, 1);
        displayDecks();
      });
      header.appendChild(removeDeckBtn);
      
      deckEl.appendChild(header);
      
      // If deck is loaded, show its cards and an "Add Card from Collection" button.
      if (deck.loaded) {
        const addCardBtn = document.createElement("button");
        addCardBtn.textContent = "Add Card from Collection";
        addCardBtn.addEventListener("click", () => addCardToDeck(deck));
        deckEl.appendChild(addCardBtn);
        
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("deck-cards", "grid-container");
        
        deck.cards.forEach((card, cardIndex) => {
          const cardEl = document.createElement("div");
          cardEl.classList.add("card");
          cardEl.innerHTML = `
            <img src="${card.image}" alt="${card.name}" class="card-image">
            <strong>${card.name}</strong>
          `;
          const removeBtn = document.createElement("button");
          removeBtn.textContent = "Remove from Deck";
          removeBtn.addEventListener("click", () => {
            removeCardFromDeck(deck, cardIndex);
          });
          cardEl.appendChild(removeBtn);
          cardsContainer.appendChild(cardEl);
        });
        deckEl.appendChild(cardsContainer);
      }
      
      deckList.appendChild(deckEl);
    });
  }

  // Sorting event listeners for Collection page
  sortNumber.addEventListener("change", displayCollection);
  sortCompetitor.addEventListener("input", displayCollection);
  sortEntrance.addEventListener("input", displayCollection);
});
