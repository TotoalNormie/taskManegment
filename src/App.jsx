import React, { useState, useEffect } from 'react';
function App() {
	const [joke, setJoke] = useState(null);
	useEffect(() => {
		fetch('/api/test.php', {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'your-api-key',
				'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com',
			},
		})
			.then(response => console.log(response)
			.catch(error => console.log(error));
	}, []);
	return (
		<div>
			<h2>Joke of the day:</h2>
			{joke && <p>{joke}</p>}
		</div>
	);
}
export default App;
