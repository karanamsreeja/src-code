import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';

import moment from 'moment';
import classnames from 'classnames';

import Box from 'components/Box';
import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { pickupActions } from 'store/action/pickupAction';
import { useSnackbar } from 'notistack';
import { axiosGet, axiosPost } from 'helpers/axios';

const useStyle = makeStyles((theme) => ({
	root: {
		paddingTop: '56px',
		paddingBottom: '40px',
		paddingLeft: '0',
		paddingRight: '0',
		[theme.breakpoints.up('md')]: {
			maxWidth: '930px !important',
		},
	},
	dateBox: {
		width: '60px',
		height: '60px',
		padding: '11px 18px 10px',
		border: '1.2px solid #E0E0E0',
		borderRadius: '6px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		cursor: 'pointer',
		'& span': {
			color: '#757575',
		},
		'& h4': {
			color: '#212121',
		},
	},
	dateBoxActive: {
		background: '#E1AB3B',
		border: '1.2px solid #E1AB3B',
		color: 'white',
		'& span': {
			color: 'white',
		},
		'& h4': {
			color: 'white',
		},
	},
	timeBox: {
		padding: '11px 16px',
		border: '1.2px solid #E0E0E0',
		borderRadius: '30px',
		color: '#212121',
		cursor: 'pointer',
	},
	timeBoxActive: {
		background: '#E1AB3B',
		border: '1.2px solid #E1AB3B',
		color: 'white',
	},
	timeContainer: {
		width: 'calc(100% + 18px)',
		marginLeft: '-18px',
		'& >div': {
			paddingLeft: '18px !important',
		},
	},
}));
const centerContainerStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	padding: '0 !important',
};

