import './ActionButton.scss';

const ActionButton = ({ children, color, onClick }) => {
	return (
		<button className={`actn-btn ${color}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default ActionButton;
