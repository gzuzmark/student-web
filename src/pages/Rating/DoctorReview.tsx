import { Grid, Theme, Typography } from '@material-ui/core';
import { MainLayout, TopSection } from 'pages';
import { createRatingDoctor, getRatingDoctor } from 'pages/api/rating';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { PAYMENT_ROUTE } from 'routes';
import { stylesWithTheme, useAppointmentStepValidation } from 'utils';
import { useHistory } from 'react-router-dom';
import { CardDoctor, RatingDoctor, RatingAlivia } from './components';
import { RatingDoctorValues } from './components/RatingDoctor';
import { Doctor, Schedule } from 'pages/api';

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
}));

const DoctorReview = () => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation('rating');
	const classes = useStyles();

	const [doctor, setDoctor] = useState<Doctor | null>(null);
	const [schedule, setSchedule] = useState<Schedule | null>(null);
	const [hasRating, setHasRating] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [step, setStep] = useState<number>(0);

	const onChangeStep = async (values: RatingDoctorValues) => {
		console.log(values);
		console.log('paso---->' + step);
		if (step === 0) {
			const resp = await createRatingDoctor(id, values.stars, values.comment);
			if (resp.ok) {
				history.push('/thanks');
			} else {
				// mensaje de error
			}
		}
		setStep(step + 1);
	};

	useEffect(() => {
		getRatingDoctor(id).then((resp) => {
			if (resp.doctor === null && resp.schedule === null) {
				// pagina no encontrada...
				history.push('/rating-not-found');
			} else {
				setDoctor(resp.doctor);
				setSchedule(resp.schedule);
				setHasRating(resp.hasRating);
			}
			setLoading(false);
		});
	}, [id, history]);

	if (loading) {
		return <>Cargando</>;
	}

	if (hasRating) {
		return <>Ya fue calificado</>;
	}

	return (
		<>
			<TopSection>
				<div className={classes.wrapper}>
					<Typography className={classes.title} variant="h1">
						Califica tu experiencia
					</Typography>
					<Typography className={classes.subtitle} variant="h1">
						Hola, ayúdanos a mejorar nuestro servicio calificando tu experiencia
					</Typography>
					<Typography className={classes.subtitle} variant="h1">
						{step}
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
								<Typography className={classes.question}>¿Cómo fue la experiencia con tu especialista?</Typography>
								<RatingDoctor onChangeStep={onChangeStep} />
							</div>
						</Grid>
					</Grid>
				</div>
			</MainLayout>
		</>
	);
};
export default DoctorReview;
