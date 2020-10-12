import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { DatePickerInput } from 'pages/common';
import { UseCase } from 'pages/api/useCase';
import { ReactComponent as SpecialityIcon } from 'icons/assigment.svg';
import { ReactComponent as MoneyIcon } from 'icons/circleMoney.svg';

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
				<div className={classes.iconWrapper}>
					<SpecialityIcon />
				</div>
				<div>
					<Typography component="div" className={classes.useCaseLabel}>
						{t('right.useCaseLabel')}
					</Typography>
					<Typography component="div" className={classes.useCaseInput}>
						<strong>{useCase ? useCase.name : ''}</strong>
					</Typography>
				</div>
			</div>
			<div className={classes.appointmentCost}>
				<div className={classes.iconWrapper}>
					<MoneyIcon />
				</div>
				<div>
					<Typography component="div" className={classes.appointmentCostLabel}>
						{t('right.appointmentCostLabel')}
					</Typography>
					<Typography component="div" className={classes.useCaseInput}>
						<strong>S/ {useCase ? useCase.totalCost : ''}</strong>
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default DoctorsHeader;
