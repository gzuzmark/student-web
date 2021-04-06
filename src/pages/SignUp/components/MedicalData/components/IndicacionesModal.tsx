import React, { ReactElement } from 'react';
import { Modal, Button, Typography } from '@material-ui/core';
import { FloatCard } from 'pages/common';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { ReactComponent as ThumbsUpIcon } from 'icons/good_quality.svg';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	card: {
		left: '50%',
		position: 'relative',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		width: '327px',
		[breakpoints.up('lg')]: {
			width: '856px',
		},
	},
	wrapper: {
		textAlign: 'center',
		padding: '49px 17px 60px',
		[breakpoints.up('lg')]: {
			padding: '68px 0 121px',
		},
	},
	title: {
		fontFamily: 'Playfair Display',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '25px',
		lineHeight: '28px',
		paddingBottom: '42px',
		[breakpoints.up('lg')]: {
			padding: '0 240px 28px',
			fontSize: '35px',
			lineHeight: '40px',
		},
	},
	iconWrapper: {
		display: 'inline-block',
		paddingBottom: '49px',
		width: '96px',
		height: '96px',
		[breakpoints.up('lg')]: {
			paddingBottom: '24px',
		},
	},
	body: {
		paddingBottom: '25px',
		fontSize: '15px',
		lineHeight: '18px',

		[breakpoints.up('lg')]: {
			padding: '0 280px 30px',
			lineHeight: '20px',
		},
	},
	actions: {
		[breakpoints.up('lg')]: {
			display: 'flex',
			justifyContent: 'center',
		},
	},
	action: {
		width: '293px',
		[breakpoints.up('lg')]: {
			width: '300px',
		},
	},
}));

export interface IndicacionesModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const IndicacionesModal = ({ isOpen, onClose }: IndicacionesModalProps): ReactElement => {
	const classes = useStyles();
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const { t } = useTranslation('askAddress');

	return (
		<Modal open={isOpen} onClose={onClose}>
			<FloatCard className={classes.card} height={isDesktop ? 515 : 478} width={isDesktop ? 856 : 327} mobile>
				<div className={classes.wrapper}>
					<Typography variant="h2" className={classes.title}>
						{t('HOLAAAA SOY JOEL')}
					</Typography>
					<div className={classes.iconWrapper}>
						<ThumbsUpIcon />
					</div>
					<Typography className={classes.body}>
						<div>{t('ASDASDASDASDASDASDASDADSASDASDASDASDADSADS')}</div>
						<div>{t('ZXCZCXZXCXCZXCCZXCZXCZXCZXCZXCZCZXCZXCZXCC')}</div>
					</Typography>
				</div>
			</FloatCard>
		</Modal>
	);
};

export default IndicacionesModal;
