import React, { useCallback } from 'react';
import { Theme } from '@material-ui/core/styles';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container, RightLayout, LeftLayout } from 'pages/common';
import { postMedicalInformation } from 'pages/api';
import { usePageTitle, stylesWithTheme } from 'utils';

import { MedicalData, MedicalDataValues } from './components';
import { Typography } from '@material-ui/core';

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

const registerMedicalInformation = async (push: Function, medicalData: MedicalDataValues) => {
	try {
		await postMedicalInformation(medicalData);
		push('/pago');
	} catch (e) {}
};

interface GetMedicalInformationProps {
	updateState: Function | undefined;
}

const GetMedicalInformation = ({ updateState }: GetMedicalInformationProps) => {
	const { push } = useHistory();
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const submitMedicalInformation = useCallback(
		async (medicalData: MedicalDataValues) => {
			if (updateState) {
				registerMedicalInformation(push, medicalData);
			}
		},
		[push, updateState],
	);

	usePageTitle('Información Médica');

	return (
		<Container>
			<LeftLayout>
				<div className={classes.wrapper}>
					<Typography className={classes.title} variant="h1">
						{t('getMedicalInformation.title')}
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
