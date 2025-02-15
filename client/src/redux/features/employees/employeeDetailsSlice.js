import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getEmployeeDetails = createAsyncThunk(
	'profile/getEmployeeDetails',
	async (id, thunkAPI) => {
		try {
			const response = await fetch(
				'http://localhost:9000/employee/withBorrowings?' +
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
				return { ...data[0] };
			} else {
				return thunkAPI.rejectWithValue({ error: data });
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const employeeDetailsSlice = createSlice({
	name: 'employeeDetailsSlice',
	initialState: {
		isLoading: false,
		data: {
			name: undefined,
			email: undefined,
			gender: undefined,
			hospital: undefined,
			profession: undefined,
			borrowings: [],
		},
		error: undefined,
	},
	reducers: {
		cleanEmployeeDetails: (state, payload) => {
			state.data = {
				name: undefined,
				email: undefined,
				gender: undefined,
				hospital: undefined,
				profession: undefined,
				borrowings: [],
			};
		},
	},
	extraReducers: {
		[getProfile.pending]: (state, _) => {
			state.isLoading = true;
		},
		[getProfile.fulfilled]: (state, { payload }) => {
			state.data = {
				//todo
			};
			state.isLoading = false;
		},
		[getProfile.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload.error;
		},
	},
});

export const { cleanEmployeeDetails } = employeeDetailsSlice.actions;
export default employeeDetailsSlice.reducer;
