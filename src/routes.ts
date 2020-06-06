import { ReactElement } from 'react';
import { SelectDoctor, PreSignUp, Login, SignUp, AppointmentList, Appointment, Triage } from 'pages';

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
	{ id: 'AppointmentList', path: '/citas', component: AppointmentList, guard: true, exact: true },
	{ id: 'Appointments', path: '/citas/:id', component: Appointment, guard: true, exact: true },
];

export const routeWithoutNav: RoutesType = [{ id: 'Login', path: '/iniciar_sesion', component: Login }];
