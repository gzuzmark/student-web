import React from 'react';
import MuiStepper, { StepperProps as MuiStepperProps } from '@material-ui/core/Stepper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import StepLabel from './StepLabel';
import StepConnector from './StepConnector';
import StepIcon from './StepIcon';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		root: {
			padding: 0,
			backgroundColor: 'transparent',
			[breakpoints.up('lg')]: {
				padding: '0 46px 0 0',
			},
		},
	}),
);

interface StepperProps extends Omit<MuiStepperProps, 'children'> {
	steps: string[];
	StepIconComponent?: never;
	connector?: never;
}

const Stepper = ({ steps, ...stepperProps }: StepperProps) => {
	const classes = useStyles();

	return (
		<MuiStepper classes={{ root: classes.root }} {...stepperProps} connector={<StepConnector />}>
			{steps.map((step: string) => (
				<Step key={step}>
					<StepLabel StepIconComponent={StepIcon} isEmpty={step === ''}>
						{step}
					</StepLabel>
				</Step>
			))}
		</MuiStepper>
	);
};

export default Stepper;
