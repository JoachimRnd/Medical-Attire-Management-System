import './ErrorPageWrapper.scss';

const ErrorPageWrapper = ({ children }) => {
	return (
		<div className='err-page-wrapper'>
			<div className='content'>{children}</div>
		</div>
	);
};

export default ErrorPageWrapper;
