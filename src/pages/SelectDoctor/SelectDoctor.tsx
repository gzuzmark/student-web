import AppContext, { GUEST, MYSELF, PAYMENT_STEP } from 'AppContext';
import { DoctorAvailability, Schedule } from 'pages/api';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addGAEvent, redirectToBaseAlivia, usePageTitle } from 'utils';
import { Container } from '../common';
import DropdownSpecialties from './components/DropdownSpecialties/DropdownSpecialties';
import { RightSide } from './components/RightSide';
import { SelectAppointmentOwner } from './components/SelectAppointmentOwner';
import WarningModal from './components/WarningModal/WarningModal';
import useSelectDoctorInitContext from './hooks/useSelectDoctorInitContext';
import { formatDoctor } from './utils';

const SelectDoctor = () => {
	const { userToken, updateState } = useContext(AppContext);
	const history = useHistory();
	const [params, useCase] = useSelectDoctorInitContext();

	const [showWarningModal, toggleWarningModal] = useState<boolean>(false);
	const [isSelectOwnerOpen, setSelectOwnerOpen] = useState<boolean>(false);
	const [doctor, setDoctor] = useState<DoctorAvailability | null>(null);
	const [schedule, setSchedule] = useState<Schedule | null>(null);
	const [specialityId, setEspecialityId] = useState<string | null>(null);

	const { malestar, showSmallSignUp } = params;
	const isUserLoggedIn = !!userToken;

	const selectAppointmentOwner = (owner: string) => () => {
		const isForSomeoneElse = owner === GUEST;
		const ownerToLabel = {
			[GUEST]: 'Para alguien más',
			[MYSELF]: 'Para mi',
		};

		if (updateState) {
			addGAEvent({
				category: 'Agendar cita - Paso 1 - Popup',
				// eslint-disable-next-line
				// @ts-ignore
				action: ownerToLabel[owner],
				label: '(not available)',
			});
			updateState({
				appointmentOwner: owner,
				appointmentCreationStep: PAYMENT_STEP,
				schedule,
				doctor: formatDoctor(doctor),
			});
			setSelectOwnerOpen(false);

			if (showSmallSignUp) {
				history.push('/informacion_paciente');
			} else if (isForSomeoneElse || !isUserLoggedIn) {
				history.push('/registro/sobre_ti');
			} else if (!isForSomeoneElse && isUserLoggedIn) {
				history.push('/registro/datos_medicos');
			}
		}
	};
	const selectDoctorCallback = () => {
		if (updateState) {
			updateState({
				appointmentCreationStep: PAYMENT_STEP,
				schedule,
				doctor: formatDoctor(doctor),
			});
		}

		if (!isUserLoggedIn) {
			setSelectOwnerOpen(true);
		} else {
			history.push('/seleccionar_paciente');
		}
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
		if (useCase && window.nutritionistUseCaseId === useCase.id) {
			toggleWarningModal(true);
		}
		if (malestar) {
			setEspecialityId(malestar);
		}
		if (useCase) {
			const { id } = useCase;
			setEspecialityId(id);
		}
	}, [useCase, malestar]);

	return (
		<>
			<DropdownSpecialties specialityId={specialityId} />
			<Container>
				<RightSide
					isUserLoggedIn={!!userToken}
					useCaseId={malestar}
					selectDoctorCallback={selectDoctorCallback}
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
		</>
	);
};

export default SelectDoctor;
