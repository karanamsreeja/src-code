import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { INRFormatter, OrderDateFormatter } from 'helpers/formatter';
import { axiosGet, axiosPost } from 'helpers/axios';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';
import { pickupActions } from 'store/action/pickupAction';
import { Link, useNavigate } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
	listItem: {
		padding: '29px 36px 23px',
		marginBottom: '11px',
		background: '#F5F5F5',
		borderRadius: '6px',
	},
	stepcompleted: {
		'& p': {
			fontWeight: 'bold !important',
			color: '#212121 !important',
		},
	},
	stepactive: {
		'& p': {
			fontWeight: 'bold !important',
			color: '#212121 !important',
		},
	},
	stepdisabled: {
		'& p': {
			fontWeight: '400 !important',
			color: '#616161 !important',
		},
	},
	dialog: {
		maxWidth: '400px',
		width: '100%',
	},
}));

const steps = ['Order Received', 'Order Confirmed', 'Kit Dispatched', 'Kit Delivered'];

const QontoConnector = styled(StepConnector)(() => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#06225C',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#06225C',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: '#06225C',
		borderTopWidth: 2,
	},
}));

const QontoStepIconRoot = styled('div')(() => ({
	display: 'flex',
	height: 22,
	alignItems: 'center',
}));

function QontoStepIcon({ completed, className }) {
	return (
		<QontoStepIconRoot className={className}>
			{completed ? (
				<img src='/assets/icons/stepper-active-right.svg' alt='stepper-active-right' style={{ height: '26px' }} />
			) : (
				<img src='/assets/icons/circle.svg' alt='circle' style={{ height: '26px' }} />
			)}
		</QontoStepIconRoot>
	);
}

