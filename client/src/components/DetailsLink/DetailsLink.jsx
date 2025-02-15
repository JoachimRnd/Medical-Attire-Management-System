import { Link } from 'react-router-dom';
import './DetailsLink.scss';

const DetailsLink = ({ path, state = '', children, style = true }) => {
	return (
		<Link to={path} state={state} className={ style ? 'details-link' : 'basics' }>
			{children || 'Details'}
		</Link>
	);
};

export default DetailsLink;
