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

import { INRFormatter, OrderDateTimeFormatter } from 'helpers/formatter';
import { axiosGet, axiosPut } from 'helpers/axios';
import { Link, useParams } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
	container: {
		paddingTop: '58px',
		paddingBottom: '48px',
		[theme.breakpoints.up(1200)]: {
			paddingLeft: '94px',
			paddingRight: '94px',
		},
	},
	box: {
		borderRadius: '4px',
		border: '1px solid #E0E0E0',
	},
	stack: {
		padding: '32px',
		background: '#F5F5F5',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '43px',
	},
}));

function OrderDetails({ handleViewOrderList }) {
	const classes = useStyle();
	const [state, setState] = useState({});
	const [loading, setloading] = useState({ message: 'Fetching orders...' });
	const [init, setinit] = useState(false);
	let { id } = useParams();

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/orders/details', { order_id: id }, setloading);

			if (res.status === 200) {
				let product_details = {};

				product_details.status = res.data.order.status;
				product_details.order_on = OrderDateTimeFormatter(res.data.order.ordered_on, { month: 'long' });
				product_details.kitname = res.data.order.cart.kits[0]?.product.name;
				product_details.kits = res.data.order.cart.kits.length;
				product_details.kitIds = res.data.order.cart.kits.map((kit) => kit._id);
				product_details.price = INRFormatter(res.data.order.cart.price);
				product_details.method = 'Credit Card';
				product_details.user = res.data.order.cart.user;
				product_details.phone = res.data.order.address.phone;
				product_details.address = [
					res.data.order.address.address,
					res.data.order.address.landmark,
					res.data.order.address.city,
					res.data.order.address.state,
					res.data.order.address.zip,
				]
					.filter((e) => e !== '')
					.join(', ');
				product_details.addressType = res.data.order.address.address_type;
				setState(product_details);
			}
			if (res.status >= 400) {
				handleViewOrderList();
			}
		}

		if (init) return;
		setinit(true);
		getData();
	}, [init, id, handleViewOrderList]);

	const handleInitiatePickup = async () => {
		setloading({ message: 'Initiate pickup...' });
		const res = await axiosPut('/warehouse/orders/active/initiate', { order_id: id }, setloading);

		if (res.status === 200) {
			setState((pre) => ({ ...pre, status: 'dispatch_initiated' }));
		}
	};

	const handlePausePickup = async () => {
		setloading({ message: 'Pause pickup...' });
		const res = await axiosPut('/warehouse/orders/active/pause', { order_id: id }, setloading);

		if (res.status === 200) {
			setState((pre) => ({ ...pre, status: 'dispatch_paused' }));
		}
	};

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className='container-x'>
				<Stack direction='row' sx={{ mb: '30px' }}>
					<IconButton
						aria-label='delete'
						sx={{ transform: 'translateX(-16px)' }}
						onClick={handleViewOrderList}
						component={Link}
						to='/warehouse/active-orders'
					>
						<img src='/assets/icons/arrow-left.svg' alt='arrow-left' />
					</IconButton>
					<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' sx={{ transform: 'translate(-10px, 8px)' }}>
						Back
					</Typography>
				</Stack>

				<div className={classes.box}>
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
								ORDER NUMBER
							</Typography>
							<Typography variant='h5' fontWeight='bold' color='#212121'>
								#{id}
							</Typography>
							<Typography
								variant='caption'
								fontSize='10px'
								letterSpacing='1px'
								lineHeight='20px'
								fontWeight='bold'
								color='text.greyLightText'
								textTransform='uppercase'
							>
								ORdered on: {state.order_on}
							</Typography>
						</div>
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
								INITIATE PICKUP
							</Typography>
							{(state.status === 'dispatch_paused' || state.status === 'paid') && (
								<Typography
									variant='subtitle2'
									fontWeight='bold'
									color='text.darkerYellow'
									sx={{ textDecoration: 'underline', cursor: 'pointer' }}
									onClick={handleInitiatePickup}
								>
									Ready for Pickup
								</Typography>
							)}
							{state.status === 'dispatch_initiated' && (
								<Typography
									variant='subtitle2'
									fontWeight='bold'
									color='text.darkerYellow'
									sx={{ textDecoration: 'underline', cursor: 'pointer' }}
									onClick={handlePausePickup}
								>
									Pause Pickup
								</Typography>
							)}
						</div>
					</Stack>

					<div style={{ padding: '32px' }}>
						<Grid container spacing={4} sx={{ marginBottom: '46px' }}>
							<Grid container item md={5} xs={12} spacing={3}>
								<Grid item>
									<img src='/assets/order-default.png' alt='order-default' style={{ width: '139px', height: '106px' }} />
								</Grid>
								<Grid container alignItems='center' item xs>
									<div>
										<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='#212121'>
											{state.kitname}
										</Typography>
										<Typography variant='subtitle2' fontWeight={500} color='text.greyLightText' sx={{ mb: '11px' }}>
											Quantity: {state.kits}
										</Typography>
										<Typography variant='h5' fontWeight='bold' color='text.darkYellow'>
											{state.price}
										</Typography>
									</div>
								</Grid>
							</Grid>

							<Grid item md={7} xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<div style={{ width: '68%' }}>
									<Typography variant='subtitle2' fontWeight='bold' color='#212121' lineHeight='20px'>
										Shipping Address ({state.addressType})
									</Typography>
									<Typography variant='caption' fontWeight={400} color='text.greyLightText' lineHeight='20px' sx={{ mb: '11px' }}>
										{state.address}
									</Typography>
								</div>
								<div>
									<Button variant='outlined' size='small' color='darkYellow' sx={{ borderRadius: '4px' }}>
										<Typography variant='subtitle2' fontWeight='bold'>
											Print Labels
										</Typography>
									</Button>
								</div>
							</Grid>
							<Grid item md={12} xs={12}>
								<Typography variant='subtitle2' fontWeight='bold' color='#212121' lineHeight='20px'>
									Kit Ids
								</Typography>
								{state.kitIds?.map((kit, index) => (
									<Typography
										variant='caption'
										fontWeight={400}
										color='text.greyLightText'
										lineHeight='20px'
										sx={{ mb: '11px' }}
										key={index}
										component='div'
									>
										{kit}
									</Typography>
								))}
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
