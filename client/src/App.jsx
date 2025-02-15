import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Login,
	HSDashboard,
	MSDashboard,
	AccessDenied,
	NotFound,
	MSProfile,
	HSStaff,
	HSProfile,
	HSRooms,
	HSReports,
	Logout,
	HSStaffDetails,
	HSStaffDetailsBorrowing,
	MSBorrowingDetails,
	MSReport,
} from './pages';
import { ProtectedRoute } from './components';
import './App.scss';
import { verifyUserInStorage } from './redux/features/authSlice/authSlice';

const App = () => {
	const dispatch = useDispatch();

	const { isAuthed, role } = useSelector(({ auth }) => auth);
	useEffect(() => {
		dispatch(verifyUserInStorage());
	}, [isAuthed, role]);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Navigate to='/login' />} />
				<Route path='login' element={<Login />} />

				<Route path='logout' element={<Logout />} />
				<Route path='denied' element={<AccessDenied />} />

				<Route exact path='h' element={<ProtectedRoute permission='hsm' />}>
					<Route path='' element={<Navigate to='dashboard' />} />
					<Route path='dashboard' element={<HSDashboard />} />
					<Route path='staff' element={<HSStaff />} />
					<Route path='staff/details' element={<HSStaffDetails />} />
					<Route
						path='staff/details/borrowing'
						element={<HSStaffDetailsBorrowing />}
					/>
					<Route path='rooms' element={<HSRooms />} />
					<Route path='reports' element={<HSReports />} />
					<Route path='profile' element={<HSProfile />} />
				</Route>

				<Route exact path='m' element={<ProtectedRoute permission='msm' />}>
					<Route path='' element={<Navigate to='dashboard' />} />
					<Route path='dashboard' element={<MSDashboard />} />
					<Route path='dashboard/borrowing' element={<MSBorrowingDetails />} />
					<Route path='dashboard/borrowing/report' element={<MSReport />} />
					<Route path='profile' element={<MSProfile />} />
				</Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
