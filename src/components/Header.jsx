import '../style/Header.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
	const location = useLocation();
	if (location.pathname === '/landing') return null;
	return (
		<header>
			<Link to='/' className='logo'>
				<img src={logo} alt='logo' />
			</Link>
			<div className='title'>JustToDoIt!</div>
		</header>
	);
};

export default Header;
