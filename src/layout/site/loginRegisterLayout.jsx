import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

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

function LoginRegisterLayout2({ auth }) {
	const classes = useStyles();
	const navigate = useNavigate();
	const [init, setInit] = useState(false);

	useEffect(() => {
		console.log('login');
		if (init) return;
		setInit(true);
		console.log('login2');
		if (auth.login) {
			navigate(-1, { replace: true }); //TODO redirect to dashboard
		}
	}, [auth, navigate, init]);

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

export default connect(mapStateToProps)(LoginRegisterLayout2);