function SchedulePickup({ pickup, addPickup, updatePickup }) {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setloading] = useState(null);
	const [popupOpen, setpopupOpen] = useState(false);
	const param = useParams();
	const classes = useStyle();
	const timeList = [
		'08 - 09 AM',
		'09 - 10 AM',
		'10 - 11 AM',
		'11 - 12 AM',
		'12 - 01 PM',
		'01 - 02 PM',
		'02 - 03 PM',
		'03 - 04 PM',
		'04 - 05 PM',
		'05 - 06 PM',
		'06 - 07 PM',
	];
	const [dayList, setDayList] = useState([]);
	const [state, setstate] = useState({});

	const [selectedDay, setselectedDay] = useState(-1);
	const [selectedTime, setselectedTime] = useState(-1);

	useEffect(() => {
		let list = [];
		const days = moment.weekdaysShort();
		for (let i = 0; i < 11; i++) {
			const date = moment(Date.now()).add(i, 'days');
			list.push([date.date(), days[date.day()], date.month(), date.year()]);
		}

		setDayList(list);
	}, []);

	useEffect(() => {
		async function getData() {
			const pickupId = param.id;

			// if (!(pickup && pickup[pickupId])) {
			setloading({ message: 'Fetching pickup details...' });
			const pickupDetails = await axiosGet('/pickups/register-kit', { pickupId }, setloading);
			if (pickupDetails.status === 200) {
				const obj = {
					address: {
						address:
							[
								pickupDetails.data.pickup.address.address,
								pickupDetails.data.pickup.address.landmark,
								pickupDetails.data.pickup.address.city,
								pickupDetails.data.pickup.address.state,
							]
								.filter((e) => e !== '')
								.join(', ') +
							' - ' +
							pickupDetails.data.pickup.address.zip,
						addressId: state.address_id,
					},
					kits: pickupDetails.data.pickup.kits,
				};

				setstate(obj);
				addPickup(pickupId, obj);
				setselectedTime(timeList.findIndex((e) => e === pickupDetails.data.pickup.time));
			}
			// }
			//  else {
			// 	setstate(pickup[pickupId]);
			// }
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async () => {
		if (selectedDay === -1) {
			enqueueSnackbar('Please select pickup date.', { variant: 'error' });
			return;
		}
		if (selectedTime === -1) {
			enqueueSnackbar('Please select timeslot.', { variant: 'error' });
			return;
		}

		setloading({ message: 'Register kit...' });
		const res = await axiosPost(
			'/pickups/schedule/set-datetime',
			{
				date: dayList[selectedDay][0],
				month: dayList[selectedDay][2],
				year: dayList[selectedDay][3],
				time: timeList[selectedTime],
				pickup_id: param.id,
			},
			setloading
		);
		if (res.status === 200) {
			updatePickup(param.id, { pickupDate: dayList[selectedDay], time: timeList[selectedDay] });
			navigate('register');
		}
	};

	return (
		<>
			<Container className='container-x'>
				<Breadcrumbs
					separator={
						<img src='/assets/icons/BreadcrumbsSeparator.svg' alt='BreadcrumbsSeparator' style={{ transform: 'translateY(11%)' }} />
					}
					aria-label='breadcrumb'
					style={{ marginBottom: '10px' }}
				>
					<Typography
						variant='caption'
						fontSize='10px'
						textTransform='uppercase'
						fontWeight='bold'
						color='text.darkerYellow'
						letterSpacing='1.5px'
					>
						Schedule a Pickup
					</Typography>
					<Typography variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
						Register the Kit
					</Typography>
					<Typography variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
						Confirmation
					</Typography>
				</Breadcrumbs>

				{loading && <LoadingBoxComponent message={loading.message} />}

				<Box sx={{ p: '37px 33px 33px 34px' }}>
					<Typography variant='h4' fontWeight='bold' color='#212121' sx={{ mb: '8px' }}>
						Schedule a Pickup
					</Typography>
					<Typography variant='subtitle2' fontWeight={400} lineHeight='22px' color='text.grey' sx={{ mb: '30px' }}>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
						ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
					</Typography>
					<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='text.darkBlue' sx={{ mb: '13px' }}>
						Pick a Date
					</Typography>

					<Grid container spacing={2.2}>
						{dayList?.map((e, i) => (
							<Grid item key={i}>
								<div
									className={classnames(classes.dateBox, selectedDay === i && classes.dateBoxActive)}
									onClick={() => setselectedDay(i)}
								>
									<Typography variant='caption' fontWeight={400} lineHeight='20px'>
										{e[1]}
									</Typography>
									<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px'>
										{e[0]}
									</Typography>
								</div>
							</Grid>
						))}
					</Grid>

					<Divider sx={{ mt: '40px', mb: '31px' }} />

					<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='text.darkBlue' sx={{ mb: '13px' }}>
						Pick a Time
					</Typography>
					<Grid container spacing={1.5} className={classes.timeContainer}>
						{timeList?.map((e, i) => (
							<Grid item key={i}>
								<div
									className={classnames(classes.timeBox, selectedTime === i && classes.timeBoxActive)}
									onClick={() => setselectedTime(i)}
								>
									<Typography variant='subtitle2' fontWeight='bold' lineHeight='22px'>
										{e}
									</Typography>
								</div>
							</Grid>
						))}
					</Grid>

					<Divider sx={{ mt: '40px', mb: '31px' }} />

					<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='text.darkBlue' sx={{ mb: '14px' }}>
						Choose Pick up Address
					</Typography>
					<Grid container sx={{ background: 'rgb(228 191 68 / 14%)', borderRadius: '4px', p: '24px 27px 24px 18px' }}>
						<Grid item sx={{ mr: '44px' }}>
							<Typography variant='subtitle2' fontWeight='bold' color='text.greyLight'>
								Ship to
							</Typography>
						</Grid>
						<Grid item xs>
							<Typography variant='subtitle2' color='text.darkBlue'>
								{state?.address?.address}
							</Typography>
						</Grid>
						<Grid item md={2} xs={12} sx={{ textAlign: 'end' }}>
							<Typography variant='subtitle2' fontWeight='bold' color='text.darkYellow'>
								Change
							</Typography>
						</Grid>
					</Grid>

					<div style={{ marginTop: '54px', textAlign: 'end' }}>
						<Button size='small' variant='contained' color='darkBlue' onClick={handleSubmit}>
							<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
								Register the Kit
							</Typography>
						</Button>
					</div>
				</Box>

				{popupOpen && (
					<Dialog
						open={popupOpen}
						onClose={() => setpopupOpen(false)}
						aria-labelledby='alert-dialog-title'
						aria-describedby='alert-dialog-description'
						classes={{ paper: classes.dialog }}
						sx={{ backdropFilter: 'blur(2px)', background: 'rgb(33 33 33 / 70%)' }}
					>
						<DialogContent sx={{ p: '43px 55px 50px' }}>
							<Container sx={centerContainerStyle}>
								<img src='/assets/icons/border-right.svg' alt='payment done' style={{ maxWidth: '185px', marginBottom: '20px' }} />

								<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '10px' }}>
									Your Pickup has been successfully scheduled
								</Typography>
								<Typography variant='subtitle2' color='text.grey' fontWeight={400} textAlign='center' sx={{ width: '90%' }}>
									{popupOpen?.message}
								</Typography>
							</Container>
						</DialogContent>
					</Dialog>
				)}
			</Container>
		</>
	);
}

const mapStateToProps = ({ pickup }) => {
	return { pickup };
};
const mapDispatchToProps = (dispatch) => {
	return {
		addPickup: (id, payload) => dispatch(pickupActions.add(id, payload)),
		updatePickup: (id, payload) => dispatch(pickupActions.update(id, payload)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SchedulePickup);
