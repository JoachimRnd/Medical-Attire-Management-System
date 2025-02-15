import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	CustomTable,
	DetailsLink,
	Spinner,
	Notification,
	Notifications,
} from '../../../components';
import { PageWrapper, Card } from '../../../layouts';
import './HSDashboard.scss';
import ScrubActions from '../../../components/DashboardComponents/ScrubActions';
import RadioButtons from '../../../components/DashboardComponents/RadioButtons';
import {
	getEmployees,
	cleanEmployees,
} from '../../../redux/features/employees/employeesSlice';

const HSDashboard = () => {
	const dispatch = useDispatch();
	const { isLoading, data, error } = useSelector(({ employees }) => employees);

	useEffect(() => {
		dispatch(getEmployees());
		return () => {
			dispatch(cleanEmployees());
		};
	}, []);

	const headers = [
		{
			id: 'name',
			label: 'Name',
			minWidth: 150,
		},
		{
			id: 'email',
			label: 'Email',
			minWidth: 200,
		},
		{
			id: 'profession',
			label: 'Profession',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'action',
			minWidth: 170,
			align: 'right',
		},
	];

	return (
		<PageWrapper>
			<h2>Dashboard</h2>
			<div className='cards'>
				<div className='col five'>
					<div className='row one'>
						<div className='col two'>
							<Card title='Scrub Actions'>
								<ScrubActions />
							</Card>
						</div>
						<div className='col three'>
							<Card title='General Scrub Information'>Accessible in next version</Card>
						</div>
					</div>
					<div className='row two'>
						<Card title='Staff Member Information'>
							{isLoading ? (
								<Spinner />
							) : (
								<CustomTable
									rows={data
										.filter((r) => r.profession.toUpperCase() === 'MSM')
										.map((r) => {
											return {
												name: r.name,
												email: r.email,
												profession: r.profession,
												action: (
													<DetailsLink
														path='/h/staff/details'
														state={{ employee: r }}
													/>
												),
											};
										})}
									columns={headers}
								/>
							)}
						</Card>
					</div>
				</div>
				<div className='col two'>
					<div className='row five'>
						<Card title='Recent Activites'>
							<Notifications />
						</Card>
					</div>
					<div className='row four'>
						<Card title='Scrub Rooms'>Accessible in next version</Card>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};
export default HSDashboard;
