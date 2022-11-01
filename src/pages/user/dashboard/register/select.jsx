import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from 'components/TextField';
import { makeStyles } from '@mui/styles';

import Box from 'components/Box';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { pickupActions } from 'store/action/pickupAction';
import { axiosGet, axiosPut } from 'helpers/axios';

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
}));

function RegisterKit({ pickup }) {
	const classes = useStyle();
	const navigate = useNavigate();
	const param = useParams();
	const [kitlist, setkitlist] = useState([]);
	const [selectedKitId, setselectedKitId] = useState(null);
	const [loading, setloading] = useState(null);

	useEffect(() => {
		async function getData() {
			setloading({ message: 'Fetching kit list...' });
			const res = await axiosGet('/orders/kits-tobe-schedule-pickup', {}, setloading);
			if (res.status === 200) {
				setkitlist(res.data.kits.flat());
			}
		}

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddKit = async () => {
		setloading({ message: 'Adding kit...' });
		const res = await axiosPut('/pickups/register-kit/preview', { kitId: selectedKitId._id, pickup_id: param.id }, setloading);

		if (res.status === 200) {
			if (pickup && pickup[param.id]) {
			}
			navigate(`${selectedKitId._id}`);
		}
	};

	return (
		<>
			<Container className={classes.root}>
				<Stack direction='row' sx={{ mb: '5px' }}>
					<IconButton
						aria-label='delete'
						sx={{ transform: 'translateX(-16px)' }}
						component={Link}
						to={`/user/dashboard/schedule-pickup/${param.id}/register`}
					>
						<img src='/assets/icons/arrow-left.svg' alt='arrow-left' />
					</IconButton>
					<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' sx={{ transform: 'translate(-10px, 8px)' }}>
						Back
					</Typography>
				</Stack>
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
						SELECT MEMBERS
					</Typography>
					<Typography variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
						DETAILS
					</Typography>
				</Breadcrumbs>

				<Box>
					<div style={{ padding: '37px 33px 33px 34px', background: 'rgba(228,192, 69 ,0.14)' }}>
						<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '7px' }}>
							Select a Kit
						</Typography>
						<Typography variant='subtitle2' fontWeight={400} lineHeight='22px' color='text.grey' sx={{ mb: '30px' }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim egestas id turpis suspen integer massa tempus.
						</Typography>
						<Autocomplete
							size='small'
							fullWidth
							onChange={(event, newValue) => {
								setselectedKitId(newValue);
							}}
							options={kitlist}
							renderOption={(props, option) => (
								<li {...props} key={option._id}>
									{option._id}
								</li>
							)}
							getOptionLabel={(option) => option._id}
							renderInput={(params) => <TextField {...params} label='' placeholder='Enter Kit ID Number' />}
						/>
					</div>

					<div style={{ padding: '37px 33px 33px 34px' }}>
						{selectedKitId && (
							<>
								<Typography variant='h5' fontWeight='bold' color='text.greyDark' sx={{ mb: '35px' }}>
									Patients Details
								</Typography>

								<Grid container spacing={3}>
									<Grid item xs={12}>
										<Typography variant='caption' fontWeight='bold' color='text.greyLight'>
											NAME
										</Typography>
										<Typography variant='subtitle1' fontWeight='bold' color='text.darkBlue'>
											{selectedKitId.patient_id.firstname + ' ' + selectedKitId.patient_id.lastname}
										</Typography>
									</Grid>

									<Grid item lg={2} md={3} xs={12}>
										<Typography variant='caption' fontWeight='bold' color='text.greyLight'>
											AGE
										</Typography>
										<Typography variant='subtitle1' fontWeight='bold' color='text.darkBlue'>
											{selectedKitId.patient_id.age}
										</Typography>
									</Grid>

									<Grid item lg={2} md={3} xs={12}>
										<Typography variant='caption' fontWeight='bold' color='text.greyLight'>
											GENDER
										</Typography>
										<Typography variant='subtitle1' fontWeight='bold' color='text.darkBlue'>
											{selectedKitId.patient_id.gender}
										</Typography>
									</Grid>

									<Grid item lg={2} md={3} xs={12}>
										<Typography variant='caption' fontWeight='bold' color='text.greyLight'>
											BLOOD TYPE
										</Typography>
										<Typography variant='subtitle1' fontWeight='bold' color='text.darkBlue'>
											{selectedKitId.patient_id.blood_type}
										</Typography>
									</Grid>

									<Grid item xs={12}>
										<Typography variant='caption' fontWeight='bold' color='text.greyLight'>
											EXISTING DISEASE
										</Typography>
										<Typography variant='subtitle1' fontWeight='bold' color='text.darkBlue'>
											{selectedKitId.patient_id.existing_disease}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography variant='caption' fontWeight='bold' color='text.greyLight'>
											DETAILS
										</Typography>
										<Typography variant='subtitle1' fontWeight='bold' color='text.darkBlue'>
											{selectedKitId.patient_id.details}
										</Typography>
									</Grid>
								</Grid>
							</>
						)}

						<div style={{ marginTop: '54px', textAlign: 'end' }}>
							<Button size='small' variant='outlined' color='darkBlue' sx={{ mr: '16px' }} disabled={selectedKitId === null}>
								<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
									Save Draft
								</Typography>
							</Button>
							<Button
								size='small'
								variant='contained'
								color='grey'
								disabled={selectedKitId === null || loading !== null}
								onClick={handleAddKit}
							>
								<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
									Next
								</Typography>
							</Button>
						</div>
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
