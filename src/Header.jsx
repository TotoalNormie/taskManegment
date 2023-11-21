import '../style/Header.css';
import logo from '../assets/logo.png';
const Header = () => {
	return (
		<header>
			<div className='logo'>
                <img src={logo} alt="logo" />
            </div>
			<div className='title'>JustToDoIt!</div>
		</header>
	);
};

export default Header;