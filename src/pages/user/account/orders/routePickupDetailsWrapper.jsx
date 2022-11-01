import Box from 'components/Box';
import ViewPickupDetailsScreen from './pickupsScheduledDetails';

import { useNavigate, useParams } from 'react-router-dom';

function RoutePickupDetailsWrapper() {
	let params = useParams();
	const navigate = useNavigate();

	const handleViewOrderList = () => {
		navigate(-1);
	};

	return (
		<Box sx={{ p: '34px 33px 39px 30px', position: 'relative', minHeight: '50vh' }}>
			<ViewPickupDetailsScreen handleViewOrderList={handleViewOrderList} id={params.id} />
		</Box>
	);
}

export default RoutePickupDetailsWrapper;
