import React, { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
	subTitleWrapper: {
		paddingBottom: '17px',
		[breakpoints.up('lg')]: {
			paddingBottom: '32px',
		},
	},
	buttonWrapper: {
		[breakpoints.up('lg')]: {
			maxWidth: '401px',
		},
	},
}));

interface RightSideProps {
	openPaymentModal: (e: MouseEvent) => void;
	totalCost: string | undefined;
	errorMessage: string;
}

const RightSide = ({ totalCost, openPaymentModal, errorMessage }: RightSideProps) => {
	const { t } = useTranslation('payment');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<RightLayout className={classes.container}>
			<div className={classes.wrapper}>
				<Typography className={classes.title}>{t('payment.right.title')}</Typography>
				<div className={classes.subTitleWrapper}>
					<Typography component="span" variant={matches ? 'h3' : 'body1'}>
						{t('payment.right.payment')}{' '}
					</Typography>
					<Typography component="span" variant={matches ? 'h3' : 'body1'}>
						S/{totalCost}
					</Typography>
				</div>
				<div className={classes.buttonWrapper}>
					<Button fullWidth variant="contained" onClick={openPaymentModal}>
						{t('payment.right.payButton')}
					</Button>
					{errorMessage ? <FormHelperText error>{errorMessage}</FormHelperText> : null}
				</div>
			</div>
		</RightLayout>
	);
};

export default RightSide;
