import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Link } from 'react-router-dom';

const emtyFn = () => {};

// list=[{
//     id,key,link,title,subtitle,icon,to
// }]
const DropDownList = ({ title, list, handleClick = emtyFn, ...props }) => {
	const [state, setstate] = useState(null);

	const handleOpenNavMenu = (event) => {
		setstate(event.currentTarget);
	};

	const handleCloseNavMenu = (id) => {
		setstate(null);
		handleClick(id);
	};
	return (
		<li {...props}>
			<span onClick={handleOpenNavMenu}>
				{title}
				<img src='/assets/icons/Arrow.svg' alt='' style={{ verticalAlign: 'middle', marginLeft: 8, marginTop: -4 }} />
			</span>
			<Menu
				anchorEl={state}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				// keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(state)}
				onClose={handleCloseNavMenu}
				sx={{
					'& .MuiList-root': {
						padding: '8px',
					},
				}}
			>
				{list.map((e, i) => (
					<MenuItem
						onClick={() => handleCloseNavMenu(e.id)}
						sx={{ borderRadius: '4px', px: '8px', pt: '8px' }}
						component={e.link===false ? 'li' : Link}
						to={e.to}
						key={e.key}
					>
						{e.icon}
						<div style={{ marginLeft: '14px' }}>
							<Typography variant='subtitle2' lineHeight='16px' fontWeight={500}>
								{e.title}
							</Typography>
							<Typography variant='caption' color='#9E9E9E'>
								{e.subtitle}
							</Typography>
						</div>
					</MenuItem>
				))}
			</Menu>
		</li>
	);
};

export default DropDownList;
