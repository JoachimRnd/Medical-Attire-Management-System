import './Notifications.scss';
import { Notification } from '..';

const Notifications = () => {
	return (
		<div className='notification-list'>
			<Notification
				author='Carmen Diaz'
				timestamp='12/8/2021 - 14:45'
				title='Scrubs returned'
			/>
			<Notification
				author='Test User One'
				timestamp='12/8/2021 - 11:12'
				title='Scrubs reported as damaged'
			/>
			<Notification
				author='Random User'
				timestamp='12/8/2021 - 10:45'
				title='3 Scrubs Lost'
			/>
			<Notification
				author='Random User 2'
				timestamp='12/8/2021 - 9:45'
				title='Scrubs returned'
			/>
			<Notification
				author='Random User'
				timestamp='12/8/2021 - 9:42'
				title='12 Scrubs Lost'
			/>
		</div>
	);
};
export default Notifications;
