import { PageWrapper, Card } from '../../../layouts';
import { CustomTable, DetailsLink, Spinner } from '../../../components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanReports, getReports } from "../../../redux/features/reports/getReportsSlice";

const HSReports = () => {
	const dispatch = useDispatch();
	const { isLoading, data, error } = useSelector(({ reports }) => reports);
	console.log(data);

	useEffect(() => {
		dispatch(getReports());
		return () => {
			dispatch(cleanReports());
		};
	}, []);

	const headers = [
		{
			id: 'report_type',
			label: 'Report',
			minWidth: 100,
		},
		{
			id: 'message',
			label: 'message',
			minWidth: 100,
		},
		{
			id: 'name',
			label: 'Reported By',
			minWidth: 100,
		},
		{
			id: 'description',
			label: 'Scrub',
			minWidth: 100,
		},
		{
			id: 'color',
			label: 'Color',
			minWidth: 100,
		},
		{
			id: 'size',
			label: 'Size',
			minWidth: 100,
		},
		{
			id: 'gender',
			label: 'Gender',
			minWidth: 100,
		},
	];

	return (
		<PageWrapper>
			<h2>Scrub Reports</h2>
			<Card title=''>
				{isLoading ? (
					<Spinner />
				) : (
					<CustomTable
						rows={data}
						columns={headers}
					/>
				)}
			</Card>
		</PageWrapper>
	);
};
export default HSReports;
