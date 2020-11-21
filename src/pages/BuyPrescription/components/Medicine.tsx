import React, { ReactElement } from 'react';
import { PrescribedMedicine } from 'pages/api';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';

interface StylesProps {
	isActive: boolean;
}

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	medicineLabel: {
		color: palette.info.main,
		paddingBottom: '12px',
		[breakpoints.up('lg')]: {
			paddingBottom: '10px',
		},
	},
	container: {
		position: 'relative',
		boxShadow: ({ isActive }: StylesProps) =>
			isActive ? '0px 1px 9px 5px rgba(0, 0, 0, 0.06)' : '0px 1px 9px 5px rgba(83, 91, 108, 0.06)',
		border: ({ isActive }: StylesProps) => `1px solid ${isActive ? palette.primary.main : 'transparent'}`,
		borderRadius: '5px',
		marginBottom: '26px',
		display: 'flex',
		padding: '18px 0 38px 9px',
		cursor: 'pointer',
	},
	name: {
		padding: '12px 0 5px 0',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			lineHeight: '25px',
		},
	},
	img: {
		width: '88px',
		height: '99px',
		marginRight: '9px',
	},
	individualValues: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			paddingBottom: '23px',
			minWidth: '275px',
			maxWidth: '300px',
		},
	},
	individualMeasure: {
		color: palette.info.main,
	},
	individualCost: {
		color: palette.info.main,
	},
	doctorLabel: {
		paddingBottom: '4px',
		[breakpoints.up('lg')]: {
			paddingBottom: '10px',
		},
	},
	totalValues: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingBottom: '6px',
		[breakpoints.up('lg')]: {
			minWidth: '275px',
			maxWidth: '300px',
		},
	},
	totalMeasure: {
		color: palette.info.main,
		fontSize: '15px',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
		},
	},
	checkbox: {
		position: 'absolute',
		bottom: '15px',
		left: '15px',
		padding: '0',
		color: palette.primary.main,
	},
	divider: {
		marginBottom: '16px',
	},
}));

export interface MedicineProps {
	medicine: PrescribedMedicine;
	isActive: boolean;
	onClick: () => void;
	index: number;
}

const Medicine = ({
	medicine: { name, individualMeasure, individualCost, totalMeasure, totalCost, imgUrl },
	isActive,
	onClick,
	index,
}: MedicineProps): ReactElement => {
	const classes = useStyles({ isActive });
	const { t } = useTranslation('buyPrescription');

	return (
		<div>
			<Typography className={classes.medicineLabel}>
				{t('buyPrescription.prescribedMedication.title', { index: index + 1 })}
			</Typography>
			<div className={classes.container} onClick={onClick}>
				<div>
					<img className={classes.img} src={imgUrl} alt={`medicine-${name}-sample`} />
				</div>
				<div>
					<Typography className={classes.name}>{name}</Typography>
					<div className={classes.individualValues}>
						<Typography className={classes.individualMeasure}>{individualMeasure}</Typography>
						<Typography className={classes.individualCost}>S./{individualCost}</Typography>
					</div>
					<Typography className={classes.doctorLabel}>
						{t('buyPrescription.prescribedMedication.doctorLabel')}
					</Typography>
					<div className={classes.totalValues}>
						<Typography className={classes.totalMeasure}>{totalMeasure}</Typography>
						<Typography color="primary" variant="button">
							S./{totalCost}
						</Typography>
					</div>
				</div>
				<Checkbox className={classes.checkbox} checked={isActive} color="primary" disableRipple />
			</div>
			<Divider className={classes.divider} />
		</div>
	);
};

export default Medicine;
