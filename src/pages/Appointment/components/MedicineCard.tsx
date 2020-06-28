import React from 'react';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { useTranslation } from 'react-i18next';

import { Medicine } from 'pages/api';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	card: {
		boxShadow: 'none',
		'&:hover': {
			boxShadow: 'none',
		},
		marginBottom: '10px',
		padding: '19px 20px 15px 25px',
		'&:last-child': {
			marginBottom: '0px',
		},
		[breakpoints.up('lg')]: {
			padding: '19px 83px 15px 25px',
			marginBottom: '16px',
		},
	},
	cardContent: {
		[breakpoints.up('lg')]: {
			alignItems: 'flex-start',
			display: 'flex',
			justifyContent: 'space-between',
		},
	},
	medicineIndications: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '14px',
		[breakpoints.up('lg')]: {
			paddingBottom: '0',
		},
	},
	circle: {
		backgroundColor: palette.primary.light,
		borderRadius: '51%',
		height: '26px',
		marginRight: '13px',
		width: '26px',
	},
	medicineName: {
		fontSize: '15px',
		lineHeight: '20px',
		fontWeight: '400',
	},
	medicineFrequency: {
		color: palette.info.main,
		fontWeight: '400',
	},
	doctorNoteWrapper: {
		[breakpoints.up('lg')]: {
			width: '285px',
		},
	},
	doctorNoteTitle: {
		color: palette.info.main,
		fontWeight: '400',
	},
	doctorNote: {
		fontWeight: '400',
	},
}));

interface MedicineCardProps {
	info: Medicine;
}

const MedicineCard = ({ info: { frequency, name, notes } }: MedicineCardProps) => {
	const classes = useStyles();
	const { t } = useTranslation('appointmentDetail');

	return (
		<Card className={classes.card}>
			<div className={classes.cardContent}>
				<div className={classes.medicineIndications}>
					<div className={classes.circle} />
					<div>
						<Typography className={classes.medicineName}>{name}</Typography>
						<Typography className={classes.medicineFrequency}>{frequency}</Typography>
					</div>
				</div>
				{notes ? (
					<div className={classes.doctorNoteWrapper}>
						<Typography className={classes.doctorNoteTitle}>
							{t('appointmentDetail.treatment.doctorNotesLabel')}
						</Typography>
						<Typography className={classes.doctorNote}>{notes}</Typography>
					</div>
				) : null}
			</div>
		</Card>
	);
};

export default MedicineCard;
