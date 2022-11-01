import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import SiteHeader from 'components/site/Header';
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

function CartLayout({ auth }) {
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
			<Outlet />
		</div>
	);
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(CartLayout);
