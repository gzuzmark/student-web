import React from 'react';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { stylesWithTheme } from 'utils';
import { RightLayout, ProfileList } from 'pages/common';
import { useTranslation } from 'react-i18next';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		textAlign: 'center',
		paddingTop: '28px',
		[breakpoints.up('lg')]: {
			textAlign: 'left',
			paddingTop: '87px',
		},
	},
	title: {
		paddingBottom: '34px',
		[breakpoints.up('lg')]: {
			paddingBottom: '41px',
		},
	},
	profileListWrapper: {
		[breakpoints.up('lg')]: {
			maxWidth: '625px',
		},
	},
}));

const RightSide = () => {
	const { t } = useTranslation('familyMembers');
	const classes = useStyles();

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<Typography className={classes.title} variant="h1">
					<b>{t('familyMembers.title')}</b>
				</Typography>
				<div className={classes.profileListWrapper}>
					<ProfileList />
				</div>
			</div>
		</RightLayout>
	);
};

export default RightSide;
