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

import TextField from 'components/TextField';
import Select from 'components/Select';
import InputLabel from 'components/site/InputLabel';
import Box from 'components/Box';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosGet, axiosPost } from 'helpers/axios';
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

function BasicDetails({ pickup, addPickup }) {
	const classes = useStyle();
	const navigate = useNavigate();
	const param = useParams();
	const [state, setstate] = useState({
		kit: param.kitId,
		fullname: '',
		email: '',
		phone: '',
		city: '',
		age: '',
		gender: '',
		profession: '',
		weight: '',
		height: '',
		income: '',
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
				if (kit?.questionnaire_id?.basicDetails) {
					let obj = {
						kit: param.kitId,
						...kit.questionnaire_id.basicDetails,
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
			if (kit?.questionnaire_id?.basicDetails) {
				let obj = {
					kit: param.kitId,
					...kit.questionnaire_id.basicDetails,
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
		const res = await axiosPost('/questionnaire/basic-details', state, setloading);

		if (res.status === 201) {
			navigate('family');
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
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='text.darkerYellow' letterSpacing='1.5px'>
						BASIC DETAILS
					</Typography>
					<Typography variant='caption' fontSize='10px' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
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
						<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '7px' }}>
							Basic Details
						</Typography>
						<Typography variant='subtitle2' fontWeight={400} lineHeight='22px' color='text.grey' sx={{ mb: '30px' }}>
							Please answer the questions below to accompany the sample.
						</Typography>

						<Grid container spacing={2.5}>
							<Grid item md={6} xs={12}>
								<TextField
									label='Full Name'
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='fullname'
									value={state.fullname}
									onChange={(e) => updateState('fullname', e.target.value)}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									label='Email Address'
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='email'
									value={state.email}
									onChange={(e) => updateState('email', e.target.value)}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									label='Mobile Number'
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='phone'
									value={state.phone}
									onChange={(e) => updateState('phone', e.target.value)}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									label='Mention your city'
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='city'
									value={state.city}
									onChange={(e) => updateState('city', e.target.value)}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									label='Age'
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='age'
									value={state.age}
									onChange={(e) => updateState('age', e.target.value)}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<Select
									label={<InputLabel title='Gender' />}
									placeholder='Enter Details'
									size='small'
									value={state.gender}
									onChange={(e) => updateState('gender', e.target.value)}
								>
									<MenuItem value='male'>Male</MenuItem>
									<MenuItem value='female'>Female</MenuItem>
									<MenuItem value='other'>Other</MenuItem>
								</Select>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									label='Profession'
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='profession'
									value={state.profession}
									onChange={(e) => updateState('profession', e.target.value)}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									label='Height (cm)'
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									name='height'
									value={state.height}
									onChange={(e) => updateState('height', e.target.value)}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									label='Weight (kg)'
									placeholder='Enter Details'
									size='small'
									labelProps={{ color: 'text.darkBlue' }}
									nmae='weight'
									value={state.weight}
									onChange={(e) => updateState('weight', e.target.value)}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<Select
									label={<InputLabel title='What is your total household income? (₹ per annum)' />}
									placeholder='Enter Details'
									size='small'
									name='income'
									value={state.income}
									onChange={(e) => updateState('income', e.target.value)}
								>
									<MenuItem value='Less than ₹5,00,000'>Less than ₹5,00,000</MenuItem>
									<MenuItem value='₹5,00,00 - ₹10,00,000'>₹5,00,00 - ₹10,00,000</MenuItem>
									<MenuItem value='₹10,00,000 - ₹20,00,000'>₹10,00,000 - ₹20,00,000</MenuItem>
									<MenuItem value='more than ₹20,00,000'>more than ₹20,00,000</MenuItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetails);