function OrderDetails({ id, handleViewOrderList, addPickup, deleteAuth }) {
	const classes = useStyle();
	const navigate = useNavigate();
	const [state, setState] = useState(null);
	const [loading, setloading] = useState(null);
	const [init, setinit] = useState(false);

	useEffect(() => {
		async function getData() {
			setloading({ message: 'Fetching orders...' });
			const res = await axiosGet('/orders/details?order_id=' + id, {}, setloading, () => deleteAuth('/user/account/order'));

			if (res.status === 200) {
				let order = res.data.order;

				order.address_id = order.address._id;
				order.schedule = res.data.scheduleRemaining !== 0;

				const address =
					[order.address.address, order.address.landmark, order.address.city, order.address.state].filter((e) => e !== '').join(', ') +
					' - ' +
					order.address.zip;
				order.address = address;

				if (order.status === 'paid') {
					order.status = 1;
				} else if (order.status === 'dispatch_initiated' || order.status === 'dispatch_paused' || order.status === 'dispatch_assigned') {
					order.status = 2;
				} else if (order.status === 'dispatch_collected') {
					order.status = 3;
				} else if (order.status === 'dispatch_completed') {
					order.status = 4;
				} else {
					order.status = 0;
				}

				setState(order);
			}
			if (res.status >= 400) {
				handleViewOrderList();
			}
		}

		if (init) return;
		setinit(true);
		getData();
	}, [init, id, deleteAuth, handleViewOrderList]);

	const handlePickup = async () => {
		setloading({ message: 'Schedule a Pickup slot...' });

		const slot = await axiosPost('/pickups/schedule/create', { address_id: state.address_id }, setloading);
		if (slot.status === 201) {
			addPickup(slot.data.scheduled_on._id, {
				user: slot.data.scheduled_on.user,
				address: { address: state.address, addressId: state.address_id },
				kits: slot.data.scheduled_on.kits,
			});
			navigate('/user/dashboard/schedule-pickup/' + slot.data.scheduled_on._id);
		}
	};

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Stack direction='row' sx={{ mb: '30px' }}>
				<IconButton aria-label='delete' sx={{ transform: 'translateX(-16px)' }} onClick={handleViewOrderList}>
					<img src='/assets/icons/arrow-left.svg' alt='arrow-left' />
				</IconButton>
				<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' sx={{ transform: 'translate(-10px, 8px)' }}>
					Back
				</Typography>
			</Stack>

			<Stack direction='row' sx={{ justifyContent: 'space-between', mb: '23px' }}>
				<div>
					<Typography variant='caption' fontSize='10px' letterSpacing='1px' lineHeight='20px' fontWeight='bold' color='text.darkYellow'>
						ORDER NUMBER
					</Typography>
					<Typography variant='h5' fontWeight='bold' color='#212121'>
						#{id}
					</Typography>
				</div>
				<div>
					<Typography variant='caption' fontSize='10px' letterSpacing='1px' lineHeight='20px' fontWeight='bold' color='text.greyLightText'>
						ORDERED ON
					</Typography>
					<Typography variant='subtitle2' fontWeight='bold' color='#212121'>
						{OrderDateFormatter(state?.ordered_on, { month: 'short' })}
					</Typography>
				</div>
			</Stack>

			<Grid container className={classes.listItem} style={{ marginBottom: '39px' }}>
				<Grid item xs>
					<Stepper alternativeLabel activeStep={state?.status} connector={<QontoConnector />} sx={{ width: '100%', maxWidth: '725px' }}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel
									StepIconComponent={QontoStepIcon}
									classes={{
										label: 'mt-10',
										completed: classes.stepcompleted,
										active: classes.stepactive,
										disabled: classes.stepdisabled,
									}}
								>
									<Typography variant='subtitle2' lineHeight='22px' component='p'>
										{label}
									</Typography>
								</StepLabel>
							</Step>
						))}
					</Stepper>
				</Grid>
			</Grid>

			<Grid container spacing={4} sx={{ marginBottom: '46px' }}>
				<Grid container item md={5} xs={12} spacing={3}>
					<Grid item>
						<img src='/assets/order-default.png' alt='order-default' style={{ width: '139px', height: '106px' }} />
					</Grid>
					<Grid container alignItems='center' item xs>
						<div>
							<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='#212121'>
								Gut Health Kit {/* TODO name to be replace */}
							</Typography>
							<Typography variant='subtitle2' fontWeight={500} color='text.greyLightText' sx={{ mb: '11px' }}>
								Quantity: {state?.cart?.kits.length}
							</Typography>
							<Typography variant='h5' fontWeight='bold' color='text.darkYellow'>
								{state?.cart.price && INRFormatter(state?.cart.price)}
							</Typography>
						</div>
					</Grid>
				</Grid>

				<Grid item md={7} xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div style={{ width: '68%' }}>
						<Typography variant='subtitle2' fontWeight='bold' color='#212121' lineHeight='20px'>
							Shipping Address (Home)
						</Typography>
						<Typography variant='caption' fontWeight={400} color='text.greyLightText' lineHeight='20px' sx={{ mb: '11px' }}>
							{state?.address}
						</Typography>
					</div>
					<div>
						{state?.status === 4 && state?.schedule && (
							<Button variant='outlined' size='small' color='darkYellow' onClick={handlePickup} disabled={loading !== null}>
								<Typography variant='subtitle2' fontWeight='bold'>
									Schedule Pickup
								</Typography>
							</Button>
						)}
						{state?.status < 4 && (
							<Button variant='outlined' size='small' color='darkYellow'>
								<Typography variant='subtitle2' fontWeight='bold'>
									Cancel Order
								</Typography>
							</Button>
						)}
					</div>
				</Grid>
			</Grid>

			<Divider sx={{ mb: '28px' }} />

			<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
				Billing Summary
			</Typography>
			<Grid item xs={12}>
				<Grid container spacing={1.5} sx={{ mt: '0' }}>
					<Grid container item xs={12} justifyContent='space-between' sx={{ mb: '7px' }}>
						<Typography variant='subtitle2' fontWeight={400} color='text.greyLightText'>
							Subtotal
						</Typography>
						<Typography variant='subtitle2' fontWeight='bold' color='text.greyLightText'>
							{state?.cart.price && INRFormatter(state?.cart.price)}
						</Typography>
					</Grid>
					<Grid container item xs={12} justifyContent='space-between' sx={{ mb: '7px' }}>
						<Typography variant='subtitle2' fontWeight={400} color='text.greyLightText'>
							Discount
						</Typography>
						<Typography variant='subtitle2' fontWeight='bold' color='text.greyLightText'>
							- ₹0.00
						</Typography>
					</Grid>
					<Grid container item xs={12} justifyContent='space-between'>
						<Typography variant='subtitle2' fontWeight={400} color='text.greyLightText'>
							Shipping
						</Typography>
						<Typography variant='subtitle2' fontWeight='bold' color='text.greyLightText'>
							₹0.00
						</Typography>
					</Grid>
				</Grid>
				<Divider sx={{ mt: '25px', mb: '18px' }} />
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant='h5' fontWeight='bold' color='#212121'>
						Grand Total
					</Typography>
					<Typography variant='h5' fontWeight='bold' color='#212121'>
						{state?.cart.price && INRFormatter(state?.cart.price)}
					</Typography>
				</div>
			</Grid>
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAuth: (redirectUrl) => dispatch(authActions.delete(redirectUrl)),
		addPickup: (id, payload) => dispatch(pickupActions.add(id, payload)),
	};
};

export default connect(null, mapDispatchToProps)(OrderDetails);
