import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';

/**
 *
 * @param {String} label
 * @param {any} mui TextField props
 * @returns
 */
const CustomSelect = ({ label, labelProps, children, ...props }) => {
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
				<Select fullWidth variant='outlined' {...props}>
					{children}
				</Select>
			</Grid>
		</Grid>
	);
};

CustomSelect.prototype = {
	label: PropTypes.string,
	labelProps: PropTypes.instanceOf(Typography),
};
CustomSelect.defaultProps = {
	label: '',
	labelProps: {},
};

export default CustomSelect;
