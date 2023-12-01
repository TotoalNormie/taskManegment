import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Sidebar.css';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
	const location = useLocation();
	if (
		location.pathname === '/login' ||
		location.pathname === '/signup' ||
		location.pathname === '/landing'
	)
		return null;

	return (
		<nav>
			<Link to='/test'>testing</Link>
		</nav>
	);
};

export default Sidebar;
