import React, { MouseEvent } from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { RightLayout } from 'pages/common';
import { stylesWithTheme, addGAEvent } from 'utils';
import { ReactComponent as CreditCardSvg } from 'icons/creditCard.svg';
import { ReactComponent as CashierIcon } from 'icons/cashier.svg';
import mastercard from 'icons/mastercard.png';
import visa from 'icons/visa.png';
import { ReactComponent as PagoLocalSVG } from 'icons/pago_local.svg';
// import pagoEfectivo from 'icons/pagoefectivo.png';
import { KUSHKI_PAYMENT_ID, PE_PAYMENT_ID } from 'pages/api';

const useStyles = stylesWithTheme(({ palette, breakpoints, spacing }: Theme) => ({
	container: {
		'&&': {
			minHeight: 'calc(100vh - 301px)',
			[breakpoints.up('lg')]: {
				minHeight: 'calc(100vh - 80px)',
			},
		},
		paddingLeft: '100px !important',
	},
	wrapper: {
		padding: '11px 24px 0',
		[breakpoints.up('lg')]: {
			padding: '109px 0 0 9px',
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
	discountWrapper: {
		paddingBottom: '30px',
		[breakpoints.up('lg')]: {
			marginTop: '28px',
			paddingBottom: '50px',
			width: '399px',
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
	optionBrandWrapper: {
		display: 'block',
		marginTop: '10px',
		justifyContent: 'center',
		minHeight: '40px',
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
	masterCardImage: {
		width: '28px',
		height: '18px',
		paddingRight: '5px',
	},
	visaImage: {
		width: '35px',
		height: '12px',
	},
	pagoEfectivoImage: {
		width: '80px',
		height: '30px',
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
	totalCost: string | number | undefined;
	// isCounponDisabled: boolean;
	// sendDiscount: () => Promise<void>;
	// discountCode: string;
	// onChangeDiscount: (e: ChangeEvent<HTMLInputElement>) => void;
	executePayment: (pm: number) => (e: MouseEvent) => void;
	errorMessage: string;
}

const RightSide = ({ executePayment, errorMessage }: RightSideProps) => {
	const { t } = useTranslation('payment');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	const isPagoEfectivoVisible = true; //isWeekDayLateNightOrSunday();

	return (
		<RightLayout className={classes.container}>
			<div className={classes.wrapper}>
				<Typography className={classes.subtitle} component="span" variant={matches ? 'h3' : 'body1'}>
					{t('payment.right.method')}:
				</Typography>
				<div className={classes.buttonWrapper}>
					<Button
						style={{ display: 'none' }}
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
								<img src={mastercard} className={classes.masterCardImage} alt="Brand Mastercard" />
								<img src={visa} className={classes.visaImage} alt="Brand Visa" />
							</div>
						</div>
					</Button>
					{isPagoEfectivoVisible && (
						<Button
							style={{ display: 'none' }}
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
						>
							<div className={classes.optionBody} style={{ width: 'inherit' }}>
								<div className={clsx(classes.optionIconWrapper, 'option-icon-wrapper')}>
									<CashierIcon />
								</div>
								<Typography className={classes.optionLabel} variant="h3">
									{t('payment.right.pagoEfectivo')}
								</Typography>
								<div className={classes.optionBrandWrapper}>
									{/* <img src={pagoEfectivo} title="PagoEfectivo" className={classes.peImage} alt="Brand Pago Efectivo" />  */}
								</div>
							</div>
						</Button>
					)}
				</div>
				<div className={classes.buttonWrapper}>
					<Button
						className={classes.option}
						onClick={(e) => {
							addGAEvent({
								category: 'Agendar cita - Paso 3',
								action: 'Avance satisfactorio',
								label: 'Pago Local',
							});
							executePayment(3)(e);
						}}
						variant="outlined"
						style={{}}
					>
						<div className={classes.optionBody} style={{ width: 'inherit' }}>
							<div className={clsx(classes.optionIconWrapper, 'option-icon-wrapper')}>
								<PagoLocalSVG />
							</div>
							<Typography className={classes.optionLabel} variant="h3">
								Pago en Local
							</Typography>
							<div className={classes.optionBrandWrapper}></div>
						</div>
					</Button>
				</div>
				{errorMessage ? (
					<div className={classes.errorWrapper}>
						<FormHelperText error>{errorMessage}</FormHelperText>
					</div>
				) : null}
			</div>
		</RightLayout>
	);
};

export default RightSide;
