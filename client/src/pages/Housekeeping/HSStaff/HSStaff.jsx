import {
	CustomButton,
	CustomTable,
	DetailsLink,
	Spinner,
} from '../../../components';
import { PageWrapper, Card } from '../../../layouts';
import NewMember from '../../../components/NewMember/NewMember';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cleanEmployees,
	getEmployees,
} from '../../../redux/features/employees/employeesSlice';
import './HSStaff.scss';

const HSStaff = () => {
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
			<div className='header-container'>
				<h2>Staff Members</h2>
				<NewMember />
			</div>
			<Card title=''>
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
		</PageWrapper>
	);
};
export default HSStaff;
