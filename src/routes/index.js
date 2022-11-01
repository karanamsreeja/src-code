import React, { lazy, Suspense } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

import SiteLayout from 'layout/SiteLayout';
const SimpleSiteLayout = lazy(() => import(/* webpackChunkName: "site-layout" */ 'layout/site/SimpleLayout'));

// user rotes
const UserRoutes = lazy(() => import(/* webpackChunkName: "user" */ './user'));
const LogisticsRoutes = lazy(() => import(/* webpackChunkName: "logistics" */ './logistics'));
const ClinicalPartnersRoutes = lazy(() => import(/* webpackChunkName: "clinicalPartners" */ './clinicalPartners'));
const AiTeamRoutes = lazy(() => import(/* webpackChunkName: "aITeam" */ './aITeam'));
const WarehouseRoutes = lazy(() => import(/* webpackChunkName: "warehouse" */ './warehouse'));
const SuperAdminRoutes = lazy(() => import(/* webpackChunkName: "super-admin" */ './admin'));

const Page404 = lazy(() => import(/* webpackChunkName: "404" */ 'pages/404'));
const ComingSoon = lazy(() => import(/* webpackChunkName: "coming-soon" */ 'pages/coming-soon'));

const Home = lazy(() => import(/* webpackChunkName: "site-home" */ 'pages/site/home'));
const GetStarted = lazy(() => import(/* webpackChunkName: "get-started" */ 'pages/site/getStarted'));
const SuccessStory = lazy(() => import(/* webpackChunkName: "success-story" */ 'pages/site/SuccessStory'));
const OurScience = lazy(() => import(/* webpackChunkName: "our-science" */ 'pages/site/our-science'));
const PrivacyPolicy = lazy(() => import(/* webpackChunkName: "privacy-policy" */ 'pages/site/privacy-policy'));
const TermAndConditions = lazy(() => import(/* webpackChunkName: "term-and-conditions" */ 'pages/site/term-and-conditions'));
const Faq = lazy(() => import(/* webpackChunkName: "faq" */ 'pages/site/faq'));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ 'pages/site/contact'));

const AboutUs = lazy(() => import(/* webpackChunkName: "success-story" */ 'pages/site/aboutus'));
const AboutUsCompany = lazy(() => import(/* webpackChunkName: "success-story" */ 'pages/site/aboutus/company'));
// const Team = lazy(() => import(/* webpackChunkName: "success-story" */ 'pages/site/aboutus/team'));
const Experts = lazy(() => import(/* webpackChunkName: "success-story" */ 'pages/site/aboutus/experts'));

// carts
const CartPatientDetails = lazy(() => import(/* webpackChunkName: "cart-patient-details" */ 'pages/site/cart/index'));
const CartPatientInformation = lazy(() => import(/* webpackChunkName: "cart-patient-information" */ 'pages/site/cart/information'));
const CartPatientPayment = lazy(() => import(/* webpackChunkName: "cart-patient-payment" */ 'pages/site/cart/payment'));

// learn
const LearnIndex = lazy(() => import(/* webpackChunkName: "learn" */ 'pages/site/learn/index'));

const SiteRoutes = () => {
	return (
		<Suspense fallback={<div className='loading' />}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='coming-soon' element={<ComingSoon />} />
				<Route path='get-started' element={<GetStarted />} />
				{/*<Route path='success-story' element={<SuccessStory />} />*/}
                                <Route path='success-story' element={<ComingSoon />} />
				<Route path='our-science' element={<OurScience />} />

				{/*<Route path='privacy-policy' element={<PrivacyPolicy />} />*/}
                                <Route path='privacy-policy' element={<ComingSoon />} />
				{/*<Route path='term-and-conditions' element={<TermAndConditions />} />*/}
                                <Route path='term-and-conditions' element={<ComingSoon />} />
				<Route path='faq' element={<Faq />} />
				<Route path='contact' element={<Contact />} />

				<Route path='about-us' element={<Outlet />}>
					<Route index element={<AboutUs />} />
					<Route path='company' element={<AboutUsCompany />} />
					<Route path='team' element={<AboutUs />} />
					{/*<Route path='experts' element={<Experts />} />*/}
                                        <Route path='experts' element={<ComingSoon />} />

				</Route>

				<Route path='user/*' element={<UserRoutes />} />
				<Route path='logistics/*' element={<LogisticsRoutes />} />
				<Route path='clinical-partners/*' element={<ClinicalPartnersRoutes />} />
				<Route path='ai-team/*' element={<AiTeamRoutes />} />
				<Route path='warehouse/*' element={<WarehouseRoutes />} />
				<Route path='admin/*' element={<SuperAdminRoutes />} />

				<Route path='site' element={<Outlet />}>
					<Route path='cart' element={<SiteLayout />}>
						<Route index element={<CartPatientDetails />} />
						<Route path='information' element={<CartPatientInformation />} />
						<Route path='payment' element={<CartPatientPayment />} />
					</Route>
				</Route>

				<Route path='learn' element={<SimpleSiteLayout />}>
					<Route index element={<LearnIndex />} />
				</Route>

				<Route path='*' element={<Page404 />} />
			</Routes>
		</Suspense>
	);
};

export default SiteRoutes;
