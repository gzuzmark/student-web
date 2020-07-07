import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	title: {
		fontSize: '15px',
		lineHeight: '20px',
		padding: '0 0 25px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
			padding: '0 0 28px',
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

interface SelectTypeProps {
	onSelectAdult: () => void;
	onSelectMinor: () => void;
}

const SelectType = ({ onSelectAdult, onSelectMinor }: SelectTypeProps) => {
	const classes = useStyles();
	const { t } = useTranslation('createProfile');

	return (
		<>
			<Typography className={classes.title}>{t('createProfile.selectProfileType.title')}</Typography>
			<div className={classes.options}>
				<Button onClick={onSelectAdult} className={classes.profileTypeBtn} variant="contained">
					<span>
						<b>{t('createProfile.selectProfileType.adult.type.firstPart')}</b>{' '}
						{t('createProfile.selectProfileType.adult.type.secondPart')}
					</span>
				</Button>
				<Button onClick={onSelectMinor} className={classes.profileTypeBtn} variant="contained">
					<span>
						<b>{t('createProfile.selectProfileType.minor.type.firstPart')}</b>{' '}
						{t('createProfile.selectProfileType.minor.type.secondPart')}
					</span>
				</Button>
			</div>
		</>
	);
};

export default SelectType;
