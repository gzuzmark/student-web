import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import MuiStepper, { StepperProps as MuiStepperProps } from '@material-ui/core/Stepper';
import { createStyles, Step, StepLabel, withStyles } from '@material-ui/core';
import MuiStepConnector from '@material-ui/core/StepConnector';
import { ReactComponent as UserIcon } from 'icons/user2.svg';
import { ReactComponent as Stethoscope } from 'icons/stethoscope.svg';
import { ReactComponent as StethoscopeD } from 'icons/stethoscope_d.svg';
import { ReactComponent as Money } from 'icons/money2.svg';
import { ReactComponent as Check } from 'icons/check.svg';
import { StepIconProps } from '@material-ui/core/StepIcon';
const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	layout: {
		width: '100%',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
	},
	wrapper: {
		padding: '32px 25px',
		[breakpoints.up('lg')]: {
			padding: '32px auto',
		},
	},
	title: {
		textAlign: 'center',
		paddingBottom: '8px',
		fontWeight: 'bold',
		fontFamily: 'Mulish, sans-serif',
		[breakpoints.up('lg')]: {
			paddingBottom: '24px',
		},
	},
	subtitle: {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '16px',
		lineHeight: '20px',
		color: '#676F8F',
	},
}));
const StepConnector1 = withStyles(({ breakpoints }: Theme) =>
	createStyles({
		root: {
			padding: 0,
		},
		lineVertical: {
			borderLeftStyle: 'none',
			borderRightStyle: 'solid',
			minHeight: 59,
			marginRight: '26.5px',
		},
		alternativeLabel: {
			top: 19,
			left: 'calc(-50% + 17px)',
			right: 'calc(50% + 17px)',
		},
		line: {
			borderColor: '#F0F2FA',
			[breakpoints.up('lg')]: {
				padding: '0 46px 0 0',
				borderTopWidth: 2,
				borderRightWidth: 2,
				borderLeftWidth: 2,
			},
		},
	}),
)(MuiStepConnector);

const createSteps = (t: Function, isMobile: boolean) => (isMobile ? ['', '', ''] : [t(''), t(''), t('')]);

interface StepperProps extends Omit<MuiStepperProps, 'children'> {
	step: number;
	stepClassName?: string;
	StepIconComponent?: never;
	connector?: never;
}
const getStepTitle = (step: number) => {
	switch (step) {
		case 0:
			return 'Información del Paciente';
		case 1:
			return 'Datos de la consulta';
		case 2:
			return 'Paga tu consulta';
		default:
			return 'step';
	}
};
const getStepContent = (step: number) => {
	switch (step) {
		case 0:
			return 'Ingresa los datos';
		case 1:
			return 'Ingresa los detalles para facilitar la atención del médico';
		case 2:
			return 'Selecciona un método de pago';
		default:
			return 'step';
	}
};

const ColorlibStepIcon = (props: StepIconProps) => {
	const { active, completed, icon } = props;

	const icons: { [key: string]: React.ReactElement } = {
		1: <UserIcon />,
		2: <Stethoscope />,
		3: <Money />,
	};
	const iconsDisabled: { [key: string]: React.ReactElement } = {
		1: <Money />,
		2: <StethoscopeD />,
		3: <Money />,
	};

	return (
		<div>
			{completed && <Check />}
			{active && icons[String(icon)]}
			{!active && !completed && iconsDisabled[String(icon)]}
		</div>
	);
};

const StepperSection = ({ step, stepClassName, ...stepperProps }: StepperProps) => {
	const { t } = useTranslation('signUp');
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const classes = useStyles();
	const steps = createSteps(t, !matches);

	return (
		<div className={classes.layout}>
			<div className={classes.wrapper}>
				<MuiStepper classes={{ root: classes.root }} {...stepperProps} connector={<StepConnector1 />} activeStep={step}>
					{steps.map((step: string) => {
						return (
							<Step key={step}>
								<StepLabel StepIconComponent={ColorlibStepIcon}>{step}</StepLabel>
							</Step>
						);
					})}
				</MuiStepper>
				<Typography className={classes.title} variant="h1">
					{getStepTitle(step)}
				</Typography>
				<Typography className={classes.subtitle} variant="h1">
					{getStepContent(step)}
				</Typography>
			</div>
		</div>
	);
};

export default StepperSection;
