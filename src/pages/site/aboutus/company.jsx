import React from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const GetStarted = () => {
	return (
		<>
			<SiteHeader />
			<div className='common-bg'>
				<Container sx={{ pt: '100px', pb: '100px' }}>
					<Typography variant='h3' className='md:text-7xl text-5xl font-bold text-center mb-6 text-dark-blue'>
						About Our Company
					</Typography>
					<Typography variant='subtitle1' className='md:text-[22px] text-[18px] leading-7 text-dark-blue font-medium text-center'>
						We at iom want to empower you to step into a world of better health today. We use cutting edge science, backed by labs and
						universities to look into your gut microbiome and give it a life outside your system – in a way that is understandable, usable
						and changeable. By researching and defining the microbes in your gut we can analyze the changes caused in your system - by
						what’s happening inside you.
					</Typography>
				</Container>

				<img src='/assets/about-us-company.svg' alt='about-us-company' style={{ maxHeight: '400px', width: '100%' }} />
			</div>
			<div style={{ background: '#25468A' }}>
				<Container sx={{ pt: '70px', pb: '100px' }}>
					<Grid container>
						<Grid item xs={12}>
							<Typography variant='subtitle1' className='text-base mb-2' color='#FAFAFA'>
								Every person is unique, like a freshly crafted snowflake that drifts from a winter sky – outwardly we all look to be
								similar in many ways, but upon closer inspection the variety and differences are astoundingly clear. We want to help
								you embrace this uniqueness and utilize it to step up into a better version of yourself. The food you eat, the way you
								live, your sleep patterns, your environment, and your genetics
							</Typography>
							<Typography variant='h5' lineHeight='38px' color='text.darkYellow' fontWeight='bold' sx={{ mb: '45px' }}>
								– Everything That Makes You, You!
							</Typography>
						</Grid>
					</Grid>
					<Typography variant='subtitle1' className='text-base mb-2' color='#FAFAFA'>
						You are the pioneer of this ship and its decisions, backed by Artificial Intelligence and state of the art Machine Learning.
						We help bridge the gap between your Gut microbiome, the food you eat and your overall wellness – in a way that can be
						sustained now, and in the future!
					</Typography>
					<div className='icon-list-rotate-container mt-20'>
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
				</Container>
			</div>
			<div style={{ backgroundColor: '#133373' }}>
				<Container sx={{ pt: '100px', pb: '100px' }} className='text-center'>
					<Typography variant='h3' color='#FAFAFA' className='text-4xl md:text-[48px] font-bold mb-4'>
						Do You Have Questions?
					</Typography>
					<Typography variant='subtitle1' className='text-base font-medium mb-6' color='#FAFAFA'>
						Write to us or get in touch with the Iom team using the contact form.
					</Typography>
					<Button color='darkYellow' variant='contained' size='small' component={Link} to='/contact'>
						<Typography variant='subtitle2' fontWeight='bold'>
							Get in touch
						</Typography>
					</Button>
				</Container>
			</div>
			<SiteFooter />
		</>
	);
};

export default GetStarted;
