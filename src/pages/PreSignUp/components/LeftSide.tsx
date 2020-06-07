import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

import { LeftLayout } from 'pages/common';
import { MYSELF } from 'AppContext';
import { stylesWithTheme } from 'utils/createStyles';

interface StylesProps {
	isForMyself: boolean;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '23px 0 23px 26px',
		[breakpoints.up('lg')]: {
			paddingTop: (props: StylesProps) => (props.isForMyself ? '188px' : '112px'),
			paddingLeft: 0,
		},
	},
	leftHeader: {
		fontWeight: 'bold',
	},
}));

interface LeftSideProps {
	appointmentOwner?: string;
}

const LeftSide = ({ appointmentOwner }: LeftSideProps) => {
	const { t } = useTranslation('preSignUp');
	const isForMyself = appointmentOwner === MYSELF;
	const classes = useStyles({ isForMyself });

	return (
		<LeftLayout>
			<div className={classes.wrapper}>
				<Typography variant="h3">{t('left.titlePrefix')}</Typography>
				<Typography variant="h1" className={classes.leftHeader}>
					{t('left.title.firstLine')}
				</Typography>
				<Typography variant="h1" className={classes.leftHeader}>
					{t('left.title.secondLine')}
				</Typography>
			</div>
		</LeftLayout>
	);
};

export default LeftSide;
