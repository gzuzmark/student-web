import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';
import { ReactComponent as InkafarmaIcon } from 'icons/inkafarma.svg';
import { ReactComponent as CartIcon } from 'icons/cart.svg';
import { ReactComponent as PrescriptionIcon } from 'icons/prescription.svg';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		[breakpoints.up('lg')]: {
			height: 'calc(100vh - 108px)',
			backgroundColor: '#FAF9F8',
			paddingTop: '40px',
		},
	},
	wrapper: {
		[breakpoints.up('lg')]: {
			backgroundColor: 'white',
			margin: '0 auto',
			height: '632px',
			width: '889px',
		},
	},
	content: {
		padding: '68px 26px 0',
		[breakpoints.up('lg')]: {
			padding: '80px 206px 0',
		},
	},
	brandLogoWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			marginBottom: '15px',
			textAlign: 'center',
		},
	},
	brandLogo: {
		[breakpoints.up('lg')]: {
			height: '19px',
		},
	},
	title: {
		fontWeight: 'bold',
		fontSize: '28px',
		paddingBottom: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '40px',
			textAlign: 'center',
			paddingBottom: '20px',
		},
	},
	actionsWrapper: {
		[breakpoints.up('lg')]: {
			width: '401px',
			margin: '0 auto',
		},
	},
	seeQuotedPrescription: {
		marginBottom: '12px',
		padding: '11px 0',
		[breakpoints.up('lg')]: {
			marginBottom: '26px',
			padding: '19.5px 0',
		},
	},
	seeEPrescription: {
		textTransform: 'none',
		padding: '11px 0',
		marginBottom: '28px',
		[breakpoints.up('lg')]: {
			marginBottom: '41px',
			padding: '19.5px 0',
		},
	},
	buttonLabel: {
		marginRight: '15px',
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
}));

interface SelectPrescriptionType {
	showQuotedPrescription: () => void;
	openEPrescription: () => void;
}

const SelectPrescriptionType = ({
	showQuotedPrescription,
	openEPrescription,
}: SelectPrescriptionType): ReactElement => {
	const classes = useStyles();
	const { t } = useTranslation('buyPrescription');

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<div className={classes.brandLogoWrapper}>
						<BrandLogo className={classes.brandLogo} />
					</div>
					<Typography className={classes.title} variant="h1">
						{t('buyPrescription.selectPrescriptionType.title')}
					</Typography>
					<div className={classes.actionsWrapper}>
						<Button
							onClick={showQuotedPrescription}
							className={classes.seeQuotedPrescription}
							variant="contained"
							fullWidth
						>
							<span className={classes.buttonLabel}>
								{t('buyPrescription.selectPrescriptionType.quotedPrescription')}
							</span>
							<CartIcon />
						</Button>
						<Button onClick={openEPrescription} className={classes.seeEPrescription} variant="outlined" fullWidth>
							<span className={classes.buttonLabel}>{t('buyPrescription.selectPrescriptionType.ePrescription')}</span>
							<PrescriptionIcon />
						</Button>
					</div>
					<div className={classes.benefitText}>
						<Typography component="span">{t('buyPrescription.sponsorLabel')}</Typography>
						<InkafarmaIcon className={classes.inkafarmaIcon} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectPrescriptionType;
