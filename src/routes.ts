import { ReactElement } from 'react';
import {
	SelectDoctor,
	PreSignUp,
	Login,
	SignUp,
	AppointmentList,
	Appointment,
	Triage,
	Payment,
	Confirmation,
} from 'pages';

export const TRIAGE_ROUTE = 'triaje';
export const SELECT_DOCTOR_ROUTE = 'seleccionar_doctor';
export const PRE_SIGN_UP_ROUTE = 'pre_registro';
export const PAYMENT_ROUTE = 'pago';
export const CONFIRMATION_ROUTE = 'confirmacion';
export const LOGIN_ROUTE = 'iniciar_sesion';
export const SIGN_UP_ROUTE = 'registro';
export const APPOINTMENT_LIST_ROUTE = 'citas';

export const routToTitle: Record<string, string> = {
	[TRIAGE_ROUTE]: 'Triaje',
	[SELECT_DOCTOR_ROUTE]: 'Seleccionar Doctor',
	[PRE_SIGN_UP_ROUTE]: 'Pre Registro',
	[PAYMENT_ROUTE]: 'Pago',
	[CONFIRMATION_ROUTE]: 'Confirmacion',
	[LOGIN_ROUTE]: 'Iniciar Sesion',
	[SIGN_UP_ROUTE]: 'Registro',
	[APPOINTMENT_LIST_ROUTE]: 'Citas',
	'detalle-cita': 'Detalle Cita',
};

export type CreateAppointmentRoute = 'triaje' | 'seleccionar_doctor' | 'pre_registro' | 'pago' | 'confirmacion';

interface Route {
	id: string;
	path: string;
	component: () => ReactElement;
	guard?: boolean;
	exact?: boolean;
}

type RoutesType = Route[];

export const routes: RoutesType = [
	{ id: 'Triage', path: '/triaje', component: Triage },
	{ id: 'SelectDoctor', path: '/seleccionar_doctor', component: SelectDoctor },
	{ id: 'PreSignUp', path: '/pre_registro', component: PreSignUp },
	{ id: 'SignUp', path: '/registro/*', component: SignUp },
	{ id: 'Payment', path: '/pago', component: Payment },
	{ id: 'Confirmation', path: '/confirmacion', component: Confirmation },
	{ id: 'AppointmentList', path: '/citas', component: AppointmentList, guard: true, exact: true },
	{ id: 'Appointments', path: '/citas/:id', component: Appointment, guard: true, exact: true },
];

export const routeWithoutNav: RoutesType = [{ id: 'Login', path: '/iniciar_sesion', component: Login }];
