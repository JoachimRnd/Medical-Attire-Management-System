import { useState, useCallback, useEffect } from 'react';
import Modal from './Modal';
import { Divider, Select, TextArea, CustomButton, Input, Spinner } from '..';
import { COLORS } from '../../assets';
import './Modal.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
	cleanScrubs,
	getScrubTypes,
} from '../../redux/features/scrubSlice/scrubSlice';
import { reportScrubsHSH } from '../../redux/features/reports/reportSlice';

const RModal = ({ closeModal }) => {
	const [selectedSize, setSelectedSize] = useState('M');
	const [selectedType, setSelectedType] = useState('Top');
	const [selectedColor, setSelectedColor] = useState('White');
	const [inputGender, setInputGender] = useState('Male');
	const [reportType, setReportType] = useState('Damage');
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState(1);

	const dispatch = useDispatch();

	const { isLoading, data, error } = useSelector(({ scrubs }) => scrubs);

	useEffect(() => {
		dispatch(getScrubTypes());
		return () => {
			dispatch(cleanScrubs());
		};
	}, []);

	const submitData = useCallback(() => {
		const item = data.find(
			(item) =>
				selectedColor.toLowerCase() === item.color &&
				selectedSize === item.size &&
				selectedType.toLowerCase() === item.description &&
				inputGender.toLowerCase() === item.gender
		);
		dispatch(
			reportScrubsHSH({
				report_type: reportType,
				description: description,
				id_scrub_type: item.id_scrub_type,
				quantity: amount,
			})
		);
		closeModal();
	}, [
		data,
		selectedSize,
		selectedType,
		selectedColor,
		inputGender,
		reportType,
		description,
		amount,
	]);

	return (
		<Modal closeModal={closeModal} title='Report Scrubs'>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className='report-inputs'>
						<Select
							title='Scrub Type'
							selectedValue={selectedType}
							options={['Top', 'Bottom', 'Shoes']}
							maxWidth='150px'
							onChange={(e) => setSelectedType(e.target.value)}
						/>
						<Select
							title='Size'
							selectedValue={selectedSize}
							maxWidth='100px'
							options={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
							onChange={(e) => setSelectedSize(e.target.value)}
						/>
						<Select
							title='Color'
							selectedValue={selectedColor}
							maxWidth='100px'
							options={['Red', 'Blue', 'White', 'Green']}
							onChange={(e) => setSelectedColor(e.target.value)}
						/>
						<Select
							title='Gender'
							selectedValue={inputGender}
							maxWidth='100px'
							options={['Male', 'Female']}
							onChange={(e) => setInputGender(e.target.value)}
						/>
						<Input
							type='number'
							title='Amount'
							value={amount}
							maxWidth='80px'
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
					<Divider />
					<Select
						title='Type of report'
						selectedValue={reportType}
						maxWidth='120px'
						options={['Damage']}// ['Damage', 'Missing']}
						onChange={(e) => setReportType(e.target.value)}
					/>
					<TextArea
						title='Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						maxWidth='100%'
					/>
					<div className='actions'>
						<CustomButton
							textColor={COLORS.genericRed}
							type='tertiary'
							text='Cancel'
							onClick={() => closeModal()}
						/>
						<CustomButton
							textColor={COLORS.genericRed}
							type='primary'
							text='Report'
							onClick={() => submitData()}
						/>
					</div>
				</>
			)}
		</Modal>
	);
};

export default RModal;
