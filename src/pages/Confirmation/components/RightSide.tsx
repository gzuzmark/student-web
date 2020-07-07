import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { RightLayout } from 'pages/common';
import { ReactComponent as SmileIcon } from 'icons/smile.svg';
import { stylesWithTheme } from 'utils';
import { ReactComponent as MailIcon } from 'icons/beforeSection.svg';
import { ReactComponent as VideocallIcon } from 'icons/duringSection.svg';
import { ReactComponent as ChecklistIcon } from 'icons/afterSection.svg';

const ALIVIA_CONTACT_EMAIL = 'alivia@lavictoria.pe';
const ALIVIA_CONTACT_WHATSAPP_NUMBER = '947907184';
const ALIVIA_CONTACT_WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=51947907184&text=Hola%20Alivia';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	wrapper: {
		padding: '40px 26px 27px',
		[breakpoints.up('lg')]: {
			padding: '45px 0 49px 0',
			width: '410px',
		},
	},
	titleWrapper: {
		alignItems: 'center',
		display: 'flex',
		paddingBottom: '27px',
		[breakpoints.up('lg')]: {
			paddingBottom: '49px',
		},
	},
	iconWrapper: {
		marginRight: '16px',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			marginRight: '14px',
		},
	},
	smileIcon: {
		width: '18px',
		height: '43px',
		[breakpoints.up('lg')]: {
			width: '24px',
			height: '46px',
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
		},
	},
	goodbyeMessage: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	sectionContainer: {
		display: 'flex',
	},
	textContainer: {
		marginLeft: '43px',
	},
	footerButtons: {
		textAlign: 'right',
		paddingTop: '24px',
		[breakpoints.up('sm')]: {
			borderTop: '1px solid rgba(83, 91, 108, 0.2)',
		},
	},
	profileButton: {
		fontSize: '15px',
		padding: '15px 23px',
		[breakpoints.up('sm')]: {
			width: 'auto',
		},
	},
	profileLink: {
		color: palette.primary.main,
		cursor: 'pointer',
		textDecoration: 'none',
	},
}));

const renderAliviaWhatsapp = (classes: Record<string, string>) => (
	<a className={classes.profileLink} href={ALIVIA_CONTACT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
		{ALIVIA_CONTACT_WHATSAPP_NUMBER}.
	</a>
);

interface RightSideProps {
	isGuest: boolean;
	email: string;
}

const RightSide = ({ isGuest, email }: RightSideProps) => {
	const classes = useStyles();
	const { t } = useTranslation('confirmation');
	const { push } = useHistory();

	const goToAppointments = () => push('/citas');

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<div className={classes.titleWrapper}>
					<div className={classes.iconWrapper}>
						<SmileIcon className={classes.smileIcon} />
						<div className={classes.separator}></div>
					</div>
					<div>
						<Typography variant="h3">{t('confirmation.right.title')}</Typography>
					</div>
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
							{!isGuest ? (
								<React.Fragment>
									<Typography>
										<span className={classes.profileLink} onClick={goToAppointments}>
											{t('confirmation.right.profileLink')}
										</span>
										{t('confirmation.right.before.messageLogged')}
										{renderAliviaWhatsapp(classes)}
									</Typography>
								</React.Fragment>
							) : (
								<Typography>
									{t('confirmation.right.before.messageUnlogged')}{' '}
									<span className={classes.profileLink}>{ALIVIA_CONTACT_EMAIL}</span>
									{t('confirmation.right.before.messageWhatsapp')}
									{renderAliviaWhatsapp(classes)}
								</Typography>
							)}
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
								{t('confirmation.right.after.message')} <span className={classes.profileLink}>{email}</span>
							</Typography>
						</div>
					</div>
				</div>
				{!isGuest && (
					<div className={classes.footerButtons}>
						<Button className={classes.profileButton} variant="contained" onClick={goToAppointments} fullWidth>
							{t('confirmation.right.profileButton')}
						</Button>
					</div>
				)}
			</div>
		</RightLayout>
	);
};

export default RightSide;
