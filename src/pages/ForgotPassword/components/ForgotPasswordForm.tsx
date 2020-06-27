import React, { useState } from 'react';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Stepper } from 'pages/common';
import { stylesWithTheme } from 'utils';

import ValidateDocumentStep from './ValidateDocumentStep';
// import ValidateOTPStep from './ValidateOTPStep';
// import UpdatePasswordStep from './UpdatePasswordStep';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	wrapper: {
		[breakpoints.up('lg')]: {
			marginTop: '136px',
			position: 'relative',
			zIndex: '0',
		},
	},
	content: {
		padding: '18px 24px 0',
		[breakpoints.up('lg')]: {
			backgroundColor: 'white',
			padding: '110px 191px 129px 173px',
			maxWidth: '856px',
			maxHeight: '580px',
		},
	},
	stepperWrapper: {
		padding: '0 36px',
		[breakpoints.up('lg')]: {
			padding: '0',
			width: '260px',
			'& .MuiPaper-root': {
				padding: 0,
			},
		},
	},
	step: {
		padding: 0,
	},
	backRectangle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			backgroundColor: palette.primary.main,
			width: '855px',
			height: '570px',
			position: 'absolute',
			top: '19px',
			left: '9px',
			zIndex: '-1',
		},
	},
}));

const ForgotPasswordForm = () => {
	const classes = useStyles();
	const [step, setStep] = useState<number>(0);
	const goToNextStep = () => {
		setStep(step + 1);
	};
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<div className={classes.wrapper}>
			<div className={classes.content}>
				<div className={classes.stepperWrapper}>
					<Stepper
						steps={['', '', '']}
						activeStep={step}
						orientation="horizontal"
						alternativeLabel={!matches}
						stepClassName={classes.step}
					/>
				</div>
				{step === 0 ? <ValidateDocumentStep goToNextStep={goToNextStep} /> : null}
				{/* step === 1 ? <ValidateOTPStep goToNextStep={goToNextStep} /> : null */}
				{/* step === 2 ? <UpdatePasswordStep /> : null */}
			</div>
			<div className={classes.backRectangle} />
		</div>
	);
};

export default ForgotPasswordForm;
