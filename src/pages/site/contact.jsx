import React, { useState, useRef } from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// import { Link } from 'react-router-dom';
import TextField from 'components/TextField';
import { useSnackbar } from 'notistack';

import { axiosPost } from '../../helpers/axios';

export default function Contact() {
	const [loading, setloading] = useState(false);
	const formRef = useRef();
	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setloading(true);

		const form = new FormData(event.target);

		const fullname = form.get('fullname');
		const email = form.get('email');
		const message = form.get('message');

		await axiosPost('/contactus', { fullname, email, message }, setloading);

		formRef.current.reset();

		enqueueSnackbar('Sent your query. You can also use the chatbot for smooth interaction.', { variant: 'success' });
	};
	return (
		<>
			<SiteHeader />
			<div className='our-science-bg'>
				<Container className='our-science'>
					<div className='hero' sx={{ textAlign: 'center' }}>
						<Typography variant='h3' color='text.darkBlue' className='text-5xl md:text-7xl font-bold mb-6'>
							Wanna know what’s going on in our heads?
						</Typography>
						<Typography className='md:text-[22px] text-[18px] leading-7 mb-4 font-medium text-light-blue'>
							Or <br />
							perhaps you’d like to discuss some of your own thoughts. Write it all at better@iombio.com
						</Typography>
					</div>
				</Container>

				<Container style={{ maxWidth: '800px' }}>
					<Grid container spacing={2} sx={{ mb: '33px' }} component='form' onSubmit={handleSubmit} ref={formRef}>
						<Grid item xs={12}>
							<TextField
								label='Full Name'
								placeholder='Enter Full Name'
								size='small'
								name='fullname'
								// value={state.name}
								// onChange={(e) => setState((pre) => ({ ...pre, name: e.target.value }))}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Email Address'
								placeholder='Enter Email Address'
								size='small'
								name='email'
								// value={state.price}
								// onChange={(e) => setState((pre) => ({ ...pre, price: e.target.value }))}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Message'
								placeholder='Enter Message'
								size='normal'
								name='message'
								multiline
								rows={4}
								// value={state.price}
								// onChange={(e) => setState((pre) => ({ ...pre, price: e.target.value }))}
							/>
						</Grid>
						<div style={{ textAlign: 'center', width: '100%', marginTop: '10px' }}>
							<Button
								type='submit'
								variant='contained'
								sx={{ p: '10px 16px', borderRadius: '10px', backgroundColor: '#E1AB3B' }}
								disabled={loading}
							>
								Submit
							</Button>
						</div>
					</Grid>
				</Container>
			</div>
			<SiteFooter />
		</>
	);
}
