import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await fetch('http://localhost:9000/employee/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			let data = await response.json();

			if (response.status === 200) {
				localStorage.setItem('userId', data.id);
				localStorage.setItem('role', data.profession);
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

const authSlice = createSlice({
	name: 'authSlice',
	initialState: {
		isAuthed: false,
		role: undefined,
		isLoading: false,
		error: undefined,
	},
	reducers: {
		verifyUserInStorage: (state, payload) => {
			const id = localStorage.getItem('userId');
			const role = localStorage.getItem('role');
			if (id && role) {
				state.isAuthed = true;
				state.role = role;
			}
		},
		removeTokens: (state, action) => {
			localStorage.removeItem('userId');
			localStorage.removeItem('role');
			state.isAuthed = false;
			state.role = undefined;
		},
	},
	extraReducers: {
		[loginUser.pending]: (state, _) => {
			state.isLoading = true;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			state.isAuthed = true;
			state.role = payload.profession;
			state.isLoading = false;
		},
		[loginUser.rejected]: (state, { payload }) => {
			state.isAuthed = false;
			state.role = undefined;
			state.isLoading = false;
			state.error = payload.error || payload;
		},
	},
});

export const { verifyUserInStorage, removeTokens } = authSlice.actions;
export default authSlice.reducer;
