import React, { useState, useEffect } from "react";
function App() {
    const [joke, setJoke] = useState([""]);
    useEffect(() => {
        fetch("http://localhost/taskManegment/api/test.php")
            .then((response) => response.text())
            .then((response) => {
                console.log(response);
				setJoke(response);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <h2>Joke of the day:</h2>
            {joke && <p>{joke}</p>}
        </div>
    );
}
export default App;
