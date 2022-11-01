import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { checkLogin } from 'helpers/auth';

const WebRoutes = lazy(() => import(/* webpackChunkName: "site" */ 'routes'));

function App() {
	useEffect(() => {
		checkLogin();
	}, []);

	return (
		<Suspense fallback={<div className='loading'></div>}>
			<BrowserRouter>
				<WebRoutes />
			</BrowserRouter>
		</Suspense>
	);
}
export default App;
