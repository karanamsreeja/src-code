import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';
import { connect } from 'react-redux';
import { authActions } from 'store/action/authAction';

import { useNavigate } from 'react-router-dom';

function LoginCheck({ setAuth }) {
	const [state, setstate] = useState({});
	const [apicall, setapicall] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const checkLogin = async () => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_BASEURL}/auth/login/success`);
				if (res.status === 200) {
					let permissions = {};

					// calculate user permissions and add next page redirect url
					// redirect function take place in parent layout component based on redirect url
					if (res.data?.user.role === 'client') {
						permissions.user = true;
						permissions.redirectUrl = '/user/dashboard';
					}
					if (res.data?.user.role === 'admin') {
						permissions.admin = true;
					}

					setAuth({
						loading: false,
						login: true,
						email: res.data?.user.email,
						fullname: res.data?.user.fullname,
						...permissions,
					});
					setstate({
						login: true,
						email: res.data?.user.email,
						fullname: res.data?.user.fullname,
						is_active: res.data?.user.is_active,
						...permissions,
					});
				} else {
					navigate('/user/login', { replace: true });
				}
			} catch (error) {}
		};

		if (apicall) return;
		setapicall(true);
		checkLogin();
	}, [setAuth, navigate, apicall]);

	return (
		<Container sx={{ flex: 1, mb: '16px' }} className='center'>
			<Grid container justifyContent='center' alignItems='center'>
				<Grid item>
					{state?.login ? (
						<p>{'You are already logged in as ' + state.fullname}. Please Logout before login with other credential.</p>
					) : (
						<CircularProgress />
					)}
				</Grid>
			</Grid>
		</Container>
	);
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};
const mapDispatchToProps = (dispatch) => {
	return {
		setAuth: (payload) => dispatch(authActions.set(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCheck);
