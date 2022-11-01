import React, { useEffect, useRef, useState } from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import { Link, useNavigate } from 'react-router-dom';

import Box from 'components/Box';
import CollapsableBox from 'components/site/CollapsableBox';
import InputLabel from 'components/site/InputLabel';
import LoadingScreen from 'components/site/LoadingScreen';

import { loadScript } from 'helpers/script-loader';
import { INRFormatter } from 'helpers/formatter';
import { axiosPost } from 'helpers/axios';
import axios from 'axios';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';
import { cartActions } from 'store/action/cartAction';

const centerContainerStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	pt: '125px',
};

function Payment({ email, fullname, updateAddress, cart, clearCart }) {
	const navigate = useNavigate();
	const [loading, setloading] = useState(null);
	const [paymentSuccess, setpaymentSuccess] = useState(false);
	const timer = useRef();

	useEffect(() => {
		if (!cart?.address.address) {
			if (!paymentSuccess) {
				console.log('ji');
				navigate('/site/cart/information', { replace: true });
			}
		}
	}, [cart, paymentSuccess, navigate]);

	useEffect(() => {
		return () => {
			timer.current && clearTimeout(timer.current);
		};
	}, []);

	const verifyPayment = async (data) => {
		try {
			setloading({ message: 'Verifying payment...' });
			const res = await axios.post(`${process.env.REACT_APP_API_BASEURL}/orders/payment/verify`, data);

			if (res.status === 200) {
				setpaymentSuccess(true);
				updateAddress({});
				clearCart();
				timer.current = setTimeout(() => {
					navigate('/user/dashboard', { replace: true });
				}, 5000);
			}
		} catch (error) {}
	};

	async function initiatePayment() {
		setloading({ message: 'Processing payment...' });
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

		if (!res) {
			setloading(null);
			alert('Razorpay SDK failed to load. Are you online?');
			return;
		}

		const paymentInfo = await axiosPost(`/orders/payment`, {}, setloading);

		if (paymentInfo.status === 200) {
			const data = paymentInfo.data.payment;
			const options = {
				key: 'rzp_test_a83bqo8ZolpK94',
				currency: data.razorpay.currency,
				amount: data.razorpay.amount.toString(),
				order_id: data.razorpay.id,
				name: 'IOM',
				description: 'Thank you for being a valuable member of IOM.',
				image: '/assets/logo.svg',
				handler: function (response) {
					verifyPayment(response);
				},
				prefill: {
					email,
					name: fullname,
				},
				theme: {
					color: '#06225C',
				},
			};

			const paymentObject = new window.Razorpay(options);
			paymentObject.open();
			paymentObject.on('payment.failed', function (response) {
				// if (response?.error?.metadata) {
				// 	verifyPayment({
				// 		description: response.error.description,
				// 		reason: response.error.reason,
				// 		razorpay_order_id: response.error.metadata.order_id,
				// 		razorpay_payment_id: response.error.metadata.payment_id,
				// 		razorpay_signature: '',
				// 	});
				// }
			});
		}
	}

	if (paymentSuccess) {
		return (
			<Container sx={centerContainerStyle}>
				<img src='/assets/icons/border-right.svg' alt='payment done' style={{ maxWidth: '185px', marginBottom: '26px' }} />

				<Typography variant='h5' fontWeight='bold' color='text.darkBlue' sx={{ mb: '17px' }}>
					Your order has been successfully placed
				</Typography>
				<Typography variant='subtitle2' color='text.greyLight' fontWeight={400} textAlign='center' sx={{ width: '30%' }}>
					Sit and relax while your orders is being worked on. You will recieve your kit by xx/xx/xxxx
				</Typography>
			</Container>
		);
	}

	return (
		<Container sx={{ pt: '50px' }}>
			{loading && <LoadingScreen message={loading?.message} />}
			<Breadcrumbs separator='›' aria-label='breadcrumb' style={{ marginBottom: '10px' }}>
				<Typography variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' color='text.darkBlue' letterSpacing='1.5px'>
					Patient Details
				</Typography>
				<Typography color='text.darkBlue' variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' letterSpacing='1.5px'>
					information
				</Typography>
				<Typography
					variant='caption'
					fontSize='10px'
					textTransform='uppercase'
					fontWeight='bold'
					color='text.darkerYellow'
					letterSpacing='1.5px'
				>
					payment
				</Typography>
			</Breadcrumbs>

			<Grid container spacing={2}>
				<Grid item md={7} xs={12}>
					<Grid item xs={12}>
						<Box sx={{ p: '20px', mb: '16px' }}>
							<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
								Shipping Details
							</Typography>
							<Grid container sx={{ background: 'rgb(228 191 68 / 14%)', borderRadius: '4px', p: '15px 18px', mt: '16px' }}>
								<Grid item md={2} xs={12}>
									<Typography variant='subtitle2' fontWeight='bold' color='text.greyLight'>
										Contact
									</Typography>
								</Grid>
								<Grid item md={8} xs={12}>
									<Typography variant='subtitle2' color='text.darkBlue'>
										{email}
									</Typography>
								</Grid>
								<Grid item md={2} xs={12}>
									<Typography variant='subtitle2' fontWeight='bold' color='text.darkYellow' textAlign='end'>
										{/* Change */}
									</Typography>
								</Grid>
							</Grid>
							<Grid container sx={{ background: 'rgb(228 191 68 / 14%)', borderRadius: '4px', p: '15px 18px', mt: '16px' }}>
								<Grid item md={2} xs={12}>
									<Typography variant='subtitle2' fontWeight='bold' color='text.greyLight'>
										Ship to
									</Typography>
								</Grid>
								<Grid item md={8} xs={12}>
									<Typography variant='subtitle2' color='text.darkBlue'>
										{cart?.address?.address}
									</Typography>
								</Grid>
								<Grid item md={2} xs={12} sx={{ textAlign: 'end' }}>
									<Typography
										variant='subtitle2'
										fontWeight='bold'
										color='text.darkYellow'
										component={Link}
										to='/site/cart/information'
									>
										Change
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Grid>

					<Grid container item xs={12} justifyContent='space-between'>
						<Button
							color='darkYellow'
							sx={{ padding: '10px 20px', pl: { sm: '0', xs: '20px' }, width: { sm: 'auto', xs: '100%' } }}
							component={Link}
							to='/site/cart/information'
						>
							Back to Information
						</Button>
						<Button
							variant='contained'
							color='darkBlue'
							sx={{ padding: '10px 20px', width: { sm: 'auto', xs: '100%' } }}
							onClick={initiatePayment}
						>
							Make Payment
						</Button>
					</Grid>
				</Grid>
				<Grid item md={5} xs={12}>
					<Grid item xs={12}>
						<CollapsableBox title='Order Review' defaultOpen>
							<Grid container spacing={2} sx={{ mt: '0' }}>
								<Grid container spacing={2} item md={8} xs={12}>
									<Grid item xs={4}>
										<img src='/assets/cart-box.png' alt='cart-box' style={{ maxWidth: '100%' }} />
									</Grid>
									<Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
										<Typography variant='subtitle2' color='text.darkBlue' fontWeight='bold'>
											{cart?.productName}
										</Typography>
										<div style={{ marginLeft: '-8px' }}>
											<IconButton aria-label='delete' disabled>
												<img src='/assets/icons/decrease-btn.svg' alt='decrease' />
											</IconButton>
											<Typography variant='subtitle2' component='span'>
												{cart?.totalCart || 0}
											</Typography>
											<IconButton aria-label='delete' disabled>
												<img src='/assets/icons/increase-btn.svg' alt='increase' />
											</IconButton>
										</div>
									</Grid>
								</Grid>
								<Grid container item md={4} xs={12} justifyContent='end' alignItems='center'>
									<Typography variant='h6' fontWeight='bold' fontSize='22px' color='text.darkBlue'>
										{INRFormatter(cart?.price || 0)}
									</Typography>
								</Grid>
							</Grid>
						</CollapsableBox>
					</Grid>
					<Grid item xs={12}>
						<CollapsableBox title='Discount Codes' defaultOpen>
							<Grid container spacing={2} sx={{ mt: '0' }}>
								<Grid container spacing={2} item xs={12}>
									<Grid item xs={12}>
										<TextField
											label={<InputLabel title='Enter your coupon code' />}
											size='small'
											value={cart?.coupon}
											fullWidth
											disabled
										/>
									</Grid>
								</Grid>
							</Grid>
						</CollapsableBox>
					</Grid>
					<Grid item xs={12}>
						<CollapsableBox title='Billing Summary' defaultOpen>
							<Grid container spacing={1.5} sx={{ mt: '0' }}>
								<Grid container item xs={12} justifyContent='space-between'>
									<Typography variant='subtitle2' fontWeight={400} color='#616161'>
										Subtotal
									</Typography>
									<Typography variant='subtitle2' fontWeight='bold' color='#616161'>
										{INRFormatter(cart?.actual_price || '0.00')}
									</Typography>
								</Grid>
								<Grid container item xs={12} justifyContent='space-between'>
									<Typography variant='subtitle2' fontWeight={400} color='#616161'>
										Discount
									</Typography>
									<Typography variant='subtitle2' fontWeight='bold' color='#616161'>
										- {INRFormatter(cart?.discount || '0.00')}
									</Typography>
								</Grid>
								<Grid container item xs={12} justifyContent='space-between'>
									<Typography variant='subtitle2' fontWeight={400} color='#616161'>
										Shipping
									</Typography>
									<Typography variant='subtitle2' fontWeight='bold' color='#616161'>
										₹0.00
									</Typography>
								</Grid>
							</Grid>
							<Divider sx={{ mt: '24px', mb: '18px' }} />
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography variant='h5' fontWeight='bold' color='#212121'>
									Grand Total
								</Typography>
								<Typography variant='h5' fontWeight='bold' color='#212121'>
									{INRFormatter(cart?.price || 0)}
								</Typography>
							</div>
						</CollapsableBox>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

const mapStateToProps = ({ auth, cart }) => {
	return { email: auth.email, fullname: auth.fullname, cart };
};
const mapDispatchToProps = (dispatch) => {
	return {
		updateAddress: (state) => dispatch(authActions.updateCart('address', state)),
		clearCart: () => dispatch(cartActions.clear()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
