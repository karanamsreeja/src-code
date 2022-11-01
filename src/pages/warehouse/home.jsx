import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';

import Sheet from 'components/sheet';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import TeamMemberCard from 'components/TeamMemberCard';
import { axiosGet } from 'helpers/axios';

const useStyles = makeStyles((theme) => ({
	container: {
		position: 'relative',
		paddingTop: '58px',
		paddingBottom: '48px',
		[theme.breakpoints.up(1200)]: {
			paddingLeft: '94px',
			paddingRight: '94px',
		},
	},
}));

const Home = () => {
	const classes = useStyles();
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState({ paid: 0, dispatched: 0, order_confirmed: 0, members: [] });

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/warehouse/dashboard', {}, setloading);

			if (res.status === 200) {
				let data = { paid: 0, dispatched: 0, order_confirmed: 0 };
				res.data.ordersCount.map((e) => {
					if (e._id === 'paid') {
						data.paid = e.count;
					} else if (e._id === 'dispatch_completed') {
						data.dispatched = e.count;
					} else if (e._id === 'dispatch_initiated'||e._id === 'dispatch_paused') {
						data.order_confirmed = e.count;
					}
					return true;
				});

				data.members = res.data.warehouseMembers;
				setState(data);
			}
		}

		getData();
	}, []);

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className={classes.container}>
				<Typography
					variant='caption'
					textTransform='uppercase'
					fontWeight='bold'
					color='text.darkerYellow'
					fontSize='10px'
					letterSpacing='1.5px'
					component='div'
					gutterBottom
				>
					DASHBOARD
				</Typography>
				<Typography variant='h4' fontWeight='bold' color='text.darkBlue' sx={{ mb: '8px' }}>
					Welcome Back
				</Typography>
				<Typography variant='subtitle2' fontWeight={400} color='text.Blue600' sx={{ mb: '38px' }}>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
					quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
				</Typography>

				<Grid container spacing={1.6} sx={{ mb: '45px' }}>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								New Orders Received
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.paid}
							</Typography>
						</Sheet>
					</Grid>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								Active Orders
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.order_confirmed}
							</Typography>
						</Sheet>
					</Grid>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								Dispatched Orders
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.dispatched}
							</Typography>
						</Sheet>
					</Grid>
				</Grid>

				<Divider sx={{ mt: '59px', mb: '49px' }} />

				<Typography variant='h5' fontWeight='bold' color='text.darkBlue' sx={{ mb: '26px' }}>
					Team Members
				</Typography>

				<Grid container spacing={2.3}>
					{state?.members.map((e) => (
						<Grid item md={4} key={e._id}>
							<TeamMemberCard name={e.fullname} email={e.email} phone={e.phone} date={e.created_on} />
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
};

export default Home;
