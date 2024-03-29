import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { Container } from 'pages/common';
import mobileLogin from 'icons/mobile_login.png';
import desktopImage from 'icons/login_image.jpg';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';
// import IconBack from 'icons/left2.svg';
import Circle from 'pages/common/Circle';
import AppContext from 'AppContext';
import { usePageTitle, useCurrentUserRediction } from 'utils';

import { LoginForm } from './components';
import useStyles from './styles';

const Login = () => {
	const classes = useStyles();
	const { t } = useTranslation('login');
	const { userToken, appointmentCreationStep, updateState, showSmallSignUp } = useContext(AppContext);

	usePageTitle('Iniciar sesion');
	useCurrentUserRediction({ isUserLoggedIn: !!userToken, redirectPath: '/dashboard/citas' });

	// const onClickGoToStart = () => {
	// 	redirectToURL('https://alivia.pe/botica');
	// };

	return (
		<Container className={classes.container}>
			<div className={classes.imgWrapper}>
				<img className={classes.mobileImg} src={mobileLogin} alt="mobile background" />
				<img className={classes.desktopImg} src={desktopImage} alt="desktop background" />
			</div>
			<div className={classes.loginFormContainer}>
				{/*<div className={classes.goToStartButton} onClick={onClickGoToStart}>*/}
				{/*	<img alt="" src={IconBack} height={20} />*/}
				{/*	<Typography className={classes.goToStartText}>	Ir al inicio</Typography>*/}
				{/*</div>*/}
				<div className={classes.contentWrapper}>
					<BrandLogo className={classes.brandImg} />
					<Typography className={classes.title} variant="h2">
						{t('login.title')}
					</Typography>
					<LoginForm
						updateContextState={updateState}
						appointmentCreationStep={appointmentCreationStep}
						showSmallSignUp={!!showSmallSignUp}
					/>
					<Circle className={classes.desktopCircle} radius="80" right="-80" bottom="-94" />
				</div>
			</div>
		</Container>
	);
};

export default Login;
