// js/firebase/userCollection.js

// Function to add a user
function addUser(userId, name, email) {
    db.collection('users').doc(userId).set({
        name: name,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log("User successfully added!");
        })
        .catch((error) => {
            console.error("Error adding user: ", error);
        });
}

// Function to get all users
function getUsers() {
    db.collection('users').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        })
        .catch((error) => {
            console.error("Error getting users: ", error);
        });
}

// Function to update a user
function updateUser(userId, updatedData) {
    db.collection('users').doc(userId).update(updatedData)
        .then(() => {
            console.log("User successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating user: ", error);
        });
}

// Function to delete a user
function deleteUser(userId) {
    db.collection('users').doc(userId).delete()
        .then(() => {
            console.log("User successfully deleted!");
        })
        .catch((error) => {
            console.error("Error deleting user: ", error);
        });
}

// js/firebase/userCollection.js

// Function to add a deck to a user's profile
function addDeckToUser(userId, deckData) {
    db.collection('users').doc(userId).collection('decks').add({
        ...deckData,
        cards: deckData.cards.map(card => ({
            name: card.name,
            faces: card.faces // Include the faces array for each card
        }))
    })
        .then(() => {
            console.log("Deck successfully added to user's profile!");
        })
        .catch((error) => {
            console.error("Error adding deck: ", error);
        });
}

// Function to get all decks for a user
function getUserDecks(userId) {
    db.collection('users').doc(userId).collection('decks').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const deck = doc.data();
                console.log(`Deck ID: ${doc.id}, Data: ${JSON.stringify(deck)}`);
                deck.cards.forEach(card => {
                    console.log(`Card Name: ${card.name}`);
                    card.faces.forEach(face => {
                        console.log(`Face Name: ${face.name}, Description: ${face.description}`);
                    });
                });
            });
        })
        .catch((error) => {
            console.error("Error getting decks: ", error);
        });
}

function updateDeck(userId, deckId, updatedData) {
    db.collection('users').doc(userId).collection('decks').doc(deckId).update({
        ...updatedData,
        cards: updatedData.cards.map(card => ({
            name: card.name,
            faces: card.faces // Ensure the faces array is included
        }))
    })
        .then(() => {
            console.log("Deck successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating deck: ", error);
        });
}

function deleteDeck(userId, deckId) {
    db.collection('users').doc(userId).collection('decks').doc(deckId).delete()
        .then(() => {
            console.log("Deck successfully deleted!");
        })
        .catch((error) => {
            console.error("Error deleting deck: ", error);
        });
}
// Additional functions for updating and deleting decks can be added here
const cardData = {
    name: "Double-Sided Card",
    faces: [
        {
            name: "Front Face",
            description: "Description of the front face",
            imageUri: "url_to_front_image"
        },
        {
            name: "Back Face",
            description: "Description of the back face",
            imageUri: "url_to_back_image"
        }
    ]
};

addCard(cardData);
function addCard(cardData) {
    db.collection('cards').add({
        name: cardData.name,
        faces: cardData.faces // Include the faces array
    })
        .then(() => {
            console.log("Card successfully added!");
        })
        .catch((error) => {
            console.error("Error adding card: ", error);
        });
}
function updateCard(cardId, updatedData) {
    db.collection('cards').doc(cardId).update({
        name: updatedData.name,
        faces: updatedData.faces // Ensure the faces array is included
    })
        .then(() => {
            console.log("Card successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating card: ", error);
        });
}