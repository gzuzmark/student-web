import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react';
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
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
		},
	},
	layout: {
		display: 'flex',
		flexDirection: 'column',
		padding: '12px',
		[breakpoints.up('lg')]: {
			padding: '24px 34px',
		},
	},
	title: {
		paddingBottom: '8px',
		fontWeight: 'bold',
		fontFamily: 'Mulish, sans-serif',
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
		fontSize: '16px',
		color: '#A3ABCC',
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
		[breakpoints.up('lg')]: {
			maxWidth: '164px',
			padding: '14px',
		},
	},
}));

interface RatingDoctorProps {
	onChangeStep: (values: RatingDoctorValues) => void;
	hasRating: boolean;
}

const RatingDoctor = ({ onChangeStep, hasRating }: RatingDoctorProps) => {
	const [rating, setRating] = useState<any>(null);
	const [hoverValue, setHoverValue] = useState<any>(null);
	const [comment, setComment] = useState<string>('');
	const classes = useStyles();
	const stars = [
		{
			description: 'No me gustó',
			question: 'Oh no, ¿Qué ocurrió? (tu comentario será anónimo)',
		},
		{
			description: 'No fue lo que esperaba',
			question: 'Oh no, ¿Qué ocurrió? (tu comentario será anónimo)',
		},
		{
			description: 'Regular',
			question: 'Cuéntanos, ¿en qué puede mejorar tu especialista? (tu comentario será anónimo)',
		},
		{
			description: 'Me gustó',
			question: 'Cuéntanos, ¿qué fue lo que te gustó de tu especialista?',
		},
		{
			description: 'Me encantó',
			question: 'Cuéntanos, ¿qué fue lo que más te gustó de tu especialista?',
		},
	];

	const onSubmit = useCallback(
		(values: RatingDoctorValues) => {
			values = {
				stars: rating,
				comment: comment,
			};
			onChangeStep(values);
		},
		[comment, onChangeStep, rating],
	);
	const HelpText = (): ReactElement | null => {
		if (hoverValue != null) {
			return <Typography className={classes.description}>{stars[hoverValue - 1].description}</Typography>;
		} else if (rating != null)
			return <Typography className={classes.description}>{stars[rating - 1].description}</Typography>;
		return <></>;
	};
	const updateComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};
	return (
		<div className={classes.layout}>
			<div className={classes.wrapper}>
				<div>
					{[...Array(5)].map((star, i) => {
						const ratingValue = i + 1;
						return (
							<Button disabled={hasRating} key={i} onClick={() => setRating(ratingValue)}>
								<StarRateIcon
									style={{ color: ratingValue <= (hoverValue || rating) ? '#FACD40' : '#CDD4F0', fontSize: '60' }}
									onMouseLeave={() => setHoverValue(null)}
									onMouseEnter={() => setHoverValue(ratingValue)}
								/>
							</Button>
						);
					})}
				</div>
				<HelpText />
			</div>
			{rating != null && (
				<>
					<Typography className={classes.question}>{rating == null ? '' : stars[rating - 1].question}</Typography>
					<textarea className={classes.textArea} value={comment} onChange={updateComment} />
					<div className={classes.buttonWrapper}>
						<Button variant="contained" onClick={() => onSubmit(rating)} className={classes.button}>
							Calificar
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
export default RatingDoctor;
