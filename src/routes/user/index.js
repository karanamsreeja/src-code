import React, { lazy, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const Page404 = lazy(() => import(/* webpackChunkName: "404" */ 'pages/404'));

// layouts
const ReportLayout = lazy(() => import(/* webpackChunkName: "report" */ 'layout/user/report'));
const LoginRegisterLayout = lazy(() => import(/* webpackChunkName: "report" */ 'layout/user/login'));
const DashboardLayout = lazy(() => import(/* webpackChunkName: "dashboard-layout" */ 'layout/user/dashboard'));
const AccountLayout = lazy(() => import(/* webpackChunkName: "account-layout" */ 'layout/user/account'));

// account
const AccountHome = lazy(() => import(/* webpackChunkName: "account-home" */ 'pages/user/account/home'));
const AccountMemberList = lazy(() => import(/* webpackChunkName: "account-memberlist" */ 'pages/user/account/member'));
const AddEditViewMember = lazy(() => import(/* webpackChunkName: "account-member-addeditview" */ 'pages/user/account/member/addEditViewMember'));
const AccountAddressList = lazy(() => import(/* webpackChunkName: "account-addresslist" */ 'pages/user/account/address'));
const AddEditViewAddress = lazy(() => import(/* webpackChunkName: "account-address-addeditview" */ 'pages/user/account/address/addEditViewAddress'));
const AccountOrderList = lazy(() => import(/* webpackChunkName: "account-orderlist" */ 'pages/user/account/orders'));
const AccountOrderDetails = lazy(() => import(/* webpackChunkName: "account-order-details" */ 'pages/user/account/orders/routeOrderDetailsWrapper'));
const AccountPickupDetails = lazy(() =>
	import(/* webpackChunkName: "account-pickup-details" */ 'pages/user/account/orders/routePickupDetailsWrapper')
);

// dashboard
const DashboardHome = lazy(() => import(/* webpackChunkName: "dashboard-home" */ 'pages/user/dashboard'));
const SchedulePickup = lazy(() => import(/* webpackChunkName: "dashboard-schedule-pickup" */ 'pages/user/dashboard/schedulePickup'));
const RegisterKit = lazy(() => import(/* webpackChunkName: "dashboard-register-kit" */ 'pages/user/dashboard/registerKit'));
const PreviewRegisterKit = lazy(() =>
	import(/* webpackChunkName: "dashboard-register-kit-preview" */ 'pages/user/dashboard/register/[kitId]/preview')
);
const SelectKit = lazy(() => import(/* webpackChunkName: "dashboard-select-kit" */ 'pages/user/dashboard/register/select'));
const RegisterKitDetails = lazy(() => import(/* webpackChunkName: "dashboard-select-kit-details" */ 'pages/user/dashboard/register/[kitId]'));
const RegisterKitFamilyDetails = lazy(() =>
	import(/* webpackChunkName: "dashboard-select-kit-family" */ 'pages/user/dashboard/register/[kitId]/familyHistory')
);
const RegisterKitLifestyleDetails = lazy(() =>
	import(/* webpackChunkName: "dashboard-select-kit-lifestyle" */ 'pages/user/dashboard/register/[kitId]/lifestyle')
);
const RegisterKitStateOfMindDetails = lazy(() =>
	import(/* webpackChunkName: "dashboard-select-kit-stateOfMind" */ 'pages/user/dashboard/register/[kitId]/stateOfMind')
);
const RegisterKitBodyConstitutionDetails = lazy(() =>
	import(/* webpackChunkName: "dashboard-select-kit-bodyConstitution" */ 'pages/user/dashboard/register/[kitId]/bodyConstitution')
);

// reports
const ReportIndex = lazy(() => import(/* webpackChunkName: "report" */ 'pages/user/report'));

// login-register related pages
const Login = lazy(() => import(/* webpackChunkName: "login" */ 'pages/user/Login'));
const LoginCheck = lazy(() => import(/* webpackChunkName: "login-check" */ 'pages/user/LoginCheck'));
const Register = lazy(() => import(/* webpackChunkName: "register" */ 'pages/user/Register'));
const OtpVerify = lazy(() => import(/* webpackChunkName: "otp-verify" */ 'pages/user/OtpVerify'));

const WebRoutes = () => {
	return (
		<Suspense fallback={<div className='loading' />}>
			<Routes>
				<Route path='dashboard' element={<DashboardLayout />}>
					<Route index element={<DashboardHome />} />
					<Route path='schedule-pickup/:id' element={<SchedulePickup />} />
					<Route path='schedule-pickup/:id/register' element={<RegisterKit />} />
					<Route path='schedule-pickup/:id/preview' element={<PreviewRegisterKit />} />
					<Route path='schedule-pickup/:id/register/select' element={<SelectKit />} />
					<Route path='schedule-pickup/:id/register/select/:kitId' element={<RegisterKitDetails />} />
					<Route path='schedule-pickup/:id/register/select/:kitId/family' element={<RegisterKitFamilyDetails />} />
					<Route path='schedule-pickup/:id/register/select/:kitId/lifestyle' element={<RegisterKitLifestyleDetails />} />
					<Route path='schedule-pickup/:id/register/select/:kitId/state-of-mind' element={<RegisterKitStateOfMindDetails />} />
					<Route path='schedule-pickup/:id/register/select/:kitId/body-constitution' element={<RegisterKitBodyConstitutionDetails />} />
				</Route>

				<Route path='report' element={<DashboardLayout />}>
					<Route index element={<ReportIndex />} />
				</Route>

				<Route path='account' element={<AccountLayout />}>
					<Route index element={<AccountHome />} />
					<Route path='member' element={<Outlet />}>
						<Route index element={<AccountMemberList />} />
						<Route path='add' element={<AddEditViewMember />} />
						<Route path='edit/:id' element={<AddEditViewMember />} />
					</Route>
					<Route path='address' element={<Outlet />}>
						<Route index element={<AccountAddressList />} />
						<Route path='add' element={<AddEditViewAddress />} />
						<Route path='edit/:id' element={<AddEditViewAddress />} />
					</Route>
					<Route path='order' element={<Outlet />}>
						<Route index element={<AccountOrderList />} />
						<Route path=':id' element={<AccountOrderDetails />} />
						<Route path='add' element={<AddEditViewAddress />} />
						<Route path='viewOrEdit' element={<AddEditViewAddress />} />
					</Route>
					<Route path='pickup' element={<Outlet />}>
						<Route path=':id' element={<AccountPickupDetails />} />
					</Route>
				</Route>

				<Route path='/' element={<LoginRegisterLayout />}>
					<Route path='login' element={<Login />} />
					<Route path='check' element={<LoginCheck />} />
					<Route path='register' element={<Register />} />
					<Route path='verify-otp' element={<OtpVerify />} />
				</Route>

				<Route path='*' element={<Page404 />} />
			</Routes>
		</Suspense>
	);
};

export default WebRoutes;
