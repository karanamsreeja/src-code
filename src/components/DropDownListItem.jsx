import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import classname from 'classnames';

import { NavLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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

const DropDownListItem = ({ title, to, end = false, iconRenderer, list }) => {
	const location = useLocation();
	const classes = useStyles();
	const isActive = end ? location.pathname === to : location.pathname.includes(to + '/');
	const [open, setopen] = useState(isActive);

	const handleListItemClick = () => {
		setopen((pre) => !pre);
	};

	return (
		<>
			<div style={{ paddingLeft: '18px' }}>
				<ListItem button className={classname(classes.listItem, isActive && classes.activelistItem)} onClick={handleListItemClick}>
					{iconRenderer && (
						<ListItemIcon sx={{ minWidth: '13px', marginRight: '13px' }}>
							<div style={{ width: '40px' }} className='center'>
								{iconRenderer(isActive)}
							</div>
						</ListItemIcon>
					)}
					<ListItemText sx={{ mb: 0 }}>
						<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
							{title}
						</Typography>
					</ListItemText>
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
			</div>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					{list?.map((e, i) => (
						<NavLink to={e.to} key={i}>
							{({ isActive }) => (
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText
										primary={
											<Typography
												variant='body2'
												component='div'
												fontWeight={isActive ? 'bold' : 500}
												color={isActive ? '#6D81B0' : '#BFC7DE'}
												sx={{ pl: '50px' }}
											>
												{e.title}
											</Typography>
										}
									/>
								</ListItemButton>
							)}
						</NavLink>
					))}
				</List>
			</Collapse>
		</>
	);
};

export default DropDownListItem;
