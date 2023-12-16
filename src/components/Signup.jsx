import '../style/Login.css';
import { User, Lock, CheckCircle } from '@phosphor-icons/react';
import makeRequest from '../functions/makeAPIRequest';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');

	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleForm = e => {
		e.preventDefault();
		if (password !== confirmPass) {
			setError('Passwords do not match');
			return;
		}

		const body = new URLSearchParams({
			user: username,
			pass: password,
		});
		const options = {
			method: 'POST',
			body: body,
		};
		makeRequest('register', options, data => {
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
		<form>
			<div className='LoginDiv'>
				<div className='inputContainer'>
					<User className='logo2' />
					<input
						type='text'
						className='border-bottom-input'
						placeholder='Username'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className='inputContainer'>
					<Lock className='logo2' />
					<input
						type='password'
						className='border-bottom-input'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='inputContainer'>
					<CheckCircle className='logo2' />
					<input
						type='password'
						className='border-bottom-input'
						placeholder='Confirm Password'
						value={confirmPass}
						onChange={e => setConfirmPass(e.target.value)}
					/>
				</div>
				<div className='error'>{error}</div>
				<button className='login-button' onClick={handleForm}>
					Sign up
				</button>
			</div>
		</form>
	);
};

export default Signup;
