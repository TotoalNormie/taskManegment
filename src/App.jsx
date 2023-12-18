import makeAPIRequest from './functions/makeAPIRequest';
import FullOpen from './components/FullOpen';
import Home from './components/Home';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import NoProject from './components/NoProject';
import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestJomponent from './components/TestJomponent';
import { UserProvider } from './components/UserProvider';
import ParentTest from './components/ParentTest';
import { useEffect } from 'react';


function App() {
	console.log(document.cookie);
	useEffect(()=> {
		makeAPIRequest('get-user-info', (data) =>{
			console.log(data);
		});
	}, [])
	return (
		<UserProvider>
			<BrowserRouter>
				<Header />
				<Sidebar />
				<main>
					<Routes>
						<Route exact path='/:id?' element={<FullOpen />}></Route>
						<Route exact path='/test' element={<TestJomponent />}></Route>
						<Route exact path='/signup' element={<Signup />}></Route>
						<Route exact path='/login' element={<Login />}></Route>
						<Route exact path='/home' element={<Home />}></Route>
						<Route exact path='/fullopen' element={<FullOpen />}></Route>
						<Route exact path='/noproject' element={<NoProject />}></Route>
						<Route exact path='/parentTest' element={<ParentTest /> }></Route>
					</Routes>
				</main>
			</BrowserRouter>
		</UserProvider>
	);
}
export default App;
