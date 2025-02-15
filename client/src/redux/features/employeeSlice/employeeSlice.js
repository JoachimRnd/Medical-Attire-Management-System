import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerMember = createAsyncThunk(
    'h/staff',
    async ({ email, name, profession, gender }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:9000/employee', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    profession,
                    gender,
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