import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { makeStyles } from '@mui/styles';
import classname from 'classnames';

import { drawerWidth } from 'constants/site/report';

import { NavLink, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.darkBlue,
		color: 'white',
	},
}));

const useStyles2 = makeStyles((theme) => ({
	listItem: {
		padding: '10px',
		marginBottom: '10px',
		borderRadius: '4px 0 0 4px',
	},
	activelistItem: {
		background: '#133373',
		'&:hover': {
			background: '#133373',
		},
	},
}));

// use to detect which sidebar list-item is open
const sidebaritems = {
	none: 0,
	aboutus: 1,
	learn: 2,
	science: 3,
};

const DrawerListItem = () => {
	const classes = useStyles2();
	const [openOptions, setopenOptions] = useState(sidebaritems.none);

	const handleListItemClick = (option) => {
		if (openOptions === option) {
			setopenOptions(sidebaritems.none);
		} else {
			setopenOptions(option);
		}
	};

	return (
		<div>
			<Toolbar>
				<Link to='/' style={{ height: '52px', margin: 'auto' }}>
					<img src='/assets/logo-white.svg' alt='logo' style={{ height: '100%' }} />
				</Link>
			</Toolbar>
			<Divider />
			<div style={{ textAlign: 'center' }}>
				<Button
					sx={{ m: '40px auto 26px', p: '10px', minWidth: '80%' }}
					component={Link}
					to='/get-started'
					variant='contained'
					color='darkYellow'
				>
					<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
						Order a Kit
					</Typography>
				</Button>
			</div>
			<List>
				<NavLink to='/user/dashboard'>
					{({ isActive }) => (
						<div style={{ paddingLeft: '18px' }}>
							<ListItem button className={classname(classes.listItem, isActive && classes.activelistItem)}>
								<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
									<div style={{ width: '40px' }} className='center'>
										<img src='/assets/icons/home.svg' alt='home' />
									</div>
								</ListItemIcon>
								<ListItemText sx={{ mb: 0 }}>
									<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
										Dashboard
									</Typography>
								</ListItemText>
							</ListItem>
						</div>
					)}
				</NavLink>

				<NavLink to='/user/report'>
					{({ isActive }) => (
						<div style={{ paddingLeft: '18px' }}>
							<ListItem button className={classname(classes.listItem, isActive && classes.activelistItem)}>
								<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
									<div style={{ width: '40px' }} className='center'>
										<img src='/assets/icons/folder.svg' alt='home' />
									</div>
								</ListItemIcon>
								<ListItemText sx={{ mb: 0 }}>
									<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
										My Reports
									</Typography>
								</ListItemText>
							</ListItem>
						</div>
					)}
				</NavLink>

				<div style={{ paddingLeft: '18px' }}>
					<ListItem button className={classname(classes.listItem)} onClick={() => handleListItemClick(sidebaritems.aboutus)}>
						<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
							<div style={{ width: '40px' }} className='center'>
								<img src='/assets/icons/info.svg' alt='home' />
							</div>
						</ListItemIcon>
						<ListItemText sx={{ mb: 0 }}>
							<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
								About Us
							</Typography>
						</ListItemText>
						{openOptions === sidebaritems.aboutus ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
				</div>
				<Collapse in={openOptions === sidebaritems.aboutus} timeout='auto' unmountOnExit>
					<List component={Link} to='/about-us/company' disablePadding>
						<ListItemButton sx={{ pl: 8 }}>
							<ListItemText primary='Our Company' />
						</ListItemButton>
					</List>
					<List component={Link} to='/about-us/team' disablePadding>
						<ListItemButton sx={{ pl: 8 }}>
							<ListItemText primary='Our Team' />
						</ListItemButton>
					</List>
					<List component={Link} to='/about-us/experts' disablePadding>
						<ListItemButton sx={{ pl: 8 }}>
							<ListItemText primary='Our Experts' />
						</ListItemButton>
					</List>
				</Collapse>

				<NavLink to='/learn'>
					<div style={{ paddingLeft: '18px' }}>
						<ListItem button className={classes.listItem}>
							<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
								<div style={{ width: '40px' }} className='center'>
									<img src='/assets/icons/list.svg' alt='home' />
								</div>
							</ListItemIcon>
							<ListItemText sx={{ mb: 0 }}>
								<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
									Learn
								</Typography>
							</ListItemText>
						</ListItem>
					</div>
				</NavLink>

				<Link to='/our-science'>
					<div style={{ paddingLeft: '18px' }}>
						<ListItem button sx={{ p: '10px', mb: '10px', borderRadius: '4px 0 0 4px' }}>
							<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
								<div style={{ width: '40px' }} className='center'>
									<img src='/assets/icons/templates.svg' alt='home' />
								</div>
							</ListItemIcon>
							<ListItemText sx={{ mb: 0 }}>
								<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
									Our Science
								</Typography>
							</ListItemText>
						</ListItem>
					</div>
				</Link>

				<Link to='/success-story'>
					<div style={{ paddingLeft: '18px' }}>
						<ListItem button sx={{ p: '10px', mb: '10px', borderRadius: '4px 0 0 4px' }}>
							<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
								<div style={{ width: '40px' }} className='center'>
									<img src='/assets/icons/team.svg' alt='home' />
								</div>
							</ListItemIcon>
							<ListItemText sx={{ mb: 0 }}>
								<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
									Success Stories
								</Typography>
							</ListItemText>
						</ListItem>
					</div>
				</Link>
			</List>
		</div>
	);
};

function Sidebar({ mobileOpen, setMobileOpen, window }) {
	const classes = useStyles();

	const handleDrawerToggle = () => {
		setMobileOpen((pre) => !pre);
	};

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
			<Link to='/' style={{ position: 'fixed', bottom: 0, zIndex: 2000, left: 0, overflow: 'hidden', pointerEvents: 'none' }}>
				<img src='/assets/bg-logo.svg' alt='' style={{ transform: 'translate(-29% , 7%)' }} />
			</Link>
			<Drawer
				container={container}
				variant='temporary'
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
				classes={{ paper: classes.root }}
			>
				<DrawerListItem />
			</Drawer>
			<Drawer
				variant='permanent'
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
				classes={{ paper: classes.root }}
				open
			>
				<DrawerListItem />
			</Drawer>
		</Box>
	);
}

Sidebar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default Sidebar;
