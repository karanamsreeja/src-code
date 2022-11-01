import React from 'react';
import ReactPlayer from "react-player"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Index() {
	return (
		<div className='common-bg'>
			<Container className='text-center pt-20'>
				<Typography variant='h3' color='text.darkBlue' fontWeight='bold' className='md:text-7xl text-5xl mb-7'>
					What is the Microbiome?
				</Typography>
				<Typography variant='h5' className='md:text-2xl text-lg mb-7' color='text.darkYellow'>
					“The whole is greater than the sum of its parts.” - <b>Aristotle.</b>
				</Typography>
				{/*<Typography className='md:text-[22px] text-[18px] text-blue-600 leading-9 mb-5 text-left' align="left">*/}
                                <Typography color='#424242' className='text-base mb-5 mt-5 text-left' align="left">
					You are not You, alone! You are a culmination of trillions of microbes, good and bad, that live in and around you. They make you,
					You. Each micro - organism like a music note. When they all play together, in harmony, with you, you make melody.
                                        There is a constant interplay between us and the microbes, in the environment, in the soil, air and within us. The synergy between
					these millions of microbes and you, defines how you feel, how you think, your reactions, both today and in the future.
                                 
                                </Typography> 
                                <Typography color='#424242' className='text-base mb-10 mt-5 text-left font-bold' align="left" fontStyle='italic'>
                                
                                        The collection of these organisms in your body - bacteria, yeasts, fungi, protozoa, their genes, and the chemicals
                                           (metabolites) they create is the Microbiome.

				</Typography>
			</Container>

			<div className='background-blend before:background-pink-light pb-20 md:pt-16 pt-8'>
				<Container>{/*
					<Typography
						variant='h3'
						color='text.darkBlue'
						className='md:text-[32px] text-[28px] leading-10 mb-16 md:mb-14 text-center font-bold'
					>
						The collection of these organisms in your body - bacteria, yeasts, fungi, protozoa, their genes, and the chemicals
						(metabolites) they create is the Microbiome.
					</Typography>*/}

					<img src='/assets/learn-01.jpg' alt='learn' style={{ width: '100%', maxHeight: '750px' }} />
					{/*<Typography color='#424242' className='text-base mb-10 mt-12'>
						Your first encounter with the Microbiome was during your birth, at the delivery canal, and then through breastmilk and
						subsequently through exposure to the elements. The bacterial abundance and make-up are based on your interaction with your
						environment, food, lifestyle, and genetics. To be more aware and, thus, to be able to chart the course of your health
						yourself, it is vital to know and understand how your body interacts with these microbes. What role do they play in your
						health, what makes them be and what makes you, you?
						<br />
						<br />
						Just by cell count, you are only 43% you and 57% a sum of all the microorganisms in and on you. The microbiome gene count at
						3.3 million outnumbers the 22,000 human genes in us by 150 times. You are unique and different from the next human by the
						composition of this Microbiome more than by your genetic makeup. You are genetically 99.9% the same as the next human but up
						to 20% different with respect to the Microbiome.
					</Typography>
					<Typography variant='h3' className='md:text-[22px] text-[18px] font-bold text-dark-blue mb-6'>
						Get a deeper insight into Your Microbiome
					</Typography>
					<Button
						variant='contained'
						color='darkYellow'
						sx={{ padding: '14px 24px' }}
						component={Link}
						to='/get-started'
						onClick={() => window.scrollTo(0, 0)}
					>
						<Typography variant='body2' color='inherit'>
							Book your Health Journey now
						</Typography>
					</Button>*/}				
                               </Container>
			</div>
                       <div className='background-blend before:background-pink-light pb-20 md:pt-16 pt-8'>
                                <Container sx={{ textAlign: 'center' }}>
                                        <Typography variant='h3' color='text.darkBlue' className='md:text-7xl text-5xl mb-7 font-bold'>
                                                Why Gut Microbiome?
                                        </Typography>
                                         <Typography variant='h5' className='md:text-2xl text-lg mb-7' color='text.darkYellow'>
                                        Now called the second brain, the nearly 100 trillion microbes in the gut, representing almost 5000 species, can weigh up to 2 kgs!
                                        </Typography>
                                        {/*<Typography variant='subtitle2' color='#25468A' className='md:text-[22px] text-[18px] leading-7 mb-7'>*/}
                                        <Typography color='#424242' className='text-base mb-10 mt-5 text-left' align="left">
                                                These microbes are on our skin, in our mouth, and in the genitalia, but it’s the gut that is the most significant. In terms of
                                                mere presence and abundance, the configuration has a far-reaching impact on us in ways that we never imagined. Now called the
                                                second brain, the nearly 100 trillion microbes in the gut, representing almost 5000 species, can weigh up to 2 kgs!
                                        </Typography>
                                        {/*<img src='/assets/play.png' alt='youtube video' style={{ width: '100%', maxHeight: '550px' }} />*/}
                                        <ReactPlayer url="https://www.youtube.com/embed/0_KmCDTSm3o" controls={true} width='100%' height='550px'/>

                                        {/*<Typography color='#424242' fontSize={16} sx={{ mb: '50px', pt: '50px', textAlign: 'left' }}>
                                                However, what exactly do they do? Apart from making music? From harvesting energy from the food we eat to our immune functions
                                                to manufacturing hormones-mood (serotonin), stress levels (cortisol), thyroid, sleep, (melatonin), and even vitamins the Gut
                                                microbiome is, in essence, the nerve center of a host of vital activity.
                                                <br />
                                                <br />
                                                Scientific literature states that the gut, considered a virtual endocrine gland, is responsible for various metabolic and
                                                nervous disorders, including diabetes, obesity or even Alzheimers and others that have been associated with imbalances in the
                                                gut. The micro and organisms that are not in sync with you, not in harmony with you, won’t allow your body to make beautiful
                                                music.
                                        </Typography>*/}
                                </Container>
                        </div>
			<div className='background-blend before:background-yellow pb-20 pt-20'>
				<Container>
					<div className='box-line-left-spacer'>
						<Typography variant='h5' className='text-[30px] font-bold text-dark-blue mb-7' pb='10px'>
							Do We Need to Know More?
						</Typography>
						<Typography variant='subtitle1' lineHeight='26px' color='#25468A' fontWeight={500}>
							Knowing that our gut holds the key to our wellbeing is not new. That we have microorganisms that are impacted by our food,
							our lifestyle is not new. That the gut is happier when we are mindful of it is not new. That ensuring we eat right and
							live right for a healthier tomorrow is not new.
							<br />
							<br />
							<Typography variant='h5' lineHeight='26px' component='span' fontWeight='600' color='#06225C'>
								We know this.
							</Typography>
							<br />
							<br />
							What we are discovering are the connections between the composition of your gut, how that composition works for your body, or not and what changes can lead to better health. We are crafting edits that can aid other prevalent methods of recovery. We are learning how to ensure these edits are personalized, relevant, and sustainable. Get a deeper insight into your microbiome through Iom and accelerate your health journey
						<br />
						<br />
						</Typography>
                                                 <Button
                                                variant='contained'
                                                color='darkBlue'
                                                sx={{ padding: '14px 24px' }}
                                                component={Link}
                                                to='/get-started'
                                                onClick={() => window.scrollTo(0, 0)}
                                        >  <Typography variant='body2' color='inherit'>
                                                        Book your Health Journey now
                                                </Typography>

						</Button>
						<div className='bact-white-list-icons'></div>
					</div>
				</Container>
			</div>

			<div style={{ width: '100%' }}>
				<Container sx={{ pt: '70px', textAlign: 'center' }}>
					<Typography variant='h3' color='text.darkBlue' className='md:text-7xl text-5xl mb-7 font-bold'>
						What is Iom Doing?
					</Typography>
                                        <Typography variant='h5' className='md:text-2xl text-lg mb-7' color='text.darkYellow'>
                                        You are genetically 99.9% the same as the next human but up to 20% different with respect to the Microbiome.

                                        </Typography>
                                        <img src='/assets/learn-02.jpg' alt='learn 2' style={{ width: '100%', maxHeight: '550px' }} />
					{/*
					<Typography variant='subtitle2' color='#25468A' className='md:text-[22px] text-[18px] leading-7 mb-7'>
						At iom, we believe that a tomorrow, built on a strong, healthy, and prepared today, can only be good. When we build ourselves
						to be better, happier, and more capable, we build our families, societies, the nation, and thus the world. We are able to give
						our best to whatever we do, achieve more, and be more.
					</Typography>
					*/}
					<Typography color='#424242' fontSize={16} sx={{ mb: '50px', pt: '50px', textAlign: 'left' }}>
						At Iom, we believe that a tomorrow, built on a strong, healthy, and prepared today, can only be good. When we build ourselves to be better, happier, and more capable, we build our families, societies, the nation, and thus the world. We are able to give our best to whatever we do, achieve more, and be more. 
					<br />
					<br />
						By forging futuristic technologies with ancient knowledge, and merging new insights with existing expertise, we hope to make your well-being a routine. As self-addressed, mundane as in-the-ordinary as brushing your teeth; weaving health into lifestyles effortlessly. Thus, to address it accordingly, we are creating systems and work cultures that understand this dichotomy. To move seamlessly, and rapidly across technologies, advancements, new discoveries, and new understandings of existing knowledge.
					</Typography>
				</Container>
			</div>
			{/*
			<div className='background-blend before:background-pink-light pb-20 md:pt-16 pt-8'>
				<Container sx={{ textAlign: 'center' }}>
					<Typography variant='h3' color='text.darkBlue' className='md:text-7xl text-5xl mb-7 font-bold'>
						Why Gut Microbiome?
					</Typography>
					<Typography variant='subtitle2' color='#25468A' className='md:text-[22px] text-[18px] leading-7 mb-7'>
						These microbes are on our skin, in our mouth, and in the genitalia, but it’s the gut that is the most significant. In terms of
						mere presence and abundance, the configuration has a far-reaching impact on us in ways that we never imagined. Now called the
						second brain, the nearly 100 trillion microbes in the gut, representing almost 5000 species, can weigh up to 2 kgs!
					</Typography>
					<img src='/assets/play.png' alt='youtube video' style={{ width: '100%', maxHeight: '550px' }} />
					<Typography color='#424242' fontSize={16} sx={{ mb: '50px', pt: '50px', textAlign: 'left' }}>
						However, what exactly do they do? Apart from making music? From harvesting energy from the food we eat to our immune functions
						to manufacturing hormones-mood (serotonin), stress levels (cortisol), thyroid, sleep, (melatonin), and even vitamins the Gut
						microbiome is, in essence, the nerve center of a host of vital activity.
						<br />
						<br />
						Scientific literature states that the gut, considered a virtual endocrine gland, is responsible for various metabolic and
						nervous disorders, including diabetes, obesity or even Alzheimers and others that have been associated with imbalances in the
						gut. The micro and organisms that are not in sync with you, not in harmony with you, won’t allow your body to make beautiful
						music.
					</Typography>
				</Container>
			</div>
                       */}
			<div style={{ background: '#133373' }}>
				<Container sx={{ pt: '70px', pb: '70px', textAlign: 'center' }}>
					<Typography className='md:text-5xl text-3xl text-white font-bold mb-2'>Do you have questions?</Typography>
					<p className='text-white text-base mb-7'>Write to us or get in touch with the Iom team using the contact form given below.</p>
					<Button color='darkYellow' variant='contained' size='small' component={Link} to='/contact'>
						<Typography variant='subtitle2' fontWeight='bold'>
							Get in touch
						</Typography>
					</Button>
				</Container>
			</div>
		</div>
	);
}
