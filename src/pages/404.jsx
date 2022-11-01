import React from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Page404() {
	return (
		<>
			<SiteHeader />
			<div className='common-bg'>
				<Container className='our-science'>
					<div className='hero'>
						<Typography
							variant='h3'
							component='div'
							color='text.darkBlue'
							fontWeight='bold'
							sx={{ fontSize: { md: '4rem', sm: '2.5rem', xs: '2rem' } }}
							gutterBottom
						>
							Oops!
						</Typography>
						<Typography variant='h5' lineHeight='30px' color='text.Blue600' component='div' sx={{ mb: '22px' }}>
							There’s nothing to see here. Yup, nothing at all. Guess you lost your way, would you like to go back to the home screen?
						</Typography>

						<Button variant='contained' color='darkYellow' size='small' component={Link} to='' sx={{ mb: '50px' }}>
							Home
						</Button>
						<br />
						<img src='/assets/404.png' alt='404' style={{ maxHeight: '300px', maxWidth: '100%' }} />
					</div>
				</Container>
			</div>
			<SiteFooter />
		</>
	);
}
