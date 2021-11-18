import React, { useCallback, useState } from 'react';
import { Button, Theme, Typography } from '@material-ui/core';
import StarRateIcon from '@material-ui/icons/StarRate';
import { stylesWithTheme } from 'utils';

export interface RatingDoctorValues {
	stars: number;
	comment: string;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		//padding: '32px 25px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
		},
	},
	starWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	layout: {
		display: 'flex',
		flexDirection: 'column',
		padding: '12px',
		[breakpoints.up('lg')]: {
			padding: '24px 34px',
		},
	},
	topBar: {
		padding: '0 12px 12px 12px',
		display: 'flex',
		[breakpoints.up('lg')]: {
			padding: '24px 34px',
			borderBottom: '1px solid #CDD4F0',
			justifyContent: 'space-between',
		},
	},
	title: {
		fontFamily: 'Mulish',
		fontWeight: '700',
		fontSize: '20px',
		color: '#494F66',
		lineHeight: '24px',
	},
	textArea: {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '14px',
		background: '#F0F2FA',
		padding: '16px',
		height: '176px',
		overflow: 'auto',
		resize: 'none',
		borderRadius: '8px',
		border: 'none',
		[breakpoints.up('lg')]: {
			height: '96px',
		},
		'&:focus': {
			outline: 'none !important',
		},
	},

	question: {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '16px',
		color: '#494F66',
		lineHeight: '20px',
		padding: '16px 0px',
	},
	description: {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '14px',
		color: '#676F8F',
	},
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '12px 0 16px',
	},
	buttonWrapper: {
		display: 'flex',
		justifyContent: 'end',
		marginTop: '24px',
		[breakpoints.up('lg')]: {
			margin: '40px 0 16px',
		},
	},
	button: {
		padding: '18px',
		width: '100%',
		fontSize: '16px',
		borderRadius: '8px',
		width: '100%',
		[breakpoints.up('lg')]: {
			maxWidth: '164px',
			padding: '14px',
		},
	},
	icon: {
		width: '48px',
		height: '48px',
		transform: 'scale(1.4)',
	},
	btnStar: {
		minWidth: '48px',
		padding: '0',
		[breakpoints.up('lg')]: {
			padding: '0 12px 0 0',
		},
	},
	step: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			fontFamily: 'Mulish',
			fontWeight: '600',
			fontSize: '14px',
			color: '#1ECD96',
			lineHeight: '20px',
		},
	},
	stepNumber: {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '14px',
		color: '#1ECD96',
		lineHeight: '20px',
		paddingBottom: '8px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
}));

interface RatingDoctorProps {
	onChangeStep: (values: RatingDoctorValues) => void;
	hasRating: boolean;
}

const RatingAlivia = ({ onChangeStep, hasRating }: RatingDoctorProps) => {
	const [rating, setRating] = useState<any>(null);
	const [hoverValue, setHoverValue] = useState<any>(null);
	const classes = useStyles();

	const onSubmit = useCallback(
		(rating) => {
			onChangeStep(rating);
		},
		[onChangeStep],
	);

	return (
		<>
			<div className={classes.topBar}>
				<Typography className={classes.stepNumber}>
					02 <span style={{ color: '#A3ABCC' }}>/03</span>
				</Typography>
				<Typography className={classes.title}>¿Del 0 al 10 qué tan probable es que recomiendes Alivia?</Typography>
				<Typography className={classes.step}>
					02 <span style={{ color: '#A3ABCC' }}>/03</span>
				</Typography>
			</div>
			<div className={classes.layout}>
				<div className={classes.wrapper}>
					<div>
						{[...Array(11)].map((star, i) => {
							const ratingValue = i + 1;
							return (
								<Button disabled={hasRating} key={i} onClick={() => setRating(ratingValue)} className={classes.btnStar}>
									<div className={classes.starWrapper} key={i}>
										<StarRateIcon
											style={{ color: ratingValue <= (hoverValue || rating) ? '#FACD40' : '#CDD4F0' }}
											onClick={() => setRating(ratingValue)}
											onMouseLeave={() => setHoverValue(null)}
											onMouseEnter={() => setHoverValue(ratingValue)}
											className={classes.icon}
										/>
										<Typography className={classes.description}>{i}</Typography>
									</div>
								</Button>
							);
						})}
					</div>
				</div>
				<div className={classes.footer}>
					<Typography className={classes.description}>No lo recomendaría</Typography>
					<Typography className={classes.description}>Totalmente recomendable</Typography>
				</div>
				{rating != null && (
					<>
						<Typography className={classes.question}>Cuéntanos de manera breve el porqué de tu respuesta</Typography>
						<textarea className={classes.textArea} placeholder="Deja tu comentario" />
						<div className={classes.buttonWrapper}>
							<Button variant="contained" onClick={() => onSubmit(rating)} className={classes.button}>
								Calificar
							</Button>
						</div>
					</>
				)}
			</div>
		</>
	);
};
export default RatingAlivia;
