import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ErrorPageWrapper } from '../../../layouts';

const AccessDenied = () => {
	const [timeLeft, setTimeLeft] = useState(3);

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);
	}, [timeLeft]);

	return timeLeft === 0 ? (
		<Navigate to='/login'></Navigate>
	) : (
		<ErrorPageWrapper>
			<h1>Not Authorized</h1>
			<div>
				You are not authorized to view this page. You will be redirected in{' '}
				{timeLeft} seconds.
			</div>
			<Link to='/login'>Redirect now</Link>
		</ErrorPageWrapper>
	);
};
export default AccessDenied;
