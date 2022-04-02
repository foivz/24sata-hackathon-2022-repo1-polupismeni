import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from 'pages/Login';
import './_app.scss';
import { firebaseAuth } from './firebase';

function App() {
	return (
		<BrowserRouter>
			{firebaseAuth.currentUser ?
			<Routes>
				<Route path="/" element={<Homepage />}></Route>
			</Routes>
			: <Routes>
				<Route path="/prijava" element={<Login />}></Route>
			</Routes>
			}
		</BrowserRouter>
	);
}

export default App;
