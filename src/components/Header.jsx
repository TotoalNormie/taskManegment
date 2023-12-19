import '../style/Header.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CaretDown, SignOut } from '@phosphor-icons/react';
import { useUserContext } from './UserProvider';
import formatUser from '../functions/formatUser';



const Header = () => {
	const { user, setUser } = useUserContext();
	const location = useLocation();
	const [drop, setDrop] = useState(false);
	
	console.log('user', user);
	
	const navigate = useNavigate();
	if (location.pathname === '/home') return null;
	const formatedUser = formatUser(user);

	const handleClick = () => {
		setDrop(!drop);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('expire_time');
		localStorage.removeItem('user');
		setDrop(false);
		setUser(false);
		navigate('/home');
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
					<div className='avatar'>{formatedUser}</div>
					<button className={`drop ${drop ? 'flipped' : ''}`} onClick={handleClick}>
						<CaretDown />
					</button>
					<button onClick={logout} className={`logout ${drop ? 'stretched' : ''}`}>
						<SignOut /> Logout
					</button>
				</div>
			)}
		</header>
	);
};

export default Header;
