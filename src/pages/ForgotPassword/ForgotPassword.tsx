import React from 'react';
import { Theme } from '@material-ui/core/styles';

import { Container, Circle } from 'pages/common';
import { stylesWithTheme } from 'utils';
import { BACKGROUND_DEFAULT } from 'theme';

import ForgotPasswordForm from './components/ForgotPasswordForm';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		backgroundColor: BACKGROUND_DEFAULT,
		minHeight: 'calc(100vh - 50px)',
		[breakpoints.up('lg')]: {
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'center',
			minHeight: 'calc(100vh - 80px)',
			position: 'relative',
			overflow: 'hidden',
		},
	},
	desktopCircle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
}));

const ForgotPassword = () => {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<ForgotPasswordForm />
			<Circle className={classes.desktopCircle} radius="80" right="-159" bottom="118" />
		</Container>
	);
};

export default ForgotPassword;
