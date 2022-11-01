import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

import LoadingBoxComponent from 'components/LoadingBoxComponent';
import Select from 'components/Select';
import TextField from 'components/TextField';

import { axiosGet, axiosPut } from 'helpers/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 220,
		},
	},
};

const Edit = ({ store }) => {
	const [loading, setloading] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	const [state, setState] = useState({ firstname: '', lastname: '', email: '', phone: '', role: '' });

	useEffect(() => {
		async function getData() {
			setloading({ message: 'Fetching data...' });
			const res = await axiosGet('/admin/active-packages', {}, setloading);

			if (res.status === 200) {
				setState(res.data.packages);
			}
		}

		if (store[id]) {
			let user = {
				email: store[id].email,
				phone: store[id].phone,
				fullname: store[id].fullname.split(' '),
				role: store[id].role,
			};
			const firstname = user.fullname.shift();
			const lastname = user.fullname.join(' ');

			setState({
				firstname: firstname,
				lastname: lastname,
				email: user.email,
				phone: user.phone,
				role: user.role,
			});
		} else {
			// TODO
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const update = async () => {
		setloading({ message: 'Updating...' });
		const res = await axiosPut(
			'/admin/members/update',
			{
				userId: id,
				member: {
					fullname: state.firstname + '' + state.lastname,
					email: state.email,
					phone: state.phone.toString(),
					role: state.role,
				},
			},
			setloading
		);

		if (res.status === 200) {
			navigate('/admin/team-members', { replace: true });
		}
	};

	const handleGoToList = () => {
		navigate('/admin/team-members', { replace: true });
	};

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className='container-x'>
				<Stack direction='row' sx={{ mb: '16px' }}>
					<IconButton aria-label='delete' sx={{ transform: 'translateX(-16px)' }} onClick={handleGoToList}>
						<img src='/assets/icons/arrow-left.svg' alt='arrow-left' />
					</IconButton>
					<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' sx={{ transform: 'translate(-10px, 8px)' }}>
						Back
					</Typography>
				</Stack>

				<div className='box-border-light'>
					<Typography variant='h5' fontWeight='bold' color='text.greyDark' sx={{ mb: '19px' }}>
						User Details
					</Typography>

					<Grid container spacing={2} sx={{ mb: '33px' }}>
						<Grid item md={6} xs={12}>
							<TextField
								label='First Name'
								placeholder='Enter First Name'
								size='small'
								value={state.firstname}
								onChange={(e) => setState((pre) => ({ ...pre, firstname: e.target.value }))}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								label='Last Name'
								placeholder='Enter Last Name'
								size='small'
								value={state.lastname}
								onChange={(e) => setState((pre) => ({ ...pre, lastname: e.target.value }))}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								label='Email Address'
								placeholder='Enter Email Address'
								size='small'
								value={state.email}
								onChange={(e) => setState((pre) => ({ ...pre, email: e.target.value }))}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								label='Phone Number'
								placeholder='Enter Phone Number'
								size='small'
								value={state.phone}
								onChange={(e) => setState((pre) => ({ ...pre, phone: e.target.value }))}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<Select
								label='Team'
								placeholder='Enter Team'
								size='small'
								labelProps={{ color: 'text.darkBlue' }}
								name='role'
								value={state.role}
								onChange={(e) => setState((pre) => ({ ...pre, role: e.target.value }))}
								MenuProps={MenuProps}
							>
								<MenuItem value='logistics-lead'>logistics-lead</MenuItem>
								<MenuItem value='logistics-member'>logistics-member</MenuItem>
								<MenuItem value='warehouse'>warehouse</MenuItem>
								<MenuItem value='clinical'>clinical</MenuItem>
								<MenuItem value='ai'>ai</MenuItem>
							</Select>
						</Grid>
					</Grid>

					<div style={{ textAlign: 'end' }}>
						<Button sx={{ mt: '27px' }} size='small' variant='contained' color='darkYellow' onClick={update}>
							<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
								Save Changes
							</Typography>
						</Button>
					</div>
				</div>
			</Container>
		</>
	);
};

const mapStateToProps = ({ admin }) => {
	return {
		store: admin.store,
	};
};
export default connect(mapStateToProps)(Edit);
