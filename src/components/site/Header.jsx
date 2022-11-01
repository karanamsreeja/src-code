import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import classname from 'classnames';

import { drawerWidth } from 'constants/site/report';
import DropDownListItem from '../DropDownListItem';
import DropDownItem from '../HoverDropDown';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';

import { NavLink } from 'react-router-dom';

const aboutUsPagesList = [
	{ title: 'Our Company', to: '/about-us/company' },
	{ title: 'Our Team', to: '/about-us/team' },
	{ title: 'Our Experts', to: '/about-us/experts' },
];

const myaccountList = [
	{ title: 'Account', to: '/user/account' },
	{ title: 'Cart', to: '/site/cart' },
	{ title: 'Dashboard', to: '/user/dashboard' },
];

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: 'white',
		color: 'black',
		boxShadow: 'none',
		borderBottom: '1px solid #E0E0E0',
		overflowY: 'hidden',
	},
	headerOptions: {
		'& li': {
			padding: '4px 20px',
			fontSize: '14px',
			fontWeight: '700',
			lineHeight: '20px',
			letterSpacing: '0px',
			cursor: 'pointer',
		},
	},
}));

// const DropDownItem = ({ title, list, ...props }) => {
// 	const [state, setstate] = useState(null);

// 	const handleOpenNavMenu = (event) => {
// 		setstate(event.currentTarget);
// 	};

// 	const handleCloseNavMenu = () => {
// 		setstate(null);
// 	};
// 	return (
// 		<li {...props} onMouseOver={(event) => setstate(event.currentTarget)} onMouseLeave={() => setstate(null)}>
// 			<span onClick={handleOpenNavMenu}>{title}</span>
// 			<img src='/assets/arrowDown.svg' alt='' style={{ width: '11px', height: '5px', verticalAlign: 'middle', marginLeft: 4, marginTop: -2 }} />
// 			<Menu
// 				anchorEl={state}
// 				anchorOrigin={{
// 					vertical: 'bottom',
// 					horizontal: 'left',
// 				}}
// 				// keepMounted
// 				transformOrigin={{
// 					vertical: 'top',
// 					horizontal: 'left',
// 				}}
// 				open={Boolean(state)}
// 				onClose={handleCloseNavMenu}
// 			>
// 				{list?.map((page) => (
// 					<MenuItem key={page} onClick={handleCloseNavMenu}>
// 						<Typography textAlign='center'>{page}</Typography>
// 					</MenuItem>
// 				))}
// 			</Menu>
// 		</li>
// 	);
// };

const useStyles2 = makeStyles((theme) => ({
	listItem: {
		color: '#25468A',
		padding: '10px',
		marginBottom: '10px',
		borderRadius: '4px 0 0 4px',
	},
	activelistItem: {
		background: '#25468A',
		color: 'white',
		'&:hover': {
			background: '#25468A',
		},
	},
}));

const DrawerListItem = ({ isLogin }) => {
	const classes = useStyles2();

	return (
		<div style={{ marginTop: '62px' }}>
			<List>
				<DropDownListItem title='About Us' to='/about-us' list={aboutUsPagesList} />

				<NavLink end to='/learn'>
					{({ isActive }) => (
						<div style={{ paddingLeft: '18px' }}>
							<ListItem button className={classname(classes.listItem, isActive && classes.activelistItem)}>
								<ListItemText sx={{ mb: 0 }}>
									<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
										Learn
									</Typography>
								</ListItemText>
							</ListItem>
						</div>
					)}
				</NavLink>

				<NavLink end to='/get-started'>
					{({ isActive }) => (
						<div style={{ paddingLeft: '18px' }}>
							<ListItem button className={classname(classes.listItem, isActive && classes.activelistItem)}>
								<ListItemText sx={{ mb: 0 }}>
									<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
										Get Started
									</Typography>
								</ListItemText>
							</ListItem>
						</div>
					)}
				</NavLink>

				{isLogin ? (
					<DropDownListItem title='My Account' to='/user/account' list={myaccountList} />
				) : (
					<NavLink end to='/user/login'>
						{({ isActive }) => (
							<div style={{ paddingLeft: '18px' }}>
								<ListItem button className={classname(classes.listItem, isActive && classes.activelistItem)}>
									<ListItemText sx={{ mb: 0 }}>
										<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
											Login
										</Typography>
									</ListItemText>
								</ListItem>
							</div>
						)}
					</NavLink>
				)}
			</List>
		</div>
	);
};

