import React, { ReactElement } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import es from 'date-fns/locale/es';

import { stylesWithTheme, parseUTCDate } from 'utils';
import { PatientOpinion as PatientOpinionType } from 'pages/api/selectDoctor';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	wrapper: {
		paddingBottom: '8px',
		borderBottom: '0.5px solid #CDD4F0',
		'&:last-child': {
			borderBottom: 'none',
		},
	},
	comment: {
		paddingBottom: '12px',
		fontStyle: 'normal',
		color: '#676F8F',
		fontSize: '12px',
		lineHeight: '16px',
		fontFamily: 'Mulish',
		[breakpoints.up('lg')]: {
			fontSize: '16px',
			lineHeight: '20px',
		},
	},
	datePublished: {
		color: palette.info.main,
	},
	scoreWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '20px 0 10px 0',
		[breakpoints.up('lg')]: {
			padding: '20px 0 18px 0',
		},
	},
	score: {
		'&&': {
			color: '#FACD40',
			fontSize: '1rem',
		},
	},
	datePublishedWrapper: {
		paddingRight: '20px',
	},
}));

export interface PatientOpinionProps {
	opinion: PatientOpinionType;
}

const formatDate = (datePublished: number) => formatDistanceToNow(parseUTCDate(datePublished), { locale: es });

const PatientOpinion = ({ opinion: { comment, score, datePublished } }: PatientOpinionProps): ReactElement | null => {
	const classes = useStyles();
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<div className={classes.wrapper}>
			<div className={classes.scoreWrapper}>
				<Rating
					className={classes.score}
					value={score}
					precision={0.5}
					size={isDesktop ? 'medium' : 'small'}
					readOnly
				/>
				<div className={classes.datePublishedWrapper}>
					<Typography className={classes.datePublished}>Hace {formatDate(datePublished)}</Typography>
				</div>
			</div>
			<div>
				<Typography className={classes.comment}>“{comment}”</Typography>
			</div>
		</div>
	);
};

export default PatientOpinion;
