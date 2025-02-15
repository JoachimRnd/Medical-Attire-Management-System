import './Select.scss';

const Select = ({
	name,
	selectedValue,
	placeholder,
	options,
	onChange,
	maxWidth,
	title,
}) => {
	return (
		<div className='custom-select' style={{ maxWidth: maxWidth }}>
			{title && <div className='input-title'>{title}</div>}
			<select
				name={name}
				id={name}
				value={selectedValue}
				placeholder={placeholder}
				onChange={onChange}
			>
				{options.map((opt) => (
					<option value={opt}>{opt}</option>
				))}
			</select>
		</div>
	);
};

export default Select;
