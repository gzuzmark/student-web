import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';

import { RightLayout } from 'pages/common';
import { dateToUTCUnixTimestamp } from 'utils';

import { getMedicalSpecialities, DoctorAvailability } from '../../api';
import { DoctorList } from '../DoctorList';
import { DoctorsHeader } from '../DoctorsHeader';
import useStyles from './styles';

const getDoctors = async (selectedDate: Date | null, useCase: string | undefined, setDoctors: Function) => {
	if (!!selectedDate && !!useCase) {
		const response = await getMedicalSpecialities({ date: dateToUTCUnixTimestamp(selectedDate), useCase });

		setDoctors(response);
	}
};

interface RightSideProps {
	useCase: string | undefined;
	updateContextState: Function | undefined;
}

const RightSide = ({ useCase, updateContextState }: RightSideProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [doctors, setDoctors] = useState<DoctorAvailability[]>([]);
	useEffect(() => {
		getDoctors(selectedDate, useCase, setDoctors);
	}, [selectedDate, useCase]);

	return (
		<RightLayout className={classes.container}>
			<div className={classes.titleContainer}>
				<Typography component="span" className={classes.title}>
					{t('right.title')}
				</Typography>
			</div>
			<DoctorsHeader date={selectedDate} updateDate={setSelectedDate} />
			<Divider className={classes.divider} />
			{doctors.length > 0 ? (
				<DoctorList updateContextState={updateContextState} doctors={doctors} />
			) : (
				<div className={classes.emptyMessageWrapper}>
					<Typography component="div" className={classes.emptyMessage}>
						{t('right.notFoundDoctors')}
					</Typography>
				</div>
			)}
		</RightLayout>
	);
};

export default RightSide;
