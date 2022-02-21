import React, { useState, useContext, useEffect } from 'react';
import { RightLayout } from 'pages/common';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AgendaIcon } from 'icons/agenda.svg';
import AppContext from 'AppContext';
import { stylesWithTheme, redirectToBaseAlivia, formatUTCDate } from 'utils';
import { getAppointmentList, AppointDetail } from 'pages/api/appointments';
import { useHistory } from 'react-router-dom';
import AppointmentCard from './AppointmentCard';
import { Card } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	'@global': {
		backgroundColor: '#D5D7D9',
		body: {
			fontFamily: 'Mulish',
		},
		'.MuiTypography-h1, .MuiTypography-body1': {
			fontFamily: 'Mulish',
		},
	},
	card: {
		padding: '20px 16px 16px',
		borderRadius: '5px',
		marginBottom: '16px',
		boxShadow: '0px 5px 25px rgba(103, 111, 143, 0.15)',
		cursor: 'pointer',
		'&:hover': {
			boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
		},
		'&:last-child': {
			marginBottom: '0',
		},
		[breakpoints.up('lg')]: {
			marginBottom: '22px',
		},
	},
	nameUser: {
		color: '#1ECD96',
		fontSize: '24px',
		fontWeight: 'bold',
	},
	nextATitle: {
		color: '#494F66',
		fontSize: '16px',
		fontWeight: '700',
	},
	rightWrapper: {
		[breakpoints.up('lg')]: {
			paddingTop: '76px',
			width: '711px',
		},
	},
	mobileTitleWrapper: {
		padding: '25px 26px 15px 26px',
		[breakpoints.up('lg')]: {
			// display: 'none',
		},
	},
	mobileTitle: {
		paddingBottom: '9px',
		'& > .bold': {
			fontWeight: 'bold',
		},
	},
	mobileSubtitle: {
		fontSize: '15px',
		paddingBottom: '40px',
		[breakpoints.up('lg')]: {
			paddingBottom: '26px',
		},
	},
	divider: {
		margin: '0 26px 20px 26px',
	},
	buttonWrapper: {
		maxWidth: '323px',
	},
	newAppointmentButton: {
		boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
		border: '1px solid white',
		fontSize: '15px',
		padding: '15px',
		textTransform: 'none',

		'&:hover': {
			border: '1px solid white',
			boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
		},
	},
	cardInfoNoAppointment: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	noAppoinmentTitle: {
		fontFamily: 'Mulish',
		fontSize: '16px',
		fontWeight: '700',
	},
	calendarIcon: {
		marginBottom: '36px',
		[breakpoints.up('lg')]: {
			marginBottom: '20px',
		},
	},
	citasSection: {
		padding: '20px 0 42px 0',
	},
	historyWrapper: {
		margin: '28px 0',
	},
	historyButton: {
		backgroundColor: '#F7F8FC',
		borderRadius: '8px',
		padding: '18px',
		display: 'flex',
		alignItems: 'center',
	},
	historialText: {
		color: '#676F8F',
		fontSize: '14px',
		fontWeight: '700',
	},
	alertMessageContainer: {
		backgroundColor: '#E5F6FE',
		borderRadius: '8px',
		padding: '16px 25px',
		display: 'flex',
		marginBottom: '30px',
	},
	titleAlert: {
		color: '#50B9E9',
		fontSize: '14px',
		fontWeight: '700',
	},
	messageWrapper: {
		marginLeft: '25px',
		display: 'grid',
	},
	buttonIcon: {
		padding: '0px',
		justifyContent: 'end',
	},
	rowFlex: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
	},
	btnNewAppoinmentWrapper: {
		backgroundColor: '#FFFFFF',
		position: 'sticky',
		bottom: '0',
		padding: '24px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	btnNewAppoinment: {
		backgroundColor: '#E5EFFF',
		borderRadius: '25px',
		padding: '14px 0px',
		color: '#2C7BFD',
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

const requestSmallAppointments = async (
	setAppointments: Function,
	closed: number,
	userID: string,
	userToken: string | null | undefined,
) => {
	if (userToken) {
		const appointments = await getAppointmentList({ user_id: userID, closed }, userToken);

		if (appointments) {
			setAppointments(appointments);
		}
	}
};

const RightSide = () => {
	const { t } = useTranslation('appointmentList');
	const { user: currentUser, userToken } = useContext(AppContext);
	const [appointments, setAppointments] = useState<AppointDetail[]>([]);
	const classes = useStyles();
	const history = useHistory();
	useEffect(() => {
		if (currentUser) {
			requestSmallAppointments(setAppointments, 0, currentUser.id, userToken);
		}
	}, [currentUser, userToken]);
	const getTimeLeft = (val: AppointDetail) => {
		const today = new Date();
		const currentTime = formatUTCDate(today, 'hh:mm aaa');
		const tz1 = currentTime.slice(-2);
		const tz2 = val.time.slice(-2);
		if (tz1 === tz2) {
			const hour1 = currentTime.slice(0, -2).split(':');
			const hour2 = val.time.slice(0, -2).split(':');
			if (hour1[0] === hour2[0]) {
				const minLeft = Number(hour2[1]) - Number(hour1[1]);
				if (minLeft <= 10) return true;
			}
		}
		return false;
	};
	const onClick = () => {
		history.push(`/appointments_history`);
	};
	return (
		<RightLayout>
			<div className={classes.rightWrapper}>
				<div className={classes.mobileTitleWrapper}>
					<div className={classes.mobileTitle}>
						<Typography component="span" variant="h1" className="bold">
							{t('appointments.title.mobile')}
						</Typography>
						<Typography component="span" className={classes.nameUser} variant="h1">
							{currentUser && currentUser.name ? currentUser.name : ''}
						</Typography>
					</div>
					<Typography className={classes.mobileSubtitle}>{t('appointments.subTitle.mobile')}</Typography>
					<Typography component="span" variant="h1" className={classes.nextATitle}>
						Próxima Cita
					</Typography>
					<div className={classes.citasSection}>
						{appointments.length > 0 ? (
							<AppointmentCard
								key={'appointment-1'}
								appointment={appointments[0]}
								isOldAppointment={false}
								isNextAppoinment={true}
								isLessThen5min={getTimeLeft(appointments[0])}
							/>
						) : (
							<Card className={classes.card}>
								<div className={classes.cardInfoNoAppointment}>
									<Typography className={classes.noAppoinmentTitle}>No tienes citas programadas</Typography>
									<AgendaIcon className={classes.calendarIcon} />
								</div>
								<div className={classes.buttonWrapper}>
									<Button
										variant="contained"
										className={classes.newAppointmentButton}
										onClick={redirectToBaseAlivia}
										fullWidth
									>
										Agendar
									</Button>
								</div>
							</Card>
						)}
					</div>
					<Typography component="span" variant="h1" className={classes.nextATitle}>
						Revisa y gestiona tu salud
					</Typography>
					<div className={classes.historyWrapper}>
						<div className={classes.historyButton}>
							<AgendaIcon width="30px" height="32px" style={{ marginRight: '23px' }} />
							<div className={classes.rowFlex}>
								<Typography component="span" className={classes.historialText}>
									Historial de citas
								</Typography>
								<Button onClick={onClick} className={classes.buttonIcon}>
									<NavigateNextIcon style={{ color: '#1ECD96', lineHeight: '12px' }} />
								</Button>
							</div>
						</div>
					</div>
					<div>
						<div className={classes.alertMessageContainer}>
							<InfoOutlinedIcon style={{ color: '#50B9E9', lineHeight: '22px' }} />
							<div className={classes.messageWrapper}>
								<Typography className={classes.titleAlert} component="span">
									Recuerda
								</Typography>
								<Typography component="span" className={classes.historialText}>
									Tienes 7 días de seguimiento gratis vía whatsapp después de tu cita.
								</Typography>
							</div>
						</div>
					</div>
				</div>

				<div className={classes.btnNewAppoinmentWrapper}>
					<div className={classes.btnNewAppoinment} onClick={redirectToBaseAlivia}>
						<AddOutlinedIcon style={{ color: '#2C7BFD', lineHeight: '12px', marginRight: '8px' }} />
						<span>Agendar nueva cita</span>
					</div>
				</div>
			</div>
		</RightLayout>
	);
};

export default RightSide;
