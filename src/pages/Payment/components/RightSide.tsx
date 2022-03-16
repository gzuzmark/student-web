import React, { MouseEvent, ChangeEvent, useEffect } from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { RightLayout } from 'pages/common';
import { stylesWithTheme, addGAEvent, redirectToURL } from 'utils';
import { ReactComponent as CreditCardSvg } from 'icons/creditCard.svg';
import { ReactComponent as CashierIcon } from 'icons/cashier.svg';
import mastercard from 'icons/mastercard.png';
import visa from 'icons/visa.png';
import amex from 'icons/amex.png';
import interbank from 'icons/imgInterbank.png';
import bcp from 'icons/imgBCP.png';
import bbva from 'icons/imgBBVA.png';
import tambo from 'icons/imgTambo.png';
import cajaarequipa from 'icons/imgCajaArequipa.png';

import { WHATSAPP_PHONE_NUMBER } from 'pages/constants';
import { KUSHKI_PAYMENT_ID, PE_PAYMENT_ID, B2B_PAYMENT_ID } from 'pages/api';

const useStyles = stylesWithTheme(({ palette, breakpoints, spacing }: Theme) => ({
	container: {
		'&&': {
			minHeight: 'calc(100vh - 301px)',
			[breakpoints.up('lg')]: {
				minHeight: 'calc(100vh - 80px)',
			},
		},
	},
	wrapper: {
		padding: '11px 24px 0',
		[breakpoints.up('lg')]: {
			padding: '147px 0 0 9px',
		},
	},
	containerstepswrapper: {
		padding: '11px 24px 0',
		[breakpoints.up('lg')]: {
			padding: '30px 0 0 9px',
		},
	},
	title: {
		fontSize: '15px',
		lineHeight: '18px',
		fontWeight: '400',
		paddingBottom: '16px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
			fontWeight: '500',
			paddingBottom: '7px',
		},
	},
	titlestep: {
		fontSize: '20px',
		lineHeight: '18px',
		fontWeight: '500',
		paddingBottom: '16px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
			fontWeight: '500',
			paddingBottom: '7px',
		},
	},
	amount: {
		fontWeight: 'bold',
		letterSpacing: '0.2px',
	},
	subtitle: {
		fontSize: '13px',
		paddingBottom: '5px',
		[breakpoints.up('lg')]: {
			fontSize: '17px',
		},
	},
	link: {
		fontSize: '13px',
		paddingBottom: '5px',
		cursor: 'pointer',
		[breakpoints.up('lg')]: {
			fontSize: '17px',
		},
	},
	description: {
		fontSize: '13px',
		paddingTop: '10px',
		paddingBottom: '5px',
		[breakpoints.up('lg')]: {
			fontSize: '17px',
		},
	},
	descriptionwpp: {
		marginTop: '18px',
		fontSize: '13px',
		paddingBottom: '5px',
		[breakpoints.up('lg')]: {
			fontSize: '17px',
		},
	},
	discountWrapper: {
		paddingBottom: '30px',
		[breakpoints.up('lg')]: {
			marginTop: '28px',
			paddingBottom: '50px',
			width: '399px',
		},
	},
	stepsWrapper: {
		paddingBottom: '30px',
		marginTop: '50px',
		[breakpoints.up('lg')]: {
			marginTop: '50px',
			paddingBottom: '50px',
			width: '600px',
		},
	},
	discountInputWrapper: {
		paddingBottom: '11px',
		[breakpoints.up('lg')]: {
			paddingBottom: '15px',
		},
		'& .MuiInputLabel-outlined': {
			transform: 'translate(10px, 16px) scale(1)',

			[breakpoints.up('lg')]: {
				transform: 'translate(21px, 14px) scale(1)',
			},

			'&.MuiInputLabel-shrink': {
				transform: 'translate(0, -22px) scale(1)',
			},
		},
	},
	discountInput: {
		'& > input': {
			padding: '14px 18.5px 14px 10px;',

			[breakpoints.up('lg')]: {
				padding: '16.5px 18.5px 16.5px 21px',
			},
		},
	},
	discountButtonWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		[breakpoints.up('lg')]: {
			justifyContent: 'flex-start',
		},
	},
	discountButton: {
		width: '130px',
		textTransform: 'none',
		padding: '11px',
		[breakpoints.up('lg')]: {
			width: '169px',
			padding: '17px 13px',
			fontSize: '15px',
		},
	},
	buttonWrapper: {
		display: 'flex',
		marginTop: '10px',
		[breakpoints.up('lg')]: {
			maxWidth: '901px',
		},
	},
	errorWrapper: {
		marginBottom: 'auto',
		[breakpoints.up('lg')]: {
			marginBottom: '30px',
			maxWidth: '594px',
		},
	},
	payButton: {
		marginRight: '10px',
	},

	optionWrapper: {
		margin: 0,
		[breakpoints.up('lg')]: {
			marginRight: '5px',
			maxWidth: '290px',
		},
	},
	confirmButton: {
		border: '1px solid white',
		boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
		backgroundColor: palette.primary.main,
		marginRight: '10px',
		justifyContent: 'flex-start',
		padding: '26px',
		'&.long-text': {
			padding: '26px 15px 26px 26px',
		},
		'&:last-child': {
			marginBottom: '0',
		},
		'&:hover': {
			boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
			'& .option-icon-wrapper': {
				backgroundColor: palette.primary.light,
			},
		},
		[breakpoints.up('lg')]: {
			marginBottom: 0,
			padding: '28px 13px 28px 22px',
			boxShadow: 'none',
			width: '33%',
		},
	},
	option: {
		border: '1px solid white',
		boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
		marginRight: '10px',
		justifyContent: 'flex-start',
		padding: '26px',
		'&.long-text': {
			padding: '26px 15px 26px 26px',
		},
		'&:last-child': {
			marginBottom: '0',
		},
		'&:hover': {
			boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
			'& .option-icon-wrapper': {
				backgroundColor: palette.primary.light,
			},
		},
		[breakpoints.up('lg')]: {
			marginBottom: 0,
			padding: '28px 13px 28px 22px',
			boxShadow: 'none',
			width: '33%',
		},
	},
	optionBody: {
		alignItems: 'center',
		display: 'block',
		textAlign: 'center',
		width: '100%',
		[breakpoints.up('lg')]: {
			width: 'auto',
		},
	},
	optionIconWrapper: {
		alignItems: 'center',
		borderRadius: '50%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '77px',
		width: '77px',
		margin: 'auto',
	},
	optionLabel: {
		color: palette.primary.main,
		fontSize: '10px',
		fontWeight: '500',
		letterSpacing: '1px',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
		},
	},
	confirmLabel: {
		color: 'white',
		fontSize: '10px',
		fontWeight: '500',
		letterSpacing: '1px',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
		},
	},
	andmore: {
		color: palette.primary.main,
		fontSize: '10px',
		fontWeight: '500',
		letterSpacing: '0px',
		textTransform: 'none',
	},
	optionBrandWrapper: {
		display: 'block',
		marginTop: '10px',
		justifyContent: 'center',
		minHeight: '40px',
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
	optionstepsWrapper: {
		display: 'block',
		marginTop: '15px',
		minHeight: '40px',
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
	visaImage: {
		width: '35px',
		height: '12px',
		paddingRight: '5px',
	},
	masterCardImage: {
		width: '28px',
		height: '18px',
		paddingRight: '5px',
	},
	amexImage: {
		width: '28px',
		height: '18px',
		paddingRight: '5px',
	},
	pagoEfectivoImage: {
		width: '80px',
		height: '30px',
	},
	interbankImage: {
		width: '35px',
		height: '18px',
		paddingRight: '5px',
	},
	bcpImage: {
		width: '35px',
		height: '18px',
		paddingRight: '5px',
	},
	bbvaImage: {
		width: '35px',
		height: '18px',
		paddingRight: '5px',
	},
	tamboImage: {
		width: '35px',
		height: '18px',
		paddingRight: '5px',
	},
	arequipaImage: {
		width: '35px',
		height: '18px',
		paddingRight: '5px',
	},
	trujilloImage: {
		width: '35px',
		height: '18px',
	},
	steponeImage: {
		width: '100px',
		paddingRight: '20px',
	},
	steptwoImage: {
		width: '100px',
		paddingRight: '20px',
	},
	stepthreeImage: {
		width: '100px',
		height: '57px',
		paddingRight: '20px',
	},
	banksImage: {
		width: '35px',
		height: '30px',
		paddingRight: '10px',
	},
	peImage: {
		width: '100px',
		height: '30px',
		paddingRight: '10px',
	},
	kushkiTitle: {
		textAlign: 'center',
	},
	kushkiMargin: {
		margin: spacing(1),
	},
}));

