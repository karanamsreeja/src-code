import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';

import DropDownList from '../header/DropDownList';
import SettingsIcon from 'assets/icons/settings';
import ExitIcon from 'assets/icons/exit';
import NotificationIcon from 'assets/icons/notification';

import BellIcon from 'assets/icons/bell';
import { logout } from 'helpers/auth';

const options = [
	{
		id: 1,
		key: 1,
		title: 'Account Settings',
		subtitle: 'Consectetur adipis sit',
		icon: <SettingsIcon style={{ color: '#25468A', fontSize: '1.25rem' }} />,
		to: '/admin/account',
	},
	{
		id: 2,
		key: 2,
		title: 'Notification',
		subtitle: 'Lorem ipsum dolor sit',
		icon: <NotificationIcon style={{ color: '#25468A', fontSize: '1.25rem' }} />,
		to: '/admin/account',
	},
	{
		id: 3,
		key: 3,
		link: false,
		title: 'Log Out',
		subtitle: 'Lorem ipsum dolor sit',
		icon: <ExitIcon style={{ color: '#25468A', fontSize: '1.25rem' }} />,
		to: '/admin/account',
	},
];

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.darkBlue,
		color: 'white',
		boxShadow: 'none',
		overflowY: 'hidden',
	},
	container: {
		[theme.breakpoints.up(1200)]: {
			maxWidth: '100%',
			paddingLeft: '42px',
			paddingRight: '96px',
		},
	},
	headerOptions: {
		'& *': {
			cursor: 'pointer',
		},
		'&::after': {
			background: '#1B3C7F',
		},
		paddingLeft: '28px',
		paddingRight: '28px',
		[theme.breakpoints.down('md')]: {
			paddingLeft: '20px',
			paddingRight: '20px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '10px',
			paddingRight: '10px',
		},
		[theme.breakpoints.down(255)]: {
			paddingLeft: '5px',
			paddingRight: '5px',
		},
	},
	headerOptions2: {
		'& *': {
			cursor: 'pointer',
		},
		[theme.breakpoints.up('md')]: {
			paddingLeft: '41px',
			paddingRight: '0px',
		},
	},
}));

function Header({ setMobileOpen }) {
	const classes = useStyles();

	const handleDrawerToggle = () => {
		setMobileOpen((pre) => !pre);
	};

	const handleClick = (id) => {
		if (id === 3) {
			logout();
		}
	};

	return (
		<AppBar position='fixed' className={classes.root}>
			<Container className={classes.container}>
				<Toolbar disableGutters>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>

					<Toolbar>
						<img src='/assets/logo-white.svg' alt='logo' style={{ height: '52px' }} />
					</Toolbar>

					<div className={classes.headerOptions + ' lg-border-left list-style-none'} style={{ marginLeft: 'auto' }}>
						<IconButton aria-label='delete'>
							<BellIcon style={{ color: 'white' }} />
						</IconButton>
					</div>
					<div className={classes.headerOptions + ' ' + classes.headerOptions2 + ' lg-border-left list-style-none'}>
						<DropDownList title='My Account' list={options} handleClick={handleClick} />
					</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Header;
