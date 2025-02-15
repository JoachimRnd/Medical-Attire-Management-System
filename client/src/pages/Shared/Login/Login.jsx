import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import doctorImg from '../../../assets/images/doctors-5.jpg';
import { CustomButton } from '../../../components';
import Input from '../../../components/Input/Input';
import {
	loginUser,
	setAuth,
} from '../../../redux/features/authSlice/authSlice';
import './Login.scss';

const Login = () => {
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const dispatch = useDispatch();

	const handleLogin = useCallback(() => {
		dispatch(loginUser({ email: emailInput, password: passwordInput }));
	}, [emailInput, passwordInput]);

	const { isAuthed, role, error } = useSelector(({ auth }) => auth);

	// This checks if the user is authenticated.
	if (isAuthed) {
		return role === 'hsm' ? (
			<Navigate to='/h/dashboard' />
		) : (
			<Navigate to='/m/dashboard' />
		);
	}

	return (
		<div className='login-wrapper'>
			<img src={doctorImg} alt='Doctors' />
			<div className='logo'>
				<div>
					Scrubs.io
					<span>know your scrubs</span>
				</div>
			</div>
			<div className='login-card'>
				Please login to access the page
				<Input
					title='Email'
					type='email'
					value={emailInput || ''}
					placeholder='Enter your email'
					onChange={(e) => setEmailInput(e.target.value)}
				/>
				<Input
					title='Password'
					type='password'
					value={passwordInput || ''}
					placeholder='Enter your password'
					onChange={(e) => setPasswordInput(e.target.value)}
				/>
				{error?.errors?.length >= 0 &&
					error.errors.map((err) => (
						<div className='error-message'>
							{err.param}: {err.msg}
						</div>
					))}
				<div className='actions'>
					<CustomButton
						type='primary'
						text='Login'
						onClick={() => handleLogin()}
					/>
				</div>
			</div>
		</div>
	);
};
export default Login;
