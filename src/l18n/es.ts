// TODO implement dynamic import from pages directories

import selectDoctorL18n from 'pages/SelectDoctor/l18n';
import preSignUpL18n from 'pages/PreSignUp/l18n';
import loginL18n from 'pages/Login/l18n';
import signUpL18n from 'pages/SignUp/l18n';
import appointmentListL18n from 'pages/AppointmentList/l18n';
import appointmentDetailL18n from 'pages/Appointment/l18n';

export default {
	nav: {
		login: 'Iniciar sesión',
		'userMenu.appointments': 'Citas',
		'userMenu.myAccount': 'Mi cuenta',
		'userMenu.logout': 'Cerrar sesión',
	},
	global: {
		'privacyPolicy.title.firstLine': 'POLÍTICA DE PRIVACIDAD',
		'privacyPolicy.title.secondLine': 'Las cosas claras ',
		'privacyPolicy.body':
			'En el tratamiento de tus datos personales, el Titular aplicará los siguientes principios que se ajustan a las exigencias del nuevo reglamento europeo de protección de datos: Principio de licitud, lealtad y transparencia: El Titular siempre requerirá el consentimiento para el tratamiento de tus datos personales que puede ser para uno o varios fines específicos sobre los que te informará previamente con absoluta transparencia. Principio de minimización de datos: El Titular te solicitará solo los datos estrictamente necesarios para el fin o los fines que los solicita. Principio de limitación del plazo de conservación: Los datos se mantendrán durante el tiempo estrictamente necesario para el fin o los fines del tratamiento. El Titular te informará del plazo de conservación correspondiente según la finalidad. En el caso de suscripciones, el Titular revisará periódicamente las listas y eliminará aquellos registros inactivos durante un tiempo considerable. Principio de integridad y confidencialidad: Tus datos serán tratados de tal manera que su seguridad, confidencialidad e integridad esté garantizada. Debes saber que el Titular toma las precauciones necesarias para evitar el acceso no autorizado o uso indebido de los datos de sus usuarios por parte de terceros. Obtención de datos personales Para navegar por SITIO-WEB no es necesario que facilites ningún dato personal. Los casos en los que sí proporcionas tus datos personales son los siguientes:',
	},
	selectDoctor: { ...selectDoctorL18n },
	preSignUp: { ...preSignUpL18n },
	login: { ...loginL18n },
	signUp: { ...signUpL18n },
	appointmentList: { ...appointmentListL18n },
	appointmentDetail: { ...appointmentDetailL18n },
};
