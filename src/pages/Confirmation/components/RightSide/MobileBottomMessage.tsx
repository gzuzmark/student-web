import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { ReactComponent as CloseIcon } from 'icons/closeX.svg';
import { BACKGROUND_DEFAULT } from 'theme';

const useStyles = stylesWithTheme(() => ({
	container: {
		position: 'sticky',
		bottom: '0',
		background: BACKGROUND_DEFAULT,
		boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
	},
	wrapper: {
		position: 'relative',
		padding: '18px 35px 22px',
	},
	closeButton: {
		position: 'absolute',
		top: '22px',
		right: '18px',
	},
	title: {
		fontFamily: 'Montserrat',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '13px',
		lineHeight: '18px',
	},
	link: {
		textDecoration: 'underline',
	},
}));

interface MobileBottomMessageProps {
	showBottomMessage?: boolean;
	hideBottomMessage?: () => void;
	closeMessage: () => void;
	isForNewAccount: boolean;
	name: string | undefined;
}

const MobileBottomMessage = ({
	closeMessage,
	showBottomMessage,
	hideBottomMessage,
	isForNewAccount,
	name,
}: MobileBottomMessageProps) => {
	const { t } = useTranslation('confirmation');
	const classes = useStyles();
	const title = isForNewAccount
		? t('confirmation.bottomMessage.title')
		: t('confirmation.bottomMessage.title.forSomeone', { name: name?.toUpperCase() });
	const body = isForNewAccount ? t('confirmation.bottomMessage.body') : t('confirmation.bottomMessage.body.forSomeone');

	return showBottomMessage ? (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<div className={classes.closeButton} onClick={hideBottomMessage}>
					<CloseIcon />
				</div>
				<div className={classes.title}>{title}</div>
				<div>
					<Typography component="span">{body}</Typography>{' '}
					<Typography className={classes.link} color="primary" component="span" onClick={closeMessage}>
						{t('confirmation.bottomMessage.link')}
					</Typography>
				</div>
			</div>
		</div>
	) : null;
};

export default MobileBottomMessage;
