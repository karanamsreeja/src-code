import React, { useState, useEffect } from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

import CustomTextField from 'components/TextField';
import Select from 'components/Select';
import CollapsableBox from 'components/site/CollapsableBox';
import InputLabel from 'components/site/InputLabel';
import LoadingScreen from 'components/site/LoadingScreen';

import { INRFormatter } from 'helpers/formatter';

import { axiosDelete, axiosGet, axiosPost } from 'helpers/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';
import { cartActions } from 'store/action/cartAction';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import { storageActions } from 'store/action/storageAction';

const PatientDetails = ({ state, updateState, handleNewMember, memberList, onSubmit }) => {
	if (!state || (state && state.length === 0)) {
		return (
			<Typography variant='caption' textTransform='uppercase' fontWeight='bold' letterSpacing='1.5px'>
				Your cart is empty
			</Typography>
		);
	}

	return (
		<Grid item md={7} xs={12}>
			{state &&
				state.map((e, i) => (
					<Grid item xs={12} key={e._id}>
						<CollapsableBox
							title={`Kit ${i + 1} - Member Details`}
							headerOptions={
								<Autocomplete
									sx={{ flex: 1, maxWidth: '50%' }}
									size='small'
									disableClearable
									value={e?.patient_id !== '' ? e : null}
									onChange={(event, newValue) => {
										if (newValue.addNew) {
											handleNewMember();
										} else {
											updateState(i, {
												patient_id: newValue._id,
												firstname: newValue.firstname,
												lastname: newValue.lastname,
												age: newValue.age,
												gender: newValue.gender,
											});
										}
									}}
									options={memberList}
									renderOption={(props, option) =>
										option.addNew ? (
											<Box
												component='li'
												{...props}
												key={option._id}
												style={{ display: 'block', fontWeight: 'bold', color: '#DA8529', cursor: 'pointer' }}
											>
												+ Add new member
											</Box>
										) : (
											<Box component='li' {...props} key={option._id}>
												{[option.firstname, option.lastname].join(' ')}
											</Box>
										)
									}
									getOptionLabel={(option) => (option.firstname ? option.firstname + ' ' + option.lastname : '')}
									renderInput={(params) => <TextField {...params} label='' placeholder='Type member name here...' />}
									noOptionsText={
										<li
											onClick={handleNewMember}
											style={{ display: 'block', fontWeight: 'bold', color: '#DA8529', cursor: 'pointer' }}
										>
											+ Add new member
										</li>
									}
								/>
							}
							defaultOpen={i === 0}
						>
							<Grid container spacing={3} sx={{ mt: '0', mb: '20px' }}>
								<Grid item md={6} xs={12}>
									<CustomTextField
										label={<InputLabel title='First Name' />}
										value={e.firstname}
										placeholder='Enter First Name'
										size='small'
										disabled
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<CustomTextField
										label={<InputLabel title='Last Name' />}
										value={e.lastname}
										placeholder='Enter Last Name'
										size='small'
										disabled
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<CustomTextField label={<InputLabel title='Age' />} value={e.age} placeholder='Enter Age' size='small' disabled />
								</Grid>
								<Grid item md={6} xs={12}>
									<Select
										label={<InputLabel title='Gender' />}
										value={e.gender || ''}
										placeholder='Select Gender'
										size='small'
										disabled
									>
										<MenuItem value='male'>Male</MenuItem>
										<MenuItem value='female'>Female</MenuItem>
									</Select>
								</Grid>
								{e?.patient_id && e.patient_id !== '' && (
									<Grid item xs={12} sx={{ textAlign: 'end' }}>
										<Button
											variant='text'
											color='darkBlue'
											sx={{ padding: '1px 10px', width: { sm: 'auto', xs: '100%' } }}
											component={Link}
											to={'/user/account/member/edit/' + e.patient_id}
										>
											Edit Details
										</Button>
									</Grid>
								)}
							</Grid>
						</CollapsableBox>
					</Grid>
				))}
			<Grid container item xs={12} justifyContent='flex-end'>
				<Button variant='contained' color='darkBlue' sx={{ padding: '10px 20px', width: { sm: 'auto', xs: '100%' } }} onClick={onSubmit}>
					Continue
				</Button>
			</Grid>
		</Grid>
	);
};

