import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { stylesWithTheme } from 'utils';
import { ReactComponent as BackArrow } from 'icons/straight-arrow-left.svg';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	title: {
		textAlign: 'center',
		paddingTop: '34px',
		paddingBottom: '30px',
	},
	titleSecondLine: {
		fontFamily: 'Playfair Display',
		fontSize: '15px',
	},
	body: {
		padding: '0 26px',
	},
	iconWrapper: {
		position: 'absolute',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
}));

interface PrivacyPolicyDialogProps {
	isOpen: boolean;
	closeDialog: () => void;
}

const PrivacyPolicyDialog = ({ isOpen, closeDialog }: PrivacyPolicyDialogProps) => {
	const classes = useStyles();
	const { t } = useTranslation('global');
	const fullScreen = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<Dialog fullScreen={!fullScreen} open={isOpen} onClose={closeDialog}>
			<div className={classes.title}>
				<div className={classes.iconWrapper}>
					<IconButton onClick={closeDialog}>
						<BackArrow />
					</IconButton>
				</div>
				<Typography>{t('privacyPolicy.title.firstLine')}</Typography>
				<Typography className={classes.titleSecondLine}>{t('privacyPolicy.title.secondLine')}</Typography>
			</div>
			<div className={classes.body}>
				<Typography>{t('privacyPolicy.body')}</Typography>
			</div>
		</Dialog>
	);
};

export default PrivacyPolicyDialog;
