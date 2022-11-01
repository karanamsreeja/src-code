import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import Box from 'components/Box';
import TextField from 'components/TextField';
import Select from 'components/Select';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import InputLabel from 'components/site/InputLabel';

import { axiosPost, axiosPut, axiosGet } from 'helpers/axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';
import { storageActions } from 'store/action/storageAction';

function AddEditViewMember({ redirectUrl, deleteredirectUrl, deleteAuth }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [state, setstate] = useState({
		firstname: '',
		lastname: '',
		age: '',
		gender: '',
		blood_type: '',
		existing_disease: '',
		details: '',
	});
	const params = useParams();
	const [update, setupdate] = useState(false);
	const [loading, setloading] = useState(null);

	useEffect(() => {
		async function getData() {
			if (location.state?.editableMember) {
				setstate(location.state.editableMember);
				setupdate(true);
				navigate('/user/account/member/add', { state: {}, replace: true });
			} else if (params?.id) {
				setloading({ message: 'Fetching member Details.' });
				const memberDetails = await axiosGet('/member', { member_id: params.id }, setloading);
				if (memberDetails.status === 200) {
					setstate({
						firstname: memberDetails.data.member.firstname,
						lastname: memberDetails.data.member.lastname,
						age: memberDetails.data.member.age,
						gender: memberDetails.data.member.gender,
						blood_type: memberDetails.data.member.blood_type,
						existing_disease: memberDetails.data.member.existing_disease,
						details: memberDetails.data.member.details,
						_id: params.id,
					});
					setupdate(true);
				}
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
		const res = await axiosPost('/members/create', state, setloading, () => deleteAuth('/user/account/member'));

		if (res.status === 201) {
			navigate('/user/account/member');
		}
	};

	const handleUpdate = async () => {
		setloading({ message: 'Updating Details.' });
		const res = await axiosPut(
			'/members/update',
			{
				firstname: state.firstname,
				lastname: state.lastname,
				age: state.age,
				gender: state.gender,
				blood_type: state.blood_type,
				existing_disease: state.existing_disease,
				details: state.details,
				_id: state._id,
			},
			setloading,
			() => deleteAuth('/user/account/member')
		);

		if (res.status === 200) {
			navigate('/user/account/member');
		}
	};

	const onClickBackBtn = () => {
		if (redirectUrl) {
			const url = redirectUrl;
			deleteredirectUrl();
			navigate(url, { replace: true });
		} else {
			navigate('/user/account/member', { replace: true });
		}
	};

	return (
		<Box sx={{ p: '30px 34px', position: 'relative', minHeight: '50vh' }}>
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
				Patients Details
			</Typography>

			<Grid container spacing={3} sx={{ mt: '2px' }}>
				<Grid item md={6} xs={12}>
					<TextField
						label='First Name'
						size='small'
						name='firstname'
						placeholder='Enter First Name'
						labelProps={{ color: 'text.Blue600' }}
						value={state.firstname}
						onChange={(e) => setstate((pre) => ({ ...pre, firstname: e.target.value }))}
					/>
				</Grid>
				<Grid item md={6} xs={12} sx={{ pl: { md: '17px !important' } }}>
					<TextField
						label='Last Name'
						size='small'
						name='lastname'
						placeholder='Enter Last Name'
						labelProps={{ color: 'text.Blue600' }}
						value={state.lastname}
						onChange={(e) => setstate((pre) => ({ ...pre, lastname: e.target.value }))}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<TextField
						label='Age'
						size='small'
						name='age'
						placeholder='Select Age'
						labelProps={{ color: 'text.Blue600' }}
						value={state.age}
						onChange={(e) => setstate((pre) => ({ ...pre, age: e.target.value }))}
					/>
				</Grid>
				<Grid item md={6} xs={12} sx={{ pl: { md: '17px !important' } }}>
					<Select
						label={<InputLabel title='Gender' />}
						value={state.gender}
						onChange={(e) => setstate((pre) => ({ ...pre, gender: e.target.value }))}
						placeholder='Select Gender'
						size='small'
						name='gender'
					>
						<MenuItem value='male'>Male</MenuItem>
						<MenuItem value='female'>Female</MenuItem>
						<MenuItem value='other'>Other</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12}>
					<Select
						label={<InputLabel title='Blood Type' />}
						value={state.blood_type}
						onChange={(e) => setstate((pre) => ({ ...pre, blood_type: e.target.value }))}
						placeholder='Select Blood Type'
						size='small'
						name='bloodtype'
					>
						<MenuItem value='A+'>A+</MenuItem>
						<MenuItem value='A-'>A-</MenuItem>
						<MenuItem value='B+'>B+</MenuItem>
						<MenuItem value='B-'>B-</MenuItem>
						<MenuItem value='O+'>O+</MenuItem>
						<MenuItem value='O-'>O-</MenuItem>
						<MenuItem value='AB+'>AB+</MenuItem>
						<MenuItem value='AB-'>AB-</MenuItem>
					</Select>
				</Grid>
				{/* <Grid item md={6} xs={12} sx={{ pl: { md: '17px !important' } }}>
					<TextField
						label='Existing Disease'
						size='small'
						name='disease'
						placeholder='Select Existing Diseases'
						labelProps={{ color: 'text.Blue600' }}
						value={state.existing_disease}
						onChange={(e) => setstate((pre) => ({ ...pre, existing_disease: e.target.value }))}
					/>
				</Grid> */}
				{/* <Grid item xs={12}>
					<TextField
						label='Details'
						size='small'
						name='details'
						placeholder='Enter Details'
						multiline
						rows={4}
						labelProps={{ color: 'text.Blue600' }}
						value={state.details}
						onChange={(e) => setstate((pre) => ({ ...pre, details: e.target.value }))}
					/>
				</Grid> */}
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
						{update ? 'Update' : 'Add Member'}
					</Typography>
				</Button>
			</div>
		</Box>
	);
}

const mapStateToProps = ({ storage }) => {
	return {
		redirectUrl: storage.addMemberUrl,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAuth: (redirectUrl) => dispatch(authActions.delete(redirectUrl)),
		deleteredirectUrl: () => dispatch(storageActions.delete('addMemberUrl')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditViewMember);
