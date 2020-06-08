import React, { useCallback, useContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { stylesWithTheme, purgerLocalStorage } from 'utils';
import AppContext, { TRIAGE_STEP } from 'AppContext';
// import { logout } from 'pages/api/login';

const useMenuStyles = stylesWithTheme(({ palette }: Theme) => ({
	userItem: {
		borderBottom: '1px solid rgba(217, 217, 220, 0.6);',
		color: palette.primary.main,
		margin: '0 10px',
		padding: '6px',
		'&:last-child': {
			borderBottom: 'none',
		},
	},
}));

interface NavMenuProps {
	anchorEl: null | HTMLElement;
	isMenuOpen: boolean;
	handleMenuClose: () => void;
}

const NavMenu = ({ anchorEl, isMenuOpen, handleMenuClose }: NavMenuProps) => {
	const { t } = useTranslation('nav');
	const classes = useMenuStyles();
	const { push } = useHistory();
	const { updateState } = useContext(AppContext);
	const goToAppointments = () => {
		handleMenuClose();
		push('/citas');
	};
	// const goToMyAccount = () => {
	// 	handleMenuClose();
	// 	push('/mi-cuenta');
	// };
	const handleLogout = useCallback(async () => {
		handleMenuClose();

		// await logout();

		if (updateState) {
			updateState({
				user: null,
				userToken: null,
				useCase: null,
				reservationAccountID: '',
				channel: '',
				triage: [],
				scheduleID: '',
				appointmentCreationStep: TRIAGE_STEP,
			});
			purgerLocalStorage();

			push('/iniciar_sesion');
			// if (useCase) {
			// 	push(`/triaje?malestar=${useCase.name}`);
			// } else {
			// 	push('/iniciar_sesion');
			// }
		}
	}, [handleMenuClose, push, updateState]);

	return (
		<Menu
			keepMounted
			getContentAnchorEl={null}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem className={classes.userItem} onClick={goToAppointments} divider>
				{t('userMenu.appointments')}
			</MenuItem>
			{/* <MenuItem className={classes.userItem} onClick={goToMyAccount}>
				{t('userMenu.myAccount')}
			</MenuItem> */}
			<MenuItem className={classes.userItem} onClick={handleLogout}>
				{t('userMenu.logout')}
			</MenuItem>
		</Menu>
	);
};

export default NavMenu;
