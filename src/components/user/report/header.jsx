import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';

import DropDownItem from '../../HoverDropDown';
import { drawerWidth } from 'constants/site/report';
import { Link } from 'react-router-dom';
import { logout } from 'helpers/auth';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: 'white',
		color: 'black',
		boxShadow: 'none',
		borderBottom: '1px solid #E0E0E0',
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
		paddingLeft: '20px',
		paddingRight: '20px',
		[theme.breakpoints.down('md')]: {
			paddingLeft: '10px',
			paddingRight: '10px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '5px',
			paddingRight: '5px',
		},
		[theme.breakpoints.down(255)]: {
			paddingLeft: '3px',
			paddingRight: '3px',
		},
	},
}));

function Header({ setMobileOpen }) {
	const classes = useStyles();

	const handleDrawerToggle = () => {
		setMobileOpen((pre) => !pre);
	};

	return (
		<AppBar
			position='fixed'
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` },
			}}
			className={classes.root}
		>
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

					<div className={classes.headerOptions + ' lg-border-left list-style-none'} style={{ marginLeft: 'auto' }}>
						<IconButton aria-label='delete'>
							<img src='/assets/icons/bell.svg' alt='bell' style={{ height: '22px', width: '18px' }} />
						</IconButton>
					</div>

					<div className={classes.headerOptions + ' lg-border-left list-style-none display-inline-flex'} style={{ alignItems: 'baseline' }}>
						<li className='pr-0'>
							<Link to='/site/cart'>
								<img
									src='/assets/icons/cart.svg'
									alt='cart'
									style={{ height: '20px', width: '20px', transform: 'translateY(5px)', marginRight: '16px' }}
								/>
							</Link>
						</li>
						<DropDownItem
							title='My Account'
							listRenderer={[
								<MenuItem component={Link} to='/get-started' key={0}>
									Get Started
								</MenuItem>,
								<MenuItem component={Link} to='/user/account' key={1}>
									Complete Profile
								</MenuItem>,
								<MenuItem onClick={() => logout()} key={9}>
									Logout
								</MenuItem>,
							]}
						/>
					</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Header;
