import '../style/Header.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CaretDown, SignOut } from '@phosphor-icons/react';
import { eraseCookie } from '../functions/cookie';
import { useUserContext } from './UserProvider';



const Header = () => {
	const { user } = useUserContext();
	const location = useLocation();
	const [drop, setDrop] = useState(false);
	const [test, setTest] = useState(false);
	if (location.pathname === '/landing') return null;

	const handleClick = () => {
		setDrop(!drop);
	};

	const logout = () => {
		eraseCookie('token');
	};

	return (
		<header>
			<Link to='/' className='logo'>
				<img src={logo} alt='logo' />
			</Link>
			<Link to='/' className='title-header'>
				JustToDoIt!
			</Link>
			{location.pathname !== '/login' && location.pathname !== '/signup' && (
				<div className='user'>
					<div className='avatar'>{user}</div>
					<button className={`drop ${drop ? 'flipped' : ''}`} onClick={handleClick}>
						<CaretDown />
					</button>
					<button className={`logout ${drop ? 'stretched' : ''}`}>
						<SignOut /> Logout
					</button>
				</div>
			)}
		</header>
	);
};

export default Header;
