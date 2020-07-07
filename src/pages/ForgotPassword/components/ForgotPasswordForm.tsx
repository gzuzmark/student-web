import React, { useState } from 'react';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Stepper, FloatCard } from 'pages/common';
import { stylesWithTheme } from 'utils';

import ValidateDocumentStep from './ValidateDocumentStep';
import ValidateOTPStep from './ValidateOTPStep';
import UpdatePasswordStep from './UpdatePasswordStep';

interface StylesProps {
	step: number;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		[breakpoints.up('lg')]: {
			marginTop: '136px',
		},
	},
	content: {
		padding: '18px 24px 0',
		[breakpoints.up('lg')]: {
			backgroundColor: 'white',
			padding: ({ step }: StylesProps) => `${step === 2 ? '76px 0 34px' : '110px 0 0'} 173px`,
		},
	},
	stepperWrapper: {
		padding: '0 16px',
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
}));

const ForgotPasswordForm = () => {
	const [step, setStep] = useState<number>(0);
	const [documentNumber, setDocumentNumber] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [userID, setUserID] = useState<string>('');
	const [otpCode, setOtpCode] = useState<string>('');
	const classes = useStyles({ step });
	const goToNextStep = () => {
		setStep(step + 1);
	};
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<div className={classes.wrapper}>
			<FloatCard>
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
					{step === 0 ? (
						<ValidateDocumentStep
							setDocumentNumber={setDocumentNumber}
							setPhoneNumber={setPhoneNumber}
							goToNextStep={goToNextStep}
						/>
					) : null}
					{step === 1 ? (
						<ValidateOTPStep
							phoneNumber={phoneNumber}
							documentNumber={documentNumber}
							setUserID={setUserID}
							setOtpCode={setOtpCode}
							goToNextStep={goToNextStep}
						/>
					) : null}
					{step === 2 ? <UpdatePasswordStep otpCode={otpCode} documentNumber={documentNumber} userID={userID} /> : null}
				</div>
			</FloatCard>
		</div>
	);
};

export default ForgotPasswordForm;
