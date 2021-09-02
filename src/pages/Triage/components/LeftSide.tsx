import React from 'react';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { LeftLayout } from 'pages/common';
import { stylesWithTheme } from 'utils';
import { BACKGROUND_DEFAULT } from 'theme';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	layout: {
		backgroundColor: BACKGROUND_DEFAULT,
		[breakpoints.up('lg')]: {
			backgroundColor: '#ffffff',
		},
	},
	wrapper: {
		padding: '93px 70px',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			padding: '233px 60px 93px 0',
			textAlign: 'left',
		},
	},
	title: {
		fontSize: '30px',
		fontWeight: 'bold',
	},
}));

const LeftSide = () => {
	const classes = useStyles();
	const { t } = useTranslation('triage');

	return (
		<LeftLayout className={classes.layout}>
			<div className={classes.wrapper}>
				<Typography variant="h3">{t('triage.left.prefix')}</Typography>
				<Typography className={classes.title} variant="h1">
					{t('triage.left.title')}
				</Typography>
			</div>
		</LeftLayout>
	);
};

export default LeftSide;
