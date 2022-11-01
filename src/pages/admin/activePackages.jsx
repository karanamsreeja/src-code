import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LoadingBoxComponent from 'components/LoadingBoxComponent';

import { axiosGet } from 'helpers/axios';
import { Link } from 'react-router-dom';
import { axiosDelete } from 'helpers/axios';

const ActivePackages = () => {
	const [loading, setloading] = useState({ message: 'Fetching data...' });
	const [state, setState] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await axiosGet('/admin/active-packages', {}, setloading);

			if (res.status === 200) {
				setState(res.data.packages);
			}
		}

		getData();
	}, []);

	const handleDeletePackage = async (packageId) => {
		if (!window.confirm('Are you sure you want to delete?')) return;

		setloading({ message: 'Deleting package...' });
		const res = await axiosDelete('/products/delete', { productId: packageId }, setloading);

		if (res.status === 200) {
			setState((pre) =>
				pre.filter((e) => {
					console.log(e._id !== packageId, e._id, packageId);
					return e._id !== packageId;
				})
			);
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
					SUPERADMIN
				</Typography>
				<Typography variant='h4' fontWeight='bold' color='text.darkBlue' sx={{ mb: '8px' }}>
					Packages
				</Typography>
				<Typography variant='subtitle2' fontWeight={400} color='text.Blue600' sx={{ mb: '26px' }}>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
					quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
				</Typography>
				<Typography variant='subtitle1' fontWeight='bold' color='text.darkerYellow' component={Link} to='add'>
					+ Add a New Package
				</Typography>

				<Divider sx={{ my: '41px' }} />

				{
					<Grid container spacing={4}>
						{state.map((e) => (
							<Grid item md={6} xs={12} key={e._id}>
								<Box className='package-box'>
									<Typography variant='h5' component='div' fontWeight='bold' color='#212121' sx={{ mb: '4px', display: 'flex' }}>
										<img src='/assets/bar-left.svg' alt='bar' style={{ width: '25px', marginRight: '10px' }} />
										{e.name}
									</Typography>
									<Typography variant='caption' fontWeight='bold' component='div' color='#9E9E9E' gutterBottom>
										WHAT YOU’LL GET
									</Typography>
									{e.features.map((e, i) => (
										<Typography
											variant='body2'
											component='div'
											fontWeight='bold'
											color='#212121'
											sx={{ mb: '4px', display: 'flex' }}
											key={i}
										>
											<img src='/assets/right-circle.svg' alt='bar' style={{ width: '16px', marginRight: '8px' }} /> {e}
										</Typography>
									))}

									<Divider sx={{ mt: '20px', mb: '11px', borderStyle: 'dashed' }} />
									<Typography variant='h5' component='div' fontWeight='bold' color='#212121' sx={{ mb: '17px' }}>
										₹{e.price}
									</Typography>

									<div className='flex' style={{ gap: '19px', marginTop: 'auto' }}>
										<Button
											sx={{ borderRadius: '4px' }}
											size='small'
											variant='outlined'
											color='darkYellow'
											fullWidth
											component={Link}
											to={e._id}
										>
											<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
												Edit Package
											</Typography>
										</Button>
										<Button
											sx={{ borderRadius: '4px' }}
											size='small'
											variant='contained'
											color='darkYellow'
											fullWidth
											onClick={() => handleDeletePackage(e._id)}
										>
											<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
												Delete Package
											</Typography>
										</Button>
									</div>
								</Box>
							</Grid>
						))}
					</Grid>
				}
			</Container>
		</>
	);
};

export default ActivePackages;
