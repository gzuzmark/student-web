import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Location } from 'history';

import { Container, RightLayout } from 'pages/common';

import { LeftSide, AboutMe, AboutMeValues, MedicalData, MedicalDataValues, Contact, ContactValues } from './components';
import { sendSignUp } from 'pages/api';
import AppContext, { AppointmentOwner } from 'AppContext';

const subRoutes = ['sobre_ti', 'datos_medicos', 'contacto'];
const findStep = (location: Location) =>
	subRoutes.findIndex((route: string) => location && location.pathname === `/registro/${route}`);
const checkStep = (
	location: Location,
	aboutUser: AboutMeValues | undefined,
	push: Function,
	medicalData: MedicalDataValues | undefined,
) => {
	const index = findStep(location);
	if (index === 1 && !aboutUser) {
		push('registro/sobre_ti');
	} else if (index === 2 && !medicalData) {
		push('registro/datos_medicos');
	}
};

const SignUp = () => {
	const { push, listen, location } = useHistory();
	const [step, setStep] = useState<number>(0);
	const [aboutUser, setAboutUser] = useState<AboutMeValues>();
	const [medicalData, setMedicalData] = useState<MedicalDataValues>();
	const { updateState } = useContext(AppContext);
	const onChangeStep = (values: AboutMeValues | MedicalDataValues) => {
		if (step === 0) {
			setAboutUser(values as AboutMeValues);
		} else if (step === 1) {
			setMedicalData(values as MedicalDataValues);
		}

		push(`/registro/${subRoutes[step + 1]}`);
	};
	const submitSignUp = async (contactInfo: ContactValues, appointmentOwner: AppointmentOwner) => {
		const user = {
			...(aboutUser as AboutMeValues),
			...(medicalData as MedicalDataValues),
			...contactInfo,
		};

		await sendSignUp(user, appointmentOwner);
		if (updateState) {
			updateState({ user });
		}
	};

	checkStep(location, aboutUser, push, medicalData);

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
						<AboutMe onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/registro/datos_medicos">
						<MedicalData onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/registro/contacto">
						<Contact submitSignUp={submitSignUp} />
					</Route>
					<Route exact path="/registro/*">
						<Redirect to="/registro/sobre_ti" />
					</Route>
				</Switch>
			</RightLayout>
		</Container>
	);
};

export default SignUp;
