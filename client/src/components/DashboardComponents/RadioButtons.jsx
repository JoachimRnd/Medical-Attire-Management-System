import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './RadioButtons.scss';

const a11yProps = (index) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};

export default function RadioButtons({ returnValue }) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		switch (newValue) {
			case 0:
				returnValue('overdue');
				break;
			case 1:
				returnValue('borrowed');
				break;
			case 2:
				returnValue('returned');
				break;

			default:
				break;
		}
	};

	return (
		<Box sx={{ width: 'fit-content' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='basic tabs example'
				>
					<Tab className='tab' label='Overdue' {...a11yProps(0)} />
					<Tab className='tab' label='Borrowed' {...a11yProps(1)} />
					<Tab className='tab' label='Returned' {...a11yProps(2)} />
				</Tabs>
			</Box>
		</Box>
	);
}
