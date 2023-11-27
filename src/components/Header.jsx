import '../style/Header.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
const Header = () => {
	return (
		<header>
			<Link to='/' className='logo'>
                <img src={logo} alt="logo" />
            </Link>
			<div className='title'>JustToDoIt!</div>
		</header>
	);
};

export default Header;
