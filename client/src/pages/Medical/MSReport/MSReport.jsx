import { useLocation, useNavigate } from 'react-router-dom';
import MSPageWrapper from '../../../layouts/MSPageWrapper/MSPageWrapper';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/Arrow-Left.svg';
import {
	CustomButton, Input,
	Select,
	TextArea,
} from '../../../components';
import './MSReport.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reportScrubs } from '../../../redux/features/reports/reportSlice';

const MSReport = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const borrowing = location.state;

	const options = [ 'Damaged', 'Missing' ];
	const [ reportType, setReportType ] = useState('Damaged');
	const [ description, setDescription ] = useState('');
	const [ quantity, setQuantity ] = useState(borrowing.amount);

	const handleChange = e => {
		const newValue = e.target.value;
		if (newValue > 0 && newValue <= borrowing.amount) {
			setQuantity(newValue);
		}
	};

	const handleClick = () => {
		dispatch(
			reportScrubs({
				report_type: reportType,
				description: description,
				id_reported_by: parseInt(localStorage.getItem('userId')),
				id_history: borrowing.id_history,
				quantity: quantity
			})
		).then(res => {
			if (res.meta.requestStatus === "fulfilled") {
				window.location.reload();
			}
		});
	};

	return (
		<MSPageWrapper>
			<div className='ms-report'>
				<div className='container'>
					<div className='heading'>
						<div className='arrow-left' onClick={() => navigate(-1)}>
							<ArrowLeft />
						</div>
						<h2>Report {borrowing.type}</h2>
					</div>

					<div className='detailed-info'>
						<Select
							title='Type of report'
							type='report_type'
							options={options}
							selectedValue={reportType}
							onChange={e => setReportType(e.target.value)}
						/>

						<TextArea
							title='Description'
							type='text'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>

						<Input
							title='Amount'
							type='number'
							maxWidth='4.5rem'
							value={quantity}
							onChange={handleChange}
						/>
					</div>

					<div className='return'>
						<div>
							<CustomButton
								textColor='rgb(175, 68, 63)'
								type='tertiary'
								text='CANCEL'
								onClick={() => navigate(-1)}
							/>
							<CustomButton
								type='primary'
								text='Report'
								fontSize='16px'
								onClick={handleClick}
							/>
						</div>
					</div>
				</div>
			</div>
		</MSPageWrapper>
	);
};

export default MSReport;
