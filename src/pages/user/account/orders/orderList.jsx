import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import useMediaQuery from '@mui/material/useMediaQuery';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import TextField from 'components/TextField';
import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { axiosGet } from 'helpers/axios';
import { Link } from 'react-router-dom';

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

const useStyle = makeStyles({
	listItem: {
		padding: '26px 19px',
		marginBottom: '11px',
		background: '#F5F5F5',
		borderRadius: '6px',
	},
	stepcompleted: {
		'& p': {
			fontWeight: 'bold !important',
			color: '#212121 !important',
		},
	},
	stepactive: {
		'& p': {
			fontWeight: 'bold !important',
			color: '#212121 !important',
		},
	},
	stepdisabled: {
		'& p': {
			fontWeight: '400 !important',
			color: '#616161 !important',
		},
	},
	dialog: {
		maxWidth: '400px',
		width: '100%',
	},
});

const steps = ['Order Received', 'Order Confirmed', 'Kit Dispatched', 'Kit Delivered'];

const QontoConnector = styled(StepConnector)(() => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#06225C',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#06225C',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: '#06225C',
		borderTopWidth: 2,
	},
}));

const QontoStepIconRoot = styled('div')(() => ({
	display: 'flex',
	height: 22,
	alignItems: 'center',
}));

function QontoStepIcon({ completed, className }) {
	return (
		<QontoStepIconRoot className={className}>
			{completed ? (
				<img src='/assets/icons/stepper-active-right.svg' alt='stepper-active-right' />
			) : (
				<img src='/assets/icons/circle.svg' alt='circle' />
			)}
		</QontoStepIconRoot>
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

function OrderList({ orderList, setOrderList, handleViewOrderDetails }) {
	const classes = useStyle();
	const [loading, setloading] = useState(null);
	const [init, setinit] = useState(false);
	const matches = useMediaQuery('(min-width:600px)');

	useEffect(() => {
		async function getData() {
			setloading({ message: 'Fetching orders...' });
			const res = await axiosGet('/orders', {}, setloading);

			if (res.status === 200) {
				setOrderList(
					res.data.orders.map((e) => {
						let obj = { id: e._id };
						if (e.status === 'paid') {
							obj.status = 1;
						} else if (e.status === 'dispatch_initiated' || e.status === 'dispatch_paused' || e.status === 'dispatch_assigned') {
							obj.status = 2;
						} else if (e.status === 'dispatch_collected') {
							obj.status = 3;
						} else if (e.status === 'dispatch_completed') {
							obj.status = 4;
						} else {
							obj.status = 0;
						}

						return obj;
					})
				);
			}
		}

		if (init) return;
		setinit(true);
		getData();
	}, [init, setOrderList]);

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}

			<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '26px' }}>
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
						sx={{ background: '#FAFAFA' }}
					/>
				</div>
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

			{init && !loading && orderList?.length === 0 && (
				<div className='center' style={{ paddingTop: '63px', flexDirection: 'column' }}>
					<img src='/assets/cart.png' alt='cart' style={{ width: '120px' }} />
					<Typography variant='h5' fontSize='22px' fontWeight={500} color='#212121' sx={{ mt: '16px', mb: '11px' }}>
						No Kits Ordered
					</Typography>
					<Typography variant='subtitle2' fontWeight={400} color='text.greyLightText' textAlign='center' sx={{ width: '90%', mb: '27px' }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor dapibus vitae, ornare augue proin nisl eget. Lectus purus
						egestas ullamcorper ornare. Fames scelerisque semper tristique erat.
					</Typography>
					<Button variant='contained' size='medium' color='darkYellow' sx={{ px: '54px' }} component={Link} to='/get-started'>
						<Typography variant='subtitle2' fontWeight='bold'>
							Order a Kit
						</Typography>
					</Button>
				</div>
			)}

			<div style={{ marginTop: '22px' }}>
				{orderList?.map((e) => (
					<Grid container className={classes.listItem} key={e.id}>
						<Grid item sx={{ minWidth: '150px', borderRight: { xs: 'none', md: '1px solid #E0E0E0' }, pr: '5px' }}>
							<Typography
								variant='caption'
								fontSize='10px'
								letterSpacing='1px'
								lineHeight='20px'
								fontWeight='bold'
								color='text.darkYellow'
							>
								ORDER NUMBER
							</Typography>
							<Typography variant='subtitle1' lineHeight='22px' fontWeight='bold' color='#212121'>
								#{e.id}
							</Typography>
						</Grid>
						<Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
							<Divider sx={{ my: 2 }} />
						</Grid>
						<Grid container item xs sx={{ px: '4px' }} justifyContent='center'>
							<Stepper
								orientation={matches ? 'horizontal' : 'vertical'}
								alternativeLabel
								activeStep={e.status}
								connector={<QontoConnector />}
								sx={{ width: '100%', maxWidth: '382px' }}
							>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel
											StepIconComponent={QontoStepIcon}
											classes={{
												label: 'mt-10',
												completed: classes.stepcompleted,
												active: classes.stepactive,
												disabled: classes.stepdisabled,
											}}
										>
											<Typography variant='body2' fontSize='10px' lineHeight='13px'>
												{label}
											</Typography>
										</StepLabel>
									</Step>
								))}
							</Stepper>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								size='medium'
								color='darkYellow'
								sx={{ px: '35px' }}
								onClick={() => handleViewOrderDetails(e.id)}
							>
								<Typography variant='subtitle2' fontWeight='bold'>
									Order Details
								</Typography>
							</Button>
						</Grid>
					</Grid>
				))}
			</div>
		</>
	);
}

export default OrderList;
