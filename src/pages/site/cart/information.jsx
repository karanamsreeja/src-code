import React, { useEffect, useState } from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';

import { Link, useNavigate } from 'react-router-dom';

import Box from 'components/Box';
import CustomTextField from 'components/TextField';
import SocialIconButton from 'components/SocialIconButton';
import CollapsableBox from 'components/site/CollapsableBox';
import InputLabel from 'components/site/InputLabel';
import LoadingScreen from 'components/site/LoadingScreen';
import { INRFormatter } from 'helpers/formatter';

import { connect } from 'react-redux';
import { cartActions } from 'store/action/cartAction';
import { axiosGet, axiosPost } from 'helpers/axios';
import { authActions } from 'store/action/authAction';
import { storageActions } from 'store/action/storageAction';
import { logout } from 'helpers/auth';

const useRegisterPopupStyles = makeStyles((theme) => ({
	cardHeader: {
		position: 'relative',
		backgroundColor: theme.palette.background.darkBlue,
		padding: '30px 20px',
		overflow: 'hidden',
	},
	headerbg: {
		position: 'absolute',
		right: '-75px',
		top: '-78px',
	},
}));

const RegisterPopup = () => {
	const classes = useRegisterPopupStyles();

	return (
		<Paper sx={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '1px 4px 13px rgba(0, 0, 0, 0.1)' }}>
			<div className={classes.cardHeader}>
				<Typography variant='h5' fontWeight='bold' color='#FAFAFA'>
					Become a Part of IOM!
				</Typography>
				<Typography variant='subtitle2' color='#FAFAFA'>
					Sign up
				</Typography>
				<div className={classes.headerbg}>
					<img src='/assets/bg-logo.svg' alt='' />
				</div>
			</div>
			<div style={{ padding: '35px 25px' }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<CustomTextField label={<InputLabel title='Full Name' />} placeholder='Enter Full Name' size='small' />
					</Grid>
					<Grid item xs={12}>
						<CustomTextField label={<InputLabel title='Email Address' />} placeholder='Enter Email Address' size='small' />
					</Grid>
					<Grid item xs={12}>
						<CustomTextField label={<InputLabel title='Password' />} placeholder='Enter Password' size='small' />
					</Grid>
					<Grid item xs={12}>
						<Typography variant='caption' fontWeight={500}>
							<Checkbox sx={{ padding: 0, mr: '8px', mt: '-2px' }} size='small' color='darkYellow' />
							Remember me
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button variant='contained' color='darkYellow' sx={{ padding: '10px 16px' }} fullWidth>
							<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
								Sign Up
							</Typography>
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Divider>
							<Typography variant='subtitle2' color='#BDBDBD' fontWeight='bold'>
								or
							</Typography>
						</Divider>
					</Grid>
					<Grid container spacing={1} item xs={12}>
						<Grid item sm={6} xs={12}>
							<SocialIconButton
								icon={<DeleteIcon />}
								label={<Typography variant='caption'>Login with Facebook</Typography>}
								fullWidth
								sx={{ padding: '11px 24px' }}
							/>
						</Grid>
						<Grid item sm={6} xs={12}>
							<SocialIconButton
								icon={<DeleteIcon />}
								label={<Typography variant='caption'>Login with Google</Typography>}
								color='error'
								fullWidth
								sx={{ padding: '11px 24px' }}
							/>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</Paper>
	);
};

