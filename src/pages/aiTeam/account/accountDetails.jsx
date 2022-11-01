import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import TextField from 'components/TextField';
import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { connect } from 'react-redux';
import { updateProfileName } from 'helpers/auth';

function AccountDetails({ auth, firstname, lastname }) {
	const [state, setstate] = useState({
		firstname: firstname,
		lastname: lastname,
		email: auth?.email || '',
	});
	const [loading, setloading] = useState(null);

	const handleSubmit = async () => {
		setloading({ message: 'Saving Details...' });
		updateProfileName({ firstname: state.firstname, lastname: state.lastname }, '/clinical-partners/account', setloading);
	};

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Typography variant='subtitle2' fontWeight='bold' color='#212121' sx={{ mb: '16px' }}>
				Details
			</Typography>

			<Grid container spacing={2.3} sx={{}}>
				<Grid item md={6} xs={12}>
					<TextField
						label='First Name'
						size='small'
						placeholder='Enter First Name'
						value={state.firstname}
						labelProps={{ color: '#25468A' }}
						onChange={(e) => setstate((pre) => ({ ...pre, firstname: e.target.value }))}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<TextField
						label='Last Name'
						size='small'
						placeholder='Enter Last Name'
						value={state.lastname}
						labelProps={{ color: '#25468A' }}
						onChange={(e) => setstate((pre) => ({ ...pre, lastname: e.target.value }))}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<TextField
						label='Email Address'
						size='small'
						placeholder='Enter Email Address'
						labelProps={{ color: '#25468A' }}
						helperText={
							<Typography
								variant='overline'
								fontSize='10px'
								fontWeight='bold'
								color='text.darkerYellow'
								sx={{ textDecoration: 'underline' }}
							>
								Verify Email Address
							</Typography>
						}
						value={state.email}
						disabled
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<TextField
						label='Phone Number'
						size='small'
						placeholder='Enter Phone Number'
						labelProps={{ color: '#25468A' }}
						helperText={
							<Typography
								variant='overline'
								fontSize='10px'
								fontWeight='bold'
								color='text.darkerYellow'
								sx={{ textDecoration: 'underline' }}
							>
								Verify Phone Number
							</Typography>
						}
						disabled
					/>
				</Grid>
			</Grid>

			<Divider sx={{ mt: '48px', mb: '25px' }} />

			<Grid container spacing={2.3} sx={{}}>
				<Grid item xs>
					<Typography variant='subtitle2' fontWeight='bold' color='#212121'>
						Delete Accounts
					</Typography>
					<Typography variant='caption' color='text.greyLightText' sx={{ mb: '10px' }} component='div'>
						By deleting your account you will lose all your data
					</Typography>
				</Grid>
				<Grid item>
					<Button variant='text'>
						<Typography
							variant='overline'
							fontSize='10px'
							fontWeight='bold'
							color='text.darkerYellow'
							sx={{ textDecoration: 'underline' }}
						>
							Delete account
						</Typography>
					</Button>
				</Grid>
			</Grid>

			<Divider sx={{ mt: '25px', mb: '28px' }} />
			<div style={{ textAlign: 'end' }}>
				<Button variant='contained' color='darkYellow' onClick={handleSubmit}>
					<Typography variant='subtitle2' fontWeight='bold'>
						Save Changes
					</Typography>
				</Button>
			</div>
		</>
	);
}

const mapStateToProps = ({ auth }) => {
	if (auth?.fullname) {
		let name = auth.fullname?.split(' ');
		return {
			firstname: name.shift(),
			lastname: name.join(' '),
			auth,
		};
	}
	return {
		firstname: '',
		lastname: '',
		auth,
	};
};

export default connect(mapStateToProps)(AccountDetails);
