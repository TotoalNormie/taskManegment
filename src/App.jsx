import React, { useState, useEffect } from 'react';
import makeAPIRequest from './functions/makeAPIRequest';
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
		<div>
			<h2>PHP + React test:</h2>
			{test && <p>{test}</p>}
		</div>
	);
}
export default App;
