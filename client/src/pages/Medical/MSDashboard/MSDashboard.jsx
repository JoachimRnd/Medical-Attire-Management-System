import React, { useState, useEffect, useMemo } from 'react';
import RadioButtons from '../../../components/DashboardComponents/RadioButtons';
import { CustomTable, DetailsLink, Spinner } from '../../../components';
import MSPageWrapper from '../../../layouts/MSPageWrapper/MSPageWrapper';
import './MSDashboard.scss';
import { ReactComponent as ArrowRight } from '../../../assets/icons/Arrow-Right.svg';
import {
	cleanBorrowings,
	getBorrowings,
} from '../../../redux/features/borrowings/borrowingsSlice';
import { useDispatch, useSelector } from 'react-redux';

const MSDashboard = () => {
	const [viewOption, setViewOption] = useState('overdue');
	const headers = [
		{
			id: 'type',
			label: 'Type',
			minWidth: 150,
		},
		{
			id: 'items',
			label: 'Items',
			minWidth: 100,
		},
		{
			id: 'action',
			minWidth: 50,
			align: 'right',
		},
	];

	const dispatch = useDispatch();
	const { isLoading, data, error } = useSelector(
		({ borrowings }) => borrowings
	);

	useEffect(() => {
		dispatch(getBorrowings(localStorage.getItem('userId')));
		return () => {
			dispatch(cleanBorrowings());
		};
	}, []);

	return (
		<MSPageWrapper>
			<div className='ms-your-borrowings'>
				<div className='container'>
					<div className='dh-title'>Your Borrowings</div>
					<div className='banner'>
						<RadioButtons returnValue={setViewOption} />
					</div>
					<div className='ms-table'>
						{isLoading ? (
							<Spinner />
						) : data.filter((r) => r.status == viewOption).length >= 1 ? (
							<CustomTable
								columns={headers}
								rows={data
									.filter((r) => r.status == viewOption)
									.map((r) => {
										return {
											type: r.type,
											items: r.amount,
											action: (
												<DetailsLink
													path='/m/dashboard/borrowing'
													state={{ borrowing: r }}
												>
													<ArrowRight />
												</DetailsLink>
											),
										};
									})}
							/>
						) : (
							<div>No data available</div>
						)}
					</div>
				</div>
			</div>
		</MSPageWrapper>
	);
};

export default MSDashboard;
