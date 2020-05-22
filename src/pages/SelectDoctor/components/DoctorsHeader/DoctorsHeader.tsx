import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { DatePickerInput } from 'pages/common';
import useStyles from './styles';
import AppContext from 'AppContext';

interface DoctorsHeaderProps {
	date: Date | null;
	updateDate: Dispatch<SetStateAction<Date | null>>;
}

const DoctorsHeader = ({ date, updateDate }: DoctorsHeaderProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
	const { useCase } = useContext(AppContext);

	return (
		<div className={classes.form}>
			<div className={classes.datePickerField}>
				<Typography component="div" className={classes.formLabel}>
					{t('right.dateLabel')}
				</Typography>
				<div className={classes.datePickerContainer}>
					<DatePickerInput
						views={['date']}
						open={openDatePicker}
						onOpen={() => {
							setOpenDatePicker(true);
						}}
						onClose={() => {
							setOpenDatePicker(false);
						}}
						value={date}
						onChange={updateDate}
						InputProps={{
							onClick: () => {
								setOpenDatePicker(true);
							},
						}}
					/>
				</div>
			</div>
			<div className={classes.useCaseField}>
				<Typography component="div" className={classes.formLabel}>
					{t('right.useCaseLabel')}
				</Typography>
				<Typography component="div" className={classes.useCaseInput}>
					{useCase}
				</Typography>
			</div>
		</div>
	);
};

export default DoctorsHeader;
