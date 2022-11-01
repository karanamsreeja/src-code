import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Autocomplete from '@mui/material/Autocomplete';

import { makeStyles } from '@mui/styles';

import TextField from 'components/TextField';
import ButtonDropDown from 'components/ButtonDropDown';
import Table from 'components/Table/Table';
import TableBody from 'components/Table/TableBody';
import TableCell from 'components/Table/TableCell';
import TableHead from 'components/Table/TableHead';
import TableRow from 'components/Table/TableRow';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import { axiosGet, axiosPut } from 'helpers/axios';
import { OrderDateTimeFormatter } from 'helpers/formatter';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({}));

const FilterList = [
	{ title: 'Order ID', id: 'id' },
	{ title: 'Client Name', id: 'fullname' },
	{ title: 'Request raised on', id: 'order_on' },
	{ title: 'Delivery address', id: 'address' },
];

const PickupRequests = () => {
	const classes = useStyles();
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState([]);
	const [filterState, setfilterState] = useState([]);
	const [popupOpen, setpopupOpen] = useState(false);
	const [selectedId, setselectedId] = useState(null);
	const [selectedMemberId, setselectedMemberId] = useState(null);
	const [membersList, setmembersList] = useState([]);
	const [btnDisabled, setbtnDisabled] = useState({});
	const [filterBy, setFilterBy] = useState('');

	useEffect(() => {
		async function getData() {
			const members = await axiosGet('/logistics/members', {}, () => {});
			if (members.status === 200) {
				setmembersList(members.data.logisticsMember);
			}
			const res = await axiosGet('/logistics/orders', {}, setloading);

			if (res.status === 200) {
				const arr = res.data.pickups.map((e) => ({
					id: e._id,
					fullname: e.user?.fullname,
					order_on: OrderDateTimeFormatter(e.dispatch.initiated_on),
					address: [e.address.address, e.address.address_two, e.address.landmark, e.address.city, e.address.state, e.address.zip].join(
						', '
					),
				}));
				setState(arr);
				setfilterState(arr);
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

	const handleAssignPartner = async (id) => {
		setselectedId(id);
		setpopupOpen(true);
	};

	const handleAssignMember = async () => {
		if (!selectedMemberId) return;

		setpopupOpen(false);
		setloading({ message: 'Assigning member...' });
		const res = await axiosPut('/logistics/orders/assign', { order_id: selectedId, member_id: selectedMemberId }, setloading);
		setselectedMemberId(null);
		if (res.status === 200) {
			setbtnDisabled((pre) => ({ ...pre, [selectedId]: true }));
		}
	};

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
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
					ORDERS
				</Typography>
				<Typography variant='h4' fontWeight='bold' color='text.darkBlue' sx={{ mb: '8px' }}>
					Active Orders
				</Typography>
				<Typography variant='subtitle2' fontWeight={400} color='text.Blue600' sx={{ mb: '39px' }}>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
					quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
				</Typography>

				<Divider sx={{ my: '29px' }} />

				<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '37px' }}>
					<div style={{ width: '40%' }}>
						<TextField
							placeholder='Search your Projects'
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
								<TableCell align='left'>Order ID</TableCell>
								<TableCell align='left'>Client Name</TableCell>
								<TableCell align='left'>Request raised on</TableCell>
								<TableCell align='left'>Delivery address</TableCell>
								<TableCell align='right' colSpan={2}>
									ACTION
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filterState?.map((e) => (
								<TableRow key={e.id}>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
											#{e.id}
										</Typography>
									</TableCell>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
											{e.fullname}
										</Typography>
									</TableCell>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
											{e.order_on}
										</Typography>
									</TableCell>
									<TableCell align='left' sx={{ width: '80%', maxWidth: '300px' }}>
										<Typography variant='subtitle2' color='#212121' style={{ whiteSpace: 'break-spaces' }}>
											{e.address}
										</Typography>
									</TableCell>

									<TableCell align='left'>
										<Button
											variant='contained'
											color='darkYellow'
											size='small'
											sx={{ borderRadius: '4px' }}
											onClick={() => handleAssignPartner(e.id)}
											disabled={btnDisabled[e.id]}
										>
											<Typography variant='subtitle2' fontWeight='bold' color='white'>
												Assign Partner
											</Typography>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>

			{popupOpen && (
				<Dialog
					open={popupOpen}
					onClose={() => setpopupOpen(false)}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
					classes={{ paper: classes.dialog }}
					sx={{ backdropFilter: 'blur(1px)', background: 'rgb(33 33 33 / 70%)' }}
				>
					<DialogContent sx={{ p: '24px', minWidth: '400px' }}>
						<div>
							<Typography variant='subtitle1' fontWeight='bold' color='#212121' sx={{ mb: '16px' }}>
								Select Delivery Partner
							</Typography>
						</div>

						<div style={{ width: '100%', marginBottom: '16px' }}>
							<Autocomplete
								size='small'
								fullWidth
								onChange={(event, newValue) => {
									setselectedMemberId(newValue._id);
								}}
								options={membersList}
								renderOption={(props, option) => (
									<li {...props} key={option._id}>
										{option.fullname}
									</li>
								)}
								getOptionLabel={(option) => option.fullname}
								renderInput={(params) => <TextField {...params} label='' placeholder='Select Delivery Partner' />}
							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button variant='contained' size='medium' color='darkYellow' sx={{ borderRadius: '4px' }} onClick={handleAssignMember}>
								<Typography variant='subtitle2' fontWeight='bold'>
									Assign
								</Typography>
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

const Wrapper = ({ islogisticsLead }) => {
	if (!islogisticsLead) {
		return <></>;
	}

	return <PickupRequests />;
};

const mapStateToProps = ({ auth }) => {
	return { islogisticsLead: auth.logisticsLead };
};
export default connect(mapStateToProps)(Wrapper);
