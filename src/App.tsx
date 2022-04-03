import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Stock from './pages/StocksAndCrypto';

import './_app.scss';
// import { firebaseAuth, firestore } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FirebaseApp, { firebaseAuth } from './firebase'

import KommunicateChat from './common/Chatbot/Chatbot';

import NavigationBar from './common/NavigationBar/index';

require('firebase/auth');



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	console.log(loggedIn, 'loggedIn');
	console.log(loggedIn)
	useEffect(() => {
		setLoggedIn(!!firebaseAuth.currentUser);
	}, [])
	let authFlag = true;
	firebaseAuth.onAuthStateChanged((user) => {
		if (authFlag) {
			authFlag = false;
			if (user) {
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
			}
		}
		setLoggedIn(!!firebaseAuth.currentUser);
	});


	return (
		<BrowserRouter>
			{loggedIn && <NavigationBar />}
			<Switch>
				{!loggedIn &&
				<Route exact path="/">
					<Redirect to="login"></Redirect>
				</Route>
				}
				{!loggedIn && (
					<Route exact path="/login">
						<Login />
					</Route>
				)}
				{loggedIn &&
					<Route exact path='/stonks' >
						<Stock></Stock>
					</Route>
				}
					{loggedIn &&
					<Route path='/' >
						<Homepage></Homepage>
					</Route>
				}
			</Switch>
			{loggedIn && <KommunicateChat />}
		</BrowserRouter>
	);
}

export default App;
