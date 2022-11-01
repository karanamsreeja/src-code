import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const LoadingScreenComponent = ({ message }) => {
	return (
		<Backdrop style={{ zIndex: 9999, color: '#fff' }} open>
			<CircularProgress color='inherit' />
			<br />
			<br />
			<h1>&nbsp;&nbsp;{message}</h1>
		</Backdrop>
	);
};

export default LoadingScreenComponent;
