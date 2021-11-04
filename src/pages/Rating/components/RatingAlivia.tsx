import React, { useCallback, useState } from 'react';
import { Button, Theme, Typography } from '@material-ui/core';
import StarRateIcon from '@material-ui/icons/StarRate';
import { stylesWithTheme } from 'utils';

export interface RatingDoctorValues {
	rate: number;
	lastName: string;
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
}

const RatingAlivia = ({ onChangeStep }: RatingDoctorProps) => {
	const [rating, setRating] = useState<any>(null);
	const [hoverValue, setHoverValue] = useState<any>(null);
	const classes = useStyles();

	const onSubmit = useCallback(
		(rating) => {
			onChangeStep(rating);
		},
		[onChangeStep],
	);
	/*= () => {
		//history.push('/thanks');
	};*/

	return (
		<div className={classes.layout}>
			<div className={classes.wrapper}>
				{[...Array(10)].map((star, i) => {
					const ratingValue = i + 1;
					return (
						<div className={classes.starWrapper} key={i}>
							<StarRateIcon
								style={{ color: ratingValue <= (hoverValue || rating) ? '#FACD40' : '#CDD4F0', fontSize: '60' }}
								onClick={() => setRating(ratingValue)}
								onMouseLeave={() => setHoverValue(null)}
								onMouseEnter={() => setHoverValue(ratingValue)}
							/>
							<Typography className={classes.description}>{i}</Typography>
						</div>
					);
				})}
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
	);
};
export default RatingAlivia;
