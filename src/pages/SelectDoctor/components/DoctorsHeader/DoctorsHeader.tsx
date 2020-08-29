import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { DatePickerInput } from 'pages/common';
import { UseCase } from 'pages/api/useCase';

import useStyles from './styles';

interface DoctorsHeaderProps {
	date: Date | null;
	updateDate: (newDate: Date | null) => void;
	useCase: UseCase | null | undefined;
	minDate: Date | null;
}

const DoctorsHeader = ({ date, updateDate, useCase, minDate }: DoctorsHeaderProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

	return (
		<div className={classes.form}>
			<div className={classes.datePickerField}>
				<Typography component="div" className={classes.formLabel}>
					{t('right.dateLabel')}
				</Typography>
				<div className={classes.datePickerContainer}>
					<DatePickerInput
						minDate={minDate}
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
					{useCase ? useCase.name : ''}
				</Typography>
			</div>
			<div>
				<Typography component="div" className={classes.formLabel}>
					{t('right.appointmentCostLabel')}
				</Typography>
				<Typography component="div" className={classes.useCaseInput}>
					S/ {useCase ? useCase.totalCost : ''}
				</Typography>
			</div>
		</div>
	);
};

export default DoctorsHeader;
