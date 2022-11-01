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

const useStyles = makeStyles((theme) => ({}));

const FilterList = [
	{ title: 'Kit ID', id: 'id' },
	{ title: 'Patient Name', id: 'fullname' },
	{ title: 'Recieved on', id: 'recieved_on' },
];

const reasonList = ['damaged'];

const Received = () => {
	const classes = useStyles();
	const [loading, setloading] = useState({ message: 'Fetching data...' });

	const [state, setState] = useState([]);
	const [filterState, setfilterState] = useState([]);
	const [filterBy, setFilterBy] = useState('');
	const [popupOpen, setpopupOpen] = useState(false);

	const [selectedId, setselectedId] = useState(null);
	const [reason, setReason] = useState('');
	const [btnDisabled, setbtnDisabled] = useState({});

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/clinical/samples', { status: 'received' }, setloading);

			if (res.status === 200) {
				const arr = res.data.kits.map((e) => ({
					id: e._id,
					fullname: e.patient_id.firstname + ' ' + e.patient_id.lastname,
					recieved_on: OrderDateTimeFormatter(e.timestamps?.pickup_completed_on),
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

	const initRejectSample = (id) => {
		setselectedId(id);
		setpopupOpen(true);
	};

	const handleApproveSample = async (kitId) => {
		setloading({ message: 'Processing...' });
		const res = await axiosPut('/clinical/sample/approve', { kitId }, setloading);

		if (res.status === 200) {
			setbtnDisabled((pre) => ({ ...pre, [kitId]: true }));
		}
	};

	const handleRejectSample = async () => {
		setpopupOpen(false);
		if (reason === '') return;

		setloading({ message: 'Processing...' });
		const res = await axiosPut('/clinical/sample/reject', { kitId: selectedId, sampleRejectionReason: reason }, setloading);

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
					SAMPLE TESTING
				</Typography>
				<Typography variant='h4' fontWeight='bold' color='text.darkBlue' sx={{ mb: '8px' }}>
					Samples Recieved
				</Typography>
				<Typography variant='subtitle2' fontWeight={400} color='text.Blue600' sx={{ mb: '39px' }}>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
					quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
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
								<TableCell align='left'>Kit ID</TableCell>
								<TableCell align='left'>Patient Name</TableCell>
								<TableCell align='left'>Recieved on</TableCell>
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
											{e.recieved_on}
										</Typography>
									</TableCell>

									<TableCell align='left'>
										<Button
											variant='contained'
											color='darkerRed'
											size='small'
											sx={{ borderRadius: '4px', mr: '10px' }}
											onClick={() => initRejectSample(e.id)}
											disabled={btnDisabled[e.id]}
										>
											<Typography variant='subtitle2' fontWeight='bold' color='white'>
												Reject Sample
											</Typography>
										</Button>
										<Button
											variant='contained'
											color='darkYellow'
											size='small'
											sx={{ borderRadius: '4px' }}
											onClick={() => handleApproveSample(e.id)}
											disabled={btnDisabled[e.id]}
										>
											<Typography variant='subtitle2' fontWeight='bold' color='white'>
												Approve Sample
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
								Reason for Rejection
							</Typography>
						</div>

						<div style={{ width: '100%', marginBottom: '16px' }}>
							<Autocomplete
								size='small'
								fullWidth
								onChange={(event, newValue) => {
									setReason(newValue);
								}}
								options={reasonList}
								renderOption={(props, option) => (
									<li {...props} key={option}>
										{option}
									</li>
								)}
								getOptionLabel={(option) => option}
								renderInput={(params) => <TextField {...params} label='' placeholder='Reason for Rejection' />}
							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button variant='contained' size='medium' color='darkYellow' sx={{ borderRadius: '4px' }} onClick={handleRejectSample}>
								<Typography variant='subtitle2' fontWeight='bold'>
									Reject Sample
								</Typography>
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default Received;
