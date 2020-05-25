import { ReactElement } from 'react';
import { SelectDoctor, PreSignUp, Login } from 'pages';

interface Route {
	id: string;
	path: string;
	component: () => ReactElement;
}

type RoutesType = Route[];

export const routes: RoutesType = [
	{ id: 'SelectDoctor', path: '/seleccionar_doctor', component: SelectDoctor },
	{ id: 'PreSignUp', path: '/pre_registro', component: PreSignUp },
];

export const routeWithoutNav: RoutesType = [{ id: 'Login', path: '/iniciar_sesion', component: Login }];
