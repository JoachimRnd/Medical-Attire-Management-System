import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getEmployees = createAsyncThunk(
	'employees/getEmployees',
	async (_, thunkAPI) => {
		try {
			const response = await fetch('http://localhost:9000/employee/all', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			let data = await response.json();

			if (response.status === 200) {
				return { employees: data };
			} else {
				return thunkAPI.rejectWithValue({ error: data });
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const employeeSlice = createSlice({
	name: 'employeeSlice',
	initialState: {
		isLoading: false,
		data: [],
		error: undefined,
	},
	reducers: {
		cleanEmployees: (state, payload) => {
			state.data = [];
		},
	},
	extraReducers: {
		[getEmployees.pending]: (state, _) => {
			state.isLoading = true;
		},
		[getEmployees.fulfilled]: (state, { payload }) => {
			state.data = payload.employees;
			state.isLoading = false;
		},
		[getEmployees.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload.error;
		},
	},
});

export const { cleanEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
