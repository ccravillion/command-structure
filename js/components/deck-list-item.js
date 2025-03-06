app.component('deckListItem', {
    props: {
        deck: {
            type: Object,
            required: true
        }
    },

    methods: {
        deleteDeck() {
            if (confirm('Are you sure you want to delete the deck?')) {
                this.$emit('delete-deck');
            }
        },

        renameDeck() {
            const newName = prompt('Enter a new name for the deck:', this.deck.name);
            if (newName) {
                this.deck.name = newName;
                this.$emit('rename-deck', this.deck);
            }
        },
    },

    template: `
      <div class="accordion-body">
        <div class="commanders">
          <div class="commanderImg" v-for="(commander, i) in deck.commanders" :key="commander.name">
            <img :src="commander.image" :alt="commander.name" class="mtg" data-bs-toggle="modal" :data-bs-target="'#commanderModal' + deck.id + i">
          </div>
        </div><hr>
        <div class="deckList">
          <div v-for="(card, i) in deck.cards" :key="card.name">
            <img :src="card.image" :alt="card.name" class="mtg" data-bs-toggle="modal" :data-bs-target="'#cardModal' + deck.id + i">
          </div>
        </div>
        <hr>
        <div class="deck-buttons">
          <button class="btn btn-outline" id="rename" @click="renameDeck()">Rename Deck</button>
          <button class="btn btn-outline-danger" @click="deleteDeck()">Delete Deck</button>
        </div>
      </div>
    `
});