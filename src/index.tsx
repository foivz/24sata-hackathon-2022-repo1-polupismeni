
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// firebase.initializeApp({
// 	apiKey: "AIzaSyDjg0UDhQS9Lb7T4Hd4y6obpd5ueH8-mm0",
// 	authDomain: "app-be-8db9f.firebaseapp.com",
// 	projectId: "app-be-8db9f",
// 	storageBucket: "app-be-8db9f.appspot.com",
// 	messagingSenderId: "649067911090",
// 	appId: "1:649067911090:web:a54d3653308d0d7f4bb6ab",
// 	measurementId: "G-JXTTDCBPVF"
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
