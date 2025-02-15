import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ErrorPageWrapper } from '../../../layouts';

const NotFound = () => {
	const [timeLeft, setTimeLeft] = useState(3);

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);
	}, [timeLeft]);

	return timeLeft === 0 ? (
		<Navigate to='/login' />
	) : (
		<ErrorPageWrapper>
			<h1>Page not found</h1>
			<div>
				Page you are trying to visit does not exist. You will be redirected in{' '}
				{timeLeft} seconds.
			</div>
			<Link to='/login'>Redirect now</Link>
		</ErrorPageWrapper>
	);
};
export default NotFound;
