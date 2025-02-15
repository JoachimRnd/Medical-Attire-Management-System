import Modal from './Modal';
import './Modal.scss';

const SRModal = ({ closeModal }) => {
	return <Modal closeModal={closeModal} title='Assign Scrubs to Room'></Modal>;
};

export default SRModal;
