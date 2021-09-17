import { Theme, Typography, createStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Schedule } from 'pages/api';
import { MOBILE, MOBILE_XS } from 'pages/SelectDoctorHour/constants';
import React, { useEffect, useState } from 'react';
import { stylesWithTheme } from 'utils';
import { ActiveDoctorTime } from './DoctorList/DoctorList';
import { validSelectTimeWithNow } from './FunctionsHelper';
import ModalErrorTime from './ModalErrorTime/ModalErrorTime';
import TimeOption from './TimeOption';
import clsx from 'clsx';

const gap = 11;
const itemsDesktop = 5;
const itemsMobile = 4;
const itemsMobileXS = 3;

const useStyles = stylesWithTheme(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			flex: '1',
		},
		times: {
			display: 'flex',
			flex: '1',
			flexWrap: 'wrap',
			boxSizing: 'border-box',
			rowGap: `${gap}px`,
			columnGap: `${gap}px`,
		},
		hourItem: {
			margin: '0px',
			boxSizing: 'border-box',
			width: `calc((100% - ${itemsDesktop - 1} * ${gap}px) / ${itemsDesktop})`,
			[breakpoints.down(MOBILE)]: {
				width: `calc((100% - ${itemsMobile - 1} * ${gap}px) / ${itemsMobile})`,
			},
			[breakpoints.down(MOBILE_XS)]: {
				width: `calc((100% - ${itemsMobileXS - 1} * ${gap}px) / ${itemsMobileXS})`,
			},
		},
		verMasButton: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			boxSizing: 'border-box',
			borderRadius: '8px',
			margin: '0px',
			marginLeft: 'auto',
			padding: '10px 0px',
			background: '#E9FAF5',
			border: '1.5px solid #E9FAF5',
			cursor: 'pointer',
		},
		textVerMas: {
			fontFamily: 'Montserrat, sans-serif',
			fontStyle: 'normal',
			fontWeight: 800,
			fontSize: '12px',
			lineHeight: '16px',
			color: '#1ECD96',
		},
	}),
);

type ModeType = 'short' | 'extended';
// const MAX_IN_SHORT = 4;

interface AvailableTimesProps {
	availableDates: Schedule[];
	doctorId: string;
	selectTime: (scheduleId: string, scheduleIndex: number) => void;
	activeDoctorTime: ActiveDoctorTime;
	mode?: ModeType;
	onSeeMore?: () => void;
}

const AvailableTimes = ({
	availableDates,
	doctorId,
	selectTime,
	activeDoctorTime,
	mode = 'short',
	onSeeMore,
}: AvailableTimesProps) => {
	const classes = useStyles();
	const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [maxItems, setMaxItems] = useState<number>(0);
	const [messageError, setMessageError] = useState('');

	const onClick = (scheduleId: string, scheduleIndex: number) => () => {
		try {
			const schedule: Schedule = availableDates[scheduleIndex];
			validSelectTimeWithNow(schedule);
			selectTime(scheduleId, scheduleIndex);
		} catch (error) {
			if (error instanceof Error) {
				setMessageError(error.message);
				setIsOpenModal(true);
			}
		}
	};

	const format = 'hh:mm a';

	const isSelectedDoctor = activeDoctorTime.doctorID === doctorId;

	const isEmptyTime = activeDoctorTime.scheduleID === '';

	const isButtonActive = (scheduleID: string) =>
		isEmptyTime ? false : activeDoctorTime.scheduleID === scheduleID && isSelectedDoctor;

	useEffect(() => {
		let totalItems = 0;
		if (isDesktop) {
			totalItems = mode === 'short' ? 4 : availableDates.length;
		} else {
			totalItems = mode === 'short' ? 3 : availableDates.length;
		}
		setMaxItems(totalItems);
	}, [isDesktop, mode, availableDates]);

	return (
		<div className={classes.container}>
			<div className={classes.times}>
				{availableDates
					.slice(0, mode === 'short' ? maxItems : availableDates.length)
					.map(({ id, startTime, isDisabled }: Schedule, scheduleIndex: number) => (
						<TimeOption
							key={scheduleIndex}
							className={classes.hourItem}
							scheduleId={id}
							date={startTime}
							onClick={onClick(id, scheduleIndex)}
							disabled={isDisabled}
							active={isButtonActive(id)}
							format={format}
							status={isDisabled ? 'disabled' : activeDoctorTime.scheduleID === id ? 'selected' : 'default'}
						/>
					))}
				{((mode === 'short' && availableDates.length > maxItems) || false) && (
					<div className={clsx(classes.hourItem, classes.verMasButton)} onClick={onSeeMore}>
						<Typography component="span" className={classes.textVerMas}>
							Ver más
						</Typography>
					</div>
				)}
			</div>
			<ModalErrorTime isOpen={isOpenModal} setIsOpen={setIsOpenModal} message={messageError} />
		</div>
	);
};

export default AvailableTimes;
