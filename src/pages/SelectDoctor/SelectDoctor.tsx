import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'query-string';

import { usePageTitle, redirectToBaseAlivia } from 'utils';
import { getUseCase, DoctorAvailability, Schedule } from 'pages/api';
import AppContext, { SELECT_DOCTOR_STEP, GUEST, MYSELF, PAYMENT_STEP } from 'AppContext';

import { Container } from '../common';
import { LeftSide } from './components/LeftSide';
import { RightSide } from './components/RightSide';
import WarningModal from './components/WarningModal/WarningModal';
import { SelectAppointmentOwner } from './components/SelectAppointmentOwner';
import { formatDoctor } from './utils';

const DEFAULT_TRIAGE_VALUES = [
	{ question: '¿Para quién es la consulta?', answer: 'relative' },
	{ question: '¿Qué tan fuerte es el malestar?', answer: 'moderate' },
	{ question: 'De acuerdo, describe el malestar:', answer: '-' },
	{ question: '¿Hace cuánto tiempo se viene presentando este malestar?', answer: '-' },
];

const requestUseCaseID = async (useCaseID: string, updateState: Function | undefined, toggleWarningModal: Function) => {
	if (updateState) {
		const useCase = await getUseCase(useCaseID);
		if (useCase && window.nutritionistUseCaseId === useCase.id) {
			toggleWarningModal(true);
		}
		updateState({
			useCase,
			appointmentCreationStep: SELECT_DOCTOR_STEP,
			triage: DEFAULT_TRIAGE_VALUES,
			appointmentOwner: GUEST,
		});
	}
};

const SelectDoctor = () => {
	const [showWarningModal, toggleWarningModal] = useState<boolean>(false);
	const [isSelectOwnerOpen, setSelectOwnerOpen] = useState<boolean>(false);
	const [doctor, setDoctor] = useState<DoctorAvailability | null>(null);
	const [schedule, setSchedule] = useState<Schedule | null>(null);
	const location = useLocation();
	const history = useHistory();
	const params = parse(location.search);
	const isUbigeoEnabled = ((params.ubigeo as string) || '') === '1';
	const minutes = (params.minutes as string) || '';
	const numSessions = (params.num_sessions as string) || '';
	const transactionFlag = (params.transferencia as string) || '';
	const { useCase, userToken, updateState } = useContext(AppContext);
	const isUserLoggedIn = !!userToken;
	const selectAppointmentOwner = (owner: string) => () => {
		const isForSomeoneElse = owner === GUEST;

		if (updateState) {
			updateState({
				appointmentOwner: owner,
				appointmentCreationStep: PAYMENT_STEP,
				schedule,
				doctor: formatDoctor(doctor),
			});
			setSelectOwnerOpen(false);

			if (isForSomeoneElse || !isUserLoggedIn) {
				history.push('/registro/sobre_ti');
			} else if (!isForSomeoneElse && isUserLoggedIn) {
				history.push('/registro/datos_medicos');
			}
		}
	};
	const openSelectOwnerModal = () => {
		setSelectOwnerOpen(true);
	};
	const closeSelectOwnerModal = () => {
		setSelectOwnerOpen(false);
	};
	const onRejectWarning = () => {
		toggleWarningModal(false);
		redirectToBaseAlivia();
	};
	const onAcceptWarning = () => toggleWarningModal(false);
	usePageTitle('Seleccion doctor');

	useEffect(() => {
		if (transactionFlag && updateState) {
			updateState({
				isTransactionEnabled: transactionFlag === '1',
			});
		}
	}, [transactionFlag, updateState]);

	useEffect(() => {
		const useCaseParam = params.malestar as string;

		if (!useCaseParam) {
			redirectToBaseAlivia();
		}

		if (!useCase && useCaseParam && updateState) {
			requestUseCaseID(useCaseParam, updateState, toggleWarningModal);
		}

		if (isUbigeoEnabled && updateState) {
			updateState({ isUbigeoEnabled });
		}
		if (useCase && useCase.id) {
			if (window.nutritionistUseCaseId === useCase.id) {
				toggleWarningModal(true);
			}
		}
	}, [location.search, updateState, useCase, isUbigeoEnabled, params.malestar]);

	return (
		<Container>
			<LeftSide />
			<RightSide
				isUserLoggedIn={!!userToken}
				useCase={useCase}
				updateContextState={updateState}
				minutes={minutes}
				numSessions={numSessions}
				openSelectOwnerModal={openSelectOwnerModal}
				setDoctor={setDoctor}
				setSchedule={setSchedule}
			/>
			<WarningModal isOpen={showWarningModal} onCancel={onRejectWarning} onAccept={onAcceptWarning} />
			<SelectAppointmentOwner
				isOpen={isSelectOwnerOpen}
				selectAppointmentForMe={selectAppointmentOwner(MYSELF)}
				selectAppointmentForSomeoneElse={selectAppointmentOwner(GUEST)}
				onClose={closeSelectOwnerModal}
			/>
		</Container>
	);
};

export default SelectDoctor;
