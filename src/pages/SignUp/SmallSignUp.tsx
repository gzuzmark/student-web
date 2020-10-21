import React, { useCallback, ReactElement } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormikHelpers } from 'formik';

import { Container, RightLayout, LeftLayout } from 'pages/common';
import { createGuestPatient } from 'pages/api';
import { usePageTitle, stylesWithTheme, isUnderAge } from 'utils';

import { SmallSignUpForm, SmallSignUpFormValues } from './components/SmallSignUpForm';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '18px 34px 20px 34px',
		[breakpoints.up('lg')]: {
			padding: '128px 60px 0 40px',
		},
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		[breakpoints.up('lg')]: {
			textAlign: 'left',
			paddingRight: '10px',
		},
	},
}));

export interface SmallSignUpProps {
	updateContextState: Function | undefined;
	userToken: string | undefined;
}

const SmallSignUp = ({ updateContextState, userToken }: SmallSignUpProps): ReactElement | null => {
	const history = useHistory();
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const onSubmit = useCallback(
		async (values: SmallSignUpFormValues, { setFieldError, setSubmitting }: FormikHelpers<SmallSignUpFormValues>) => {
			try {
				if (updateContextState) {
					const newUser = { ...values, secondSurname: 'ugito', gender: 0 };
					const isAChild = newUser.birthDate && isUnderAge(newUser.birthDate);
					const reservationAccountID = await createGuestPatient(newUser);
					const patientUser = { id: reservationAccountID, ...newUser, isUnderAge: true };

					updateContextState({ triage: [], userFiles: [], userToken, patientUser, isUnderAge: isAChild });

					history.push('/pago');
				}
			} catch (e) {
				setFieldError('identification', 'test');
			} finally {
				setSubmitting(false);
			}
		},
		[history, updateContextState, userToken],
	);

	usePageTitle('Sobre ti');

	return (
		<Container>
			<LeftLayout>
				<div className={classes.wrapper}>
					<Typography className={classes.title} variant="h1">
						{t('smallSignUp.title')}
					</Typography>
				</div>
			</LeftLayout>
			<RightLayout>
				<Switch>
					<Route exact path="/registro/sobre_ti">
						<SmallSignUpForm onSubmit={onSubmit} />
					</Route>
					<Route path="/registro/*">
						<Redirect to="/registro/datos_medicos" />
					</Route>
				</Switch>
			</RightLayout>
		</Container>
	);
};

export default SmallSignUp;
