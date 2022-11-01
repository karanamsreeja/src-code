import { memo, useState } from 'react';

import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from 'components/Box';
import LoadingBoxComponent from 'components/LoadingBoxComponent';
import OrederListScreen from './orderList';
import ViewOrederDetailsScreen from './orderDetails';
import PickupsScheduledListScreen from './pickupsScheduledList';
import ViewPickupsScheduledDetailsScreen from './pickupsScheduledDetails';

import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';

const screenType = {
	list: 0,
	details: 1,
};

const TabPanel = ({ activeIndex, ...props }) => {
	if (activeIndex === 0) {
		return <OrederListScreen {...props} />;
	}
	if (activeIndex === 1) {
		return <PickupsScheduledListScreen {...props} />;
	}
	return <></>;
};

const TabPanels = memo(({ activeIndex, ...props }) => {
	return (
		<div role='tabpanel' aria-labelledby={`full-width-tab-${activeIndex}`} style={{ maxWidth: '100vw', position: 'relative' }}>
			<TabPanel activeIndex={activeIndex} {...props} />
		</div>
	);
});

function Member({ deleteAuth }) {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const [loading, setloading] = useState(null);
	// for member list
	const [activeTab, setactiveTab] = useState(0);
	const [orderList, setOrderList] = useState([]);

	const [screen, setScreen] = useState(screenType.list);
	const [viewOrderId, setviewOrderId] = useState(null);

	const handleViewOrderDetails = (id) => {
		if (!id) return;
		setviewOrderId(id);
		setScreen(screenType.details);
	};

	const handleViewOrderList = () => {
		setScreen(screenType.list);
		setviewOrderId(null);
	};

	const handleChange = (event, newValue) => {
		setactiveTab(newValue);
	};

	return (
		<Box sx={{ p: '34px 33px 39px 30px', position: 'relative', minHeight: '50vh' }}>
			{screen === screenType.list && (
				<>
					{loading && <LoadingBoxComponent message={loading.message} />}

					<Typography variant='h5' fontWeight='bold' color='#212121'>
						My Orders
					</Typography>

					<Tabs value={activeTab} onChange={handleChange} aria-label='tabs' sx={{ mt: '11px' }}>
						<Tab
							value={0}
							label={
								<Typography
									variant='subtitle1'
									fontWeight={activeTab === 0 ? 'bold' : 'normal'}
									color={activeTab === 0 ? '#25468A' : '#212121'}
									textTransform='capitalize'
								>
									Kits Orders
								</Typography>
							}
						/>
						<Tab
							value={1}
							label={
								<Typography
									variant='subtitle1'
									fontWeight={activeTab === 1 ? 'bold' : 'normal'}
									color={activeTab === 1 ? '#25468A' : '#212121'}
									textTransform='capitalize'
								>
									Pickups Scheduled
								</Typography>
							}
						/>
					</Tabs>
					<TabPanels
						activeIndex={activeTab}
						orderList={orderList}
						setOrderList={setOrderList}
						handleViewOrderDetails={handleViewOrderDetails}
					/>
				</>
			)}
			{screen === screenType.details && activeTab === 0 && (
				<ViewOrederDetailsScreen handleViewOrderList={handleViewOrderList} id={viewOrderId} />
			)}
			{screen === screenType.details && activeTab === 1 && (
				<ViewPickupsScheduledDetailsScreen handleViewOrderList={handleViewOrderList} id={viewOrderId} />
			)}
		</Box>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAuth: (redirectUrl) => dispatch(authActions.delete(redirectUrl)),
	};
};

export default connect(null, mapDispatchToProps)(Member);
