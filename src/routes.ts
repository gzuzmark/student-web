import { ReactElement } from 'react';
import {
	ClinicalExamination,
	SelectDoctor,
	PreSignUp,
	Login,
	SignUp,
	AppointmentList,
	Appointment,
	Payment,
	PaymentLaboratory,
	Confirmation,
	ForgotPassword,
	SelectProfile,
	SelectPatient,
	FamilyMembers,
	CreateAccount,
	LaboratoryExams,
	BuyPrescription,
	AskAddress,
	NewSignUp,
	DashboardDefault,
} from 'pages';
import SmallSignUp from 'pages/SignUp/SmallSignUp';

export const TRIAGE_ROUTE = 'triaje';
export const SELECT_DOCTOR_ROUTE = 'seleccionar_doctor';
export const PRE_SIGN_UP_ROUTE = 'pre_registro';
export const PAYMENT_ROUTE = 'pago';
export const PAYMENT_ROUTE_LABORATORY = 'pago_laboratory';
export const CONFIRMATION_ROUTE = 'confirmacion';
export const LOGIN_ROUTE = 'iniciar_sesion';
export const SIGN_UP_ROUTE = 'registro';
export const FORGORT_PASSWORD_ROUTE = 'reestablecer_contrasena';
export const APPOINTMENT_LIST_ROUTE = 'citas';
export const SELECT_PATIENT_ROUTE = 'seleccionar_paciente';
export const SMALL_SIGN_UP = 'informacion_paciente';

export const routeToTitle: Record<string, string> = {
	[TRIAGE_ROUTE]: 'Triaje',
	[SELECT_DOCTOR_ROUTE]: 'Seleccionar Doctor',
	[PRE_SIGN_UP_ROUTE]: 'Pre Registro',
	[PAYMENT_ROUTE]: 'Pago',
	[CONFIRMATION_ROUTE]: 'Confirmacion',
	[LOGIN_ROUTE]: 'Iniciar Sesion',
	[`${SIGN_UP_ROUTE}_sobre_ti`]: 'Detalle Cita - Sobre el paciente',
	[`${SIGN_UP_ROUTE}_datos_medicos`]: 'Detalle Cita - Datos medicos',
	[`${SIGN_UP_ROUTE}_contacto`]: 'Detalle Cita - Datos de contacto',
	[APPOINTMENT_LIST_ROUTE]: 'Citas',
	[PAYMENT_ROUTE_LABORATORY]: 'Pago Laboratorio',
	[FORGORT_PASSWORD_ROUTE]: 'Reestrablecer contraseña',
	[SELECT_PATIENT_ROUTE]: 'Seleccionar paciente',
	[SMALL_SIGN_UP]: 'Detalle Cita - Sobre el paciente reducido',
	'detalle-cita': 'Detalle Cita',
};

export type CreateAppointmentRoute =
	| 'triaje'
	| 'seleccionar_doctor'
	| 'pre_registro'
	| 'pago'
	| 'pago_laboratory'
	| 'confirmacion';

interface Route {
	id: string;
	path: string;
	component: (props: Record<string, any>) => ReactElement;
	guard?: boolean;
	exact?: boolean;
}

type RoutesType = Route[];

export const routes: RoutesType = [
	// { id: 'Triage', path: '/triaje', component: Triage }, // Dev note: Not in use, for now at least
	{ id: 'SelectDoctor', path: '/seleccionar_doctor', component: SelectDoctor },
	{ id: 'ClinicalExamination', path: '/examenes/*', component: ClinicalExamination },
	{ id: 'PreSignUp', path: '/pre_registro', component: PreSignUp },
	{ id: 'SignUp', path: '/registro/*', component: SignUp },
	{ id: 'SmallSignUp', path: '/informacion_paciente', component: SmallSignUp },
	{ id: 'Payment', path: '/pago', component: Payment },
	{ id: 'Confirmation', path: '/confirmacion', component: Confirmation },
	{ id: 'DashboardDefault', path: '/dashboard/default', component: DashboardDefault, guard: true, exact: true },
	{ id: 'AppointmentList', path: '/dashboard/citas', component: AppointmentList, guard: true, exact: true },
	{ id: 'Appointments', path: '/dashboard/citas/:id', component: Appointment, guard: true, exact: true },
	{ id: 'FamilyMembers', path: '/dashboard/parientes', component: FamilyMembers, guard: true, exact: true },
	{ id: 'LaboratoryExamsRoot', path: '/dashboard/laboratorios', component: LaboratoryExams, guard: true, exact: true },
	{ id: 'LaboratoryExams', path: '/dashboard/laboratorios/*', component: LaboratoryExams, guard: true },
	{ id: 'ForgotPassword', path: '/reestablecer_contrasena', component: ForgotPassword },
	{ id: 'SelectProfile', path: '/seleccionar_paciente', component: SelectProfile, guard: true },
	{ id: 'SelectPatient', path: '/select_patient', component: SelectPatient, guard: false },
	{ id: 'PaymentLaboratory', path: '/pago_laboratory', component: PaymentLaboratory, guard: false, exact: false },
	{ id: 'NewSignUp', path: '/creacion_cuenta/*', component: NewSignUp },
	// { id: 'CreateProfile', path: '/crear_perfil', component: CreateProfile, guard: true },
];

export const routeWithoutNav: RoutesType = [
	{ id: 'Login', path: '/iniciar_sesion', component: Login },
	{ id: 'CreateAccount', path: '/crear_cuenta', component: CreateAccount },
	{ id: 'BuyPrescription', path: '/comprar_receta', component: BuyPrescription },
	{ id: 'AskAddress', path: '/direccion_receta', component: AskAddress },
];
