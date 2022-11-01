import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import LoadingBoxComponent from 'components/LoadingBoxComponent';
import TextField from 'components/TextField';

import { axiosGet, axiosPost, axiosPut } from 'helpers/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
	const [loading, setloading] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();
	const [isUpdate, setisUpdate] = useState(false);

	const [state, setState] = useState({ name: '', price: '', features: [''] });

	useEffect(() => {
		async function getData() {
			setisUpdate(true);
			setloading({ message: 'Fetching data...' });
			const res = await axiosGet('/products/details', { productId: id }, setloading);

			if (res.status === 200) {
				setState({ name: res.data.data.name, price: res.data.data.price, features: res.data.data.features });
			}
		}

		if (id !== 'add') getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addNewFeature = () => {
		setState((pre) => ({ ...pre, features: [...pre.features, ''] }));
	};

	const updateFeature = (text, i) => {
		let prevFeatures = [...state.features];
		prevFeatures[i] = text;
		setState((pre) => ({ ...pre, features: prevFeatures }));
	};

	const addPackage = async () => {
		setloading({ message: 'Adding package...' });
		const res = await axiosPost('/products/create', state, setloading);

		if (res.status === 201) {
			navigate('/admin/active-packages', { replace: true });
		}
	};

	const updatePackage = async () => {
		setloading({ message: 'Updating...' });
		const res = await axiosPut(
			'/products/update',
			{
				productId: id,
				product: state,
			},
			setloading
		);

		if (res.status === 200) {
			navigate('/admin/active-packages', { replace: true });
		}
	};

	return (
		<>
			{loading && <LoadingBoxComponent message={loading.message} />}
			<Container className='container-x'>
				<Stack direction='row' sx={{ mb: '16px' }}>
					<IconButton aria-label='delete' sx={{ transform: 'translateX(-16px)' }} component={Link} to='/admin/active-packages'>
						<img src='/assets/icons/arrow-left.svg' alt='arrow-left' />
					</IconButton>
					<Typography variant='subtitle1' fontWeight='bold' color='text.Blue600' sx={{ transform: 'translate(-10px, 8px)' }}>
						Back
					</Typography>
				</Stack>

				<div className='box-border-light'>
					<Typography variant='h5' fontWeight='bold' color='text.greyDark' sx={{ mb: '19px' }}>
						New Package
					</Typography>

					<Grid container spacing={2} sx={{ mb: '33px' }}>
						<Grid item md={6} xs={12}>
							<TextField
								label='Package Title'
								placeholder='Enter Package Title'
								size='small'
								value={state.name}
								onChange={(e) => setState((pre) => ({ ...pre, name: e.target.value }))}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								label='Price'
								placeholder='Enter Price'
								size='small'
								value={state.price}
								onChange={(e) => setState((pre) => ({ ...pre, price: e.target.value }))}
							/>
						</Grid>
					</Grid>

					<Typography variant='subtitle1' fontWeight='bold' color='#001626' sx={{ mb: '11px' }}>
						What You’ll Get
					</Typography>
					<Typography
						variant='subtitle1'
						fontWeight='bold'
						color='text.darkerYellow'
						onClick={addNewFeature}
						className='pointer'
						sx={{ mb: '27px' }}
					>
						+ Add feature
					</Typography>

					{state.features.map((e, i) => (
						<div className='mb-1' key={i}>
							<TextField placeholder='Enter Price' size='small' value={e} onChange={(e) => updateFeature(e.target.value, i)} />
						</div>
					))}

					<div style={{ textAlign: 'end' }}>
						{isUpdate ? (
							<Button
								sx={{ mt: '27px', borderRadius: '4px', minWidth: '200px' }}
								size='small'
								variant='contained'
								color='darkYellow'
								onClick={updatePackage}
							>
								<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
									Update Package
								</Typography>
							</Button>
						) : (
							<Button
								sx={{ mt: '27px', borderRadius: '4px', minWidth: '200px' }}
								size='small'
								variant='contained'
								color='darkYellow'
								onClick={addPackage}
							>
								<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
									Save Package
								</Typography>
							</Button>
						)}
					</div>
				</div>
			</Container>
		</>
	);
};

export default Edit;
