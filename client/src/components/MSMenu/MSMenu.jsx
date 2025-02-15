import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { ReactComponent as DashboardIcon } from '../../assets/icons/Dashboard.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/Logout.svg';
import NavItem from '../NavItem/NavItem';
import './MSMenu.scss';
import { ReactComponent as BurgerIcon } from '../../assets/icons/Burgericon.svg';
const MSMenu = (props) => {
	return (
		<Menu
			{...props}
			customBurgerIcon={<BurgerIcon style='width:24px;height:24px;' />}
		>
			<div className='sidebar'>
				<div className='logo'>
					<div>
						Scrubs.io
						<span>know your scrubs</span>
					</div>
				</div>
				<div className='items'>
					<NavItem
						icon={<DashboardIcon />}
						text='Your Borrowings'
						to='/m/dashboard'
					/>
					<NavItem icon={<ProfileIcon />} text='Profiles' to='/m/profile' />
				</div>
				<div className='logout'>
					<NavItem icon={<LogoutIcon />} text='Logout' to='/logout' />
				</div>
			</div>
		</Menu>
	);
};

export default MSMenu;
