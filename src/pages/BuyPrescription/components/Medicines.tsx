import React, { ReactElement } from 'react';
import { PrescribedMedicine } from 'pages/api';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';

import Medicine from './Medicine';
import ElectronicPrescription from './ElectronicPrescription';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	medicines: {
		overflow: 'scroll',
		[breakpoints.up('lg')]: {
			width: '506px',
			marginRight: '57px',
			overflow: 'visible',
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
}

const Medicines = ({ medicines, selectedMedicines, toggleMedicine }: MedicinesProps): ReactElement => {
	const classes = useStyles();

	return (
		<div className={classes.medicines}>
			{medicines.map((medicine, index) => (
				<Medicine
					key={`${medicine.name}-${index}`}
					medicine={medicine}
					isActive={selectedMedicines.indexOf(index) > -1}
					onClick={toggleMedicine(index)}
					index={index}
				/>
			))}
			<div className={classes.electronicPrescription}>
				<ElectronicPrescription />
			</div>
		</div>
	);
};

export default Medicines;
