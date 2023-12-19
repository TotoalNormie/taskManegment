function makeAPIRequest(link, arg2, arg3 = {}) {
    const apiLink = 'http://localhost/taskManegment/api/';

    let options, callback;

    if (typeof arg2 === 'function') {
        callback = arg2;
    } else if ((arg2 !== null && typeof arg2 === 'object' && !Array.isArray(arg2)) && typeof arg3 === 'function') {
        options = arg2;
        callback = arg3;
    } else {
		console.log()
        throw new Error('Invalid parameters provided');
    }

    fetch(apiLink + link, options)
        .then(response => response.json())
        .then(response => callback(response))
        .catch(err => {
            console.error(err);
            callback({ status: 'Failure', message: err });
            fetch(apiLink + link, options)
            .then(response => response.text())
            .then(response => console.log(response));
        });
}

export default makeAPIRequest;
