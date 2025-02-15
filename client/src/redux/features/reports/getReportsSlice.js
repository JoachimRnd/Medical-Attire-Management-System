import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getReports = createAsyncThunk(
    'reports/getReports',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:9000/reports/all', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            let data = await response.json();

            if (response.status === 200) {
                return { reports: data };
            } else {
                return thunkAPI.rejectWithValue({ error: data });
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const reportSlice = createSlice({
    name: 'reportSlice',
    initialState: {
        isLoading: false,
        data: [],
        error: undefined,
    },
    reducers: {
        cleanReports: (state, payload) => {
            state.data = [];
        },
    },
    extraReducers: {
        [getReports.pending]: (state, _) => {
            state.isLoading = true;
        },
        [getReports.fulfilled]: (state, { payload }) => {
            state.data = payload.reports;
            state.isLoading = false;
        },
        [getReports.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload.error;
        },
    },
});

export const { cleanReports } = reportSlice.actions;
export default reportSlice.reducer;
