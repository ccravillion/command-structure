const app = Vue.createApp({
    data() {
        return {
            decks:
            [
                new Deck('Mothman', nextDeckId++)
                    .addCommander(new Card('The Wise Mothman', 'Legendary Creature', 'images/wise-mothman.jfif', nextCardId++))
                    .addCard(new Card('Agent Frank Horrigan', 'Legendary Creature', 'images/frank-horrigan.jfif', nextCardId++))
                    .addCard(new Card('Forest', 'Land', 'images/forest.jfif', nextCardId++))
                    .addCard(new Card('Swamp', 'Land', 'images/swamp.jfif', nextCardId++))
                    .addCard(new Card('Island', 'Land', 'images/island.jfif', nextCardId++))
                    .addCard(new Card('Contaminated Drink', 'Instant', 'images/contaminated-drink.jfif', nextCardId++))
                    .addCard(new Card('Rampant Growth', 'Sorcery', 'images/rampant-growth.jfif', nextCardId++))
                    .addCard(new Card('Struggle for Project Purity', 'Enchantment', 'images/struggle-for-project-purity.jfif', nextCardId++))
                    .addCard(new Card('Arcane Signet', 'Artifact', 'images/arcane-signet.jfif', nextCardId++)),

            new Deck('Frodo and Sam', nextDeckId++)
                .addCommander(new Card('Frodo', 'Legendary Creature', 'images/frodo.jfif', nextCardId++))
                .addCard(new Card('Sam', 'Legendary Creature', 'images/sam.jfif', nextCardId++))
                .addCard(new Card('Agent Frank Horrigan', 'Legendary Creature', 'images/frank-horrigan.jfif', nextCardId++))
                .addCard(new Card('Forest', 'Land', 'images/forest.jfif', nextCardId++))
                .addCard(new Card('Swamp', 'Land', 'images/swamp.jfif', nextCardId++))
                .addCard(new Card('Island', 'Land', 'images/island.jfif', nextCardId++))
                .addCard(new Card('Contaminated Drink', 'Instant', 'images/contaminated-drink.jfif', nextCardId++))
                .addCard(new Card('Rampant Growth', 'Sorcery', 'images/rampant-growth.jfif', nextCardId++))
                .addCard(new Card('Struggle for Project Purity', 'Enchantment', 'images/struggle-for-project-purity.jfif', nextCardId++))
                .addCard(new Card('Arcane Signet', 'Artifact', 'images/arcane-signet.jfif', nextCardId++)),

            new Deck('New Deck', nextDeckId++),
    ],
            data: new Deck('Test Deck', nextDeckId++)

        }
    }
});