const ResponsiveAppBar = ({ auth, deleteAuth }) => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const [sidebarOpen, setSidebarOpen] = useState(false);
	const container = window !== undefined ? () => window.document.body : undefined;

	const logoutHandler = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_BASEURL}/auth/logout`);
			if (res.data?.message) {
				if (res.status === 200) {
					enqueueSnackbar(res.data.message, { variant: 'success' });
					deleteAuth();
				} else {
					enqueueSnackbar(res.data.message, { variant: 'error' });
				}
			}
		} catch (error) {}
	};

	const handleDrawerToggle = () => {
		setSidebarOpen((pre) => !pre);
	};

	return (
		<AppBar position='static' className={classes.root}>
			<Container>
				<Toolbar disableGutters>
					<Typography variant='h6' noWrap component='div' sx={{ pt: '10px', pb: '14px', display: { xs: 'none', md: 'flex' } }}>
						<Link to='/'>
							<img src='/assets/logo.svg' alt='LOGO' style={{ height: '50px' }} />
						</Link>
					</Typography>
					<Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<Link to='/'>
							<img src='/assets/logo.svg' alt='LOGO' />
						</Link>
					</Typography>

					<Box sx={{ flexGrow: 1 }} component='ul' className={classes.headerOptions + ' list-style-none center p-0 md-d-none'}>
						<DropDownItem title={{ name: 'About Us', to: '/about-us' }} list={aboutUsPagesList} />
						<DropDownItem title={{ name: 'Learn', to: '/learn' }} list={[]} />
						<DropDownItem title={{ name: 'Our Science', to: '/our-science' }} list={[]} />
						<li>
							<Link to='/success-story' style={{ color: '#212121' }}>
								Success Stories
							</Link>
						</li>
					</Box>
					<ul className='list-20 list-style-none center p-0 md-d-none'>
						<li className='lg-border-right lg-border-right-20 header-btn-yellow mr-20'>
							<Link to='/get-started'>Get Started</Link>
						</li>
						<li className='pr-0'>
							<Link to='/site/cart'>
								<img src='/assets/icons/cart.svg' alt='cart' style={{ height: '20px', width: '20px', marginTop: '5px' }} />
							</Link>
						</li>
						{auth.login && auth.user ? (
							<DropDownItem
								title='My Account'
								listRenderer={[
									<MenuItem component={Link} to='/user/account' key={0}>
										Account
									</MenuItem>,
									<MenuItem component={Link} to='/site/cart' key={1}>
										Cart
									</MenuItem>,
									<MenuItem component={Link} to='/user/dashboard' key={2}>
										Dashboard
									</MenuItem>,
									<MenuItem onClick={logoutHandler} key={9}>
										Logout
									</MenuItem>,
								]}
							/>
						) : (
							<li className='header-list-item'>
								<Link to='/user/login'>Login</Link>
							</li>
						)}
					</ul>

					{/* mobile view  */}

					<IconButton className='mr-16' sx={{ display: { md: 'none', xs: 'block' } }}>
						<Link to='/site/cart'>
							<img src='/assets/icons/cart.svg' alt='cart' style={{ height: '20px', width: '20px' }} />
						</Link>
					</IconButton>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ display: { md: 'none', xs: 'block' } }}
					>
						<MenuIcon />
					</IconButton>
					<Drawer
						container={container}
						variant='temporary'
						open={sidebarOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true,
						}}
						sx={{
							display: { xs: 'block', md: 'none' },
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
						}}
						classes={{ paper: classes.root }}
					>
						<DrawerListItem isLogin={auth.login && auth.user} />
					</Drawer>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};
const mapDispatchToProps = (dispatch) => {
	return {
		deleteAuth: () => dispatch(authActions.delete()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
