app.component('commander-modal', {
    data: function() {
        return {
            currentFaceIndex: {} // Track the current face index for each commander
        }
    },

    props: {
        decks: {
            type: Array,
            required: true
        },
        commander: {
            type: Object,
            required: true
        }
    },

    methods: {
        removeCommander(deck, commander) {
            // Remove the commander from the local deck
            const commanderIndex = deck.commanders.findIndex(c => c.name === commander.name);
            if (commanderIndex !== -1) {
                deck.commanders.splice(commanderIndex, 1);
            }

            // Update Firestore
            const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
            db.collection('users').doc(userId).collection('decks').doc(deck.id).update({
                commanders: deck.commanders
            }).then(() => {
                console.log("Commander removed and Firestore updated successfully!");
            }).catch(error => {
                console.error("Error updating Firestore: ", error);
            });
        },

        toggleCommanderFace(commander) {
            if (commander.card_faces && commander.card_faces.length > 1) {
                const currentIndex = this.currentFaceIndex[commander.name] || 0;
                this.currentFaceIndex[commander.name] = (currentIndex + 1) % commander.card_faces.length;
            }
        }
    },

    template: `
      <div v-for="deck in decks" :key="deck.id">
        <div v-for="(commander, i) in deck.commanders" :key="commander.name" class="modal fade" :id="'commanderModal' + deck.id + i" tabindex="-1" aria-labelledby="'commanderLabel' + commander.name" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" :id="'commanderLabel' + commander.name">
                  {{ commander.card_faces && commander.card_faces.length > 0 ? commander.card_faces[currentFaceIndex[commander.name] || 0].name : commander.name }}
                </h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="card">
                  <img
                      :src="commander.card_faces && commander.card_faces.length > 0 ? commander.card_faces[currentFaceIndex[commander.name] || 0].image_uris.normal : commander.image"
                      :alt="commander.card_faces && commander.card_faces.length > 0 ? commander.card_faces[currentFaceIndex[commander.name] || 0].name : commander.name"
                      @click="commander.card_faces && commander.card_faces.length > 1 ? toggleCommanderFace(commander) : null"
                      style="cursor: pointer;"
                  >
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ commander.card_faces && commander.card_faces.length > 0 ? commander.card_faces[currentFaceIndex[commander.name] || 0].name : commander.name }}
                    </h5>
                    <p class="card-description">
                      Type: {{ commander.card_faces && commander.card_faces.length > 0 ? commander.card_faces[currentFaceIndex[commander.name] || 0].type_line : commander.type_line }}
                    </p>
                    <p class="card-description" v-if="commander.card_faces && commander.card_faces.length > 0 ? commander.card_faces[currentFaceIndex[commander.name] || 0].mana_cost : commander.mana_cost">
                      Mana Cost: {{ commander.card_faces && commander.card_faces.length > 0 ? commander.card_faces[currentFaceIndex[commander.name] || 0].mana_cost : commander.mana_cost }}
                    </p>
                    <p class="card-description" v-if="commander.card_faces && commander.card_faces.length > 0 ? commander.card_faces[currentFaceIndex[commander.name] || 0].oracle_text : commander.oracle_text">
                      Text: {{ commander.card_faces && commander.card_faces.length > 0 ? commander.card_faces[currentFaceIndex[commander.name] || 0].oracle_text : commander.oracle_text }}
                    </p>
                    <p class="card-description" v-if="commander.card_faces && commander.card_faces.length > 0 && commander.card_faces[currentFaceIndex[commander.name] || 0].power && commander.card_faces[currentFaceIndex[commander.name] || 0].toughness">
                      Power/Toughness: {{ commander.card_faces[currentFaceIndex[commander.name] || 0].power }}/{{ commander.card_faces[currentFaceIndex[commander.name] || 0].toughness }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="removeCommander(deck, commander)">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
});