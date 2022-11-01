import React, { useEffect, useState } from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';
import TextField from 'components/TextField';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { axiosGet } from 'helpers/axios';

const StepperIcon = () => {
	return <img src='/assets/stepper.png' alt='stepper' />;
};

const StepperConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderLeft: '6px dotted #E1AB3B',
			borderRadius: 0,
		},
	},
}));
const StepperConnectorHorizontal = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderTop: '6px dotted #E1AB3B',
			borderRadius: 0,
		},
	},
}));

// const PincodeForm = () => {
// 	const [loading, setloading] = useState(false);
// 	const [pincode, setpincode] = useState('');
// 	const [message, setmessage] = useState({ error: false, message: null });

// 	const handlePincodeCheck = async () => {
// 		if (pincode.length !== 6) {
// 			setmessage({ error: true, message: 'Pincode must be 6 digits' });
// 			return;
// 		}

// 		setloading(true);
// 		setmessage({ error: false, message: null });

// 		const response = await axiosGet('/public/available-pincodes', { pincode }, setloading);

// 		if (response.status === 200) {
// 			setmessage({ error: false, message: response.data.message });
// 		} else {
// 			setmessage({ error: true, message: response?.data?.message });
// 		}
// 	};

// 	const keyPress = (e) => {
// 		console.log(e.keyCode);
// 		if (e.keyCode === 13) {
// 			handlePincodeCheck();
// 		}
// 	};

// 	return (
// 		<>
// 			<Typography variant='h5' component='div' fontWeight='bold' color='#06225C' sx={{ mb: '14px' }}>
// 				Check if we deliver to your location:
// 			</Typography>
// 			<TextField
// 				label='Pincode'
// 				id='outlined-size-small'
// 				size='small'
// 				fullWidth
// 				sx={{ background: 'white' }}
// 				placeholder='Enter Pincode'
// 				value={pincode}
// 				onChange={(e) => setpincode(e.target.value)}
// 				onKeyDown={keyPress}
// 				type='number'
// 			/>
// 			{message.message && (
// 				<Typography variant='body2' component='div' fontWeight='bold' color={message.error ? 'red' : '#06225C'} sx={{ mt: '6px' }}>
// 					{message.message}
// 				</Typography>
// 			)}
// 			<Button sx={{ mt: '10px' }} variant='contained' color='darkBlue' onClick={handlePincodeCheck} disabled={loading}>
// 				<Typography variant='body2' component='div' color='inherit'>
// 					Check
// 				</Typography>
// 			</Button>
// 		</>
// 	);
// };

const useStyles = makeStyles((theme) => ({
	packageContainer: {
		background: 'white',
		borderRadius: '10px',
		padding: '40px',
		[theme.breakpoints.down(440)]: {
			padding: '20px',
		},
	},
	packageBox: {
		border: '1px solid #06225C',
		borderRadius: '6px',
		padding: '20px',
	},
	bgdarkYellow: {
		background: theme.palette.background.darkYellow,
	},
}));

