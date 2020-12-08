export const roundToNDecimals = (value: number, n: number) => {
	// eslint-disable-next-line
	// @ts-ignore
	return +(Math.round(value + `e+${n}`) + `e-${n}`);
};
