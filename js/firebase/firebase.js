// firebase.js

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBY8m-LUBbLHBygcgA1yOSqdLY6YZtF8y4",
    authDomain: "command-structure.firebaseapp.com",
    projectId: "command-structure",
    storageBucket: "command-structure.firebasestorage.app",
    messagingSenderId: "1048713634484",
    appId: "1:1048713634484:web:a26fac9caa100b40766de1"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

