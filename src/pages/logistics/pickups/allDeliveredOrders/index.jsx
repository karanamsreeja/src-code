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
	{ title: 'Request ID', id: 'id' },
	{ title: 'Ordered delivered on', id: 'order_on' },
	{ title: 'Delivered By', id: 'fullname' },
];

const AllDeliveredOrders = () => {
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState([]);
	const [filterState, setfilterState] = useState([]);
	const [filterBy, setFilterBy] = useState('');

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/logistics/pickups/delivered', {}, setloading);

			if (res.status === 200) {
				const arr = res.data.pickups.map((e) => ({
					id: e._id,
					fullname: e.pickedup_by.fullname,
					order_on: OrderDateTimeFormatter(e.delivered_on),
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
					SAMPLE PICKUPS
				</Typography>
				<Typography variant='h4' fontWeight='bold' color='text.darkBlue' sx={{ mb: '8px' }}>
					All Delivered Orders
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
								<TableCell align='left'>Request ID</TableCell>
								<TableCell align='left'>Ordered delivered on</TableCell>
								<TableCell align='left' colSpan={2}>
									Delivered By
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
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);
};

export default AllDeliveredOrders;