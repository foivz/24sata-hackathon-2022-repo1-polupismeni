import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

require('firebase/auth');

const firebaseConfig = {
	apiKey: "AIzaSyDjg0UDhQS9Lb7T4Hd4y6obpd5ueH8-mm0",
	authDomain: "app-be-8db9f.firebaseapp.com",
	projectId: "app-be-8db9f",
	storageBucket: "app-be-8db9f.appspot.com",
	messagingSenderId: "649067911090",
	appId: "1:649067911090:web:a54d3653308d0d7f4bb6ab",
	measurementId: "G-JXTTDCBPVF"
  };

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();

export default app;



