import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import { ProfileList, Container, Circle } from 'pages/common';
import { stylesWithTheme, usePageTitle, getAppointmentRedirectPath } from 'utils';
import { BACKGROUND_DEFAULT } from 'theme';
import { AppointmentCreationStep } from 'AppContext';

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

const SelectProfile = () => {
	const { t } = useTranslation('selectProfile');
	const classes = useStyles();
	const history = useHistory();
	const redirectCallback = (appointmentCreationStep: AppointmentCreationStep | undefined) => {
		const redirectPath = getAppointmentRedirectPath(appointmentCreationStep, '/dashboard/citas');
		if (redirectPath === 'back') {
			history.goBack();
		} else {
			history.push(redirectPath);
		}
	};

	usePageTitle('Seleccionar Perfil');
	return (
		<Container className={classes.container}>
			<div className={classes.wrapper}>
				<Typography className={classes.prefix} variant="h3">
					{t('selectProfile.prefix')}
				</Typography>
				<Typography className={classes.title} variant="h1">
					<b>{t('selectProfile.title')}</b>
				</Typography>
				<ProfileList redirectCallback={redirectCallback} />
			</div>
			<Circle className={classes.desktopCircle} radius="80" right="-104" bottom="-122" />
		</Container>
	);
};

export default SelectProfile;
