import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice/authSlice';
import profileReducer from '../features/employees/profileSlice';
import employeesReducer from '../features/employees/employeesSlice';
import borrowingsReducer from '../features/borrowings/borrowingsSlice';
import scrubsReducer from '../features/scrubSlice/scrubSlice';
import reportsReducer from '../features/reports/getReportsSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
		employees: employeesReducer,
		borrowings: borrowingsReducer,
		scrubs: scrubsReducer,
		reports: reportsReducer,
	},
});
