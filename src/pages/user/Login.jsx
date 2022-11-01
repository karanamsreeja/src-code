import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { useSnackbar } from 'notistack';

import GoogleIcon from '@mui/icons-material/Google';

import { Link, useNavigate } from 'react-router-dom';

import TextField from 'components/TextField';
import SocialIconButton from 'components/SocialIconButton';

import axios from 'axios';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';

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

function Login({ setAuth }) {
	const classes = useStyles();
	const navigate = useNavigate();
	const [loading, setloading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setloading(true);

		const form = new FormData(event.target);
		const email = form.get('email');
		const password = form.get('password');

		if (email?.trim() === '' || password?.trim() === '') {
			setloading(false);
			return;
		}

		try {
			const res = await axios.post(`${process.env.REACT_APP_API_BASEURL}/auth/login`, { email, password });
			setloading(false);

			if (res.status === 200) {
				enqueueSnackbar(res.data?.message || 'Login successfull.', { variant: 'success' });
				let permissions = {};

				// calculate user permissions and add next page redirect url
				// redirect function take place in parent layout component based on redirect url
				if (res.data?.user.role === 'client') {
					permissions.user = true;
					permissions.redirectUrl = '/user/dashboard';
				}
				if (res.data?.user.role === 'admin') {
					permissions.admin = true;
				}

				setAuth({
					loading: false,
					login: true,
					email: res.data?.user.email,
					fullname: res.data?.user.fullname,
					...permissions,
				});
			} else if (res.status === 400 && res.data.action === 'verify_email') {
				enqueueSnackbar(res.data?.message || 'Please verify email.', { variant: 'error' });
				navigate('/user/verify-otp', { state: { email, hasOtp: false } });
			} else {
				enqueueSnackbar(res.data?.message || 'Login failed.', { variant: 'error' });
			}
		} catch (error) {
			setloading(false);
			enqueueSnackbar('Login failed.', { variant: 'error' });
		}
	};

	const handleGoogleLogin = () => {
		window.open(`${process.env.REACT_APP_API_BASEURL}/auth/google`, '_self');
	};

	const handleFaceookLogin = () => {
		window.open(`${process.env.REACT_APP_API_BASEURL}/auth/facebook`, '_self');
	};

	return (
		<Container sx={{ flex: 1, mb: '16px' }} className='center'>
			<Grid container justifyContent='center' alignItems='center' flexDirection='column' spacing={4}>
				<Grid item md={5} sm={10} xs={12}>
					<Paper sx={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '1px 4px 13px rgba(0, 0, 0, 0.1)' }}>
						<div className={classes.cardHeader}>
							<Typography variant='h5' fontWeight='bold' color='#FAFAFA'>
								Welcome Back !
							</Typography>
							<Typography variant='subtitle2' color='#FAFAFA'>
								Sign in to continue
							</Typography>
							<div className={classes.headerbg}>
								<img src='/assets/bg-logo.svg' alt='' />
							</div>
						</div>
						<div className={classes.cardBody}>
							<Grid container spacing={2} component='form' onSubmit={handleSubmit}>
								<Grid item xs={12}>
									<TextField label={<InputLabel title='Email' />} name='email' placeholder='Enter username' size='small' required />
								</Grid>
								<Grid item xs={12}>
									<TextField
										type='password'
										label={<InputLabel title='Password' />}
										name='password'
										placeholder='Enter password'
										size='small'
										required
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography variant='caption' fontWeight={500}>
										<Checkbox sx={{ padding: 0, mr: '8px', mt: '-2px' }} size='small' />
										Remember me
									</Typography>
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
											{loading ? <CircularProgress size='1rem' /> : 'Log In'}
										</Typography>
									</Button>
								</Grid>
								<Grid item xs={12} style={{ paddingTop: '24px' }}>
									<Typography variant='subtitle2' color='text.greyLight' fontWeight={500} component='div' textAlign='center'>
										Forgot Password?
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant='subtitle2' color='#BDBDBD' fontWeight='bold' className={classes.breaker}>
										or
									</Typography>
								</Grid>
								<Grid container spacing={1} item xs={12}>
									<Grid item sm={6} xs={12}>
										<SocialIconButton
											icon={
												<img
													src='/assets/icons/facebook-blue.svg'
													alt='facebook'
													style={{ height: '16px', marginRight: '5px' }}
												/>
											}
											label={<Typography variant='caption'>Login with Facebook</Typography>}
											fullWidth
											onClick={handleFaceookLogin}
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<SocialIconButton
											icon={<GoogleIcon />}
											label={<Typography variant='caption'>Login with Google</Typography>}
											color='error'
											fullWidth
											onClick={handleGoogleLogin}
										/>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Paper>
				</Grid>
				<Grid item md={6} sm={10} xs={12}>
					<Typography variant='subtitle2' color='#212121' textAlign='center'>
						Don’t have an account ?
						<Typography variant='subtitle2' fontWeight='bold' color='text.darkBlue' component='span'>
							<Link to='/user/register'>{' Signup now'}</Link>
						</Typography>
					</Typography>
				</Grid>
			</Grid>
		</Container>
	);
}

// const mapStateToProps = ({ auth }) => {
// 	return { auth };
// };
const mapDispatchToProps = (dispatch) => {
	return {
		setAuth: (payload) => dispatch(authActions.set(payload)),
	};
};

export default connect(null, mapDispatchToProps)(Login);
