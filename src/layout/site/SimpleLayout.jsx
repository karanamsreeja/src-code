import React from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<SiteHeader />
			<Outlet />
			<SiteFooter />
		</>
	);
};

export default Layout;
