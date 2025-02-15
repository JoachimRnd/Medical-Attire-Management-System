import { ReactComponent as DashboardIcon } from '../../assets/icons/Dashboard.svg';
import { ReactComponent as StaffIcon } from '../../assets/icons/Staff.svg';
import { ReactComponent as RoomsIcon } from '../../assets/icons/Room.svg';
import { ReactComponent as ReportsIcon } from '../../assets/icons/Report.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/Logout.svg';
import { NavItem } from '..';
import './Sidebar.scss';

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='logo'>
				<div>
					Scrubs.io
					<span>know your scrubs</span>
				</div>
			</div>
			<div className='items'>
				<NavItem icon={<DashboardIcon />} text='Dashboard' to='/h/dashboard' />
				<NavItem icon={<StaffIcon />} text='Staff Members' to='/h/staff' />
				<NavItem icon={<RoomsIcon />} text='Scrub Rooms' to='/h/rooms' />
				<NavItem icon={<ReportsIcon />} text='Scrub Reports' to='/h/reports' />
				<NavItem icon={<ProfileIcon />} text='My Profile' to='/h/profile' />
			</div>
			<div className='logout'>
				<NavItem icon={<LogoutIcon />} text='Logout' to='/logout' />
			</div>
		</div>
	);
};

export default Sidebar;
