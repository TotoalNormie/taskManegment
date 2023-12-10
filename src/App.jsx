import { useState, useEffect } from 'react';
import makeAPIRequest from './functions/makeAPIRequest';
import FullOpen from './components/FullOpen';
import Home from './components/Home';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import Calendar from './components/Calendar';
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
					<Route exact path='/home' element={<Home />}></Route>
					<Route exact path='/fullopen' element={<FullOpen />}></Route>
					<Route exact path='/calendar' element={<Calendar />}></Route>
				</Routes>
			</main>
		</BrowserRouter>
	);
}
export default App;