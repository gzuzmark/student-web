import React, { useContext } from 'react';

import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { LeftLayout } from 'pages/common';
import AppContext from 'AppContext';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	layout: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	wrapper: {
		paddingTop: '151px',
	},
	preFix: {
		textTransform: 'uppercase',
		paddingBottom: '10px',
	},
	title: {
		'& > div': {
			fontWeight: 'bold',
		},
	},
}));

interface LeftSideProps {
	appointmentType: string;
}

const LeftSide = ({ appointmentType }: LeftSideProps) => {
	const classes = useStyles();
	const { user: currentUser } = useContext(AppContext);
	const { t } = useTranslation('appointmentDetail');

	return (
		<LeftLayout className={classes.layout}>
			<div className={classes.wrapper}>
				<Typography variant="h3" className={classes.preFix}>
					{currentUser && currentUser.name ? currentUser.name : ''}
				</Typography>
				<div className={classes.title}>
					<Typography variant="h1">{t(`appointmentDetail.left.title.${appointmentType}.firstLine`)}</Typography>
					<Typography variant="h1">{t(`appointmentDetail.left.title.${appointmentType}.secondLine`)}</Typography>
				</div>
			</div>
		</LeftLayout>
	);
};

export default LeftSide;
