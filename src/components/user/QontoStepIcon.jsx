import { styled } from '@mui/material/styles';

const QontoStepIconRoot = styled('div')(() => ({
	display: 'flex',
	height: 22,
	alignItems: 'center',
}));

function QontoStepIcon({ completed, className }) {
	return (
		<QontoStepIconRoot className={className}>
			{completed ? (
				<img src='/assets/icons/stepper-active-right.svg' alt='stepper-active-right' />
			) : (
				<img src='/assets/icons/circle.svg' alt='circle' />
			)}
		</QontoStepIconRoot>
	);
}
export default QontoStepIcon;
