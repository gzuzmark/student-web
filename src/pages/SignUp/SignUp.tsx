import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Location } from 'history';

import { Container, RightLayout } from 'pages/common';
import { sendSignUp } from 'pages/api';
import { usePageTitle, useCurrentUserRediction } from 'utils';
import AppContext from 'AppContext';

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
	const [step, setStep] = useState<number>(0);
	const [contactInfo, setContactInfo] = useState<ContactValues>();
	const [medicalData, setMedicalData] = useState<MedicalDataValues>();
	const { user: currentUser, updateState, appointmentOwner } = useContext(AppContext);
	const onChangeStep = (values: ContactValues | MedicalDataValues) => {
		if (step === 0) {
			setContactInfo(values as ContactValues);
		} else if (step === 1) {
			setMedicalData(values as MedicalDataValues);
		}

		push(`/registro/${subRoutes[step + 1]}`);
	};
	const submitSignUp = async (aboutUser: AboutMeValues) => {
		if (appointmentOwner && updateState) {
			const user = {
				...(medicalData as MedicalDataValues),
				...(contactInfo as ContactValues),
				...aboutUser,
			};

			await sendSignUp(user, appointmentOwner);
			updateState({ user });
		}
	};

	usePageTitle('Registro');
	useCurrentUserRediction(currentUser, '/citas');
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
						<Contact contactInfo={contactInfo} onChangeStep={onChangeStep} appointmentOwner={appointmentOwner} />
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
