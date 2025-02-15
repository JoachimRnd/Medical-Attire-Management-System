import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { removeTokens } from '../../../redux/features/authSlice/authSlice';

const Logout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(removeTokens());
	}, []);

	return <Navigate to='/' />;
};

export default Logout;
