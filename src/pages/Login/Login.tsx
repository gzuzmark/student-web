import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { Container } from 'pages/common';
import mobileLogin from 'icons/mobile_login.png';
import desktopImage from 'icons/login_image.png';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import Circle from 'pages/common/Circle';
import AppContext from 'AppContext';
import { usePageTitle, useCurrentUserRediction } from 'utils';

import { LoginForm } from './components';
import useStyles from './styles';

const Login = () => {
	const classes = useStyles();
	const { t } = useTranslation('login');
	const { user: currentUser, appointmentCreationStep } = useContext(AppContext);

	usePageTitle('Registro');
	useCurrentUserRediction(currentUser, '/citas');

	return (
		<Container className={classes.container}>
			<div className={classes.imgWrapper}>
				<img className={classes.mobileImg} src={mobileLogin} alt="mobile background" />
				<img className={classes.desktopImg} src={desktopImage} alt="desktop background" />
			</div>
			<div className={classes.loginFormContainer}>
				<div className={classes.contentWrapper}>
					<BrandLogo className={classes.brandImg} />
					<Typography className={classes.title} variant="h2">
						{t('login.title')}
					</Typography>
					<LoginForm appointmentCreationStep={appointmentCreationStep} />
					<Circle className={classes.desktopCircle} radius="80" right="-80" bottom="-94" />
				</div>
			</div>
		</Container>
	);
};

export default Login;
