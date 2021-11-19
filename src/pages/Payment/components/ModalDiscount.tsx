import React from 'react';
import { Dialog, Typography, Button, useMediaQuery } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DiscountImage } from 'icons/descuentoModalImg.svg';

import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		width: '756px',
		height: '650px',
		// padding: '63px 58px 0',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',

			// padding: '148px 300px',
		},
		[breakpoints.down('sm')]: {
			flexDirection: 'row',
			width: '312px',
			height: '620px',
			display: 'block',
			// padding: '148px 300px',
		},
	},
	title: {
		fontFamily: 'Mulish, sans-serif',
		marginBottom: '32px',
		textAlign: 'center',
		color: '#676F8F',
		fontSize: '16px',
		[breakpoints.up('lg')]: {
			marginBottom: '22px',
		},
		[breakpoints.down('sm')]: {
			marginTop: '80px',
			// padding: '148px 300px',
		},
	},
	description: {
		fontFamily: 'Mulish, sans-serif',
		fontSize: '16px',
		marginBottom: '10px',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			marginBottom: '22px',
		},
	},
	actions: {
		display: 'flex',
		marginTop: '60px',
		flexDirection: 'column-reverse',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
			justifyContent: 'center',
		},
		[breakpoints.down('sm')]: {
			alignItems: 'center',
			// padding: '148px 300px',
		},
	},
	rejectAction: {
		fontFamily: 'Mulish, sans-serif',
		textTransform: 'none',
		textDecoration: 'none',
		fontSize: '16px',
		[breakpoints.up('lg')]: {
			marginRight: '38px',
			width: '180px',
		},
		[breakpoints.down('sm')]: {
			width: '264px',
			// padding: '148px 300px',
		},
	},
	acceptAction: {
		fontFamily: 'Mulish, sans-serif',
		marginBottom: '21px',
		fontSize: '16px',
		[breakpoints.up('lg')]: {
			marginBottom: '0px',
			width: '180px',
		},
		[breakpoints.down('sm')]: {
			width: '264px',
			// padding: '148px 300px',
		},
	},
	boldText: {
		fontWeight: 'bold',
	},
	descriptionContainer: {
		width: '440px',
		height: '128px',
		display: 'flex',
		flexWrap: 'wrap',
		margin: '0 auto',
		background: '#F7F8FC',
		justifyContent: 'center',
		alignItems: 'center',
		[breakpoints.down('sm')]: {
			width: '264px',
			height: '180px',
			// padding: '148px 300px',
		},
	},
	imageDescription: {
		width: '55px',
		height: '60.5px',
	},
	imageSVG: {
		width: '100%',
		height: '100%',
	},
	textDescription: {
		fontFamily: 'Mulish, sans-serif',
		width: '300px',
		height: '68px',
		color: '##494F66',
		padding: '26px 24px',
		fontWeight: 'bold',
		fontSize: '24px',
		[breakpoints.down('sm')]: {
			textAlign: 'center',
		},
	},
	discount: {
		color: '#1ECD96',
		fontSize: '24px',
		fontWeight: 'bold',
	},
	mainContainer: {
		width: '312px',
		height: '580px',
	},
}));

interface ModalDiscountProps {
	isModalOpen: boolean;
	closeModalDiscountReject: () => void;
	closeModalDiscounAccept: () => void;
	discountTotal: string;
}

const ModalDiscount = ({
	isModalOpen,
	closeModalDiscountReject,
	closeModalDiscounAccept,
	discountTotal,
}: ModalDiscountProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	return (
		<Dialog open={isModalOpen} onClose={closeModalDiscountReject} maxWidth="md">
			<div className={classes.wrapper}>
				<div>
					<Typography className={classes.title} variant="h2">
						{t('talonModalDiscount.title')}
					</Typography>

					<div className={classes.descriptionContainer}>
						<div className={classes.imageDescription}>
							{/*<img src="" alt=""/>*/}
							<DiscountImage className={classes.imageSVG} />
						</div>
						<div className={classes.textDescription}>
							{t('talonModalDiscount.descriptionLabel1')}
							<span className={classes.discount}>{discountTotal}</span>
							{t('talonModalDiscount.descriptionLabel2')}
						</div>
					</div>
					<p className={classes.description}>
						{t('informationBenefit.question')} <span className={classes.boldText}></span> .
					</p>
					<div className={classes.actions}>
						<Button
							className={classes.rejectAction}
							variant={matches ? 'outlined' : 'text'}
							onClick={closeModalDiscountReject}
						>
							{t('informationBenefit.rejectLabel')}
						</Button>
						<Button className={classes.acceptAction} variant="contained" onClick={closeModalDiscounAccept}>
							{t('informationBenefit.acceptLabel')}
						</Button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default ModalDiscount;
