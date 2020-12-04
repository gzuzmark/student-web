import React, { ReactElement } from 'react';
import { PrescribedMedicine } from 'pages/api';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { ReactComponent as SortIcon } from 'icons/sort.svg';
import { ReactComponent as MedicineSyrup } from 'icons/medicine_syrup.svg';
import { ReactComponent as MedicineTablets } from 'icons/medicine_tablet.svg';
import { stylesWithTheme } from 'utils';

interface StylesProps {
	isActive: boolean;
	hasAlternativeMedicine: boolean;
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
		boxShadow: '0px 1px 9px 5px rgba(83, 91, 108, 0.06)',
		borderRadius: '5px',
		marginBottom: '26px',
	},
	medicineContainer: {
		border: ({ isActive }: StylesProps) => `1px solid ${isActive ? palette.primary.main : 'transparent'}`,
		borderRadius: ({ hasAlternativeMedicine }: StylesProps) => (hasAlternativeMedicine ? '0 0 5px 5px' : '5px'),
		cursor: 'pointer',
	},
	wrapper: {
		display: 'flex',
		padding: '18px 9px 38px',
	},
	outOfStockMedicine: {
		backgroundColor: 'rgba(217, 217, 220, 0.4)',
		padding: '36px 0 38px 9px',
		borderRadius: '5px 5px 0 0',
	},
	outOfStockMedicineInfo: {
		display: 'flex',
		paddingBottom: '15px',
		opacity: '0.5',
		[breakpoints.up('lg')]: {
			paddingBottom: '20px',
		},
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
	outOfStockLabelWrapper: {
		display: 'flex',
		justifyContent: 'center',
	},
	outOfStockLabel: {
		backgroundColor: 'rgba(83, 91, 108, 0.6)',
		borderRadius: '5px',
		color: 'white',
		fontSize: '10px',
		lineHeight: '15px',
		letterSpacing: '5px',
		padding: '8.5px 0',
		textAlign: 'center',
		width: '136px',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			width: '157px',
		},
	},
	alternativeTitle: {
		alignItems: 'center',
		display: 'flex',
		padding: '18px 0 5px 12px',
		'& > *': {
			textTransform: 'none',
		},
		[breakpoints.up('lg')]: {
			justifyContent: 'center',
			padding: '34px 0 9px 0',
		},
	},
	alternativeTitleIcon: {
		marginRight: '13px',
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
	notAvailableMedicine: {
		backgroundColor: 'rgba(217, 217, 220, 0.4)',
		padding: '36px 0 38px 11px',
		display: 'flex',
		marginBottom: '25px',
		[breakpoints.up('lg')]: {
			padding: '36px 0 38px 24px',
		},
	},
	notAvailableMedicineIcon: {
		marginRight: '10px',
		[breakpoints.up('lg')]: {
			marginRight: '20px',
		},
	},
	notAvailableLabel: {
		backgroundColor: 'rgba(83, 91, 108, 0.6)',
		borderRadius: '5px',
		color: 'white',
		fontSize: '10px',
		lineHeight: '15px',
		letterSpacing: '5px',
		marginTop: '20px',
		padding: '8.5px 0',
		textAlign: 'center',
		width: '175px',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			width: '297px',
		},
	},
}));

export interface MedicineProps {
	medicine: PrescribedMedicine;
	isActive: boolean;
	onClick?: () => void;
	titleIndex: number;
}

const Medicine = ({ medicine, isActive, onClick, titleIndex }: MedicineProps): ReactElement => {
	const { alternativeMedicine } = medicine;
	const { name, individualMeasure, individualCost, totalMeasure, totalCost, imgUrl, isAvailableForECommerce } =
		alternativeMedicine || medicine;
	const classes = useStyles({ isActive, hasAlternativeMedicine: !!alternativeMedicine });
	const { t } = useTranslation('buyPrescription');

	if (!isAvailableForECommerce) {
		return (
			<>
				<div className={classes.notAvailableMedicine}>
					<div className={classes.notAvailableMedicineIcon}>
						<MedicineSyrup />
						<MedicineTablets />
					</div>
					<div>
						<Typography>{name}</Typography>
						<div className={classes.notAvailableLabel}>{t('buyPrescription.prescribedMedication.notAvailable')}</div>
					</div>
				</div>
				<Divider className={classes.divider} />
			</>
		);
	}

	return (
		<div>
			<Typography className={classes.medicineLabel}>
				{t('buyPrescription.prescribedMedication.title', { index: titleIndex + 1 })}
			</Typography>
			<div className={classes.container}>
				{!medicine.hasStock && (
					<div className={classes.outOfStockMedicine}>
						<div className={classes.outOfStockMedicineInfo}>
							<div>
								<img className={classes.img} src={medicine.imgUrl} alt={`medicine-${medicine.name}-sample`} />
							</div>
							<div>
								<Typography className={classes.name}>{medicine.name}</Typography>
								<div className={classes.individualValues}>
									<Typography className={classes.individualMeasure}>{medicine.individualMeasure}</Typography>
									<Typography className={classes.individualCost}>S./{medicine.individualCost}</Typography>
								</div>
							</div>
						</div>
						<div className={classes.outOfStockLabelWrapper}>
							<div className={classes.outOfStockLabel}>{t('buyPrescription.prescribedMedication.outOfStock')}</div>
						</div>
					</div>
				)}
				{(medicine.hasStock || (!!medicine.alternativeMedicine && medicine.alternativeMedicine.hasStock)) && (
					<div className={classes.medicineContainer} onClick={onClick}>
						{!!alternativeMedicine && (
							<div className={classes.alternativeTitle}>
								<div className={classes.alternativeTitleIcon}>
									<SortIcon />
								</div>
								<Typography variant="button">{t('buyPrescription.prescribedMedication.alternativeLabel')}</Typography>
							</div>
						)}
						<div className={classes.wrapper}>
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
					</div>
				)}
			</div>
			<Divider className={classes.divider} />
		</div>
	);
};

export default Medicine;
