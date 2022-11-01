import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import SiteHeader from 'components/site/Header';
import { makeStyles } from '@mui/styles';

import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.lightPink,
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
	},
}));

function LoginRegisterLayout4({ auth }) {
	const classes = useStyles();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (auth.login && auth.user) {
			if (location.state?.redirectUrl) {
				let newlocationState = { ...location.state };

				delete newlocationState.location;
				delete newlocationState.redirectUrl;
				navigate(location.state.redirectUrl, { replace: true, state: newlocationState }); // TODO replace not working
			} else {
				navigate(auth.redirectUrl || '/');
			}
		}
	}, [auth, navigate, location]);

	return (
		<div className={classes.root}>
			<SiteHeader />
			<Outlet />
		</div>
	);
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(LoginRegisterLayout4);
