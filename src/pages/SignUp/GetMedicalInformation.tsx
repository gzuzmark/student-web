import React, { useCallback } from 'react';
import { Theme } from '@material-ui/core/styles';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Container, RightLayout, LeftLayout } from 'pages/common';
import { usePageTitle, stylesWithTheme, addGAEvent } from 'utils';

import { MedicalData, MedicalDataValues } from './components';
import { Typography } from '@material-ui/core';
import { AppointmentOwner } from 'AppContext';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '18px 34px 20px 34px',
		[breakpoints.up('lg')]: {
			padding: '128px 60px 0 40px',
		},
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		[breakpoints.up('lg')]: {
			textAlign: 'left',
		},
	},
}));

const createTriage = (t: Function, medicalData: MedicalDataValues, appointmentOwner: AppointmentOwner) => [
	{ question: '¿Para quién es la consulta?', answer: appointmentOwner },
	{ question: '¿Qué tan fuerte es el malestar?', answer: 'moderate' },
	{ question: 'De acuerdo, describe el malestar:', answer: medicalData.consultReason },
	{ question: '¿Hace cuánto tiempo se viene presentando este malestar?', answer: '-' },
	{ question: t('medicalData.fields.medicineList.label'), answer: medicalData.medicineList },
	{ question: t('medicalData.fields.allergies.label'), answer: medicalData.allergies },
	{ question: t('medicalData.fields.moreInfo.label'), answer: medicalData.moreInfo },
];

interface GetMedicalInformationProps {
	updateState: Function | undefined;
	appointmentOwner: AppointmentOwner | undefined;
}

const GetMedicalInformation = ({ updateState, appointmentOwner }: GetMedicalInformationProps) => {
	const { push } = useHistory();
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const submitMedicalInformation = useCallback(
		async (medicalData: MedicalDataValues) => {
			if (updateState && appointmentOwner) {
				const triage = createTriage(t, medicalData, appointmentOwner);

				addGAEvent({ category: 'Agendar cita - Paso 2', action: 'Avance satisfactorio', label: '(not available) ' });
				updateState({ triage, userFiles: medicalData.files || [] });
				push('/pago');
			}
		},
		[appointmentOwner, push, t, updateState],
	);
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	usePageTitle('Información Médica');

	return (
		<Container>
			<LeftLayout>
				<div className={classes.wrapper}>
					<Typography className={classes.title} variant="h1">
						{t(matches ? 'getMedicalInformation.title' : 'getMedicalInformation.title.mobile')}
					</Typography>
				</div>
			</LeftLayout>
			<RightLayout>
				<Switch>
					<Route exact path="/registro/datos_medicos">
						<MedicalData medicalData={undefined} onChangeStep={submitMedicalInformation} />
					</Route>
					<Route path="/registro/*">
						<Redirect to="/registro/datos_medicos" />
					</Route>
				</Switch>
			</RightLayout>
		</Container>
	);
};

export default GetMedicalInformation;
