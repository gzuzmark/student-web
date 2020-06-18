import React, { MouseEvent, ChangeEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { RightLayout } from 'pages/common';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
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
	},
	subTitleWrapper: {
		paddingBottom: '41px',
		[breakpoints.up('lg')]: {
			paddingBottom: '56px',
		},
	},
	discountWrapper: {
		paddingBottom: '30px',
		[breakpoints.up('lg')]: {
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
		[breakpoints.up('lg')]: {
			maxWidth: '401px',
		},
	},
}));

interface RightSideProps {
	totalCost: string | undefined;
	isCounponDisabled: boolean;
	sendDiscount: () => Promise<void>;
	discountCode: string;
	onChangeDiscount: (e: ChangeEvent<HTMLInputElement>) => void;
	openPaymentModal: (e: MouseEvent) => void;
	errorMessage: string;
}

const RightSide = ({
	totalCost,
	isCounponDisabled,
	sendDiscount,
	discountCode,
	onChangeDiscount,
	openPaymentModal,
	errorMessage,
}: RightSideProps) => {
	const { t } = useTranslation('payment');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const onClickSendDiscount = () => {
		if (discountCode !== '') {
			sendDiscount();
		}
	};

	return (
		<RightLayout className={classes.container}>
			<div className={classes.wrapper}>
				<Typography className={classes.title}>{t('payment.right.title')}</Typography>
				<div className={classes.subTitleWrapper}>
					<Typography component="span" variant={matches ? 'h3' : 'body1'}>
						{t('payment.right.payment')}{' '}
					</Typography>
					<Typography className={classes.amount} component="span" variant={matches ? 'h3' : 'body1'}>
						S/{totalCost}
					</Typography>
				</div>
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
				<div className={classes.buttonWrapper}>
					<Button variant="contained" onClick={openPaymentModal} fullWidth>
						{t('payment.right.payButton')}
					</Button>
					{errorMessage ? <FormHelperText error>{errorMessage}</FormHelperText> : null}
				</div>
			</div>
		</RightLayout>
	);
};

export default RightSide;
