import React, { FC } from 'react';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { ReactComponent as LeftIcon } from 'icons/left.svg';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			alignItems: 'center',
			borderBottom: '1px solid #6FCF97',
			display: 'flex',
			justifyContent: 'center',
			padding: '12px 0',
			position: 'relative',
			[theme.breakpoints.up('md')]: {
				padding: '27px 0',
			},
		},
		brandLogo: {
			width: 58,
			[theme.breakpoints.up('md')]: {
				width: 97,
				height: 25,
			},
		},
		arrowIcon: {
			left: 14,
			position: 'absolute',
			cursor: 'pointer',
		},
		loginButton: {
			fontSize: '12px',
			padding: 0,
			position: 'absolute',
			right: '26px',
			textTransform: 'none',
			[theme.breakpoints.up('md')]: {
				padding: '10px 20px',
				right: '72px',
				fontSize: '15px',
			},
		},
	}),
);

const Nav: FC = () => {
	const classes = useStyles();
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
	const { t } = useTranslation('nav');

	return (
		<nav className={classes.container}>
			<LeftIcon className={classes.arrowIcon} />
			<BrandLogo className={classes.brandLogo} />
			<Button
				className={classes.loginButton}
				variant={matches ? 'outlined' : 'text'}
				color="primary"
				disableRipple={!matches}
			>
				{t('login')}
			</Button>
		</nav>
	);
};

export default Nav;
