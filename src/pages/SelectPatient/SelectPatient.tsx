import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import { PatientList, Container, Circle } from 'pages/common';
import { stylesWithTheme, usePageTitle, getAppointmentRedirectPath } from 'utils';
import { BACKGROUND_DEFAULT } from 'theme';
import AppContext, { MYSELF, GUEST, User } from 'AppContext';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		backgroundColor: BACKGROUND_DEFAULT,
		minHeight: 'calc(100vh - 50px)',
		[breakpoints.up('lg')]: {
			display: 'flex',
			justifyContent: 'center',
			minHeight: 'calc(100vh - 80px)',
			position: 'relative',
			overflow: 'hidden',
		},
	},
	wrapper: {
		paddingTop: '127px',
		textAlign: 'center',
	},
	prefix: {
		paddingBottom: '5px',
	},
	title: {
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			paddingBottom: '51px',
		},
	},
	desktopCircle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
}));

const SelectPatient = () => {
	const { t } = useTranslation('selectProfile');
	const classes = useStyles();
	const history = useHistory();
	const { updateState: updateContextState, appointmentCreationStep, showSmallSignUp } = useContext(AppContext);
	const onUserClick = (user: User) => {
		const redirectPath = getAppointmentRedirectPath(appointmentCreationStep, {
			defaultRedirectPath: '/dashboard/citas',
		});

		if (updateContextState) {
			updateContextState({
				appointmentOwner: MYSELF,
				patientUser: user,
				reservationAccountID: user.id,
			});
		}

		if (redirectPath === 'back') {
			history.push('/pago_laboratory');
		} else {
			history.push('/pago_laboratory');
		}
	};
	const redirectNewAccountCallback = () => {
		if (updateContextState) {
			updateContextState({
				appointmentOwner: GUEST,
			});

			if (showSmallSignUp) {
				console.log('ggggggg');
				history.push('/informacion_paciente');
			} else {
				history.push('/pago_laboratory');
			}
		}
	};

	usePageTitle('Seleccionar Paciente');

	return (
		<Container className={classes.container}>
			<div className={classes.wrapper}>
				<Typography className={classes.prefix} variant="h3">
					{t('selectProfile.prefix')}
				</Typography>
				<Typography className={classes.title} variant="h1">
					<b>{t('selectProfile.title')}</b>
				</Typography>
				<PatientList onUserCardClick={onUserClick} redirectNewAccountCallback={redirectNewAccountCallback} />
			</div>
			<Circle className={classes.desktopCircle} radius="80" right="-104" bottom="-122" />
		</Container>
	);
};

export default SelectPatient;
