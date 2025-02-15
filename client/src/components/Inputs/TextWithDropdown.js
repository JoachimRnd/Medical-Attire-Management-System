import React from 'react';
import './inputs.css';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { alpha, styled } from '@mui/material/styles';

/*
Using example
 <TextWithDropdown type="email" title="Email"  placeHolder='Enter their email..'></TextWithDropdown>
*/

const TextWithDropdown = (props) => {
	const HSMEmails = [
		{ email: 'example1@google.com' },
		{ email: 'example2@google.com' },
		{ email: 'example3@google.com' },
		,
	];

	const CssTextField = styled(TextField)({
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'rgb(151, 176, 224)',
			},
			'&:hover fieldset': {
				borderColor: 'rgb(100, 137, 209)',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'rgb(62, 102, 177)',
			},
			'& input': {
				background: 'rgb(242, 245, 251)',
				color: 'rgb(151, 176, 224)',
			},
		},
	});

	return (
		<div>
			<p className='type'>{props.title}</p>
			<Stack spacing={1} sx={{ width: 500 }}>
				<Autocomplete
					id='auto-complete'
					autoComplete
					includeInputInList
					options={HSMEmails.map((option) => option.email)}
					renderInput={(params) => (
						<CssTextField
							{...params}
							size='small'
							id='custom-css-outlined-input'
							placeholder={props.placeHolder}
						/>
					)}
				/>
			</Stack>
		</div>
	);
};

export default TextWithDropdown;
