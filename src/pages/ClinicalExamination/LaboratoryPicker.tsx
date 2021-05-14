import React from 'react';
import clsx from 'clsx';
import { Laboratory } from 'types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';
import AvailableTimePicker from './components/AvailableTimes';
import { modalityOptions } from './constants';

interface LaboratoryPickerProps {
	laboratories: Laboratory[];
	modalityId: number;
	onChoose: (value: Laboratory) => void;
	selectedLaboratory: Laboratory | undefined;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	laboratorioWrapper: {
		backgroundColor: 'white',
		padding: '40px 24px',
		marginBottom: '8px',
		boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
		[breakpoints.up('lg')]: {
			borderRadius: '10px',
			padding: '34px 0 23px 36px',
			marginBottom: '25px',
			boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
		},
	},
	laboratory: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '20px',
	},
	photoWrapper: {
		paddingRight: '20px',
		[breakpoints.up('lg')]: {
			paddingRight: '58px',
		},
	},
	nameWrapper: {
		paddingBottom: '10px',
	},
}));

const LaboratoryPicker = ({ laboratories, modalityId, onChoose, selectedLaboratory }: LaboratoryPickerProps) => {
	const classes = useStyles();

	const renderItem = (laboratory: Laboratory, index: number) => {
		return (
			<div className={classes.laboratorioWrapper} key={index}>
				<div className={classes.laboratory}>
					<div className={classes.photoWrapper}>
						<img className={classes.photo} src="" alt="doctor" />
					</div>
					<div className={classes.info}>
						<div className={classes.nameWrapper}>
							<Typography component="span" className={clsx(classes.name, 'no-caps')}>
								{laboratory.name}
							</Typography>
							<Typography component="span" className={classes.name}></Typography>
						</div>
						<div className={classes.flexWrapper}>
							<div className={classes.specialityWrapper}>
								<Typography className={classes.speciality}>Modalidad de Servicio:</Typography>
							</div>
							<div>
								<Typography className={classes.cmp}>
									{modalityOptions.find((x) => x.value === modalityId)?.label || ''}
								</Typography>
							</div>
							<div className={classes.right}></div>
							<div className={classes.right}>
								<Typography className={classes.precio}>S/. {laboratory.total_cost}</Typography>
							</div>
						</div>
						<div className={classes.ratingWrapper}>
							<Button className={classes.editModality}>Ver Detalle</Button>
						</div>
					</div>
				</div>
				<div className={classes.availableTitleWrapper}>
					<Typography className={classes.availableTitle} component="span">
						ELIGE UN HORARIO:
					</Typography>
				</div>
				<div className={classes.timesWrapper}>
					<AvailableTimePicker
						availableTimes={laboratory.available_times}
						selectedLaboratory={selectedLaboratory}
						onChoose={(aT) => {
							onChoose({
								...laboratory,
								selected_time: aT,
							});
						}}
					/>
				</div>
			</div>
		);
	};
	return <>{laboratories.map(renderItem)}</>;
};

export default LaboratoryPicker;
