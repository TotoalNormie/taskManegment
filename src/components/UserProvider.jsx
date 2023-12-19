import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from '../functions/cookie';
import makeAPIRequest from '../functions/makeAPIRequest';
import encodeHTML from '../functions/encodeHTML';

const AppContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUserFromLocalStorage = async () => {
			const storedUser = localStorage.getItem('user');
			console.log('works', storedUser);

			if (storedUser) {
				console.log('stored');
				setUser(storedUser);
			} else if (localStorage.getItem('token') && !localStorage.getItem('user')) {
				console.log('token');

				const token = localStorage.getItem('token');

				makeAPIRequest('get-user-info', { headers: { Authorization: token } }, data => {
					if (data.data?.valid_session) {
						const username = encodeHTML(data.data?.username);
						setUser(username);
						localStorage.setItem('user', username);
					}
				});
			} else {
				console.log('false');
				setUser(false);
			}
		};

		fetchUserFromLocalStorage();
	}, []);

	return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};

export const useUserContext = () => {
	const contextValue = useContext(AppContext);
	if (contextValue === undefined) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return contextValue;
};
