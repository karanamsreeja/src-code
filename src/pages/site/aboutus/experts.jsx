import React from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

const Experts = () => {
	return (
		<>
			<SiteHeader />
			<Container sx={{ pt: '60px', pb: '60px' }} className='center'>
				<Box sx={{ width: { md: '68%', xs: '100%' } }}>
					<Typography variant='h3' component='div' textAlign='center' color='#06225C' fontWeight='700' gutterBottom>
						Meet Our Experts
					</Typography>
					<Typography variant='subtitle1' component='div' textAlign='center' color='#25468A' fontWeight='500' sx={{ mb: '16px' }}>
						Our panel of iom specialists will help guide you on the right track. These specialists come together to build your journey in
						a way that is unique to your system, your microbiome, and your requirements.
					</Typography>
					{/* <Typography variant='body2' component='div' textAlign='center' line color='#000000' lineHeight='22px'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu neque bibendum posuere vestibulum ullamcorper nunc. Eget porta non
						ornare curabitur. Enim elementum eleifend mattis a tellus metus iaculis nisi. Neque ultrices nibh amet ut aliquam ut in
						rhoncus fermentum. Proin porta condimentum ut id aliquet velit ac. Suspendisse et posuere sit ipsum elit enim, et malesuada
						dui. Aliquam amet pellentesque dui diam.
					</Typography> */}
				</Box>
			</Container>
			<div className='common-bg'>
				<Container sx={{ pt: '60px', pb: '100px' }}>
					<Grid container spacing={4} justifyContent='space-evenly' sx={{ mb: '30px' }}>
						<Grid item>See All </Grid>
						<Grid item>Nutrition</Grid>
						<Grid item>Gastroenterology</Grid>
						{/* <Grid item>Rehabilitation</Grid>
						<Grid item>Diabetes</Grid>
						<Grid item>Functional Medicine</Grid>
						<Grid item>Pediatric Nutrition</Grid> */}
					</Grid>

					<Grid container spacing={2}>
						<Grid item md={4} xs={6}>
							<Card
								sx={{
									maxWidth: 345,
									borderRadius: '173.5px 173.5px 0px 0px',
									textAlign: 'center',
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
									marginBottom: '30px',
								}}
							>
								<CardMedia component='img' height='290' image='/assets/user.png' alt='green iguana' />
								<CardContent>
									<Typography
										variant='subtitle1'
										fontSize={'22px'}
										component='div'
										lineHeight='22px'
										color='#25468A'
										fontWeight='700'
									>
										Darlene Robertson
									</Typography>
									<Typography variant='caption' component='div' fontSize={'12px'} color='#25468A' fontWeight='700'>
										SPECIALISATION
									</Typography>
									<img src='/assets/5-stars.svg' alt='stars' style={{ width: '100%' }} />
								</CardContent>
								<CardActions style={{ justifyContent: 'center' }}>
									<Typography fontSize={'14px'} fontWeight={600} sx={{ textDecoration: 'underline' }}>
										Book an Appointment
									</Typography>
								</CardActions>
							</Card>
						</Grid>
						<Grid item md={4} xs={6}>
							<Card
								sx={{
									maxWidth: 345,
									borderRadius: '173.5px 173.5px 0px 0px',
									textAlign: 'center',
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
									marginBottom: '30px',
								}}
							>
								<CardMedia component='img' height='290' image='/assets/user.png' alt='green iguana' />
								<CardContent>
									<Typography
										variant='subtitle1'
										fontSize={'22px'}
										component='div'
										lineHeight='22px'
										color='#25468A'
										fontWeight='700'
									>
										Darlene Robertson
									</Typography>
									<Typography variant='caption' component='div' fontSize={'12px'} color='#25468A' fontWeight='700'>
										SPECIALISATION
									</Typography>
									<img src='/assets/5-stars.svg' alt='stars' style={{ width: '100%' }} />
								</CardContent>
								<CardActions style={{ justifyContent: 'center' }}>
									<Typography fontSize={'14px'} fontWeight={600} sx={{ textDecoration: 'underline' }}>
										Book an Appointment
									</Typography>
								</CardActions>
							</Card>
						</Grid>
						<Grid item md={4} xs={6}>
							<Card
								sx={{
									maxWidth: 345,
									borderRadius: '173.5px 173.5px 0px 0px',
									textAlign: 'center',
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
									marginBottom: '30px',
								}}
							>
								<CardMedia component='img' height='290' image='/assets/user.png' alt='green iguana' />
								<CardContent>
									<Typography
										variant='subtitle1'
										fontSize={'22px'}
										component='div'
										lineHeight='22px'
										color='#25468A'
										fontWeight='700'
									>
										Darlene Robertson
									</Typography>
									<Typography variant='caption' component='div' fontSize={'12px'} color='#25468A' fontWeight='700'>
										SPECIALISATION
									</Typography>
									<img src='/assets/5-stars.svg' alt='stars' style={{ width: '100%' }} />
								</CardContent>
								<CardActions style={{ justifyContent: 'center' }}>
									<Typography fontSize={'14px'} fontWeight={600} sx={{ textDecoration: 'underline' }}>
										Book an Appointment
									</Typography>
								</CardActions>
							</Card>
						</Grid>
						<Grid item md={4} xs={6}>
							<Card
								sx={{
									maxWidth: 345,
									borderRadius: '173.5px 173.5px 0px 0px',
									textAlign: 'center',
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
									marginBottom: '30px',
								}}
							>
								<CardMedia component='img' height='290' image='/assets/user.png' alt='green iguana' />
								<CardContent>
									<Typography
										variant='subtitle1'
										fontSize={'22px'}
										component='div'
										lineHeight='22px'
										color='#25468A'
										fontWeight='700'
									>
										Darlene Robertson
									</Typography>
									<Typography variant='caption' component='div' fontSize={'12px'} color='#25468A' fontWeight='700'>
										SPECIALISATION
									</Typography>
									<img src='/assets/5-stars.svg' alt='stars' style={{ width: '100%' }} />
								</CardContent>
								<CardActions style={{ justifyContent: 'center' }}>
									<Typography fontSize={'14px'} fontWeight={600} sx={{ textDecoration: 'underline' }}>
										Book an Appointment
									</Typography>
								</CardActions>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</div>

			<div style={{ background: '#133373' }}>
				<Container sx={{ pt: '90px', pb: '100px' }} className='text-center'>
					<Typography variant='h3' color='#FAFAFA' className='text-4xl md:text-[48px] font-bold mb-4'>
						Do You Have Questions?
					</Typography>
					<Typography variant='subtitle1' className='text-base font-medium mb-6' color='#FAFAFA'>
						If you like what we do, and you want to peek inside our heads a bit, come and chat with us!
					</Typography>
					<Button color='darkYellow' variant='contained' size='small' component={Link} to='/contact'>
						<Typography variant='subtitle2' fontWeight='bold'>
							Get in Touch
						</Typography>
					</Button>
				</Container>
			</div>

			<SiteFooter />
		</>
	);
};

export default Experts;
