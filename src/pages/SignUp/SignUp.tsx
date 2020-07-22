import React, { useState, useEffect, useContext, useCallback, useLayoutEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { Location } from 'history';

import { Container, RightLayout } from 'pages/common';
import { createPatient, createAccount, createGuestPatient } from 'pages/api';
import { usePageTitle, useCurrentUserRediction, setLocalValue } from 'utils';
import AppContext, { PAYMENT_STEP, GUEST } from 'AppContext';

import { LeftSide, AboutMe, AboutMeValues, MedicalData, MedicalDataValues, Contact, ContactValues } from './components';
import { SUB_ROUTES, checkStep, findStep, formatNewUser, updateTriageQuestion } from './utils';

const SignUp = () => {
	const { push, listen, location } = useHistory();
	const [step, setStep] = useState<number>(0);
	const [aboutMeData, setAboutMeData] = useState<AboutMeValues>();
	const [medicalData, setMedicalData] = useState<MedicalDataValues>();
	const { userToken, updateState, appointmentOwner, useCase, triage } = useContext(AppContext);
	const isGuest = appointmentOwner === GUEST;
	const onChangeStep = (values: AboutMeValues | MedicalDataValues) => {
		if (step === 0) {
			setAboutMeData(values as AboutMeValues);
		} else if (step === 1) {
			const dataValues = { ...values } as MedicalDataValues;
			setMedicalData(dataValues);
			if (updateState) {
				const newTriage = updateTriageQuestion('De acuerdo, describe el malestar:', dataValues.consultReason, triage);
				updateState({ triage: newTriage });
			}
		}

		push(`/registro/${SUB_ROUTES[step + 1]}`);
	};
	const submitSignUp = useCallback(
		async (contactInfo: ContactValues) => {
			if (updateState) {
				const newUser = {
					...(aboutMeData as AboutMeValues),
					...(medicalData as MedicalDataValues),
					...contactInfo,
				};
				let localUserToken = null;
				let user = null;
				let reservationAccountID = '';
				let redirectPath = '/pago';
				let appointmentCreationStep = PAYMENT_STEP;

				// If the user is a Guest then, he is creating an appointment, thus an appointment is created with an empty token
				// If the user is not a Guest, but is creating an appointment, then we need to create him an account token and with that token create an appoinment
				// If the user is not a guest and is not creating an appointment, then we should only create him an account token and redirect him to /citas

				if (isGuest) {
					reservationAccountID = await createGuestPatient(newUser);
					user = { id: '', ...formatNewUser(newUser) };
				} else if (!isGuest && useCase) {
					localUserToken = await createAccount(contactInfo);
					reservationAccountID = await createPatient(newUser, localUserToken);
					user = { id: reservationAccountID, ...formatNewUser(newUser) };

					setLocalValue('userToken', localUserToken);
				} else {
					localUserToken = await createAccount(contactInfo);
					reservationAccountID = await createPatient(newUser, localUserToken);
					user = { id: reservationAccountID, ...formatNewUser(newUser) };
					redirectPath = '/dashboard/citas';
					appointmentCreationStep = '';

					setLocalValue('userToken', localUserToken);
				}

				updateState({
					reservationAccountID,
					userToken: localUserToken,
					user,
					appointmentCreationStep,
				});
				push(redirectPath);
			}
		},
		[aboutMeData, isGuest, medicalData, push, updateState, useCase],
	);

	usePageTitle('Registro');
	useCurrentUserRediction(userToken, '/dashboard/citas');
	useLayoutEffect(() => {
		checkStep(location, aboutMeData, push, medicalData);
	}, [aboutMeData, location, medicalData, push]);

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
					<Route path="/registro/sobre_ti">
						<AboutMe aboutMeData={aboutMeData} appointmentOwner={appointmentOwner} onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/registro/datos_medicos">
						<MedicalData medicalData={medicalData} onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/registro/contacto">
						<Contact submitSignUp={submitSignUp} isGuest={isGuest} />
					</Route>
					<Route path="/registro/*">
						<Redirect to="/registro/sobre_ti" />
					</Route>
				</Switch>
			</RightLayout>
		</Container>
	);
};

export default SignUp;
