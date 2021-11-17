import React, { ChangeEvent, useCallback, useState } from 'react';
import { Button, Theme, Typography } from '@material-ui/core';
import { ReactComponent as Face1Disabled } from 'icons/rating/face1_disabled.svg';
import { ReactComponent as Face2Disabled } from 'icons/rating/face2_disabled.svg';
import { ReactComponent as Face3Disabled } from 'icons/rating/face3_disabled.svg';
import { ReactComponent as Face1 } from 'icons/rating/face1.svg';
import { ReactComponent as Face2 } from 'icons/rating/face2.svg';
import { ReactComponent as Face3 } from 'icons/rating/face3.svg';
import { stylesWithTheme } from 'utils';

export interface FinalRatingValues {
	stars: number;
	comment: string;
}
const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '12px',
		[breakpoints.up('lg')]: {
			padding: '24px 34px',
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
	textArea: {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '14px',
		background: '#F0F2FA',
		padding: '16px',
		height: '62px',
		overflow: 'auto',
		resize: 'none',
		borderRadius: '8px',
		border: 'none',
		[breakpoints.up('lg')]: {
			height: '66px',
		},
		'&:focus': {
			outline: 'none !important',
		},
	},
	buttonWrapper: {
		display: 'flex',
		justifyContent: 'end',
		marginTop: '24px',
		[breakpoints.up('lg')]: {
			margin: '40px 0 16px',
		},
	},
	submitButton: {
		padding: '18px',
		minWidth: '50px',
		fontSize: '16px',
		borderRadius: '8px',
		[breakpoints.up('lg')]: {
			maxWidth: '164px',
			padding: '14px',
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
	topBar: {
		padding: '0 12px 12px 12px',
		display: 'flex',
		flexDirection: 'column',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
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
	description: {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '16px',
		color: '#A3ABCC',
		[breakpoints.up('lg')]: {
			marginLeft: '20px',
		},
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
		},
	},
}));
interface RatingProps {
	onChangeStep: (values: FinalRatingValues) => void;
	hasRating: boolean;
}

const FinalRating = ({ hasRating }: RatingProps) => {
	const [rating, setRating] = useState<any>(null);
	const [hoverValue, setHoverValue] = useState<any>(null);
	const [comment, setComment] = useState<string>('');
	const classes = useStyles();
	const iconsDescription = ['Indiferente', 'Algo decepcionado', 'Muy decepcionado'];
	const icons: { [key: string]: React.ReactElement } = {
		1: <Face1 />,
		2: <Face2 />,
		3: <Face3 />,
	};
	const iconsDisabled: { [key: string]: React.ReactElement } = {
		1: <Face1Disabled />,
		2: <Face2Disabled />,
		3: <Face3Disabled />,
	};
	const updateComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};
	const onSubmit = useCallback(
		(values: FinalRatingValues) => {
			values = {
				stars: rating,
				comment: comment,
			};
		},
		[comment, rating],
	);
	return (
		<>
			<div className={classes.topBar}>
				<Typography className={classes.stepNumber}>
					03 <span style={{ color: '#A3ABCC' }}>/03</span>
				</Typography>
				<Typography className={classes.title}>¿Cómo te sentirías si Alivia ya no existiera?</Typography>
				<Typography className={classes.step}>
					03 <span style={{ color: '#A3ABCC' }}>/03</span>
				</Typography>
			</div>
			<div className={classes.wrapper}>
				<div className={classes.buttonContainer}>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						{[...Array(3)].map((el, i) => {
							const ratingValue = i + 1;
							return (
								<Button
									key={i}
									onClick={() => setRating(ratingValue)}
									style={{ padding: '10px', minWidth: '50px' }}
									onMouseEnter={() => setHoverValue(ratingValue)}
									onMouseLeave={() => setHoverValue(null)}
								>
									{ratingValue === (hoverValue || rating) ? icons[ratingValue] : iconsDisabled[ratingValue]}
								</Button>
							);
						})}
					</div>
					{(hoverValue || rating) != null && (
						<Typography className={classes.description}>{iconsDescription[rating - 1]}</Typography>
					)}
				</div>
				{rating != null && (
					<>
						<Typography className={classes.question}>Cuéntamos de manera breve el porqué de tu respuesta</Typography>
						<textarea className={classes.textArea} value={comment} onChange={updateComment} />
						<div className={classes.buttonWrapper}>
							<Button variant="contained" onClick={() => onSubmit(rating)} className={classes.submitButton}>
								Responder
							</Button>
						</div>
					</>
				)}
			</div>
		</>
	);
};
export default FinalRating;
