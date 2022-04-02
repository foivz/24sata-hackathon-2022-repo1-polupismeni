import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from 'pages/Login';
import './_app.scss';
import { firebaseAuth } from './firebase';
import CategoriesList from './pages/CategoriesList/categoriesList';


function App() {
	return (
		<BrowserRouter>
			{firebaseAuth.currentUser ?
			<Routes>
				<Route path="/" element={<Homepage />}></Route>
				<Route path="/list" element={<CategoriesList />}></Route>
			</Routes>
			: <Routes>
				<Route path="/prijava" element={<Login />}></Route>
				<Route path="/list" element={<CategoriesList />}></Route>

			</Routes>
			}
			
		</BrowserRouter>
	);
}

export default App;
