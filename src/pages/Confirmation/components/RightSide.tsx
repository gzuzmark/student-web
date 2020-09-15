import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { RightLayout, CreatePasswordForm } from 'pages/common';
import { stylesWithTheme } from 'utils';
import AppointmentTips from './AppointmentTips';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	rightLayout: {
		'&&': {
			minHeight: 'calc(100vh - 200px)',
			[breakpoints.up('lg')]: {
				minHeight: 'calc(100vh - 80px)',
			},
		},
	},
	tipsWrapper: {
		padding: '40px 26px 27px',
		[breakpoints.up('lg')]: {
			padding: '96px 0 49px 0',
			width: '475px',
		},
	},
	formWrapper: {
		padding: '40px 26px 27px',
		[breakpoints.up('lg')]: {
			padding: '151px 0 0 0',
			width: '566px',
		},
	},
	titleWrapper: {
		paddingBottom: '25px',
		[breakpoints.up('lg')]: {
			paddingBottom: '26px',
		},
	},
	title: {
		[breakpoints.up('lg')]: {
			paddingBottom: '12px',
		},
	},
	titleText: {
		fontFamily: 'Playfair Display',
		fontStyle: 'normal',
		fontSize: '25px',
		lineHeight: '28px',
		fontWeight: 'bold',
		[breakpoints.up('lg')]: {
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'normal',
			lineHeight: '35px',
			letterSpacing: '0.2px',
		},

		'&.main': {
			color: palette.primary.main,
			[breakpoints.up('lg')]: {
				color: palette.text.primary,
				fontWeight: 'bold',
			},
		},
	},
	separator: {
		[breakpoints.up('lg')]: {
			height: '0',
			width: '25px',
			borderBottom: `1px solid ${palette.info.main}`,
		},
	},
}));

interface RightSideProps {
	isGuest: boolean;
	email: string;
	showPasswordForm: boolean;
	updateContextState?: Function;
	userId: string;
}

const RightSide = ({ isGuest, email, showPasswordForm, updateContextState, userId }: RightSideProps) => {
	const classes = useStyles();
	const { push } = useHistory();
	const { t } = useTranslation('confirmation');

	const goToAppointments = () => {
		push('/dashboard/citas');
	};

	return (
		<RightLayout className={classes.rightLayout}>
			{showPasswordForm ? (
				<div className={classes.formWrapper}>
					<div className={classes.titleWrapper}>
						<div className={classes.title}>
							<Typography className={clsx(classes.titleText, 'main')} component="span">
								{t('confirmation.createPassword.title.firstPart')}
							</Typography>{' '}
							<Typography className={classes.titleText} component="span">
								{t('confirmation.createPassword.title.secondPart')}
							</Typography>
						</div>
						<div className={classes.separator}></div>
					</div>
					<CreatePasswordForm
						userId={userId}
						redirectAfterSubmit={goToAppointments}
						updateContextState={updateContextState}
					/>
				</div>
			) : (
				<div className={classes.tipsWrapper}>
					<AppointmentTips isGuest={isGuest} goToAppointments={goToAppointments} email={email} />
				</div>
			)}
		</RightLayout>
	);
};

export default RightSide;
