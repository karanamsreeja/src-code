import TableBody from '@mui/material/TableBody';

import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
	root: {
		'& tr': {
			background: '#F5F5F5',
			borderRadius: '6px',
			color: '#212121',
			'& td:not(:first-child) .lineLeft': {
				'&::after': {
					content: '""',
					position: 'absolute',
					left: '0',
					top: '50%',
					width: '1px',
					height: 'calc(100% - 32px)',
					transform: 'translate(50%, -50%)',
					background: '#E0E0E0',
				},
			},
		},
		'& th': {
			color: 'white',
		},
		'& td': {
			'&:first-child': {
				borderRadius: '4px 0 0 4px',
			},
			'&:last-child': {
				borderRadius: '0 4px 4px 0',
			},
		},
	},
}));

export default function CustomTableBody({ children, className, ...props }) {
	const classes = useStyles();

	const combinedClassNames = classNames(classes.root, className);

	return (
		<TableBody className={combinedClassNames} {...props}>
			{children}
		</TableBody>
	);
}
