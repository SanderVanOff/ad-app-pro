import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgSKKtbZYzMrFHtYN6gLxO8A22PvERWc0",
  authDomain: "ads-store-app.firebaseapp.com",
  databaseURL: "https://ads-store-app-default-rtdb.firebaseio.com",
  projectId: "ads-store-app",
  storageBucket: "ads-store-app.appspot.com",
  messagingSenderId: "980371227304",
  appId: "1:980371227304:web:31093dfa441bb415d2789d"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
