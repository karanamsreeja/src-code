import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { OrderDateFormatter,  } from 'helpers/formatter';
import { axiosGet, axiosPut } from 'helpers/axios';
import { Link, useParams } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
	container: {
		paddingTop: '58px',
		paddingBottom: '48px',
		[theme.breakpoints.up(1200)]: {
			paddingLeft: '94px',
			paddingRight: '94px',
			maxWidth: '1500px',
		},
	},
	box: {
		borderRadius: '4px',
		border: '1px solid #E0E0E0',
		overflow: 'hidden',
	},
	stack: {
		padding: '32px',
		background: '#F5F5F5',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '43px',
		flexWrap: 'wrap',
	},
}));

function OrderDetails() {
	const classes = useStyle();
	const [state, setState] = useState({});
	const [loading, setloading] = useState({ message: 'Fetching orders...' });
	const [init, setinit] = useState(false);
	let { id } = useParams();

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/pickups/register-kit', { pickupId: id }, setloading);

			if (res.status === 200) {
				let product_details = {};

				product_details.canDelivered = true;
				product_details.assignTo = res.data.pickup.pickedup_by.fullname;
				product_details.pickup_on = OrderDateFormatter(res.data.pickup.date) + ' | ' + res.data.pickup.time;
				product_details.kitname = res.data.pickup.kits[0]?.product.name;
				product_details.kits = res.data.pickup.kits;
				product_details.method = 'Credit Card';
				product_details.user = res.data.pickup.user;
				product_details.phone = res.data.pickup.address.phone;
				product_details.address = [
					res.data.pickup.address.address,
					res.data.pickup.address.landmark,
					res.data.pickup.address.city,
					res.data.pickup.address.state,
					res.data.pickup.address.zip,
				]
					.filter((e) => e !== '')
					.join(', ');

				setState(product_details);
			}
		}

		if (init) return;
		setinit(true);
		getData();
	}, [init, id]);

	const handleOrderPickedUp = async () => {
		setloading({ message: 'Processing order picked up ...' });
		const res = await axiosPut('/logistics/pickups/collected', { order_id: id }, setloading);

		if (res.status === 200) setState((pre) => ({ ...pre, canDelivered: false }));
	};

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className={classes.container}>
				<Stack direction='row' sx={{ mb: '30px' }}>
					<IconButton aria-label='delete' sx={{ transform: 'translateX(-16px)' }} component={Link} to='/logistics/pickups/my-pickup'>
						<img src='/assets/icons/arrow-left.svg' alt='arrow-left' />
					</IconButton>
					<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' sx={{ transform: 'translate(-10px, 8px)' }}>
						Back
					</Typography>
				</Stack>

				<div className={classes.box}>
					<div style={{ padding: '15px 32px', background: '#25468A' }}>
						<Typography variant='caption' letterSpacing='1px' lineHeight='20px' fontWeight='bold' color='white' textTransform='uppercase'>
							Date and time of requested pickup: {state.pickup_on}
						</Typography>
					</div>
					<Stack direction='row' className={classes.stack}>
						<div>
							<Typography
								variant='caption'
								fontSize='10px'
								letterSpacing='1px'
								lineHeight='20px'
								fontWeight='bold'
								color='text.darkYellow'
							>
								REQUEST ID
							</Typography>
							<Typography variant='h5' fontWeight='bold' color='#212121'>
								#{id}
							</Typography>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div>
								<Typography
									variant='caption'
									fontSize='10px'
									letterSpacing='1px'
									lineHeight='20px'
									fontWeight='bold'
									color='text.greyLightText'
									textAlign='end'
									component='div'
								>
									ASSIGNED TO
								</Typography>
								<Typography variant='subtitle2' fontWeight='bold' color='#212121'>
									{state.assignTo}
								</Typography>
							</div>
							{state.canDelivered && (
								<div>
									<Button
										variant='contained'
										size='small'
										color='Blue600'
										sx={{ borderRadius: '4px', marginLeft: { md: '50px' } }}
										onClick={handleOrderPickedUp}
									>
										<Typography variant='subtitle2' fontWeight='bold'>
											Order Picked Up
										</Typography>
									</Button>
								</div>
							)}
						</div>
					</Stack>

					<div style={{ padding: '32px' }}>
						<Grid container spacing={4} sx={{ marginBottom: '46px' }}>
							<Grid container item md={6} xs={12} spacing={3}>
								<Grid item>
									<img src='/assets/order-default.png' alt='order-default' style={{ width: '139px', height: '106px' }} />
								</Grid>
								<Grid container alignItems='center' item xs>
									<div>
										<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='#212121'>
											{`${state.kitname} (${state.kits?.length})`}
										</Typography>
										{state.kits?.map((e) => (
											<Typography
												variant='subtitle2'
												fontWeight={500}
												color='text.greyLightText'
												sx={{ mb: '11px' }}
												key={e._id}
											>
												KIT ID: {e._id}
											</Typography>
										))}
										<Typography variant='h5' fontWeight='bold' color='text.darkYellow'>
											{state.price}
										</Typography>
									</div>
								</Grid>
							</Grid>

							<Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<div style={{ width: '68%' }}>
									<Typography variant='subtitle2' fontWeight='bold' color='#212121' lineHeight='20px'>
										Shipping Address
									</Typography>
									<Typography variant='caption' fontWeight={400} color='text.greyLightText' lineHeight='20px' sx={{ mb: '11px' }}>
										{state.address}
									</Typography>
								</div>
							</Grid>
						</Grid>

						<Divider sx={{ mt: '49px', mb: '37px' }} />

						<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '30px' }}>
							Customer Details
						</Typography>
						<Stack direction='row' justifyContent='space-between'>
							<Typography variant='subtitle2' fontWeight={500} color='text.Blue600'>
								<img src='/assets/icons/person.svg' alt='person' style={{ transform: 'translateY(30%)', marginRight: '13px' }} />
								{state.user?.fullname}
							</Typography>
							<Typography variant='subtitle2' fontWeight={500} color='text.Blue600'>
								<img src='/assets/icons/email.svg' alt='email' style={{ transform: 'translateY(30%)', marginRight: '13px' }} />
								{state.user?.email}
							</Typography>
							<Typography variant='subtitle2' fontWeight={500} color='text.Blue600'>
								<img src='/assets/icons/phone.svg' alt='phone' style={{ transform: 'translateY(30%)', marginRight: '13px' }} />
								{state.phone}
							</Typography>
							<Typography variant='subtitle2' fontWeight={500} color='text.Blue600'>
								<img
									src='/assets/icons/credit_card.svg'
									alt='credit_card'
									style={{ transform: 'translateY(30%)', marginRight: '13px' }}
								/>

								{state.method}
							</Typography>
						</Stack>
					</div>
				</div>
			</Container>
		</>
	);
}

export default OrderDetails;
