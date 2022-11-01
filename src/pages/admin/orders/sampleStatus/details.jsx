import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { axiosGet } from 'helpers/axios';
import { Link, useParams } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
	box: {
		borderRadius: '4px',
		border: '1px solid #E0E0E0',
		overflow: 'hidden',
	},
	stack: {
		padding: '32px',
		background: '#F5F5F5',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	listItem: {
		padding: '19px 22px',
		marginBottom: '11px',
		background: '#F5F5F5',
		borderRadius: '6px',
	},
}));

function OrderDetails() {
	const classes = useStyle();
	const [state, setState] = useState({});
	const [loading, setloading] = useState({ message: 'Fetching orders...' });
	let { id } = useParams();

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/admin/pickups/details', { pickupId: id }, setloading);

			if (res.status === 200) {
				let details = {};

				details.estimated_date = '';
				details.order_on = '';
				details.kits = res.data.pickup.kits;
				details.numberOfKits = res.data.pickup.kits.length;
				details.address =
					[res.data.pickup.address.address, res.data.pickup.address.landmark, res.data.pickup.address.city, res.data.pickup.address.state]
						.filter((e) => e !== '')
						.join(', ') +
					' - ' +
					res.data.pickup.address.zip;
				details.fullname = res.data.pickup.user.fullname;
				details.email = res.data.pickup.user.email;
				details.phone = res.data.pickup.user.phone;
				details.paymentMethod = 'Card';

				setState(details);
			}
		}

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className='container-x'>
				<Stack direction='row' sx={{ mb: '30px' }}>
					<IconButton aria-label='delete' sx={{ transform: 'translateX(-16px)' }} component={Link} to='/admin/orders/sample-status'>
						<img src='/assets/icons/arrow-left.svg' alt='arrow-left' />
					</IconButton>
					<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' sx={{ transform: 'translate(-10px, 8px)' }}>
						Back
					</Typography>
				</Stack>

				<div className={classes.box}>
					<div style={{ padding: '15px 32px', background: '#25468A' }}>
						<Typography variant='caption' letterSpacing='1px' lineHeight='20px' fontWeight='bold' color='white' textTransform='uppercase'>
							Estimated date of delivery: {state.estimated_date}
						</Typography>
					</div>
					<Stack direction='row' className={classes.stack}>
						<div>
							<Typography
								variant='caption'
								fontSize='10px'
								letterSpacing='1px'
								lineHeight='20px'
								fontWeight='bold'
								color='text.darkYellow'
							>
								REQUEST ID
							</Typography>
							<Typography variant='h5' fontWeight='bold' color='#212121'>
								#{id}
							</Typography>
							{/* <Typography
								variant='caption'
								fontSize='10px'
								letterSpacing='1px'
								lineHeight='20px'
								fontWeight='bold'
								color='text.greyLightText'
								textTransform='uppercase'
							>
								ORdered on: {state.order_on}
							</Typography> */}
						</div>
					</Stack>

					<div style={{ padding: '32px' }}>
						<Grid container spacing={4} sx={{ marginBottom: '46px' }}>
							<Grid container item md={7} xs={12} spacing={3}>
								<Grid item>
									<img src='/assets/order-default.png' alt='order-default' style={{ width: '139px', height: '106px' }} />
								</Grid>
								<Grid container alignItems='center' item xs>
									<div>
										<Typography variant='subtitle1' fontWeight='bold' lineHeight='22px' color='#212121'>
											Registered Kits ({state.numberOfKits})
										</Typography>
										{state.kits?.map((e) => (
											<Typography
												variant='subtitle2'
												fontWeight={500}
												color='text.greyLightText'
												sx={{ mb: '11px' }}
												key={e._id}
											>
												KIT ID: {e._id}
											</Typography>
										))}
										<Typography variant='h5' fontWeight='bold' color='text.darkYellow'>
											{state.price}
										</Typography>
									</div>
								</Grid>
							</Grid>

							<Grid item md={5} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
								<div>
									<Typography variant='subtitle2' fontWeight='bold' color='#212121' lineHeight='20px'>
										Pickup Address
									</Typography>
									<Typography variant='caption' fontWeight={400} color='text.greyLightText' lineHeight='20px' sx={{ mb: '11px' }}>
										{state.address}
									</Typography>
								</div>
							</Grid>
						</Grid>
						<Divider sx={{ mt: '49px', mb: '37px' }} />

						<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '30px' }}>
							Customer Account Details
						</Typography>
						<Stack direction='row' justifyContent='space-between'>
							<Typography variant='subtitle2' fontWeight={500} color='text.Blue600'>
								<img src='/assets/icons/person.svg' alt='person' style={{ transform: 'translateY(30%)', marginRight: '13px' }} />
								{state.fullname}
							</Typography>
							<Typography variant='subtitle2' fontWeight={500} color='text.Blue600'>
								<img src='/assets/icons/email.svg' alt='email' style={{ transform: 'translateY(30%)', marginRight: '13px' }} />
								{state.email}
							</Typography>
							<Typography variant='subtitle2' fontWeight={500} color='text.Blue600'>
								<img src='/assets/icons/phone.svg' alt='phone' style={{ transform: 'translateY(30%)', marginRight: '13px' }} />
								{state.phone}
							</Typography>
							<Typography variant='subtitle2' fontWeight={500} color='text.Blue600'>
								<img
									src='/assets/icons/credit_card.svg'
									alt='credit_card'
									style={{ transform: 'translateY(30%)', marginRight: '13px' }}
								/>

								{state.paymentMethod}
							</Typography>
						</Stack>
					</div>
				</div>
			</Container>
		</>
	);
}

export default OrderDetails;
