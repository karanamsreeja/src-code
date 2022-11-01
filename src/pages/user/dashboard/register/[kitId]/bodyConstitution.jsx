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
import { connect } from 'react-redux';
import { pickupActions } from 'store/action/pickupAction';

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

function BodyConstitution({ pickup, addPickup }) {
	const classes = useStyle();
	const navigate = useNavigate();
	const param = useParams();
	const [state, setstate] = useState({
		kit: param.kitId,
		bodyframe: '',
		bodyTemperature: '',
		sweat: '',
		metabolism: '',
		appetite: '',
		faeces: '',
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
				if (kit?.questionnaire_id?.bodyConstitution) {
					let obj = {
						kit: param.kitId,
						...kit.questionnaire_id.bodyConstitution,
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
			if (kit?.questionnaire_id?.bodyConstitution) {
				let obj = {
					kit: param.kitId,
					...kit.questionnaire_id.bodyConstitution,
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

	const handleSaveDraft = async () => {
		setloading({ message: 'Adding basic details...' });

		// validating
		if (
			state.bodyframe === '' ||
			state.bodyTemperature === '' ||
			state.sweat === '' ||
			state.metabolism === '' ||
			state.appetite === '' ||
			state.faeces === ''
		) {
			setloading(null);
			Notification.error('Please fill all the required fields.');
			return;
		}

		await axiosPost('/questionnaire/body-constitutions', state, setloading);
	};

	const handleNext = async () => {
		setloading({ message: 'Adding basic details...' });

		// validating
		if (
			state.bodyframe === '' ||
			state.bodyTemperature === '' ||
			state.sweat === '' ||
			state.metabolism === '' ||
			state.appetite === '' ||
			state.faeces === ''
		) {
			setloading(null);
			Notification.error('Please fill all the required fields.');
			return;
		}
		const res = await axiosPost('/questionnaire/body-constitutions', state, setloading);

		if (res.status === 200) {
			navigate(`/user/dashboard/schedule-pickup/${param.id}/register`);
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
						to={`/user/dashboard/schedule-pickup/${param.id}/register/select/${param.kitId}/state-of-mind`}
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
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkBlue' letterSpacing='1.5px'>
						YOUR FAMILY HISTORY
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkBlue' letterSpacing='1.5px'>
						YOUR LIFESTYLE
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkBlue' letterSpacing='1.5px'>
						YOUR STATE OF MIND
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkerYellow' letterSpacing='1.5px'>
						YOUR BODY CONSTITUTION
					</Typography>
				</Breadcrumbs>

				<Box>
					<div style={{ padding: '37px 33px 33px 34px' }}>
						<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '40px' }}>
							Your Body Constitution
						</Typography>

						<Grid container spacing={2.5}>
							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											How will you describe your body frame? <span style={{ color: '#FF0000' }}>*</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='bodyframe'
									value={state.bodyframe}
									onChange={(e) => updateState('bodyframe', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Slim, light frame and tall or short and bony'>
										Slim, light frame and tall or short and bony
									</MenuItem>
									<MenuItem value='Medium, average development'>Medium, average development</MenuItem>
									<MenuItem value='Well-developed body, larger curvy frames, stocky, stout, wide'>
										Well-developed body, larger curvy frames, stocky, stout, wide
									</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											How would you best describe your body temperature? <span style={{ color: '#FF0000' }}>*</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='bodyTemperature'
									value={state.bodyTemperature}
									onChange={(e) => updateState('bodyTemperature', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='I feel cold easily and am usually cold to touch'>
										I feel cold easily and am usually cold to touch
									</MenuItem>
									<MenuItem value='I feel hot easily and am usually warm to touch'>
										I feel hot easily and am usually warm to touch
									</MenuItem>
									<MenuItem value='I sweat easily and can feel damp or moist to touch'>
										I sweat easily and can feel damp or moist to touch
									</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											What is the closest description of your sweat? <span style={{ color: '#FF0000' }}> *</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='sweat'
									value={state.sweat}
									onChange={(e) => updateState('sweat', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Odourless, scanty'>Odourless, scanty</MenuItem>
									<MenuItem value='Strong smell, profuse, hot'>Strong smell, profuse, hot</MenuItem>
									<MenuItem value='Pleasant smell, moderate when exercising, cold'>
										Pleasant smell, moderate when exercising, cold
									</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											How would you describe your metabolism? <span style={{ color: '#FF0000' }}> *</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='metabolism'
									value={state.metabolism}
									onChange={(e) => updateState('metabolism', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Fast metabolism, difficult to gain weight'>Fast metabolism, difficult to gain weight</MenuItem>
									<MenuItem value='Balanced metabolism, can gain weight and lose weight easily'>
										Balanced metabolism, can gain weight and lose weight easily
									</MenuItem>
									<MenuItem value='Slow metabolism, difficult to lose weight'>Slow metabolism, difficult to lose weight</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											How would you describe your appetite? <span style={{ color: '#FF0000' }}> *</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='appetite'
									value={state.appetite}
									onChange={(e) => updateState('appetite', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Erratic - I am an irregular eater with fluctuating appetite and habits'>
										Erratic - I am an irregular eater with fluctuating appetite and habits
									</MenuItem>
									<MenuItem value='Strong – I like to eat regularly and can become irritable when hungry'>
										Strong – I like to eat regularly and can become irritable when hungry
									</MenuItem>
									<MenuItem value='Moderate but steady- I am often not hungry till mid-morning'>
										Moderate but steady- I am often not hungry till mid-morning
									</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											How would you describe your faeces (stool)? <span style={{ color: '#FF0000' }}> *</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='faeces'
									value={state.faeces}
									onChange={(e) => updateState('faeces', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Dry, hard, scanty, painful or difficult, gas (constipation)'>
										Dry, hard, scanty, painful or difficult, gas (constipation)
									</MenuItem>
									<MenuItem value='Bulk quantity, at times unformed, yellowish, burning (diarrhoea)'>
										Bulk quantity, at times unformed, yellowish, burning (diarrhoea)
									</MenuItem>
									<MenuItem value='Moderate, solid, pale, mucous in the stool (if constipated stools are still soft)'>
										Moderate, solid, pale, mucous in the stool (if constipated stools are still soft)
									</MenuItem>
								</Select>
							</Grid>
						</Grid>
					</div>

					<div style={{ padding: '37px 33px 33px 34px' }}>
						<div style={{ marginTop: '54px', textAlign: 'end' }}>
							<Button size='small' variant='outlined' color='darkBlue' sx={{ mr: '16px' }}>
								<Typography variant='subtitle2' fontWeight='bold' color='inherit' onClick={handleSaveDraft}>
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

export default connect(mapStateToProps, mapDispatchToProps)(BodyConstitution);
