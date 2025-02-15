import './Divider.scss';
const Divider = ({ type = 'horizontal' }) => (
	<div className={`sc-divider ${type}`}></div>
);

export default Divider;
