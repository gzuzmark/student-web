import React, { ReactElement, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { PrescribedMedicine, SelectedMedicines, getRedirectUrl } from 'pages/api/userPrescription';
import { stylesWithTheme } from 'utils';
import { ReactComponent as InkafarmaIcon } from 'icons/inkafarma.svg';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { parse } from 'query-string';
import { useLocation } from 'react-router';

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
			padding: '80px 0 0',
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
			padding: '0 206px 60px',
		},
	},
	benefitText: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		margin: '0',
		paddingBottom: '66px',
		'& > span': {
			fontSize: '11px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '76px',
			'& > span': {
				fontSize: '13px',
			},
		},
	},
	mobileBodyFirstLine: {
		paddingBottom: '60px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	circularProgressWrapper: {
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: '25px',
	},
	desktopBodyFirstLine: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			fontSize: '13px',
			lineHeight: '18px',
			textAlign: 'center',
			paddingBottom: '15px',
		},
	},
	bodySecondLine: {
		fontSize: '13px',
		lineHeight: '18px',
		paddingBottom: '19px',
		[breakpoints.up('lg')]: {
			paddingBottom: '33px',
			textAlign: 'center',
		},
	},
	continueButtonWrapper: {
		textAlign: 'center',
	},
	continueButton: {
		padding: '11px 16px',
		width: '240px',
		fontSize: '15px',
		lineHeight: '18px',
		[breakpoints.up('lg')]: {
			width: '293px',
			padding: '16px',
		},
	},
}));

const createRedirectUrl = async (
	selectedMedicines: SelectedMedicines,
	setIsLoading: Function,
	setRedirectUrl: Function,
	userId: string,
) => {
	try {
		const redirectUrl = await getRedirectUrl(userId, selectedMedicines);

		setIsLoading(false);
		setRedirectUrl(redirectUrl);

		setTimeout(() => {
			window.open(redirectUrl, '_blank');
		}, 2000);
	} catch (e) {}
};

export interface RedirectToInkafarmaProps {
	medicines: PrescribedMedicine[];
	selectedMedicines: number[];
}

const RedirectToInkafarma = ({ medicines, selectedMedicines }: RedirectToInkafarmaProps): ReactElement | null => {
	const classes = useStyles();
	const { t } = useTranslation('buyPrescription');
	const location = useLocation();
	const params = parse(location.search);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [redirectUrl, setRedirectUrl] = useState();
	const sessionId = (params.sessionId as string) || '';
	const parsedSelectedMedicines: SelectedMedicines = selectedMedicines
		.map((index) => medicines[index])
		.map(({ skuInkafarma, totalQuantity, pharmaceuticalForm, hasStock, alternativeMedicine }) =>
			hasStock
				? {
						sku: skuInkafarma,
						quantity: totalQuantity,
						pharmaceuticalForm,
				  }
				: {
						sku: alternativeMedicine?.skuInkafarma || '',
						quantity: alternativeMedicine?.totalQuantity || 0,
						pharmaceuticalForm: alternativeMedicine?.pharmaceuticalForm || '',
				  },
		);
	const redirectToUrl = () => {
		window.open(redirectUrl, '_blank');
	};

	useEffect(() => {
		createRedirectUrl(parsedSelectedMedicines, setIsLoading, setRedirectUrl, sessionId);
		// eslint-disable-next-line
	}, []);

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<div className={classes.brandLogoWrapper}>
						<BrandLogo className={classes.brandLogo} />
					</div>
					<Typography className={classes.title} variant="h1">
						{t('buyPrescription.redirectToInkafarma.title')}
					</Typography>
					<Typography className={classes.mobileBodyFirstLine}>
						{t('buyPrescription.redirectToInkafarma.body.firstLine')}
					</Typography>
					<div className={classes.circularProgressWrapper}>
						<CircularProgress />
					</div>
					<div className={classes.benefitText}>
						<Typography component="span">{t('buyPrescription.sponsorLabel')}</Typography>
						<InkafarmaIcon className={classes.inkafarmaIcon} />
					</div>
					<Typography className={classes.desktopBodyFirstLine}>
						{t('buyPrescription.redirectToInkafarma.body.firstLine')}
					</Typography>
					<Typography className={classes.bodySecondLine}>
						{t('buyPrescription.redirectToInkafarma.body.secondLine')}
					</Typography>
					<div className={classes.continueButtonWrapper}>
						<Button className={classes.continueButton} disabled={isLoading} onClick={redirectToUrl} variant="contained">
							{t('buyPrescription.total.continueWithPayment')}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RedirectToInkafarma;
