function makeAPIRequest(link, callback, options = []) {
	const apiLink = 'http://localhost/taskManegment/api/';
	fetch(apiLink + link, options)
		.then(response => response.json())
		.then(response => callback(response))
		.catch(err => {
            console.error(err);
            callback({error: err});
        });
}

export default makeAPIRequest;
