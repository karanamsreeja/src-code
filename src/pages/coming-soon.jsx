import React from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function ComingSsoon() {
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
							Coming Soon
						</Typography>
						<Typography variant='h5' lineHeight='30px' color='text.Blue600' component='div' sx={{ mb: '50px' }}>
							This right here is a work-in-progress. Pssst, we can get you into the exclusive list for notifications. Just fill out the
							form there and you’ll get to know what’s happening first. Bargain, ain’t it?
						</Typography>

						<br />
						<img src='/assets/coming-soon.png' alt='404' style={{ maxHeight: '300px', maxWidth: '100%' }} />
					</div>
				</Container>
			</div>
			<SiteFooter />
		</>
	);
}
