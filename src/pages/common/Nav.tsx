import React, { FC } from 'react';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { ReactComponent as LeftIcon } from 'icons/left.svg';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			alignItems: 'center',
			borderBottom: '1px solid #6FCF97',
			display: 'flex',
			padding: '12px 0 12px 52px',
			position: 'relative',
			[theme.breakpoints.up('lg')]: {
				padding: '27px 0',
				justifyContent: 'center',
			},
		},
		brandLogo: {
			width: 58,
			[theme.breakpoints.up('lg')]: {
				width: 97,
				height: 25,
			},
		},
		arrowIcon: {
			padding: '10px',
			left: 4,
			position: 'absolute',
			cursor: 'pointer',
			[theme.breakpoints.up('lg')]: {
				display: 'none',
			},
		},
		loginButton: {
			fontSize: '12px',
			padding: 0,
			position: 'absolute',
			right: '26px',
			textTransform: 'none',
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'none',
			},
			[theme.breakpoints.up('lg')]: {
				padding: '10px 20px',
				right: '72px',
				fontSize: '15px',
			},
		},
	}),
);

const Nav: FC = () => {
	const classes = useStyles();
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
	const history = useHistory();
	const { t } = useTranslation('nav');
	const onClick = () => {
		history.push('/iniciar_sesion');
	};
	const onGoBack = () => {
		history.goBack();
	};

	return (
		<nav className={classes.container}>
			<LeftIcon className={classes.arrowIcon} onClick={onGoBack} />
			<BrandLogo className={classes.brandLogo} />
			<Button
				className={classes.loginButton}
				variant={matches ? 'outlined' : 'text'}
				color="primary"
				disableRipple={!matches}
				onClick={onClick}
			>
				{t('login')}
			</Button>
		</nav>
	);
};

export default Nav;
