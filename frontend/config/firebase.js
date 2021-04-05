import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCdv_66TvA0BBpAi6UTJt2h_8DyoR65inY",
  authDomain: "diesel-599c3.firebaseapp.com",
  projectId: "diesel-599c3",
  storageBucket: "diesel-599c3.appspot.com",
  messagingSenderId: "1008600153558",
  appId: "1:1008600153558:web:d4a400c6e89ca6e7fcb877",
  measurementId: "G-XVNL6Y2TC4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
