document.addEventListener("DOMContentLoaded", loadCollection);

let collection = JSON.parse(localStorage.getItem("collection")) || [];
let deck = JSON.parse(localStorage.getItem("deck")) || [];
let filteredCategory = null;

function addCard() {
    const fileInput = document.getElementById("cardImage");
    const nameInput = document.getElementById("cardName").value.trim();
    const numberInput = document.getElementById("cardNumber").value.trim();
    const reader = new FileReader();

    if (fileInput.files.length === 0 || !nameInput) {
        alert("Please upload an image and enter a card name.");
        return;
    }

    const file = fileInput.files[0];
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        const newCard = {
            name: nameInput,
            number: numberInput || "Uncategorized",
            image: e.target.result
        };

        collection.push(newCard);
        localStorage.setItem("collection", JSON.stringify(collection));
        fileInput.value = "";
        document.getElementById("cardName").value = "";
        document.getElementById("cardNumber").value = "";

        displayCollection();
        updateCategories();
    };
}

function displayCollection() {
    const collectionList = document.getElementById("collection");
    collectionList.innerHTML = "";

    let filteredCards = filteredCategory
        ? collection.filter(card => card.number === filteredCategory)
        : collection;

    filteredCards.forEach((card, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <p>${card.name} (${card.number})</p>
        `;
        li.draggable = true;
        li.ondragstart = (e) => dragStart(e, index, "collection");
        collectionList.appendChild(li);
    });
}

function addToDeck(cardIndex) {
    if (deck.length >= 32) {
        alert("Deck is full (32 cards max).");
        return;
    }

    const card = collection[cardIndex];
    if (!deck.includes(card)) {
        deck.push(card);
        localStorage.setItem("deck", JSON.stringify(deck));
        displayDeck();
    }
}

function displayDeck() {
    const deckList = document.getElementById("deck");
    deckList.innerHTML = "";

    deck.forEach((card, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <p>${card.name} (${card.number})</p>
        `;
        li.draggable = true;
        li.ondragstart = (e) => dragStart(e, index, "deck");
        deckList.appendChild(li);
    });
}

function clearDeck() {
    deck = [];
    localStorage.setItem("deck", JSON.stringify(deck));
    displayDeck();
}

function updateCategories() {
    const categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = "";

    const categories = [...new Set(collection.map(card => card.number))];
    categories.forEach(category => {
        let button = document.createElement("button");
        button.textContent = category;
        button.onclick = () => filterCategory(category);
        categoryContainer.appendChild(button);
    });
}

function filterCategory(category) {
    filteredCategory = category;
    displayCollection();
}

function dragStart(event, index, listType) {
    event.dataTransfer.setData("text/plain", JSON.stringify({ index, listType }));
}

document.getElementById("collection").ondragover = (e) => e.preventDefault();
document.getElementById("deck").ondragover = (e) => e.preventDefault();

document.getElementById("collection").ondrop = (e) => handleDrop(e, "collection");
document.getElementById("deck").ondrop = (e) => handleDrop(e, "deck");

function handleDrop(event, targetList) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const { index, listType } = data;

    if (listType === "collection" && targetList === "deck") {
        addToDeck(index);
    } else if (listType === "deck" && targetList === "collection") {
        deck.splice(index, 1);
        localStorage.setItem("deck", JSON.stringify(deck));
        displayDeck();
    }
}

function loadCollection() {
    displayCollection();
    displayDeck();
    updateCategories();
}
