import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import Sheet from 'components/sheet';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import TeamMemberCard from 'components/TeamMemberCard';
import { axiosGet } from 'helpers/axios';
import { MemberDateFormatter } from 'helpers/formatter';
import { prepareDashboardState, prepareDashboardStateLead } from 'services/logistics/dashboard';

import { connect } from 'react-redux';

const Home = ({ islogisticsLead }) => {
	const [apiCall, setapiCall] = useState(false);
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState({
		pickupRequest: 0,
		assignedPickups: 0,
		inprogress: 0,
		delivered: 0,
		pickup_scheduled: 0,
		pickup_assigned: 0,
		pickup_collected: 0,
		pickup_completed: 0,
		assigned_dispatch: 0,
		members: [],
	});

	useEffect(() => {
		async function getData() {
			const url = islogisticsLead ? '/logistics/dashboard' : '/logistics/dashboard/member';
			const res = await axiosGet(url, {}, setloading);

			if (res.status === 200) {
				if (islogisticsLead) {
					const preparedState = prepareDashboardStateLead(res.data);
					setState(preparedState);
				} else {
					const preparedState = prepareDashboardState(res.data);
					setState(preparedState);
				}
			}
		}

		if (apiCall) return;
		setapiCall(true);
		getData();
	}, [islogisticsLead, apiCall]);

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
					{islogisticsLead ? (
						<>
							<Grid item md={3} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Pickup Requests
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.pickupRequest}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={3} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Assigned Pickups
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.assignedPickups}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={3} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Delivered Inprogress
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.inprogress}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={3} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Delivered Orders
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.delivered}
									</Typography>
								</Sheet>
							</Grid>
						</>
					) : (
						<>
							<Grid item md={4} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Assigned Pickups
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.assigned_dispatch}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={4} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Active Orders
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.inprogress}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={4} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Delivered Orders
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.delivered}
									</Typography>
								</Sheet>
							</Grid>
						</>
					)}
				</Grid>

				<Typography variant='h5' fontWeight='bold' color='text.darkBlue' sx={{ mb: '25px' }}>
					Sample Pickups
				</Typography>
				<Grid container spacing={1.6} sx={{ mb: '45px' }}>
					{islogisticsLead ? (
						<>
							<Grid item md={3} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Pickup Scheduled
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.pickup_scheduled}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={3} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Assigned Pickups
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.pickup_assigned}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={3} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Delivered Inproress
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.pickup_collected}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={3} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Delivered Orders
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.pickup_completed}
									</Typography>
								</Sheet>
							</Grid>
						</>
					) : (
						<>
							<Grid item md={4} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Assigned Pickups
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.pickup_assigned}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={4} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Active Orders
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.pickup_collected}
									</Typography>
								</Sheet>
							</Grid>
							<Grid item md={4} xs={12}>
								<Sheet>
									<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
										Delivered Orders
									</Typography>
									<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
										{state.pickup_completed}
									</Typography>
								</Sheet>
							</Grid>
						</>
					)}
				</Grid>

				<Divider sx={{ mt: '59px', mb: '49px' }} />

				<Typography variant='h5' fontWeight='bold' color='text.darkBlue' sx={{ mb: '26px' }}>
					Team Members
				</Typography>

				<Grid container spacing={2.3}>
					{state?.members.map((e) => (
						<Grid item md={4} key={e._id}>
							<TeamMemberCard name={e.fullname} email={e.email} phone={e.phone} date={MemberDateFormatter(e.created_on)} />
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
};

const mapStateToProps = ({ auth }) => {
	return { islogisticsLead: auth.logisticsLead };
};
export default connect(mapStateToProps)(Home);
