import React from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Team = () => {
	return (
		<>
			<SiteHeader />
			<Container sx={{ pt: '100px', pb: '100px' }}>
				<Typography variant='h3' component='div' color='#000000' fontWeight='bold' gutterBottom>
					Meet Our Team
				</Typography>
				<Typography variant='h5' component='div' color='text.darkGreen' fontWeight='bold' gutterBottom>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus vitae ut egestas vel, iaculis nullam. Vehicula convallis auctor donec amet lobortis nisl, risus.
				</Typography>
				<Typography variant='subtitle1' lineHeight='26px' color='#000000' component='div'>
					Iom is founded and run by an eclectic, motley bunch of passionate professionals working together- entrepreneurs, biotech scientists, mathematicians, data
					scientists, marketing peeps, analysts, and interns. We have with us doctors, enthusiastic researchers, erudite branding pros, experienced laboratories and more.
					And we are exploring new rhythms every day.
				</Typography>
			</Container>
			<div style={{ background: '#FAFAFA' }}>
				<Container sx={{ pt: '100px', pb: '100px' }}>
					<Grid container spacing={2}>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
						<Grid item md={2} xs={6}>
							<img src='/assets/user.png' alt='user' style={{ height: '200px', width: '100%', marginBottom: '14px' }} />
							<Typography variant='subtitle1' component='div' lineHeight='22px' color='text.darkGreen' fontWeight='bold'>
								Darlene Robertson
							</Typography>
							<Typography variant='caption' component='div' color='text.grey' fontWeight='bold'>
								Web Designer
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</div>
			<SiteFooter />
		</>
	);
};

export default Team;
