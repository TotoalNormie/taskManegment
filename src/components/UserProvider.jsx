import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from '../functions/cookie';
import makeAPIRequest from '../functions/makeAPIRequest';

const AppContext = createContext();

export const UserProvider = ({ children }) => {
	// Your context provider logic goes here
	const [user, setUser] = useState(false);
	if (getCookie('token') !== null) {
		makeAPIRequest('get-user-info', data => {
			if (data?.valid_session) {
				setUser(data.username);
			}
		});
	}

	return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};

export const useUserContext = () => {
	const contextValue = useContext(AppContext);
	if (contextValue === undefined) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return contextValue;
};