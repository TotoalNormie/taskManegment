import { useEffect, useState } from 'react';
import makeAPIRequest from '../functions/makeAPIRequest';

const APITest = () => {
	const [test, setTest] = useState(['']);
	useEffect(() => {
		makeAPIRequest('test', res => {
			if (res.error === undefined) {
				console.log(res.message);
				setTest(res.message);
				return;
			}
			console.log(res.error);
			setTest('something went wrong');
		});
		makeAPIRequest('htaccessTest/45/dcvd', res => {
			if (res.error === undefined) {
				console.log(res);
				return;
			}
			console.log(res.error);
		});
	}, []);
	return (
		<div>
			<h2>PHP + React test:</h2>
			{test && <p>{test}</p>}
		</div>
	);
};

export default APITest;