const GetStarted = ({ isLogin }) => {
	const navigate = useNavigate();
	const classes = useStyles();
	const [products, setproducts] = useState([]);
	const verticalSteps = [
		'You order the Kit and fill out the accompanying questionnaire',
		'The Iom kit is delivered to you',
		'Schedule sample pick up',
		'The iom Lab sequences your data',
		'Our team of specialists analyze and create recommendations for you ',
		'Receive your personalized report',
		'The Iom team guides you through the report',
		'Book your consultation with the healthcare specialist for further clarification and guidance',
	];
	const horizontalSteps = [
		'A kit for the sample testing',
		'A personalized report with both microbiome analysis and your constitutional data',
		'Around the clock support',
		'Multiple discussions with a healthcare professional of your choice',
	];

	useEffect(() => {
		async function getProduct() {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_BASEURL}/products`);
				if (res.status === 200) {
					setproducts(res.data.data);
				}
			} catch (error) {}
		}

		getProduct();
	}, []);

	const handleGotoCart = (id) => {
		if (isLogin) {
			navigate('/site/cart', {
				state: {
					productId: id,
				},
			});
		} else {
			navigate('/user/login', {
				state: {
					productId: id,
					redirectUrl: '/site/cart',
				},
			});
		}
	};

	return (
		<>
			<SiteHeader />
			<div className='common-bg'>
				<Container sx={{ pt: '100px', pb: '100px', textAlign: 'center' }}>
					<Typography variant='h3' component='div' color='#06225C' fontWeight='700' gutterBottom>
						Level Up to a Healthier You
					</Typography>
					<Typography variant='h5' lineHeight='34px' color='#2B4D93' component='div' fontWeight={500}>
						We at Iom want to empower you to step into a world of better health today. We use cutting edge science, backed by labs and
						universities, to look into your gut microbiome and give it a life outside your system – in a way that is understandable,
						usable and changeable. Through researching and defining the microbes in your gut we can analyze the changes caused in your
						system - what’s happening inside you.
					</Typography>
					<div style={{ margin: '20px', justifyContent: 'space-between', display: 'flex' }}>
						<img src='/assets/Group_7930.svg' alt='none' />
						<img src='/assets/Group_7931.svg' alt='none' />
						<img src='/assets/Group_7932.svg' alt='none' />
					</div>
					{products &&
						products.length > 0 &&
						products.slice(0, 1).map((e) => (
							<Button
								sx={{ mt: '10px', textTransform: 'initial' }}
								variant='contained'
								color='warning'
								size='large'
								onClick={() => handleGotoCart(e._id)}
							>
								<Typography variant='body2' component='div' color='inherit'>
									Start Now
								</Typography>
							</Button>
						))}
				</Container>
				{/* Check PIN Code */}
				<div sclassName='common-bg'>
					<Container sx={{ pt: '100px', pb: '100px' }}>
						<Grid container spacing={2}>
							<Grid item md={6} xs={12}>
								<Typography variant='h3' fontWeight={700} color='#E1AB3B' style={{ marginBottom: 60, marginLeft: 30 }}>
									The iom health journey helps you dive deeper into your own health
								</Typography>
								<img
									src='/assets/iom-smaple-product-1.png'
									alt='iom-smaple-product'
									style={{ maxHeight: '653px', maxWidth: '100%' }}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<Typography variant='h5' component='div' fontWeight='bold' color='#2B4D93'>
									The Journey looks like this:
								</Typography>
								<Stepper activeStep={verticalSteps.length} orientation='vertical' connector={<StepperConnector />}>
									{verticalSteps.map((step, index) => (
										<Step key={step.label}>
											<StepLabel StepIconComponent={StepperIcon}>
												<div
													style={{
														backgroundColor: '#E6E9F1',
														padding: 20,
														paddingLeft: 50,
														borderRadius: '305px 0px 0px 305px',
													}}
												>
													<Typography color='#424242'>{step}</Typography>
												</div>
											</StepLabel>
										</Step>
									))}
								</Stepper>
								{/* <ul style={{ paddingInlineStart: '20px' }}>
									<Typography variant='subtitle2' component='li' sx={{ mb: '10px' }}>
										Select a Package and place your order
									</Typography>
									<Typography variant='subtitle2' component='li' sx={{ mb: '10px' }}>
										The Iom kit is delivered to your house
									</Typography>
									<Typography variant='subtitle2' component='li' sx={{ mb: '10px' }}>
										Once you’re ready our team will collect the sample from your house
									</Typography>
									<Typography variant='subtitle2' component='li' sx={{ mb: '10px' }}>
										Our Lab receives and processes your data
									</Typography>
									<Typography variant='subtitle2' component='li' sx={{ mb: '10px' }}>
										You will then receive a personalized report
									</Typography>
									<Typography variant='subtitle2' component='li' sx={{ mb: '10px' }}>
										Our experts will guide you on your journey of wellness and health, based on your report.
									</Typography>
								</ul> */}
								{/* <hr style={{ borderTopColor: '#e0e0e05e', margin: '30px 0' }} /> */}
								{/* <PincodeForm /> */}
							</Grid>
							{/* {products && products.length > 0 && (
								<Grid item xs={12} sx={{ mt: '85px' }}>
									<Box className={classes.packageContainer}>
										<Typography variant='h4' component='div' color='#06225C' fontWeight='bold' sx={{ mb: '20px' }}>
											Choose a Package to Begin
										</Typography>
										<Grid container spacing={4} justifyContent='center'>
											{products.map((e) => (
												<Grid item md={6} xs={12} key={e._id}>
													<Box className={classes.packageBox}>
														<Typography
															variant='h5'
															component='div'
															fontWeight='bold'
															color='#212121'
															sx={{ mb: '4px', display: 'flex' }}
														>
															<img
																src='/assets/bar-left.svg'
																alt='bar'
																style={{ width: '25px', marginRight: '10px' }}
															/>
															{e.name}
														</Typography>
														<Typography variant='caption' component='div' color='#9E9E9E' gutterBottom>
															What You’ll Get
														</Typography>
														{e?.features.map((e, i) => (
															<Typography
																variant='body2'
																component='div'
																fontWeight='bold'
																color='#212121'
																sx={{ mb: '4px', display: 'flex' }}
																key={i}
															>
																<img
																	src='/assets/right-circle.svg'
																	alt='bar'
																	style={{ width: '16px', marginRight: '8px' }}
																/>
																{e}
															</Typography>
														))}

														<Typography
															variant='body2'
															component='div'
															fontWeight='bold'
															color='#212121'
															sx={{ mb: '4px', display: 'flex' }}
														>
															<img
																src='/assets/right-circle.svg'
																alt='bar'
																style={{ width: '16px', marginRight: '8px' }}
															/>{' '}
															A state-of-the-Art Kit to collect your sample
														</Typography>

														<Typography variant='h5' component='div' fontWeight='bold' color='#212121'>
															₹{e.price}
														</Typography>
														<Button
															sx={{ mt: '15px', boxShadow: 'none' }}
															size='large'
															variant='contained'
															color='darkYellow'
															fullWidth
															onClick={() => handleGotoCart(e._id)}
														>
															<Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
																Choose Package
															</Typography>
														</Button>
													</Box>
												</Grid>
											))}
										</Grid>
									</Box>
								</Grid>
							)} */}
						</Grid>
					</Container>
				</div>
				<div className='py-[100px] background-blend before:background-pink'>
					<Container>
						<Typography
							variant='h4'
							color='text.darkBlue'
							fontWeight='bold'
							// textAlign='center'
							style={{ fontWeight: 700, fontSize: 48, marginBottom: 50 }}
						>
							What will you receive in this health journey?
						</Typography>
						<Typography
							variant='subtitle1'
							fontWeight={500}
							lineHeight='34px'
							// textAlign='center'
							gutterBottom
							style={{ color: '#25468A', fontSize: 22 }}
						>
							Through thorough analysis, we are able to look at your microbiome composition, add a pinch of ancient Indian medicine
							(Ayurveda) and bring to you an amalgamation of the two sciences in an easy-to-understand way. We look at your health in 5
							different ways.
						</Typography>
						<img src='/assets/your-health.svg' alt='' style={{ verticalAlign: 'middle', marginLeft: 4, marginTop: 20 }} />
					</Container>
				</div>
				<div className='py-[100px] background-blend before:background-blue'>
					<Container>
						<Stepper activeStep={horizontalSteps.length} connector={<StepperConnectorHorizontal />} alternativeLabel>
							{horizontalSteps.map((step, index) => (
								<Step key={index}>
									<StepLabel StepIconComponent={StepperIcon}>
										<div
										// style={{
										// 	backgroundColor: '#E6E9F1',
										// 	padding: 20,
										// 	paddingLeft: 50,
										// 	borderRadius: '305px 0px 0px 305px',
										// }}
										>
											<Typography color='#fff'>{step}</Typography>
										</div>
									</StepLabel>
								</Step>
							))}
						</Stepper>
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
				<div className='py-[100px] common-bg'>
					<Container style={{ textAlign: 'center' }}>
						<Typography
							variant='h4'
							color='text.darkBlue'
							fontWeight='bold'
							textAlign='center'
							style={{ fontWeight: 700, fontSize: 48, marginBottom: 50 }}
						>
							Here is what your iom Report will look like
						</Typography>
						<Button color='darkYellow' variant='contained' size='small' component={Link} to='/coming-soon'>
							<Typography variant='subtitle2' fontWeight='bold'>
								View Preview
							</Typography>
						</Button>
						<div>
							<img src='/assets/sample-report.svg' alt='' style={{ verticalAlign: 'middle' }} />
						</div>
					</Container>
				</div>

				{/* <Container sx={{ pt: '100px', pb: '100px' }}>
					<Typography variant='h3' component='div' color='#06225C' fontWeight='bold' gutterBottom>
						How do you benefit from this Health Journey?
					</Typography>
					<Grid container spacing={2}>
						<Grid item md={7} xs={12}>
							<Typography variant='subtitle1' component='div' color='#2B4D93' sx={{ mb: '16px' }}>
								We initiate this process of self-discovery with a test that determines your Microbiome using your fecal sample. The
								gut microbiome profile is built based on the DNA sequence of the bacteria present using the 16S rRNA gene. The test
								leads to understanding the relative abundance and composition of the bacteria in the gut. Our mathematical models,
								algorithms and AI further highlight the linkages between this composition of the gut to its impact on various vital
								functions and requirements of your body.
							</Typography>
							<Typography variant='subtitle1' component='div' color='#DA8529' fontWeight='bold' sx={{ mb: '16px' }}>
								The report that you receive will provide your gut score that will throw light on various relevant parameters including
								your immunity, weight management, mental wellness, risk of inflammation, cardiovascular risk measures, among others
								that are shaped by your gut. <br />
								Our panel of specialized doctors, nutritionists, psychologists, therapists will work with you to correct the imbalance
								in your gut microbiome through customized solutions crafted for you.
							</Typography>
							<Typography variant='subtitle1' component='div' color='#2B4D93' gutterBottom>
								Mapping their experience and expertise to the information from the tests and AI models, we bring to you a scientific,
								achievable way to be better poised to tackle your everyday.
							</Typography>
						</Grid>
						<Grid container item md={5} xs={12} alignItems='center' justifyContent='center'>
							<img src='/assets/search.svg' alt='search' style={{ maxHeight: '260px', maxWidth: '100%' }} />
						</Grid>
					</Grid>
				</Container> */}
				{/* <div className={classes.bgdarkYellow}>
					<Container sx={{ pt: '100px', pb: '100px' }}>
						<Grid container spacing={2} justifyContent='center'>
							<Grid item md={9} xs={12} style={{ textAlign: 'center' }}>
								<Typography variant='h3' component='div' color='#06225C' fontWeight='bold' textAlign='center' gutterBottom>
									Want to know more about how a healthy gut benefits you?
								</Typography>
								<Button
									sx={{ mt: '10px', textTransform: 'initial' }}
									variant='contained'
									color='darkBlue'
									size='large'
									component={Link}
									to='/learn'
									onClick={() => window.scrollTo(0, 0)}
								>
									<Typography variant='body2' component='div' color='inherit'>
										Learn More
									</Typography>
								</Button>
							</Grid>
						</Grid>
					</Container>
				</div> */}

				<div style={{ background: '#133373' }}>
					<Container sx={{ pt: '90px', pb: '100px' }} className='text-center'>
						<Typography variant='h3' color='#FAFAFA' className='text-4xl md:text-[48px] font-bold mb-4'>
							Do You Have Questions?
						</Typography>
						<Typography variant='subtitle1' className='text-base font-medium mb-6' color='#FAFAFA'>
							Write to us or get in touch with the Iom team using the contact form given below.
						</Typography>
						<Button color='darkYellow' variant='contained' size='small' component={Link} to='/contact'>
							<Typography variant='subtitle2' fontWeight='bold'>
								Get in Touch
							</Typography>
						</Button>
					</Container>
				</div>
				<SiteFooter />
			</div>
		</>
	);
};

const mapStateToProps = ({ auth }) => {
	return {
		isLogin: auth.login,
	};
};

export default connect(mapStateToProps)(GetStarted);
