import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { PrescribedMedicine } from 'pages/api';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { stylesWithTheme } from 'utils';

export interface TitleStockProps {
	medicines: PrescribedMedicine[];
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	subTitle: {
		textTransform: 'none',
		paddingBottom: '20px',
		fontSize: '13px',
		lineHeight: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			lineHeight: '25px',
			paddingBottom: '30px',
			width: '575px',
			fontWeight: 400,
		},
	},
}));

const TitleStock = ({ medicines }: TitleStockProps): ReactElement => {
	const { t } = useTranslation('buyPrescription');
	const [outOfStock, setOutOfStock] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		const outOfStock =
			medicines.filter((medicine: PrescribedMedicine) => {
				const { hasStock, isAvailableForECommerce } = medicine;
				return hasStock && isAvailableForECommerce;
			}).length < 1;
		setOutOfStock(outOfStock);
	}, [medicines]);

	return (
		<Typography className={classes.subTitle}>
			{t(outOfStock ? 'buyPrescription.subTitle.outOfStock' : 'buyPrescription.subTitle')}
		</Typography>
	);
};

export default TitleStock;
