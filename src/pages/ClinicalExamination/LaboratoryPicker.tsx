import React, { useState, useContext } from 'react';
import AppContext from 'AppContext';
import clsx from 'clsx';
import { AvailableTime, Laboratory } from 'types';

import { Button, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme, addGAEvent } from 'utils';
import AvailableTimePicker from './components/AvailableTimes';
import { modalityOptions } from './constants';
import LaboratoryModal from './components/Laboratory/LaboratoryModal';

import { ExamDataValues } from './components/ExamForm/ExamForm';
import { ContactPatientValues } from './components/ContactPatient/ContactPatientForm';
import { createGuestPatient } from 'pages/api/signup';
import { useHistory } from 'react-router';

interface LaboratoryPickerProps {
	laboratories: Laboratory[];
	modalityId: number;
	onChoose: (value: Laboratory) => void;
	selectedLaboratory: Laboratory | undefined;
	previousData: {
		contactData: ContactPatientValues | undefined;
		examData: ExamDataValues | undefined;
	};
}

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '691px',
		},
	},
	formCard: {
		[breakpoints.up('lg')]: {
			maxWidth: '691px',
		},
	},

	laboratorioWrapper: {
		backgroundColor: 'white',
		padding: '40px 24px',
		marginBottom: '8px',
		boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
		[breakpoints.up('lg')]: {
			borderRadius: '10px',
			padding: '34px 34px 23px 36px',
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
	photo: {
		borderRadius: '51%',
		width: '94px',
		height: '86px',
		[breakpoints.up('lg')]: {
			width: '111px',
			height: '102px',
		},
	},

	tipsWrapper: {
		padding: '40px 26px 27px',
		[breakpoints.up('lg')]: {
			padding: '96px 0 49px 0',
			width: '675px',
		},
	},
	fieldWrapper: {
		paddingBottom: '37px',
		'&:last-child': {
			paddingBottom: '25px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '27px',
			},
		},
	},
	fieldWrapperExam: {
		paddingBottom: '37px',
		'&:last-child': {
			paddingBottom: '25px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '8px',
			'&:last-child': {
				paddingBottom: '27px',
			},
		},
		minWidth: '400px',
	},
	fieldWithHelperText: {
		'& .MuiFormHelperText-root': {
			color: palette.info.main,
		},
		'& .MuiFormHelperText-root.Mui-error': {
			color: palette.error.main,
		},
	},
	privacyPolicyWrapper: {
		paddingBottom: '19px',
		[breakpoints.up('lg')]: {
			paddingBottom: '28px',
			marginRight: '-40px',
		},
	},
	negrita: {
		fontWeight: 600,
		fontSize: '15px',
		lineHeight: '25px',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			lineHeight: '30px',
			letterSpacing: '0.2px',
		},
	},
	legalInformation: {
		fontSize: '13px',
		color: palette.info.main,
	},
	privacyPolicyLink: {
		fontSize: '13px',
		cursor: 'pointer',
		textDecoration: 'underline',
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		minWidth: 120,
		paddingTop: 20,
	},
	text1: {
		padding: 0,
		color: '#1ECD96',
	},
	dateLaboratory: {
		minWidth: 320,
		paddingTop: 20,
		float: 'left',
	},
	cmp: {
		fontSize: '12px',
		lineHeight: '17px',
		[breakpoints.up('lg')]: {
			paddingRight: '57px',
			paddingBottom: '11px',
		},
	},
	precio: {
		fontSize: '20px',
		fontWeight: 'bold',
		lineHeight: '17px',
	},
	ratingWrapper: {
		display: 'flex',
		paddingBottom: '12px',
		[breakpoints.up('lg')]: {
			paddingBottom: '22px',
		},
		float: 'right',
	},
	doctorRating: {
		'&&': {
			color: palette.primary.main,
		},
	},
	ratingNumber: {
		fontSize: '13px',
		lineHeight: '24px',
	},
	doctorMoreInfo: {
		textDecoration: 'none',
		fontSize: '13px',
		lineHeight: '18px',
		padding: '6px 0',
		'&:hover': {
			textDecoration: 'none',
		},
	},
	flexWrapper: {
		paddingBottom: '8px',
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
	specialityWrapper: {
		paddingBottom: '5px',
		[breakpoints.up('lg')]: {
			paddingRight: '2px',
			paddingBottom: '11px',
		},
	},
	name: {
		fontSize: '15px',
		lineHeight: '18px',
		textTransform: 'capitalize',
		fontWeight: 'bold',
		'&.no-caps': {
			textTransform: 'none',
		},
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			lineHeight: '25px',
		},
	},
	left: {
		float: 'left',
	},
	leftBotton: {
		float: 'left',
		width: '50%',
		padding: '8px 0 !important',
	},
	leftBottonAdentro: {
		float: 'left',
		width: '300px',
		padding: '8px 0 !important',
	},
	right: {
		float: 'right',
	},
	rightBotton: {
		padding: '8px 0',
		float: 'right',
		width: '50%',
	},
	rightBottonAdentro: {
		padding: '8px 0',
		float: 'right',
		width: '300px',
	},
	type: {
		fontWeight: 600,
	},
	input: {
		padding: '10px 14px',
	},
	select: {
		minWidth: 200,
		maxWidth: 150,
	},
	search: {
		maxWidth: 180,
	},
	spacy: {
		lineHeight: '18px',
		paddingBottom: '28px',
	},
	labelExam: {
		display: 'flex',
		padding: '8px 14px 8px 18px',
		alignItems: 'center',
		borderRadius: '255px',
		marginBottom: '10px',
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	textExam: {
		color: '#535B6C',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			lineHeight: '20px',
		},
		fontFamily: 'Montserrat,-apple-system,sans-serif',
		fontWeight: '500',
		lineHeight: '18px',
		letterSpacing: '0.2px',
	},
	icon: {
		cursor: 'pointer',
		height: '20px',
	},
	editModality: {
		// textDecoration: 'none',
		fontSize: '13px',
		// lineHeight: '18px',
		// padding: '6px 0',
		// '&:hover': {
		// 	textDecoration: 'none',
		// },
		float: 'right',
		paddingRight: 0,
	},
	actionsWrapper: {
		[breakpoints.up('lg')]: {
			width: '401px',
			margin: '0 auto',
		},
	},
	updateAddress: {
		marginBottom: '12px',
		padding: '16px 0',
		[breakpoints.up('lg')]: {
			marginBottom: '26px',
			padding: '21.5px 0',
		},
	},
	seeEPrescription: {
		textTransform: 'none',
		padding: '11px 0',
		marginBottom: '28px',
		[breakpoints.up('lg')]: {
			marginBottom: '41px',
			padding: '19.5px 0',
		},
	},
	// modal
	card: {
		left: '50%',
		position: 'relative',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		width: '327px',
		[breakpoints.up('lg')]: {
			width: '856px',
		},
	},
	wrapper: {
		textAlign: 'center',
		padding: '58px 30px 0',
		[breakpoints.up('lg')]: {
			padding: '75px 107px 0',
		},
	},
	title: {
		paddingBottom: '28px',
		[breakpoints.up('lg')]: {
			paddingBottom: '39px',
		},
	},
	actions: {
		[breakpoints.up('lg')]: {
			display: 'flex',
			justifyContent: 'space-between',
		},
	},
	action: {
		width: '180px',
		marginBottom: '25px',
		[breakpoints.up('lg')]: {
			width: '300px',
			marginBottom: '0',
		},
	},
	timesWrapper: {
		[breakpoints.up('lg')]: {
			display: 'flex',
			alignItems: 'center',
		},
	},
	continueButton: {
		fontSize: '15px',
		textTransform: 'unset',
		[breakpoints.up('lg')]: {
			width: '171px',
			fontSize: '13px',
			lineHeight: '18px',
			padding: '11.5px 0',
		},
	},
}));

