import React, { useState } from 'react';

import { RightLayout } from 'pages/common';
import { AboutMe, MedicalData, AboutMeValues, MedicalDataValues } from 'pages/SignUp/components';

interface RightSideProps {
	step: number;
	nextStep: () => void;
	onSubmit: (newProfile: AboutMeValues & MedicalDataValues, onError: Function | undefined) => void;
}

const RightSide = ({ step, nextStep, onSubmit }: RightSideProps) => {
	const [aboutMeData, setAboutMeData] = useState<AboutMeValues>();
	const [medicalData, setMedicalData] = useState<MedicalDataValues>();
	const onChangeStep = (values: AboutMeValues | MedicalDataValues, onError: Function | undefined) => {
		if (step === 0) {
			setAboutMeData(values as AboutMeValues);
			nextStep();
		} else if (step === 1) {
			setMedicalData(values as MedicalDataValues);

			if (aboutMeData) {
				onSubmit({ ...aboutMeData, ...(values as MedicalDataValues) }, onError);
			}
		}
	};

	return (
		<RightLayout>
			{step === 0 ? <AboutMe aboutMeData={aboutMeData} onChangeStep={onChangeStep} defaultLabelType="minor" /> : null}
			{step === 1 ? (
				<MedicalData medicalData={medicalData} onChangeStep={onChangeStep} defaultLabelType="minor" />
			) : null}
		</RightLayout>
	);
};

export default RightSide;
