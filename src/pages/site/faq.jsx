import React, { useState } from 'react';

import SiteHeader from 'components/site/Header';
import SiteFooter from 'components/site/Footer';

import 'styles/faq.css';

import Container from '@mui/material/Container';

const faqData = [
	{
		question: 'What is the gut microbiome?',
		answer: `The gut microbiome refers to bacteria, viruses and other small organisms that
        live in the region between the digestive tract (intestines, colon etc). Healthy
        adult humans typically harbour between 300-500 species of bacteria. They
        contribute to digestive functions, are part of our immune system and protect
        us from external harmful bacteria. Through these basic functions they directly
        or indirectly affect most of our physiologic functions.`,
	},

	{
		question: 'What does the microbiome have to do with health?',
		answer: `The microbiome is essential for human development, immunity and nutrition.
    These bacteria work in tandem with, and sometimes against you..
    Studies suggest that unhealthy individuals have much lower microbiome
    diversity, with an increase of bacteria associated with disease. Several
    diseases such as diabetes, rheumatoid arthritis, muscular dystrophy, multiple
    sclerosis, and fibromyalgia are associated with dysfunction in the microbiome.`,
	},
	{
		question: 'Why should I care about my gut microbiome?',
		answer: `The rapid shift from preagricultural wild foods to processed foods intrinsic to
    the modern diet did not allow for appropriate adaptation of our gut
    microbiome. Modern-diet induced dysfunction of our gut microbiota has been
    linked to pathogenic responses by the immune system, harmful
    neuroinflammation, and cognitive and psychiatric disorders.`,
	},
	{
		question: 'What affects our gut microbiome?',
		answer: `The food you eat obviously plays a role in the bacterial makeup of your gut.
    So do many other factors like the environment you grow up in, medications
    and emotional stress.`,
	},
	{
		question: 'How does the food we eat affect the gut microbiome?',
		answer: `Your gut bacteria live off whatever’s left over in your colon after your cells
    have digested all of the nutrients and amino acids from the food you eat. You
    want to feed them complex fibre, not bad, processed food. Less healthy
    dietary patterns create an environment for harmful bacteria that can be
    associated with several diseases like blood sugar, cholesterol, and
    inflammation.`,
	},
	{
		question: 'Can my gut microbiome impact my mental state?',
		answer: `The gut is a “second brain”. It produces and utilizes more than 30 classes of
    neuro-transmitters important for mood and mental state. For example,
    serotonin is a neurotransmitter involved with mood and emotion regulation,
    appetite, and digestion. More than 90% of the body’s serotonin is synthesised
    in the gut.
    Mounting evidence suggests that the gut microbiota also produce other
    neurotransmitters, such as norepinephrine, gamma-aminobutyric acid
    (GABA), histamine and acetyl-choline which play a part in mental state. Gut
    dysfunction has been linked to disorders like depression and anxiety.`,
	},
	{
		question: 'How does the amount of activity/other lifestyle factors affect our microbiome?',
		answer: `The gut microbiome composition is affected by many factors like travel, sleep,
    sunshine, exercise and stress. Each of these can affect physiological stress and alter
    gut motility, secretions and permeability. These changes in physical state negatively
    affect the composition of the gut microbiome.`,
	},
	{
		question: 'What do antibiotics do?',
		answer: `Antibiotics are prescribed to eliminate harmful gut bacteria but in effect they clear out
    both harmful and symbiotic bacteria from the gut. They can have several negative
    effects on the gut microbiota, including reduced species diversity, altered metabolic
    activity, and the selection of antibiotic-resistant organisms, which in turn can lead to
    antibiotic-associated diarrhoea and recurrent Clostridioides difficile infections.`,
	},
	{
		question: 'What are the substances I need to avoid to get the best results from my gut microbiome analysis?',
		answer: `Avoid strong medications like antibiotics and steroids, alcohol, smoking and highly
    processed foods before your test.
    The gut microbiome is sensitive to changes in diet and lifestyle so to get the best
    results from your microbiome test, do it at a time when you aren’t experiencing any
    major lifestyle changes.`,
	},
	{
		question: 'Can pregnant/menstruating women take a gut microbiome test?',
		answer: `The rise in oestrogen and progesterone during pregnancy alters gut function and
    microbiome composition progressively changing gut microbiota with each trimester of
    pregnancy.
    During menstruation oestrogen promotes the growth of certain strains of microbes,
    whilst suppressing others. The sample may be contaminated by blood and alter our
    results.
    Based on changes in the bacterial composition during these phases, we may get a
    biased sample at this time. In order to provide the most accurate result, we
    recommend waiting to take a microbiome test at these stages.`,
	},
	{
		question: 'If my gut microbiome can change based on all the above factors, won’t my test results only be relevant for a short span of time?',
		answer: `The gut microbiome is dynamic, changing over time with diet and lifestyle changes,
    and overall health changes.
    However, a recent study found that the magnitude of these changes are often small
    in most individuals. A recent study suggested that in adults greater than 70% of fecal
    bacterial species within an individual were stable over 1 year, and very few additional
    changes happen in the next 5 years.`,
	},
];

function FAQList() {
	const [open, setOpen] = useState(0);

	return (
		<>
			{faqData.map((data, index) => (
				<div className='rounded shadow-md bg-white border mb-8' key={index}>
					<button
						class='rounded flex justify-between items-center text-left p-5 w-full font-medium text-lg text-grey-dark border-gray-200 hover:bg-gray-50'
						aria-expanded='true'
						onClick={() => setOpen(index)}
					>
						<span>{data.question}</span>
						{open === index ? (
							<img src='/assets/icons/expand-less.svg' alt='expand' />
						) : (
							<img src='/assets/icons/expand-more.svg' alt='expand' />
						)}
					</button>

					{open === index && (
						<div className='p-4 md:p-6 pt-0 md:pt-0'>
							<hr className='mb-8' />
							<p className='text-base text-grey-light-text'>{data.answer}</p>
						</div>
					)}
				</div>
			))}
		</>
	);
}

export default function Faq() {
	return (
		<>
			<SiteHeader />

			<div className='common-bg mb-4'>
				<Container className='text-grey-light-text'>
					<div className='pt-20 md:pt-24 text-center mb-10 md:mb-24'>
						<div className='font-bold text-dark-blue md:text-7xl text-5xl'>FAQ’s</div>
					</div>

					<div className='center mb-10 md:mb-20'>
						<div class='relative w-full md:w-6/12'>
							<input
								type='text'
								id='voice-search'
								class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
								placeholder='Search for faqs'
							/>
							<button type='button' class='flex absolute inset-y-0 right-0 items-center pr-3'>
								<svg
									class='w-5 h-5 text-gray-500 dark:text-gray-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fill-rule='evenodd'
										d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
										clip-rule='evenodd'
									></path>
								</svg>
							</button>
						</div>
					</div>

					<FAQList />
				</Container>
			</div>

			<SiteFooter />
		</>
	);
}
