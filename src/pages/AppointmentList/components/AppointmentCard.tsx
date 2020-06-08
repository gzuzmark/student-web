import React from 'react';
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

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	card: {
		borderRadious: '10xp',
		marginBottom: '16px',
		boxShadow: 'none',
		cursor: 'pointer',
		'&:hover': {
			boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
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
	dateWrapper: {
		display: 'flex',
		paddingBottom: '14px',
		[breakpoints.up('lg')]: {
			alignItems: 'center',
		},
	},
	clockWrapper: {
		display: 'flex',
		paddingBottom: '14px',
		[breakpoints.up('lg')]: {
			paddingBottom: '5px',
			alignItems: 'center',
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
		[breakpoints.up('lg')]: {
			maxHeight: '25px',
		},
	},
	calendarIcon: {
		stroke: palette.info.main,
		[breakpoints.up('lg')]: {
			width: '25px',
			height: '25px',
		},
	},
	clockIcon: {
		[breakpoints.up('lg')]: {
			width: '25px',
			height: '25px',
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
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
	const { id, channel, disease, date, time } = appointment;
	const classes = useStyles();
	const history = useHistory();
	const { t } = useTranslation('appointmentList');
	const onClick = () => {
		// eslint-disable-next-line
		// @ts-ignore
		window.appointment = appointment;
		history.push(`/citas/${id}`);
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
				<div className={classes.dateWrapper}>
					<div className={classes.iconWrapper}>
						<CalendarIcon className={classes.calendarIcon} />
					</div>
					<Typography>{capitalizeDate(date)}</Typography>
				</div>
				<div className={classes.clockWrapper}>
					<div className={classes.iconWrapper}>
						<ClockIcon className={classes.clockIcon} />
					</div>
					<Typography>{time}</Typography>
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
