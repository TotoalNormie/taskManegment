import React, { useState, useEffect } from 'react';
import makeAPIRequest from './functions/makeAPIRequest';
import Header from './components/Header';
import Calendar from './components/Calendar';
import './style/App.css';

function App() {
	const [test, setTest] = useState(['']);
	useEffect(() => {
		makeAPIRequest('test.php', res => {
			if (res.error === undefined) {
				console.log(res.message);
				setTest(res.message);
				return;
			}
			console.log(res.error);
			setTest('something went wrong');
		});
	}, []);
	return (
		<>
			<Header />
			<div>
				<h2>PHP + React test:</h2>
				{test && <p>{test}</p>}
			</div>
			<Calendar />
		</>
	);
}
export default App;
