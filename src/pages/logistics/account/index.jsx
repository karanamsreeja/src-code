import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from 'components/Box';
import AccountDetails from './accountDetails';
import SecurityDetails from './security';
import { Link, Routes, useLocation } from 'react-router-dom';
import { Route } from 'react-router-dom';

function Home() {
	const location = useLocation();
	const [activeTab, setactiveTab] = useState(location.pathname.split('/').pop());

	useEffect(() => {
		setactiveTab(location.pathname.split('/').pop());
	}, [location.pathname]);

	return (
		<>
			<Typography variant='subtitle1' fontWeight={500} color='text.Blue600' sx={{ mb: '18px' }}>
				<Link to='/logistics'>
					<img src='/assets/icons/Larrow.svg' alt='Larrow' style={{ transform: 'translateY(25%)', marginRight: '5px' }} />
				</Link>
				Back to Dashboard
			</Typography>
			<Box sx={{ p: '34px 33px 39px 30px' }}>
				<Typography variant='h5' fontWeight='bold' color='#212121' sx={{ mb: '24px' }}>
					Account Settings
				</Typography>
				<Tabs value={activeTab} aria-label='tabs' sx={{ mb: '30px' }}>
					<Tab
						value='account'
						component={Link}
						to='/logistics/account'
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
						value='security'
						component={Link}
						to='/logistics/account/security'
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

				<div role='tabpanel' aria-labelledby={`full-width-tab-${activeTab}`} style={{ maxWidth: '100vw', position: 'relative' }}>
					<Routes>
						<Route index element={<AccountDetails />} />
						<Route path='security' element={<SecurityDetails />} />
					</Routes>
				</div>
			</Box>
		</>
	);
}

export default Home;
