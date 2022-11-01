import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import LoadingBoxComponent from 'components/LoadingBoxComponent';
import TextField from 'components/TextField';

import { axiosGet, fileDownload } from 'helpers/axios';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
			},
		},
	},
}));

function Download({ id }) {
	const [startDownload, setstartDownload] = useState(false);
	const [downloadProgress, setDownloadProgress] = useState(0);

	const handleDownload = async () => {
		if (startDownload) {
			return;
		}
		setstartDownload(true);

		const file = await fileDownload(`/reports/${id}`, function (progressPercentage) {
			setDownloadProgress(progressPercentage);
		});

		if (file.status === 200) {
			const url = window.URL.createObjectURL(new Blob([file.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `Reports_${id}.pdf`);
			link.style.display = 'none';
			document.body.appendChild(link);
			link.click();
			link.remove();
		}
		setstartDownload(false);
	};

	return (
		<IconButton aria-label='delete' size='small' disabled={startDownload} onClick={handleDownload}>
			{startDownload ? (
				<CircularProgress variant={downloadProgress === 0 ? 'indeterminate' : 'determinate'} value={downloadProgress} size={22} />
			) : (
				<img src='/assets/icons/download.svg' alt='' />
			)}
		</IconButton>
	);
}

function DropDownList({ title, children, ...props }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				variant='contained'
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
				size='small'
				sx={{ borderRadius: '4px', p: '9px 13px', mr: '8px' }}
				color='Blue600'
				{...props}
			>
				<Typography variant='caption' lineHeight='initial' fontWeight={500}>
					{title}
				</Typography>
			</Button>
			<StyledMenu
				id='demo-customized-menu'
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{children(handleClose)}
			</StyledMenu>
		</>
	);
}

const useStyle = makeStyles((theme) => ({
	box: {
		borderRadius: '4px',
		border: '1px solid #E0E0E0',
		overflow: 'hidden',
		background: 'white',
		padding: '26px 33px',
	},
	listItem: {
		padding: '9px 22px',
		marginBottom: '11px',
		background: '#F5F5F5',
		borderRadius: '6px',
		gap: '10px',
	},
}));

export default function Report() {
	const classes = useStyle();
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setstate] = useState([]);
	const [init, setinit] = useState(false);

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/reports/available', {}, setloading);
			setinit(true);

			if (res.status === 200) {
				setstate(
					res.data.data.map((e) => ({
						_id: e._id,
						name: e.patient_id?.firstname + ' ' + e.patient_id?.lastname,
						age: e.patient_id?.age,
						blood_type: e.patient_id?.blood_type.toUpperCase(),
						gender: e.patient_id?.gender,
						report_name: e.report_name,
					}))
				);
			}
		}

		getData();
	}, []);

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className='container-x'>
				<Typography
					variant='caption'
					textTransform='uppercase'
					fontWeight='bold'
					color='text.darkerYellow'
					fontSize='10px'
					letterSpacing='1.5px'
					component='div'
					gutterBottom
				>
					Reports
				</Typography>
				<Typography variant='h4' fontWeight='bold' color='text.darkBlue' gutterBottom>
					Your Reports
				</Typography>
				<Typography variant='subtitle2' fontWeight={400} color='text.lightBlue' sx={{ mb: '30px' }}>
					Here are all the Iom reports. Check the accompanying kit number for details.
				</Typography>

				<div className={classes.box}>
					<Typography variant='h5' fontWeight='bold' color='text.darkBlue'>
						Your Reports
					</Typography>

					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: 6,
							justifyContent: 'space-between',
							marginTop: '20px',
							marginBottom: '20px',
						}}
					>
						<Box sx={{ width: { md: '40%', xs: '100%' } }}>
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
								sx={{ background: '#FAFAFA' }}
							/>
						</Box>
						<div>
							<DropDownList title='Filter By'>
								{(handleClose) => (
									<>
										<MenuItem onClick={handleClose} disableRipple>
											{/* Edit */}
										</MenuItem>
									</>
								)}
							</DropDownList>

							<DropDownList variant='outlined' title='Sort By'>
								{(handleClose) => (
									<MenuItem onClick={handleClose} disableRipple>
										{/* Order Number */}
									</MenuItem>
								)}
							</DropDownList>
						</div>
					</div>

					{init && state.length === 0 && (
						<div className='center flex-column' style={{ paddingTop: '65px', paddingBottom: '65px' }}>
							<img src='/assets/no-report.png' alt='no-report' />
							<Typography variant='h5' fontWeight='bold' color='text.grey' sx={{ mt: '20px' }}>
								No Results to Show
							</Typography>
						</div>
					)}

					{state?.map((e) => (
						<Grid container item className={classes.listItem} key={e._id}>
							<Grid item className='w-250px center'>
								<Typography variant='subtitle1' lineHeight='22px' fontWeight='bold' color='#212121' className=' overflow-ellipsis'>
									Report #{e._id}
								</Typography>
							</Grid>
							<Grid item xs className='center'>
								<div>
									<Typography variant='caption' fontWeight='bold' color='text.darkYellow' fontSize='10px'>
										MEMBER DETAILS
									</Typography>
									<Typography variant='subtitle2' lineHeight='22px' fontWeight='bold' color='#212121'>
										{e.name}
									</Typography>
									<Typography variant='caption' lineHeight='20px' fontWeight={400} color='#616161'>
										{e.age} years | {e.gender} | {e.blood_type} Blood Type
									</Typography>
								</div>
							</Grid>
							{/* <Grid item className='center'>
								<Button variant='contained' size='medium' color='darkYellow' sx={{ px: '35px' }}>
									<Typography variant='subtitle2' fontWeight='bold'>
										View Reports
									</Typography>
								</Button>
							</Grid> */}
							<Grid item sx={{ ml: '18px' }} className='center'>
								<Download id={e._id} />
								{/* <IconButton aria-label='delete' size='small'>
									<img src='/assets/icons/download.svg' alt='' />
								</IconButton> */}
							</Grid>
						</Grid>
					))}
				</div>
			</Container>
		</>
	);
}
