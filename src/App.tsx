import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';


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

import NavigationBar from './common/NavigationBar/index';

require('firebase/auth');



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	console.log(loggedIn, 'loggedIn');
	const history = createBrowserHistory();
	console.log(loggedIn)
	useEffect(() => {
		setLoggedIn(!!firebaseAuth.currentUser);
	}, [])
	firebaseAuth.onAuthStateChanged((user) => {
		setLoggedIn(!!firebaseAuth.currentUser);
		if (firebaseAuth.currentUser !== null) {
			history.push('/');
		}
	});


	return (
		<BrowserRouter>
			{loggedIn && <NavigationBar />}
			<Routes>
				
				<Route path='/' element={loggedIn ? 
				<Homepage ></Homepage> 
				: <Login history={history} />}>
				{!loggedIn && <Route path='/prijava' element={<Login history={history} />}>
					</Route>}
				</Route>
				<Route path="/stonks" element={<Stock></Stock >}></Route>

			</Routes>
		</BrowserRouter>
	);
}

export default App;
