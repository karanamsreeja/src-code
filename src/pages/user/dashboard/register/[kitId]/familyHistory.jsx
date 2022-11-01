import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';

import Select from 'components/Select';
import Box from 'components/Box';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosGet, axiosPost } from 'helpers/axios';
import Notification from 'helpers/notification';
import { pickupActions } from 'store/action/pickupAction';
import { connect } from 'react-redux';

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

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 220,
			width: 250,
		},
	},
};

function FmailyHistory({ pickup, addPickup }) {
	const classes = useStyle();
	const navigate = useNavigate();
	const param = useParams();
	const [state, setstate] = useState({
		kit: param.kitId,
		familyDiseases: [],
		familyConditions: [],
		allergies: '',
		nutritionalDeficiencies: [],
	});
	const [loading, setloading] = useState(null);

	useEffect(() => {
		async function getData() {
			const pickupId = param.id;

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

				const kit = pickupDetails.data.pickup.kits.find((element) => element._id === param.kitId);
				if (kit?.questionnaire_id?.familyHistory) {
					let obj = {
						kit: param.kitId,
						...kit.questionnaire_id.familyHistory,
					};
					delete obj._id;
					setstate(obj);
					return;
				}

				addPickup(pickupId, obj);
			}
		}

		if (pickup[param.id]) {
			const kit = pickup[param.id].kits.find((element) => element._id === param.kitId);
			if (kit?.questionnaire_id?.familyHistory) {
				let obj = {
					kit: param.kitId,
					...kit.questionnaire_id.familyHistory,
				};
				delete obj._id;
				setstate(obj);
				return;
			}
		}

		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateState = (name, value) => {
		setstate((pre) => ({ ...pre, [name]: value }));
	};

	const handleNext = async () => {
		setloading({ message: 'Adding basic details...' });

		// validating
		if (
			state.familyDiseases.length === 0 ||
			state.familyConditions.length === 0 ||
			state.allergies === '' ||
			state.nutritionalDeficiencies.length === 0
		) {
			setloading(null);
			Notification.error('Please fill all the required fields.');
			return;
		}

		const res = await axiosPost('/questionnaire/family-history', state, setloading);

		if (res.status === 200) {
			navigate(`/user/dashboard/schedule-pickup/${param.id}/register/select/${param.kitId}/lifestyle`);
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
						to={`/user/dashboard/schedule-pickup/${param.id}/register/select`}
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
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkBlue' letterSpacing='1.5px'>
						SELECT A KIT
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkBlue' letterSpacing='1.5px'>
						BASIC DETAILS
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkerYellow' letterSpacing='1.5px'>
						YOUR FAMILY HISTORY
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
						YOUR LIFESTYLE
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
						YOUR STATE OF MIND
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
						YOUR BODY CONSTITUTION
					</Typography>
				</Breadcrumbs>

				<Box>
					<div style={{ padding: '37px 33px 33px 34px' }}>
						<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '40px' }}>
							Your Family History
						</Typography>

						<Grid container spacing={2.5}>
							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											Do you have a family history of any of the mentioned?{' '}
											<span style={{ color: '#FF0000' }}>(Multiple options can be selected) *</span>
										</>
									}
									multiple
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='familyDiseases'
									value={state.familyDiseases}
									onChange={(e) => updateState('familyDiseases', e.target.value)}
									MenuProps={MenuProps}
									renderValue={(selected) =>
										selected.map((e) => (
											<span key={e} className='select-menu-item'>
												{e}
											</span>
										))
									}
								>
									<MenuItem value='Diabetes'>Diabetes</MenuItem>
									<MenuItem value='Blood pressure'>Blood pressure</MenuItem>
									<MenuItem value='High Cholesterol'>High Cholesterol</MenuItem>
									<MenuItem value='Hypothyroid'>Hypothyroid</MenuItem>
									<MenuItem value='Cancer'>Cancer</MenuItem>
									<MenuItem value='Other'>Other</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											Do you have any of these conditions?{' '}
											<span style={{ color: '#FF0000' }}>(Multiple options can be selected) *</span>
										</>
									}
									multiple
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='familyConditions'
									value={state.familyConditions}
									onChange={(e) => updateState('familyConditions', e.target.value)}
									MenuProps={MenuProps}
									renderValue={(selected) =>
										selected.map((e) => (
											<span key={e} className='select-menu-item'>
												{e}
											</span>
										))
									}
								>
									<MenuItem value='Asthma, bronchitis, cough with phlegm, pneumonia, pleurisy, sinusitis, colds, congestion, sneezing'>
										Asthma, bronchitis, cough with phlegm, pneumonia, pleurisy, sinusitis, colds, congestion, sneezing
									</MenuItem>
									<MenuItem value='Dry cough, pharyngitis'>Dry cough, pharyngitis,</MenuItem>
									<MenuItem value='Acidity, nausea, vomit, stomach ulcers, headache, vertigo, skin issues(psoriasis)'>
										Acidity, nausea, vomit, stomach ulcers, headache, vertigo, skin issues(psoriasis)
									</MenuItem>
									<MenuItem value='Gas bloating, distention'>Gas bloating, distention</MenuItem>
									<MenuItem value='Constipation, incomplete evacuation'>Constipation, incomplete evacuation</MenuItem>
									<MenuItem value='Diarrhoea, Ibs, ulcerative colitis'>Diarrhoea, Ibs, ulcerative colitis</MenuItem>
									<MenuItem value='Recurrent fever'>Recurrent fever</MenuItem>
									<MenuItem value='Diabetic, hypothyroid, overweight, high cholesterol/ lipids'>
										Diabetic, hypothyroid, overweight, high cholesterol/ lipids
									</MenuItem>
									<MenuItem value='Insomnia, inadequate sleep, high emotional stress, high fatigue'>
										Insomnia, inadequate sleep, high emotional stress, high fatigue
									</MenuItem>
								</Select>
							</Grid>

							<Grid item xs={12}>
								<Select
									label='Do you have any known allergies?'
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='allergies'
									value={state.allergies}
									onChange={(e) => updateState('allergies', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Yes'>Yes</MenuItem>
									<MenuItem value='No'>No</MenuItem>
								</Select>
							</Grid>

							<Grid item xs={12}>
								<Select
									label={
										<>
											Do you have any nutritional deficiencies?{' '}
											<span style={{ color: '#FF0000' }}>(Multiple options can be selected) *</span>
										</>
									}
									multiple
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='nutritionalDeficiencies'
									value={state.nutritionalDeficiencies}
									onChange={(e) => updateState('nutritionalDeficiencies', e.target.value)}
									MenuProps={MenuProps}
									renderValue={(selected) =>
										selected.map((e) => (
											<span key={e} className='select-menu-item'>
												{e}
											</span>
										))
									}
								>
									<MenuItem value='Vit A, B, C, E'>Vit A, B, C, E</MenuItem>
									<MenuItem value='Vit D'>Vit D</MenuItem>
									<MenuItem value='Vit B12'>Vit B12</MenuItem>
									<MenuItem value='Calcium'>Calcium</MenuItem>
									<MenuItem value='Iron'>Iron</MenuItem>
									<MenuItem value='None'>None</MenuItem>
									<MenuItem value='Not aware'>Not aware</MenuItem>
									<MenuItem value='Others'>Others</MenuItem>
								</Select>
							</Grid>
						</Grid>
					</div>

					<div style={{ padding: '37px 33px 33px 34px' }}>
						<div style={{ marginTop: '54px', textAlign: 'end' }}>
							<Button size='small' variant='outlined' color='darkBlue' sx={{ mr: '16px' }}>
								<Typography variant='subtitle2' fontWeight='bold' color='inherit'>
									Save Draft
								</Typography>
							</Button>
							<Button size='small' variant='contained' color='darkBlue' disabled={loading !== null} onClick={handleNext}>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FmailyHistory);
