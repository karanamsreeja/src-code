import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

import TextField from 'components/TextField';

import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';
import { login } from 'helpers/auth';

const useStyles = makeStyles((theme) => ({
	cardBody: {
		padding: '35px 25px',
	},
}));

const InputLabel = ({ title }) => (
	<Typography variant='subtitle2' color='text.darkBlue' fontWeight='bold'>
		{title}
	</Typography>
);

function Login({ setAuth }) {
	const classes = useStyles();
	const [loading, setloading] = useState(false);

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

		const res = await login(email, password, setloading);

		if (res.status === 200) {
			setAuth(res.data);
		}
	};

	return (
		<Container sx={{ flex: 1, mb: '16px' }} className='center'>
			<Grid container justifyContent='center' alignItems='center' flexDirection='column' spacing={4}>
				<Grid item md={5} sm={10} xs={12}>
					<Paper sx={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '1px 4px 13px rgba(0, 0, 0, 0.1)' }}>
						<div className={classes.cardBody}>
							<Grid container spacing={2} component='form' onSubmit={handleSubmit}>
								<Grid item xs={12}>
									<TextField
										label={<InputLabel title='Username' />}
										name='email'
										placeholder='Enter username'
										size='small'
										required
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										type='password'
										label={<InputLabel title='Password' />}
										name='password'
										placeholder='Enter username'
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
							</Grid>
						</div>
					</Paper>
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
