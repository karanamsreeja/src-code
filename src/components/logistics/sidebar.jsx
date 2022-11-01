import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import classname from 'classnames';

import { drawerWidth } from 'constants/site/report';

import HomeIcon from 'assets/icons/home';
import FolderIcon from 'assets/icons/folder';

import DropDownListItem from '../DropDownListItem';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#E6E9F1',
		color: '#25468A',
		borderRight: '0',
		[theme.breakpoints.up('sm')]: {
			top: '64px',
		},
	},
}));

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

const logisticskitLinksLits = [
	{ title: 'My Pickups', to: '/logistics/orders/my-pickup' },
	{ title: 'Deliveries In Progress', to: '/logistics/orders/deliveries-in-progress' },
	{ title: 'Delivered Orders', to: '/logistics/orders/all-delivered-orders' },
];
const logisticsAdminkitLinksLits = [{ title: 'Pickup Requests', to: '/logistics/orders/pickup-requests' }, ...logisticskitLinksLits];

const logisticsSampleLinksLits = [
	{ title: 'My Pickups', to: '/logistics/pickups/my-pickup' },
	{ title: 'Deliveries In Progress', to: '/logistics/pickups/deliveries-in-progress' },
	{ title: 'Delivered Orders', to: '/logistics/pickups/all-delivered-orders' },
];
const logisticsAdminSampleLinksLits = [{ title: 'Pickup Requests', to: '/logistics/pickups/pickup-requests' }, ...logisticsSampleLinksLits];

const DrawerListItem = ({ islogisticsLead }) => {
	const classes = useStyles2();

	return (
		<div style={{ marginTop: '62px' }}>
			<List>
				<NavLink end to='/logistics'>
					{({ isActive }) => (
						<div style={{ paddingLeft: '18px' }}>
							<ListItem button className={classname(classes.listItem, isActive && classes.activelistItem)}>
								<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
									<div style={{ width: '40px' }} className='center'>
										<HomeIcon
											width='14'
											height='16'
											viewBox='0 0 14 16'
											style={{ color: isActive ? 'white' : '#25468A', fontSize: '1rem' }}
										/>
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

				<DropDownListItem
					title='Kit Orders'
					to='/logistics/orders'
					iconRenderer={(isActive) => <FolderIcon style={{ color: isActive ? 'white' : '#25468A' }} />}
					list={islogisticsLead ? logisticsAdminkitLinksLits : logisticskitLinksLits}
				/>

				<DropDownListItem
					title='Sample Pickups'
					to='/logistics/pickups'
					iconRenderer={(isActive) => <FolderIcon style={{ color: isActive ? 'white' : '#25468A' }} />}
					list={islogisticsLead ? logisticsAdminSampleLinksLits : logisticsSampleLinksLits}
				/>
			</List>
		</div>
	);
};

function Sidebar({ islogisticsLead, mobileOpen, setMobileOpen, window }) {
	const classes = useStyles();

	const handleDrawerToggle = () => {
		setMobileOpen((pre) => !pre);
	};

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
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
				<DrawerListItem islogisticsLead={islogisticsLead} />
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
				<DrawerListItem islogisticsLead={islogisticsLead} />
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

const mapStateToProps = ({ auth }) => {
	return { islogisticsLead: auth.logisticsLead };
};

export default connect(mapStateToProps)(memo(Sidebar));
