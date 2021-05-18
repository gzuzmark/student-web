import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles';

import { Formik, Form, Field } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { DatePickerField } from 'pages/common';

import { stylesWithTheme } from 'utils/createStyles';

import { ExamDataValues } from '../ExamForm';
import { ContactPatientValues } from '../ContactPatient';
import { modalityOptions } from 'pages/ClinicalExamination/constants';
import LaboratoryPicker from 'pages/ClinicalExamination/LaboratoryPicker';
import { Laboratory } from 'types';
import { getLaboratoriesList } from 'pages/api';

export interface LaboratoryFormValues {
	selectedLaboratory: Laboratory | undefined;
	dateLaboratory: Date | undefined;
}

interface ContactFormProps {
	previousData: {
		contactData: ContactPatientValues | undefined;
		examData: ExamDataValues | undefined;
	};
	laboratoryData: LaboratoryFormValues | undefined;
	onChangeStep: (values: LaboratoryFormValues, onError?: Function) => void;
}

const initialValues: LaboratoryFormValues = {
	selectedLaboratory: undefined,
	dateLaboratory: undefined,
};

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
	},
	labelAddress: {
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
		// float: 'left',
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
}));

const LaboratoryForm = ({ previousData, laboratoryData, onChangeStep }: ContactFormProps) => {
	const { t } = useTranslation('clinicalExamination');
	const classes = useStyles();
	const history = useHistory();

	const [laboratories, setLaboratories] = useState<Laboratory[]>([]);

	const onSubmit = useCallback(
		async (values: LaboratoryFormValues, { setSubmitting }: { setSubmitting: Function; setFieldError: Function }) => {
			onChangeStep(values);
			setSubmitting(false);
		},
		[onChangeStep],
	);

	const handleContinueClick = () => {
		history.push('/pago_laboratory');
	};

	// if (!previousData.contactData || !previousData.examData) return <Redirect to="/examenes/registrar" />;

	const checkLaboratoriesByDate = async (date: Date) => {
		const result = await getLaboratoriesList({
			date,
			modalityId: Number(previousData.examData?.modality),
			laboratoryExamIds: previousData.examData?.typeExam.map((x) => x.id) || [],
		});
		setLaboratories(result);
	};

	return (
		<Formik initialValues={laboratoryData || initialValues} onSubmit={onSubmit} enableReinitialize>
			{/* {({ submitForm, isSubmitting, values, setFieldValue }) => ( */}
			{({ isSubmitting, values, setFieldValue }) => (
				<Form className={classes.fieldWrapper}>
					<div className={classes.form}>
						<FormControl className={classes.text}>
							<Typography variant="body1" className={classes.type}>
								{t('left.label.modalidad')}
							</Typography>
						</FormControl>
						<FormControl className={classes.select}>
							<Select variant="outlined" id="modality" disabled value={previousData.examData?.modality}>
								{modalityOptions.map((m) => (
									<MenuItem key={m.value} value={m.value}>
										{m.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl className={classes.right}>
							<FormControl className={classes.text1}>
								<Typography className={classes.labelAddress} variant="body1">
									{t('left.label.address')}
								</Typography>
								<Typography variant="body1">{previousData.contactData?.address}</Typography>
							</FormControl>
						</FormControl>
					</div>
					<div className={classes.spacy}></div>
					<div className={classes.form}>
						<Divider className={classes.divider} />
					</div>
					<div className={classes.spacy}></div>
					<FormControl className={classes.fieldWrapperExam}>
						<Typography variant="body1" className={classes.fieldWrapperExam}>
							{t('left.label.exams')}
						</Typography>
						{previousData.examData?.typeExam.map((e, index) => (
							<div key={index} className={classes.labelExam}>
								<div className={classes.textExam}>{e.name}</div>
							</div>
						))}
					</FormControl>
					<div className={classes.form}>
						<Divider className={classes.divider} />
					</div>
					<div className={classes.spacy}></div>
					<div className={classes.form}>
						<div className={classes.spacy}></div>
						<Typography component="span" className={classes.left}>
							<Trans i18nKey={`clinicalExamination:${'left.label.dateLaboratory'}`} />
						</Typography>
						<FormControl className={classes.right}>
							<Field
								label={t('right.modality.Fecha')}
								component={DatePickerField}
								name="dateLaboratory"
								TextFieldProps={{
									variant: 'outlined',
									helperText: '',
									fullWidth: true,
									placeholder: 'DD/MM/YYYY',
								}}
								allowSameDateSelection={false}
								onAccept={checkLaboratoriesByDate}
							/>
						</FormControl>
					</div>
					<div className={classes.form}></div>
					<div className={classes.spacy}></div>
					<div className={classes.form}></div>
					<div className={classes.spacy}></div>
					<div className={classes.form}>
						<LaboratoryPicker
							modalityId={Number(previousData.examData?.modality)}
							laboratories={laboratories}
							selectedLaboratory={values.selectedLaboratory}
							onChoose={(lab) => {
								setFieldValue('selectedLaboratory', lab);
							}}
						/>
					</div>
					<div className={classes.form}></div>
					<div className={classes.spacy}></div>
					<div className={classes.form}></div>
					<div className={classes.spacy}></div>
					<div className={classes.form}>
						<div className={classes.container}>
							<FormControl className={classes.leftBottonAdentro}>
								<Button
									// className={classes.leftBottonAdentro}
									variant="contained"
									fullWidth
									onClick={handleContinueClick}
									disabled={isSubmitting}
								>
									{t('left.button.continue')}
								</Button>
							</FormControl>
						</div>
						{/* <FormControl className={classes.rightBottonAdentro}>
							<Button
								className={classes.rightBottonAdentro}
								variant="outlined"
								onClick={submitForm}
								disabled={isSubmitting}
								fullWidth
							>
								{t('left.button.agendar')}
							</Button>
						</FormControl> */}
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default LaboratoryForm;
