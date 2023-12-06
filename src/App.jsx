import { useState, useEffect } from 'react';
import makeAPIRequest from './functions/makeAPIRequest';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import APITest from './components/APITest';
import TestJomponent from './components/TestJomponent';

function App() {
	console.log(document.cookie);
	return (
		<BrowserRouter>
			<Header />
			<Sidebar />
			<main>
				<Routes>
					{/* <Route exact path='/' element={<APITest />}></Route> */}
					<Route exact path='/:id?' element={<APITest />}></Route>
					<Route exact path='/test' element={<TestJomponent />}></Route>
					<Route exact path='/signup' element={<Signup />}></Route>
					<Route exact path='/login' element={<Login />}></Route>
				</Routes>
			</main>
		</BrowserRouter>
	);
}
export default App;
