import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import SiteHeader from 'components/warehouse/header';
import Sidebar from 'components/warehouse/account/sidebar';
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

function AccountLayoutWrapper({ auth, children }) {
	const classes = useStyles();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (auth?.loading) {
			return;
		}
		if (!(auth.login && auth.warehouse)) {
			navigate('/warehouse/login', { state: { redirectUrl: window.location.pathname }, replace: true });
		}
	}, [auth, navigate, location]);

	if (auth?.loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={classes.root}>
			<SiteHeader />
			<Container sx={{ flex: 1, mb: '16px', mt: '100px' }} component='main'>
				<Grid container spacing={3.5}>
					<Sidebar />
					<Grid item xs>
						{children}
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
