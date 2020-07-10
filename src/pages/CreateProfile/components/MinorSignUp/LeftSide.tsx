import React from 'react';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { LeftLayout, Stepper } from 'pages/common';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	layout: {
		backgroundColor: 'white',
	},
	wrapper: {
		padding: '18px 34px 20px 34px',
		[breakpoints.up('lg')]: {
			padding: '128px 60px 0 40px',
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
		[breakpoints.up('lg')]: {
			textAlign: 'left',
			paddingBottom: '40px',
		},
	},
}));

interface LeftSideProps {
	step: number;
}

const createSteps = (t: Function, isMobile: boolean) =>
	isMobile ? ['', ''] : [t('left.step.first.label'), t('left.step.second.label')];

const LeftSide = ({ step }: LeftSideProps) => {
	const classes = useStyles();
	const { t } = useTranslation('signUp');
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const steps = createSteps(t, !matches);

	return (
		<LeftLayout className={classes.layout}>
			<div className={classes.wrapper}>
				{step <= 0 ? (
					<Typography className={classes.titlePrefix} variant="h3">
						{t('left.titlePrefix')}
					</Typography>
				) : null}
				<Typography className={classes.title} variant="h1">
					{t(`left.title.minor`)}
				</Typography>
				<Stepper
					steps={steps}
					orientation={matches ? 'vertical' : 'horizontal'}
					alternativeLabel={!matches}
					activeStep={step}
				/>
			</div>
		</LeftLayout>
	);
};

export default LeftSide;
