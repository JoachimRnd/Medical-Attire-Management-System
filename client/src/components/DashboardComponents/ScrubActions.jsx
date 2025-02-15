import React, { useState } from 'react';
import { ActionButton, GSModal, SRModal, RModal } from '..';
import './ScrubActions.scss';

function ScrubActions() {
	const [GSModalOpen, setGSModalOpen] = useState(false);
	const [SRModalOpen, setSSModalOpen] = useState(false);
	const [RModalOpen, setRModalOpen] = useState(false);

	return (
		<>
			<div className='buttons'>
				<ActionButton onClick={() => setGSModalOpen(true)} color='blue'>
					Give to a staff member
				</ActionButton>
				<ActionButton onClick={() => setSSModalOpen(true)} color='green'>
					Assign to Room
				</ActionButton>
				<ActionButton onClick={() => setRModalOpen(true)} color='red'>
					Report
				</ActionButton>
			</div>

			{GSModalOpen && <GSModal closeModal={() => setGSModalOpen(false)} />}
			{SRModalOpen && <SRModal closeModal={() => setSSModalOpen(false)} />}
			{RModalOpen && <RModal closeModal={() => setRModalOpen(false)} />}
		</>
	);
}

export default ScrubActions;
