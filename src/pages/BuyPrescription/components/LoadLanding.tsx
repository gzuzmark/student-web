import { Theme, Typography } from '@material-ui/core';
import { Loading } from 'pages';
import React, { ReactElement } from 'react';
import { ReactComponent as BrandLogo } from 'icons/logo-alivia.svg';
import { stylesWithTheme } from 'utils';
import { useTranslation } from 'react-i18next';

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
			// height: '632px',
			height: '700px',
			// width: '889px',
			width: '1040px',
		},
	},
	content: {
		// padding: '68px 26px 0',
		padding: '68px 26px 0',
		[breakpoints.up('lg')]: {
			// padding: '80px 206px 0',
			padding: '80px 80px 0',
		},
	},
	brandLogoWrapper: {
		display: 'block',
		[breakpoints.up('lg')]: {
			display: 'block',
			marginBottom: '15px',
			textAlign: 'center',
		},
		[breakpoints.down('xs')]: {
			marginBottom: '15px',
		},
	},
	brandLogo: {
		[breakpoints.up('lg')]: {
			// height: '19px',
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
			paddingTop: '40px',
		},
	},
}));

const LoadLanding = (): ReactElement => {
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
						{t('buyPrescription.selectPrescriptionType.title2')}
					</Typography>
					<div>
						<Loading fullScreen={false} loadingMessage={'Cargando...'} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadLanding;
