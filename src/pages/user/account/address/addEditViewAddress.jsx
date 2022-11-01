import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import Box from 'components/Box';
import TextField from 'components/TextField';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import Select from 'components/Select';
import InputLabel from 'components/site/InputLabel';

import { filterNumber } from 'helpers/inputFilter';
import { axiosGet, axiosPost, axiosPut } from 'helpers/axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';
import { storageActions } from 'store/action/storageAction';

function AddEditViewAddress({ redirectUrl, deleteredirectUrl, deleteAuth }) {
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const [state, setstate] = useState({
		address: '',
		address_two: '',
		landmark: '',
		city: '',
		state: '',
		zip: '',
		address_type: '',
		firstname: '',
		lastname: '',
		phone: '',
	});
	const [update, setupdate] = useState(false);
	const [loading, setloading] = useState(null);

	useEffect(() => {
		async function getData() {
			if (location.state?.editableAddress) {
				setstate(location.state.editableAddress);
				setupdate(true);
				navigate('/user/account/address/add', { state: {}, replace: true });
			} else if (params?.id) {
				setloading({ message: 'Fetching address Details.' });
				const addressDetails = await axiosGet('/address', { address_id: params.id }, setloading);
				if (addressDetails.status === 200) {
					setstate({
						address: addressDetails.data.address.address,
						address_two: addressDetails.data.address.address_two,
						landmark: addressDetails.data.address.landmark,
						city: addressDetails.data.address.city,
						state: addressDetails.data.address.state,
						zip: addressDetails.data.address.zip,
						address_type: addressDetails.data.address.address_type,
						firstname: addressDetails.data.address.firstname,
						lastname: addressDetails.data.address.lastname,
						phone: addressDetails.data.address.phone,
						_id: params.id,
					});
					setupdate(true);
				}
				console.log(addressDetails);
			}
		}

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.state, navigate]);

	useEffect(() => {
		return () => deleteredirectUrl();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async () => {
		setloading({ message: 'Submitting Details...' });
		const res = await axiosPost('/address/create', state, setloading, () => deleteAuth('/user/account/address'));

		if (res.status === 201) {
			navigate('/user/account/address');
		}
	};

	const handleUpdate = async () => {
		setloading({ message: 'Updating Details.' });
		const res = await axiosPut(
			'/address/update',
			{
				address: state.address,
				address_two: state.address_two,
				address_type: state.address_type,
				city: state.city,
				landmark: state.landmark,
				state: state.state,
				zip: state.zip,
				_id: state._id,
				firstname: state.firstname,
				lastname: state.lastname,
				phone: state.phone,
			},
			setloading,
			() => deleteAuth('/user/account/address')
		);

		if (res.status === 200) {
			navigate('/user/account/address');
		}
	};

	const onClickBackBtn = () => {
		if (redirectUrl) {
			const url = redirectUrl;
			deleteredirectUrl();
			navigate(url, { replace: true });
		} else {
			navigate('/user/account/address', { replace: true });
		}
	};

	return (
		<Box sx={{ p: '30px 34px', position: 'relative' }}>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Stack direction='row' sx={{ mb: '30px' }}>
				<IconButton aria-label='delete' sx={{ transform: 'translateX(-16px)' }} onClick={onClickBackBtn}>
					<img src='/assets/icons/arrow-left.svg' alt='arrow-left' />
				</IconButton>
				<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' sx={{ transform: 'translate(-10px, 8px)' }}>
					Back
				</Typography>
			</Stack>

			<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
				Shipping Address
			</Typography>

			<Grid container spacing={3} sx={{ mt: '1px' }}>
				<Grid item xs={12}>
					<TextField
						label='First Nmae'
						size='small'
						placeholder='Enter First name'
						labelProps={{ color: 'text.Blue600' }}
						value={state.firstname}
						onChange={(e) => setstate((pre) => ({ ...pre, firstname: e.target.value }))}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						label='Last name'
						size='small'
						placeholder='Enter Last name'
						labelProps={{ color: 'text.Blue600' }}
						value={state.lastname}
						onChange={(e) => setstate((pre) => ({ ...pre, lastname: e.target.value }))}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						label='Phone'
						size='small'
						placeholder='Enter Phone'
						labelProps={{ color: 'text.Blue600' }}
						value={state.phone}
						onChange={(e) => setstate((pre) => ({ ...pre, phone: e.target.value }))}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						label='Address Line 1'
						size='small'
						placeholder='Enter Address'
						labelProps={{ color: 'text.Blue600' }}
						value={state.address}
						onChange={(e) => setstate((pre) => ({ ...pre, address: e.target.value }))}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						label='Address Line 2'
						size='small'
						placeholder='Enter Address'
						labelProps={{ color: 'text.Blue600' }}
						value={state.address_two}
						onChange={(e) => setstate((pre) => ({ ...pre, address_two: e.target.value }))}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						label='Landmark (Optional)'
						size='small'
						placeholder='Enter Landmark'
						labelProps={{ color: 'text.Blue600' }}
						value={state.landmark}
						onChange={(e) => setstate((pre) => ({ ...pre, landmark: e.target.value }))}
					/>
				</Grid>

				<Grid item md={6} xs={12}>
					<TextField
						label='City'
						size='small'
						placeholder='Select City'
						labelProps={{ color: 'text.Blue600' }}
						value={state.city}
						onChange={(e) => setstate((pre) => ({ ...pre, city: e.target.value }))}
					/>
				</Grid>

				<Grid item md={6} xs={12} sx={{ pl: { md: '17px !important' } }}>
					<TextField
						label='State'
						size='small'
						placeholder='Select State'
						labelProps={{ color: 'text.Blue600' }}
						value={state.state}
						onChange={(e) => setstate((pre) => ({ ...pre, state: e.target.value }))}
					/>
				</Grid>

				<Grid item md={6} xs={12}>
					<TextField
						label='Zip Code'
						size='small'
						placeholder='Enter Zip Code'
						labelProps={{ color: 'text.Blue600' }}
						value={state.zip}
						onChange={(e) => setstate((pre) => ({ ...pre, zip: filterNumber(e.target.value) }))}
					/>
				</Grid>

				<Grid item md={6} xs={12} sx={{ pl: { md: '17px !important' } }}>
					<Select
						label={<InputLabel title='Location Type' />}
						value={state.address_type}
						onChange={(e) => setstate((pre) => ({ ...pre, address_type: e.target.value }))}
						placeholder='Enter Location Name'
						size='small'
						name='bloodtype'
					>
						<MenuItem value='home'>Home</MenuItem>
						<MenuItem value='office'>Office</MenuItem>
					</Select>
				</Grid>
			</Grid>

			<div style={{ marginTop: '130px', textAlign: 'end' }}>
				<Button
					variant='contained'
					size='medium'
					color='darkYellow'
					sx={{ px: '35px' }}
					onClick={() => {
						update ? handleUpdate() : handleSubmit();
					}}
				>
					<Typography variant='subtitle2' fontWeight='bold'>
						{update ? 'Update' : 'Add Address'}
					</Typography>
				</Button>
			</div>
		</Box>
	);
}

const mapStateToProps = ({ storage }) => {
	return {
		redirectUrl: storage.addAddressUrl,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAuth: (redirectUrl) => dispatch(authActions.delete(redirectUrl)),
		deleteredirectUrl: () => dispatch(storageActions.delete('addAddressUrl')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditViewAddress);
