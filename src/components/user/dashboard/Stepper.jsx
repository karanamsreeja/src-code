import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 12,
		left: 'calc(-50% )',
		right: 'calc(50% )',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: 'rgb(218,133,41)',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: 'rgb(218,133,41)',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor: 'rgba(228,192,69,0.6)',
		borderRadius: 1,
	},
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState, size }) => ({
	backgroundColor: '#E4C045',
	zIndex: 1,
	color: '#fff',
	width: ownerState.size,
	height: ownerState.size,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	...(ownerState.active && {
		backgroundColor: '#DA8529',
	}),
	...(ownerState.completed && {
		backgroundColor: '#DA8529',
	}),
}));

function ColorlibStepIcon1({ active, completed, className }) {
	return (
		<ColorlibStepIconRoot ownerState={{ completed, active, size: '24px' }} className={className}>
			{active && <img src='/assets/icons/stepper-active.svg' alt='stepper-active' />}
			{completed && <img src='/assets/icons/stepper-complete.svg' alt='stepper-complete' />}
		</ColorlibStepIconRoot>
	);
}
function ColorlibStepIcon2({ active, completed, className }) {
	return (
		<ColorlibStepIconRoot
			ownerState={{ completed, active, size: '10px' }}
			style={{ transform: 'translateY(80%)' }}
			className={className}
		></ColorlibStepIconRoot>
	);
}
function ColorlibStepIcon3({ active, completed, className }) {
	const incompleted = !completed && !active;

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active, size: '24px' }} className={className}>
			{active && <img src='/assets/icons/stepper-active.svg' alt='stepper-active' />}
			{incompleted && <img src='/assets/icons/stepper-incomplete.svg' alt='stepper-incomplete' />}
		</ColorlibStepIconRoot>
	);
}

export default function CustomizedSteppers({ totalStep, step }) {
	if (totalStep === 4) {
		return (
			<Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
				<Step>
					<StepLabel StepIconComponent={ColorlibStepIcon1}></StepLabel>
				</Step>
				<Step>
					<StepLabel StepIconComponent={ColorlibStepIcon2}></StepLabel>
				</Step>
				<Step>
					<StepLabel StepIconComponent={ColorlibStepIcon2}></StepLabel>
				</Step>
				<Step>
					<StepLabel StepIconComponent={ColorlibStepIcon3}></StepLabel>
				</Step>
			</Stepper>
		);
	}

	return (
		<Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
			<Step>
				<StepLabel StepIconComponent={ColorlibStepIcon1}></StepLabel>
			</Step>
			<Step>
				<StepLabel StepIconComponent={ColorlibStepIcon2}></StepLabel>
			</Step>
			<Step>
				<StepLabel StepIconComponent={ColorlibStepIcon3}></StepLabel>
			</Step>
		</Stepper>
	);
}
