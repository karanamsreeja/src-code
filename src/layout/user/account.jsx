import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import SiteHeader from 'components/site/Header';
import Sidebar from 'components/user/account/sidebar';
import { makeStyles } from '@mui/styles';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.lightPink,
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
	},
}));

function AccountLayoutWrapper({ auth }) {
	const classes = useStyles();
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
		<div className={classes.root}>
			<SiteHeader />
			<Container sx={{ flex: 1, m: { xs: 0, md: '100px auto 16px' }, p: { xs: 0, md: '0 24px' } }} component='main'>
				<Grid container spacing={3.5}>
					<Sidebar />
					<Grid item xs>
						<Outlet />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(AccountLayoutWrapper);
