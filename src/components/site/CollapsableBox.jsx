import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import Box from 'components/Box';

const CollapsableBox = ({ title, state = {}, headerOptions, defaultOpen = false, children }) => {
	const [open, setopen] = useState(defaultOpen);

	return (
		<Box sx={{ p: '20px', mb: '16px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant='subtitle1' fontWeight='bold' color='#212121' sx={{ alignSelf: 'center' }}>
					{title}
				</Typography>
				{headerOptions}
				<IconButton aria-label='collapse-up' onClick={() => setopen((pre) => !pre)}>
					<img src={open ? '/assets/icons/collapse-up.svg' : '/assets/icons/collapse-down.svg'} alt='collapse-up' />
				</IconButton>
			</div>
			<Collapse in={open}>{children}</Collapse>
		</Box>
	);
};

export default CollapsableBox;
