import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import TextField from 'components/TextField';
import ButtonDropDown from 'components/ButtonDropDown';
import Table from 'components/Table/Table';
import TableBody from 'components/Table/TableBody';
import TableCell from 'components/Table/TableCell';
import TableHead from 'components/Table/TableHead';
import TableRow from 'components/Table/TableRow';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import { axiosGet, axiosPut } from 'helpers/axios';
import { OrderDateFormatter } from 'helpers/formatter';
import { Link } from 'react-router-dom';

const FilterList = [
	{ title: 'Order ID', id: '_id' },
	{ title: 'Client Name', id: 'n' },
	{ title: 'Ordered On', id: 'ordered_on' },
];

const ActiveOrders = () => {
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState([]);
	const [filterState, setfilterState] = useState([]);
	const [btnDisabled, setbtnDisabled] = useState({});

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/warehouse/orders/active', {}, setloading);

			if (res.status === 200) {
				setState(res.data.activeOrders);
				setfilterState(res.data.activeOrders);
			}
		}

		getData();
	}, []);

	const handleFilter = (e) => {};

	const handleInitiatePickup = async (order_id) => {
		setbtnDisabled((pre) => ({ ...pre, [order_id]: true }));
		const res = await axiosPut('/warehouse/orders/active/initiate', { order_id }, setloading);

		setbtnDisabled((pre) => ({ ...pre, [order_id]: false }));
		if (res.status === 200) {
			setState((pre) => pre.map((e) => (e._id === order_id ? { ...e, status: 'dispatch_initiated' } : e)));
			setfilterState((pre) => pre.map((e) => (e._id === order_id ? { ...e, status: 'dispatch_initiated' } : e)));
		}
	};

	const handlePausePickup = async (order_id) => {
		setbtnDisabled((pre) => ({ ...pre, [order_id]: true }));
		const res = await axiosPut('/warehouse/orders/active/pause', { order_id }, setloading);

		setbtnDisabled((pre) => ({ ...pre, [order_id]: false }));
		if (res.status === 200) {
			setState((pre) => pre.map((e) => (e._id === order_id ? { ...e, status: 'paid' } : e)));
			setfilterState((pre) => pre.map((e) => (e._id === order_id ? { ...e, status: 'paid' } : e)));
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
					<ButtonDropDown btnTitle='Filter By' list={FilterList} />
				</div>

				<TableContainer>
					<Table sx={{ minWidth: 650, whiteSpace: 'nowrap' }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='left'>Order ID</TableCell>
								<TableCell align='left'>Client Name</TableCell>
								<TableCell align='center'>ordered on</TableCell>
								<TableCell align='right' colSpan={2}>
									ACTION
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filterState?.map((e) => (
								<TableRow key={e._id}>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
											#{e._id}
										</Typography>
									</TableCell>
									<TableCell align='left' sx={{ width: '80%' }}>
										<Typography variant='subtitle2' color='#212121'>
											{e.user?.fullname}
										</Typography>
									</TableCell>
									<TableCell align='center' sx={{ width: '20%' }}>
										<Typography variant='subtitle2' color='#212121'>
											{(e.ordered_on && OrderDateFormatter(e.ordered_on)) || 'unknown'}
										</Typography>
									</TableCell>
									<TableCell align='left'>
										<Typography
											variant='subtitle2'
											color='text.Blue600'
											sx={{ textDecoration: 'underline' }}
											component={Link}
											to={e._id}
										>
											View Details
										</Typography>
									</TableCell>
									<TableCell align='left'>
										{(e.status === 'paid' || e.status === 'dispatch_paused') && (
											<Button
												variant='contained'
												color='darkYellow'
												size='small'
												sx={{ borderRadius: '4px', minWidth: '162px' }}
												onClick={() => handleInitiatePickup(e._id)}
												disabled={btnDisabled[e._id]}
											>
												<Typography variant='subtitle2' fontWeight='bold' color='white'>
													Initiate Pickup
												</Typography>
											</Button>
										)}
										{e.status === 'dispatch_initiated' && (
											<Button
												variant='contained'
												color='darkerRed'
												size='small'
												sx={{ borderRadius: '4px', minWidth: '162px' }}
												onClick={() => handlePausePickup(e._id)}
												disabled={btnDisabled[e._id]}
											>
												<Typography variant='subtitle2' fontWeight='bold' color='white'>
													Pause Pickup
												</Typography>
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);
};

export default ActiveOrders;
