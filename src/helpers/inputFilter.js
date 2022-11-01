// export const filterRange = (e, maxRange = 10.0) => {
//     if (e === '') return ''
//     if (!parseFloat(e)) return '0'
//     if (parseFloat(e) < 0) return '0'
//     return String(Math.min(parseFloat(e).toFixed(2), maxRange))
// }
export const filterRange = (e, maxRange = 10.0) => {
	if (e === '') return '';

	const inputNumber = parseFloat(e);
	if (!inputNumber) return '';
	if (inputNumber < 0) return '';
	if (inputNumber === 0) return '';
	if (typeof e === 'string') {
		const t = e.split('.');
		if (t.length === 2 && t[1] === '0') {
			return String(parseFloat(Math.min(inputNumber, maxRange)).toFixed(1));
		}
	}
	return String(Math.min(inputNumber.toFixed(2), maxRange));
};

export const filterRank = (e) => {
	if (e === '') return '';

	const inputNumber = parseFloat(e);
	if (inputNumber === 0) return '';
	if (!inputNumber) return '0';
	if (inputNumber < 0) return '0';
	return String(Math.max(inputNumber, 0));
};

export const filterNumber = (e, maxRange = 6) => {
	if (e === '') return '';
	const pincode = parseInt(e);
	if (!pincode) return '';
	if (pincode < 0) return '';
	if (String(pincode).length > maxRange) return String(pincode).slice(0, 6);
	return e;
};