function Index({ deleteAuth, cart, setCart, addCoupon, deleteCartItem, addCartItem, addRedirectUrlToStore, updateCart }) {
	const location = useLocation();
	const [init, setInit] = useState(false);
	const [loading, setloading] = useState({});
	const [memberList, setmemberList] = useState([]);
	const [coupon, setCoupon] = useState('');
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	useEffect(() => {
		async function getPostdata() {
			if (location.state?.productId) {
				setloading({ message: 'Adding products in cart...' });
				await axiosPost('/cart/create', { product_id: location.state.productId }, setloading, () => deleteAuth('/site/cart'));
				navigate('/site/cart', { state: null, replace: true });
			}

			setloading({ message: 'Fetching cart details...' });
			const cart = await axiosGet('/cart', {}, setloading, () => deleteAuth('/site/cart'));

			if (cart.status === 200) {
				setCart({
					kitIds: cart.data.cart.kits,
					_id: cart.data.cart._id,
					user: cart.data.cart.user,
					actual_price: cart.data.cart.actual_price,
					price: cart.data.cart.price,
					discount: cart.data.cart.actual_price - cart.data.cart.price,
					coupon: cart.data.cart.coupon || '',
					totalCart: cart.data.cart.kits.length,
					productId: cart.data.kits[0]?.product._id || location.state?.productId,
					productName: cart.data.kits[0]?.product.name,
					kits: cart.data.kits?.map((e) => {
						if (e?.patient_id) {
							return {
								_id: e._id,
								patient_id: e.patient_id?._id,
								firstname: e.patient_id.firstname,
								lastname: e.patient_id.lastname,
								age: e.patient_id.age,
								gender: e.patient_id.gender,
							};
						}
						return {
							_id: e?._id || '',
							patient_id: '',
							firstname: '',
							lastname: '',
							age: '',
							gender: '',
						};
					}),
				});
				cart.data.cart.coupon && setCoupon(cart.data.cart.coupon);
			}

			const members = await axiosGet('/members', {}, setloading, () => deleteAuth('/user/account/member'));

			if (members.status === 200) {
				setmemberList([
					...members.data.members,
					{
						age: '',
						blood_type: '',
						details: '',
						existing_disease: '',
						firstname: '',
						gender: '',
						is_active: '',
						lastname: '',
						__v: '',
						_id: '',
						addNew: true,
					},
				]);
			}
		}

		if (init) return;
		setInit(true);
		getPostdata();
	}, [location, init, deleteAuth, navigate, setCart]);

	const handleRemoveCart = async () => {
		try {
			// capture last kit-id from kit list
			const kitId = cart?.kitIds.slice(-1)[0] || null;

			if (kitId === null) {
				return;
			}

			setloading({ message: 'Removing product from cart...' });
			const res = await axiosDelete('/cart/remove-kit', { kitId }, setloading, () => deleteAuth('/site/cart'));

			if (res.status === 200) {
				deleteCartItem(kitId, res.data.activeCart.actual_price, res.data.activeCart.price);
			}
		} catch (error) {
			setloading(null);
		}
	};

	const handleAddCart = async () => {
		try {
			// capture product id
			let product_id;
			if (cart?.kits.length > 0) {
				product_id = cart.productId;
			} else {
				enqueueSnackbar('Please select a product.', { variant: 'error' });
				return;
			}

			setloading({ message: 'Adding new product in cart...' });
			const res = await axiosPost('/cart/create', { product_id }, setloading, () => deleteAuth('/site/cart'));

			if (res.status === 201) {
				addCartItem(res.data.cart.actual_price, res.data.cart.price, res.data.cart.kits, product_id);
			}
		} catch (error) {
			setloading(null);
		}
	};

	const onSubmit = async () => {
		try {
			// validate kits
			for (let i = 0; i < cart.kits.length; i++) {
				if (
					!cart.kits[i].firstname ||
					cart.kits[i].firstname.trim() === '' ||
					!cart.kits[i].lastname ||
					cart.kits[i].lastname.trim() === '' ||
					!cart.kits[i].age ||
					String(cart.kits[i].age).trim() === '' ||
					!cart.kits[i].gender ||
					cart.kits[i].gender.trim() === ''
				) {
					enqueueSnackbar("Please fill all patient's details.", { variant: 'error' });
					return;
				}
			}

			setloading({ message: 'Assigning patients with kits...' });
			const res = await axiosPost(
				'/cart/assign',
				{
					patients: cart.kits.map((e) => ({
						age: e.age,
						firstname: e.firstname,
						gender: e.gender,
						lastname: e.lastname,
						_id: e._id,
						patient_id: e.patient_id,
					})),
				},
				setloading,
				() => deleteAuth('/site/cart')
			);

			if (res.status === 200) {
				navigate('/site/cart/information');
			}
		} catch (error) {
			setloading(null);
		}
	};

	const handleNewMember = () => {
		addRedirectUrlToStore('addMemberUrl', window.location.pathname);
		navigate('/user/account/member/add');
	};

	const handleCouponApply = async () => {
		setloading({ message: 'Applying coupon...' });

		const res = await axiosPost('/cart/apply-coupon', { coupon: coupon }, setloading, () => deleteAuth('/site/cart'));

		if (res.status === 200) {
			addCoupon(res.data.applicableCoupon.discountInPercentage);
		} else {
			setCoupon('');
		}
	};

	return (
		<Container sx={{ pt: '50px' }}>
			{loading && <LoadingScreen message={loading?.message} />}

			<Breadcrumbs separator='›' aria-label='breadcrumb' style={{ marginBottom: '10px' }}>
				<Typography
					variant='caption'
					fontSize='10px'
					textTransform='uppercase'
					fontWeight='bold'
					color='text.darkerYellow'
					letterSpacing='1.5px'
				>
					Patient Details
				</Typography>
				<Typography variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
					information
				</Typography>
				<Typography variant='caption' fontSize='10px' textTransform='uppercase' fontWeight='bold' color='#BDBDBD' letterSpacing='1.5px'>
					payment
				</Typography>
			</Breadcrumbs>

			<Grid container spacing={2}>
				<PatientDetails
					state={cart?.kits}
					memberList={memberList}
					updateState={updateCart}
					onSubmit={onSubmit}
					handleNewMember={handleNewMember}
				/>
				<Grid item md={5} xs={12}>
					{cart?.kits?.length !== 0 && (
						<>
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
													<IconButton
														aria-label='decrement'
														disabled={loading !== null || cart?.totalCart < 1}
														onClick={handleRemoveCart}
													>
														<img src='/assets/icons/decrease-btn.svg' alt='decrease' />
													</IconButton>
													<Typography variant='subtitle2' component='span'>
														{cart?.totalCart || 0}
													</Typography>
													<IconButton
														aria-label='increment'
														disabled={loading !== null || cart?.totalCart > 5}
														onClick={handleAddCart}
													>
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
												<TextField
													label={<InputLabel title='Enter your coupon code' />}
													size='small'
													fullWidth
													value={coupon}
													onChange={(e) => setCoupon(e.target.value)}
												/>
												<Button
													variant='contained'
													color='darkBlue'
													size='small'
													sx={{ padding: '4px 20px', width: { sm: 'auto', xs: '100%' }, mt: '6px' }}
													onClick={handleCouponApply}
												>
													Apply
												</Button>
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
						</>
					)}
				</Grid>
			</Grid>
		</Container>
	);
}

const mapStateToProps = ({ cart }) => {
	return { cart };
};
const mapDispatchToProps = (dispatch) => {
	return {
		deleteAuth: () => dispatch(authActions.delete()),
		setCart: (value) => dispatch(cartActions.set(value)),
		deleteCartItem: (kitId, actual_price, price) => dispatch(cartActions.deleteItem(kitId, actual_price, price)),
		addCartItem: (actual_price, price, kitIds, productId) => dispatch(cartActions.addItem(actual_price, price, kitIds, productId)),
		updateCart: (index, value) => dispatch(cartActions.updateCart(index, value)),
		addCoupon: (discount) => dispatch(cartActions.addCoupon(discount)),
		addRedirectUrlToStore: (id, url) => dispatch(storageActions.add(id, url)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