interface RightSideProps {
	totalCost: string | undefined;
	isCounponDisabled: boolean;
	sendDiscount: () => Promise<void>;
	discountCode: string;
	onChangeDiscount: (e: ChangeEvent<HTMLInputElement>) => void;
	executePayment: (pm: number) => (e: MouseEvent) => void;
	errorMessage: string;
	useBenefit: boolean | undefined;
	useCaseId: string;
}
const COUPON_CODE_MEDICINA_GENERAL = 'Intercorp20';
const USE_CASE_ID_MEDICINA_GENERAL = '6358556c-2e7d-4d94-9d6e-cb72ee5e6103';

const RightSide = ({
	totalCost,
	isCounponDisabled,
	sendDiscount,
	discountCode,
	onChangeDiscount,
	executePayment,
	errorMessage,
	useBenefit,
	useCaseId,
}: RightSideProps) => {
	const { t } = useTranslation('payment');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	useEffect(() => {
		if (useBenefit) {
			sendDiscount();
		}
	}, [useBenefit, sendDiscount]);

	const onClickSendDiscount = () => {
		if (COUPON_CODE_MEDICINA_GENERAL === discountCode && useCaseId === USE_CASE_ID_MEDICINA_GENERAL) {
			sendDiscount();
			console.log('medidcina general');
		} else if (discountCode !== '' && COUPON_CODE_MEDICINA_GENERAL !== discountCode) {
			console.log('otro cupon');
			sendDiscount();
		}
	};

	const isPagoEfectivoVisible = true; //isWeekDayLateNightOrSunday();

	const useFreeBenefit = totalCost && parseInt(totalCost) === 0;

	const gotToYoutubeSteps = () => {
		redirectToURL('https://www.youtube.com/watch?v=n-Gg8ar0IkI', true);
	};
	const gotToWpp = () => {
		redirectToURL(
			`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=%5BVengo%20de%20la%20web%5D%20Hola%20Alivia!%20Tengo%20una%20duda,%20me%20podr%C3%ADan%20ayudar?&source=&data=&app_absent`,
			true,
		);
	};

	return (
		<RightLayout className={classes.container}>
			<div className={classes.wrapper}>
				{/* <div
					style={{
						border: '3px dotted #bbb',
						borderRadius: '5px',
						margin: '0 auto',
						marginRight: '15px',
						marginBottom: '15px',
						color: '#535B6C',
					}}
				>
					<div style={{ padding: '2px 16px', backgroundColor: '#ffffff' }}>
						<h2>
							<b>APROVECHA EL 20% DE DESCUENTO EN TU COMPRA</b>
						</h2>
					</div>
					<div style={{ padding: '2px 16px', backgroundColor: '#f1f1f1' }}>
						<p>
							Use el Cupón<noscript></noscript>:{' '}
							<span style={{ background: '#ccc', padding: '3px' }}>
								{' '}
								<strong>SALUD20</strong>
							</span>
						</p>
						<p style={{ color: 'red' }}>Expira: Mayo 30, 2021</p>
					</div>
				</div> */}
				<Typography className={classes.title}>
					<div>
						{useBenefit && t('payment.right.employeeTitle')}
						<br></br>
						{t('payment.right.payment')}{' '}
					</div>
					<Typography
						className={clsx(classes.title, classes.amount)}
						component="span"
						variant={matches ? 'h3' : 'body1'}
					>
						S/{totalCost}
					</Typography>
					<Typography className={classes.description}> {t('payment.right.adviceInformation')} </Typography>
				</Typography>
				{!useFreeBenefit && (
					<div className={classes.discountWrapper}>
						<TextField
							value={discountCode}
							onChange={onChangeDiscount}
							className={classes.discountInputWrapper}
							InputProps={{ className: classes.discountInput }}
							variant="outlined"
							disabled={isCounponDisabled}
							label={t('payment.right.discountLabel')}
							fullWidth
						/>
						<div className={classes.discountButtonWrapper}>
							<Button
								className={classes.discountButton}
								onClick={onClickSendDiscount}
								variant="outlined"
								disabled={isCounponDisabled}
								fullWidth
							>
								{t('payment.right.addDiscountLabel')}
							</Button>
						</div>
					</div>
				)}
				{!useFreeBenefit && (
					<Typography className={classes.subtitle} component="span" variant={matches ? 'h3' : 'body1'}>
						{isPagoEfectivoVisible ? t('payment.right.method') : t('payment.right.method-only')}:
					</Typography>
				)}
				<div className={classes.buttonWrapper}>
					{!useFreeBenefit && (
						<Button
							className={classes.option}
							// onClick={(e) => {
							// addGAEvent({
							// 	category: 'Agendar cita - Paso 3',
							// 	action: 'Avance satisfactorio',
							// 	label: 'Tarjeta de crédito o débito',
							// });
							// 	executePayment(CULQI_PAYMENT_ID)(e);
							// }}
							onClick={(e) => {
								addGAEvent({
									category: 'Agendar cita - Paso 3',
									action: 'Avance satisfactorio',
									label: 'Tarjeta de crédito o débito',
								});
								executePayment(KUSHKI_PAYMENT_ID)(e);
							}}
							variant="outlined"
						>
							<div className={classes.optionBody}>
								<div className={clsx(classes.optionIconWrapper, 'option-icon-wrapper')}>
									<CreditCardSvg />
								</div>
								<Typography className={classes.optionLabel} variant="h3">
									{t('payment.right.payCulqiButton')}
								</Typography>
								<div className={classes.optionBrandWrapper}>
									<img src={visa} className={classes.visaImage} alt="Brand Visa" />
									<img src={mastercard} className={classes.masterCardImage} alt="Brand Mastercard" />
									<img src={amex} className={classes.amexImage} alt="Brand Amex" />
								</div>
								<Typography className={classes.andmore} variant="h3">
									{t('y más')}
								</Typography>
							</div>
						</Button>
					)}
					{isPagoEfectivoVisible && !useFreeBenefit && (
						<Button
							className={classes.option}
							onClick={(e) => {
								addGAEvent({
									category: 'Agendar cita - Paso 3',
									action: 'Avance satisfactorio',
									label: 'Depósitos y transferencias',
								});
								executePayment(PE_PAYMENT_ID)(e);
							}}
							variant="outlined"
							style={{}}
						>
							<div className={classes.optionBody} style={{ width: 'inherit' }}>
								<div className={clsx(classes.optionIconWrapper, 'option-icon-wrapper')}>
									<CashierIcon />
								</div>
								<Typography className={classes.optionLabel} variant="h3">
									{t('payment.right.pagoEfectivo')}
								</Typography>
								<div className={classes.optionBrandWrapper}>
									<img src={interbank} className={classes.interbankImage} alt="Brand Interbank" />
									<img src={bcp} className={classes.bcpImage} alt="Brand BCP" />
									<img src={bbva} className={classes.bbvaImage} alt="Brand BBVA" />
									<img src={tambo} className={classes.tamboImage} alt="Brand Tambo" />
									<img src={cajaarequipa} className={classes.arequipaImage} alt="Brand Caja Arequipa" />
								</div>
								<Typography className={classes.andmore} variant="h3">
									{t('y más')}
								</Typography>
							</div>
						</Button>
					)}
					{useFreeBenefit && (
						<Button
							className={classes.confirmButton}
							onClick={(e) => {
								addGAEvent({
									category: 'Agendar cita - Paso 3',
									action: 'Avance satisfactorio',
									label: 'Depósitos y transferencias',
								});
								executePayment(B2B_PAYMENT_ID)(e);
							}}
							variant="outlined"
							style={{}}
						>
							<div className={classes.optionBody} style={{ width: 'inherit' }}>
								<Typography className={classes.confirmLabel} variant="h3">
									{t('payment.right.pagoEmpresaBeneficio')}
								</Typography>
							</div>
						</Button>
					)}
				</div>
				{errorMessage ? (
					<div className={classes.errorWrapper}>
						<FormHelperText error>{errorMessage}</FormHelperText>
					</div>
				) : null}

				<div className={classes.stepsWrapper}>
					{isPagoEfectivoVisible && !useBenefit && (
						<Typography className={classes.link} color="primary" onClick={gotToYoutubeSteps} component="span">
							{t('*¿Cómo Pago en Efectivo?')}
						</Typography>
					)}
					<Typography className={classes.descriptionwpp}>
						{t('payment.right.steps.wpp')}
						<Typography className={classes.link} color="primary" onClick={gotToWpp} component="span">
							{t('+51 965 698 337')}
						</Typography>
					</Typography>
				</div>
			</div>
		</RightLayout>
	);
};

export default RightSide;
