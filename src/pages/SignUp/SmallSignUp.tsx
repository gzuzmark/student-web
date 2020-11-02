import React, { useState, useCallback, useContext, useLayoutEffect, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormikHelpers } from 'formik';

import { Container, RightLayout, LeftLayout } from 'pages/common';
import { createGuestPatient } from 'pages/api';
import { usePageTitle, stylesWithTheme, isUnderAge, getLocalValue, isYoungerThanFifthteen } from 'utils';

import { SmallSignUpForm, SmallSignUpFormValues } from './components/SmallSignUpForm';
import AppContext, { PAYMENT_STEP } from 'AppContext';
import { PreferPediatrics } from './components';

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
	const { updateState: updateContextState, appointmentCreationStep, useCase } = useContext(AppContext);
	const userToken = getLocalValue('userToken');
	const classes = useStyles();
	const commingFromAppointmentCreation = appointmentCreationStep === PAYMENT_STEP;
	const [isAgeRestrictioModalOpen, setIsAgeRestrictioModalOpen] = useState<boolean>(false);
	const isPediatrics = useCase && useCase.id === '8a0a27a5-8ff0-4534-b863-65a2955a4448';
	const validateAgeAfterSelecting = (date: Date | null) => {
		if (!isPediatrics && date && isYoungerThanFifthteen(date)) {
			setIsAgeRestrictioModalOpen(true);
		}
	};
	const closeAgeRestrictionModal = () => {
		setIsAgeRestrictioModalOpen(false);
	};
	const onSubmit = useCallback(
		async (values: SmallSignUpFormValues, { setFieldError, setSubmitting }: FormikHelpers<SmallSignUpFormValues>) => {
			try {
				if (updateContextState) {
					const newUser = {
						...values,
						email: values.email.trim(),
						identification: values.identification.trim(),
						secondSurname: 'ugito',
						gender: 0,
					};
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
				<SmallSignUpForm onSubmit={onSubmit} validateAgeAfterSelecting={validateAgeAfterSelecting} />
			</RightLayout>
			<PreferPediatrics isModalOpen={isAgeRestrictioModalOpen} closeModal={closeAgeRestrictionModal} />
		</Container>
	);
};

export default SmallSignUp;