//card: {
//    name: '',
//        type: [
//        'Legendary Creature',
//        'Creature',
//        'Instant',
//        'Sorcery',
//        'Enchantment',
//        'Artifact',
//        'Land'
//    ],
//        image: '',
//        id: nextCardId++,
//},
//commander: {
//    name: '',
//        type: ['Legendary Creature'],
//        image: ''
//},
//decks: [
//    {
//        name: 'Mothman',
//        id: nextDeckId++,
//        commanders: [
//            { name: 'The Wise Mothman', type: 'Legendary Creature', image: 'images/wise-mothman.jfif', id: nextCardId++ }
//        ],
//        cards: [
//            { name: 'Agent Frank Horrigan', type: 'Legendary Creature', image: 'images/frank-horrigan.jfif', id: nextCardId++ },
//            { name: 'Forest', type: 'Land', image: 'images/forest.jfif', id: nextCardId++ },
//            { name: 'Swamp', type: 'Land', image: 'images/swamp.jfif', id: nextCardId++ },
//            { name: 'Island', type: 'Land', image: 'images/island.jfif', id: nextCardId++ },
//            { name: 'Contaminated Drink', type: 'Instant', image: 'images/contaminated-drink.jfif', id: nextCardId++ },
//            { name: 'Rampant Growth', type: 'Sorcery', image: 'images/rampant-growth.jfif', id: nextCardId++ },
//            { name: 'Struggle for Project Purity', type: 'Enchantment', image: 'images/struggle-for-project-purity.jfif', id: nextCardId++ },
//            { name: 'Arcane Signet', type: 'Artifact', image: 'images/arcane-signet.jfif', id: nextCardId++ }
//        ]
//    },
//    {
//        name: 'Frodo and Sam',
//        id: nextDeckId++,
//        commanders: [
//            { name: 'Frodo', type: 'Legendary Creature', image: 'images/frodo.jfif', id: nextCardId++ }
//        ],
//        cards: [
//            { name: 'Sam', type: 'Legendary Creature', image: 'images/sam.jfif', id: nextCardId++ },
//            { name: 'Agent Frank Horrigan', type: 'Legendary Creature', image: 'images/frank-horrigan.jfif', id: nextCardId++ },
//            { name: 'Forest', type: 'Land', image: 'images/forest.jfif', id: nextCardId++ },
//            { name: 'Swamp', type: 'Land', image: 'images/swamp.jfif', id: nextCardId++ },
//            { name: 'Island', type: 'Land', image: 'images/island.jfif', id: nextCardId++ },
//            { name: 'Contaminated Drink', type: 'Instant', image: 'images/contaminated-drink.jfif', id: nextCardId++ },
//            { name: 'Rampant Growth', type: 'Sorcery', image: 'images/rampant-growth.jfif', id: nextCardId++ },
//            { name: 'Struggle for Project Purity', type: 'Enchantment', image: 'images/struggle-for-project-purity.jfif', id: nextCardId++ },
//            { name: 'Arcane Signet', type: 'Artifact', image: 'images/arcane-signet.jfif', id: nextCardId++ }
//        ]
//    },
//    {
//        name: 'Test Deck',
//        id: nextDeckId++,
//        commanders: [],
//        cards: []
//    },
//],
//{ name: 'Sam', type: 'Legendary Creature', image: 'images/sam.jfif', id: nextCardId++},
//{ name: 'Rampant Growth', type: 'Sorcery', image: 'images/rampant-growth.jfif', id: nextCardId++},
//{ name: 'Island', type: 'Land', image: 'images/island.jfif', id: nextCardId++},
//{ name: 'Megatron, Tyrant', type: 'Legendary Creature', image: 'images/megatron.jfif', id: nextCardId++},
//{ name: 'Essence Warden', type: 'Creature', image: 'images/essence_warden.jfif', id: nextCardId++},
//{ name: 'Forest', type: 'Land', image: 'images/forest.jfif', id: nextCardId++},
//{ name: 'Path to Exile', type: 'Instant', image: 'images/path_to_exile.jfif', id: nextCardId++},
//{ name: 'Optimus Prime, Hero', type: 'Legendary Creature', image: 'images/optimus.jfif', id: nextCardId++},
//{ name: 'Sanguine Bond', type: 'Enchantment', image: 'images/sanguine_bond.jfif', id: nextCardId++},
//{ name: 'Command Tower', type: 'Land', image: 'images/command_tower.jfif', id: nextCardId++},
//{ name: 'Feasting Hobbit', type: 'Creature', image: 'images/feasting_hobbit.jfif', id: nextCardId++},
//{ name: 'Frodo', type: 'Legendary Creature', image: 'images/frodo.jfif', id: nextCardId++},
//{ name: 'True Conviction', type: 'Enchantment', image: 'images/true_conviction.jfif', id: nextCardId++},
//{ name: 'Arcane Signet', type: 'Artifact', image: 'images/arcane-signet.jfif', id: nextCardId++},
//{ name: 'Agent Frank Horrigan', type: 'Legendary Creature', image: 'images/frank-horrigan.jfif', id: nextCardId++},
//{ name: 'Inspiring Call', type: 'Instant', image: 'images/inspiring_call.jfif', id: nextCardId++},
//{ name: 'Mountain', type: 'Land', image: 'images/mountain.jfif', id: nextCardId++},
//{ name: 'The Wise Mothman', type: 'Legendary Creature', image: 'images/wise-mothman.jfif', id: nextCardId++},
//{ name: 'Agent of the Iron Throne', type: 'Enchantment', image: 'images/agent_of_the_iron_throne.jfif', id: nextCardId++},
//{ name: 'Abzan Battle Priest', type: 'Creature', image: 'images/abzan_battle_priest.jfif', id: nextCardId++},
//{ name: 'Cultivate', type: 'Sorcery', image: 'images/cultivate.jfif', id: nextCardId++},
//{ name: 'Struggle for Project Purity', type: 'Enchantment', image: 'images/struggle-for-project-purity.jfif', id: nextCardId++},
//{ name: 'Abzan Falconer', type: 'Creature', image: 'images/abzan_falconer.jfif', id: nextCardId++},
//{ name: 'Swamp', type: 'Land', image: 'images/swamp.jfif' , id: nextCardId++},
//{ name: 'Gyome, Master Chef', type: 'Legendary Creature', image: 'images/gyome_master_chef.jfif', id: nextCardId++},
//{ name: 'Harmonize', type: 'Sorcery', image: 'images/harmonize.jfif' , id: nextCardId++},
//{ name: 'Dawn of Hope', type: 'Enchantment', image: 'images/dawn_of_hope.jfif' , id: nextCardId++},
//{ name: 'Starscream, Power Hungery', type: 'Legendary Creature', image: 'images/starscream.jfif', id: nextCardId++},
//{ name: 'Mentor of the Meek', type: 'Creature', image: 'images/mentor_of_the_meek.jfif', id: nextCardId++},
//{ name: 'Plains', type: 'land', image: 'images/plains.jfif', id: nextCardId++},