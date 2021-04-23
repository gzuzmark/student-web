import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { Location } from 'history';

import { Container, RightLayout } from 'pages/common';
import { UseCase } from 'pages/api';
import { usePageTitle, addGAEvent } from 'utils';
import { AppointmentOwner, User } from 'AppContext';

import { LeftSide, Exam, ExamDataValues, Laboratory, ContactValues } from './components';
import { SUB_ROUTES_EXAM, checkStepExam, findStepExam } from './utils';

interface NewUserProps {
	appointmentOwner: AppointmentOwner | undefined;
	useCase: UseCase | null | undefined;
	isUserLoggedIn: boolean;
	commingFromAppointmentCreation: boolean;
	currentUser: User | null | undefined;
}

const ClinicalExamination = () => {
	const isUserLoggedIn = false;
	const commingFromAppointmentCreation = true;

	const { push, listen, location } = useHistory();
	const [step, setStep] = useState<number>(0);
	const [aboutMeData, setAboutMeData] = useState<ExamDataValues>();
	const [medicalData, setMedicalData] = useState<ContactValues>();

	const onChangeStep = (values: ExamDataValues | ContactValues) => {
		console.log('step : ', step);
		if (step === 0) {
			setAboutMeData(values as ExamDataValues);
			addGAEvent({
				category: 'Agendar cita - Paso 2',
				action: 'Avance satisfactorio',
				label: '(not available)',
			});
		} else if (step === 1) {
			const dataValues = { ...values } as ContactValues;
			setMedicalData(dataValues);

			addGAEvent({
				category: 'Agendar cita - Paso 2.2',
				action: 'Avance satisfactorio',
				label: '(not available)',
			});
		}

		push(`/examenes/${SUB_ROUTES_EXAM[step + 1]}`);
	};

	usePageTitle('Examenes');

	useLayoutEffect(() => {
		if (!commingFromAppointmentCreation) {
			push(isUserLoggedIn ? '/dashboard/citas' : '/iniciar_sesion');
		}
		// eslint-disable-next-line
	}, []);
	useLayoutEffect(() => {
		checkStepExam(location, aboutMeData, push, medicalData);
	}, [aboutMeData, location, medicalData, push]);

	useEffect(() => {
		const removeListener = listen((location: Location) => {
			const index = findStepExam(location);
			console.log('location : ', location);
			console.log('index : ', index);

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
					<Route exact path="/examenes/exam">
						<Exam examData={aboutMeData} onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/examenes/laboratory">
						<Laboratory onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/examenes/scheduling">
						{/* <Laboratory submitSignUp={submitSignUp} onChangeStep={onChangeStep} isGuest={isGuest} /> */}
					</Route>
					<Route path="/examenes/*">
						<Redirect to="/examenes/exam" />
					</Route>
				</Switch>
				{/* <PreferPediatrics isModalOpen={isAgeRestrictioModalOpen} closeModal={closeAgeRestrictionModal} /> */}
			</RightLayout>
		</Container>
	);
};

export default ClinicalExamination;
