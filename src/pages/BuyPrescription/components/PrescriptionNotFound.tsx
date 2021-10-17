import { Card, CardContent, Theme, Typography } from '@material-ui/core';
import { ReactComponent as BrandLogo } from 'icons/logo-alivia.svg';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { stylesWithTheme } from 'utils';
// import '../../../index.css';
// import Montserrat from '../../../fonts/Montserrat-Regular.woff2';

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
		[breakpoints.down('xs')]: {
			textAlign: 'justify',
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
		[breakpoints.down('xs')]: {
			textAlign: 'justify',
		},
	},
	description: {
		fontFamily: 'Montserrat,-apple-system,sans-serif',
		color: '#535B6C',
		margin: '0px 30px',
		textAlign: 'center',
		fontSize: '24px',
		[breakpoints.down('md')]: {
			textAlign: 'justify',
			margin: '0px 10px',
		},
	},
	whapp: {
		fontFamily: 'Montserrat,-apple-system,sans-serif',
		fontSize: '24px',
		fontStyle: 'normal',
		fontWeight: 'bold',
		lineHeight: '150%',
		letterSpacing: '0.2px',
		textDecorationLine: 'underline',
		color: '#1ECD96',
	},
}));

interface PrescriptionNotFoundProps {
	folioNumber: string;
	prescriptionPath: string;
}

const PrescriptionNotFound = ({ folioNumber, prescriptionPath }: PrescriptionNotFoundProps): ReactElement => {
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
						{t('buyPrescription.errorPrescriptionNotFound.title')}
					</Typography>
					<Typography className={classes.description} variant="h1">
						{t('buyPrescription.errorPrescriptionNotFound.description')}{' '}
						<a
							href="https://api.whatsapp.com/send?phone=51965698337&text=%5BVengo%20de%20la%20web%20de%20Alivia%5D%20Necesito%20ayuda%2C%20no%20puedo%20descargar%20mi%20receta%20m%C3%A9dica."
							className={classes.whapp}
						>
							WhatsApp
						</a>
						.
					</Typography>
					<div className="whapp_link" id="whapp_link"></div>
					{folioNumber?.length > 8 && (
						<Card>
							<CardContent>
								<Typography>
									{t('buyPrescription.errorPrescriptionNotFound.nroFolio')}: {folioNumber}
								</Typography>
							</CardContent>
						</Card>
					)}
					{prescriptionPath?.startsWith('http') && (
						<Card>
							<CardContent>
								<Typography>Error encontrado: Su receta médica no ha generado un identificador</Typography>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export default PrescriptionNotFound;
