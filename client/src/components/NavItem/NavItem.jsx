import { Link, useLocation } from 'react-router-dom';
import './NavItem.scss';

const NavItem = ({ icon, text, to }) => {
	const { pathname } = useLocation();
	return (
		<Link
			className={`nav-item ${pathname.includes(to) ? 'active' : ''}`}
			to={to}
		>
			{icon}
			{text}
		</Link>
	);
};

export default NavItem;
