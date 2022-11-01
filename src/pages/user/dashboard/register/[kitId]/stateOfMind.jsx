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

function StateOfMind({ pickup, addPickup }) {
	const classes = useStyle();
	const navigate = useNavigate();
	const param = useParams();
	const [state, setstate] = useState({
		kit: param.kitId,
		mood: '',
		responseBadExperience: '',
		challanges: '',
		learningPattern: '',
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
				if (kit?.questionnaire_id?.stateOfMind) {
					let obj = {
						kit: param.kitId,
						...kit.questionnaire_id.stateOfMind,
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
			if (kit?.questionnaire_id?.stateOfMind) {
				let obj = {
					kit: param.kitId,
					...kit.questionnaire_id.stateOfMind,
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
		if (state.mood === '' || state.responseBadExperience === '' || state.challanges === '' || state.learningPattern === '') {
			setloading(null);
			Notification.error('Please fill all the required fields.');
			return;
		}
		const res = await axiosPost('/questionnaire/state-of-mind', state, setloading);

		if (res.status === 200) {
			navigate(`/user/dashboard/schedule-pickup/${param.id}/register/select/${param.kitId}/body-constitution`);
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
						to={`/user/dashboard/schedule-pickup/${param.id}/register/select/${param.kitId}/lifestyle`}
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
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkerYellow' letterSpacing='1.5px'>
						YOUR STATE OF MIND
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
						YOUR BODY CONSTITUTION
					</Typography>
				</Breadcrumbs>

				<Box>
					<div style={{ padding: '37px 33px 33px 34px' }}>
						<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '40px' }}>
							Your State of Mind
						</Typography>

						<Grid container spacing={2.5}>
							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											Which of these best describes your mood lately? <span style={{ color: '#FF0000' }}>*</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='mood'
									value={state.mood}
									onChange={(e) => updateState('mood', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Depressed, Gloomy, Lonely, Low, Sad, Dull, Lazy, Unenthusiastic'>
										Depressed, Gloomy, Lonely, Low, Sad, Dull, Lazy, Unenthusiastic
									</MenuItem>
									<MenuItem value='Angry, Aggressive, Highly Excited, Charged'>Angry, Aggressive, Highly Excited, Charged</MenuItem>
									<MenuItem value='Highly Optimistic, Happy, Fresh, Serene, Calm'>
										Highly Optimistic, Happy, Fresh, Serene, Calm
									</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											How do you respond to a bad experience? <span style={{ color: '#FF0000' }}>*</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='responseBadExperience'
									value={state.responseBadExperience}
									onChange={(e) => updateState('responseBadExperience', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Your immediate response is impulsive(React loudly, argue, lash out,snap, curse your luck/life)'>
										Your immediate response is impulsive(React loudly, argue, lash out,snap, curse your luck/life)
									</MenuItem>
									<MenuItem value='You feel bad, but react moderately and try to hold your temper to focus on what needs to be done'>
										You feel bad, but react moderately and try to hold your temper to focus on what needs to be done
									</MenuItem>
									<MenuItem value='You tend to get focused, do not take things personally, try to solve the issue and focus on navigating the situation.'>
										You tend to get focused, do not take things personally, try to solve the issue and focus on navigating the
										situation.
									</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											Which of these challenges do you face often? <span style={{ color: '#FF0000' }}> *</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='challanges'
									value={state.challanges}
									onChange={(e) => updateState('challanges', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Difficulty in learning/understanding/focusing on a new concept'>
										Difficulty in learning/understanding/focusing on a new concept
									</MenuItem>
									<MenuItem value='Retaining things that you have recently learned/understood'>
										Retaining things that you have recently learned/understood
									</MenuItem>
									<MenuItem value='Recalling names of people or incidents'>Recalling names of people or incidents</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											How would you describe your learning pattern? <span style={{ color: '#FF0000' }}> *</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='learningPattern'
									value={state.learningPattern}
									onChange={(e) => updateState('learningPattern', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Quick to learn but I can soon forget. I like to study many things but have difficulty retaining focus. I learn faster by listening.'>
										Quick to learn but I can soon forget. I like to study many things but have difficulty retaining focus. I learn
										faster by listening.
									</MenuItem>
									<MenuItem value='I am well-organised, focused, and goal-oriented, I learn best by reading and with visuals.'>
										I am well-organised, focused, and goal-oriented, I learn best by reading and with visuals.
									</MenuItem>
									<MenuItem value="I don't learn as quickly as some people, but I have excellent retention and a long memory.">
										I don't learn as quickly as some people, but I have excellent retention and a long memory.
									</MenuItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(StateOfMind);
