app.component('deck-list', {
    data: function() {
        return {
            decks: [],
            currentUser: null
        }
    },

    mounted() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.currentUser = user;
                this.listenToUserDecks();
            } else {
                console.log("User not authenticated");
            }
        });
    },

    methods: {
        listenToUserDecks() {
            if (!this.currentUser) {
                console.error("No authenticated user found.");
                return;
            }

            const userId = this.currentUser.uid;
            db.collection('users').doc(userId).collection('decks')
                .onSnapshot(snapshot => {
                    this.decks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    this.$emit('decks-updated', this.decks); // Emit the updated decks
                }, error => {
                    console.error("Error listening to user decks: ", error);
                });
        },

        updateDeck(deck) {
            const userId = this.currentUser.uid;
            db.collection('users').doc(userId).collection('decks').doc(deck.id).update(deck)
                .then(() => {
                    console.log("Deck updated successfully!");
                })
                .catch(error => {
                    console.error("Error updating deck: ", error);
                });
        },

        deleteDeck(deckId) {
            const userId = this.currentUser.uid;
            db.collection('users').doc(userId).collection('decks').doc(deckId).delete()
                .then(() => {
                    console.log("Deck deleted successfully!");
                })
                .catch(error => {
                    console.error("Error deleting deck: ", error);
                });
        },

        updateDecks(newDecks) {
            this.decks = newDecks;
        },

        getTotalCards(deck) {
            const cardCount = deck.cards ? deck.cards.length : 0;
            const commanderCount = deck.commanders ? deck.commanders.length : 0;
            return cardCount + commanderCount;
        }
    },

    template: `
      <div class="accordion">
        <div class="accordion-item" v-for="(deck, index) in decks" :key="deck.id">
          <h2 class="accordion-header" :id="'heading' + index">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="true" :aria-controls="'collapse' + index">
              {{ deck.name }} ({{ getTotalCards(deck) }} cards)
            </button>
          </h2>
          <div :id="'collapse' + index" class="accordion-collapse collapse" :class="{ show: index === 0 }" data-bs-parent="#accordionExample">
            <deck-list-item
                :deck="deck"
                @delete-deck="deleteDeck(deck.id)"
                @rename-deck="updateDeck"
            ></deck-list-item>
          </div>
        </div>
      </div>
    `
});