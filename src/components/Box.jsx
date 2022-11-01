import Box from '@mui/material/Box';

const style = {
	boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.14)',
	borderRadius: '4px',
	overflow: 'hidden',
	background: 'white',
};

export default function CustomBox({ children, sx, ...props }) {
	return (
		<Box sx={{ ...style, ...sx }} {...props}>
			{children}
		</Box>
	);
}

CustomBox.defaultProps = {
	sx: {},
};
