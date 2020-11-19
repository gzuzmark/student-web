import React, { ReactElement } from 'react';
import { PrescribedMedicine } from 'pages/api';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';
import ElectronicPrescription from './ElectronicPrescription';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		[breakpoints.up('lg')]: {
			padding: '0 0 0 60px',
			width: '506px',
		},
	},
	mobileCheckout: {
		backgroundColor: '#EEEDEF',
		margin: '0 -13px 20px',
		padding: '16px 12px 12px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	medicinesCounts: {
		fontStyle: 'italic',
		textAlign: 'center',
		paddingBottom: '18px',
		[breakpoints.up('lg')]: {
			order: '2',
			textAlign: 'left',
			padding: '24px 0',
		},
	},
	addressContainer: {
		[breakpoints.up('lg')]: {
			order: '1',
		},
	},
	addressWrapper: {
		padding: '24px 0',
	},
	addressHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingBottom: '5px',
		color: palette.info.main,
		[breakpoints.up('lg')]: {
			paddingBottom: '20px',
		},
	},
	addresLabel: {
		color: 'rgba(83,91,108,0.5)',
	},
	editAddress: {
		padding: '0',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none',
		},
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			lineHeight: '20px',
		},
	},
	desktopCheckout: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			order: '3',
		},
	},
	totalAmount: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingBottom: '17px',
		[breakpoints.up('lg')]: {
			alignItems: 'center',
			paddingBottom: '47px',
		},
	},
	totalLabel: {
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
			fontWeight: 'bold',
		},
	},
	totalAmountHelp: {
		color: palette.info.main,
		fontStyle: 'italic',
	},
	amount: {
		fontSize: '15px',
		lineHeight: '20px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
		},
	},
	electronicPrescription: {
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	continueButton: {
		[breakpoints.up('lg')]: {
			marginTop: '32px',
		},
	},
}));

export interface CheckoutInformationProps {
	medicines: PrescribedMedicine[];
	selectedMedicines: number[];
	address: string;
}

const CheckoutInformation = ({ address, medicines, selectedMedicines }: CheckoutInformationProps): ReactElement => {
	const { t } = useTranslation('buyPrescription');
	const classes = useStyles();
	const total = selectedMedicines.reduce((acc, index) => acc + parseFloat(medicines[index].totalCost), 0);

	return (
		<div className={classes.container}>
			<div className={classes.mobileCheckout}>
				<div className={classes.totalAmount}>
					<div>
						<Typography component="span">{t('buyPrescription.total.label')}</Typography>{' '}
						<Typography className={classes.totalAmountHelp} component="span">
							{t('buyPrescription.total.helperText')}
						</Typography>
					</div>
					<Typography className={classes.amount} color="primary">
						S./{total.toFixed(2)}
					</Typography>
				</div>
				<Button variant="contained" fullWidth>
					{t('buyPrescription.total.continueWithPayment')}
				</Button>
			</div>
			<Typography className={classes.medicinesCounts} color="primary">
				{t('buyPrescription.medicinesSelected', {
					selectedCount: medicines.length,
					totalCount: selectedMedicines.length,
				})}
			</Typography>
			<div className={classes.addressContainer}>
				<Divider />
				<div className={classes.addressWrapper}>
					<div className={classes.addressHeader}>
						<Typography className={classes.addresLabel}>{t('buyPrescription.address.label')}</Typography>
						<Button className={classes.editAddress}>{t('buyPrescription.address.editLabel')}</Button>
					</div>
					<Typography className={classes.address}>{address}</Typography>
				</div>
				<Divider />
			</div>
			<div className={classes.desktopCheckout}>
				<div className={classes.totalAmount}>
					<div>
						<Typography className={classes.totalLabel} component="span">
							{t('buyPrescription.total.label')}
						</Typography>{' '}
						<Typography className={classes.totalAmountHelp} component="span">
							{t('buyPrescription.total.helperText')}
						</Typography>
					</div>
					<Typography className={classes.amount} color="primary">
						S./{total.toFixed(2)}
					</Typography>
				</div>
				<Divider />
				<Button className={classes.continueButton} variant="contained" fullWidth>
					{t('buyPrescription.total.continueWithPayment')}
				</Button>
			</div>
			<div className={classes.electronicPrescription}>
				<ElectronicPrescription />
			</div>
		</div>
	);
};

export default CheckoutInformation;
