import Table from '@mui/material/Table';
import classnames from 'classnames';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		borderCollapse: 'separate',
		borderSpacing: '0 12px',
		'& td, th': {
			borderBottom: 'none',
		},
	},
}));

export default function CustomTable({ children, className, ...props }) {
	const classes = useStyles();

	const combinedClassNames = classnames(classes.root, className);

	return (
		<Table className={combinedClassNames} {...props}>
			{children}
		</Table>
	);
}
