import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import { getEmployees } from '../../redux/features/employees/employeesSlice';
import { CustomButton, Divider, Input, Select, Spinner } from '..';
import './Modal.scss';
import { COLORS } from '../../assets';
import { getScrubTypes } from '../../redux/features/scrubSlice/scrubSlice';
import { borrowScrubs } from '../../redux/features/borrowings/borrowScrubsSlice';

const generateDateString = (string) => {
	const date = string.split('/');
	return `${date.pop()}-${date.pop()}-${date.pop()}`;
};

const GSModal = ({ closeModal }) => {
	const [selectedEmail, setSelectedEmail] = useState('');
	const [selectedSize, setSelectedSize] = useState('XXS');
	const [selectedType, setSelectedType] = useState('Top');
	const [selectedColor, setSelectedColor] = useState('Red');
	const [amount, setAmount] = useState(0);
	const [returnDate, setReturnDate] = useState('yyyy-mm-dd');

	const dispatch = useDispatch();
	const { data, isLoading, error } = useSelector(({ employees }) => employees);
	const {
		data: scrubsData,
		isLoading: scrubsLoading,
		error: scrubsError,
	} = useSelector(({ scrubs }) => scrubs);

	useEffect(() => {
		dispatch(getScrubTypes());
		if (data.length === 0) {
			dispatch(getEmployees());
		}
	}, []);

	const borrower = useMemo(
		() => data.find((person) => person.email === selectedEmail),
		[data, selectedEmail]
	);

	const submitData = useCallback(() => {
		console.log(borrower);
		const td = new Date();
		const today = td.toISOString().slice(0, 10);
		const nw = new Date(td.getFullYear(), td.getMonth(), td.getDate() + 7)
			.toISOString()
			.slice(0, 10);
		const dateToReturn = returnDate === 'yyyy-mm-dd' ? nw : returnDate;
		const item = scrubsData.find(
			(item) =>
				selectedColor.toLowerCase() === item.color &&
				selectedSize === item.size &&
				item.description === selectedType.toLowerCase() &&
				borrower.gender === item.gender
		);
		dispatch(
			borrowScrubs({
				id_scrub_type: item?.id_scrub_type || 1,
				quantity: amount || 1,
				borrowed_date: today,
				id_employee: borrower.id_employee,
				return_date: dateToReturn,
			})
		);
		closeModal();
	}, [borrower, amount, selectedSize, selectedType, returnDate, scrubsData]);

	return (
		<Modal closeModal={closeModal} title='Give Scrubs to staff member'>
			<Input
				title='Email'
				maxWidth={'100%'}
				placeholder='Start writing their email'
				list='emails'
				onChange={(e) => setSelectedEmail(e.target.value)}
			/>
			<datalist id='emails'>
				{data &&
					data.map((emp) => <option value={emp.email}>{emp.email}</option>)}
			</datalist>

			{borrower && scrubsData && (
				<>
					<Divider />
					<div className='borrower-info-inputs'>
						<Input
							title='Full Name'
							type='text'
							value={borrower.name}
							style={{
								flex: 1,
							}}
						/>
						<Input
							title='Profession'
							type='text'
							value={borrower.profession}
							maxWidth='100px'
						/>
						<Input
							title='Gender'
							type='text'
							value={borrower.gender}
							maxWidth='100px'
						/>
					</div>
					<Divider />
					<div className='borrow-item'>
						<div className='row-1'>
							<Select
								title='Scrub Type'
								selectedValue={selectedType}
								options={['Top', 'Bottom', 'Shoes', 'Gloves']}
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
						</div>
						<div className='row-2'>
							<Input
								type='number'
								title='Amount'
								value={amount}
								maxWidth='80px'
								onChange={(e) => setAmount(e.target.value)}
							/>
							<Input
								type='date'
								title='Return by'
								value={returnDate}
								onChange={(e) => setReturnDate(e.target.value)}
							/>
						</div>
					</div>
					<Divider />
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
							text='Give'
							onClick={() => submitData()}
						/>
					</div>
				</>
			)}
		</Modal>
	);
};

export default GSModal;
