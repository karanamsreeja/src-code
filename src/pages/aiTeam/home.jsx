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
import { prepareDashboardState } from 'services/aiTeam/dashboard';

const Home = () => {
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState({
		received: 0,
		ongoingTest: 0,
		completedTest: 0,
		rejected: 0,
		members: [],
	});

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/ai/dashboard', {}, setloading);

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

				<Grid container spacing={1.6} sx={{ mb: '45px' }}>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								New Data Recieved
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.data_uploaded}
							</Typography>
						</Sheet>
					</Grid>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								Active Processing
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.data_processing}
							</Typography>
						</Sheet>
					</Grid>
					<Grid item md={4} xs={12}>
						<Sheet>
							<Typography variant='h5' fontWeight={400} color='text.greyLightText' sx={{ mb: '9px' }}>
								Submitted Reports
							</Typography>
							<Typography variant='h3' lineHeight={1} fontWeight='bold' color='#212121'>
								{state.reports_uploaded}
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
							<TeamMemberCard name={e.fullname} email={e.email} phone={e.phone} date={MemberDateFormatter(e.created_on)} />
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
};

export default Home;
