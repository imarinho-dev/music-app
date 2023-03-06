import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARiDQHQPEp13NoPCk9-f75JhzrY8FHa1E",
  authDomain: "music-app-cde74.firebaseapp.com",
  projectId: "music-app-cde74",
  storageBucket: "music-app-cde74.appspot.com",
  appId: "1:381153137957:web:58e3929234108865e876cc",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  storage,
  commentsCollection,
};
