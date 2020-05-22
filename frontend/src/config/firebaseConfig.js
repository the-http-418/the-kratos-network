import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCdAspY0TzHycHpFKPf8Jkg522QPvuIIUM",
    authDomain: "the-kratos-network.firebaseapp.com",
    databaseURL: "https://the-kratos-network.firebaseio.com",
    projectId: "the-kratos-network",
    storageBucket: "the-kratos-network.appspot.com",
    messagingSenderId: "119393262268",
    appId: "1:119393262268:web:1bedb50678444680c04eb9",
    measurementId: "G-RV8T53C2JN"
  };

const Fireapp = firebase.initializeApp(firebaseConfig);

export default Fireapp;