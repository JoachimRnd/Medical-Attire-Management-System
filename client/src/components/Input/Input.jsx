import './Input.scss';

const Input = (props) => {
	const {
		title,
		placeholder,
		value,
		onChange,
		type,
		errorMessage,
		maxWidth = 320,
	} = props;
	return (
		<div className='custom-input' style={{ maxWidth: maxWidth }} {...props}>
			{title && <div className='input-title'>{title}</div>}
			<input
				{...props}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{errorMessage && <div className='error'>{errorMessage}</div>}
		</div>
	);
};

export default Input;
