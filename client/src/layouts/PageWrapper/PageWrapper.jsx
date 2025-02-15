import { Sidebar } from '../../components';
import './PageWrapper.scss';

const PageWrapper = ({ children }) => {
	return (
		<div className='page-wrapper'>
			<Sidebar />
			<div className='content-wrapper'>{children}</div>
		</div>
	);
};

export default PageWrapper;
