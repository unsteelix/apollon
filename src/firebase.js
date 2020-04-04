import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDc18h88IXQavvUBCDbPZs4H4U8TUKSyiM",
    authDomain: "apollon-71292.firebaseapp.com",
    databaseURL: "https://apollon-71292.firebaseio.com",
    projectId: "apollon-71292",
    storageBucket: "apollon-71292.appspot.com",
    messagingSenderId: "743880292900",
    appId: "1:743880292900:web:01c5094f6ec6f3be35b6b1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const DB = firebase.database().ref();

export default DB

export const cardsRef = DB.child('cards')
export const usersRef = DB.child('users')