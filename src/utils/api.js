import firebase from 'firebase';

var firebaseConfig = {
  apiKey: '*****',
  authDomain: '***',
  databaseURL: '****',
  projectId: 'kelimebox',
  storageBucket: '***',
  messagingSenderId: '***',
  appId: '***',
  measurementId: '***',
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);

export const veritabani = app.database();
