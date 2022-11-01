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
import { OrderDateTimeFormatter } from 'helpers/formatter';
import { Link } from 'react-router-dom';

const FilterList = [
	{ title: 'Order ID', id: 'id' },
	{ title: 'Order picked up on', id: 'order_on' },
	{ title: 'Assigned to', id: 'fullname' },
];

const DeliveriesInProgress = () => {
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState([]);
	const [filterState, setfilterState] = useState([]);
	const [btnDisabled, setbtnDisabled] = useState({});
	const [filterBy, setFilterBy] = useState('');

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/logistics/orders/in-progress', {}, setloading);

			if (res.status === 200) {
				const arr = res.data.orders.map((e) => ({
					id: e._id,
					fullname: e.dispatch.dispatched_by?.fullname,
					order_on: OrderDateTimeFormatter(e.dispatch.initiated_on),
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

	const handleOrderDelivered = async (order_id) => {
		setloading({ message: 'Processing order delivered ...' });
		const res = await axiosPut('/logistics/orders/delivered', { order_id }, setloading);

		if (res.status === 200) {
			setbtnDisabled((pre) => ({ ...pre, [order_id]: true }));
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
					KIT ORDERS
				</Typography>
				<Typography variant='h4' fontWeight='bold' color='text.darkBlue' sx={{ mb: '8px' }}>
					All Deliveries In Progress
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
								<TableCell align='left'>Ordered picked up on</TableCell>
								<TableCell align='left'>Assigned to</TableCell>
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
									<TableCell scope='row' align='left' sx={{ width: '50%' }}>
										<Typography variant='subtitle1' fontWeight={500} color='#212121'>
											{e.order_on}
										</Typography>
									</TableCell>
									<TableCell scope='row' align='left' sx={{ width: '50%' }}>
										<Typography variant='subtitle1' fontWeight={500} color='#212121'>
											{e.fullname}
										</Typography>
									</TableCell>
									<TableCell align='left'>
										<Typography
											variant='subtitle2'
											color='text.Blue600'
											sx={{ textDecoration: 'underline' }}
											component={Link}
											to={e.id}
										>
											View Details
										</Typography>
									</TableCell>
									<TableCell align='left'>
										<Button
											variant='contained'
											color='darkYellow'
											size='small'
											sx={{ borderRadius: '4px' }}
											onClick={() => handleOrderDelivered(e.id)}
											disabled={btnDisabled[e.id]}
										>
											<Typography variant='subtitle2' fontWeight='bold' color='white'>
												Order Delivered
											</Typography>
										</Button>
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

export default DeliveriesInProgress;
