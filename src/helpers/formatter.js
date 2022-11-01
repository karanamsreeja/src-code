export function INRFormatter(currency, enableDotFormate = false) {
	const formattedCurrency = currency.toLocaleString('en-US', {
		style: 'currency',
		currency: 'INR',
	});

	if (enableDotFormate) {
		return formattedCurrency;
	} else {
		return formattedCurrency.split('.')[0];
	}
}

export function OrderDateFormatter(date, options = {}) {
	options = { year: 'numeric', month: 'numeric', day: 'numeric', ...options };
	return new Date(date).toLocaleDateString('en-IN', {
		year: options.year,
		month: options.month,
		day: options.day,
	});
}

export function OrderDateTimeFormatter(date, options = { month: '2-digit' }) {
	const d = new Date(date);
	return (
		d.toLocaleDateString('en-IN', {
			year: 'numeric',
			month: options.month,
			day: '2-digit',
		}) +
		' at ' +
		d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
	);
}

export function MemberDateFormatter(date) {
	return new Date(date).toLocaleDateString('en-IN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
