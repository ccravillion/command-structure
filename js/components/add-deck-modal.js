app.component('add-deck-modal', {
    data() {
        return {
            newDeck: new Deck(),
            isAuthenticated: false,
            currentUser: null
        }
    },

    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        decks: {
            type: Array,
            default: () => []
        },
    },

    methods: {
        addDeck() {
            if (this.newDeck.name) {
                this.handleAddDeck();
                this.newDeck = new Deck(); // Reset the input field
            } else {
                alert('Please enter a deck name');
            }
        },

        handleAddDeck() {
            if (!this.isAuthenticated || !this.currentUser) {
                alert('You must be logged in to add a deck.');
                return;
            }

            const userId = this.currentUser.uid; // Use the user's UID
            const deckData = {
                name: this.newDeck.name,
                commanders: this.newDeck.commanders,
                cards: this.newDeck.cards,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            addDeckToUser(userId, deckData)
                .then(() => {
                    console.log("Deck added successfully!");
                    this.$emit('add-deck', this.newDeck); // Notify parent component
                })
                .catch((error) => {
                    console.error("Error adding deck: ", error);
                });
        }
    },

    mounted() {
        auth.onAuthStateChanged(user => {
            this.isAuthenticated = !!user;
            this.currentUser = user;
        });
    },

    template: `
      <div class="modal fade" id="newDeckModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <form @submit.prevent="addDeck">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">New Deck</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input id="name" type="text" class="form-control" v-model="newDeck.name">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Nevermind</button>
                <button type="submit" class="btn btn-primary">Add Deck</button>
              </div>
            </div>
          </form>
        </div>
      </div>`
});

