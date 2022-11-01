import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

/**
 *
 * @param {String} label
 * @param {any} mui TextField props
 * @returns
 */
const CustomTextField = ({ label, labelProps,  ...props }) => {
	return (
		<Grid container sx={{ width: '100%' }}>
			{label && (
				<Grid item md={12} xs={12}>
					<Typography variant='body2' fontWeight='bold' component='div' color='#212121' sx={{ marginBottom: '5px' }} {...labelProps}>
						{label}
					</Typography>
				</Grid>
			)}
			<Grid item md={12} xs={12}>
				<TextField fullWidth variant='outlined' {...props} />
			</Grid>
		</Grid>
	);
};

CustomTextField.prototype = {
	label: PropTypes.string,
	labelProps: PropTypes.instanceOf(Typography),
};
CustomTextField.defaultProps = {
	label: '',
	labelProps: {},
};

export default CustomTextField;
