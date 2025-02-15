import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DetailedInformation, Spinner } from '../../../components';
import MSPageWrapper from '../../../layouts/MSPageWrapper/MSPageWrapper';
import {
	cleanProfileData,
	getProfile,
} from '../../../redux/features/employees/profileSlice';
import './MSProfile.scss';

const MSProfile = () => {
	const dispatch = useDispatch();
	const { data, isLoading, error } = useSelector(({ profile }) => profile);

	useEffect(() => {
		dispatch(getProfile());
		return () => {
			dispatch(cleanProfileData());
		};
	}, []);
	return (
		<MSPageWrapper>
			<div className='ms-scrubs-details'>
				<div className='container'>
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<h2>{data.name}</h2>
							<DetailedInformation
								items={[
									{ attr: 'Email', val: data.email },
									{ attr: 'Gender', val: data.gender },
									{ attr: 'Professiion', val: 'Housekeeping' },
									{ attr: 'Hospital', val: data.hospital },
								]}
							/>
						</>
					)}
				</div>
			</div>
		</MSPageWrapper>
	);
};
export default MSProfile;
