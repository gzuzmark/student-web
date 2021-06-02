// TODO implement dynamic import from pages directories

import selectDoctorL18n from 'pages/SelectDoctor/l18n';
import clinicalExaminationL18n from 'pages/ClinicalExamination/l18n';
import paymentLaboratoryL18n from 'pages/PaymentLaboratory/l18n';
import preSignUpL18n from 'pages/PreSignUp/l18n';
import loginL18n from 'pages/Login/l18n';
import signUpL18n from 'pages/SignUp/l18n';
import appointmentListL18n from 'pages/AppointmentList/l18n';
import appointmentDetailL18n from 'pages/Appointment/l18n';
import triageL18n from 'pages/Triage/l18n';
import paymentL18n from 'pages/Payment/l18n';
import confirmationL18n from 'pages/Confirmation/l18n';
import confirmationLabL18n from 'pages/ConfirmationLaboratory/l18n';
import forgotPasswordL18n from 'pages/ForgotPassword/l18n';
import selectProfileL18n from 'pages/SelectProfile/l18n';
import createProfileL18n from 'pages/CreateProfile/l18n';
import familyMembersL18n from 'pages/FamilyMembers/l18n';
import createPasswordL18n from 'pages/common/CreatePasswordForm/l18n';
import createAccountL18n from 'pages/CreateAccount/l18n';
import laboratoryExamsL18n from 'pages/LaboratoryExams/l18n';
import buyPrescriptionL18n from 'pages/BuyPrescription/l18n';
import askAddressL18n from 'pages/AskAddress/l18n';
import newSignUpl18n from 'pages/NewSignUp/l18n';
import defaultDashboard from 'pages/DashboardDefault/l18n';

export default {
	nav: {
		login: 'Iniciar sesión',
		'userMenu.appointments': 'Citas',
		'userMenu.familyMembers': 'Parientes',
		'userMenu.myAccount': 'Mi cuenta',
		'userMenu.logout': 'Cerrar sesión',
	},
	dashboard: {
		'dashboard.prefix': 'Hola',
		'dashboard.title': '¿Cómo te podemos ayudar hoy?',
		'dashboard.appointments': 'Citas',
		'dashboard.treatments': 'Tratamientos',
		'dashboard.laboratoryTest': 'Exámenes de laboratorio',
		'dashboard.familyMembers': 'Parientes',
		'dashboard.newAppointment': 'Agendar una cita nueva',
	},
	global: {
		'selectAccount.new.account': 'Para alguien más',
		'privacyPolicy.title.firstLine': 'POLÍTICA DE PRIVACIDAD',
		'privacyPolicy.title.secondLine': 'Las cosas claras ',
		'privacyPolicy.body':
			'En el tratamiento de tus datos personales, el Titular aplicará los siguientes principios que se ajustan a las exigencias del nuevo reglamento europeo de protección de datos: Principio de licitud, lealtad y transparencia: El Titular siempre requerirá el consentimiento para el tratamiento de tus datos personales que puede ser para uno o varios fines específicos sobre los que te informará previamente con absoluta transparencia. Principio de minimización de datos: El Titular te solicitará solo los datos estrictamente necesarios para el fin o los fines que los solicita. Principio de limitación del plazo de conservación: Los datos se mantendrán durante el tiempo estrictamente necesario para el fin o los fines del tratamiento. El Titular te informará del plazo de conservación correspondiente según la finalidad. En el caso de suscripciones, el Titular revisará periódicamente las listas y eliminará aquellos registros inactivos durante un tiempo considerable. Principio de integridad y confidencialidad: Tus datos serán tratados de tal manera que su seguridad, confidencialidad e integridad esté garantizada. Debes saber que el Titular toma las precauciones necesarias para evitar el acceso no autorizado o uso indebido de los datos de sus usuarios por parte de terceros. Obtención de datos personales Para navegar por SITIO-WEB no es necesario que facilites ningún dato personal. Los casos en los que sí proporcionas tus datos personales son los siguientes:',
		...createPasswordL18n,
	},
	selectDoctor: { ...selectDoctorL18n },
	clinicalExamination: { ...clinicalExaminationL18n },
	paymentLaboratory: { ...paymentLaboratoryL18n },
	preSignUp: { ...preSignUpL18n },
	login: { ...loginL18n },
	signUp: { ...signUpL18n },
	appointmentList: { ...appointmentListL18n },
	appointmentDetail: { ...appointmentDetailL18n },
	triage: { ...triageL18n },
	payment: { ...paymentL18n },
	confirmation: { ...confirmationL18n },
	confirmationLab: { ...confirmationLabL18n },
	forgotPassword: { ...forgotPasswordL18n },
	selectProfile: { ...selectProfileL18n },
	createProfile: { ...createProfileL18n },
	familyMembers: { ...familyMembersL18n },
	createAccount: { ...createAccountL18n },
	laboratoriesExams: { ...laboratoryExamsL18n },
	buyPrescription: { ...buyPrescriptionL18n },
	askAddress: { ...askAddressL18n },
	newSignUp: { ...newSignUpl18n },
	defaultDashboard: { ...defaultDashboard },
};
