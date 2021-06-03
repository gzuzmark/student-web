import React, { MouseEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { BACKGROUND_DEFAULT } from 'theme';
import { ReactComponent as MailIcon } from 'icons/beforeSection.svg';
import { ReactComponent as VideocallIcon } from 'icons/duringSection.svg';
import { ReactComponent as ChecklistIcon } from 'icons/afterSection.svg';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	tipsWrapper: {
		padding: '40px 26px 27px',
		[breakpoints.up('lg')]: {
			padding: '96px 0 49px 0',
			width: '475px',
		},
	},
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
	copyWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingTop: '20px',
	},
	callLinkWrapper: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: ({ useDefaultBackground }: { useDefaultBackground: boolean }) =>
			useDefaultBackground ? BACKGROUND_DEFAULT : 'white',
		padding: '8px 0 7px 8px',
		width: '100%',
		marginRight: '10px',
		maxWidth: 'calc(100vw - 157px)',
		[breakpoints.up('lg')]: {
			maxWidth: '355px',
		},
	},
	callLink: {
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		cursor: 'pointer',
	},
	copyButton: {
		fontSize: '15px',
		textTransform: 'none',
		padding: '8px 19px',
	},
}));

interface AppointmentTipsProps {
	isGuest: boolean;
	goToAppointments?: (e: MouseEvent) => void;
	email: string;
	scheduleID: string;
	useDefaultBackground?: boolean;
}

// const fallbackCopyTextToClipboard = (text: string) => {
// 	const textArea = document.createElement('textarea');
// 	textArea.value = text;

// 	// Avoid scrolling to bottom
// 	textArea.style.top = '0';
// 	textArea.style.left = '0';
// 	textArea.style.position = 'fixed';

// 	document.body.appendChild(textArea);
// 	textArea.focus();
// 	textArea.select();

// 	try {
// 		const successful = document.execCommand('copy');
// 		const msg = successful ? 'successful' : 'unsuccessful';
// 		console.log('Fallback: Copying text command was ' + msg);
// 	} catch (err) {
// 		console.error('Fallback: Oops, unable to copy', err);
// 	}

// 	document.body.removeChild(textArea);
// };

const AppointmentTips = ({
	isGuest,
	goToAppointments,
	email,
	scheduleID,
	useDefaultBackground = false,
}: AppointmentTipsProps) => {
	const classes = useStyles({ useDefaultBackground });
	const { t } = useTranslation('confirmation');
	// const conferenceLink = `${process.env.REACT_APP_CONFERENCE_URL}?room=${scheduleID}&passcode=84381637551703`;
	// const copyTextToClipboard = () => {
	// 	if (!navigator.clipboard) {
	// 		fallbackCopyTextToClipboard(conferenceLink);
	// 		return;
	// 	}
	// 	navigator.clipboard.writeText(conferenceLink);
	// };

	// const { ticketNumber } = useContext(AppContext);
	// const pdfLink = `${process.env.REACT_APP_KUSHKI_LINK_DOWNLOAD_PDF}/` + ticketNumber + '/receipt';

	return (
		<div className={classes.tipsWrapper}>
			<div className={classes.titleWrapper}>
				<Typography className={classes.title} variant="h3">
					Tips para un exámen de laboratorio exitoso
				</Typography>
				<div className={classes.separator}></div>
			</div>

			<div className={classes.beforeSection}>
				<div className={classes.duringSection}>
					<Typography className={classes.tipTitle} variant="h3">
						Seguir las recomendaciones del doctor:
					</Typography>
					<div className={classes.sectionContainer}>
						<div>
							<MailIcon />
						</div>
						<div className={classes.textContainer}>
							<Typography component="span">No olvide llevar la orden del doctor en caso sea necesario.</Typography>
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
							<Typography component="span">Utilice las medidas de precaución contra el Covid 19.</Typography>
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
							<Typography component="p">
								Al finalizar el exámen en el transcurso de la semana, recibirás un resúmen de su(s) examen(es) de
								laboratorio.
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
			</div>
		</div>
	);
};

export default AppointmentTips;
