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
        <hr>
        <div class="deckList">
        </div>
        <hr>
        <div class="deck-buttons">
          <button class="btn btn-outline" id="rename" @click="renameDeck()">Rename Deck</button>
          <button class="btn btn-outline-danger" @click="deleteDeck()">Delete Deck</button>
        </div>
      </div>
    `
});