import { createAsyncThunk } from '@reduxjs/toolkit';

export const borrowScrubs = createAsyncThunk(
	'scrubs/borrowScrubs',
	async (
		{ id_scrub_type, quantity, id_employee, amount, borrowed_date, return_date },
		thunkAPI
	) => {
		try {
			const id = +localStorage.getItem('userId');
			const response = await fetch('http://localhost:9000/scrubs/borrow', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id_scrub_type,
					quantity,
					borrowed_date,
					return_date,
					id_employee,
					id_given_by: id,
				}),
			});
			let data = await response.json();

			if (response.status === 200) {
				return { ...data };
			} else {
				return thunkAPI.rejectWithValue({ error: data });
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);
