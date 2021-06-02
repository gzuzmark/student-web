import React, { useCallback } from 'react';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField, Select } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import { stylesWithTheme } from 'utils/createStyles';
import { FilesGroupField } from 'pages/common';

export interface ExamDataValues {
	name: string;
	lastName: string;
	secondSurname: string;
	birthDate: Date | null;
	identification?: string;
	documentIssueDate?: Date | null;
	modality: number;
	typeExam: number | undefined;
	files?: string[];
}

interface ExamFormProps {
	examData: ExamDataValues | undefined;
	onChangeStep: (values: ExamDataValues) => void;
}

const initialValues = {
	name: '',
	lastName: '',
	secondSurname: '',
	birthDate: null,
	gender: undefined,
	identification: '',
	documentIssueDate: null,
	modality: 0,
	typeExam: 0,
	files: [],
};

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '403px',
		},
	},
	fieldWrapper: {
		paddingBottom: '37px',
		'&:last-child': {
			paddingBottom: '20px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '18px',
			'&:last-child': {
				paddingBottom: '23px',
			},
		},
	},
	privacyPolicyWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingBottom: '22px',
		},
	},
	privacyPolicyLink: {
		cursor: 'pointer',
		textDecoration: 'underline',
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
}));

function especialidad(speciality = '') {
	if (speciality === 'Derman') {
		return 'Adjunta al menos dos fotos del problema en piel, una a 10 cm y otra a 30 cm de distancia. (Obligatorio)';
	} else {
		return 'Adjunta fotos o exámenes realizados. (Opcional)';
	}
}

const ExamForm = ({ examData, onChangeStep }: ExamFormProps) => {
	const { t } = useTranslation('clinicalExamination');
	const classes = useStyles();
	const onSubmit = useCallback(
		(values: ExamDataValues, { setSubmitting }: { setSubmitting: Function; setFieldError: Function }) => {
			onChangeStep(values);
			setSubmitting(false);
		},
		[onChangeStep],
	);

	const names = ['Prueba Molecular (PCR -RT)', 'Prueba de Antigeno'];

	return (
		<Formik initialValues={examData || initialValues} onSubmit={onSubmit}>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form}>
					<div>
						<div className={classes.fieldWrapper}>
							<FormControl className={clsx(classes.fieldWrapper, 'with-less-padding')} fullWidth>
								<Field component={TextField} name="modality" variant="outlined" select>
									<MenuItem value={0}>Seleccionar</MenuItem>
									<MenuItem value={1}>Modalidad 1</MenuItem>
									<MenuItem value={2}>Modalidad 2</MenuItem>
								</Field>
							</FormControl>
							<Divider className={classes.divider} />
						</div>
						<div className={classes.fieldWrapper}>
							<Typography component="span">
								<b>{t('examen.typeExam')}</b>
							</Typography>
							<FormControl className={clsx(classes.fieldWrapper, 'with-less-padding')} fullWidth>
								<div className={classes.spacy}></div>
								<Field component={Select} name="exams" variant="outlined" options={names} defaultValue={[]} multiple>
									<MenuItem value={0}>Seleccionar</MenuItem>
									<MenuItem value={1}>Modalidad 1</MenuItem>
									<MenuItem value={2}>Modalidad 2</MenuItem>
								</Field>
							</FormControl>
						</div>
						<Divider className={classes.divider} />
						<div className={classes.spacy}></div>
						<FormControl className={classes.fieldWrapperExam}>
							<div className={classes.labelExam}>
								<div className={classes.textExam}>Prueba Molecular (PCR -RT)</div>
								<div className={classes.icon}>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M9.98783 0.108398C15.4541 0.108398 19.8663 4.53698 19.8663 9.96872C19.8663 15.4249 15.4541 19.829 9.98783 19.829C4.5461 19.829 0.109375 15.4249 0.109375 9.96872C0.109375 4.53698 4.5461 0.108398 9.98783 0.108398ZM9.98783 11.3878L6.36001 15.0335C5.42854 15.9632 4.00683 14.5441 4.93829 13.6144L8.56611 9.96872L4.93829 6.34756C4.00683 5.4178 5.42854 3.9987 6.36001 4.92846L9.98783 8.54962L13.6402 4.92846C14.5716 3.9987 15.9933 5.4178 15.0619 6.34756L11.4095 9.96872L15.0619 13.6144C15.9933 14.5441 14.5716 15.9632 13.6402 15.0335L9.98783 11.3878Z"
											fill="#1ECD96"
										></path>
									</svg>
								</div>
							</div>
							<div className={classes.labelExam}>
								<div className={classes.textExam}>Prueba de Antigeno</div>
								<div className={classes.icon}>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M9.98783 0.108398C15.4541 0.108398 19.8663 4.53698 19.8663 9.96872C19.8663 15.4249 15.4541 19.829 9.98783 19.829C4.5461 19.829 0.109375 15.4249 0.109375 9.96872C0.109375 4.53698 4.5461 0.108398 9.98783 0.108398ZM9.98783 11.3878L6.36001 15.0335C5.42854 15.9632 4.00683 14.5441 4.93829 13.6144L8.56611 9.96872L4.93829 6.34756C4.00683 5.4178 5.42854 3.9987 6.36001 4.92846L9.98783 8.54962L13.6402 4.92846C14.5716 3.9987 15.9933 5.4178 15.0619 6.34756L11.4095 9.96872L15.0619 13.6144C15.9933 14.5441 14.5716 15.9632 13.6402 15.0335L9.98783 11.3878Z"
											fill="#1ECD96"
										></path>
									</svg>
								</div>
							</div>
						</FormControl>
						<div className={classes.fieldWrapper}>
							<input name="isDermatology" value={'Derman'} type="hidden" />
							<Field component={FilesGroupField} inputId="files-input" name="files" labelText={especialidad('')} />
						</div>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('aboutme.submit.text')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ExamForm;
