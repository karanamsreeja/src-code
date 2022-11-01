import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './utilites.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';

import { Provider as ReduxProvider } from 'react-redux';
import initialReduxState from './inititalReduxState';
import configureStore from 'store/configureStore';

import axios from 'axios';
import cookieInterceptor from 'helpers/cookie-interceptor';
import errorInterceptor from 'helpers/error-interceptor';
import { SnackbarUtilsConfigurator } from 'helpers/notification';

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;
cookieInterceptor();
errorInterceptor();

export const reduxStore = configureStore(initialReduxState);

const theme = createTheme({
	palette: {
		light: {
			main: 'white',
			contrastText: '#06225C',
		},
		lightBlue: {
			main: '#4E66A1',
			contrastText: 'white',
		},
		Blue600: {
			main: '#25468A',
			contrastText: 'white',
		},
		darkBlue: {
			main: '#06225C',
			contrastText: 'white',
		},
		lightYellow: {
			main: '#E4C045',
			contrastText: 'white',
		},
		darkYellow: {
			main: '#E1AB3B',
			contrastText: 'white',
		},
		darkerYellow: {
			main: '#DA8529',
			contrastText: 'white',
		},
		darkerRed: {
			main: '#BF0000',
			contrastText: 'white',
		},
		lightRed: {
			main: '#FFDFDF',
			contrastText: '#FF0000',
		},
		lightGreen: {
			main: '#689F38',
			contrastText: 'white',
		},
		darkGreen: {
			main: '#33691E',
			contrastText: 'white',
		},
		grey: {
			main: '#757575',
			contrastText: 'white',
		},
		text: {
			grey: '#757575',
			greyLightText: '#616161',
			greyLight: '#6D81B0',
			greyDark: '#212121',
			darkGreen: '#33691E',
			lightBlue: '#4E66A1',
			darkBlue: '#06225C',
			Blue600: '#25468A',
			lightYellow: '#E4C045',
			darkYellow: '#E1AB3B',
			darkerYellow: '#DA8529',
		},
		background: {
			grey: '#757575',
			darkGreen: '#33691E',
			lightBlue: '#4E66A1',
			darkBlue: '#06225C',
			lightYellow: '#E4C045',
			darkYellow: '#E1AB3B',
			darkerYellow: '#DA8529',
			lightPink: '#E6E9F1',
		},
	},
	typography: {
		h5: {
			fontSize: '22px',
			lineHeight: '30px',
		},
		h4: {
			fontSize: '30px',
			lineHeight: '36px',
		},
		subtitle1: {
			lineHeight: '22px',
		},
		subtitle2: {
			lineHeight: '20px',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'initial',
					borderRadius: '30px',
					boxShadow: 'none',
				},
				sizeLarge: {
					padding: '14px 24px',
				},
				sizeMedium: {
					padding: '11px 20px',
				},
				sizeSmall: {
					padding: '10px 16px',
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				indicator: {
					background: '#25468A',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				inputSizeSmall: {
					fontSize: '14px',
					lineHeight: '20px',
				},
			},
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<ReduxProvider store={reduxStore}>
					<SnackbarProvider
						maxSnack={1}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						TransitionComponent={Slide}
					>
						<SnackbarUtilsConfigurator />
						<App />
					</SnackbarProvider>
				</ReduxProvider>
			</StyledEngineProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
