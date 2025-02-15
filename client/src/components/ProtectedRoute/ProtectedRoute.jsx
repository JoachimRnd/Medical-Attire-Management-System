import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ permission }) => {
	const { isAuthed, role } = useSelector(({ auth }) => auth);
	console.log('Runniing', role, permission);
	if (!isAuthed) return <Navigate to='/login' />;
	if (role !== permission) return <Navigate to='/denied' />;
	return <Outlet />;
};
export default ProtectedRoute;
