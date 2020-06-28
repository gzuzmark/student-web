import React from 'react';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { Recomendation } from 'pages/api';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	title: {
		borderBottom: `1px solid ${palette.info.main}`,
		color: palette.info.main,
		fontSize: '15px',
		lineHeight: '28px',
		marginBottom: '24px',
		paddingBottom: '5px',
		[breakpoints.up('lg')]: {
			paddingBottom: '10px',
			marginBottom: '23px',
			marginRight: '465px',
		},
	},
	recomendation: {
		fontSize: '15px',
		fontWeight: '400',
		lineHeight: '20px',
	},
}));

interface RecomendationsProps {
	recomendations: Recomendation[];
}

const Recomendations = ({ recomendations }: RecomendationsProps) => {
	const classes = useStyles();
	const { t } = useTranslation('appointmentDetail');

	return (
		<div>
			<Typography className={classes.title}>{t('appointmentDetail.recomendations.title')}</Typography>
			<div>
				{recomendations.map(({ description }, index) => (
					<Typography key={`recomendation-${index}`} className={classes.recomendation}>
						- {description}
					</Typography>
				))}
			</div>
		</div>
	);
};

export default Recomendations;
