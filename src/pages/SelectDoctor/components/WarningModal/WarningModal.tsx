import React from 'react';
import { Theme } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';
import { stylesWithTheme } from 'utils';
import { useTranslation } from 'react-i18next';

import { ReactComponent as NutritionIcon } from 'icons/nutrition.svg';

interface PropsWarningModal {
	isOpen: boolean;
	onCancel: () => void;
	onAccept: () => void;
}

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	modalContainer: {
		borderRadius: '10px',
		position: 'relative',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'white',
		padding: '1rem',
		width: '100%',
		height: '100%',
		[breakpoints.up('md')]: {
			width: '889px',
			height: '478px',
		},
	},
	modalContent: {
		height: '100%',
		textAlign: 'center',
		[breakpoints.up('md')]: {
			display: 'flex',
			alignItems: 'center',
			textAlign: 'left',
		},
	},
	imageContainer: {
		width: '40%',
		textAlign: 'center',
		alignSelf: 'center',
		margin: 'auto',
	},
	textContainer: {
		alignSelf: 'center',
	},
	title: {
		fontSize: '26px',
		lineHeight: '40px',
		letterSpacing: '0.2px',
		color: palette.text.primary,
	},
	bold: {
		fontWeight: 900,
	},
	conditions: {
		textAlign: 'left',
		listStyleType: 'none',
		paddingLeft: '20px',
		'& > li': {
			fontSize: '14px',
			lineHeight: '25px',
			color: palette.text.primary,
		},
	},
	terms: {
		fontSize: '12px',
		lineHeight: '15px',
		color: palette.text.primary,
		paddingRight: '0',
		[breakpoints.up('md')]: {
			paddingRight: '120px',
		},
	},
	buttonsContainer: {
		marginTop: '37px',
	},
	button: {
		fontSize: '12px',
		padding: '12px 22px',
		marginRight: '10px',
		textTransform: 'none',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none',
		},
		[breakpoints.up('md')]: {
			fontSize: '18px',
			padding: '15px 25px',
			marginRight: '34px',
		},
	},
}));

const WarningModal = ({ isOpen, onCancel, onAccept }: PropsWarningModal) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');

	return (
		<Modal open={isOpen} onClose={onCancel}>
			<div className={classes.modalContainer}>
				<div className={classes.modalContent}>
					<div className={classes.imageContainer}>
						<NutritionIcon />
					</div>
					<div className={classes.textContainer}>
						<div className={classes.title}>
							{t('warning.modal.title')} <span className={classes.bold}>{t('warning.modal.dont')}</span>
						</div>
						<div>
							<ul className={classes.conditions}>
								<li>{t('warning.modal.firstCondition')}</li>
								<li>{t('warning.modal.secondCondition')}</li>
								<li>{t('warning.modal.thirdCondition')}</li>
								<li>{t('warning.modal.fourthCondition')}</li>
								<li>{t('warning.modal.fifthCondition')}</li>
							</ul>
						</div>
						<div className={classes.terms}>
							{t('warning.modal.termsFirst')} <span className={classes.bold}>{t('warning.modal.termsBold')}</span>{' '}
							{t('warning.modal.termsSecond')}
						</div>
						<div className={classes.buttonsContainer}>
							<Button className={classes.button} variant="outlined" color="primary" onClick={onCancel}>
								{t('warning.modal.cancel')}
							</Button>
							<Button className={classes.button} variant="contained" color="primary" onClick={onAccept}>
								{t('warning.modal.accept')}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default WarningModal;
