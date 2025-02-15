import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBorrowings = createAsyncThunk(
	'borrowings/getBorrowings',
	async (id, thunkAPI) => {
		try {
			const response = await fetch(
				'http://localhost:9000/history/fromEmployee?' +
					new URLSearchParams({
						id: id,
					}),
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			);
			let data = await response.json();

			if (response.status === 200) {
				return { borrowings: data };
			} else {
				return thunkAPI.rejectWithValue({ error: data });
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const borrowingsSlice = createSlice({
	name: 'borrowingsSlice',
	initialState: {
		isLoading: false,
		data: [],
		error: undefined,
	},
	reducers: {
		cleanBorrowings: (state, payload) => {
			state.data = [];
		},
	},
	extraReducers: {
		[getBorrowings.pending]: (state, _) => {
			state.isLoading = true;
		},
		[getBorrowings.fulfilled]: (state, { payload }) => {
			state.data = payload.borrowings;
			state.isLoading = false;
		},
		[getBorrowings.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload.error;
		},
	},
});

export const { cleanBorrowings } = borrowingsSlice.actions;
export default borrowingsSlice.reducer;
