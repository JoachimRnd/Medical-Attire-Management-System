import './Modal.scss';

const Modal = ({ title, closeModal, children }) => (
	<>
		<div className='body-blackout-style' onClick={() => closeModal()}></div>
		<div className='custom-modal'>
			<h2>{title}</h2>
			{children}
		</div>
	</>
);

export default Modal;
