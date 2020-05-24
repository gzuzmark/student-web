import { ReactElement } from 'react';
import { SelectDoctor, PreSignUp } from 'pages';

interface Route {
	id: string;
	route: string;
	component: () => ReactElement;
}

type routesType = Route[];

const routes: routesType = [
	{ id: 'SelectDoctor', route: '/seleccionar_doctor', component: SelectDoctor },
	{ id: 'PreSignUp', route: '/pre_registro', component: PreSignUp },
];

export default routes;
