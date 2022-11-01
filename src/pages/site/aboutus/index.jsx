import React from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

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
}));

const GetStarted = () => {
	const classes = useStyles();

	return (
		<>
			<SiteHeader />
			<div className='common-bg'>
				<Container className='py-[100px]'>
					<Typography
						variant='h3'
						color='text.darkBlue'
						sx={{ width: { md: '90%', xs: '100%' }, padding: { md: '0 100px 0 100px', xs: 0 } }}
						className='font-bold text-center mb-4 md:text-7xl text-5xl'
					>
						Making Health and Wellness More Personal
					</Typography>
					<Typography
						variant='h5'
						color='#25468A'
						className='md:text-[22px] text-[18px] text-center font-bold'
						sx={{ width: { md: '95%', xs: '100%' } }}
					>
						We are powered by homegrown Machine Learning algorithms, Data Workflows, Organism Engineering, etc with deep foundations in
						Evolutionary Science, Personalised Nutrition, Microbial Genetics and Food Innovations.
					</Typography>
				</Container>

				<div className='py-[100px] background-blend before:background-pink'>
					<Container sx={{ pt: '0' }}>
						<Grid container spacing={4} sx={{ height: { md: '440px' } }} alignItems='center'>
							<Grid item md={6} xs={12}>
								<Typography color='text.darkBlue' className='md:text-[48px] text-5xl font-light'>
									We’re a band of
								</Typography>
								<Typography color='text.darkYellow' className='md:text-[48px] text-5xl font-bold mb-2'>
									Moral Evolutionists
								</Typography>
								<Typography variant='h5' className='text-xl text-blue-600 font-bold mb-4'>
									Building Evolutionary Computation
								</Typography>
								<Box sx={{ display: { md: 'none', xs: 'block' } }} className='text-center'>
									<img
										src='/assets/about-us-team-moral-evolution.svg'
										alt='search'
										style={{ maxHeight: '260px', maxWidth: '100%' }}
									/>
								</Box>
								<Typography variant='subtitle1' className='text-base text-gray-800'>
									There is no morality in evolution. Seen the cheetah devour the baby gazelle? Or considered how the Sphex wasps
									paralyses her victims for her offspring to feed on fresh flesh? Evolution is ghastly. And indifferent. Mankind is
									probably the only evolutionary outcome endowed with (some questionably) higher values. The next phase of earth’s
									evolution depends on what mankind can do. Applying morality to recombination, mutation, crossover and selection;
									to evolution, can raise our civilisation to another level.
									<br />
									<i className='block font-bold mt-4'>That's what we want to do!</i>
								</Typography>
							</Grid>
							<div className={classes.imgBox}>
								<div className='center' style={{ height: '100%' }}>
									<img
										src='/assets/about-us-team-moral-evolution.svg'
										alt='search'
										style={{ maxWidth: '100%', maxHeight: '440px' }}
									/>
								</div>
							</div>
						</Grid>
						<div className='icon-list-rotate-container mt-7'>
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

				<div style={{ position: 'relative' }} className='py-[100px]'>
					<Container sx={{ pt: 0 }}>
						<Grid container spacing={4} sx={{ height: { md: '440px' } }} flexDirection={{ md: 'row-reverse' }} alignItems='center'>
							<Grid item md={6} xs={12}>
								<Typography color='text.darkBlue' className='md:text-[48px] text-5xl font-light'>
									We’re a bunch of
								</Typography>
								<Typography color='text.darkYellow' className='md:text-[48px] text-5xl font-bold mb-2'>
									Eager Philosophers
								</Typography>
								<Typography variant='h5' className='text-xl text-blue-600 font-bold mb-4'>
									Ruthless Intelligence
								</Typography>
								<Box sx={{ display: { md: 'none', xs: 'block' } }} className='text-center'>
									<img src='/assets/about-us-team-philosophers.svg' alt='blank' style={{ maxHeight: '260px', maxWidth: '100%' }} />
								</Box>
								<Typography variant='subtitle1' className='text-base text-gray-800'>
									Search for eager philosopher on Google and it thinks you’ve made a spelling mistake. Probably cause there is none.
									That’s what we need. Zealous, eager philosophers that question the very nature of Science. Enhancing Science by
									going deeper and questioning the fundamental fabric of our being. And finding answers about these fundamental
									beings that make us us.
									<br />
									<i className='block font-bold mt-4'>That's what we want to do!</i>
								</Typography>
							</Grid>
						</Grid>
						<div className={classes.imgBox} style={{ right: '52%', left: '0', bottom: 0 }}>
							<div className='center' style={{ height: '100%' }}>
								<img src='/assets/about-us-team-philosophers.svg' alt='search' style={{ maxWidth: '100%', maxHeight: '100%' }} />
							</div>
						</div>
						<div className='icon-list-rotate-container mt-7'>
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

				<div className='py-[100px] background-blend before:background-pink'>
					<Container sx={{ pt: 0 }}>
						<Grid container spacing={4} sx={{ height: { md: '440px' } }} alignItems='center'>
							<Grid item md={6} xs={12}>
								<Typography color='text.darkBlue' className='md:text-[48px] text-5xl font-light'>
									We’re a group of
								</Typography>
								<Typography color='text.darkYellow' className='md:text-[48px] text-5xl font-bold mb-2'>
									Relentless Researchers
								</Typography>
								<Typography variant='h5' className='text-xl text-blue-600 font-bold mb-4'>
									Humanising Algorithms
								</Typography>
								<Box sx={{ display: { md: 'none', xs: 'block' } }} className='text-center'>
									<img src='/assets/about-us-team-researchers.svg' alt='search' style={{ maxHeight: '260px', maxWidth: '100%' }} />
								</Box>
								<Typography variant='subtitle1' className='text-base text-gray-800'>
									Our Research isn’t restricted to microbial genetics, or nutrition science, or organism engineering, or even data
									science. There’s deep thought and study applied to our customer service, to marketing, to our communication
									messaging. You can call the results of these interrogations better processes or better algorithms; we call it
									everyday work. These transcend conventional capabilities and give fresh perspectives to our services and offerings
									<br />
									<i className='block font-bold mt-4'>That's what we want to do!</i>
								</Typography>
							</Grid>
						</Grid>
						<div className={classes.imgBox}>
							<div className='center' style={{ height: '100%' }}>
								<img src='/assets/about-us-team-researchers.svg' alt='search' style={{ maxWidth: '100%', maxHeight: '440px' }} />
							</div>
						</div>
						<div className='icon-list-rotate-container mt-7'>
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

				<div style={{ position: 'relative' }} className='py-[100px]'>
					<Container sx={{ pt: 0 }}>
						<Grid container spacing={4} sx={{ height: { md: '440px' } }} flexDirection={{ md: 'row-reverse' }} alignItems='center'>
							<Grid item md={6} xs={12}>
								<Typography color='text.darkBlue' className='md:text-[48px] text-5xl font-light'>
									We’re a team of
								</Typography>
								<Typography color='text.darkYellow' className='md:text-[48px] text-5xl font-bold mb-2'>
									Absolute Relativists
								</Typography>
								<Typography variant='h5' color='#25468A' fontWeight='bold' lineHeight='48px' sx={{ mb: '40px' }}>
									Mastering Data
							
								</Typography>
								<Box sx={{ display: { md: 'none', xs: 'block' } }} className='text-center'>
									<img src='/assets/about-us-team-relativists.svg' alt='blank' style={{ maxHeight: '260px', maxWidth: '100%' }} />
								</Box>
								<Typography variant='subtitle1' className='text-base text-gray-800'>
									Nothing is absolute. Its always relative. Or is it? But we are absolutely certain that our AI that builds
									Nutrition, Microbes and Disease models are relative to the data we have. Data, what it enables and how it is
									interpreted plays a central role in what we do. Intricately designed processes and workflows give new meaning to
									patterns that can be detected and predictions that can be made. From the same data. Moving from an Illusion to
									vision is relative to data.
									<br />
									<i className='block font-bold mt-4'>That's what we want to do!</i>
								</Typography>
							</Grid>
						</Grid>
						<div className={classes.imgBox} style={{ right: '52%', left: '0', bottom: 0 }}>
							<div className='center' style={{ height: '100%' }}>
								<img src='/assets/about-us-team-relativists.svg' alt='search' style={{ maxWidth: '100%', maxHeight: '100%' }} />
							</div>
						</div>
						<div className='icon-list-rotate-container mt-7'>
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
			</div>

			<div style={{ background: '#133373' }}>
				<Container sx={{ pt: '90px', pb: '100px' }} className='text-center'>
					<Typography variant='h3' color='#FAFAFA' className='text-4xl md:text-[48px] font-bold mb-4'>
						Like what we do?
					</Typography>
					<Typography variant='subtitle1' className='text-base font-medium mb-6' color='#FAFAFA'>
						Talk to us. We could make you feel anew
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

export default GetStarted;
