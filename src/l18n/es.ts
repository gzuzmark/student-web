// TODO implement dynamic import from pages directories

import selectDoctorL18n from 'pages/SelectDoctor/l18n';
import PreSignUpL18n from 'pages/PreSignUp/l18n';
import LoginL18n from 'pages/Login/l18n';

export default {
	nav: {
		login: 'Iniciar sesión',
	},
	selectDoctor: { ...selectDoctorL18n },
	preSignUp: { ...PreSignUpL18n },
	login: { ...LoginL18n },
};
