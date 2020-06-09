import React, { useState, useEffect, useContext, useCallback, useLayoutEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Location } from 'history';
import { useTranslation } from 'react-i18next';

import { Container, RightLayout } from 'pages/common';
import { createPatient, getCurrentUser } from 'pages/api';
import { usePageTitle, useCurrentUserRediction, setLocalValue } from 'utils';
import AppContext, { PAYMENT_STEP } from 'AppContext';

import { LeftSide, AboutMe, AboutMeValues, MedicalData, MedicalDataValues, Contact, ContactValues } from './components';

const subRoutes = ['contacto', 'datos_medicos', 'sobre_ti'];
const findStep = (location: Location) =>
	subRoutes.findIndex((route: string) => location && location.pathname === `/registro/${route}`);
const checkStep = (
	location: Location,
	contactInfo: ContactValues | undefined,
	push: Function,
	medicalData: MedicalDataValues | undefined,
) => {
	const index = findStep(location);
	if (index === 1 && !contactInfo) {
		push('registro/sobre_ti');
	} else if (index === 2 && !medicalData) {
		push('registro/datos_medicos');
	}
};

const SignUp = () => {
	const { push, listen, location } = useHistory();
	const { t } = useTranslation('signUp');
	const [step, setStep] = useState<number>(0);
	const [localUserToken, setLocalUserToken] = useState<string>();
	const [contactInfo, setContactInfo] = useState<ContactValues>();
	const [medicalData, setMedicalData] = useState<MedicalDataValues>();
	const { userToken, updateState, appointmentOwner } = useContext(AppContext);
	const changeLocalUserToken = (token: string) => {
		setLocalUserToken(token);
	};
	const onChangeStep = (values: ContactValues | MedicalDataValues) => {
		if (step === 0) {
			setContactInfo(values as ContactValues);
		} else if (step === 1) {
			setMedicalData(values as MedicalDataValues);
		}

		push(`/registro/${subRoutes[step + 1]}`);
	};
	const submitSignUp = useCallback(
		async (aboutUser: AboutMeValues, setSubmitting: Function, setFieldError: Function) => {
			if (updateState) {
				const newUser = {
					...(medicalData as MedicalDataValues),
					...aboutUser,
				};

				if (localUserToken) {
					const reservationAccountID = await createPatient(newUser, setFieldError, localUserToken);

					if (reservationAccountID) {
						// eslint-disable-next-line
						const [_, user] = await getCurrentUser(localUserToken);
						setLocalValue('userToken', localUserToken);
						updateState({
							reservationAccountID,
							userToken: localUserToken,
							user,
							appointmentCreationStep: PAYMENT_STEP,
						});
						push('/pago');
					} else {
						setFieldError('identification', t('aboutMe.fields.identification.error'));
					}
				}
			}
			setSubmitting(false);
		},
		[localUserToken, medicalData, push, t, updateState],
	);

	usePageTitle('Registro');
	useCurrentUserRediction(userToken, '/citas');
	useLayoutEffect(() => {
		checkStep(location, contactInfo, push, medicalData);
	}, [contactInfo, location, medicalData, push]);

	useEffect(() => {
		const removeListener = listen((location: Location) => {
			const index = findStep(location);

			if (index >= 0) {
				setStep(index);
			}
		});

		return function cleanup() {
			removeListener();
		};
	}, [listen]);

	return (
		<Container>
			<LeftSide step={step} />
			<RightLayout>
				<Switch>
					<Route exact path="/registro/contacto">
						<Contact
							contactInfo={contactInfo}
							onChangeStep={onChangeStep}
							appointmentOwner={appointmentOwner}
							changeLocalUserToken={changeLocalUserToken}
						/>
					</Route>
					<Route exact path="/registro/datos_medicos">
						<MedicalData medicalData={medicalData} onChangeStep={onChangeStep} />
					</Route>
					<Route path="/registro/sobre_ti">
						<AboutMe submitSignUp={submitSignUp} />
					</Route>
					<Route exact path="/registro/*">
						<Redirect to="/registro/contacto" />
					</Route>
				</Switch>
			</RightLayout>
		</Container>
	);
};

export default SignUp;
