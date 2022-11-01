import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import classnames from 'classnames';

import Box from '../../Box';
import { Link } from 'react-router-dom';

const useCardStyle = makeStyles((theme) => ({
	root: {
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.14)',
		border: '1px solid #FAFAFA',
		borderRadius: '4px',
		background: 'white',
		width: '100%',
		padding: '7px 54px 6px 16px',
		height: '100%',
		[theme.breakpoints.down('sm')]:{
			padding: '7px 10px',
		}
	},
	headerCenter: {
		width: '100%',
		justifyContent: 'center',
	},
	bodyCenter: {
		width: '70%',
		margin: 'auto',
		'& *': {
			textAlign: 'center',
		},
	},
	subtitleCenter: {
		width: '50%',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 8,
	borderRadius: 4,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.background.lightPink,
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 4,
		backgroundColor: theme.palette.background.darkBlue,
	},
}));

function LinearProgressWithLabel(props) {
	return (
		<div style={{ display: 'flex', alignItems: 'center', marginBottom: '19px' }}>
			<Box sx={{ width: '100%', mr: 1, boxShadow: 'none' }}>
				<BorderLinearProgress variant='determinate' {...props} />
			</Box>
			<Box style={{ ml: '25px', boxShadow: 'none' }}>
				<Typography variant='body2' color='text.darkBlue' fontWeight='bold' sx={{ pl: '18px', pr: '11px' }}>
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</div>
	);
}

export default function RecipeReviewCard({ className, size = 'small', center = false, state }) {
	const classes = useCardStyle();
	const imgSize = size === 'small' ? '38px' : '55px';

	return (
		<Card className={classnames(classes.root, className)}>
			<CardHeader
				avatar={
					<Avatar sx={{ width: imgSize, height: imgSize }} aria-label='user'>
						<img src={state.profile_picture} alt='user' style={{ width: '100%', height: '100%' }} />
					</Avatar>
				}
				sx={{ pb: size === 'small' ? '8px' : '17px' }}
				classes={{ avatar: classnames(center && classes.headerCenter) }}
			/>
			<CardContent sx={{ pt: 0 }} className={classnames(center && classes.bodyCenter)}>
				<Typography variant='h6' fontWeight='bold' fontSize='22px' color='#212121' sx={{ mb: size === 'small' ? '3px' : '11px' }}>
					{state.title}
				</Typography>
				<Typography variant='body2' color='text.grey' className={classnames(center && classes.subtitleCenter)} sx={{ mb: '16px' }}>
					{state.subtitle}
				</Typography>

				<LinearProgressWithLabel value={state.profileProgress} />

				<Grid container justifyContent={center ? 'center' : 'flex-start'}>
					<Grid item>
						<Button variant='contained' size='medium' color='darkBlue' fullWidth component={Link}to='/user/account'>
							<Typography variant='body2' color='white'>
								Complete Your Profile
							</Typography>
						</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
