import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { LeftLayout, Stepper } from 'pages/common';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		leftLayout: {
			display: 'flex',
			justifyContent: 'center',
			padding: '30px 0',
			[breakpoints.up('lg')]: {
				display: 'block',
				padding: '89px 0 0 104px',
				width: '359px!important',
			},
		},
		prefixTitleContainer: {
			display: 'none',
			paddingBottom: '17px',
			[breakpoints.up('lg')]: {
				display: 'block',
			},
		},
		prefixTitle: {
			fontSize: '15px',
			lineHeight: '15px',
			letterSpacing: '5px',
		},
		titleContainer: {
			display: 'none',
			paddingBottom: '57px',
			[breakpoints.up('lg')]: {
				display: 'block',
			},
		},
		title: {
			fontWeight: 'bold',
		},
	}),
);

interface LeftSideProps {
	step?: number | undefined;
}

const createSteps = (t: Function, isMobile: boolean) =>
	isMobile
		? [t('steps.mobile.firstStep.label'), t('steps.mobile.secondStep.label'), t('steps.mobile.thirdStep.label')]
		: [t('steps.firstStep.label'), t('steps.secondStep.label'), t('steps.thirdStep.label')];

const LeftSide = ({ step }: LeftSideProps) => {
	const { t } = useTranslation('clinicalExamination');
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const classes = useStyles();
	const steps = createSteps(t, !matches);

	return (
		<LeftLayout className={classes.leftLayout}>
			<div className={classes.prefixTitleContainer}>
				<Typography component="span" className={classes.prefixTitle}>
					{t('left.titlePrefix')}
				</Typography>
			</div>
			<div className={classes.titleContainer}>
				<Typography variant="h1" className={classes.title}>
					{t('left.title.firstLine')}
				</Typography>
				<Typography variant="h1" className={classes.title}>
					{t('left.title.secondLine')}
				</Typography>
			</div>
			<Stepper
				activeStep={step}
				steps={steps}
				orientation={matches ? 'vertical' : 'horizontal'}
				alternativeLabel={!matches}
			/>
		</LeftLayout>
	);
};

export default LeftSide;
