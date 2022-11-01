import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import TextField from 'components/TextField';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import { useSnackbar } from 'notistack';
import { authActions } from 'store/action/authAction';
import { connect } from 'react-redux';
import { axiosPost } from 'helpers/axios';

function AccountDetails({ deleteAuth }) {
	const { enqueueSnackbar } = useSnackbar();
	const [enableEditPassword, setenableEditPassword] = useState(false);
	const [loading, setloading] = useState(null);
	const [state, setState] = useState({
		existing_password: '',
		new_password: '',
		confirm_password: '',
	});
	const [error, setError] = useState({});

	const submitForm = async () => {
		if (state.new_password !== state.confirm_password) {
			setError({ new_password: true, confirm_password: true });
			enqueueSnackbar('New password and confirm password must be same.', { variant: 'error' });
			return;
		}

		// validate
		let flag = 0,
			err = {};

		if (state.existing_password.trim() === '') {
			err.existing_password = true;
			flag = 1;
		}
		if (state.new_password.trim() === '') {
			err.new_password = true;
			flag = 1;
		}
		if (state.confirm_password.trim() === '') {
			err.confirm_password = true;
			flag = 1;
		}
		setError(err);
		if (flag === 1) {
			return;
		}

		// submit
		setloading({ message: 'Update password...' });
		const res = await axiosPost('/users/password/change', state, setloading, () => deleteAuth('/user/account'));

		if (res.status === 200) {
			setenableEditPassword(false);
			setState({
				existing_password: '',
				new_password: '',
				confirm_password: '',
			});
		}
	};

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Typography variant='subtitle2' fontWeight='bold' color='#212121' gutterBottom>
				Password & Security
			</Typography>
			<Typography variant='subtitle2' lineHeight='22px' color='#616161' sx={{ mb: '22px' }}>
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolo remque laudantium, totamrem aperiam, eaque ipsa quae
				ab illo inventore verit atis et quasi architecto beatae vitae dicta sunt explicabo.
			</Typography>
			{!enableEditPassword && (
				<Button variant='outlined' sx={{ border: '1px solid #25468A' }} onClick={() => setenableEditPassword(true)}>
					<Typography variant='subtitle2' fontWeight='bold' color='#25468A'>
						Update Password
					</Typography>
				</Button>
			)}

			{enableEditPassword && (
				<>
					<TextField
						label='Current Password'
						size='small'
						placeholder='Enter Password'
						labelProps={{ color: '#25468A' }}
						style={{ marginBottom: '8px' }}
						value={state.existing_password}
						error={error.existing_password}
						onChange={(e) => setState((pre) => ({ ...pre, existing_password: e.target.value }))}
					/>
					<Typography
						variant='overline'
						fontSize='10px'
						fontWeight='bold'
						color='text.darkerYellow'
						sx={{ textDecoration: 'underline', mb: '21px' }}
						component='div'
					>
						Forgot Password?
					</Typography>

					<TextField
						label='New Password'
						size='small'
						placeholder='Enter Password'
						labelProps={{ color: '#25468A' }}
						style={{ marginBottom: '18px' }}
						value={state.new_password}
						error={error.new_password}
						onChange={(e) => setState((pre) => ({ ...pre, new_password: e.target.value }))}
					/>

					<TextField
						label='Confirm Password'
						size='small'
						placeholder='Enter Password'
						labelProps={{ color: '#25468A' }}
						style={{ marginBottom: '145px' }}
						value={state.confirm_password}
						error={error.confirm_password}
						onChange={(e) => setState((pre) => ({ ...pre, confirm_password: e.target.value }))}
					/>

					<div style={{ textAlign: 'end' }}>
						<Button variant='contained' color='darkYellow' onClick={submitForm}>
							<Typography variant='subtitle2' fontWeight='bold'>
								Update Password
							</Typography>
						</Button>
					</div>
				</>
			)}
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAuth: (redirectUrl) => dispatch(authActions.delete(redirectUrl)),
	};
};

export default connect(null, mapDispatchToProps)(AccountDetails);
