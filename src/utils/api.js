import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCwgkfrMF9XsQKWzSS1237N6XGN1NukzfE',
  authDomain: 'kelimebox.firebaseapp.com',
  databaseURL: 'https://kelimebox.firebaseio.com',
  projectId: 'kelimebox',
  storageBucket: 'kelimebox.appspot.com',
  messagingSenderId: '982029860251',
  appId: '1:982029860251:web:c3b2d71d753c995862b53e',
  measurementId: 'G-G8PFYE05J3',
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);

export const veritabani = app.database();
