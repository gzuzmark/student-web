import React from 'react';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { Medicine } from 'pages/api';
import { stylesWithTheme } from 'utils';

import MedicineCard from './MedicineCard';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	wrapper: {
		paddingBottom: '33px',
		[breakpoints.up('lg')]: {
			paddingBottom: '21px',
		},
	},
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
		},
	},
}));

interface TreatmentProps {
	medicines: Medicine[];
}

const Treatment = ({ medicines }: TreatmentProps) => {
	const { t } = useTranslation('appointmentDetail');
	const classes = useStyles();

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.title}>{t('appointmentDetail.treatment.title')}</Typography>
			<div>
				{medicines.map((medicine, index) => (
					<MedicineCard key={`medicine-${index}`} info={medicine} />
				))}
			</div>
		</div>
	);
};

export default Treatment;
