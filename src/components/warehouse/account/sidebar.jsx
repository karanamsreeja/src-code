import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SettingsIcon from 'assets/icons/settings';
import ExitIcon from 'assets/icons/exit';
import NotificationIcon from 'assets/icons/notification';

import LoadingScreen from 'components/site/LoadingScreen';

import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import classnames from 'classnames';
import { authActions } from 'store/action/authAction';
import { connect } from 'react-redux';
import { axiosGet } from 'helpers/axios';

const useStyle = makeStyles((theme) => ({
	listItem: {
		padding: '8px 17px',
		marginBottom: '10px',
		color: '#25468A',
		borderRadius: '20px',
	},
	activelistItem: {
		background: '#25468A',
		color: 'white',
		'&:hover': {
			background: '#25468A',
		},
	},
}));

function Sidebar({ deleteAuth }) {
	const classes = useStyle();
	const [loading, setloading] = useState(null);

	const logoutHandler = async () => {
		try {
			setloading(true);
			await axiosGet('/auth/logout', {}, setloading, () => deleteAuth());
		} catch (error) {}
	};

	return (
		<Grid item sx={{ width: '265px' }}>
			{loading && <LoadingScreen />}

			<Typography variant='h4' fontWeight='bold' sx={{ mb: '23px' }} textAlign='center' color='text.darkBlue'>
				My Account
			</Typography>
			<List>
				<NavLink to='/warehouse/account'>
					{({ isActive }) => (
						<ListItem button className={classnames(classes.listItem, isActive && classes.activelistItem)}>
							<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
								<SettingsIcon style={{ color: isActive ? 'white' : '#25468A' }} />
							</ListItemIcon>
							<ListItemText sx={{ mb: 0 }}>
								<Typography variant='subtitle1' component='div' fontWeight='bold' color='inherit' lineHeight='22px'>
									Account Settings
								</Typography>
							</ListItemText>
						</ListItem>
					)}
				</NavLink>

				<NavLink to='/warehouse/account/notification'>
					{({ isActive }) => (
						<ListItem button className={classnames(classes.listItem, isActive && classes.activelistItem)}>
							<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
								<NotificationIcon style={{ color: isActive ? 'white' : '#25468A' }} />
							</ListItemIcon>
							<ListItemText sx={{ mb: 0 }}>
								<Typography variant='subtitle1' component='div' fontWeight='bold' color='inherit' lineHeight='22px'>
									Notification
								</Typography>
							</ListItemText>
						</ListItem>
					)}
				</NavLink>

				<ListItem button className={classes.listItem} onClick={logoutHandler}>
					<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
						<ExitIcon style={{ color: '#25468A' }} />
					</ListItemIcon>
					<ListItemText sx={{ mb: 0 }}>
						<Typography variant='subtitle1' component='div' fontWeight='bold' color='inherit' lineHeight='22px'>
							Log Out
						</Typography>
					</ListItemText>
				</ListItem>
			</List>
		</Grid>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAuth: () => dispatch(authActions.delete()),
	};
};

export default connect(null, mapDispatchToProps)(Sidebar);
