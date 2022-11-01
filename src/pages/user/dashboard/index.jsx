import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProfileProgressCard from 'components/user/dashboard/ProfileProgressCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';

import classnames from 'classnames';
import LoadingBoxComponent from 'components/LoadingBoxComponent';

import Box from 'components/Box';
import CustomizedSteppers from 'components/user/dashboard/Stepper';
import { axiosGet } from 'helpers/axios';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
	cardLarge: {
		paddingTop: '87px !important',
		paddingBottom: '87px !important',
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
	orderBox: {
		padding: '20px 28px',
		width: '100%',
		height: '100%',
		boxShadow: 'none',
	},
	boxYellowLight: {
		background: 'rgba(225,171,59,0.2)',
	},
	boxdarkYellow: {
		background: theme.palette.background.darkYellow,
	},

	btnContainer: {
		display: 'flex',
	},
	spacer: {
		width: '11px',
		height: '1.5px',
		background: '#DEDEDE',
		transform: 'translateY(-1px)',
	},
}));

function Home() {
	const classes = useStyle();
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [active, setactive] = useState(0);
	const [orderList, setOrderList] = useState([]);
	const [state, setstate] = useState({
		profileData: {
			profile_picture: '/assets/user-default.png',
			title: 'Completed your Profile',
			subtitle: "You're almost there! Fill out the rest of the details to have a complete Iom profile.",
			profileProgress: 100,
		},
	});

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/users/dashboard', {}, () => {});
			const orders = await axiosGet('/orders', {}, setloading);
			let list = [];

			if (res.status === 200) {
				setstate({
					profileData: {
						profile_picture: '/assets/user-default.png',
						title: 'Completed your Profile',
						subtitle:
							'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the industry.',
						profileProgress: res.data.percentageCompleted,
					},
				});
			}
			if (orders.status === 200) {
				setOrderList(
					orders.data.orders.slice(0, 1).map((e) => {
						let obj = { id: e._id, type: 'order', totalStep: 3 };
						if (e.status === 'paid') {
							obj.status = 1;
							obj.text = 'Order Confirmed';
							obj.subtext = 'Thanks for taking the Iom Health Journey!We confirm that your order has been received.';
						} else if (
							e.status === 'dispatch_initiated' ||
							e.status === 'dispatch_paused' ||
							e.status === 'dispatch_assigned' ||
							e.status === 'dispatch_collected'
						) {
							obj.status = 2;
							obj.text = 'Kit Dispatched';
							obj.subtext = 'Thanks for taking the Iom Health Journey!We confirm that your order has been received.';
						} else if (e.status === 'dispatch_completed') {
							obj.status = 3;
							obj.text = 'Kit Delivered';
							obj.subtext = 'The kit has been delivered to your address. Kindly check the kit for next steps.';
						} else {
							obj.status = 0;
						}

						return obj;
					})
				);
			}

			const pickups = await axiosGet('/pickups', {}, setloading);

			if (pickups.status === 200) {
				list = pickups.data.scheduled_on.map((e) => {
					let obj = { id: e._id, type: 'pickups', totalStep: 4 };

					switch (e.status) {
						case 'pickup_scheduled':
							obj.status = 1;
							obj.text = 'Pick up Scheduled';
							obj.subtext = 'Our partner will pick your sample up at your preferred date and time.';
							break;
						case 'pickup_assigned':
							obj.status = 2;
							obj.text = 'Out for Pickup';
							obj.subtext = 'Our partner is out for pickup. Please hand over your sample in the envelope provided.';
							break;
						case 'pickup_collected':
						case 'pickup_completed':
							obj.status = 3;
							obj.text = 'Sample Picked Up';
							obj.subtext = 'Your sample has been picked up. Once it reaches the lab, a confirmation will be sent.';
							break;
						case 'sample_approved':
						case 'reports_uploaded':
							obj.status = 4;
							obj.text = 'Your Sample is ready for testing!';
							obj.subtext = 'Your sample has reached the lab and is ready to be tested.';
							break;
						case 'report_uploaded':
							obj.status = 5;
							obj.text = 'Your Report is in!';
							obj.subtext = 'Here is your personalized report, made just for you by our team of experts.';
							break;
						default:
							obj.status = 0;
					}

					return obj;
				});
				list.length > 0 && setOrderList((pre) => [...pre, ...list]);
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
				<Typography variant='h4' fontWeight='bold' color='text.darkBlue' gutterBottom>
					Welcome!
				</Typography>
				<Typography variant='subtitle2' fontWeight={400} color='text.lightBlue' sx={{ mb: '33px' }}>
					Here is an overview of all your Iom reports - ordered, delivered and pending.
				</Typography>

				<Grid container spacing={2.5}>
					<Grid item md={12} xs={12}>
						<Box className={classes.boxdarkYellow} sx={{ p: '17px 27px 22px 27px' }}>
							<Grid container spacing={4}>
								<Grid item md={9.5} xs={12}>
									<Typography variant='subtitle1' fontWeight='bold' color='text.darkBlue' sx={{ mb: '7px' }}>
										Book a Test Now!
									</Typography>
									<Typography variant='subtitle2' lineHeight='22px' color='text.darkBlue'>
										Ready to transform your health? Get started by booking an Iom health journey now!
									</Typography>
								</Grid>
								<Grid container alignItems='center' item md={2.5} xs={12}>
									<Button size='medium' variant='contained' fullWidth color='darkBlue' component={Link} to='/get-started'>
										<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
											Get Started
										</Typography>
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Grid>

					{state.profileData?.profileProgress !== 100 && (
						<Grid item md={12} sx={{ display: { md: 'block', xs: 'none' } }}>
							<ProfileProgressCard className={classes.cardLarge} center size='large' state={state.profileData} />
						</Grid>
					)}
					{state.profileData?.profileProgress !== 100 && (
						<Grid item xs={12} sx={{ display: { md: 'none', xs: 'block' } }}>
							<ProfileProgressCard state={state.profileData} />
						</Grid>
					)}
					{orderList[active] && (
						<Grid item md={5} xs={12}>
							<Box className={classnames(classes.orderBox, classes.boxYellowLight)}>
								<Typography variant='caption' fontWeight={500} color='#212121' textAlign='center' component='div' sx={{ mb: '10px' }}>
									Active Order -
									<Typography variant='caption' fontWeight='bold' color='text.darkBlue'>
										{` ${orderList[active]?.id}`}
									</Typography>
								</Typography>

								<CustomizedSteppers totalStep={orderList[active]?.totalStep} step={orderList[active]?.status} />

								<Typography variant='subtitle1' fontWeight='bold' color='#212121' textAlign='center' sx={{ mt: '22px', mb: '5px' }}>
									{orderList[active]?.text}
								</Typography>
								<Typography variant='caption' color='text.grey' textAlign='center' component='div' sx={{ mb: '17px' }}>
									{orderList[active]?.subtext}
								</Typography>
								<Button
									size='large'
									variant='contained'
									fullWidth
									color='darkYellow'
									sx={{ mb: '15px' }}
									component={Link}
									to={
										(orderList[active].type === 'pickups' ? '/user/account/pickup/' : '/user/account/order/') +
										orderList[active]?.id
									}
								>
									<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
										View Details
									</Typography>
								</Button>

								<Stack direction='row' alignItems='center' justifyContent='center' spacing={0.5}>
									{orderList.map((e, i) => (
										<IconButton aria-label='delete' size='small' key={i} onClick={() => setactive(i)}>
											<img src={active === i ? '/assets/icons/dot-active.svg' : '/assets/icons/dot.svg'} alt='dot' />
										</IconButton>
									))}
								</Stack>
							</Box>
						</Grid>
					)}

					<Grid item xs={12}>
						<Box sx={{ p: { md: '24px 39px', xs: '24px' } }}>
							<Typography variant='h6' fontWeight='bold' color='#212121' sx={{ mb: '24px' }}>
								Latest News
							</Typography>

							<Grid container spacing={3.7}>
								<Grid item md={4} xs={12}>
									<img src='/assets/news1.png' alt='news' style={{ height: '176px', width: '100%', marginBottom: '11px' }} />
									<div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
										<Typography
											variant='caption'
											fontWeight='bold'
											color='text.darkerYellow'
											textTransform='uppercase'
											letterSpacing='1px'
										>
											TYPE
										</Typography>
										&nbsp;
										<span className={classes.spacer} />
										&nbsp;
										<Typography variant='caption' color='text.grey'>
											5 mins read
										</Typography>
									</div>
									<Typography
										variant='subtitile1'
										fontWeight='bold'
										color='#212121'
										component='div'
										sx={{ width: { md: '80%', xs: '100%' } }}
										gutterBottom
									>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</Typography>
								</Grid>
								<Grid item md={4} xs={12}>
									<img src='/assets/news2.png' alt='news' style={{ height: '176px', width: '100%', marginBottom: '11px' }} />
									<div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
										<Typography
											variant='caption'
											fontWeight='bold'
											color='text.darkerYellow'
											textTransform='uppercase'
											letterSpacing='1px'
										>
											TYPE
										</Typography>
										&nbsp;
										<span className={classes.spacer} />
										&nbsp;
										<Typography variant='caption' color='text.grey'>
											5 mins read
										</Typography>
									</div>
									<Typography
										variant='subtitile1'
										fontWeight='bold'
										color='#212121'
										component='div'
										sx={{ width: { md: '80%', xs: '100%' } }}
										gutterBottom
									>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</Typography>
								</Grid>
								<Grid item md={4} xs={12}>
									<img src='/assets/news3.png' alt='news' style={{ height: '176px', width: '100%', marginBottom: '11px' }} />
									<div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
										<Typography
											variant='caption'
											fontWeight='bold'
											color='text.darkerYellow'
											textTransform='uppercase'
											letterSpacing='1px'
										>
											TYPE
										</Typography>
										&nbsp;
										<span className={classes.spacer} />
										&nbsp;
										<Typography variant='caption' color='text.grey'>
											5 mins read
										</Typography>
									</div>
									<Typography
										variant='subtitile1'
										fontWeight='bold'
										color='#212121'
										component='div'
										sx={{ width: { md: '80%', xs: '100%' } }}
										gutterBottom
									>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Home;
