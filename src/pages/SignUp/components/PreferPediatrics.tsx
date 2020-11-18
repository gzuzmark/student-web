import React from 'react';
import { Dialog, Typography, Button, useMediaQuery } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Alert } from 'icons/mainAlert.svg';
import { stylesWithTheme, addGAEvent } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '63px 58px 0',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
			padding: '148px 129px',
		},
	},
	iconWrapper: {
		marginBottom: '37px',
		[breakpoints.up('lg')]: {
			marginRight: '112px',
			marginBottom: '0',
		},
	},
	title: {
		marginBottom: '32px',
		[breakpoints.up('lg')]: {
			marginBottom: '22px',
		},
	},
	actions: {
		display: 'flex',
		flexDirection: 'column-reverse',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
		},
	},
	omitAction: {
		textTransform: 'none',
		textDecoration: 'none',
		[breakpoints.up('lg')]: {
			marginRight: '38px',
			width: '174px',
		},
	},
	createAction: {
		marginBottom: '21px',
		[breakpoints.up('lg')]: {
			marginBottom: '0px',
			width: '292px',
		},
	},
}));

interface PreferPrediatricsProps {
	isModalOpen: boolean;
	closeModal: () => void;
}

const PreferPrediatrics = ({ isModalOpen, closeModal }: PreferPrediatricsProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const createNewAppointment = () => {
		addGAEvent({
			category: 'Agendar cita - Paso 2.2 - Popup',
			action: 'Recomendación pediatría',
			label: 'Agendar con pediatria',
		});
		window.location.href =
			'https://alivia-pacientes.web.app/seleccionar_doctor?malestar=8a0a27a5-8ff0-4534-b863-65a2955a4448&show=1';
	};

	return (
		<Dialog open={isModalOpen} onClose={closeModal} fullScreen={!matches} maxWidth="lg">
			<div className={classes.wrapper}>
				<div className={classes.iconWrapper}>
					<Alert />
				</div>
				<div>
					<Typography className={classes.title} variant="h2">
						{t('preferPediatrics.title')}
					</Typography>
					<div className={classes.actions}>
						<Button className={classes.omitAction} variant={matches ? 'outlined' : 'text'} onClick={closeModal}>
							{t('preferPediatrics.omitLabel')}
						</Button>
						<Button className={classes.createAction} variant="contained" onClick={createNewAppointment}>
							{t('preferPediatrics.createPediatricsAppointment')}
						</Button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default PreferPrediatrics;
