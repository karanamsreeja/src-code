import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Page404 = lazy(() => import(/* webpackChunkName: "404" */ 'pages/404'));

// layouts
const AiTeamLayout = lazy(() => import(/* webpackChunkName: "ai-layout" */ 'layout/aiTeam'));
const LoginLayout = lazy(() => import(/* webpackChunkName: "ai-login-layout" */ 'layout/aiTeam/login'));
const AccountLayout = lazy(() => import(/* webpackChunkName: "ai-account-layout" */ 'layout/aiTeam/account'));

// aiTeam
const AiTeamLogin = lazy(() => import(/* webpackChunkName: "ai-login" */ 'pages/aiTeam/login'));
const AiTeamHome = lazy(() => import(/* webpackChunkName: "ai-home" */ 'pages/aiTeam/home'));

// aiTeam Kit Orders
const DataReceived = lazy(() => import(/* webpackChunkName: "ai-received" */ 'pages/aiTeam/data/received'));
const DataReceivedDetails = lazy(() => import(/* webpackChunkName: "ai-received-id" */ 'pages/aiTeam/data/received/details'));
const DataActive = lazy(() => import(/* webpackChunkName: "ai-active" */ 'pages/aiTeam/data/active'));
const DataActiveDetails = lazy(() => import(/* webpackChunkName: "ai-active-id" */ 'pages/aiTeam/data/active/details'));
const DataCompleted = lazy(() => import(/* webpackChunkName: "ai-completed" */ 'pages/aiTeam/data/completed'));
const DataCompletedDetails = lazy(() => import(/* webpackChunkName: "ai-completed-id" */ 'pages/aiTeam/data/completed/details'));

// AiTeam account
const AccountHome = lazy(() => import(/* webpackChunkName: "ai-account" */ 'pages/aiTeam/account'));

const WebRoutes = () => {
	return (
		<Suspense fallback={<div className='loading' />}>
			<Routes>
				<Route path='login' element={<LoginLayout />}>
					<Route index element={<AiTeamLogin />} />
				</Route>

				<Route
					path='account/*'
					element={
						<AccountLayout>
							<AccountHome />
						</AccountLayout>
					}
				/>

				<Route path='*' element={<AiTeamLayout />}>
					<Route index element={<AiTeamHome />} />

					<Route path='data/received' element={<DataReceived />} />
					<Route path='data/received/:id' element={<DataReceivedDetails />} />
					<Route path='data/active' element={<DataActive />} />
					<Route path='data/active/:id' element={<DataActiveDetails />} />
					<Route path='data/completed' element={<DataCompleted />} />
					<Route path='data/completed/:id' element={<DataCompletedDetails />} />

					<Route path='*' element={<Page404 />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default WebRoutes;
