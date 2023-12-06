import { User, Lock} from "@phosphor-icons/react";
import '../style/Login.css';
import makeRequest from '../functions/makeAPIRequest';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
 
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleForm = (e) => {
		e.preventDefault();
		const body = new URLSearchParams({
			user: username,
			pass: password,
		});
		const options = {
			method: 'POST',
			body: body,
		};
		makeRequest('htaccessTest', options, data => {
			// console.log(data);
			switch (data.status) {
				case 'Success':
					navigate('/');
					break;
				case 'Failure':
					console.log(data.message);
					setError(data.message.toString());
					break;
				default:
					console.log(data);
					setError('');
					break;
			}
		});
	};
  return (
    <div>
      <form>
        <div className="LoginDiv">
          <div className='inputContainer'>
		  <User className='logo2'/>
					<input
						type='text'
						id='usernameInput'
						className='border-bottom-input'
						placeholder='Username'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className='inputContainer'>
				<Lock className='logo2'/>
					<input
						type='password'
						id='passwordInput'
						className='border-bottom-input'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='error'>{error}</div>
				<button className='login-button' onClick={handleForm}>
					Login
				</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
