import React from 'react';
import { Dialog, Typography, Button, useMediaQuery } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { Benefit } from 'pages/api';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '63px 58px 0',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
			padding: '148px 300px',
		},
	},
	title: {
		marginBottom: '32px',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			marginBottom: '22px',
		},
	},
	description: {
		fontSize: '18px',
		marginBottom: '10px',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			marginBottom: '22px',
		},
	},
	actions: {
		display: 'flex',
		flexDirection: 'column-reverse',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
			justifyContent: 'center',
		},
	},
	rejectAction: {
		textTransform: 'none',
		textDecoration: 'none',
		[breakpoints.up('lg')]: {
			marginRight: '38px',
			width: '292px',
		},
	},
	acceptAction: {
		marginBottom: '21px',
		[breakpoints.up('lg')]: {
			marginBottom: '0px',
			width: '292px',
		},
	},
	boldText: {
		fontWeight: 'bold',
	},
}));

interface InformBenefitProps {
	isModalOpen: boolean;
	closeModal: () => void;
	benefit: Benefit;
	acceptBenefit: () => void;
}

const InformBenefit = ({ isModalOpen, closeModal, benefit, acceptBenefit }: InformBenefitProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	return (
		<Dialog open={isModalOpen} onClose={closeModal} fullScreen={!matches} maxWidth="lg">
			<div className={classes.wrapper}>
				<div>
					<Typography className={classes.title} variant="h2">
						{t('informationBenefit.title')}
					</Typography>
					<p className={classes.description}>
						{benefit.description} <span className={classes.boldText}> {benefit.expirationDate}</span> .
					</p>
					<p className={classes.description}> {t('informationBenefit.warning')} </p>
					<p className={classes.description}>
						{t('informationBenefit.question')} <span className={classes.boldText}></span> .
					</p>
					<div className={classes.actions}>
						<Button className={classes.rejectAction} variant={matches ? 'outlined' : 'text'} onClick={closeModal}>
							{t('informationBenefit.rejectLabel')}
						</Button>
						<Button className={classes.acceptAction} variant="contained" onClick={acceptBenefit}>
							{t('informationBenefit.acceptLabel')}
						</Button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default InformBenefit;
