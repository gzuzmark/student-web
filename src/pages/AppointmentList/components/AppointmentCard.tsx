import React, { MouseEvent } from 'react';
import { Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { stylesWithTheme, capitalizeDate } from 'utils';
import { AppointDetail } from 'pages/api/appointments';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as ClockIcon } from 'icons/clock.svg';
import { Divider } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	card: {
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
	wrapper: {
		padding: '16px 23px 18px 19px',
		[breakpoints.up('lg')]: {
			padding: '35px 30px 29px 35px',
		},
	},
	infoWrapper: {
		display: 'flex',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
		},
	},
	section: {
		width: '100%',
		marginLeft: '20px',
		display: 'flex',
		alignItems: 'center',
		[breakpoints.up('lg')]: {
			marginLeft: '70px',
		},
	},
	sectionTitle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			opacity: 0.5,
			paddingBottom: '13px',
		},
		'&.patient': {
			[breakpoints.up('lg')]: {
				marginLeft: '39px',
			},
		},
	},
	dateWrapper: {
		alignItems: 'center',
		display: 'flex',
		paddingBottom: '14px',
	},
	dataWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	clockWrapper: {
		alignItems: 'center',
		display: 'flex',
		paddingBottom: '14px',
		[breakpoints.up('lg')]: {
			paddingBottom: '5px',
		},
	},
	titleWrapper: {
		paddingBottom: '14px',
		[breakpoints.up('lg')]: {
			paddingBottom: '22px',
		},
	},
	title: {
		fontSize: '12px',
		[breakpoints.up('lg')]: {
			fontSize: '14px',
		},
		'&.bold': {
			fontWeight: 'bold',
			[breakpoints.up('lg')]: {
				fontWeight: 500,
			},
		},
		'&.capitalize': {
			textTransform: 'capitalize',
		},
	},
	doctorName: {
		color: '#A0A4A8',
		fontSize: '12px',
		[breakpoints.up('lg')]: {
			fontSize: '14px',
		},
	},
	iconWrapper: {
		marginRight: '8px',
		width: '15px',
		height: '15px',
		'&.user': {
			width: '17px',
			height: '17px',
			[breakpoints.up('lg')]: {
				maxHeight: '26px',
				width: 'auto',
				height: 'auto',
			},
		},
		[breakpoints.up('lg')]: {
			maxHeight: '25px',
			width: 'auto',
			height: 'auto',
		},
	},
	calendarIcon: {
		stroke: palette.info.main,
		width: '15px',
		height: '15px',
		[breakpoints.up('lg')]: {
			width: '25px',
			height: '25px',
		},
	},
	clockIcon: {
		width: '15px',
		height: '15px',
		[breakpoints.up('lg')]: {
			width: '25px',
			height: '25px',
		},
	},
	conferenceLink: {
		color: '#676F8F',
		fontSize: '12px',
	},
	userIcon: {
		width: '17px',
		height: '17px',
		'& > path': {
			fill: palette.info.main,
		},
		[breakpoints.up('lg')]: {
			width: '26px',
			height: '26px',
		},
	},
	moreDetailWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	moreDetailButton: {
		fontWeight: 500,
		textDecoration: 'none',
		fontSize: '13px',
		'&:hover': {
			textDecoration: 'none',
		},
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			lineHeight: '15px',
			padding: '0px',
		},
	},
	divider: {
		margin: '16px 0px 16px',
	},
	doctorImg: {
		borderRadius: '51%',
		width: '41px',
		height: '40px',
		[breakpoints.up('lg')]: {
			width: '60px',
			height: '61px',
		},
	},
	rowFlex: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
	},
	alertMessageContainer: {
		backgroundColor: '#E5F6FE',
		borderRadius: '8px',
		padding: '16px 25px',
	},
	buttonIcon: {
		padding: '0px',
		justifyContent: 'end',
	},
	timerWrapper: {
		paddingTop: '30px',
	},
	timerBox: {
		backgroundColor: '#F7F8FC',
		color: '#A3ABCC',
		padding: '10px 0',
		borderRadius: '8px',
		textAlign: 'center',
		fontSize: '16px',
	},
	videoCallButton: {
		backgroundColor: '#1ECD96',
		padding: '10px 0',
		textAlign: 'center',

		borderRadius: '8px',

		width: '100%',
	},
	callLink: {
		color: '#FFFFFF',
		fontSize: '16px',
	},
}));

interface AppointmentCardProps {
	appointment: AppointDetail;
	isOldAppointment?: boolean;
	isNextAppoinment?: boolean;
	isLessThen5min?: boolean;
}

const AppointmentCard = ({
	appointment,
	isOldAppointment = false,
	isNextAppoinment = false,
	isLessThen5min,
}: AppointmentCardProps) => {
	const { id, date, time, scheduleID, doctor, timer } = appointment;
	const classes = useStyles();
	const history = useHistory();

	const onClick = () => {
		// eslint-disable-next-line
		// @ts-ignore
		window.appointment = appointment;
		history.push(`/dashboard/citas/${id}`);
	};
	const openConference = (e: MouseEvent) => {
		e.stopPropagation();
		window.open(`${process.env.REACT_APP_CONFERENCE_URL}/${scheduleID}`, '_blank');
	};
	const goToCall = () => {
		window.open(`https://videocall-alivia.herokuapp.com/?room={sessionID}&passcode=75034637551703`);
	};
	return (
		<Card className={classes.card}>
			<div className={classes.wrapper}>
				<div className={classes.rowFlex}>
					<div className={classes.dataWrapper}>
						<div className={classes.iconWrapper}>
							<CalendarIcon className={classes.calendarIcon} />
						</div>
						<Typography className={classes.title}>{capitalizeDate(date)}</Typography>
					</div>
					<div className={classes.dataWrapper}>
						<div className={classes.iconWrapper}>
							<ClockIcon className={classes.clockIcon} />
						</div>
						<Typography className={clsx(classes.title)} onClick={isOldAppointment ? undefined : openConference}>
							{time}
						</Typography>
					</div>
				</div>
				<Divider className={classes.divider} variant="middle" />
				<div className={classes.infoWrapper}>
					<img className={classes.doctorImg} src={doctor.profilePicture} alt="doctor profile" />
					<div className={classes.section}>
						<div className={classes.rowFlex}>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<Typography className={clsx(classes.title, 'bold')} component="span">
									{doctor.specialityName}
								</Typography>
								<Typography className={clsx(classes.doctorName, 'bold')} component="span">
									{doctor.gender === 'F' ? 'Dra.' : 'Dr.'} {doctor.name} {doctor.lastName}
								</Typography>
							</div>
							<Button onClick={onClick} className={classes.buttonIcon}>
								<NavigateNextIcon style={{ color: '#1ECD96', lineHeight: '12px' }} />
							</Button>
						</div>
					</div>
				</div>
				{!!isNextAppoinment && (
					<div className={classes.timerWrapper}>
						{isLessThen5min ? (
							<div className={classes.videoCallButton} onClick={goToCall}>
								<Typography component="span" className={classes.callLink}>
									Ingresar a videollamada
								</Typography>
							</div>
						) : (
							<div className={classes.timerBox}>
								<span>
									Tu cita es en {timer} {timer > 1 ? 'dias' : 'día'}
								</span>
							</div>
						)}
					</div>
				)}
			</div>
		</Card>
	);
};

export default AppointmentCard;
