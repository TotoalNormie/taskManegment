import { useEffect, useState } from 'react';
import makeAPIRequest from '../functions/makeAPIRequest';

const APITest = () => {
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
};

export default APITest;
