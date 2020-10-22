import React, { useCallback, useContext, useLayoutEffect, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormikHelpers } from 'formik';

import { Container, RightLayout, LeftLayout } from 'pages/common';
import { createGuestPatient } from 'pages/api';
import { usePageTitle, stylesWithTheme, isUnderAge, getLocalValue } from 'utils';

import { SmallSignUpForm, SmallSignUpFormValues } from './components/SmallSignUpForm';
import AppContext, { PAYMENT_STEP } from 'AppContext';

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

const SmallSignUp = (): ReactElement => {
	const history = useHistory();
	const { t } = useTranslation('signUp');
	const { updateState: updateContextState, appointmentCreationStep } = useContext(AppContext);
	const userToken = getLocalValue('userToken');
	const classes = useStyles();
	const commingFromAppointmentCreation = appointmentCreationStep === PAYMENT_STEP;
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

	usePageTitle('Informacion del paciente');
	useLayoutEffect(() => {
		if (!commingFromAppointmentCreation) {
			history.push(!!userToken ? '/dashboard/citas' : '/iniciar_sesion');
		}
		// eslint-disable-next-line
	}, []);

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
				<SmallSignUpForm onSubmit={onSubmit} />
			</RightLayout>
		</Container>
	);
};

export default SmallSignUp;
