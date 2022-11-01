import { memo, useState } from 'react';

import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from 'components/Box';
import AccountDetails from './accountDetails';
import SecurityDetails from './security';

const TabPanel = ({ activeIndex }) => {
	if (activeIndex === 0) {
		return <AccountDetails />;
	}
	if (activeIndex === 1) {
		return <SecurityDetails />;
	}
	return <></>;
};

const TabPanels = memo(({ activeIndex }) => {
	return (
		<div role='tabpanel' aria-labelledby={`full-width-tab-${activeIndex}`} style={{ maxWidth: '100vw', position: 'relative' }}>
			<TabPanel activeIndex={activeIndex} />
		</div>
	);
});

function Home() {
	const [activeTab, setactiveTab] = useState(0);

	const handleChange = (event, newValue) => {
		setactiveTab(newValue);
	};

	return (
		<Box sx={{ p: '34px 33px 39px 30px' }}>
			<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '24px' }}>
				Account Settings
			</Typography>
			<Tabs value={activeTab} onChange={handleChange} aria-label='tabs' sx={{ mb: '30px' }}>
				<Tab
					value={0}
					label={
						<Typography
							variant='subtitle1'
							fontWeight={activeTab === 0 ? 'bold' : 'normal'}
							color={activeTab === 0 ? '#25468A' : '#212121'}
							textTransform='capitalize'
						>
							Details
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
							Security
						</Typography>
					}
				/>
			</Tabs>

			<TabPanels activeIndex={activeTab} />
		</Box>
	);
}

export default Home;
