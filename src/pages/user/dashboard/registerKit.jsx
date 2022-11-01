import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { makeStyles } from '@mui/styles';

import LoadingBoxComponent from 'components/LoadingBoxComponent';
import Box from 'components/Box';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { pickupActions } from 'store/action/pickupAction';
import { axiosGet } from 'helpers/axios';
import Notification from 'helpers/notification';

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
		padding: '19px 22px',
		marginBottom: '11px',
		background: '#F5F5F5',
		borderRadius: '6px',
		gap: '10px',
	},
}));

function RegisterKit({ pickup, addPickup, updatePickup }) {
	const classes = useStyle();
	const param = useParams();
	const navigate = useNavigate();
	const [loading, setloading] = useState(null);
	const [state, setstate] = useState([]);

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
						addressId: pickupDetails.data.pickup.address._id,
					},
					kits: pickupDetails.data.pickup.kits,
				};

				setstate(obj.kits);
				addPickup(pickupId, obj);
			}
			// } else {
			// 	setstate(pickup[pickupId].kits);
			// }
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handlePreview = () => {
		if (state.length > 0) {
			navigate(`/user/dashboard/schedule-pickup/${param.id}/preview`);
		} else {
			Notification.error('Please select a kit.');
		}
	};

	return (
		<>
			<Container className='container-x'>
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

				<Box sx={{ p: { xs: '20px', sm: '37px 33px 33px 34px' } }}>
					<Typography variant='h4' fontWeight='bold' color='#212121' sx={{ mb: '8px' }}>
						Register the Kit
					</Typography>
					<Typography variant='subtitle2' fontWeight={400} lineHeight='22px' color='text.grey' sx={{ mb: '30px' }}>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
						ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
					</Typography>

					<Typography variant='subtitle1' fontWeight='bold' color='text.darkYellow' component={Link} to='select'>
						+ Add a Kit
					</Typography>

					<Grid container style={{ marginTop: '22px' }}>
						{state.map((e) => (
							<Grid container item className={classes.listItem} key={e._id}>
								<Grid item className='w-250px'>
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
								<Grid item md sm={12} xs={12}>
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
								<Grid item md sm={12} xs={12}>
									<Button
										variant='contained'
										size='medium'
										color='darkYellow'
										sx={{ px: '35px', width: { xs: '100%', md: 'auto' } }}
										onClick={() => {
											navigate(`select/${e._id}`);
										}}
									>
										<Typography variant='subtitle2' fontWeight='bold'>
											View/Edit Details
										</Typography>
									</Button>
								</Grid>
								<Grid item sx={{ ml: '18px' }}></Grid>
							</Grid>
						))}
					</Grid>

					<div style={{ marginTop: '54px', textAlign: 'end' }}>
						<Button size='small' variant='outlined' color='darkBlue' sx={{ mr: '16px' }}>
							<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
								Back
							</Typography>
						</Button>
						<Button size='small' variant='contained' color='grey' onClick={handlePreview}>
							<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
								Preview
							</Typography>
						</Button>
					</div>
				</Box>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterKit);
