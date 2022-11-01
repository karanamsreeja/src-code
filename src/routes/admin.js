import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Page404 = lazy(() => import(/* webpackChunkName: "404" */ 'pages/404'));

// layouts
const AdminLayout = lazy(() => import(/* webpackChunkName: "admin-layout" */ 'layout/admin'));
const LoginLayout = lazy(() => import(/* webpackChunkName: "admin-login-layout" */ 'layout/admin/login'));
const AccountLayout = lazy(() => import(/* webpackChunkName: "admin-account-layout" */ 'layout/admin/account'));

// admin
const AdminLogin = lazy(() => import(/* webpackChunkName: "admin-login" */ 'pages/admin/login'));
const AdminHome = lazy(() => import(/* webpackChunkName: "admin-home" */ 'pages/admin/home'));

// admin Kit Orders
const KitStatus = lazy(() => import(/* webpackChunkName: "admin-kit" */ 'pages/admin/orders/kitStatus'));
const KitStatusDetails = lazy(() => import(/* webpackChunkName: "admin-kit-id" */ 'pages/admin/orders/kitStatus/details'));
const SampleStatus = lazy(() => import(/* webpackChunkName: "admin-sample" */ 'pages/admin/orders/sampleStatus'));
const SampleStatusDetails = lazy(() => import(/* webpackChunkName: "admin-sample-id" */ 'pages/admin/orders/sampleStatus/details'));
const SequencingStatus = lazy(() => import(/* webpackChunkName: "admin-se" */ 'pages/admin/orders/sequencingStatus'));
const SequencingStatusDetails = lazy(() => import(/* webpackChunkName: "admin-se-id" */ 'pages/admin/orders/sequencingStatus/details'));
const ProcessingStatus = lazy(() => import(/* webpackChunkName: "admin-p" */ 'pages/admin/orders/processingStatus'));
const ProcessingStatusDetails = lazy(() => import(/* webpackChunkName: "admin-p-id" */ 'pages/admin/orders/processingStatus/details'));
const CompletedOrders = lazy(() => import(/* webpackChunkName: "admin-p" */ 'pages/admin/orders/completedOrders'));
const CompletedOrdersDetails = lazy(() => import(/* webpackChunkName: "admin-p-id" */ 'pages/admin/orders/completedOrders/details'));

const CustomerList = lazy(() => import(/* webpackChunkName: "admin-c-list" */ 'pages/admin/customers'));
const TeamMembers = lazy(() => import(/* webpackChunkName: "admin-team" */ 'pages/admin/teamMember'));
const TeamMembersEdit = lazy(() => import(/* webpackChunkName: "admin-team-edit" */ 'pages/admin/teamMember/[id]'));
const Transactions = lazy(() => import(/* webpackChunkName: "admin-tr" */ 'pages/admin/transactions'));
const ActivePackages = lazy(() => import(/* webpackChunkName: "admin-ap" */ 'pages/admin/activePackages'));
const ActivePackagesEditView = lazy(() => import(/* webpackChunkName: "admin-ap" */ 'pages/admin/activePackagesEdit'));

// Admin account
const AccountHome = lazy(() => import(/* webpackChunkName: "admin-account" */ 'pages/admin/account'));

const WebRoutes = () => {
	return (
		<Suspense fallback={<div className='loading' />}>
			<Routes>
				<Route path='login' element={<LoginLayout />}>
					<Route index element={<AdminLogin />} />
				</Route>

				<Route
					path='account/*'
					element={
						<AccountLayout>
							<AccountHome />
						</AccountLayout>
					}
				/>

				<Route path='*' element={<AdminLayout />}>
					<Route index element={<AdminHome />} />

					<Route path='orders/kit-status' element={<KitStatus />} />
					<Route path='orders/kit-status/:id' element={<KitStatusDetails />} />
					<Route path='orders/sample-status' element={<SampleStatus />} />
					<Route path='orders/sample-status/:id' element={<SampleStatusDetails />} />
					<Route path='orders/sequencing-status' element={<SequencingStatus />} />
					<Route path='orders/sequencing-status/:id' element={<SequencingStatusDetails />} />
					<Route path='orders/processing-status' element={<ProcessingStatus />} />
					<Route path='orders/processing-status/:id' element={<ProcessingStatusDetails />} />
					<Route path='orders/completed-orders' element={<CompletedOrders />} />
					<Route path='orders/completed-orders/:id' element={<CompletedOrdersDetails />} />

					<Route path='customer' element={<CustomerList />} />
					<Route path='team-members' element={<TeamMembers />} />
					<Route path='team-members/:id' element={<TeamMembersEdit />} />
					<Route path='transactions' element={<Transactions />} />
					<Route path='active-packages' element={<ActivePackages />} />
					<Route path='active-packages/:id' element={<ActivePackagesEditView />} />

					<Route path='*' element={<Page404 />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default WebRoutes;
