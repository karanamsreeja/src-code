import React, { useState } from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';
import PopupVideoPlayer from 'components/PopupVideoPlayer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	imgBox: {
		top: '0',
		bottom: '0',
		left: '58%',
		right: '0',
		position: 'absolute',
		[theme.breakpoints.down('md')]: {
			display: 'none !important',
		},
	},
	bgdarkBlue: {
		background: theme.palette.background.darkBlue,
	},
	carouselItem: {
		background: 'white',
		boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
		borderRadius: '8px',
		padding: '28px 10px',
		height: '100%',
		width: '100%',
	},
}));

const Carousel = () => {
	const classes = useStyles();

	return (
		<Grid container spacing={2.5} justifyContent='center' sx={{ mt: { md: '40px', xs: '20px' } }}>
			<Grid item md={4} xs={12}>
				<Box className={classes.carouselItem}>
					<div className='center' style={{ marginBottom: '16px' }}>
						<img src='/assets/metabolism.png' alt='logo' style={{ height: '80px', width: '80px' }} />
					</div>
					<Typography
						variant='h5'
						className='text-[18px] md:text-[22px]'
						component='div'
						color='text.darkBlue'
						lineHeight='30px'
						fontWeight='bold'
						textAlign='center'
						gutterBottom
					>
						Better Metabolism
					</Typography>
					<Typography variant='body2' component='div' color='#424242' lineHeight='22px' textAlign='center' gutterBottom>
						The many chemical processes that occur in a person to sustain life.
					</Typography>
				</Box>
			</Grid>

			<Grid item md={4} xs={12}>
				<Box className={classes.carouselItem}>
					<div className='center' style={{ marginBottom: '16px' }}>
						<img src='/assets/mental-efficiency.png' alt='logo' style={{ height: '80px', width: '80px' }} />
					</div>
					<Typography variant='h5' component='div' color='#212121' lineHeight='30px' fontWeight='bold' textAlign='center' gutterBottom>
						Enhanced Mental Efficiency
					</Typography>
					<Typography variant='body2' component='div' color='#2B3C25' lineHeight='22px' textAlign='center' gutterBottom>
						The ability of the mind to perform optimally - to be able to think, retain and retrieve information efficiently.
					</Typography>
				</Box>
			</Grid>

			<Grid item md={4} xs={12}>
				<Box className={classes.carouselItem}>
					<div className='center' style={{ marginBottom: '16px' }}>
						<img src='/assets/well-being.png' alt='logo' style={{ height: '80px', width: '80px' }} />
					</div>
					<Typography variant='h5' component='div' color='#212121' lineHeight='30px' fontWeight='bold' textAlign='center' gutterBottom>
						Emotional Well-Being
					</Typography>
					<Typography variant='body2' component='div' color='#2B3C25' lineHeight='22px' textAlign='center' gutterBottom>
						Emotions, thoughts, feelings, and coping mechanisms your system creates for stress, anxiety, and fear
					</Typography>
				</Box>
			</Grid>

			<Grid item md={4} xs={12}>
				<Box className={classes.carouselItem}>
					<div className='center' style={{ marginBottom: '16px' }}>
						<img src='/assets/systemic-wellness.png' alt='logo' style={{ height: '80px', width: '80px' }} />
					</div>
					<Typography variant='h5' component='div' color='#212121' lineHeight='30px' fontWeight='bold' textAlign='center' gutterBottom>
						Immunity & Systemic Wellness
					</Typography>
					<Typography variant='body2' component='div' color='#2B3C25' lineHeight='22px' textAlign='center' gutterBottom>
						Your body’s capability to fight infections and disease while maintaining the physical.
					</Typography>
				</Box>
			</Grid>

			<Grid item md={4} xs={12}>
				<Box className={classes.carouselItem}>
					<div className='center' style={{ marginBottom: '16px' }}>
						<img src='/assets/sleep-efficacy.png' alt='logo' style={{ height: '80px', width: '80px' }} />
					</div>
					<Typography variant='h5' component='div' color='#212121' lineHeight='30px' fontWeight='bold' textAlign='center' gutterBottom>
						Sleep Efficacy
					</Typography>
					<Typography variant='body2' component='div' color='#2B3C25' lineHeight='22px' textAlign='center' gutterBottom>
						The ability of the body to rest, repair and renew.
					</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

const Home = () => {
	const classes = useStyles();
	const [videoSrc, setVideoSrc] = useState('');

	return (
		<>
			<div className='common-bg'>
				<div className='min-h-screen'>
					<SiteHeader />
					{videoSrc !== '' && <PopupVideoPlayer videoUrl={videoSrc} onClose={() => setVideoSrc('')} />}

					<div className='home'>
						<Container sx={{ pt: { md: '180px', xs: '100px' }, textAlign: 'center' }}>
							<Typography
								variant='h6'
								color='text.darkBlue'
								fontWeight='light'
								letterSpacing='7px'
								lineHeight={{ md: '110px', sm: '50px', xs: '40px' }}
								sx={{ mb: '14px', fontSize: { md: '96px', sm: '2.5rem', xs: '2rem' } }}
							>
								EMPOWER YOUR MICROBIOME
							</Typography>
							<Typography
								variant='h5'
								color='text.darkYellow'
								fontWeight='bold'
								lineHeight={{ md: '56px', xs: '26px' }}
								letterSpacing='4px'
								fontSize={{ md: '22px', xs: '18px' }}
								sx={{ mb: { md: '33px', xs: '20px' } }}
							>
								MAKE YOUR BACTERIA WORK FOR YOU
							</Typography>
							<div>
								<Button
									variant='contained'
									color='darkBlue'
									size='large'
									component={Link}
									to='/get-started'
									onClick={() => window.scrollTo(0, 0)}
									className='w-full md:w-auto mb-4 md:mb-0 mr-4'
								>
									<Typography variant='body2' component='div' color='inherit'>
										Get Started
									</Typography>
								</Button>
								<Button
									variant='outlined'
									color='darkBlue'
									size='large'
									onClick={() => setVideoSrc('/assets/video/intro_video.mp4')}
									sx={{ padding: '13px 24px', border: '2px solid rgb(6, 34, 92)', mt: 0 }}
									className='hover:border-2 w-full md:w-auto'
								>
									<img src='/assets/icons/play.svg' alt='play' style={{ height: '16px', color: 'black', marginRight: '8px' }} />
									<Typography variant='body2' fontWeight='bold' color='inherit'>
										Watch Video
									</Typography>
								</Button>

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
							</div>
						</Container>
					</div>
				</div>

				<div className='background-blend before:background-yellow'>
					<Container sx={{ pt: '100px', pb: '100px' }}>
						<Typography
							variant='h3'
							color='text.darkBlue'
							fontWeight='bold'
							textAlign='center'
							sx={{ mb: '23px', fontSize: { md: '68px', sm: '2.5rem', xs: '2rem' } }}
						>
							Your System and It’s Bacteria
						</Typography>
						<Typography variant='subtitle1' color='text.Blue600' fontWeight={500} lineHeight='34px' textAlign='center' gutterBottom>
							You are not you, alone! There are trillions of bacteria in your gut, on and around you. The constant synergy between the
							bacteria within your gut and your system defines your wellness, mood, and health. There are 5 core areas for the impact of
							the bacteria on your system.
						</Typography>

						<Carousel />
					</Container>
				</div>

				<Container sx={{ pt: '100px', pb: '100px' }}>
					<Typography
						variant='h3'
						color='text.darkBlue'
						fontWeight='bold'
						textAlign='center'
						sx={{ mb: '23px', fontSize: { md: '68px', sm: '2.5rem', xs: '2rem' } }}
					>
						The iom Journey
					</Typography>
					<Typography variant='subtitle1' color='text.Blue700' fontWeight={500} lineHeight='34px' textAlign='center' gutterBottom>
						iom helps you discover your relationship with your microbiome. Our AI powered exploration and inference process enables you to
						recruit your bacteria to enhance your health!
					</Typography>
				</Container>

				<div className='py-[100px] background-blend before:background-pink'>
					<Container sx={{ pt: '0' }}>
						<Grid container spacing={4} sx={{ height: { md: '440px' } }} alignItems='center'>
							<Grid container item xs={12} sx={{ display: { md: 'none', xs: 'flex' } }} alignItems='center' justifyContent='center'>
								<img src='/assets/iom-smaple-product-2.png' alt='search' style={{ maxHeight: '260px', maxWidth: '100%' }} />
							</Grid>
							<Grid item md={6} xs={12} className='text-center md:text-left'>
								<Typography variant='caption' component='p' color='text.darkerYellow' className='mb-[10px]'>
									STEP 1
								</Typography>
								<Typography variant='h4' component='div' color='text.Blue600' fontWeight='bold' sx={{ mb: '15px' }}>
									Embark
								</Typography>
								<Typography variant='body1' component='div' color='#424242' lineHeight='28px' sx={{ mb: '16px' }}>
									An easy home test initiates your journey. iom analyzes your stool sample for bacterial fingerprints. Your unique
									gut microbiome, and its composition defines how you are being affected by the food you eat, your lifestyle, your
									environment and more.
								</Typography>
								<Button
									variant='contained'
									color='darkYellow'
									sx={{ mt: '8px', padding: '14px 24px' }}
									component={Link}
									to='/get-started'
									onClick={() => window.scrollTo(0, 0)}
								>
									<Typography variant='body2' component='div' color='inherit'>
										Book an iom Journey
									</Typography>
								</Button>
							</Grid>
						</Grid>
						<div className={classes.imgBox}>
							<div className='center' style={{ height: '100%' }}>
								<img src='/assets/iom-smaple-product-2.png' alt='search' style={{ maxWidth: '100%', maxHeight: '440px' }} />
							</div>
						</div>
					</Container>
				</div>

				<div style={{ position: 'relative' }} className='py-[100px]'>
					<Container sx={{ pt: '0' }}>
						<Grid container spacing={4} sx={{ height: { md: '440px' } }} flexDirection={{ md: 'row-reverse' }} alignItems='center'>
							<Grid container item xs={12} sx={{ display: { md: 'none', xs: 'flex' } }} alignItems='center' justifyContent='center'>
								<img src='/assets/iom-smaple-product-3.jpg' alt='search' style={{ maxHeight: '260px', maxWidth: '100%' }} />
							</Grid>
							<Grid item md={6} xs={12} className='text-center md:text-left'>
								<Typography variant='caption' component='p' color='text.darkerYellow' className='mb-[10px]'>
									STEP 2
								</Typography>
								<Typography variant='h4' component='div' color='text.Blue600' fontWeight='bold' sx={{ mb: '15px' }}>
									Discover
								</Typography>
								<Typography variant='body1' component='div' color='#424242' lineHeight='28px' sx={{ mb: '16px' }}>
									The iom report highlights your gut bacterial diversity, gut scores, and microbiome snapshot. Detailed insights and
									intricate connections help us arrive at personalized, flexible food and lifestyle recommendations crafted for a
									healthier alliance between you and your bacteria.
								</Typography>
								<Button
									variant='contained'
									color='darkYellow'
									sx={{ mt: '8px', padding: '14px 24px' }}
									component={Link}
									to='/coming-soon'
									onClick={() => window.scrollTo(0, 0)}
								>
									<Typography variant='body2' component='div' color='inherit'>
										View Sample Report
									</Typography>
								</Button>
							</Grid>
						</Grid>
						<div className={classes.imgBox} style={{ right: '52%', left: '0', bottom: 0 }}>
							<div className='center' style={{ height: '100%' }}>
								<img src='/assets/iom-smaple-product-3.jpg' alt='search' style={{ maxWidth: '100%', maxHeight: '100%' }} />
							</div>
						</div>
					</Container>
				</div>

				<div className='py-[100px] background-blend before:background-pink'>
					<Container sx={{ pt: '0' }}>
						<Grid container spacing={4} sx={{ height: { md: '440px' } }} alignItems='center'>
							<Grid container item xs={12} sx={{ display: { md: 'none', xs: 'flex' } }} alignItems='center' justifyContent='center'>
								<img src='/assets/iom-smaple-product-4.jpg' alt='search' style={{ maxHeight: '260px', maxWidth: '100%' }} />
							</Grid>
							<Grid item md={6} xs={12} className='text-center md:text-left'>
								<Typography variant='caption' component='p' color='text.darkerYellow' className='mb-[10px]'>
									STEP 3
								</Typography>
								<Typography variant='h4' component='div' color='text.Blue600' fontWeight='bold' sx={{ mb: '15px' }}>
									Navigate
								</Typography>
								<Typography variant='body1' component='div' color='#424242' lineHeight='28px' sx={{ mb: '16px' }}>
									iom’s panel of doctors, nutritionists, and other healthcare specialists constantly support you in your health
									expedition. These professionals guide and mentor you consistently for the next 3 months, enabling you to see those
									changes you sought and transition to wellness.
								</Typography>
								<Button
									variant='contained'
									color='darkYellow'
									sx={{ mt: '8px', padding: '14px 24px' }}
									component={Link}
									to='/about-us/experts'
									onClick={() => window.scrollTo(0, 0)}
								>
									<Typography variant='body2' component='div' color='inherit'>
										Meet Our Specialist
									</Typography>
								</Button>
							</Grid>
						</Grid>
						<div className={classes.imgBox}>
							<div className='center' style={{ height: '100%' }}>
								<img src='/assets/iom-smaple-product-4.jpg' alt='search' style={{ maxWidth: '100%', maxHeight: '440px' }} />
							</div>
						</div>
					</Container>
				</div>
			</div>

			<div className={classes.bgdarkBlue}>
				<Container sx={{ pt: '100px', pb: '100px' }}>
					<Typography
						variant='h3'
						color='white'
						fontWeight='bold'
						textAlign='center'
						sx={{ mb: '16px', fontSize: { md: '68px', sm: '2.5rem', xs: '2rem' } }}
					>
						Our Customer Corner
					</Typography>
					<Typography
						variant='h5'
						fontSize={{ xs: '16px', md: '22px' }}
						color='white'
						fontWeight={500}
						lineHeight='24px'
						textAlign='center'
						className='md:mb-14 mb-8'
					>
						iom’s Health Journey has impacted the lives of our users! Hear it from them on their personal health journey.
					</Typography>

					<div className='center'>
						<div
							style={{ backgroundColor: '#133373' }}
							className='flex flex-col md:flex-row gap-8 py-6 px-5 md:rounded-l-[150px] md:rounded-tr-none rounded-t-[150px] sm:w-full md:w-9/12'
						>
							<div className='center'>
								<div
									className='md:w-56 md:h-56 max-w-[224px] max-h-[224px] rounded-full overflow-hidden'
									style={{ border: '4px solid #E1AB3B' }}
								>
									<img src='/assets/customer.png' alt='user' style={{ maxWidth: '100%' }} />
								</div>
							</div>
							<div className='flex1 center'>
								<Typography variant='subtitle1' component='span' color='white' fontWeight={500} lineHeight='31px'>
									“ I always want to do what is best for my body and mind. Over the years, I learned what works for my system. Yet,
									Iom's report was able to give me clear insight into the inner workings of my system. The best part for me was that
									the report reflected what I had found out through many trials and errors, in one simple test! The team has been
									vey helpful in guiding me throughout. I am quite happy with the results and would definitely do it again! “
									<br />- Venkat M.
								</Typography>
							</div>
						</div>
					</div>
				</Container>
			</div>

			<SiteFooter />
		</>
	);
};

export default Home;
