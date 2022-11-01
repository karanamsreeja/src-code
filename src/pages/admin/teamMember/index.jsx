import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router-dom';

import Select from 'components/Select';
import TextField from 'components/TextField';
import ButtonDropDown from 'components/ButtonDropDown';
import Table from 'components/Table/Table';
import TableBody from 'components/Table/TableBody';
import TableCell from 'components/Table/TableCell';
import TableHead from 'components/Table/TableHead';
import TableRow from 'components/Table/TableRow';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import { axiosDelete, axiosGet, axiosPost } from 'helpers/axios';

import { adminActions } from 'store/action/adminActions';
import { connect } from 'react-redux';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 220,
		},
	},
};

const FilterList = [
	{ title: 'User Name', id: 'fullname' },
	{ title: 'Email', id: 'email' },
	{ title: 'Number', id: 'phone' },
	{ title: 'Team', id: 'role' },
];

const AddNewMemberPopup = ({ popupOpen, setpopupOpen, updateList, setloading }) => {
	const [state, setState] = useState({ firstname: '', lastname: '', email: '', phone: '', role: '', password: '' });

	const handleAddNewMember = async () => {
		setloading({ message: 'Adding new member...' });

		const res = await axiosPost(
			'/admin/members/add',
			{
				fullname: state.firstname + '' + state.lastname,
				email: state.email,
				phone: state.phone,
				role: state.role,
				password: state.password,
			},
			setloading
		);

		if (res.status === 201) {
			updateList({
				fullname: state.firstname + '' + state.lastname,
				email: state.email,
				phone: state.phone,
				role: state.role,
				_id: res.data.user?._id,
			});
			setpopupOpen(false);
		}
	};

	return (
		<Dialog
			open={popupOpen}
			onClose={() => setpopupOpen(false)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			sx={{ backdropFilter: 'blur(1px)', background: 'rgb(33 33 33 / 70%)' }}
		>
			<DialogContent sx={{ p: '24px', minWidth: '400px' }}>
				<div>
					<Typography variant='subtitle1' fontWeight='bold' color='#212121' sx={{ mb: '16px' }}>
						Select Delivery Partner
					</Typography>
				</div>

				<div style={{ width: '100%', marginBottom: '16px' }}>
					<Grid container spacing={2}>
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
						<Grid item md={6} xs={12}>
							<TextField
								label='Password'
								placeholder='Enter Password'
								size='small'
								value={state.password}
								onChange={(e) => setState((pre) => ({ ...pre, password: e.target.value }))}
							/>
						</Grid>
					</Grid>
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant='contained' size='medium' color='darkYellow' sx={{ borderRadius: '4px' }} onClick={handleAddNewMember}>
						<Typography variant='subtitle2' fontWeight='bold'>
							Add Team Member
						</Typography>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

const Customer = ({ storeAdd }) => {
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const navigate = useNavigate();

	const [state, setState] = useState([]);
	const [filterState, setfilterState] = useState([]);
	const [filterBy, setFilterBy] = useState('fullname');
	const [popupOpen, setpopupOpen] = useState(false);

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/admin/team-members', {}, setloading);

			if (res.status === 200) {
				setState(res.data.users);
				setfilterState(res.data.users);
			}
		}

		getData();
	}, []);

	const handleFilter = (search) => {
		if (search === '' || filterBy === '') {
			setfilterState(state);
		} else {
			setfilterState(state.filter((e) => e[filterBy]?.includes(search)));
		}
	};

	const handleEdit = (item) => {
		storeAdd(item._id, item);
		navigate(item._id);
	};

	const handleDelete = async (userId) => {
		if (!window.confirm('Are you sure you want to delete?')) return;

		setloading({ message: 'Deleting user...' });
		const res = await axiosDelete('/admin/members/delete', { userId }, setloading);

		if (res.status === 200) {
			const newList = state.filter((e) => e._id !== userId);

			setState(newList);
			setfilterState(newList);
		}
	};

	const handleOpenAddNewMemberPopup = () => {
		setpopupOpen(true);
	};

	const updateList = (data) => {
		const newList = [...state, data];
		setState(newList);
		setfilterState(newList);
	};

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} fixed />}
			<Container className='container-x'>
				<Typography
					variant='caption'
					fontWeight='bold'
					color='text.darkerYellow'
					fontSize='10px'
					letterSpacing='1.5px'
					component='div'
					gutterBottom
				>
					SUPERADMIN
				</Typography>
				<Typography variant='h4' fontWeight='bold' color='text.darkBlue' sx={{ mb: '8px' }}>
					Customers
				</Typography>
				<Typography variant='subtitle2' fontWeight={400} color='text.Blue600' sx={{ mb: '39px' }}>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
					quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
				</Typography>

				<Typography variant='subtitle1' fontWeight='bold' color='text.darkerYellow' className='pointer' onClick={handleOpenAddNewMemberPopup}>
					+ Add a New Member
				</Typography>

				<Divider sx={{ my: '29px' }} />

				<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '37px' }}>
					<div style={{ width: '40%' }}>
						<TextField
							placeholder='Search Orders'
							size='small'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<img src='/assets/icons/search.svg' alt='search' style={{ marginRight: '13px' }} />
									</InputAdornment>
								),
							}}
							onChange={(e) => handleFilter(e.target.value)}
							sx={{ background: '#FAFAFA' }}
						/>
					</div>
					<ButtonDropDown btnTitle='Filter By' list={FilterList} onClick={(id) => setFilterBy(id)} />
				</div>

				<TableContainer>
					<Table sx={{ minWidth: 650, whiteSpace: 'nowrap' }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='left'>User Name</TableCell>
								<TableCell align='left'>Email</TableCell>
								<TableCell align='left'>Number</TableCell>
								<TableCell align='left'>Team</TableCell>
								<TableCell align='left'>ACTION</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filterState?.map((e) => (
								<TableRow key={e._id}>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
											{e.fullname}
										</Typography>
									</TableCell>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
											{e.email}
										</Typography>
									</TableCell>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
											{e.phone}
										</Typography>
									</TableCell>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
											{e.role}
										</Typography>
									</TableCell>
									<TableCell align='left'>
										<Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1}>
											<IconButton aria-label='edit' size='small' onClick={() => handleEdit(e)}>
												<EditIcon fontSize='small' />
											</IconButton>
											<IconButton aria-label='delete' size='small' onClick={() => handleDelete(e._id)}>
												<DeleteIcon fontSize='small' />
											</IconButton>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>

			{popupOpen && <AddNewMemberPopup popupOpen={popupOpen} setpopupOpen={setpopupOpen} setloading={setloading} updateList={updateList} />}
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		storeAdd: (key, value) => dispatch(adminActions.storeAdd(key, value)),
	};
};
export default connect(null, mapDispatchToProps)(Customer);
