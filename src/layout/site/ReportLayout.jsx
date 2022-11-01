import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import { Outlet } from 'react-router-dom';

import { drawerWidth } from 'constants/site/report';

import Header from 'components/user/report/header';
import Sidebar from 'components/user/report/sidebar';

function ReportLayout() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Header setMobileOpen={setMobileOpen} />
			<Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

			<Box component='main' sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
}
export default ReportLayout;
