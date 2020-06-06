import React from 'react';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import { stylesWithTheme } from 'utils';
import { RightLayout } from 'pages/common';

import TriageForm from './TriageForm/TriageForm';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	wrapper: {
		padding: '0 25px 30px 25px',
		[breakpoints.up('lg')]: {
			width: '622px',
			padding: '122px 0 42px 0',
		},
	},
	disclosureWrapper: {
		padding: '0 30px 50px 26px',
		'& > div': {
			color: palette.info.main,
		},
		[breakpoints.up('lg')]: {
			padding: '0 0 150px 0',
		},
	},
}));

const RightSide = () => {
	const classes = useStyles();
	const { t } = useTranslation('triage');

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<TriageForm />
			</div>
			<div className={classes.disclosureWrapper}>
				<Typography>{t('triage.disclosure.firstLine')}</Typography>
				<Typography>{t('triage.disclosure.secondLine')}</Typography>
			</div>
		</RightLayout>
	);
};

export default RightSide;
