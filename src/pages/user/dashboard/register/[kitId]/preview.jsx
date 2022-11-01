import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';

import LoadingBoxComponent from 'components/LoadingBoxComponent';
import Box from 'components/Box';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { pickupActions } from 'store/action/pickupAction';
import { axiosGet, axiosPut } from 'helpers/axios';
import { MemberDateFormatter } from 'helpers/formatter';

const centerContainerStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	padding: '0 !important',
};
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
	listItem: {
		padding: '9px 22px',
		marginBottom: '11px',
		background: '#F5F5F5',
		borderRadius: '6px',
		gap: '10px',
	},
}));

function PreviewRegisterKit({ pickup, addPickup, updatePickup }) {
	const classes = useStyle();
	const param = useParams();
	const navigate = useNavigate();
	const [loading, setloading] = useState(null);
	const [state, setstate] = useState({});
	const [popupOpen, setpopupOpen] = useState(false);
	const [submited, setsubmited] = useState(false); // TODO check already submitted or not

	useEffect(() => {
		async function getData() {
			const pickupId = param.id;

			// if (!(pickup && pickup[pickupId])) {
			setloading({ message: 'Fetching pickup details...' });
			const res = await axiosGet('/pickups/register-kit', { pickupId }, setloading);

			if (res.status === 200) {
				let product_details = {};

				product_details.pickup_on = MemberDateFormatter(res.data.pickup.date) + ' between ' + res.data.pickup.time;
				product_details.address = [
					res.data.pickup.address.address,
					res.data.pickup.address.landmark,
					res.data.pickup.address.city,
					res.data.pickup.address.state,
					res.data.pickup.address.zip,
				]
					.filter((e) => e !== '')
					.join(', ');
				product_details.kits = res.data.pickup.kits;

				setstate(product_details);
			}
			// } else {
			// 	setstate(pickup[pickupId].kits);
			// }
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async () => {
		setsubmited(true);
		setloading({ message: 'Submit...' });
		const res = await axiosPut('/pickups/register-kit/save', { pickupId: param.id }, setloading);

		if (res.status === 200) {
			setpopupOpen(true);
		} else {
			setsubmited(false);
		}
	};

	return (
		<>
			<Container className={classes.root}>
				{loading && <LoadingBoxComponent message={loading.message} />}
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
						color='text.darkBlue'
						letterSpacing='1.5px'
					>
						Schedule a Pickup
					</Typography>
					<Typography
						variant='caption'
						fontSize='10px'
						textTransform='uppercase'
						fontWeight='bold'
						color='text.darkerYellow'
						letterSpacing='1.5px'
					>
						Register the Kit
					</Typography>
					<Typography variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
						Confirmation
					</Typography>
				</Breadcrumbs>

				<Box sx={{ p: '37px 33px 33px 34px' }}>
					<Typography variant='h4' fontWeight='bold' color='#212121' sx={{ mb: '8px' }}>
						Preview
					</Typography>
					<Typography variant='subtitle2' fontWeight={400} lineHeight='22px' color='text.grey' sx={{ mb: '30px' }}>
						Kindly check all details before confirming the scheduled pick-up.
					</Typography>

					<Typography variant='subtitle1' fontWeight='bold' color='text.darkBlue' sx={{ mb: '6px' }}>
						Date & Time of Pick up
					</Typography>
					<Typography variant='h5' fontWeight='bold' color='text.lightBlue' sx={{ mb: '45px' }}>
						{state.pickup_on}
					</Typography>

					<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='#212121' sx={{ mb: '10px' }}>
						Pick up Address
					</Typography>
					<Typography variant='subtitle2' fontWeight='bold' lineHeight='20px' color='#212121' sx={{ mb: '1px' }}>
						Home
					</Typography>
					<Typography variant='subtitle2' fontWeight={400} lineHeight='22px' color='text.greyLightText' sx={{ mb: '48px' }}>
						{state?.address}
					</Typography>

					<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='#212121' sx={{ mb: '14px' }}>
						Registered Kits
					</Typography>
					<Grid container>
						{state.kits?.map((e) => (
							<Grid container item className={classes.listItem} key={e._id}>
								<Grid item className='w-250px center'>
									<Typography
										variant='subtitle1'
										lineHeight='22px'
										fontWeight='bold'
										color='#212121'
										className=' overflow-ellipsis'
									>
										Kit Number #{e._id}
									</Typography>
								</Grid>
								<Grid item xs>
									<Typography variant='caption' fontWeight='bold' color='text.darkYellow' fontSize='10px'>
										MEMBER DETAILS
									</Typography>
									<Typography variant='subtitle2' lineHeight='22px' fontWeight='bold' color='#212121'>
										{e.patient_id.firstname + ' ' + e.patient_id.lastname}
									</Typography>
									<Typography variant='caption' lineHeight='20px' fontWeight={400} color='#616161'>
										{e.patient_id.age} years | {e.patient_id.gender} | {String(e.patient_id.blood_type).toUpperCase()} Blood Type
									</Typography>
								</Grid>
								<Grid item className='center'>
									<Button
										variant='contained'
										size='medium'
										color='darkYellow'
										sx={{ px: '35px' }}
										onClick={() => {
											navigate(`select/${e._id}`);
										}}
									>
										<Typography variant='subtitle2' fontWeight='bold'>
											View Details
										</Typography>
									</Button>
								</Grid>
								<Grid item sx={{ ml: '18px' }}></Grid>
							</Grid>
						))}
					</Grid>

					<div style={{ marginTop: '54px', textAlign: 'end' }}>
						<Button
							size='small'
							variant='outlined'
							color='darkBlue'
							sx={{ mr: '16px' }}
							component={Link}
							to={`/user/dashboard/schedule-pickup/${param.id}/register`}
						>
							<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
								Back
							</Typography>
						</Button>
						<Button size='small' variant='contained' color='grey' onClick={handleSubmit} disabled={submited}>
							<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
								Submit
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
export default connect(mapStateToProps, mapDispatchToProps)(PreviewRegisterKit);
