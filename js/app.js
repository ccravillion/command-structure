const app = Vue.createApp({
    data() {
        return {
            card: {
                name: '',
                type_line: '',
                mana_cost: '',
                oracle_text: '',
                power: '',
                toughness: '',
                colors: [],
                color_identity: [],
                set_name: '',
                rarity: '',
                image_uris: {
                    normal: ''
                },
                id: ''
            },
            commander: {
                name: '',
                type_line: 'Legendary Creature',
                image_uris: {
                    normal: ''
                }
            },
            newDeck: {
                name: '',
                id: '',
                commanders: [],
                cards: []
            },
            decks: [],
            user: null,
            cards: [],
            selectedDeck: '',
            mySearchResults: [],
            myCardFaceData: [],
            myImageUris: []
        };
    },

    methods: {
        updateDecks(newDecks) {
            this.decks = newDecks;
        },

        handleAddDeck(newDeck) {
            if (this.user) {
                this.decks.push(newDeck);
                console.log('New deck added:', newDeck);
            } else {
                alert('You must be logged in to add a deck.');
            }
        },

        openVenue(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.querySelectorAll('#decksTab, #searchTab, #exploreTab');
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tabBtn");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
    },

    mounted() {
        auth.onAuthStateChanged(user => {
            this.user = user;
        });
    }
});