const LaboratoryPicker = ({
	laboratories,
	modalityId,
	onChoose,
	selectedLaboratory,
	previousData,
}: LaboratoryPickerProps) => {
	const classes = useStyles();
	const { t } = useTranslation('clinicalExamination');
	const { updateState: updateContextState } = useContext(AppContext);
	const { push } = useHistory();

	const [selectedLab, setSelectedLab] = useState<Laboratory | null>(null);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
	const selectLabForModal = (index: number) => {
		setSelectedLab(laboratories[index]);
	};
	const closeDetailModal = () => {
		setIsDetailModalOpen(false);
	};
	const openDetailedModal = () => {
		setIsDetailModalOpen(true);
	};

	const [activeLabTime, setActiveLabTime] = useState<AvailableTime>();

	const continueToPreRegister = React.useCallback(
		async (laboratorio: Laboratory | undefined, schedules: AvailableTime | undefined) => {
			try {
				if (updateContextState) {
					const cd = previousData.contactData;
					const ContactData = {
						name: cd?.name || '',
						lastName: cd?.lastName || '',
						secondSurname: cd?.secondSurname || '',
						identification: cd?.identification || '',
						identificationType: cd?.identificationType || '',
						birthDate: new Date('01/01/1970') || '',
						gender: 0,
						phoneNumber: cd?.phoneNumber || '',
						email: cd?.email || '',
						address: cd?.address || '',
						isTerm: cd?.isTerm || false,
						isClub: cd?.isClub || false,
					};
					await createGuestPatient(ContactData);

					updateContextState({
						laboratorio,
						schedules,
						user: ContactData,
						labExamn: {
							modality: modalityId,
							typeExam: previousData.examData?.typeExam,
							files: previousData.examData?.files || [],
						},
						labFiles: previousData.examData?.files || [],
						labAva: {
							laboratory_exam_id: laboratorio?.id,
							available_time_id: schedules?.id,
							price: laboratorio
								? modalityId === 1
									? laboratorio?.total_cost + laboratorio?.delivery_cost
									: laboratorio?.total_cost
								: 0,
						},
					});

					addGAEvent({ category: 'Agendar cita - Paso 2', action: 'Avance satisfactorio', label: '(not available) ' });
					push('/pago_laboratory');
				}
				// console.log(previousData.examData)
				// console.log(laboratorio)
				// console.log(schedules)
			} catch (e) {
				console.log(e);
			}
		},
		[updateContextState, previousData.contactData, previousData.examData, modalityId, push],
	);

	const continueToPreRegister1 = () => {
		continueToPreRegister(selectedLaboratory, activeLabTime);
	};

	const renderItem = (laboratory: Laboratory, index: number) => {
		return (
			<div>
				<div className={classes.laboratorioWrapper} key={index}>
					<div className={classes.laboratory}>
						<div className={classes.photoWrapper}>
							<img className={classes.photo} src={laboratory.logo} alt="doctor" />
						</div>
						<div className={classes.info} style={{ display: 'flex', width: '100%' }}>
							<div style={{ flex: '3' }}>
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
										<Typography className={classes.speciality}>
											{modalityOptions.find((x) => x.value === modalityId)?.label || ''}
										</Typography>
									</div>
								</div>
							</div>
							<div style={{ flex: '1' }}>
								<div className={classes.right}>
									<Typography className={classes.precio}>
										S/. {modalityId === 1 ? laboratory.total_cost + laboratory.delivery_cost : laboratory.total_cost}
									</Typography>
								</div>
								<div style={{ paddingRight: '0' }}>
									<Button
										className={classes.editModality}
										onClick={() => {
											selectLabForModal(index);
											openDetailedModal();
										}}
									>
										Ver Detalle
									</Button>
								</div>
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
							selectedLaboratory={selectedLaboratory}
							availableTimes={laboratory.available_times}
							onChoose={(aT) => {
								onChoose({
									...laboratory,
									selected_time: aT,
								});
								setActiveLabTime(aT);
							}}
						/>
						{selectedLaboratory?.ruc === laboratory.ruc ? (
							<Button fullWidth className={classes.continueButton} variant="contained" onClick={continueToPreRegister1}>
								{t('left.button.continue')}
							</Button>
						) : null}
					</div>
				</div>
				<LaboratoryModal laboratory={selectedLab} isOpen={isDetailModalOpen} onClose={closeDetailModal} />
			</div>
		);
	};
	return <>{laboratories.map(renderItem)}</>;
};

export default LaboratoryPicker;
