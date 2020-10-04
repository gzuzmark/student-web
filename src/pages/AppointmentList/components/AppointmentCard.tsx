import React, { MouseEvent } from 'react';
import { Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { stylesWithTheme, capitalizeDate } from 'utils';
import { AppointDetail } from 'pages/api/appointments';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as ClockIcon } from 'icons/clock.svg';
import { ReactComponent as UserIcon } from 'icons/user.svg';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	card: {
		borderRadius: '5px',
		marginBottom: '16px',
		boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
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
		flexDirection: 'column-reverse',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
		},
	},
	section: {
		[breakpoints.up('lg')]: {
			marginRight: '70px',
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
		alignItems: 'center',
		display: 'flex',
		'&:first-child': {
			paddingBottom: '8px',
			[breakpoints.up('lg')]: {
				paddingBottom: '5px',
			},
		},
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
		fontSize: '15px',
		[breakpoints.up('lg')]: {
			fontSize: '18px',
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
	iconWrapper: {
		marginRight: '13.25px',
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
		textDecoration: 'underline',

		'&.normal-text': {
			textDecoration: 'none',
			color: palette.text.primary,
		},
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
}));

interface AppointmentCardProps {
	appointment: AppointDetail;
	isOldAppointment?: boolean;
}

const AppointmentCard = ({ appointment, isOldAppointment = false }: AppointmentCardProps) => {
	const { id, channel, disease, date, time, patient, scheduleID } = appointment;
	const classes = useStyles();
	const history = useHistory();
	const { t } = useTranslation('appointmentList');
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

	return (
		<Card className={classes.card} onClick={onClick}>
			<div className={classes.wrapper}>
				<div className={classes.titleWrapper}>
					<Typography className={clsx(classes.title, 'capitalize')} component="span">
						{channel}{' '}
					</Typography>
					<Typography className={classes.title} component="span">
						{t('appointments.of')}{' '}
					</Typography>
					<Typography className={clsx(classes.title, 'bold')} component="span">
						{disease}
					</Typography>
				</div>
				<div className={classes.infoWrapper}>
					<div className={classes.section}>
						<Typography className={classes.sectionTitle}>{t('appointments.when.title')}</Typography>
						<div>
							<div className={classes.dataWrapper}>
								<div className={classes.iconWrapper}>
									<CalendarIcon className={classes.calendarIcon} />
								</div>
								<Typography>{capitalizeDate(date)}</Typography>
							</div>
							<div className={classes.dataWrapper}>
								<div className={classes.iconWrapper}>
									<ClockIcon className={classes.clockIcon} />
								</div>
								<Typography
									color="primary"
									className={clsx(classes.conferenceLink, isOldAppointment ? 'normal-text' : '')}
									onClick={isOldAppointment ? undefined : openConference}
								>
									{time}
								</Typography>
							</div>
						</div>
					</div>
					<div>
						<Typography className={clsx(classes.sectionTitle, 'patient')}>{t('appointments.patient.title')}</Typography>
						<div>
							<div className={classes.dataWrapper}>
								<div className={clsx(classes.iconWrapper, 'user')}>
									<UserIcon className={classes.userIcon} />
								</div>
								<Typography>{patient}</Typography>
							</div>
						</div>
					</div>
				</div>
				<div className={classes.moreDetailWrapper}>
					<Button className={classes.moreDetailButton} onClick={onClick} variant="text">
						{t('appointments.seeDetail')}
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default AppointmentCard;
