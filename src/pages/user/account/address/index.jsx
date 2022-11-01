import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import Box from 'components/Box';
import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { axiosGet, axiosDelete } from 'helpers/axios';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';

const useStyle = makeStyles((theme) => ({
	listItem: {
		padding: '16px 10px 23px 16px',
		background: '#F5F5F5',
		borderRadius: '4px',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	listItemHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '9px',
	},
	dialog: {
		maxWidth: '400px',
		width: '100%',
	},
}));

function Address({ deleteAuth }) {
	const navigate = useNavigate();
	const classes = useStyle();
	const [loading, setloading] = useState({ message: 'Fetching addresses...' });
	const [init, setinit] = useState(null);
	// for popup
	const [deleteAddressId, setdeleteAddressId] = useState(null);
	const [popupOpen, setpopupOpen] = useState(false);
	// for address list
	const [addressList, setaddressList] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/addresses', {}, setloading, () => deleteAuth('/user/account/address'));

			if (res.status === 200) {
				setaddressList(res.data.addresses);
			}
		}

		if (init) return;
		setinit(true);
		getData();
	}, [init, navigate, deleteAuth]);

	const handleDeleteAddressConfirm = (id) => {
		setdeleteAddressId(id);
		setpopupOpen(true);
	};

	const handleCancelDeleteAddress = () => {
		setdeleteAddressId(null);
		setpopupOpen(false);
	};

	const handleDeleteAddress = async () => {
		setpopupOpen(false);
		setloading({ message: 'Deleting address...' });
		const res = await axiosDelete('/address/delete', { address_id: deleteAddressId }, setloading, () => deleteAuth('/user/account/address'));

		if (res.status === 200) {
			setaddressList((pre) => pre.filter((e) => e._id !== deleteAddressId));
		}
	};

	const handelNavigateToViewEditPage = (state) => {
		navigate('/user/account/address/add', { state: { editableAddress: state } });
	};

	return (
		<Box sx={{ p: '34px 33px 39px 30px', position: 'relative', minHeight: '50vh' }}>
			{loading && <LoadingBoxComponent message={loading.message} />}

			<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '20px' }}>
				My Addresses
			</Typography>

			<Typography variant='subtitle1' fontWeight='bold' color='text.darkYellow' component={Link} to='/user/account/address/add'>
				+ Add a New Address
			</Typography>

			{init && !loading && addressList && addressList.length === 0 && (
				<div className='center' style={{ paddingTop: '55px', flexDirection: 'column' }}>
					<img src='/assets/map-location.png' alt='map-location' />
					<Typography variant='h5' fontSize='22px' fontWeight={500} color='#212121' sx={{ mb: '11px' }}>
						No Addresses Added
					</Typography>
					<Typography variant='subtitle2' fontWeight={400} color='text.greyLightText' textAlign='center' sx={{ width: '90%' }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor dapibus vitae, ornare augue proin nisl eget. Lectus purus
						egestas ullamcorper ornare. Fames scelerisque semper tristique erat.
					</Typography>
				</div>
			)}

			<Grid container spacing={2} sx={{ mt: '22px' }}>
				{addressList &&
					addressList.map((e) => (
						<Grid item md={4} key={e._id}>
							<div className={classes.listItem}>
								<div className={classes.listItemHeader}>
									<Typography variant='subtitle1' fontWeight='bold' color='#212121'>
										{e.address_type}
									</Typography>
									<IconButton aria-label='delete' size='small' onClick={() => handleDeleteAddressConfirm(e._id)}>
										<img src='/assets/icons/close.svg' alt='close' />
									</IconButton>
								</div>

								<Typography
									variant='subtitle2'
									fontWeight={400}
									color='text.greyLightText'
									lineHeight='22px'
									sx={{ maxWidth: '188px', mb: '16px', flex: 1 }}
								>
									{e.address}
									<br />
									<strong>
										{e.city}, {e.state} {e.zip}
									</strong>
								</Typography>
								<Button
									variant='contained'
									size='medium'
									color='darkYellow'
									onClick={() => handelNavigateToViewEditPage(e)}
									fullWidth
								>
									<Typography variant='subtitle2' fontWeight='bold'>
										View/Edit Details
									</Typography>
								</Button>
							</div>
						</Grid>
					))}
			</Grid>

			{popupOpen && (
				<Dialog
					open={popupOpen}
					onClose={() => setpopupOpen(false)}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
					classes={{ paper: classes.dialog }}
					sx={{ backdropFilter: 'blur(2px)', background: 'rgb(33 33 33 / 70%)' }}
				>
					<DialogContent sx={{ p: '24px' }}>
						<Typography variant='subtitle1' fontWeight='bold' color='#212121' sx={{ mb: '7px' }}>
							Are you sure you want to delete this address?
						</Typography>
						<Typography variant='subtitle2' fontWeight={400} lineHeight='22px' color='#616161' textAlign='center' sx={{ mb: '16px' }}>
							Deleting this address will remove it from your list of addresses permanently.
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs>
								<Button
									variant='outlined'
									size='medium'
									color='Blue600'
									sx={{ border: '1px solid #25468A' }}
									onClick={handleCancelDeleteAddress}
									fullWidth
								>
									<Typography variant='subtitle2' fontWeight='bold'>
										Cancel
									</Typography>
								</Button>
							</Grid>
							<Grid item xs>
								<Button
									variant='contained'
									size='medium'
									color='Blue600'
									sx={{ border: '1px solid #25468A' }}
									onClick={handleDeleteAddress}
									fullWidth
								>
									<Typography variant='subtitle2' fontWeight='bold'>
										Delete
									</Typography>
								</Button>
							</Grid>
						</Grid>
					</DialogContent>
				</Dialog>
			)}
		</Box>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAuth: (redirectUrl) => dispatch(authActions.delete(redirectUrl)),
	};
};

export default connect(null, mapDispatchToProps)(Address);
