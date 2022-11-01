import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Page404 = lazy(() => import(/* webpackChunkName: "404" */ 'pages/404'));

// layouts
const WarehouseLayout = lazy(() => import(/* webpackChunkName: "Warehouse-layout" */ 'layout/warehouse'));
const LoginLayout = lazy(() => import(/* webpackChunkName: "Warehouse-login-layout" */ 'layout/warehouse/login'));
const AccountLayout = lazy(() => import(/* webpackChunkName: "Warehouse-account-layout" */ 'layout/warehouse/account'));

// warehouse
const WarehouseLogin = lazy(() => import(/* webpackChunkName: "warehouse-login" */ 'pages/warehouse/login'));
const WarehouseHome = lazy(() => import(/* webpackChunkName: "warehouse-home" */ 'pages/warehouse/home'));
const ActiveOrders = lazy(() => import(/* webpackChunkName: "warehouse-pickup-requests" */ 'pages/warehouse/activeOrders'));
const OrderDetails = lazy(() => import(/* webpackChunkName: "warehouse-pickup-details" */ 'pages/warehouse/orderDetails'));
const DispatchedOrders = lazy(() => import(/* webpackChunkName: "warehouse-dispatched-orders" */ 'pages/warehouse/dispatchedOrders'));
const DispatchedOrdersDetails = lazy(() => import(/* webpackChunkName: "warehouse-dispatch-details" */ 'pages/warehouse/dispatchedOrdersDetails'));

// warehouse account
const AccountHome = lazy(() => import(/* webpackChunkName: "warehouse-account" */ 'pages/warehouse/account/index'));

const WebRoutes = () => {
	return (
		<Suspense fallback={<div className='loading' />}>
			<Routes>
				<Route path='login' element={<LoginLayout />}>
					<Route index element={<WarehouseLogin />} />
				</Route>

				<Route
					path='account/*'
					element={
						<AccountLayout>
							<AccountHome />
						</AccountLayout>
					}
				/>

				<Route path='*' element={<WarehouseLayout />}>
					<Route index element={<WarehouseHome />} />
					<Route path='active-orders' element={<ActiveOrders />} />
					<Route path='active-orders/:id' element={<OrderDetails />} />
					<Route path='dispatched-orders' element={<DispatchedOrders />} />
					<Route path='dispatched-orders/:id' element={<DispatchedOrdersDetails />} />

					<Route path='*' element={<Page404 />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default WebRoutes;
