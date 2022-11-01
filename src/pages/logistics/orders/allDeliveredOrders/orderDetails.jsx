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
import { axiosGet } from 'helpers/axios';
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
			const res = await axiosGet('/orders/details', { order_id: id }, setloading);

			if (res.status === 200) {
				let product_details = {};

				product_details.order_on = OrderDateTimeFormatter(res.data.order.ordered_on, { month: 'long' });
				product_details.deliver_on = OrderDateTimeFormatter(res.data.order.dispatch.dispatched_on);
				product_details.deliveredBy = res.data.order.dispatch.dispatched_by?.fullname;
				product_details.kitname = res.data.order.cart.kits[0]?.product.name;
				product_details.kits = res.data.order.cart.kits.length;
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

				setState(product_details);
			}
		}

		if (init) return;
		setinit(true);
		getData();
	}, [init, id]);

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className={classes.container}>
				<Stack direction='row' sx={{ mb: '30px' }}>
					<IconButton
						aria-label='delete'
						sx={{ transform: 'translateX(-16px)' }}
						component={Link}
						to='/logistics/orders/all-delivered-orders'
					>
						<img src='/assets/icons/arrow-left.svg' alt='arrow-left' />
					</IconButton>
					<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' sx={{ transform: 'translate(-10px, 8px)' }}>
						Back
					</Typography>
				</Stack>

				<div className={classes.box}>
					<div style={{ padding: '15px 32px', background: '#25468A' }}>
						<Typography variant='caption' letterSpacing='1px' lineHeight='20px' fontWeight='bold' color='white' textTransform='uppercase'>
							delivery on: {state.deliver_on}
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
								DELIVERED BY
							</Typography>
							<Typography variant='subtitle2' fontWeight='bold' color='#212121'>
								{state.deliveredBy}
							</Typography>
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
											QUANTITY: {state.kits}
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
						{console.log(state)}
					</div>
				</div>
			</Container>
		</>
	);
}

export default OrderDetails;
