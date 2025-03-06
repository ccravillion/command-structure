let decks = [];

function Deck(name) {
    this.name = name ?? '';
    this.id = '';
    this.commanders = [];
    this.cards = [];

    this.addDeck = function () {
        const newDeck = {
            name: this.name,
            id: this.id,
            commanders: [...this.commanders],
            cards: [...this.cards]
        };

        decks.push(newDeck);
        this.name = '';
    };

    this.addCommander = function (commander) {
        this.commanders.push(commander);
        return this;
    };

    this.addCard = function (card) {
        this.cards.push(card);
        return this;
    };

    this.removeCommander = function (deck, commander) {
        if (confirm('Are you sure you want to delete the commander?')) {
            const index = deck.commanders.findIndex(c => c.id === commander.id);
            if (index !== -1) {
                deck.commanders.splice(index, 1);
            }
        }
    };

    this.removeCard = function (deck, card) {
        if (confirm('Are you sure you want to delete this card?')) {
            const index = deck.cards.findIndex(c => c.id === card.id);
            if (index !== -1) {
                deck.cards.splice(index, 1);
            }
        }
    };

    this.switchCard = function (sourceDeck, targetDeck, card) {
        const cardIndex = sourceDeck.cards.findIndex(c => c.id === card.id);
        if (cardIndex !== -1) {
            sourceDeck.cards.splice(cardIndex, 1);
            targetDeck.cards.push(card);
        } else {
            console.error('Card not found in the source deck.');
        }
    };
}

function Card(name, type_line, image_uris, id, mana_cost, oracle_text, power, toughness, colors, color_identity, set_name, rarity, card_faces) {
    this.name = name;
    this.mana_cost = mana_cost;
    this.oracle_text = oracle_text;
    this.power = power;
    this.toughness = toughness;
    this.colors = colors;
    this.color_identity = color_identity;
    this.set_name = set_name;
    this.rarity = rarity;
    this.type_line = type_line;
    this.image_uris = image_uris;
    this.card_faces = card_faces;
    this.id = id;
}