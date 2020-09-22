import { ReactElement } from 'react';
import {
	SelectDoctor,
	PreSignUp,
	Login,
	SignUp,
	AppointmentList,
	Appointment,
	Payment,
	Confirmation,
	ForgotPassword,
	SelectProfile,
	CreateProfile,
	FamilyMembers,
	CreateAccount,
	LaboratoryExams,
} from 'pages';

export const TRIAGE_ROUTE = 'triaje';
export const SELECT_DOCTOR_ROUTE = 'seleccionar_doctor';
export const PRE_SIGN_UP_ROUTE = 'pre_registro';
export const PAYMENT_ROUTE = 'pago';
export const CONFIRMATION_ROUTE = 'confirmacion';
export const LOGIN_ROUTE = 'iniciar_sesion';
export const SIGN_UP_ROUTE = 'registro';
export const FORGORT_PASSWORD_ROUTE = 'reestablecer_contrasena';
export const APPOINTMENT_LIST_ROUTE = 'citas';
export const SELECT_PROFILE_ROUTE = 'seleccionar_perfil';

export const routToTitle: Record<string, string> = {
	[TRIAGE_ROUTE]: 'Triaje',
	[SELECT_DOCTOR_ROUTE]: 'Seleccionar Doctor',
	[PRE_SIGN_UP_ROUTE]: 'Pre Registro',
	[PAYMENT_ROUTE]: 'Pago',
	[CONFIRMATION_ROUTE]: 'Confirmacion',
	[LOGIN_ROUTE]: 'Iniciar Sesion',
	[SIGN_UP_ROUTE]: 'Registro',
	[APPOINTMENT_LIST_ROUTE]: 'Citas',
	[FORGORT_PASSWORD_ROUTE]: 'Reestrablecer contraseña',
	[SELECT_PROFILE_ROUTE]: 'Seleccionar perfil',
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
	// { id: 'Triage', path: '/triaje', component: Triage }, // Dev note: Not in use, for now at least
	{ id: 'SelectDoctor', path: '/seleccionar_doctor', component: SelectDoctor },
	{ id: 'PreSignUp', path: '/pre_registro', component: PreSignUp },
	{ id: 'SignUp', path: '/registro/*', component: SignUp },
	{ id: 'Payment', path: '/pago', component: Payment },
	{ id: 'Confirmation', path: '/confirmacion', component: Confirmation },
	{ id: 'AppointmentList', path: '/dashboard/citas', component: AppointmentList, guard: true, exact: true },
	{ id: 'Appointments', path: '/dashboard/citas/:id', component: Appointment, guard: true, exact: true },
	{ id: 'FamilyMembers', path: '/dashboard/parientes', component: FamilyMembers, guard: true, exact: true },
	{ id: 'LaboratoryExamsRoot', path: '/dashboard/laboratorios', component: LaboratoryExams, guard: true, exact: true },
	{ id: 'LaboratoryExams', path: '/dashboard/laboratorios/*', component: LaboratoryExams, guard: true },
	{ id: 'ForgotPassword', path: '/reestablecer_contrasena', component: ForgotPassword },
	{ id: 'SelectProfile', path: '/seleccionar_perfil', component: SelectProfile, guard: true },
	{ id: 'CreateProfile', path: '/crear_perfil', component: CreateProfile, guard: true },
];

export const routeWithoutNav: RoutesType = [
	{ id: 'Login', path: '/iniciar_sesion', component: Login },
	{ id: 'CreateAccount', path: '/crear_cuenta', component: CreateAccount },
];
