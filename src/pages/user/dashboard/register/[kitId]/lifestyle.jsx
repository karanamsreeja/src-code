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

function LifeStyle({ pickup, addPickup }) {
	const classes = useStyle();
	const navigate = useNavigate();
	const param = useParams();
	const [state, setstate] = useState({
		kit: param.kitId,
		foodHabits: '',
		lifestyleDesc: '',
		sleepCycle: '',
		regularHabits: [],
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
				if (kit?.questionnaire_id?.lifeStyle) {
					let obj = {
						kit: param.kitId,
						...kit.questionnaire_id.lifeStyle,
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
			if (kit?.questionnaire_id?.lifeStyle) {
				let obj = {
					kit: param.kitId,
					...kit.questionnaire_id.lifeStyle,
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
		if (state.foodHabits === '' || state.lifestyleDesc === '' || state.sleepCycle === '' || state.regularHabits.length === 0) {
			setloading(null);
			Notification.error('Please fill all the required fields.');
			return;
		}
		const res = await axiosPost('/questionnaire/lifestyle', state, setloading);

		if (res.status === 200) {
			navigate(`/user/dashboard/schedule-pickup/${param.id}/register/select/${param.kitId}/state-of-mind`);
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
						to={`/user/dashboard/schedule-pickup/${param.id}/register/select/${param.kitId}/family`}
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
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkerYellow' letterSpacing='1.5px'>
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
							Your Lifestyle
						</Typography>

						<Grid container spacing={2.5}>
							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											Food Habits <span style={{ color: '#FF0000' }}> *</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='foodHabits'
									value={state.foodHabits}
									onChange={(e) => updateState('foodHabits', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Veg'>Veg</MenuItem>
									<MenuItem value='Non-veg'>Non-veg</MenuItem>
									<MenuItem value='Ovo-vegetarian (Eggs)'>Ovo-vegetarian (Eggs)</MenuItem>
									<MenuItem value='Vegan'>Vegan</MenuItem>
								</Select>
							</Grid>

							<Grid item md={6} xs={12}>
								<Select
									label={
										<>
											How would you describe your lifestyle? <span style={{ color: '#FF0000' }}>*</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='lifestyleDesc'
									value={state.lifestyleDesc}
									onChange={(e) => updateState('lifestyleDesc', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value=' Sedentary - tending to spend much time seated; somewhat inactive; couch or desk-bound'>
										Sedentary - tending to spend much time seated; somewhat inactive; couch or desk-bound
									</MenuItem>
									<MenuItem value=' Active - tending to move about frequently; go for walks; regularly running errands'>
										Active - tending to move about frequently; go for walks; regularly running errands
									</MenuItem>
									<MenuItem value='Hyperactive - regular exercise (5-7 hrs/week); play sports, cycling, swimming etc.'>
										Hyperactive - regular exercise (5-7 hrs/week); play sports, cycling, swimming etc.
									</MenuItem>
								</Select>
							</Grid>

							<Grid item xs={12}>
								<Select
									label={
										<>
											How has your sleep cycle been in the past 3 months <span style={{ color: '#FF0000' }}>*</span>
										</>
									}
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='sleepCycle'
									value={state.sleepCycle}
									onChange={(e) => updateState('sleepCycle', e.target.value)}
									MenuProps={MenuProps}
								>
									<MenuItem value='Sound, peaceful and deep sleep (6-8 hrs)'>Sound, peaceful and deep sleep (6-8 hrs)</MenuItem>
									<MenuItem value='Disturbed, interrupted, and light sleep (less than 6 hrs)'>
										Disturbed, interrupted, and light sleep (less than 6 hrs)
									</MenuItem>
									<MenuItem value='Excessive, prolonged, and includes day sleep (more than 8 hrs)'>
										Excessive, prolonged, and includes day sleep (more than 8 hrs)
									</MenuItem>
								</Select>
							</Grid>

							<Grid item xs={12}>
								<Select
									label={
										<>
											Do you have any of the following as a regular habit? Select all that apply.{' '}
											<span style={{ color: '#FF0000' }}>(Multiple options can be selected) *</span>
										</>
									}
									multiple
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='regularHabits'
									value={state.regularHabits}
									onChange={(e) =>
										updateState(
											'regularHabits',
											e.target.value[e.target.value.length - 1] === 'None'
												? ['None']
												: e.target.value.filter((item) => item !== 'None')
										)
									}
									MenuProps={MenuProps}
									renderValue={(selected) =>
										selected.map((e) => (
											<span key={e} className='select-menu-item'>
												{e}
											</span>
										))
									}
								>
									<MenuItem value='Smoking'>Smoking</MenuItem>
									<MenuItem value='Drinking'>Drinking</MenuItem>
									<MenuItem value='Tobacco in any form'>Tobacco in any form</MenuItem>
									<MenuItem value='Digital gadgets'>Digital gadgets</MenuItem>
									<MenuItem value='Any form of food or soft drinks (Eg. Sugar, Fast food, Beverages)'>
										Any form of food or soft drinks (Eg. Sugar, Fast food, Beverages)
									</MenuItem>
									<MenuItem value='None'>None</MenuItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(LifeStyle);
