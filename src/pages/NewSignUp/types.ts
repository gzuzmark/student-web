export interface AboutPatientValues {
	name: string;
	lastName: string;
	secondSurname: string;
	birthDate: Date | null;
	gender: number | undefined;
}

export interface ContactPatientValues {
	identification: string;
	phoneNumber: string;
	email: string;
	address: string;
}

export interface PatientPasswordValues {
	password: string;
	confirmPassword: string;
}

export type ReducerAction =
	| {
			type: 'COMPLETE_ABOUT_PATIENT';
			aboutPatient: AboutPatientValues;
	  }
	| {
			type: 'COMPLETE_CONTACT_STEP';
			contactPatient: ContactPatientValues;
	  }
	| {
			type: 'COMPLETE_PASSWORD_STEP';
			patientPassword: PatientPasswordValues;
	  }
	| {
			type: 'FINISH_SUBMITTING';
	  }
	| {
			type: 'REDIRECT_DASHBOARD_SCREEN';
	  }
	| {
			type: 'REDIRECT_APPOINTMENT_SCREEN';
	  };

export interface State {
	step: number;
	isSubmitting: boolean;
	showConfirmationMessage: boolean;
	aboutPatient: AboutPatientValues;
	contactPatient: ContactPatientValues;
	patientPassword: PatientPasswordValues;
	showWelcomeMessage: boolean;
	path: string;
}
