import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { Location } from 'history';
import { Container, RightLayout } from 'pages/common';
import { UseCase } from 'pages/api';
import { usePageTitle, addGAEvent } from 'utils';
import { AppointmentOwner, User } from 'AppContext';

import {
	LeftSide,
	Exam,
	ExamDataValues,
	Laboratory,
	LaboratoryFormValues,
	ContactPatientValues,
	ContactPatient,
} from './components';
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
	const [step, setStep] = useState<number>(-1);
	const [contactData, setContactData] = useState<ContactPatientValues>();
	const [examData, setExamData] = useState<ExamDataValues>();
	const [laboratoryData, setLaboratoryData] = useState<LaboratoryFormValues>();

	usePageTitle('Examenes');

	useLayoutEffect(() => {
		if (!commingFromAppointmentCreation) {
			push(isUserLoggedIn ? '/dashboard/citas' : '/iniciar_sesion');
		}
		// eslint-disable-next-line
	}, []);
	useLayoutEffect(() => {
		checkStepExam(location, examData, push);
	}, [examData, location, laboratoryData, push]);

	useEffect(() => {
		const removeListener = listen((location: Location) => {
			const index = findStepExam(location);
			// console.log({ index });
			if (index >= 0 && index < 3) {
				setStep(index);
			}
		});

		return function cleanup() {
			removeListener();
		};
	}, [listen]);

	const onChangeStep = (values: ContactPatientValues | ExamDataValues | LaboratoryFormValues) => {
		if (step === -1) {
			setContactData(values as ContactPatientValues);
			addGAEvent({
				category: 'Agendar cita - Paso 0',
				action: 'Avance satisfactorio',
				label: '(not available)',
			});
		}
		if (step === 0) {
			setExamData(values as ExamDataValues);
			addGAEvent({
				category: 'Agendar cita - Paso 1',
				action: 'Avance satisfactorio',
				label: '(not available)',
			});
		} else if (step === 1) {
			setLaboratoryData(values as LaboratoryFormValues);
			addGAEvent({
				category: 'Agendar cita - Paso 2',
				action: 'Avance satisfactorio',
				label: '(not available)',
			});
		}

		push(`/examenes/${SUB_ROUTES_EXAM[step + 1]}`);
	};

	return (
		<Container>
			<LeftSide step={step} />
			<RightLayout>
				<Switch>
					<Route exact path="/examenes/register">
						<ContactPatient contactData={contactData} onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/examenes/exam">
						<Exam examData={examData} onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/examenes/laboratory">
						<Laboratory
							previousData={{
								contactData,
								examData,
							}}
							laboratoryData={laboratoryData}
							onChangeStep={onChangeStep}
						/>
					</Route>
					<Route exact path="/examenes/patient">
						{/* <ProfileList onUserCardClick={onUserClick} redirectNewAccountCallback={redirectNewAccountCallback} /> */}
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
