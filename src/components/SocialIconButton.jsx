import React from 'react';
import propTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function IconLabelButtons({ style, icon, label, ...props }) {
	const combineStyle = { borderRadius: '44px', ...style };

	return (
		<Button variant='outlined' startIcon={icon} size='large' style={combineStyle} {...props}>
			<Typography>{label}</Typography>
		</Button>
	);
}

IconLabelButtons.propTypes = {
	label: propTypes.oneOfType([propTypes.string.isRequired, propTypes.object.isRequired]),
	icon: propTypes.object.isRequired,
};

IconLabelButtons.defaultProps = {
	style: {},
};
