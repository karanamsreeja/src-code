import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Page404 = lazy(() => import(/* webpackChunkName: "404" */ 'pages/404'));

// layouts
const ClinicalPartnersLayout = lazy(() => import(/* webpackChunkName: "cp-layout" */ 'layout/clinicalPartners'));
const LoginLayout = lazy(() => import(/* webpackChunkName: "cp-login-layout" */ 'layout/clinicalPartners/login'));
const AccountLayout = lazy(() => import(/* webpackChunkName: "cp-account-layout" */ 'layout/clinicalPartners/account'));

// clinicalPartners
const ClinicalPartnersLogin = lazy(() => import(/* webpackChunkName: "cp-login" */ 'pages/clinicalPartners/login'));
const ClinicalPartnersHome = lazy(() => import(/* webpackChunkName: "cp-home" */ 'pages/clinicalPartners/home'));

// clinicalPartners Kit Orders
const SamplesReceived = lazy(() => import(/* webpackChunkName: "cp-received" */ 'pages/clinicalPartners/samples/received'));
const SamplesActive = lazy(() => import(/* webpackChunkName: "cp-active" */ 'pages/clinicalPartners/samples/active'));
const SamplesActiveDetails = lazy(() => import(/* webpackChunkName: "cp-active-id" */ 'pages/clinicalPartners/samples/active/details'));
const SamplesCompleted = lazy(() => import(/* webpackChunkName: "cp-completed" */ 'pages/clinicalPartners/samples/completed'));
const SamplesCompletedDetails = lazy(() => import(/* webpackChunkName: "cp-completed-id" */ 'pages/clinicalPartners/samples/completed/details'));
const SamplesRejected = lazy(() => import(/* webpackChunkName: "cp-rejected" */ 'pages/clinicalPartners/samples/rejected'));
const SamplesRejectedDetails = lazy(() => import(/* webpackChunkName: "cp-rejected-id" */ 'pages/clinicalPartners/samples/rejected/details'));

// ClinicalPartners account
const AccountHome = lazy(() => import(/* webpackChunkName: "cp-account" */ 'pages/clinicalPartners/account'));

const WebRoutes = () => {
	return (
		<Suspense fallback={<div className='loading' />}>
			<Routes>
				<Route path='login' element={<LoginLayout />}>
					<Route index element={<ClinicalPartnersLogin />} />
				</Route>

				<Route
					path='account/*'
					element={
						<AccountLayout>
							<AccountHome />
						</AccountLayout>
					}
				/>

				<Route path='*' element={<ClinicalPartnersLayout />}>
					<Route index element={<ClinicalPartnersHome />} />

					<Route path='samples/received' element={<SamplesReceived />} />
					<Route path='samples/active' element={<SamplesActive />} />
					<Route path='samples/active/:id' element={<SamplesActiveDetails />} />
					<Route path='samples/completed' element={<SamplesCompleted />} />
					<Route path='samples/completed/:id' element={<SamplesCompletedDetails />} />
					<Route path='samples/rejected' element={<SamplesRejected />} />
					<Route path='samples/rejected/:id' element={<SamplesRejectedDetails />} />

					<Route path='*' element={<Page404 />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default WebRoutes;
