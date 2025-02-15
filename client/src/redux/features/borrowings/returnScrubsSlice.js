import { createAsyncThunk } from '@reduxjs/toolkit';

export const returnScrubs = createAsyncThunk(
    'scrubs/returnScrubs',
    async ({ id_history, quantity, completely_returned }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:9000/scrubs/return', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_history,
                    quantity,
                    completely_returned
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
