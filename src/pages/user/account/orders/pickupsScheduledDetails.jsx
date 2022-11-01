import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { axiosGet } from 'helpers/axios';
import { connect } from 'react-redux';
import { orderActions } from 'store/action/orderActions';
import { useNavigate } from 'react-router-dom';

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

const steps = ['Pickup Scheduled', 'Out for Pickup', 'Sample Picked Up', 'Sample Accepted', 'Reports Delivered'];

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

function OrderDetails({ id, handleViewOrderList, addOrder }) {
	const classes = useStyle();
	const navigate = useNavigate();
	const [state, setState] = useState(null);
	const [loading, setloading] = useState(null);
	const [init, setinit] = useState(false);

	useEffect(() => {
		async function getData() {
			setloading({ message: 'Fetching orders...' });
			const res = await axiosGet('/pickups/register-kit', { pickupId: id }, setloading);

			if (res.status === 200) {
				let order = res.data.pickup;

				const address =
					[order.address.address, order.address.landmark, order.address.city, order.address.state].filter((e) => e !== '').join(', ') +
					' - ' +
					order.address.zip;
				order.address = address;

				switch (order.status) {
					case 'pickup_scheduled':
						order.status = 1;
						break;
					case 'pickup_assigned':
						order.status = 2;
						break;
					case 'pickup_collected':
					case 'pickup_completed':
						order.status = 3;
						break;
					case 'sample_approved':
						order.status = 4;
						break;
					case 'report_uploaded':
						order.status = 5;
						break;
					default:
						order.status = 0;
				}
				order.date = new Date(order.date).toLocaleDateString('en-IN', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});

				setState(order);
			}
			if (res.status >= 400) {
				// handleViewOrderList();
			}
		}

		if (init) return;
		setinit(true);
		getData();
	}, [init, id, handleViewOrderList]);

	const handlePickup = () => {
		addOrder(id, state);
		navigate('/user/dashboard/schedule-pickup/' + id);
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

			<div style={{ marginBottom: '23px' }}>
				<Typography variant='caption' fontSize='10px' letterSpacing='1px' lineHeight='20px' fontWeight='bold' color='text.darkYellow'>
					REQUEST ID
				</Typography>
				<Typography variant='h5' fontWeight='bold' color='#212121'>
					#{id}
				</Typography>
			</div>

			<Grid container className={classes.listItem} style={{ marginBottom: '35px' }}>
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

			<Grid container spacing={4}>
				<Grid item md={8}>
					<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='#212121' gutterBottom>
						Date & Time of Pick up
					</Typography>
					<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '31px' }}>
						{state?.date} between {state?.time}
					</Typography>

					<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='#212121' sx={{ mb: '10px' }}>
						Pick up Address
					</Typography>
					<Typography variant='subtitle2' fontWeight='bold' lineHeight='20px' color='#212121' sx={{ mb: '1px' }}>
						Home
					</Typography>
					<Typography
						variant='subtitle2'
						fontWeight={400}
						lineHeight='22px'
						color='text.greyLightText'
						sx={{ mb: '31px', maxWidth: '80%' }}
					>
						{state?.address}
					</Typography>

					{state?.kits.map((e) => (
						<div key={e._id}>
							{console.log(e)}
							<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='#212121' sx={{ mb: '10px' }}>
								Registered Kits
							</Typography>
							<Typography variant='subtitle2' fontWeight='bold' lineHeight='20px' color='#212121' sx={{ mb: '1px' }}>
								#{e._id}
							</Typography>
							<Typography variant='subtitle2' fontWeight={400} lineHeight='22px' color='text.greyLightText' sx={{ mb: '19px' }}>
								{e.patient_id.firstname + ' ' + e.patient_id.lastname}
							</Typography>
						</div>
					))}
				</Grid>
				<Grid container item md={4} justifyContent='flex-end' alignItems='center'>
					{state?.status === 1 && (
						<Button variant='outlined' size='small' color='darkYellow' onClick={handlePickup}>
							<Typography variant='subtitle2' fontWeight='bold'>
								Cancel Pickup
							</Typography>
						</Button>
					)}
					{state?.status === 5 && (
						<Button variant='outlined' size='small' color='darkYellow'>
							<Typography variant='subtitle2' fontWeight='bold'>
								Download Reports
							</Typography>
						</Button>
					)}
				</Grid>
			</Grid>
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		addOrder: (id, payload) => dispatch(orderActions.add(id, payload)),
	};
};

export default connect(null, mapDispatchToProps)(OrderDetails);
