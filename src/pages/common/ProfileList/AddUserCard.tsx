import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { ReactComponent as PlusIcon } from 'icons/plus.svg';
import { stylesWithTheme } from 'utils';

import UserCard from './UserCard';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	card: {
		marginBottom: '14px',
	},
	plusIcon: {
		height: '35px',
		width: '35px',
		'& > path': {
			opacity: '0.2',
		},
		[breakpoints.up('lg')]: {
			height: '54px',
			width: '54px',
		},
	},
	plusCircle: {
		border: `1px solid ${palette.text.primary}`,
		borderRadius: '51%',
		display: 'inline-block',
		fontSize: '20px',
		height: '24px',
		lineHeight: '25px',
		textAlign: 'center',
		width: '24px',
	},
	label: {
		textTransform: 'none',
	},
}));

const AddUserCard = () => {
	const { t } = useTranslation('global');
	const classes = useStyles();

	return (
		<div>
			<UserCard className={classes.card}>
				<PlusIcon className={classes.plusIcon} />
			</UserCard>
			<div>
				<Typography className={classes.plusCircle} component="span" variant="button">
					+
				</Typography>
				<Typography className={classes.label} component="span" variant="button">
					{' '}
					{t('selectAccount.new.account')}
				</Typography>
			</div>
		</div>
	);
};

export default AddUserCard;
