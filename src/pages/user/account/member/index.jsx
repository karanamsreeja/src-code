import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from 'components/Box';
import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { axiosDelete, axiosGet } from 'helpers/axios';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';

const useStyle = makeStyles((theme) => ({
	listItem: {
		padding: '19px 22px',
		marginBottom: '11px',
		background: '#F5F5F5',
		borderRadius: '6px',
	},
	activelistItem: {
		color: 'white',
		'&:hover': {
			background: '#25468A',
		},
	},
	dialog: {
		maxWidth: '400px',
		width: '100%',
	},
}));

function Member({ deleteAuth }) {
	const navigate = useNavigate();
	const classes = useStyle();
	const [loading, setloading] = useState({ message: 'Fetching members...' });
	const [init, setinit] = useState(null);
	// for popup
	const [deleteMemberId, setdeleteMemberId] = useState(null);
	const [popupOpen, setpopupOpen] = useState(false);
	// for member list
	const [memberList, setMemberList] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/members', {}, setloading, () => deleteAuth('/user/account/member'));

			if (res.status === 200) {
				setMemberList(res.data.members);
			}
		}

		if (init) return;
		setinit(true);
		getData();
	}, [init, navigate, deleteAuth]);

	const handleDeleteMemberConfirm = (id) => {
		setdeleteMemberId(id);
		setpopupOpen(true);
	};

	const handleCancelDeleteMember = () => {
		setdeleteMemberId(null);
		setpopupOpen(false);
	};

	const handleDeleteMember = async () => {
		setpopupOpen(false);
		setloading({ message: 'Deleting members...' });
		const res = await axiosDelete('/members/delete', { member_id: deleteMemberId }, setloading, () => deleteAuth('/user/account/member'));

		if (res.status === 200) {
			setMemberList((pre) => pre.filter((e) => e._id !== deleteMemberId));
		}
	};

	const handelNavigateToViewEditPage = (state) => {
		navigate('/user/account/member/add', { state: { editableMember: state } });
	};

	return (
		<Box sx={{ p: '34px 33px 39px 30px', position: 'relative', minHeight: '50vh' }}>
			{loading && <LoadingBoxComponent message={loading.message} />}

			<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '20px' }}>
				Account Settings
			</Typography>

			<Typography variant='subtitle1' fontWeight='bold' color='text.darkerYellow' component={Link} to='/user/account/member/add'>
				+ Add a Member
			</Typography>

			{init && !loading && memberList && memberList.length === 0 && (
				<div className='center' style={{ paddingTop: '55px', flexDirection: 'column' }}>
					<img src='/assets/map-location.png' alt='map-location' />
					<Typography variant='h5' fontSize='22px' fontWeight={500} color='#212121' sx={{ mb: '11px' }}>
						No Members Added
					</Typography>
					<Typography variant='subtitle2' fontWeight={400} color='text.greyLightText' textAlign='center' sx={{ width: '90%' }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor dapibus vitae, ornare augue proin nisl eget. Lectus purus
						egestas ullamcorper ornare. Fames scelerisque semper tristique erat.
					</Typography>
				</div>
			)}

			<div style={{ marginTop: '22px' }}>
				{memberList &&
					memberList.map((e) => (
						<Grid container className={classes.listItem} key={e._id}>
							<Grid item xs>
								<Typography variant='subtitle1' lineHeight='22px' fontWeight='bold' color='#212121'>
									{e.firstname + ' ' + e.lastname}
								</Typography>
								<Typography variant='caption' lineHeight='20px' fontWeight={400} color='#616161'>
									{e.age} years | {e.gender} | {e.blood_type} Blood Type
								</Typography>
							</Grid>
							<Grid item>
								<Button
									variant='contained'
									size='medium'
									color='darkYellow'
									sx={{ px: '35px' }}
									onClick={() => handelNavigateToViewEditPage(e)}
								>
									<Typography variant='subtitle2' fontWeight='bold'>
										View/Edit Details
									</Typography>
								</Button>
							</Grid>
							<Grid item sx={{ ml: '18px' }}>
								<IconButton aria-label='delete' onClick={() => handleDeleteMemberConfirm(e._id)}>
									<DeleteIcon />
								</IconButton>
							</Grid>
						</Grid>
					))}
			</div>

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
							Are you sure you want to remove this member?
						</Typography>
						<Typography variant='subtitle2' fontWeight={400} lineHeight='22px' color='#616161' textAlign='center' sx={{ mb: '16px' }}>
							Removing this member will erase their details from your list of members permanently.
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs>
								<Button
									variant='outlined'
									size='medium'
									color='Blue600'
									sx={{ border: '1px solid #25468A' }}
									onClick={handleCancelDeleteMember}
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
									onClick={handleDeleteMember}
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

export default connect(null, mapDispatchToProps)(Member);
