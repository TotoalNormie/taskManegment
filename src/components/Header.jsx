import '../style/Header.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Header = () => {
	const location = useLocation();
	const [drop, setDrop] = useState(false);
	const [test, setTest] = useState(false);
	if (location.pathname === '/landing') return null;
	use

	const handleClick = () => {
		setDrop(!drop);
	};
	return (
		<header>
			<Link to='/' className='logo'>
				<img src={logo} alt='logo' />
			</Link>
			<Link to='/' className='title'>
				JustToDoIt!
			</Link>
			<div className='user'>
				<div className='avatar'>RL</div>
				<button className={`drop ${drop ? 'flipped' : ''}`} onClick={handleClick}>
					<FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
				</button>
				<button className={`logout ${drop ? 'stretched' : ''}`}>Logout</button>
			</div>
		</header>
	);
};

export default Header;
