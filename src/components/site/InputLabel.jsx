import Typography from '@mui/material/Typography';
const InputLabel = ({ title, ...props }) => (
	<Typography variant='subtitle2' color='text.darkBlue' fontWeight='bold' {...props}>
		{title}
	</Typography>
);

export default InputLabel;
