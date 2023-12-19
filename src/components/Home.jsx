import '../style/Home.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from './UserProvider';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(()=> {
		console.log(user);
		if(localStorage.getItem('user')) navigate('/');
	}, [user]);
	return (
		<div>
			<div className='LoginDiv'>
				<div className='title'>JustToDoIt!</div>
				<Link to='/login'>
					<button className='plogin-button'>Login</button>{' '}
				</Link>
				<Link to='/signup'>
					<button className='plogin-button'>Sign Up</button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
