import TableCell from '@mui/material/TableCell';

import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
	},
}));

export default function CustomTableCell({ children, className, sx = {}, ...props }) {
	const classes = useStyles();

	const combinedClassNames = classNames(classes.root, className);
	const combinedsx = { p: '19px 27px', ...sx };

	return (
		<TableCell align='right' sx={combinedsx} className={combinedClassNames} {...props}>
			<div className='lineLeft' />
			{children}
		</TableCell>
	);
}
