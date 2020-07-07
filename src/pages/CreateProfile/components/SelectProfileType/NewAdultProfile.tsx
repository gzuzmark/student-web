import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	title: {
		fontSize: '15px',
		lineHeight: '20px',
		padding: '0 10px 25px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
			padding: '0 55px 28px',
		},
	},
	options: {
		display: 'flex',
		flexDirection: 'column',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
			justifyContent: 'center',
		},
	},
	profileTypeBtn: {
		marginBottom: '17px',
		'&:last-child': {
			[breakpoints.up('lg')]: {
				marginRight: '0px',
			},
		},
		[breakpoints.up('lg')]: {
			marginBottom: '0px',
			marginRight: '43px',
			padding: '21px 73px',
		},
	},
}));

const NewAdultProfile = () => {
	const classes = useStyles();
	const history = useHistory();
	const { t } = useTranslation('createProfile');
	const returnToSelectProfile = () => {
		history.push('/seleccionar_perfil');
	};

	return (
		<>
			<Typography className={classes.title}>
				{t('createProfile.selectProfileType.notAvailableProfile.title')}
			</Typography>
			<div className={classes.options}>
				<Button onClick={returnToSelectProfile} className={classes.profileTypeBtn} variant="contained">
					{t('createProfile.selectProfileType.notAvailableProfile.continue')}
				</Button>
			</div>
		</>
	);
};

export default NewAdultProfile;
