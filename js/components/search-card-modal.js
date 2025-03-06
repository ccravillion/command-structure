app.component('search-card-modal', {
    data: function() {
        return {
            selectedDeck: '',
            checked: false,
            currentFaceIndex: {} // Track the current face index for each card
        }
    },

    props: {
        searchResults: {
            type: Array,
            required: true
        },
        decks: {
            type: Array,
            required: true
        },
    },

    methods: {
        async addToDeck(card) {
            console.log("Available decks:", this.decks);
            const deck = this.decks.find(deck => deck.name === this.selectedDeck);
            if (deck) {
                if (this.checked) {
                    deck.commanders.push(card);
                } else {
                    deck.cards.push(card);
                }

                // Reset the checkbox
                this.checked = false;

                // Update Firestore
                try {
                    const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
                    console.log({
                        commanders: deck.commanders,
                        cards: deck.cards
                    });
                    await db.collection('users').doc(userId).collection('decks').doc(deck.id).update({
                        commanders: deck.commanders,
                        cards: deck.cards
                    });
                    console.log("Deck updated successfully in Firestore!");
                } catch (error) {
                    console.error("Error updating Firestore: ", error);
                }

                // Close the modal
                const modalElement = document.getElementById('cardInfoSearch' + card.id);
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();
            } else {
                console.error("No deck selected or deck not found.");
            }
        },

        toggleCardFace(card) {
            if (card.card_faces && card.card_faces.length > 1) {
                const currentIndex = this.currentFaceIndex[card.id] || 0;
                this.currentFaceIndex[card.id] = (currentIndex + 1) % card.card_faces.length;
            }
        }
    },

    template: `
      <div>
        <div v-for="card in searchResults" :key="card.id" class="modal fade" :id="'cardInfoSearch' + card.id" tabindex="-1" aria-labelledby="searchLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" id="searchLabel">
                  {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].name : card.name }}
                </h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="card">
                  <img
                      :src="card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].image_uris.normal : card.image_uris.normal"
                      :alt="card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].name : card.name"
                      @click="toggleCardFace(card)"
                      style="cursor: pointer;"
                  >
                  <div class="card-body">
                    <h2 class="card-title">
                      {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].name : card.name }}
                    </h2>
                    <p class="card-description">
                      Type: {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].type_line : card.type_line }}
                    </p>
                    <p  class="card-description" v-if="card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].mana_cost : card.mana_cost">
                      Mana Cost: {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].mana_cost : card.mana_cost }}
                    </p>
                    <p  class="card-description" v-if="card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].oracle_text : card.oracle_text">
                      Text: {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].oracle_text : card.oracle_text }}
                    </p>
                    <p  class="card-description" v-if="card.card_faces && card.card_faces.length > 0 && card.card_faces[currentFaceIndex[card.id] || 0].power && card.card_faces[currentFaceIndex[card.id] || 0].toughness">
                      Power/Toughness: {{ card.card_faces[currentFaceIndex[card.id] || 0].power }}/{{ card.card_faces[currentFaceIndex[card.id] || 0].toughness }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="modal-footer searchModal">
                <div class="dropdown">
                  <label class="deck-select" for="deckSelect">Select Deck:</label>
                  <select id="deckSelect" v-model="selectedDeck">
                    <option v-for="deck in decks" :key="deck.id" :value="deck.name">
                      {{ deck.name }}
                    </option>
                  </select>
                </div>
                <div class="commander-set" v-if="card.type_line && (card.type_line.includes('Legendary Creature') || card.type_line.includes('Legendary Artifact Creature'))">
                  <input v-model="checked" type="checkbox">
                  Set as Commander
                </div>
                <button type="button" class="btn btn-outline-success" @click="addToDeck(card)">
                  Add to Deck
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
});
//Key words needed: Partner, Meld