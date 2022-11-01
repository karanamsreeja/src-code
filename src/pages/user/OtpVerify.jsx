import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

import TextField from 'components/TextField';

import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import OtpInput from 'react-otp-input';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	cardHeader: {
		position: 'relative',
		backgroundColor: theme.palette.background.darkBlue,
		padding: '30px 20px',
		overflow: 'hidden',
	},
	headerbg: {
		position: 'absolute',
		right: '-75px',
		top: '-78px',
	},
	cardBody: {
		padding: '35px 25px',
	},
	breaker: {
		textAlign: 'center',
		position: 'relative',
		'&::after': {
			content: '""',
			position: 'absolute',
			width: '45%',
			height: '1px',
			background: '#BDBDBD',
			top: '50%',
			left: 0,
		},
		'&::before': {
			content: '""',
			position: 'absolute',
			width: '45%',
			height: '1px',
			background: '#BDBDBD',
			top: '50%',
			right: 0,
		},
	},
}));

const InputLabel = ({ title }) => (
	<Typography variant='subtitle2' color='text.darkBlue' fontWeight='bold'>
		{title}
	</Typography>
);

export default function Register() {
	const navigate = useNavigate();
	const location = useLocation();
	const [screen, setscreen] = useState('');
	const classes = useStyles();
	const [loading, setloading] = useState(false);
	const [otp, setotp] = useState('');
	const [email, setemail] = useState('');
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (location.state?.email) {
			setemail(location.state.email);
			if (location.state.hasOtp) {
				setscreen('otp');
			} else {
				setscreen('email');
			}
		} else {
			setscreen('email');
		}
	}, [location]);

	const handleCheckEmail = async (event) => {
		event.preventDefault();
		setloading(true);

		const form = new FormData(event.target);
		const email = form.get('email');

		if (email?.trim() === '') {
			setloading(false);
			return;
		}

		try {
			const res = await axios.post(`${process.env.REACT_APP_API_BASEURL}/users/verify/email/otp`, { email });
			setloading(false);
			if (res.status === 200) {
				enqueueSnackbar(res.data?.message || 'Otp send.', { variant: 'success' });
				setemail(email);
				setscreen('otp');
			} else {
				enqueueSnackbar(res.data?.message || 'Try again.', { variant: 'error' });
			}
		} catch (error) {
			setloading(false);
			enqueueSnackbar('Try again.', { variant: 'error' });
		}
	};

	const handleVerifyOtp = async (event) => {
		event.preventDefault();
		setloading(true);

		try {
			const res = await axios.put(`${process.env.REACT_APP_API_BASEURL}/users/verify/email`, { email, otp });
			setloading(false);
			if (res.status === 200) {
				enqueueSnackbar(res.data?.message || 'Verified.', { variant: 'success' });
				navigate('/user/login');
			} else {
				enqueueSnackbar(res.data?.message || 'Not Verified.', { variant: 'error' });
			}
		} catch (error) {
			setloading(false);
			enqueueSnackbar('Not Verified.', { variant: 'error' });
		}
	};

	return (
		<Container sx={{ flex: 1, mb: '16px' }} className='center'>
			<Grid container justifyContent='center' alignItems='center' flexDirection='column' spacing={4}>
				<Grid item md={5} sm={10} xs={12}>
					<Paper sx={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '1px 4px 13px rgba(0, 0, 0, 0.1)' }}>
						<div className={classes.cardHeader}>
							<Typography variant='h5' fontWeight='bold' color='#FAFAFA'>
								Join Us!
							</Typography>
							<Typography variant='subtitle2' color='#FAFAFA'>
								Verify to continue
							</Typography>
							<div className={classes.headerbg}>
								<img src='/assets/bg-logo.svg' alt='' />
							</div>
						</div>

						{screen === 'email' && (
							<div className={classes.cardBody}>
								<Grid container spacing={2} component='form' onSubmit={handleCheckEmail}>
									<Grid item xs={12}>
										<TextField
											label={<InputLabel title='Email Address' />}
											defaultValue={email}
											name='email'
											placeholder='Enter Email Address'
											size='small'
											required
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											type='submit'
											variant='contained'
											color='darkYellow'
											sx={{ padding: '10px 16px' }}
											disabled={loading}
											fullWidth
										>
											<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
												{loading ? <CircularProgress size='1rem' /> : 'Get otp'}
											</Typography>
										</Button>
									</Grid>
								</Grid>
							</div>
						)}

						{screen === 'otp' && (
							<div className={classes.cardBody}>
								<Grid container justifyContent='center' spacing={2} component='form' onSubmit={handleVerifyOtp}>
									<Grid item>
										<OtpInput
											numInputs={6}
											inputStyle={{
												width: '3rem',
												height: '3rem',
												margin: '0 0.5rem',
												fontSize: '2rem',
												borderRadius: 4,
												border: '1px solid rgba(0,0,0,0.3)',
											}}
											value={otp}
											onChange={(value) => setotp(value)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											type='submit'
											variant='contained'
											color='darkYellow'
											sx={{ padding: '10px 16px' }}
											disabled={loading}
											fullWidth
										>
											<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
												{loading ? <CircularProgress size='1rem' /> : 'Verify otp'}
											</Typography>
										</Button>
									</Grid>
								</Grid>
							</div>
						)}
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}
