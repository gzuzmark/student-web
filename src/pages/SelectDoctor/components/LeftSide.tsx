import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { LeftLayout, Stepper } from '../../common';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		leftLayout: {
			display: 'flex',
			justifyContent: 'center',
			padding: '30px 0',
			[breakpoints.up('md')]: {
				display: 'block',
				padding: '89px 0 0 104px',
			},
		},
		prefixTitleContainer: {
			display: 'none',
			paddingBottom: '17px',
			[breakpoints.up('md')]: {
				display: 'block',
			},
		},
		prefixTitle: {
			fontSize: '15px',
			lineHeight: '15px',
			letterSpacing: '5px',
			paddingBottom: '17px',
		},
		titleContainer: {
			display: 'none',
			paddingBottom: '57px',
			[breakpoints.up('md')]: {
				display: 'block',
			},
		},
		title: {
			fontSize: '30px',
			fontWeight: 'bold',
			lineHeight: '40px',
			letterSpacing: '0.2px',
			fontFamily: 'Playfair Display',
		},
	}),
);

const createSteps = (t: Function, isMobile: boolean) =>
	isMobile
		? [t('steps.mobile.firstStep.label'), t('steps.mobile.secondStep.label'), t('steps.mobile.thirdStep.label')]
		: [t('steps.firstStep.label'), t('steps.secondStep.label'), t('steps.thirdStep.label')];

const LeftSide = () => {
	const { t } = useTranslation('selectDoctor');
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('md'));
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
				<Typography component="div" className={classes.title}>
					{t('left.title.firstLine')}
				</Typography>
				<Typography component="div" className={classes.title}>
					{t('left.title.secondLine')}
				</Typography>
			</div>
			<Stepper steps={steps} orientation={matches ? 'vertical' : 'horizontal'} alternativeLabel={!matches} />
		</LeftLayout>
	);
};

export default LeftSide;
