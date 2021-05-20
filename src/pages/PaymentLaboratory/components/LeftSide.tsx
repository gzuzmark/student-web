import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import capitalize from 'lodash/capitalize';

import { LeftLayout } from 'pages/common';
// import { Doctor, Schedule } from 'pages/api';
import { Laboratorys, Schedules } from 'pages/api/laboratories';
import { stylesWithTheme, formatUTCDate } from 'utils';
import { User } from 'AppContext';
import { useTranslation } from 'react-i18next';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '18px 26px 0',
		[breakpoints.up('lg')]: {
			padding: '65px 80px 0 0',
		},
	},
	prefix: {
		paddingBottom: '6px',
	},
	title: {
		fontWeight: 'bold',
		paddingBottom: '14px',
		[breakpoints.up('lg')]: {
			paddingBottom: '36px',
		},
	},
	infoWrapper: {
		display: 'flex',
		flexDirection: 'column',
	},
	appointmentSection: {
		order: '3',
		paddingBottom: '15px',
		[breakpoints.up('lg')]: {
			order: '1',
			paddingBottom: '46px',
		},
	},
	appointmentInfo: {
		display: 'flex',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	separator: {
		padding: '0 5px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	appointmentChannel: {
		display: 'none',
		textTransform: 'capitalize',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	patientSection: {
		order: '1',
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			order: '2',
			paddingBottom: '31px',
		},
	},
	patientName: {
		textTransform: 'capitalize',
	},
	doctorSection: {
		order: '2',
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			order: '3',
			paddingBottom: '0px',
		},
	},
	infoTitle: {
		opacity: 0.5,
		paddingBottom: '2px',
		[breakpoints.up('lg')]: {
			paddingBottom: '10px',
		},
	},
	doctorWrapper: {
		alignItems: 'center',
		display: 'flex',
	},
	doctorImgWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingRight: '32px',
		},
	},
	doctorImg: {
		borderRadius: '51%',
		width: '71px',
		height: '66px',
	},
	doctorName: {
		textTransform: 'capitalize',
	},
}));

export interface LabExam {
	modality: number;
	typeExam: string[];
	files: string[];
}

interface LeftSideProps {
	lab: Laboratorys | null | undefined;
	user: User | null | undefined;
	schedule: Schedules | null | undefined;
	labExamn: LabExam | null | undefined;
}

const LeftSide = ({ lab, user, schedule, labExamn }: LeftSideProps) => {
	const classes = useStyles();
	const { t } = useTranslation('paymentLaboratory');

	return (
		<LeftLayout>
			<div className={classes.wrapper}>
				<Typography className={classes.prefix} variant="h3">
					{t('payment.left.prefix')}
				</Typography>
				<Typography className={classes.title} variant="h1">
					{t('payment.left.title')}
				</Typography>
				<div className={classes.infoWrapper}>
					<div className={classes.appointmentSection}>
						<Typography className={classes.infoTitle}>
							Modalidad: {labExamn?.modality === 1 ? 'A Domicilio' : 'Presencial'}
						</Typography>
						<div className={classes.appointmentInfo}>
							<Typography>
								{schedule?.start_time
									? capitalize(formatUTCDate(new Date(schedule?.start_time), "EEEE dd 'de' MMMM 'del' yyyy"))
									: ''}
							</Typography>

							<Typography className={classes.separator}> - </Typography>
							<Typography>
								{schedule?.start_time ? formatUTCDate(new Date(schedule?.start_time), 'h:mm aaa') : ''}
							</Typography>
							{/* <Typography className={classes.appointmentChannel}>{channel}</Typography> */}
						</div>
					</div>

					<div className={classes.patientSection}>
						<Typography className={classes.infoTitle}>{t('payment.left.pacientTitle')}</Typography>
						<Typography className={classes.patientName}>{user?.name + ' ' + user?.lastName}</Typography>
					</div>

					<div className={classes.doctorSection}>
						<Typography className={classes.infoTitle}>Laboratorio</Typography>
						<div className={classes.doctorWrapper}>
							<div className={classes.doctorImgWrapper}>
								<img className={classes.doctorImg} src={lab?.logo} alt="doctor" />
							</div>
							<div>
								<Typography className={classes.doctorName}>{lab?.name}</Typography>
								<div>
									<Typography component="span">RUC </Typography>
									<Typography component="span">{lab?.ruc}</Typography>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LeftLayout>
	);
};

export default LeftSide;
