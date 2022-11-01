import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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

import { axiosGet } from 'helpers/axios';
import { OrderDateTimeFormatter } from 'helpers/formatter';
import { Link } from 'react-router-dom';

const FilterList = [
	{ title: 'Order ID', id: 'id' },
	{ title: 'Client Name', id: 'name' },
	{ title: 'Date and time Of Pickup', id: 'time' },
	{ title: 'Picked up By', id: 'pickBy' },
];

const DispatchedOrders = () => {
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState([]);
	const [filterState, setfilterState] = useState([]);
	const [filterBy, setFilterBy] = useState('');

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/warehouse/orders/dispatched', {}, setloading);

			if (res.status === 200) {
				const arr = res.data.dispatchedOrders.map((e) => ({
					id: e._id,
					name: e.user.fullname,
					time: OrderDateTimeFormatter(e.dispatch.dispatched_on),
					pickBy: e.dispatch.dispatched_by?.fullname,
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
					Dispatched Orders
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
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='left'>Order ID</TableCell>
								<TableCell align='left'>Client Name</TableCell>
								<TableCell align='center'>Date and time Of Pickup</TableCell>
								<TableCell align='center'>Picked up By </TableCell>
								<TableCell align='right'>ACTION</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filterState.map((e) => (
								<TableRow key={e.id}>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
											#{e.id}
										</Typography>
									</TableCell>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight={500} color='#212121'>
											{e.name}
										</Typography>
									</TableCell>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight={500} color='#212121'>
											{e.time}
										</Typography>
									</TableCell>
									<TableCell scope='row' align='left'>
										<Typography variant='subtitle1' fontWeight={500} color='#212121'>
											{e.pickBy}
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
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);
};

export default DispatchedOrders;
