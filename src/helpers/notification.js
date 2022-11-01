import { useSnackbar } from 'notistack';

export const VariantType = {
	default: 'default',
	error: 'error',
	success: 'success',
	warning: 'warning',
	info: 'info',
};

const InnerSnackbarUtilsConfigurator = (props) => {
	props.setUseSnackbarRef(useSnackbar());
	return null;
};

let useSnackbarRef;
const setUseSnackbarRef = (useSnackbarRefProp) => {
	useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = (props) => {
	return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef}>{props.children}</InnerSnackbarUtilsConfigurator>;
};

const Notification = {
	success(msg, options = {}) {
		this.toast(msg, { ...options, variant: VariantType.success });
	},
	warning(msg, options = {}) {
		this.toast(msg, { ...options, variant: VariantType.warning });
	},
	info(msg, options = {}) {
		this.toast(msg, { ...options, variant: VariantType.info });
	},
	error(msg, options = {}) {
		this.toast(msg, { ...options, variant: VariantType.error });
	},
	toast(msg, options = {}) {
		useSnackbarRef.enqueueSnackbar(msg, options);
	},
};

export default Notification;
