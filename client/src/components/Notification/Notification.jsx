import React, { useState } from 'react';
import './Notification.scss';

const Notification = ({ author, timestamp, title }) => {
	const [seen, setSeen] = useState(false);
	return (
		<div className='box' onClick={() => setSeen(!seen)}>
			<div className='dot'>{!seen && <div />}</div>
			<div className='information'>
				<div className='top'>
					<div className='author'>{author}</div>
					<div className='ts'>{timestamp}</div>
				</div>
				<div className='bottom'>{title}</div>
			</div>
		</div>
	);
};

export default Notification;
