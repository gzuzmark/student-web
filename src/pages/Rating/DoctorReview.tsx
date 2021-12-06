import { Grid, Snackbar, SnackbarContent, Theme, Typography } from '@material-ui/core';
import { MainLayout, TopSection } from 'pages';
import { createRatingDoctor, getRatingDoctor, Patient } from 'pages/api/rating';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { CardDoctor, FinalRating, Header } from './components';
import RatingDoctor, { RatingDoctorValues } from './components/RatingDoctor';
import { Doctor, Schedule } from 'pages/api';
import { ReactComponent as Check } from 'icons/check.svg';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		//padding: '32px 25px',
		textAlign: 'center',
	},
	cont: {
		display: 'flex',
		padding: '12px',
		[breakpoints.up('lg')]: {
			display: 'flex',
			width: '1120px',
			margin: 'auto',
			padding: '0',
		},
	},
	title: {
		fontWeight: 'bold',
		fontFamily: 'Mulish, sans-serif',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingBottom: '8px',
		},
	},
	subtitle: {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '16px',
		lineHeight: '20px',
		color: '#676F8F',
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	area_rating: {
		background: '#FFFFFF',
		borderRadius: '0px 0px 8px 8px',
		[breakpoints.up('lg')]: {
			width: '100%',
		},
	},
	question: {
		padding: '0 12px 12px 12px',
		fontFamily: 'Mulish',
		fontWeight: '700',
		fontSize: '20px',
		color: '#494F66',
		lineHeight: '20px',
		[breakpoints.up('lg')]: {
			//marginBottom: '24px',
			padding: '24px 34px',
			borderBottom: '1px solid #CDD4F0',
		},
	},
	snackbarMessage: {
		display: 'flex',
		color: '#2C7BFD',
		alignItems: 'center',
		padding: '0',
		fontFamily: 'Mulish',
	},
	contentSnackbar: {
		background: '#E5EFFF',
		minWidth: '312px',
		boxShadow: 'none',
		marginTop: '48px',
		justifyContent: 'center',
		[breakpoints.up('lg')]: {
			minWidth: '1390px',
			marginTop: '80px',
		},
	},
	spanMessage: {
		fontFamily: 'Mulish',
		marginLeft: '20px',
		fontSize: '16px',
		fontStyle: 'normal',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
		},
	},
}));

const DoctorReview = () => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	//const { t } = useTranslation('rating');
	const classes = useStyles();

	const [doctor, setDoctor] = useState<Doctor | null>(null);
	const [schedule, setSchedule] = useState<Schedule | null>(null);
	const [patient, setPatient] = useState<Patient | null>(null);
	const [hasRating, setHasRating] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [step, setStep] = useState<number>(0);
	const [open, setOpen] = React.useState(false);
	const vertical = 'top';
	const horizontal = 'center';
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	const onChangeStep = async (values: RatingDoctorValues) => {
		if (step === 0) {
			const resp = await createRatingDoctor(id, values.stars, values.comment);
			if (resp.ok) {
				history.push('/thanks');
			} else {
				// mensaje de error
			}
		}
		if (step === 2) {
			history.push('/thanks');
		}
		setStep(step + 1);
	};

	useEffect(() => {
		getRatingDoctor(id).then((resp) => {
			setDoctor(resp.doctor);
			setPatient(resp.patient);
			setSchedule(resp.schedule);
			setHasRating(resp.hasRating);
			setOpen(resp.hasRating);
			//setStep(resp.step);
			setLoading(false);
		});
	}, [id, history]);

	if (loading) {
		return <>Cargando</>;
	}

	if (hasRating) {
		history.push('/thanks');
	}

	if (schedule === null || doctor === null || patient === null) {
		return <>No se encontró la cita médica especificada</>;
	}

	return (
		<>
			<Header />
			<TopSection>
				<div className={classes.wrapper}>
					{hasRating && (
						<Snackbar
							open={open}
							autoHideDuration={5000}
							onClose={handleClose}
							anchorOrigin={{ vertical, horizontal }}
							ContentProps={{
								className: classes.snackbar,
							}}
						>
							<SnackbarContent
								className={classes.contentSnackbar}
								message={
									<div className={classes.snackbarMessage}>
										<Check />
										<span className={classes.spanMessage}>Ya haz calificado a tu especialista</span>
									</div>
								}
							/>
						</Snackbar>
					)}
					<Typography className={classes.title} variant="h1">
						Califica tu experiencia
					</Typography>
					<Typography className={classes.subtitle} variant="h1">
						Hola {patient.name}, ayúdanos a mejorar nuestro servicio calificando tu experiencia
					</Typography>
				</div>
			</TopSection>
			<MainLayout>
				<div className={classes.cont}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<CardDoctor doctor={doctor} schedule={schedule} />
						</Grid>
						<Grid item xs={12} md={8}>
							<div className={classes.area_rating}>
								{/*<Typography className={classes.question}>¿Cómo fue la experiencia con tu especialista?</Typography>*/}
								{/*<RatingAlivia onChangeStep={onChangeStep} hasRating={hasRating} />*/}
								{/*	<FinalRating onChangeStep={onChangeStep} hasRating={hasRating} />*/}
								{/*<RatingDoctor onChangeStep={onChangeStep} hasRating={hasRating} />*/}
							</div>
						</Grid>
					</Grid>
				</div>
			</MainLayout>
		</>
	);
};

export default DoctorReview;
