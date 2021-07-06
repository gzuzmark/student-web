import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PrescribedMedicine } from 'pages/api';
import {
	createTrackingAvailablesMedicines,
	createTrackingMedicinesNotEcommerce,
	createTrackingOutstockMedicines,
} from 'pages/api/tracking';
import useTracking from 'pages/Tracking/useTracking';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { stylesWithTheme } from 'utils';
import ElectronicPrescription from './ElectronicPrescription';
import Medicine from './Medicine';

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
	const tracking = useTracking();

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

	const filterMedicinesAndAlternatives = (medicines: PrescribedMedicine[]) => {
		const withSuggested = medicines.filter(({ alternativeMedicine }) => alternativeMedicine === null);
		const withAtlernatives = medicines.filter(({ alternativeMedicine }) => alternativeMedicine !== null);
		return { withSuggested, withAtlernatives };
	};

	const saveTrackingListMedicine = useCallback(
		(
			trackingId: string,
			medicines: PrescribedMedicine[],
			callbackTracking: (id: string, total: number, payload: string, isAlternative: boolean) => void,
		) => {
			const { withSuggested, withAtlernatives } = filterMedicinesAndAlternatives(medicines);

			if (withAtlernatives.length > 0) {
				const payloadAlternatives = JSON.stringify(withAtlernatives);
				callbackTracking(trackingId, withAtlernatives.length, payloadAlternatives, true);
			}

			if (withSuggested.length > 0) {
				const payloadSuggested = JSON.stringify(withSuggested);
				callbackTracking(trackingId, withSuggested.length, payloadSuggested, false);
			}
		},
		[],
	);

	useEffect(() => {
		if (tracking != null) {
			const totalAvailables = availableMedicines.length;
			const totalOutStock = outOfStockMedicines.length;
			const totalNotAvailables = notAvailableMedicines.length;

			const totalFilters = totalAvailables + totalOutStock + totalNotAvailables;

			if (totalFilters > 0) {
				saveTrackingListMedicine(tracking.trackingId, availableMedicines, createTrackingAvailablesMedicines);
				saveTrackingListMedicine(tracking.trackingId, outOfStockMedicines, createTrackingOutstockMedicines);
				saveTrackingListMedicine(tracking.trackingId, notAvailableMedicines, createTrackingMedicinesNotEcommerce);
			}
		}
	}, [availableMedicines, outOfStockMedicines, notAvailableMedicines, tracking, saveTrackingListMedicine]);

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
