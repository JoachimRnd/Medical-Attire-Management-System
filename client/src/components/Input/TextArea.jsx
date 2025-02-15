import './Input.scss';

const TextArea = (props) => {
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
			<textarea
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

export default TextArea;
