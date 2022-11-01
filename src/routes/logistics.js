import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Page404 = lazy(() => import(/* webpackChunkName: "404" */ 'pages/404'));

// layouts
const LogisticsLayout = lazy(() => import(/* webpackChunkName: "Logistics-layout" */ 'layout/logistics'));
const LoginLayout = lazy(() => import(/* webpackChunkName: "Logistics-login-layout" */ 'layout/logistics/login'));
const AccountLayout = lazy(() => import(/* webpackChunkName: "Logistics-account-layout" */ 'layout/logistics/account'));

// logistics
const LogisticsLogin = lazy(() => import(/* webpackChunkName: "Logistics-login" */ 'pages/logistics/login'));
const LogisticsHome = lazy(() => import(/* webpackChunkName: "Logistics-home" */ 'pages/logistics/home'));

// logistics Kit Orders
const KitPickupRequests = lazy(() => import(/* webpackChunkName: "logis-kitpickup-req" */ 'pages/logistics/orders/pickupRequests'));
const MyKitPickup = lazy(() => import(/* webpackChunkName: "logis-kit-my-pickup" */ 'pages/logistics/orders/myPickup'));
const MyKitPickupDetails = lazy(() => import(/* webpackChunkName: "logis-kit-my-pickup" */ 'pages/logistics/orders/myPickup/orderDetails'));
const KitDeliveriesInProgress = lazy(() => import(/* webpackChunkName: "logis-kit-deliver-in-prog" */ 'pages/logistics/orders/deliveriesInProgress'));
const KitDeliveriesInProgressDetails = lazy(() =>
	import(/* webpackChunkName: "logis-kit-deliver-in-prog" */ 'pages/logistics/orders/deliveriesInProgress/orderDetails')
);
const AllKitDeliveredOrders = lazy(() => import(/* webpackChunkName: "logis-kit-deliveredlist" */ 'pages/logistics/orders/allDeliveredOrders'));
const AllKitDeliveredOrdersDetails = lazy(() =>
	import(/* webpackChunkName: "logis-kit-deliveredlist" */ 'pages/logistics/orders/allDeliveredOrders/orderDetails')
);

// logistics Sample Pickups
const SamplePickupRequests = lazy(() => import(/* webpackChunkName: "logis-smaplelist" */ 'pages/logistics/pickups/pickupRequests'));
const MySamplePickup = lazy(() => import(/* webpackChunkName: "logis-smaple-pickup" */ 'pages/logistics/pickups/myPickup'));
const MySamplePickupDetails = lazy(() => import(/* webpackChunkName: "logis-smaple-pickup" */ 'pages/logistics/pickups/myPickup/orderDetails'));
const SampleDeliveriesInProgress = lazy(() => import(/* webpackChunkName: "logis-s-delivering" */ 'pages/logistics/pickups/deliveriesInProgress'));
const SampleDeliveriesInProgressDetails = lazy(() =>
	import(/* webpackChunkName: "logis-s-delivering" */ 'pages/logistics/pickups/deliveriesInProgress/orderDetails')
);
const AllSampleDeliveredOrders = lazy(() => import(/* webpackChunkName: "logis-s-deliveredlist" */ 'pages/logistics/pickups/allDeliveredOrders'));
const AllSampleDeliveredOrdersDetails = lazy(() =>
	import(/* webpackChunkName: "logis-s-deliveredlist" */ 'pages/logistics/pickups/allDeliveredOrders/orderDetails')
);

// Logistics account
const AccountHome = lazy(() => import(/* webpackChunkName: "Logistics-account" */ 'pages/logistics/account'));

const WebRoutes = () => {
	return (
		<Suspense fallback={<div className='loading' />}>
			<Routes>
				<Route path='login' element={<LoginLayout />}>
					<Route index element={<LogisticsLogin />} />
				</Route>

				<Route
					path='account/*'
					element={
						<AccountLayout>
							<AccountHome />
						</AccountLayout>
					}
				/>

				<Route path='*' element={<LogisticsLayout />}>
					<Route index element={<LogisticsHome />} />

					<Route path='orders/pickup-requests' element={<KitPickupRequests />} />
					<Route path='orders/my-pickup' element={<MyKitPickup />} />
					<Route path='orders/my-pickup/:id' element={<MyKitPickupDetails />} />
					<Route path='orders/deliveries-in-progress' element={<KitDeliveriesInProgress />} />
					<Route path='orders/deliveries-in-progress/:id' element={<KitDeliveriesInProgressDetails />} />
					<Route path='orders/all-delivered-orders' element={<AllKitDeliveredOrders />} />
					<Route path='orders/all-delivered-orders/:id' element={<AllKitDeliveredOrdersDetails />} />

					<Route path='pickups/pickup-requests' element={<SamplePickupRequests />} />
					<Route path='pickups/my-pickup' element={<MySamplePickup />} />
					<Route path='pickups/my-pickup/:id' element={<MySamplePickupDetails />} />
					<Route path='pickups/deliveries-in-progress' element={<SampleDeliveriesInProgress />} />
					<Route path='pickups/deliveries-in-progress/:id' element={<SampleDeliveriesInProgressDetails />} />
					<Route path='pickups/all-delivered-orders' element={<AllSampleDeliveredOrders />} />
					<Route path='pickups/all-delivered-orders/:id' element={<AllSampleDeliveredOrdersDetails />} />

					<Route path='*' element={<Page404 />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default WebRoutes;
