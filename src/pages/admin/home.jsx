import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import Sheet from 'components/sheet';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import TeamMemberCard from 'components/TeamMemberCard';
import { axiosGet } from 'helpers/axios';
import { MemberDateFormatter } from 'helpers/formatter';
import { prepareDashboardState } from 'services/admin/dashboard';

const TeamCard = ({ teamName, size }) => (
	<div className='team-card flex space-between'>
		<div className='flex1'>
			<Typography variant='caption' color='text.darkYellow'>
				TEAM NAME
			</Typography>
			<Typography variant='subtitle1' color='text.greyDark' fontWeight='bold'>
				{teamName}
			</Typography>
		</div>
		<div className='flex1 text-center'>
			<Typography variant='caption' color='text.darkYellow'>
				TEAM SIZE
			</Typography>
			<Typography variant='subtitle1' color='text.greyDark' fontWeight='bold'>
				{size}
			</Typography>
		</div>
		<div className='flex1 flex align-end'>
			<Button variant='contained' color='darkBlue' size='small' fullWidth>
				ACTIVE
			</Button>
		</div>
	</div>
);

const Home = () => {
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState({
		paid: 0,
		activeOrder: 0,
		orderDeliver: 0,
		pickupsPending: 0,
		sequencinginProgress: 0,
		reportsDelivered: 0,
		teams: {
			logistics: 0,
			ai: 0,
			clinical: 0,
			warehouse: 0,
		},
	});

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/admin/dashboard', {}, setloading);

			if (res.status === 200) {
				const preparedState = prepareDashboardState(res.data);
				setState(preparedState);
			}
		}
		getData();
	}, []);

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className='container-x'>
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

				<Typography variant='h5' fontWeight='bold' color='text.darkBlue' sx={{ mb: '25px' }}>
					Kit Orders
				</Typography>
				<Grid container spacing={1.6} sx={{ mb: '45px' }}>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								New Requests
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
								{state.activeOrder}
							</Typography>
						</Sheet>
					</Grid>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								Delivered Orders
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.orderDeliver}
							</Typography>
						</Sheet>
					</Grid>
				</Grid>

				<Typography variant='h5' fontWeight='bold' color='text.darkBlue' sx={{ mb: '25px' }}>
					Sample Pickups
				</Typography>
				<Grid container spacing={1.6} sx={{ mb: '45px' }}>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								Pickups Pending
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.pickupsPending}
							</Typography>
						</Sheet>
					</Grid>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								Sequencing in Progress
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.sequencinginProgress}
							</Typography>
						</Sheet>
					</Grid>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								Reports Delivered
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.reportsDelivered}
							</Typography>
						</Sheet>
					</Grid>
				</Grid>

				<Divider sx={{ mt: '59px', mb: '49px' }} />

				<Typography variant='h5' fontWeight='bold' color='text.darkBlue' sx={{ mb: '26px' }}>
					Team
				</Typography>

				<Grid container spacing={2.3}>
					<Grid item md={6} xs={12}>
						<TeamCard teamName='Warehouse' size={state.teams.warehouse} />
					</Grid>
					<Grid item md={6} xs={12}>
						<TeamCard teamName='Clinical Partner' size={state.teams.clinical} />
					</Grid>
					<Grid item md={6} xs={12}>
						<TeamCard teamName='Logistics' size={state.teams.logistics} />
					</Grid>
					<Grid item md={6} xs={12}>
						<TeamCard teamName='AI Team' size={state.teams.ai} />
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Home;
