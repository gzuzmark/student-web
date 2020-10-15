import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Location } from 'icons/location.svg';
// import { ReactComponent as ExamsList } from 'icons/exams_list.svg';
import { ReactComponent as Right } from 'icons/right_arrow.svg';
import { stylesWithTheme, usePageTitle } from 'utils';
import { RightLayout } from 'pages/common';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		paddingTop: '33px',
	},
	title: {
		marginBottom: '21px',
		fontFamily: 'Montserrat',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '20px',
		lineHeight: '28px',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			fontFamily: 'Playfair Display',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontSize: '30px',
			lineHeight: '40px',
			textAlign: 'left',
		},
	},
	card: {
		boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
		display: 'flex',
		cursor: 'pointer',
		alignItems: 'center',
		height: '74px',
		marginBottom: '21px',
		[breakpoints.up('lg')]: {
			height: '85px',
			width: '505px',
			marginBottom: '24px',
		},
	},
	cardContent: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		padding: '0 29px',
		[breakpoints.up('lg')]: {
			justifyContent: 'flex-start',
		},
	},
	iconWrapper: {
		[breakpoints.up('lg')]: {
			marginRight: '35px',
		},
	},
	label: {
		textTransform: 'none',
	},
	mobileArrow: {
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
}));

const Home = () => {
	const { t } = useTranslation('laboratoriesExams');
	const classes = useStyles();
	const history = useHistory();
	// const redirectToExams = () => {
	// 	history.push('/dashboard/laboratorios/examenes');
	// };
	const redirectToMap = () => {
		history.push('/dashboard/laboratorios/cercanos');
	};

	usePageTitle('Laboratorios');

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<Typography className={classes.title}>{t('laboratories.home.title')}</Typography>
				<Card className={classes.card} onClick={redirectToMap}>
					<div className={classes.cardContent}>
						<div className={classes.iconWrapper}>
							<Location />
						</div>
						<div>
							<Typography className={classes.label} variant="button" color="primary">
								{t('laboratories.home.laboratoriesMap')}
							</Typography>
						</div>
						<div className={classes.mobileArrow}>
							<Right />
						</div>
					</div>
				</Card>
				{/*<Card className={classes.card} onClick={redirectToExams}>
					<div className={classes.cardContent}>
						<div className={classes.iconWrapper}>
							<ExamsList />
						</div>
						<div>
							<Typography className={classes.label} variant="button" color="primary">
								{t('laboratories.home.exams')}
							</Typography>
						</div>
						<div className={classes.mobileArrow}>
							<Right />
						</div>
					</div>
			</Card>*/}
			</div>
		</RightLayout>
	);
};

export default Home;
