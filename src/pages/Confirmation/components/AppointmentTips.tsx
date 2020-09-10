import React, { MouseEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { ReactComponent as MailIcon } from 'icons/beforeSection.svg';
import { ReactComponent as VideocallIcon } from 'icons/duringSection.svg';
import { ReactComponent as ChecklistIcon } from 'icons/afterSection.svg';

const ALIVIA_CONTACT_EMAIL = 'alivia@lavictoria.pe';
// const ALIVIA_CONTACT_WHATSAPP_NUMBER = '947907184';
// const ALIVIA_CONTACT_WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=51947907184&text=Hola%20Alivia';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	titleWrapper: {
		paddingBottom: '27px',
		[breakpoints.up('lg')]: {
			paddingBottom: '31px',
		},
	},
	title: {
		paddingBottom: '6px',
		[breakpoints.up('lg')]: {
			paddingBottom: '12px',
		},
	},
	separator: {
		height: '0',
		width: '25px',
		borderBottom: `1px solid ${palette.info.main}`,
	},
	tipTitle: {
		color: palette.info.main,
		fontSize: '10px',
		lineHeight: '15px',
		paddingBottom: '11px',
	},
	beforeSection: {
		paddingBottom: '48px',
		[breakpoints.up('lg')]: {
			paddingBottom: '32px',
		},
	},
	duringSection: {
		paddingBottom: '48px',
	},
	afterSection: {
		[breakpoints.up('lg')]: {
			paddingBottom: '45px',
			paddingRight: '40px',
		},
	},
	sectionContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	textContainer: {
		marginLeft: '28px',
		[breakpoints.up('lg')]: {
			marginLeft: '43px',
		},
	},
	footerButtons: {
		paddingTop: '24px',
		[breakpoints.up('sm')]: {
			borderTop: '1px solid rgba(83, 91, 108, 0.2)',
		},
	},
	profileButton: {
		padding: '19px 23px',
		[breakpoints.up('sm')]: {
			width: '401px',
		},
	},
	profileLink: {
		color: palette.primary.main,
		cursor: 'pointer',
		textDecoration: 'none',
	},
}));

interface AppointmentTipsProps {
	isGuest: boolean;
	goToAppointments?: (e: MouseEvent) => void;
	email: string;
}

const AppointmentTips = ({ isGuest, goToAppointments, email }: AppointmentTipsProps) => {
	const classes = useStyles();
	const { t } = useTranslation('confirmation');

	return (
		<>
			<div className={classes.titleWrapper}>
				<Typography className={classes.title} variant="h3">
					{t('confirmation.right.title')}
				</Typography>
				<div className={classes.separator}></div>
			</div>
			<div className={classes.beforeSection}>
				<Typography className={classes.tipTitle} variant="h3">
					{t('confirmation.right.before.title')}
				</Typography>
				<div className={classes.sectionContainer}>
					<div>
						<MailIcon />
					</div>
					<div className={classes.textContainer}>
						<Typography>
							{t('confirmation.right.before.messageUnlogged')}{' '}
							<span className={classes.profileLink}>{ALIVIA_CONTACT_EMAIL}</span>
						</Typography>
					</div>
				</div>
			</div>
			<div className={classes.duringSection}>
				<Typography className={classes.tipTitle} variant="h3">
					{t('confirmation.right.during.title')}
				</Typography>
				<div className={classes.sectionContainer}>
					<div>
						<VideocallIcon />
					</div>
					<div className={classes.textContainer}>
						<Typography component="span">{t('confirmation.right.during.message')}</Typography>
					</div>
				</div>
			</div>
			<div className={classes.afterSection}>
				<Typography className={classes.tipTitle} variant="h3">
					{t('confirmation.right.after.title')}
				</Typography>
				<div className={classes.sectionContainer}>
					<div>
						<ChecklistIcon />
					</div>
					<div className={classes.textContainer}>
						<Typography component="span">
							{t('confirmation.right.after.message')} <span className={classes.profileLink}>{email}</span>.
						</Typography>
					</div>
				</div>
			</div>
			{!isGuest && goToAppointments && (
				<div className={classes.footerButtons}>
					<Button className={classes.profileButton} variant="contained" onClick={goToAppointments} fullWidth>
						{t('confirmation.right.profileButton')}
					</Button>
				</div>
			)}
		</>
	);
};

export default AppointmentTips;
