import Box from 'components/Box';
import ViewOrederDetailsScreen from './orderDetails';

import { useNavigate, useParams } from 'react-router-dom';

function RouteOrderDetailsWrapper() {
	let params = useParams();
	const navigate = useNavigate();

	

	const handleViewOrderList = () => {
		navigate('/user/account/order');
	};

	return (
		<Box sx={{ p: '34px 33px 39px 30px', position: 'relative', minHeight: '50vh' }}>
			<ViewOrederDetailsScreen handleViewOrderList={handleViewOrderList} id={params.id} />
		</Box>
	);
}

export default RouteOrderDetailsWrapper;
