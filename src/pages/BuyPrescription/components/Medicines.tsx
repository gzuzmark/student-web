import React, { ReactElement, useMemo } from 'react';
import { PrescribedMedicine } from 'pages/api';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';

import Medicine from './Medicine';
import ElectronicPrescription from './ElectronicPrescription';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	medicines: {
		[breakpoints.up('lg')]: {
			width: '506px',
			marginRight: '57px',
		},
	},
	subTitle: {
		textTransform: 'none',
		padding: '12px 0',
		fontSize: '13px',
		lineHeight: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			lineHeight: '25px',
			padding: '19px 0 39px',
			fontWeight: 400,
		},
	},
	electronicPrescription: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
}));

export interface MedicinesProps {
	medicines: PrescribedMedicine[];
	selectedMedicines: number[];
	toggleMedicine: (index: number) => () => void;
	openEPrescription: () => void;
}

const Medicines = ({
	medicines,
	selectedMedicines,
	toggleMedicine,
	openEPrescription,
}: MedicinesProps): ReactElement => {
	const classes = useStyles();
	const { t } = useTranslation('buyPrescription');
	const availableMedicines = useMemo(
		() => medicines.filter(({ hasStock, isAvailableForECommerce }) => isAvailableForECommerce && hasStock),
		[medicines],
	);
	const outOfStockMedicines = useMemo(
		() => medicines.filter(({ hasStock, isAvailableForECommerce }) => isAvailableForECommerce && !hasStock),
		[medicines],
	);
	const notAvailableMedicines = useMemo(
		() => medicines.filter(({ isAvailableForECommerce }) => !isAvailableForECommerce),
		[medicines],
	);

	return (
		<div className={classes.medicines}>
			{availableMedicines.map((medicine, index) => (
				<Medicine
					key={`available-${medicine.name}-${index}`}
					medicine={medicine}
					isActive={selectedMedicines.indexOf(medicine.medicamentNumber - 1) > -1}
					onClick={toggleMedicine(medicine.medicamentNumber - 1)}
					titleIndex={index}
				/>
			))}
			{availableMedicines.length > 0 && outOfStockMedicines.length > 0 && (
				<Typography className={classes.subTitle}>{t('buyPrescription.subTitle.outOfStock')}</Typography>
			)}
			{outOfStockMedicines.map((medicine, index) => (
				<Medicine
					key={`out-of-stock-${medicine.name}-${index}`}
					medicine={medicine}
					isActive={selectedMedicines.indexOf(medicine.medicamentNumber - 1) > -1}
					onClick={toggleMedicine(medicine.medicamentNumber - 1)}
					titleIndex={availableMedicines.length + index}
				/>
			))}
			{availableMedicines.length > 0 && outOfStockMedicines.length > 0 && notAvailableMedicines.length > 0 && (
				<Typography className={classes.subTitle}>{t('buyPrescription.subTitle.notAvailable')}</Typography>
			)}
			{notAvailableMedicines.map((medicine, index) => (
				<Medicine
					key={`not-available-medicines-${medicine.name}-${index}`}
					medicine={medicine}
					isActive={selectedMedicines.indexOf(medicine.medicamentNumber - 1) > -1}
					titleIndex={outOfStockMedicines.length + availableMedicines.length + index}
				/>
			))}
			<div className={classes.electronicPrescription}>
				<ElectronicPrescription openEPrescription={openEPrescription} />
			</div>
		</div>
	);
};

export default Medicines;
