import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { drawerWidth } from 'constants/site/report';

import Header from 'components/user/report/header';
import Sidebar from 'components/user/report/sidebar';
import { connect } from 'react-redux';

function DashboardLayout({ auth }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (auth?.loading) {
			return;
		}
		if (!(auth.login && auth.user)) {
			navigate('/user/login', { state: { redirectUrl: window.location.pathname }, replace: true });
		}
	}, [auth, navigate, location]);

	if (auth?.loading) {
		return <div>Loading...</div>;
	}

	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			<CssBaseline />
			<Header setMobileOpen={setMobileOpen} />
			<Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

			<Box component='main' sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` }, background: '#E6E9F1' }}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(DashboardLayout);
