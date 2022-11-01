import TableHead from '@mui/material/TableHead';
import classnames from 'classnames';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: '12px',
		'& th:first-child': {
			borderTopLeftRadius: '4px',
		},
		'& th:last-child': {
			borderTopRightRadius: '4px',
		},
		'& th': {
			background: theme.palette.Blue600.main,
			color: 'white',
			padding: '19px 27px',
			fontWeight: 'bold',
			fontSize: '12px',
			lineHeight: '20px',
			textTransform: 'uppercase',
		},
	},
}));

export default function CustomTableHead({ children, className, ...props }) {
	const classes = useStyles();

	const combinedClassNames = classnames(classes.root, className);

	return (
		<TableHead className={combinedClassNames} {...props}>
			{children}
		</TableHead>
	);
}
