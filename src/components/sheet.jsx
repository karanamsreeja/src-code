import React from 'react';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '100%',
		borderRadius: '8px',
		border: '1px solid #E1AB3B',
		padding: '24px 10px 25px 10px',
		textAlign: 'center',
	},
}));

const Sheet = ({ children, ...props }) => {
	const classes = useStyles();

	return (
		<div className={classes.root} {...props}>
			{children}
		</div>
	);
};

export default Sheet;
