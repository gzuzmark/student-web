import React, { ReactElement, useState, useCallback } from 'react';
import { getLocalValue } from 'utils';
import { UseCase } from 'pages/api/useCase';
import { Doctor, Schedule } from 'pages/api/selectDoctor';
import { Laboratorys, Schedules } from 'pages/api/laboratories';
import { DoctorAvailability, DateSchedule } from './pages/api/selectDoctor';

import { ReactComponent as SunIcon } from 'icons/sun.svg';
import { ReactComponent as SunsetIcon } from 'icons/sunset.svg';
import { ReactComponent as MoonIcon } from 'icons/moon.svg';

export const EMPTY_TRACK_PARAMS = {
	utmSource: '',
	utmMedium: '',
	utmCampaign: '',
};

// Appointment Owner
export const MYSELF = 'myself';
export const RELATIVE = 'relative';
export const GUEST = 'guest';

export type AppointmentOwner = 'myself' | 'relative' | 'guest' | '';

// Steps
export const TRIAGE_STEP = 'triage';
export const ATTENTION_METHOD_STEP = 'attention-method';
export const SELECT_DOCTOR_STEP = 'select-doctor';
export const PRE_SIGNUP_STEP = 'pre-signup';
export const PAYMENT_STEP = 'payment';
export const CONFIRMATION_STEP = 'confirmation';
export const routeMapping = {
	[TRIAGE_STEP]: '/triaje',
	[ATTENTION_METHOD_STEP]: 'metodo_atencion',
	[SELECT_DOCTOR_STEP]: '/seleccionar_doctor',
};

export interface TrackParams {
	utmSource?: string;
	utmMedium?: string;
	utmCampaign?: string;
}

export type AppointmentCreationStep =
	| ''
	| 'triage'
	| 'attention-method'
	| 'select-doctor'
	| 'pre-signup'
	| 'payment'
	| 'confirmation';

export enum TimereFrameOptionsEnum {
	morning = 'morning',
	afternoon = 'afternoon',
	evening = 'evening',
}

export const timeFrames: FromTimeFrameOption = {
	morning: { value: 'Mañana', icon: SunIcon },
	afternoon: { value: 'Tarde', icon: SunsetIcon },
	evening: { value: 'Noche', icon: MoonIcon },
};

export type TimeFrame = 'morning' | 'afternoon' | 'evening';
export type FromTimeFrameOption = {
	[k in TimeFrame]: TimeFrameOption;
};
export type FromTimeFrameIntervals = { [k in TimeFrame]: TimeFrameIntervals };

export type GroupedSchedules = { [k in TimeFrame]?: Schedule[] };

export interface TimeFrameOption {
	value: string;
	icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
}

export interface TimeFrameIntervals {
	start: Date;
	end: Date;
}

interface AppProviderProps {
	children: ReactElement;
}

export interface User {
	id: string;
	name: string;
	lastName: string;
	secondSurname: string;
	identification: string;
	birthDate: Date;
	gender: string;
	takeMedicines: boolean;
	medicines?: string;
	haveAllergies: boolean;
	allergies?: string;
	moreMedicalInformation?: string;
	phoneNumber: string;
	email?: string;
	isMain: boolean;
	isUnderAge?: boolean;
}

export interface TriagePair {
	question: string;
	answer: string;
}

export interface LabExam {
	modality: number;
	typeExam: string[];
	available_time_id: number;
	files: string[];
}

export interface SelectDoctorSchedule {
	useCase: string;
	doctor: DoctorAvailability;
	listDates: DateSchedule[];
	isNextDays: boolean;
	selectDate: Date;
}
interface ContextProps {
	user: User | null;
	patientUser: User | null;
	userToken: string | null;
	accountUsers: User[];
	guestToken: string | null;
	reservationAccountID: string;
	channel: string;
	useCase: UseCase | null;
	doctor: Doctor | null;
	schedule: Schedule | null;
	selectDoctorSchedule: SelectDoctorSchedule | null;
	appointmentOwner: AppointmentOwner;
	triage: TriagePair[];
	updateState: Function;
	appointmentCreationStep: AppointmentCreationStep;
	paymentURL: string | null;
	isUbigeoEnabled: boolean;
	userFiles: string[];
	trackParams: TrackParams;
	showSmallSignUp: boolean;
	ticketNumber: string;
	laboratorio: Laboratorys | null;
	schedules: Schedules | null;
	labExamn: LabExam | null;
	labFiles: string[];
	labAva: string[];
}

const defaultState: ContextProps = {
	user: null,
	patientUser: null,
	userToken: getLocalValue('userToken'),
	accountUsers: [],
	guestToken: null,
	reservationAccountID: '',
	channel: 'Videollamada',
	useCase: null,
	doctor: null,
	schedule: null,
	selectDoctorSchedule: null,
	triage: [],
	appointmentOwner: MYSELF,
	updateState: Function.prototype,
	appointmentCreationStep: '',
	paymentURL: null,
	isUbigeoEnabled: false,
	userFiles: [],
	trackParams: {},
	showSmallSignUp: false,
	ticketNumber: '',
	laboratorio: null,
	schedules: null,
	labExamn: null,
	labFiles: [],
	labAva: [],
};
const AppContext = React.createContext<Partial<ContextProps>>({});

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState<Partial<ContextProps>>(defaultState);
	const updateState = useCallback((newState: Partial<ContextProps>, callback: Function | undefined = undefined) => {
		setState((state) => ({ ...state, ...newState }));

		if (callback && typeof callback === 'function') {
			callback();
		}
	}, []);

	return <AppContext.Provider value={{ ...state, updateState }}>{children}</AppContext.Provider>;
};

export default AppContext;
export { AppProvider };
