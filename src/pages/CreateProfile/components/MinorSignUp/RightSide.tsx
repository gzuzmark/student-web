import React, { useState, useContext } from 'react';

import { RightLayout } from 'pages/common';
import { AboutMe, MedicalData, AboutMeValues, MedicalDataValues } from 'pages/SignUp/components';
import AppContext from 'AppContext';
import { updateTriageQuestion } from 'pages/SignUp/utils';

interface RightSideProps {
	step: number;
	nextStep: () => void;
	onSubmit: (newProfile: AboutMeValues & MedicalDataValues, onError: Function | undefined) => void;
}

const RightSide = ({ step, nextStep, onSubmit }: RightSideProps) => {
	const [aboutMeData, setAboutMeData] = useState<AboutMeValues>();
	const [medicalData, setMedicalData] = useState<MedicalDataValues>();
	const { updateState, triage } = useContext(AppContext);
	const onChangeStep = (values: AboutMeValues | MedicalDataValues, onError: Function | undefined) => {
		if (step === 0) {
			setAboutMeData(values as AboutMeValues);
			nextStep();
		} else if (step === 1) {
			const dataValues = { ...values } as MedicalDataValues;
			setMedicalData(dataValues);
			if (updateState) {
				const newTriage = updateTriageQuestion('De acuerdo, describe el malestar:', dataValues.consultReason, triage);
				updateState({ triage: newTriage });
			}

			if (aboutMeData) {
				onSubmit({ ...aboutMeData, ...(values as MedicalDataValues) }, onError);
			}
		}
	};

	return (
		<RightLayout>
			{step === 0 ? (
				/*<AboutMe aboutMeData={aboutMeData} onChangeStep={onChangeStep} defaultLabelType="minor" />*/ <></>
			) : null}
			{step === 1 ? (
				/*<MedicalData medicalData={medicalData} onChangeStep={onChangeStep} defaultLabelType="minor" />*/ <></>
			) : null}
		</RightLayout>
	);
};

export default RightSide;
