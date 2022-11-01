import React from 'react';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		borderRadius: '4px',
		border: '1px solid #F5F5F5',
		background: '#F5F5F5',
		padding: '18px 17px 20px 17px',
	},
	lineLeft: {
		'&::after': {
			content: '""',
			position: 'absolute',
			transform: 'translate(40%, 15%)',
			left: '8px',
			width: '1px',
			height: '50%',
			background: '#E0E0E0',
		},
	},
}));

const Sheet = ({ name = '', email = '', phone = '', date = '', ...props }) => {
	const classes = useStyles();

	return (
		<div className={classes.root} {...props}>
			<Typography
				variant='caption'
				fontWeight='bold'
				color='text.darkYellow'
				fontSize='10px'
				letterSpacing='1px'
				component='div'
				lineHeight='20px'
			>
				NAME
			</Typography>
			<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' lineHeight='22px'>
				{name}
			</Typography>

			<Divider sx={{ mt: '8px', mb: '22px', borderColor: '#E0E0E0' }} />

			<Typography
				variant='caption'
				textTransform='uppercase'
				fontWeight='bold'
				color='text.darkYellow'
				fontSize='10px'
				letterSpacing='1px'
				component='div'
				lineHeight='20px'
			>
				EMAIL ID:
			</Typography>
			<Typography variant='subtitle2' fontWeight={400} color='#212121' lineHeight='20px' sx={{ mb: '22px' }}>
				{email}
			</Typography>

			<Grid container spacing={3}>
				<Grid item md={6}>
					<Typography
						variant='caption'
						textTransform='uppercase'
						fontWeight='bold'
						color='text.darkYellow'
						fontSize='10px'
						letterSpacing='1px'
						component='div'
						lineHeight='20px'
					>
						PHONE NUMBER:
					</Typography>
					<Typography variant='subtitle2' fontWeight={400} color='#212121' lineHeight='20px'>
						{phone}
					</Typography>
				</Grid>
				<Grid item md={6} sx={{ position: 'relative' }}>
					<div className={classes.lineLeft} />
					<Typography
						variant='caption'
						textTransform='uppercase'
						fontWeight='bold'
						color='text.darkYellow'
						fontSize='10px'
						letterSpacing='1px'
						component='div'
						lineHeight='20px'
					>
						DATE ADDED:
					</Typography>
					<Typography variant='subtitle2' fontWeight={400} color='#212121' lineHeight='20px'>
						{date}
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default Sheet;
