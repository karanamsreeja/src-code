import React from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

export default function OurScience() {
	return (
		<>
			<SiteHeader />
			<div className='our-science-bg'>
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
							Iom’s Process and its Benefits
						</Typography>
						<Typography variant='h5' lineHeight='30px' color='text.Blue600' component='div' gutterBottom>
							We take your health seriously, and it reflects in the way we do things at Iom. Using a 3 step process, we are able to
							provide you with a journey that is specific to you alone.
						</Typography>
					</div>
				</Container>

				<div style={{ overflow: 'hidden' }}>
					<Container className='our-science'>
						<div className='list-container'>
							<div className='counter'>1</div>
							<div className='flex1 overflow-auto'>
								<Typography variant='h4' color='text.darkYellow' fontWeight='bold' sx={{ mb: '8px' }}>
									Sequencing Your Sample
								</Typography>
								<Typography variant='body1' lineHeight='26px' fontWeight='500' color='text.greyDark' sx={{ mb: '20px' }}>
									We initiate this process of self-discovery with a test that determines your Microbiome using your fecal sample.
									The gut microbiome profile is built based on the DNA sequence of the bacteria present using the 16S rRNA gene. The
									test leads to understanding the relative abundance and composition of the bacteria in the gut.
								</Typography>
								<div className='icon-list-rotate-container'>
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
								</div>
							</div>
						</div>
						<div className='list-container'>
							<div className='counter'>2</div>
							<div className='flex1 overflow-auto'>
								<Typography variant='h4' color='text.darkYellow' fontWeight='bold' sx={{ mb: '8px' }}>
									Analyzing Your Data
								</Typography>
								<Typography variant='body1' lineHeight='26px' fontWeight='500' color='text.greyDark' sx={{ mb: '20px' }}>
									Our mathematical models, algorithms, and AI further highlight the linkages between this composition of the gut to
									its impact on various vital functions and requirements of your body in 5 health parameters-The Priority Compass.
									The report that you receive will provide your gut score that will throw light on these relevant parameters
									including your metabolism, immunity, weight management, mental wellness, risk of inflammation, and cardiovascular
									risk measures, among others that are shaped by your gut.
								</Typography>
								<div className='icon-list-rotate-container'>
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
								</div>
							</div>
						</div>
						<div className='list-container'>
							<div className='counter'>3</div>
							<div className='flex1 overflow-auto'>
								<Typography variant='h4' color='text.darkYellow' fontWeight='bold' sx={{ mb: '8px' }}>
									Guiding You to Better Health
								</Typography>
								<Typography variant='body1' lineHeight='26px' fontWeight='500' color='text.greyDark' sx={{ mb: '20px' }}>
									Our panel of specialized doctors, nutritionists, psychologists, and therapists will work with you to correct the
									imbalance in your gut microbiome through customized solutions crafted for you. Mapping their experience and
									expertise to the information from the tests and AI models, we bring to you a scientific, achievable way to be
									better poised to tackle your every day.
								</Typography>
								<div className='icon-list-rotate-container'>
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
									<img src='/assets/icons/bar.png' alt='' />
								</div>
							</div>
						</div>
					</Container>
				</div>
			</div>

			<div style={{ background: '#133373' }}>
				<Container style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
					<Typography variant='h3' color='white' fontWeight='bold' sx={{ fontSize: { md: '3rem', sm: '2.5rem', xs: '2rem' }, mb: '8px' }}>
						Do You Have Questions?
					</Typography>
					<Typography variant='body1' lineHeight='26px' color='white' sx={{ mb: '20px' }}>
						If you would like to speak to an Iom professional for more information, or if you have special concerns, kindly reach out to
						us through the contact form given below and our team will get in touch with you within 24 hours.
					</Typography>
					<Button variant='contained' color='darkYellow' size='large' component={Link} to='/get-started'>
						<Typography variant='body2' component='div' color='inherit'>
							Get Started
						</Typography>
					</Button>
				</Container>
			</div>

			<SiteFooter />
		</>
	);
}
