import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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

	useEffect(() => {
		if (auth?.login && auth?.aiTeam) {
			navigate(auth.redirectUrl || '/ai-team', { replace: true });
		}
	}, [auth, navigate]);

	return (
		<div className={classes.root}>
			<AppBar position='static' sx={{ background: '#06225C' }}>
				<Container>
					<Toolbar disableGutters>
						<Typography variant='h6' noWrap component='div' sx={{ pt: '10px', pb: '14px' }}>
							<Link to='/'>
								<img src='/assets/logo-white.svg' alt='LOGO' style={{ height: '50px' }} />
							</Link>
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
			<Outlet />
		</div>
	);
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(LoginRegisterLayout2);
