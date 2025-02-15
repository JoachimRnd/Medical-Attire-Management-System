import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProfile = createAsyncThunk(
	'employees/getProfile',
	async (_, thunkAPI) => {
		try {
			const response = await fetch(
				'http://localhost:9000/employee?' +
					new URLSearchParams({
						id: localStorage.getItem('userId'),
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

const profileSlice = createSlice({
	name: 'profileSlice',
	initialState: {
		isLoading: false,
		data: {
			name: undefined,
			email: undefined,
			gender: undefined,
			hospital: undefined,
			profession: undefined,
		},
		error: undefined,
	},
	reducers: {
		cleanProfileData: (state, payload) => {
			state.data = {
				name: undefined,
				email: undefined,
				gender: undefined,
				hospital: undefined,
				profession: undefined,
			};
		},
	},
	extraReducers: {
		[getProfile.pending]: (state, _) => {
			state.isLoading = true;
		},
		[getProfile.fulfilled]: (
			state,
			{ payload: { name, email, gender, profession } }
		) => {
			state.data = {
				name,
				email,
				gender,
				hospital: 'Nice Hospital',
				profession,
			};
			state.isLoading = false;
		},
		[getProfile.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload.error;
		},
	},
});

export const { cleanProfileData } = profileSlice.actions;
export default profileSlice.reducer;
