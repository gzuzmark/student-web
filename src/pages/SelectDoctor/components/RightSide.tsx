import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { DesktopDatePicker } from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import { RightLayout } from '../../common';

const useStyles = makeStyles(({ palette, breakpoints }: Theme) =>
	createStyles({
		container: {
			paddingTop: '26px',
			[breakpoints.up('md')]: {
				paddingTop: '65px',
				paddingRight: '104px',
			},
		},
		titleContainer: {
			paddingBottom: '24px',
			[breakpoints.up('md')]: {
				paddingBottom: '33px',
			},
		},
		title: {
			fontSize: '20px',
			lineHeight: '25px',
			[breakpoints.up('md')]: {
				fontSize: '25px',
				lineHeight: '30px',
				letterSpacing: '0.2px',
			},
		},
		form: {
			paddingBottom: '20px',
		},
		formLabel: {
			fontSize: '13px',
			lineHeight: '18px',
			color: palette.info.main,
		},
		divider: {
			display: 'none',
			[breakpoints.up('md')]: {
				display: 'block',
			},
		},
	}),
);

const RightSide = () => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	return (
		<RightLayout className={classes.container}>
			<div className={classes.titleContainer}>
				<Typography component="span" className={classes.title}>
					{t('right.title')}
				</Typography>
			</div>
			<div className={classes.form}>
				<div>
					<Typography component="div" className={classes.formLabel}>
						{t('right.dateLabel')}
					</Typography>
					<div>
						<DesktopDatePicker
							autoOk
							disablePast
							readOnly
							displayStaticWrapperAs="desktop"
							renderInput={(props) => <TextField variant="outlined" {...props} />}
							value={selectedDate}
							onChange={(date) => handleDateChange(date)}
						/>
					</div>
				</div>
				<div>
					<Typography component="div" className={classes.formLabel}>
						{t('right.useCaseLabel')}
					</Typography>
					<Typography component="div">Problemas de Piel</Typography>
				</div>
			</div>
			<Divider className={classes.divider} />
			<div>doctors</div>
		</RightLayout>
	);
};

export default RightSide;
