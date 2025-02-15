import './Card.scss';

const Card = ({ children, title, class_name = '' }) => {
	return (
		<div className='card'>
			<h2>{title}</h2>
			<div className={'card-content ' + class_name}>{children}</div>
		</div>
	);
};

export default Card;
