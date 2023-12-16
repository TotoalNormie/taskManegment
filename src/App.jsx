import makeAPIRequest from './functions/makeAPIRequest';
import FullOpen from './components/FullOpen';
import Home from './components/Home';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import NoProject from './components/NoProject';
import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import APITest from './components/APITest';
import TestJomponent from './components/TestJomponent';
import { UserProvider } from './components/UserProvider';
import ParentTest from './components/ParentTest';


function App() {
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
