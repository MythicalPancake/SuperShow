document.addEventListener("DOMContentLoaded", loadCollection);

let collection = JSON.parse(localStorage.getItem("collection")) || [];
let deck = JSON.parse(localStorage.getItem("deck")) || [];

function addCard() {
    let cardName = document.getElementById("cardName").value.trim();
    if (cardName && !collection.includes(cardName)) {
        collection.push(cardName);
        localStorage.setItem("collection", JSON.stringify(collection));
        document.getElementById("cardName").value = "";
        displayCollection();
    }
}

function displayCollection() {
    let collectionList = document.getElementById("collection");
    collectionList.innerHTML = "";
    collection.forEach(card => {
        let li = document.createElement("li");
        li.textContent = card;
        li.onclick = () => addToDeck(card);
        collectionList.appendChild(li);
    });
}

function addToDeck(card) {
    if (deck.length < 32 && !deck.includes(card)) {
        deck.push(card);
        localStorage.setItem("deck", JSON.stringify(deck));
        displayDeck();
    }
}

function displayDeck() {
    let deckList = document.getElementById("deck");
    deckList.innerHTML = "";
    deck.forEach(card => {
        let li = document.createElement("li");
        li.textContent = card;
        deckList.appendChild(li);
    });
}

function clearDeck() {
    deck = [];
    localStorage.setItem("deck", JSON.stringify(deck));
    displayDeck();
}

function loadCollection() {
    displayCollection();
    displayDeck();
}
