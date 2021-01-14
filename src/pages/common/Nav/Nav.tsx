import React, { useContext, useState, MouseEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import AppContext from 'AppContext';
import clsx from 'clsx';

import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { ReactComponent as LeftIcon } from 'icons/left.svg';
import { ReactComponent as UserIcon } from 'icons/default_user_icon.svg';

import NavMenu from './NavMenu';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			alignItems: 'center',
			borderBottom: '1px solid #6FCF97',
			display: 'flex',
			padding: '12px 0 12px 52px',
			position: 'relative',
			[breakpoints.up('lg')]: {
				padding: '27px 0',
				justifyContent: 'center',
			},
		},
		brandLogo: {
			width: 58,
			[breakpoints.up('lg')]: {
				width: 97,
				height: 25,
			},
		},
		arrowIcon: {
			padding: '10px',
			left: 4,
			position: 'absolute',
			cursor: 'pointer',
			[breakpoints.up('lg')]: {
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
			[breakpoints.up('lg')]: {
				padding: '10px 20px',
				right: '72px',
				fontSize: '15px',
			},
		},
		userIconWrapper: {
			alignItems: 'center',
			display: 'flex',
			position: 'absolute',
			top: '0px',
			right: '7px',
			[breakpoints.up('lg')]: {
				top: '5px',
				right: '111px',
			},
		},
		userIcon: {
			width: '25px',
			height: '25px',
			[breakpoints.up('lg')]: {
				width: '46px',
				height: '46px',
			},
		},
	}),
);

const Nav = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const history = useHistory();
	const { t } = useTranslation('nav');
	const { user } = useContext(AppContext);
	const isMenuOpen = Boolean(anchorEl);
	const onClick = () => {
		history.push('/iniciar_sesion');
	};
	const onGoBack = () => {
		history.goBack();
	};
	const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<nav className={clsx(classes.container, 'nav-container')}>
				<LeftIcon className={classes.arrowIcon} onClick={onGoBack} />
				<BrandLogo className={classes.brandLogo} />
				{user && user.id !== '' ? (
					<div className={classes.userIconWrapper}>
						<Typography color="primary">{user.name}</Typography>
						<IconButton onClick={handleProfileMenuOpen}>
							<UserIcon className={classes.userIcon} />
						</IconButton>
					</div>
				) : (
					<Button
						className={classes.loginButton}
						variant={matches ? 'outlined' : 'text'}
						color="primary"
						disableRipple={!matches}
						onClick={onClick}
					>
						{t('login')}
					</Button>
				)}
			</nav>
			<NavMenu anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} />
		</div>
	);
};

export default Nav;
