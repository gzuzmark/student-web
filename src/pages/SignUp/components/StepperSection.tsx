import React, { useContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { Stepper } from 'pages/common';
import AppContext, { GUEST } from 'AppContext';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	layout: {
		with: '100%',
		textAlign: 'center',
	},
	wrapper: {
		padding: '18px 34px 20px 34px',
		[breakpoints.up('lg')]: {
			padding: '32px 60px',
		},
	},
	titlePrefix: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingBottom: '17px',
		},
	},
	title: {
		textAlign: 'center',
		paddingBottom: '10px',
		fontWeight: 'bold',
		fontFamily: 'Mulish, sans-serif',
		[breakpoints.up('lg')]: {
			paddingBottom: '40px',
		},
	},
}));

const createSteps = (t: Function, isMobile: boolean) =>
	isMobile ? ['', '', ''] : [t('left.step.first.label'), t('left.step.second.label'), t('left.step.third.label')];

interface LeftSideProps {
	step: number;
}

const StepperSection = ({ step }: LeftSideProps) => {
	const { t } = useTranslation('signUp');
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const classes = useStyles();
	const steps = createSteps(t, !matches);
	const { appointmentOwner } = useContext(AppContext);
	const isForGuest = appointmentOwner === GUEST;
	const l18nSelector = isForGuest ? 'guest' : 'toYouOrSomeoneElse';

	return (
		<div className={classes.layout}>
			<div className={classes.wrapper}>
				<Typography className={classes.title} variant="h1">
					{t(`left.title.${l18nSelector}`)}
				</Typography>
				<Stepper
					steps={steps}
					//orientation={matches ? 'vertical' : 'horizontal'}
					alternativeLabel={!matches}
					activeStep={step}
				/>
			</div>
		</div>
	);
};

export default StepperSection;
