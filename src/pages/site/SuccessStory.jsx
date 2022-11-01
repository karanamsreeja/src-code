import React from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import { Avatar } from '@mui/material';

const SuccessStory = () => {
	return (
		<>
			<SiteHeader />
			<div className='common-bg'>
				<Container sx={{ pt: '100px', pb: '100px', textAlign: 'center' }}>
					<Typography variant='h3' color='text.darkBlue' fontWeight='bold' className='md:text-7xl text-5xl' sx={{ mb: '30px' }}>
						The iom Community
					</Typography>
					<Typography variant='subtitle2' color='#25468A' lineHeight={1.2} fontSize={22} sx={{ mb: '30px' }}>
						Here are some of the Iom community members and their journey - to help inspire and motivate others who are striving to be
						better in their health.
					</Typography>
				</Container>
			</div>

			<div style={{ background: '#E6E9F1' }}>
				<Container sx={{ pt: '100px', pb: '100px' }}>
					<Grid container spacing={2}>
						<Grid container item md={3} spacing={2} style={{ display: 'block' }}>
							<Grid item md={12}>
								<Card
									sx={{
										display: { md: 'block', sm: 'flex', xs: 'block' },
										width: '100%',
										background: { md: 'transparent', xs: 'white' },
										border: '1px solid #E9ECF2',
										boxShadow: '0px 3.84083px 20.1644px rgba(157, 175, 181, 0.25);',
									}}
								>
									<CardMedia
										component='img'
										image='/assets/user6.png'
										alt='user'
										style={{ maxHeight: '240px', minHeight: '180px', objectFit: 'fill' }}
									/>
									<CardContent sx={{ backgroundColor: '#FFFFFF' }}>
										<Typography variant='subtitle2' lineHeight='150%' component='div' color='#232527' sx={{ mb: '14px' }}>
											Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
											enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
										</Typography>
										<Typography variant='subtitle2' fontWeight='bold' component='div' color='#293238'>
											Istiak Ahmed
										</Typography>
										<Typography gutterBottom variant='subtitle2' component='div' color='#7D7A7A'>
											CEO, Avito
										</Typography>
										<Rating name='size-small' defaultValue={5} size='small' readOnly sx={{ color: '#758090' }} />
									</CardContent>
								</Card>
							</Grid>
							<Grid item md={12}>
								<Card
									sx={{
										width: '100%',
										background: 'transparent',
										border: '1px solid #E9ECF2',
										boxShadow: '0px 3.84083px 20.1644px rgba(157, 175, 181, 0.25);',
										backgroundColor: '#FFFFFF',
									}}
								>
									<CardHeader
										sx={{ pb: '4px' }}
										avatar={
											<Avatar sx={{ bgcolor: 'none' }} aria-label='recipe'>
												<img src='/assets/user8.png' alt='user' />
											</Avatar>
										}
										title={
											<>
												<Typography variant='subtitle2' fontWeight='bold' fontSize='13px' component='div' color='#293238'>
													Jon Sari
												</Typography>
												<Typography variant='subtitle2' component='div' fontSize='13px' color='#7D7A7A'>
													CEO, Avito
												</Typography>
											</>
										}
										subheader={<Rating name='size-small' defaultValue={5} readOnly sx={{ color: '#758090', fontSize: '14px' }} />}
									/>
									<CardContent sx={{ pl: '72px', pt: 0 }}>
										<Typography variant='subtitle2' color='#293238' fontWeight={400}>
											Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
											enim velit mollit. Exercitation veniam
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						<Grid container item md={6} spacing={2} style={{ display: 'block' }}>
							<Grid item md={12}>
								<Card
									sx={{
										display: 'flex',
										width: '100%',
										background: { md: 'transparent', xs: 'white' },
										border: '1px solid #E9ECF2',
										boxShadow: '0px 3.84083px 20.1644px rgba(157, 175, 181, 0.25)',
										flexWrap: { sm: 'initial', xs: 'wrap' },
									}}
								>
									<CardMedia
										component='img'
										sx={{ width: { md: '270px', xs: '100%' }, height: 250 }}
										image='/assets/user7.png'
										alt='user'
									/>
									<Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
										<CardContent>
											<Typography variant='subtitle2' lineHeight='150%' component='div' color='#232527' sx={{ mb: '14px' }}>
												Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
												enim velit mollit. Exercitation veniam
											</Typography>
											<Typography variant='subtitle2' fontWeight='bold' component='div' color='#293238'>
												Rahul Deb
											</Typography>
											<Typography gutterBottom variant='subtitle2' component='div' color='#7D7A7A'>
												CEO, Avito
											</Typography>
											<Rating name='size-small' defaultValue={5} size='small' readOnly sx={{ color: '#758090' }} />
										</CardContent>
									</Box>
								</Card>
							</Grid>
							<Grid item md={12}>
								<Card
									sx={{
										p: '4px 26px',
										width: '100%',
										background: 'white',
										border: '1px solid #E9ECF2',
										boxShadow: '0px 3.84083px 20.1644px rgba(157, 175, 181, 0.25)',
										borderRadius: 0,
									}}
								>
									<CardHeader
										sx={{ pb: '4px', pl: 0 }}
										avatar={
											<Avatar sx={{ width: '54px', height: '54px', background: 'none' }}>
												<img src='/assets/user8.png' alt='user' style={{ width: '100%', height: '100%' }} />
											</Avatar>
										}
										title={
											<>
												<Typography variant='subtitle2' fontWeight='bold' component='div' color='#293238'>
													Jon Sari
												</Typography>
												<Typography variant='subtitle2' component='div' color='#7D7A7A'>
													CEO, Avito
												</Typography>
											</>
										}
										subheader={<Rating name='size-small' defaultValue={5} readOnly sx={{ color: '#758090', fontSize: '14px' }} />}
									/>
									<CardContent sx={{ pt: '10px', pb: '20px !important', pl: 0 }}>
										<Typography variant='subtitle2' color='#293238' fontWeight={400}>
											Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
											enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
										</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item md={12}>
								<Card
									sx={{
										p: '4px 26px',
										width: '100%',
										background: 'white',
										border: '1px solid #E9ECF2',
										boxShadow: '0px 3.84083px 20.1644px rgba(157, 175, 181, 0.25)',
										borderRadius: 0,
									}}
								>
									<CardHeader
										sx={{ pb: '4px', pl: 0 }}
										avatar={
											<Avatar sx={{ width: '54px', height: '54px', background: 'none' }}>
												<img src='/assets/user9.png' alt='user' style={{ width: '100%', height: '100%' }} />
											</Avatar>
										}
										title={
											<>
												<Typography variant='subtitle2' fontWeight='bold' component='div' color='#293238'>
													Jon Sari
												</Typography>
												<Typography variant='subtitle2' component='div' color='#7D7A7A'>
													CEO, Avito
												</Typography>
											</>
										}
										subheader={<Rating name='size-small' defaultValue={5} readOnly sx={{ color: '#758090', fontSize: '14px' }} />}
									/>
									<CardContent sx={{ pt: '10px', pb: '20px !important', pl: 0 }}>
										<Typography variant='subtitle2' color='#293238' fontWeight={400}>
											Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
											enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						<Grid container item md={3} spacing={2} style={{ display: 'block' }}>
							<Grid item md={12}>
								<Card
									sx={{
										width: '100%',
										background: 'white',
										border: '1px solid #E9ECF2',
										boxShadow: '0px 3.84083px 20.1644px rgba(157, 175, 181, 0.25)',
									}}
								>
									<CardHeader
										sx={{ pb: '4px' }}
										avatar={
											<Avatar sx={{ bgcolor: 'none' }} aria-label='recipe'>
												<img src='/assets/user8.png' alt='user' />
											</Avatar>
										}
										title={
											<>
												<Typography variant='subtitle2' fontWeight='bold' component='div' color='#293238'>
													Nazmul Karim
												</Typography>
												<Typography variant='subtitle2' component='div' color='#7D7A7A'>
													CEO, Avito
												</Typography>
											</>
										}
										subheader={<Rating name='size-small' defaultValue={5} readOnly sx={{ color: '#758090', fontSize: '14px' }} />}
									/>
									<CardContent sx={{ pl: '72px', pt: 0 }}>
										<Typography variant='subtitle2' color='#293238' fontWeight={400}>
											Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
											enim velit mollit. Exercitation veniam
										</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item md={12}>
								<Card
									sx={{
										width: '100%',
										background: 'white',
										border: '1px solid #E9ECF2',
										boxShadow: '0px 3.84083px 20.1644px rgba(157, 175, 181, 0.25)',
									}}
								>
									<CardHeader
										sx={{ pb: '4px' }}
										avatar={
											<Avatar sx={{ bgcolor: 'none' }} aria-label='recipe'>
												<img src='/assets/user8.png' alt='user' />
											</Avatar>
										}
										title={
											<>
												<Typography variant='subtitle2' fontWeight='bold' component='div' color='#293238'>
													Jon Sari
												</Typography>
												<Typography variant='subtitle2' component='div' color='#7D7A7A'>
													CEO, Avito
												</Typography>
											</>
										}
										subheader={<Rating name='size-small' defaultValue={5} readOnly sx={{ color: '#758090', fontSize: '14px' }} />}
									/>
									<CardContent sx={{ pl: '72px', pt: 0 }}>
										<Typography variant='subtitle2' color='#293238' fontWeight={400}>
											Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
											enim velit mollit. Exercitation veniam
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</div>
			<SiteFooter />
		</>
	);
};

export default SuccessStory;