function Information({ email, updateAddress, cart, addRedirectUrlToStore, deleteAuth }) {
	const navigate = useNavigate();
	const [loading, setloading] = useState({ message: 'Fetching address details...' });
	const [init, setinit] = useState(null);
	const [open, setOpen] = useState(false);
	const [addressList, setaddressList] = useState([]);
	const [state, setstate] = useState({
		firstname: '',
		lastname: '',
		address: '',
		landmark: '',
		city: '',
		state: '',
		zip: '',
		phone: '',
		address_id: '',
	});

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/orders/current/status', {}, setloading, () => deleteAuth('/user/account/address'));
			const address = await axiosGet('/addresses', {}, setloading, () => deleteAuth('/user/account/address'));

			if (address.status === 200) {
				setaddressList([...address.data.addresses, { _id: '', addNew: true }]);
			}

			if (res.status === 200) {
				if (res.data.order?.address) {
					updateAddress({
						firstname: res.data.order.address.firstname,
						lastname: res.data.order.address.lastname,
						address: res.data.order.address.address,
						landmark: res.data.order.address.landmark,
						city: res.data.order.address.city,
						state: res.data.order.address.state,
						zip: res.data.order.address.zip,
						phone: res.data.order.address.phone,
						address_id: res.data.order.address._id,
					});
					setstate({
						firstname: res.data.order.address.firstname,
						lastname: res.data.order.address.lastname,
						address: res.data.order.address.address,
						landmark: res.data.order.address.landmark,
						city: res.data.order.address.city,
						state: res.data.order.address.state,
						zip: res.data.order.address.zip,
						phone: res.data.order.address.phone,
						address_id: res.data.order.address._id,
					});
				}
			}
		}

		if (init) return;
		if (!cart?.totalCart || cart?.totalCart === 0) {
			navigate('/site/cart', { replace: true });
			return;
		}
		setinit(true);
		if (!cart?.address?.firstname) {
			getData();
		} else {
			setstate(cart.address);
			setloading(null);
		}
	}, [init, navigate, deleteAuth, cart, updateAddress]);

	const handleAddressSubmit = async (event) => {
		try {
			event.preventDefault();

			setloading({ message: 'Updating address...' });
			const res = await axiosPost('/orders/create', state, setloading, () => deleteAuth('/user/account/address'));

			if (res.status === 201) {
				updateAddress(state);
				navigate('/site/cart/payment');
			}
		} catch (error) {}
	};

	const handleNewAddress = () => {
		addRedirectUrlToStore('addAddressUrl', window.location.pathname);
		navigate('/user/account/address/add');
	};

	return (
		<Container sx={{ pt: '50px' }}>
			<Breadcrumbs separator='›' aria-label='breadcrumb' style={{ marginBottom: '10px' }}>
				<Typography variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' color='text.darkBlue' letterSpacing='1.5px'>
					Patient Details
				</Typography>
				<Typography
					color='text.darkerYellow'
					variant='caption'
					fontSize='10px'
					textTransform='uppercase'
					fontWeight='bold'
					letterSpacing='1.5px'
				>
					information
				</Typography>
				<Typography variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
					payment
				</Typography>
			</Breadcrumbs>
			{loading && <LoadingScreen message={loading?.message} />}

			<Grid container spacing={2}>
				<Grid item md={7} xs={12} component='form' onSubmit={handleAddressSubmit}>
					<Grid item xs={12}>
						<CollapsableBox
							title='Shipping Address'
							headerOptions={
								<Autocomplete
									sx={{ flex: 1, maxWidth: '50%' }}
									size='small'
									disableClearable
									value={state}
									onChange={(event, newValue) => {
										if (newValue.addNew) {
											handleNewAddress();
										} else {
											setstate((pre) => ({
												...pre,
												firstname: newValue.firstname,
												lastname: newValue.lastname,
												address: newValue.address,
												landmark: newValue.landmark,
												city: newValue.city,
												state: newValue.state,
												zip: newValue.zip,
												address_id: newValue._id,
												phone: newValue.phone,
											}));
										}
									}}
									autoComplete={false}
									options={addressList}
									renderOption={(props, option) =>
										option.addNew ? (
											<li
												{...props}
												key={option._id}
												style={{ display: 'block', fontWeight: 'bold', color: '#DA8529', cursor: 'pointer' }}
											>
												+ Add new address
											</li>
										) : (
											<li {...props} key={option._id}>
												{option.address}
											</li>
										)
									}
									getOptionLabel={(option) => option.address}
									renderInput={(params) => <TextField {...params} label='' placeholder='Select shipping details' />}
									noOptionsText={
										<li
											onClick={handleNewAddress}
											style={{ display: 'block', fontWeight: 'bold', color: '#DA8529', cursor: 'pointer' }}
										>
											+ Add new address
										</li>
									}
								/>
							}
							defaultOpen
						>
							<Grid container spacing={3} sx={{ mt: '0', mb: '20px' }}>
								<Grid item md={6} xs={12}>
									<CustomTextField
										label={<InputLabel title='First Name' />}
										name='firstname'
										placeholder='Enter First Name'
										size='small'
										value={state.firstname}
										disabled
										onChange={(e) => {}}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<CustomTextField
										label={<InputLabel title='Last Name' />}
										name='lastname'
										placeholder='Enter Last Name'
										size='small'
										value={state.lastname}
										disabled
										onChange={(e) => {}}
									/>
								</Grid>
								<Grid item xs={12}>
									<CustomTextField
										label={<InputLabel title='Address' />}
										name='address'
										placeholder='Enter Address'
										size='small'
										value={state.address}
										disabled
										onChange={(e) => {}}
									/>
								</Grid>
								<Grid item xs={12}>
									<CustomTextField
										label={<InputLabel title='Landmark (Optional)' />}
										name='landmark'
										placeholder='Enter Landmark'
										size='small'
										value={state.landmark}
										disabled
										onChange={(e) => {}}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<CustomTextField
										label={<InputLabel title='City' />}
										name='city'
										placeholder='Select City'
										size='small'
										value={state.city}
										disabled
										onChange={(e) => {}}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<CustomTextField
										label={<InputLabel title='State' />}
										name='state'
										placeholder='Select State'
										size='small'
										value={state.state}
										disabled
										onChange={(e) => {}}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<CustomTextField
										label={<InputLabel title='Zip Code' />}
										name='zip'
										placeholder='Enter Zip Code'
										size='small'
										value={state.zip}
										disabled
										onChange={(e) => {}}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<CustomTextField
										label={<InputLabel title='Phone Number' />}
										name='phone'
										placeholder='Enter Phone Number'
										size='small'
										value={state.phone}
										disabled
										onChange={(e) => {}}
									/>
								</Grid>
								{state?.address_id && state.address_id !== '' && (
									<Grid item xs={12} sx={{ textAlign: 'end' }}>
										<Button
											variant='text'
											color='darkBlue'
											sx={{ padding: '1px 10px', width: { sm: 'auto', xs: '100%' } }}
											component={Link}
											to={'/user/account/address/edit/' + state.address_id}
										>
											Edit Details
										</Button>
									</Grid>
								)}
							</Grid>
						</CollapsableBox>
					</Grid>
					<Grid item xs={12}>
						<Box sx={{ p: '20px', mb: '16px' }}>
							<Grid container spacing={2}>
								<Grid container item md={8} xs={12} alignItems='center'>
									<Typography variant='subtitle1' fontWeight='bold' color='#212121' sx={{ mr: '8px' }}>
										Logged in as
									</Typography>
									<Avatar alt='Remy Sharp' src='/assets/user1.png' sx={{ width: 24, height: 24 }} />
									<Typography variant='subtitle2' fontWeight='bold' color='text.darkBlue' sx={{ ml: '8px' }}>
										{email}
									</Typography>
								</Grid>
								<Grid item md={4} xs={12}>
									<Button variant='contained' color='darkYellow' sx={{ padding: '8px' }} fullWidth onClick={logout}>
										<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
											Logout
										</Typography>
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Grid>
					<Grid container spacing={4} sx={{ mb: '16px' }}>
						<Grid container item xs={12} justifyContent='space-between'>
							<Button
								color='darkYellow'
								sx={{ padding: '10px 20px', pl: { sm: '0', xs: '20px' }, width: { sm: 'auto', xs: '100%' } }}
								component={Link}
								to='/site/cart'
							>
								Back to Patient Details
							</Button>
							<Button
								type='submit'
								variant='contained'
								color='darkBlue'
								sx={{ padding: '10px 20px', width: { sm: 'auto', xs: '100%' } }}
							>
								Continue to Payment
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={5} xs={12}>
					<Grid item xs={12}>
						<CollapsableBox title='Order Review' defaultOpen>
							<Grid container spacing={2} sx={{ mt: '0' }}>
								<Grid container spacing={2} item md={8} xs={12}>
									<Grid item xs={4}>
										<img src='/assets/cart-box.png' alt='cart-box' style={{ maxWidth: '100%' }} />
									</Grid>
									<Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
										<Typography variant='subtitle2' color='text.darkBlue' fontWeight='bold'>
											{cart?.productName}
										</Typography>
										<div style={{ marginLeft: '-8px' }}>
											<IconButton aria-label='delete' disabled>
												<img src='/assets/icons/decrease-btn.svg' alt='decrease' />
											</IconButton>
											<Typography variant='subtitle2' component='span'>
												{cart?.totalCart || 0}
											</Typography>
											<IconButton aria-label='delete' disabled>
												<img src='/assets/icons/increase-btn.svg' alt='increase' />
											</IconButton>
										</div>
									</Grid>
								</Grid>
								<Grid container item md={4} xs={12} justifyContent='end' alignItems='center'>
									<Typography variant='h6' fontWeight='bold' fontSize='22px' color='text.darkBlue'>
										{INRFormatter(cart?.price || 0)}
									</Typography>
								</Grid>
							</Grid>
						</CollapsableBox>
					</Grid>
					<Grid item xs={12}>
						<CollapsableBox title='Discount Codes' defaultOpen>
							<Grid container spacing={2} sx={{ mt: '0' }}>
								<Grid container spacing={2} item xs={12}>
									<Grid item xs={12}>
										<TextField label={<InputLabel title='Enter your coupon code' />} size='small' value={cart?.coupon} fullWidth disabled />
									</Grid>
								</Grid>
							</Grid>
						</CollapsableBox>
					</Grid>
					<Grid item xs={12}>
						<CollapsableBox title='Billing Summary' defaultOpen>
							<Grid container spacing={1.5} sx={{ mt: '0' }}>
								<Grid container item xs={12} justifyContent='space-between'>
									<Typography variant='subtitle2' fontWeight={400} color='#616161'>
										Subtotal
									</Typography>
									<Typography variant='subtitle2' fontWeight='bold' color='#616161'>
										{INRFormatter(cart?.actual_price || '0.00')}
									</Typography>
								</Grid>
								<Grid container item xs={12} justifyContent='space-between'>
									<Typography variant='subtitle2' fontWeight={400} color='#616161'>
										Discount
									</Typography>
									<Typography variant='subtitle2' fontWeight='bold' color='#616161'>
										- {INRFormatter(cart?.discount || '0.00')}
									</Typography>
								</Grid>
								<Grid container item xs={12} justifyContent='space-between'>
									<Typography variant='subtitle2' fontWeight={400} color='#616161'>
										Shipping
									</Typography>
									<Typography variant='subtitle2' fontWeight='bold' color='#616161'>
										₹0.00
									</Typography>
								</Grid>
							</Grid>
							<Divider sx={{ mt: '24px', mb: '18px' }} />
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography variant='h5' fontWeight='bold' color='#212121'>
									Grand Total
								</Typography>
								<Typography variant='h5' fontWeight='bold' color='#212121'>
									{INRFormatter(cart?.price || 0)}
								</Typography>
							</div>
						</CollapsableBox>
					</Grid>
				</Grid>
			</Grid>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				scroll='paper'
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'
				sx={{ backdropFilter: 'blur(1px)' }}
			>
				<div style={{ maxWidth: '450px' }}>
					<RegisterPopup />
				</div>
			</Dialog>
		</Container>
	);
}

const mapStateToProps = ({ auth, cart }) => {
	return { email: auth.email, cart };
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateAddress: (state) => dispatch(cartActions.update('address', state)),
		deleteAuth: (redirectUrl) => dispatch(authActions.delete(redirectUrl)),
		addRedirectUrlToStore: (id, url) => dispatch(storageActions.add(id, url)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Information);
