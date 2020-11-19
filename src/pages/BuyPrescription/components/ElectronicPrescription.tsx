import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';
import { ReactComponent as InkafarmaIcon } from 'icons/inkafarma.svg';
import { ReactComponent as PrescriptionIcon } from 'icons/prescription.svg';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		textAlign: 'center',
		padding: '24px 0',
	},
	button: {
		textTransform: 'none',
		borderRadius: '100px',
		fontSize: '11px',
		fontWeight: 'bold',
		padding: '12.5px 15px',
		marginBottom: '27px',
		[breakpoints.up('lg')]: {
			borderWidth: '2px',
			fontSize: '14px',
			padding: '12.5px 18px',
		},
	},
	buttonText: {
		paddingRight: '10px',
	},
	benefitText: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		margin: '0',
		'& > span': {
			fontSize: '13px',
		},
	},
	inkafarmaIcon: {
		paddingLeft: '2px',
	},
}));

const ElectronicPrescription = (): ReactElement => {
	const { t } = useTranslation('buyPrescription');
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Button variant="outlined" className={classes.button}>
				<span className={classes.buttonText}>{t('buyPrescription.seeEPrescription')}</span>
				<PrescriptionIcon />
			</Button>
			<div className={classes.benefitText}>
				<Typography component="span">{t('buyPrescription.sponsorLabel')}</Typography>
				<InkafarmaIcon className={classes.inkafarmaIcon} />
			</div>
		</div>
	);
};

export default ElectronicPrescription;
