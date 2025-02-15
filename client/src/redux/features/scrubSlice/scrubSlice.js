import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getScrubTypes = createAsyncThunk(
	'scrubs/getScrubTypes',
	async (_, thunkAPI) => {
		try {
			const response = await fetch('http://localhost:9000/scrubs/types/all', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			let data = await response.json();

			if (response.status === 200) {
				return data;
			} else {
				return thunkAPI.rejectWithValue({ error: data });
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const scrubsSlice = createSlice({
	name: 'scrubsSlice',
	initialState: {
		isLoading: false,
		data: [],
		error: undefined,
	},
	reducers: {
		cleanScrubs: (state, payload) => {
			state.data = [];
		},
	},
	extraReducers: {
		[getScrubTypes.pending]: (state, _) => {
			state.isLoading = true;
		},
		[getScrubTypes.fulfilled]: (state, { payload }) => {
			state.data = payload;
			state.isLoading = false;
		},
		[getScrubTypes.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload.error;
		},
	},
});

export const { cleanScrubs } = scrubsSlice.actions;
export default scrubsSlice.reducer;
