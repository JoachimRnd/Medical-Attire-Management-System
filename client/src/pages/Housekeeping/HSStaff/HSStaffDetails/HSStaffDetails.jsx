import {
	CustomButton,
	CustomTable,
	DetailsLink,
	Status,
} from '../../../../components';
import { PageWrapper, Card } from '../../../../layouts';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailedInformation from '../../../../components/DetailedInformation/DetailedInformation';
import './HSStaffDetails.scss';

const HSStaffDetails = () => {
	const [borrowings, setBorrowings] = useState([]);

	const location = useLocation();
	const { employee } = location.state;

	const headers = [
		{
			id: 'type',
			label: 'Scrub Type',
			minWidth: 120,
		},
		{
			id: 'size',
			label: 'Size',
			minWidth: 100,
		},
		{
			id: 'color',
			label: 'Color',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'amount',
			label: 'Total items',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'borrowDate',
			label: 'Borrowed on',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'returnBy',
			label: 'Return by',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'status',
			label: 'status',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'action',
			minWidth: 170,
			align: 'right',
		},
	];

	useEffect(() => {
		const fetching = async () =>
			await fetch(
				`http://localhost:9000/history/fromEmployee?id=${employee.id_employee}`
			);
		if (borrowings.length === 0) {
			fetching()
				.then((res) => res.json())
				.then(
					(res) => {
						res.map((r) => {
							setBorrowings((prev) => [
								...prev,
								{
									type: r.type,
									size: r.size,
									color: r.color,
									amount: r.amount,
									borrowDate: r.borrowDate,
									returnBy: r.returnBy,
									status: <Status type={r.status} />,
									action: (
										<DetailsLink
											path='/h/staff/details/borrowing'
											state={{ borrowing: r, employee: employee }}
										/>
									),
								},
							]);
						});
					},
					(error) => {
						console.log('An error occurred while fetching: ' + error);
					}
				);
		}
	}, [borrowings]);

	return (
		<PageWrapper>
			<h2>
				<DetailsLink
					path='/h/staff'
					style={false}
				>Staff Members</DetailsLink> > {employee.name}
			</h2>
			<Card title=''>
				<div className='staff-details-header-container'>
					<DetailedInformation
						title='General Information'
						items={[
							{ attr: 'Full Name', val: employee.name },
							{ attr: 'Email', val: employee.email },
							{ attr: 'Profession', val: employee.profession },
							{ attr: 'Gender', val: employee.gender },
						]}
					/>
					<CustomButton type='primary' text='Manage Member' />
				</div>
				<div style={{ flex: 1, position: 'relative' }}>
					<CustomTable rows={borrowings} columns={headers} />
				</div>
			</Card>
		</PageWrapper>
	);
};
export default HSStaffDetails;
