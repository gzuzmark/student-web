import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { Location } from 'history';

import { Container, RightLayout } from 'pages/common';
import { createPatient, createAccount, createGuestPatient, UseCase } from 'pages/api';
import { usePageTitle, setLocalValue, isYoungerThanFifthteen, isUnderAge } from 'utils';
import { PAYMENT_STEP, GUEST, TriagePair, AppointmentOwner, User } from 'AppContext';

import {
	LeftSide,
	AboutMe,
	AboutMeValues,
	MedicalData,
	MedicalDataValues,
	Contact,
	ContactValues,
	PreferPediatrics,
} from './components';
import { SUB_ROUTES, checkStep, findStep, formatNewUser, updateTriageQuestion } from './utils';

interface NewUserProps {
	updateState: Function | undefined;
	appointmentOwner: AppointmentOwner | undefined;
	useCase: UseCase | null | undefined;
	triage: TriagePair[] | undefined;
	isUserLoggedIn: boolean;
	commingFromAppointmentCreation: boolean;
	currentUser: User | null | undefined;
}
const GENERAL_MEDICINE = 'Quiero una orientación médica';

const NewUser = ({
	isUserLoggedIn,
	commingFromAppointmentCreation,
	updateState,
	appointmentOwner,
	useCase,
	triage,
	currentUser,
}: NewUserProps) => {
	const { push, listen, location } = useHistory();
	const [step, setStep] = useState<number>(0);
	const [aboutMeData, setAboutMeData] = useState<AboutMeValues>();
	const [medicalData, setMedicalData] = useState<MedicalDataValues>();
	const [isAgeRestrictioModalOpen, setIsAgeRestrictioModalOpen] = useState<boolean>(false);
	const [isAChild, setIsAChild] = useState<boolean>(false);
	const isGuest = appointmentOwner === GUEST;
	const validateAgeAfterSelecting = (date: Date | null) => {
		if (useCase && useCase.name === GENERAL_MEDICINE && date && isYoungerThanFifthteen(date)) {
			setIsAgeRestrictioModalOpen(true);
		}
		if (date && isUnderAge(date)) {
			setIsAChild(true);
		}
	};
	const closeAgeRestrictionModal = () => {
		setIsAgeRestrictioModalOpen(false);
	};
	const onChangeStep = (values: AboutMeValues | MedicalDataValues) => {
		if (step === 0) {
			setAboutMeData(values as AboutMeValues);
		} else if (step === 1) {
			const dataValues = { ...values } as MedicalDataValues;
			setMedicalData(dataValues);
			if (updateState) {
				// Send after the payment screen to create an appointment
				const withNewDiscomfort = updateTriageQuestion(
					'De acuerdo, describe el malestar:',
					dataValues.consultReason,
					triage,
				);
				const withNewOwner = updateTriageQuestion(
					'¿Para quién es la consulta?',
					isGuest ? 'relative' : appointmentOwner || '',
					withNewDiscomfort,
				);
				updateState({ triage: withNewOwner });
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
				let patientUser = null;
				let reservationAccountID = '';
				let redirectPath = '/pago';
				let appointmentCreationStep = PAYMENT_STEP;

				// If the user is a Guest then, he is creating an appointment, thus an appointment is created with an empty token
				// If the user is not a Guest, but is creating an appointment, then we need to create him an account token and with that token create an appoinment
				// If the user is not a guest and is not creating an appointment, then we should only create him an account token and redirect him to /citas

				if (isGuest || (!isGuest && !isUserLoggedIn)) {
					reservationAccountID = await createGuestPatient(newUser);
					patientUser = { id: reservationAccountID, ...formatNewUser(newUser), isUnderAge: isAChild };
					localUserToken = currentUser?.id;
				} else if (!isGuest && useCase) {
					localUserToken = await createAccount(contactInfo);
					reservationAccountID = await createPatient(newUser, localUserToken);
					user = { id: reservationAccountID, ...formatNewUser(newUser), isUnderAge: isAChild };

					setLocalValue('userToken', localUserToken);
				} else {
					localUserToken = await createAccount(contactInfo);
					reservationAccountID = await createPatient(newUser, localUserToken);
					user = { id: reservationAccountID, ...formatNewUser(newUser), isUnderAge: isAChild };
					redirectPath = '/dashboard/citas';
					appointmentCreationStep = '';

					setLocalValue('userToken', localUserToken);
				}

				updateState({
					reservationAccountID,
					userToken: localUserToken,
					user,
					patientUser,
					appointmentCreationStep,
					userFiles: medicalData?.files || [],
				});
				push(redirectPath);
			}
		},
		[aboutMeData, currentUser, isAChild, isGuest, isUserLoggedIn, medicalData, push, updateState, useCase],
	);

	usePageTitle('Registro');

	useLayoutEffect(() => {
		if (!commingFromAppointmentCreation) {
			push(isUserLoggedIn ? '/dashboard/citas' : '/iniciar_sesion');
		}
		// eslint-disable-next-line
	}, []);
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
						<AboutMe
							aboutMeData={aboutMeData}
							appointmentOwner={appointmentOwner}
							onChangeStep={onChangeStep}
							validationOnChange={validateAgeAfterSelecting}
						/>
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
				<PreferPediatrics isModalOpen={isAgeRestrictioModalOpen} closeModal={closeAgeRestrictionModal} />
			</RightLayout>
		</Container>
	);
};

export default NewUser;
