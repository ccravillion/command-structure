app.component('cardModal', {
    data: function () {
        return {
            currentFaceIndex: {} // Track the current face index for each card
        }
    },

    props: {
        decks: {
            type: Array,
            required: true
        },
        card: {
            type: Object,
            required: true
        }
    },

    methods: {
        removeCard(deck, card) {
            // Assuming `removeCard` is a method defined in the parent component or elsewhere
            const cardIndex = deck.cards.findIndex(c => c.name === card.name);
            if (cardIndex !== -1) {
                deck.cards.splice(cardIndex, 1);
            }

            // Update Firestore
            const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
            db.collection('users').doc(userId).collection('decks').doc(deck.id).update({
                cards: deck.cards
            }).then(() => {
                console.log("Card removed and Firestore updated successfully!");
            }).catch(error => {
                console.error("Error updating Firestore: ", error);
            });
        },

        toggleCardFace(card) {
            if (card.card_faces && card.card_faces.length > 1) {
                const currentIndex = this.currentFaceIndex[card.id] || 0;
                this.currentFaceIndex[card.id] = (currentIndex + 1) % card.card_faces.length;
            }
        }
    },

    template: `
      <div v-for="deck in decks" :key="deck.id">
        <div v-for="(card, i) in deck.cards" :key="card.id" class="modal fade" :id="'cardModal' + deck.id + i" tabindex="-1" aria-labelledby="'cardLabel' + card.id" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" :id="'cardLabel' + card.id">
                  {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].name : card.name }}
                </h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="card">
                  <img
                      :src="card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].image_uris.normal : card.image"
                      :alt="card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].name : card.name"
                      @click="card.card_faces && card.card_faces.length > 1 ? toggleCardFace(card) : null"
                      style="cursor: pointer;"
                  >
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].name : card.name }}
                    </h5>
                    <p class="card-description">
                      Type: {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].type_line : card.type_line }}
                    </p>
                    <p class="card-description" v-if="card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].mana_cost : card.mana_cost">
                      Mana Cost: {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].mana_cost : card.mana_cost }}
                    </p>
                    <p class="card-description" v-if="card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].oracle_text : card.oracle_text">
                      Text: {{ card.card_faces && card.card_faces.length > 0 ? card.card_faces[currentFaceIndex[card.id] || 0].oracle_text : card.oracle_text }}
                    </p>
                    <p class="card-description" v-if="card.card_faces && card.card_faces.length > 0 && card.card_faces[currentFaceIndex[card.id] || 0].power && card.card_faces[currentFaceIndex[card.id] || 0].toughness">
                      Power/Toughness: {{ card.card_faces[currentFaceIndex[card.id] || 0].power }}/{{ card.card_faces[currentFaceIndex[card.id] || 0].toughness }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="removeCard(deck, card)">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
});