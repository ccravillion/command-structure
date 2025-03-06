app.component('search', {
    data: function() {
        return {
            searchQuery: '', // To hold the search query
            searchResults: [], // To store the results from the API
            errorMessage: '',
            advancedOptions: {
                type: '',
                color: '',
                rarity: '',
                setName: '',
                power: '',
                toughness: '',
                cmc: '',
                legality: ''
            }
        };
    },

    props: {
        card: {
            type: Object
        },
        cards: {
            type: Array,
            required: true
        },
        decks: {
            type: Array,
            required: true
        },
    },

    methods: {
        async performSearch() {
            let query = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(this.searchQuery)}`;

            // Add advanced search options to the query
            if (this.advancedOptions.type) {
                query += `+type:${encodeURIComponent(this.advancedOptions.type)}`;
            }
            if (this.advancedOptions.color) {
                query += `+color:${encodeURIComponent(this.advancedOptions.color)}`;
            }
            if (this.advancedOptions.rarity) {
                query += `+rarity:${encodeURIComponent(this.advancedOptions.rarity)}`;
            }

            try {
                const response = await fetch(query);

                if (!response.ok) {
                    throw new Error("Failed to fetch data from the API");
                }

                const data = await response.json();
                this.searchResults = data.data.map(card => {
                    let imageUrl = '';

                    // Check if the card has multiple faces
                    if (card.card_faces && card.card_faces.length > 0) {
                        // Use the image URL from the first face
                        imageUrl = card.card_faces[0].image_uris ? card.card_faces[0].image_uris.normal : null;
                    } else {
                        // Use the standard image URL
                        imageUrl = card.image_uris ? card.image_uris.normal : null;
                    }

                    return {
                        id: card.id ?? '',
                        name: card.name ?? '',
                        type_line: card.type_line ?? '',
                        mana_cost: card.mana_cost ?? '',
                        oracle_text: card.oracle_text ?? '',
                        power: card.power ?? '',
                        toughness: card.toughness ?? '',
                        colors: card.colors ?? '',
                        color_identity: card.color_identity ?? '',
                        set_name: card.set_name ?? '',
                        rarity: card.rarity ?? '',
                        image: imageUrl ?? '',
                        card_faces: card.card_faces || [], // Include card faces if available
                        image_uris: card.image_uris || [], // Include image uris if available
                    };
                });
                console.log('Search Results:', this.searchResults);
            } catch (error) {
                this.errorMessage = "Error fetching data: " + error.message;
            }
        }
    },

    template: `
      
        <form @submit.prevent="performSearch">
      <div class="searchContainer">
          <input class="searchBar" type="text" v-model="searchQuery" placeholder="Search for a card" />
          <button class="searchBtn" type="submit">Search</button>
      </div>
          <div class="advanced-options">
            <div>
              <label for="type"></label>
              <input type="text" id="type" v-model="advancedOptions.type" placeholder="Type: e.g., Creature" />
            </div>
            <div>
              <label for="color"></label>
              <input type="text" id="color" v-model="advancedOptions.color" placeholder="Color: e.g., Red" />
            </div>
            <div>
              <label for="rarity"></label>
              <input type="text" id="rarity" v-model="advancedOptions.rarity" placeholder="Rarity: e.g., Rare" />
            </div>
            <div>
              <label for="setName"></label>
              <input type="text" id="setName" v-model="advancedOptions.setName" placeholder="setName: e.g., Core Set 2021" />
            </div>
            <div>
              <label for="Power"></label>
              <input type="text" id="power" v-model="advancedOptions.power" placeholder="Power:" />
            </div>
            <div>
              <label for="Toughness"></label>
              <input type="text" id="toughness" v-model="advancedOptions.toughness" placeholder="Toughness:" />
            </div>
            <div>
              <label for="CMC"></label>
              <input type="text" id="cmc" v-model="advancedOptions.cmc" placeholder="CMC:" />
            </div>
            <div>
              <label for="Legality"></label>
              <input type="text" id="legality" v-model="advancedOptions.legality" placeholder="Legality:" />
            </div>
          </div>
        </form>

        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <ul class="resultsPage">
          <li v-for="card in searchResults" :key="card.id" class="mtg">
            <img :src="card.image" alt="card.image" v-if="card.image" data-bs-toggle="modal" :data-bs-target="'#cardInfoSearch' + card.id"/>
          </li>
        </ul>
        <search-card-modal :search-results="searchResults" :decks="decks"></search-card-modal>
    `
});