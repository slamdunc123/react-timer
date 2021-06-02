import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(34,153,249,1)',
		boxShadow: '5px 5px 10px #aaaaaa',
		textAlign: 'right',
	},
};

const TimerModal = ({ isModalOpen, modalBody }) => {
	return (
		<Modal isOpen={isModalOpen} style={customStyles}>
			{modalBody}
		</Modal>
	);
};
export default TimerModal;
