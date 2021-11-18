import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as CalendarIcon } from 'icons/calendarGreen.svg';
import { ReactComponent as ClockIcon } from 'icons/clockGreen.svg';
import capitalize from 'lodash/capitalize';
import { Doctor, Schedule } from 'pages/api';
import React from 'react';
import { stylesWithTheme, formatUTCDate } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		background: '#FFFFFF',
		padding: '0px 12px',
		[breakpoints.up('lg')]: {
			boxShadow: '0px 5px 25px rgba(103, 111, 143, 0.15)',
			borderRadius: '0px 0px 8px 8px',
			borderTop: '4px solid #1ECD96',
			padding: '24px',
		},
	},
	doctorImgWrapper: {
		width: '40px',
		paddingRight: '22px',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingRight: '32px',
			width: '60px',
		},
	},
	doctorWrapper: {
		display: 'flex',
		alignItems: 'center',
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
	doctorName: {
		textTransform: 'capitalize',
	},
	prefix: {
		fontFamily: 'Mulish',
		fontWeight: '700',
		fontSize: '16px',
		color: '#494F66',
		lineHeight: '20px',
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	doctorSection: {
		display: 'flex',
		[breakpoints.up('lg')]: {
			borderBottom: '1px solid #CDD4F0',
			padding: '10px 0px',
		},
	},
	infoTitle: {
		fontFamily: 'Mulish',
		fontWeight: '400',
		fontSize: '12px',
		color: '#A0A4A8',
		lineHeight: '16px',
		paddingBottom: '10px',
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	infoSpeciality: {
		fontFamily: 'Mulish',
		fontWeight: '400',
		fontSize: '12px',
		color: '#A0A4A8',
		lineHeight: '16px',
		paddingBottom: '10px',
	},
	appointmentSection: {
		paddingTop: '8px',
	},
	appointmentInfo: {
		fontFamily: 'Mulish',
		paddingLeft: '5px',
		fontWeight: '600',
		fontSize: '12px',
		color: '#52575C',
		[breakpoints.up('lg')]: {
			paddingLeft: '9.5px',
		},
	},
	iconWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	schedule: {
		background: '#F7F8FC',
		display: 'flex',
		justifyContent: 'space-between',
		borderRadius: '6px',
		padding: '9px',
		[breakpoints.up('lg')]: {
			background: '#FFFFFF',
			display: 'block',
			padding: '0',
		},
	},
}));

interface CardDoctorProps {
	doctor: Doctor | null | undefined;
	schedule: Schedule | null | undefined;
}

const CardDoctor = ({ doctor, schedule }: CardDoctorProps) => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<Typography className={classes.prefix} variant="h1">
				Cita agendada con:
			</Typography>
			<div className={classes.infoWrapper}>
				<div className={classes.doctorSection}>
					<div className={classes.doctorImgWrapper}>
						<img className={classes.doctorImg} src={doctor?.profilePicture} alt="doctor" />
					</div>
					<div className={classes.doctorWrapper}>
						<div>
							<Typography className={classes.doctorName}>{`${doctor?.name} ${doctor?.lastName}`}</Typography>
							<div>
								<Typography className={classes.infoSpeciality}>{doctor?.specialityName}</Typography>
							</div>
						</div>
					</div>
				</div>
				<div className={classes.appointmentSection}>
					<Typography className={classes.infoTitle}>Fecha de cita: </Typography>
					<div className={classes.schedule}>
						<div className={classes.iconWrapper}>
							<CalendarIcon />
							<Typography className={classes.appointmentInfo}>
								{schedule?.startTime
									? capitalize(formatUTCDate(schedule?.startTime, "EEEE dd 'de' MMMM 'del' yyyy"))
									: ''}
							</Typography>
						</div>
						<div className={classes.iconWrapper}>
							<ClockIcon />
							<Typography className={classes.appointmentInfo}>
								{schedule?.startTime ? formatUTCDate(schedule?.startTime, 'h:mm aaa') : ''}
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardDoctor;
