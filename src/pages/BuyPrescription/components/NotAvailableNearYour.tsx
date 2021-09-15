import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { ReactComponent as CryingIcon } from 'icons/crying.svg';
import { ReactComponent as PrescriptionIcon } from 'icons/prescription.svg';
import { createTrackingDetailLogAddressNoCoverage, TrackingLocalStorage } from 'pages/api/tracking';
import useTracking from 'pages/Tracking/useTracking';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { stylesWithTheme } from 'utils';

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
			backgroundColor: '#ffffff',
			margin: '0 auto',
			height: '632px',
			width: '889px',
		},
	},
	content: {
		padding: '33px 26px 0',
		[breakpoints.up('lg')]: {
			padding: '60px 156px 0',
			textAlign: 'center',
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
		fontSize: '30px',
		paddingBottom: '10px',
		[breakpoints.up('lg')]: {
			fontSize: '38px',
			textAlign: 'center',
			paddingBottom: '15px',
		},
	},
	address: {
		fontSize: '13px',
		paddingBottom: '35px',
		[breakpoints.up('lg')]: {
			paddingBottom: '25px',
		},
	},
	iconWrapper: {
		textAlign: 'center',
		paddingBottom: '35px',
	},
	alternativeLabel: {
		fontSize: '13px',
		paddingBottom: '15px',
	},
	actionsWrapper: {
		[breakpoints.up('lg')]: {
			width: '401px',
			margin: '0 auto',
		},
	},
	updateAddress: {
		marginBottom: '12px',
		padding: '16px 0',
		[breakpoints.up('lg')]: {
			marginBottom: '26px',
			padding: '21.5px 0',
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

export interface NotAvailableNearYourProps {
	address: string;
	showEditAddressScreen: () => void;
}

const NotAvailableNearYour = ({ address, showEditAddressScreen }: NotAvailableNearYourProps): ReactElement | null => {
	const classes = useStyles();
	const { t } = useTranslation('buyPrescription');

	const tracking: TrackingLocalStorage | null = useTracking();

	useEffect(() => {
		if (tracking != null) {
			createTrackingDetailLogAddressNoCoverage(tracking.trackingId, address);
		}
	}, [address, tracking]);

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<div className={classes.brandLogoWrapper}>
						<BrandLogo className={classes.brandLogo} />
					</div>
					<Typography className={classes.title} variant="h1">
						{t('buyPrescription.notAvailableNearYou.title')}
					</Typography>
					<Typography className={classes.address}>{address}</Typography>
					<div className={classes.iconWrapper}>
						<CryingIcon />
					</div>
					<Typography className={classes.alternativeLabel}>
						{t('buyPrescription.notAvailableNearYou.alternative')}
					</Typography>
					<div className={classes.actionsWrapper}>
						<Button onClick={showEditAddressScreen} className={classes.updateAddress} variant="contained" fullWidth>
							<span className={classes.buttonLabel}>{t('buyPrescription.notAvailableNearYou.updateAddress')}</span>
						</Button>
						<Button className={classes.seeEPrescription} variant="outlined" fullWidth>
							<span className={classes.buttonLabel}>{t('buyPrescription.selectPrescriptionType.ePrescription')}</span>
							<PrescriptionIcon />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotAvailableNearYour;
