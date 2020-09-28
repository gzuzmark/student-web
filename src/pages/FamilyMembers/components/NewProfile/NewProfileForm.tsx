import React, { ReactElement, useState } from 'react';
import { User } from 'AppContext';
import AboutNewProfile, { AboutNewProfileData } from './AboutNewProfile';
import { isUnderAge } from 'utils';
import ContactInfo, { ContactInfoData } from './ContactInfo';

interface NewProfileFormProps {
	onSubmitForm: (profile: User) => void;
	currentUser: User | null | undefined;
}

const NewProfileForm = ({ onSubmitForm, currentUser }: NewProfileFormProps): ReactElement | null => {
	const [step, setStep] = useState<number>(0);
	const [aboutPatient, setAboutPatient] = useState<AboutNewProfileData | null>(null);
	const [isMinor, setIsMinor] = useState<boolean>(false);
	const defaultContactInfo = {
		phoneNumber: currentUser?.phoneNumber || '',
		email: currentUser?.email || '',
	};
	const onSubmitFirstStep = (data: AboutNewProfileData) => {
		setAboutPatient(data);
		setStep(step + 1);
	};
	const validateAfterDateSelected = (date: Date | null) => {
		if (date && isUnderAge(date)) {
			setIsMinor(true);
		}
	};
	const onSubmitLastStep = (data: ContactInfoData) => {
		const newProfile: User = {
			id: '',
			lastName: aboutPatient?.surnames || '',
			secondSurname: '',
			takeMedicines: false,
			haveAllergies: false,
			isMain: false,
			isUnderAge: isMinor,
			...(aboutPatient as AboutNewProfileData),
			...data,
			birthDate: aboutPatient?.birthDate as Date,
			gender: String(aboutPatient?.gender),
		};

		onSubmitForm(newProfile);
	};

	return (
		<>
			{step === 0 ? (
				<AboutNewProfile submitCallback={onSubmitFirstStep} validateAfterDateSelected={validateAfterDateSelected} />
			) : null}
			{step === 1 ? (
				<ContactInfo callbackAction={onSubmitLastStep} isMinor={isMinor} defaultValues={defaultContactInfo} />
			) : null}
		</>
	);
};

export default NewProfileForm;
