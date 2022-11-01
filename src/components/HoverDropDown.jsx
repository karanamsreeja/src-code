import React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { Link } from 'react-router-dom';

export default function MenuListComposition({ title, list, listRenderer, ...props }) {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	return (
		<>
			<li {...props} onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
				<span
					onClick={() => setOpen(true)}
					ref={anchorRef}
					aria-controls={open ? 'composition-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup='true'
					className='pointer'
				>
					{typeof title === 'string' ? title : <Link to={title.to}>{title.name}</Link>}
				</span>
				<img
					src='/assets/arrowDown.svg'
					alt=''
					style={{ width: '11px', height: '5px', verticalAlign: 'middle', marginLeft: 4, marginTop: -2 }}
				/>

				<Popper open={open} anchorEl={anchorRef.current} role={undefined} placement='bottom-start' transition style={{ zIndex: 1500 }}>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top',
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList aria-labelledby='composition-button' onKeyDown={handleListKeyDown}>
										{listRenderer}
										{!listRenderer &&
											list &&
											list.map((e, i) => (
												<MenuItem onClick={handleClose} component={Link} to={e.to} key={i}>
													{e.name || e.title}
												</MenuItem>
											))}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</li>
		</>
	);
}
