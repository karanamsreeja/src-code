import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { OrderDateTimeFormatter } from 'helpers/formatter';
import { axiosGet, axiosPut } from 'helpers/axios';
import { Link, useParams } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
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
		flexWrap: 'wrap',
	},
	listItem: {
		padding: '19px 22px',
		marginBottom: '11px',
		background: '#F5F5F5',
		borderRadius: '6px',
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
			const res = await axiosGet('/clinical/sample/details', { kitId: id }, setloading);

			if (res.status === 200) {
				let details = {};

				details.submitted_on = OrderDateTimeFormatter(res.data.kit.timestamps.data_uploaded_on);
				details.recieved_on = OrderDateTimeFormatter(res.data.kit.timestamps.sample_approved_on, { month: 'long' });

				details.fullname = res.data.kit.patient_id.firstname + ' ' + res.data.kit.patient_id.lastname;
				details.age = res.data.kit.patient_id.age;
				details.gender = res.data.kit.patient_id.gender;
				details.blood_type = String(res.data.kit.patient_id.blood_type).toUpperCase();
				details.user = res.data.kit.pickup_id?.user || {};

				setState(details);
			}
		}

		if (init) return;
		setinit(true);
		getData();
	}, [init, id]);

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className='container-x'>
				<Stack direction='row' sx={{ mb: '30px' }}>
					<IconButton
						aria-label='delete'
						sx={{ transform: 'translateX(-16px)' }}
						component={Link}
						to='/clinical-partners/samples/completed'
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
							Reports submitted on {state.submitted_on}
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
								KIT ID
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
								Sample Recieved on: {state.recieved_on}
							</Typography>
						</div>
					</Stack>

					<div style={{ padding: '32px' }}>
						<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '16px	' }}>
							Patient Details
						</Typography>
						<Grid container className={classes.listItem}>
							<Grid item xs>
								<Typography variant='subtitle1' lineHeight='22px' fontWeight='bold' color='#212121'>
									{state.fullname}
								</Typography>
								<Typography variant='caption' lineHeight='20px' fontWeight={400} color='#616161'>
									{state.age} years | {state.gender} | {state.blood_type} Blood Type
								</Typography>
							</Grid>
							<Grid item>
								<Button variant='contained' size='medium' color='darkYellow' sx={{ px: '35px' }}>
									<Typography variant='subtitle2' fontWeight='bold'>
										Download Details
									</Typography>
								</Button>
							</Grid>
						</Grid>

						<Divider sx={{ mt: '49px', mb: '37px' }} />

						<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '30px' }}>
							Customer Account Details
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
