import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';
import { ReactComponent as InkafarmaIcon } from 'icons/inkafarma.svg';
import { ReactComponent as CartIcon } from 'icons/cart.svg';
import { ReactComponent as PrescriptionIcon } from 'icons/prescription.svg';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';

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
			//width : '1040px'
		},
	},
	content: {
		padding: '68px 26px 0',
		[breakpoints.up('lg')]: {
			padding: '80px 206px 0',
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
			paddingBottom: '20px',
		},
	},
	actionsWrapper: {
		[breakpoints.up('lg')]: {
			width: '401px',
			margin: '0 auto',
		},
	},
	seeQuotedPrescription: {
		marginBottom: '12px',
		padding: '11px 0',
		[breakpoints.up('lg')]: {
			marginBottom: '26px',
			padding: '19.5px 0',
		},
	},
	seeEPrescription: {
		textTransform: 'none',
		padding: '11px 0',
		marginBottom: '28px',
		[breakpoints.up('lg')]: {
			marginBottom: '41px',
			padding: '19.5px 0',
		},
	},
	buttonLabel: {
		marginRight: '15px',
	},
	benefitText: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		margin: '0',
		'& > span': {
			fontSize: '13px',
		},
	},

	cardButton: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: '5px',
		boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.05)',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		margin: '0 16px 22px 0',
		height: '125px',
		// height : '140px',
		textAlign: 'center',
		width: '150px',
		// width : '195px',
		userSelect: 'none',
		border: '1px solid #1ecd96',
		'&:hover': {
			boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.05)',
		},
	},
	wrapperFlex: {
		display: 'flex',
		justifyContent: 'center',
	},
	textCard: {
		fontSize: '10px',
	},

	containerButtonCompartir: {
		display: 'flex',
		background: '#BBF0DF',
		borderRadius: '50px',
		width: 'auto',
	},
	gridText: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		margin: 'auto',
		marginLeft: '15px',
	},
	gridButtom: {
		margin: 'auto',
		textAlign: 'center',
		fontWeight: '600',
	},
	buttonCompartir: {
		padding: '15px',
		background: '#8CE6C9',
		cursor: 'pointer',
	},
	textCompartirTitle: {
		marginBottom: 15,
	},
}));

interface SelectPrescriptionType {
	showQuotedPrescription: () => void;
	openEPrescription: () => void;
}

const SelectPrescriptionType = ({
	showQuotedPrescription,
	openEPrescription,
}: SelectPrescriptionType): ReactElement => {
	const classes = useStyles();
	const { t } = useTranslation('buyPrescription');

	const urlShare = window.location + '';
	const copyShare = () => {
		navigator.clipboard.writeText(urlShare);
	};

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

					<div className={classes.wrapperFlex}>
						<div className={classes.cardButton}>
							<Card onClick={openEPrescription} className={classes.textCard}>
								<div className={classes.iconWrapper}>
									<img className={classes.img} src="icons/cart.svg" alt="working" />
								</div>
								<Typography component="span" color="primary">
									{t('buyPrescription.selectPrescriptionType.ePrescription2')}
								</Typography>
							</Card>
						</div>

						<div className={classes.cardButton}>
							<Card onClick={showQuotedPrescription} className={classes.textCard}>
								<div className={classes.iconWrapper}>
									<img className={classes.img} src="icons/cart.svg" alt="working" />
								</div>
								<Typography component="span" color="primary">
									{t('buyPrescription.selectPrescriptionType.quotedPrescription2')}
								</Typography>
								<InkafarmaIcon className={classes.inkafarmaIcon} />
							</Card>
						</div>

						<div className={classes.cardButton}>
							<Card className={classes.textCard}>
								<div className={classes.iconWrapper}>
									<img className={classes.img} src="icons/cart.svg" alt="working" />
								</div>
								<Typography component="span" color="primary">
									{t('buyPrescription.selectPrescriptionType.callfarma')}
								</Typography>
								<InkafarmaIcon className={classes.inkafarmaIcon} />
							</Card>
						</div>
					</div>

					<div className={classes.textCompartirTitle}>
						<Typography color="primary" component="span">
							{t('buyPrescription.selectPrescriptionType.compartir')}
						</Typography>
					</div>
					<div className={classes.benefitText}>
						<Card className={classes.containerButtonCompartir}>
							<Grid item xs={8} className={classes.gridText}>
								<span>{urlShare}</span>
							</Grid>
							<Grid item xs={4} className={classes.gridButtom}>
								<Card className={classes.buttonCompartir} onClick={copyShare}>
									{t('buyPrescription.selectPrescriptionType.buttomCompartir')}
								</Card>
							</Grid>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectPrescriptionType;
