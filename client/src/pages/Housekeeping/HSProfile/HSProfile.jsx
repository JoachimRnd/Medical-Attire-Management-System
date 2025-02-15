import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageWrapper, Card } from '../../../layouts';
import { DetailedInformation, Spinner } from '../../../components';
import {
	cleanProfileData,
	getProfile,
} from '../../../redux/features/employees/profileSlice';

const HSProfile = () => {
	const dispatch = useDispatch();

	const { data, isLoading, error } = useSelector(({ profile }) => profile);

	useEffect(() => {
		dispatch(getProfile());
		return () => {
			dispatch(cleanProfileData());
		};
	}, []);

	return (
		<PageWrapper>
			<h2>Profile</h2>
			<Card>
				{isLoading ? (
					<Spinner />
				) : (
					<DetailedInformation
						title={data.name}
						items={[
							{ attr: 'Email', val: data.email },
							{ attr: 'Gender', val: data.gender },
							{ attr: 'Professiion', val: 'Housekeeping' },
							{ attr: 'Hospital', val: data.hospital },
						]}
					/>
				)}
			</Card>
		</PageWrapper>
	);
};
export default HSProfile;
