import React, { useCallback } from 'react';
import { OutlinedInput } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { DatePickerField } from 'pages/common';
import Divider from '@material-ui/core/Divider';

import { stylesWithTheme } from 'utils/createStyles';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import AvailableTimes from '../AvailableTimes';

export interface ContactValues {
	identification: string;
	identificationType: string;
	phoneNumber: string;
	email?: string;
	password?: string;
	repeatPassword?: string;
	address?: string;
	ubigeo?: string;
}

interface FormikContactValues {
	identification: string;
	identificationType: string;
	phoneNumber: string;
	email: string;
	password: string;
	repeatPassword: string;
	address: string;
	ubigeo: string;
}

interface ContactFormProps {
	onChangeStep: (values: ContactValues, onError?: Function) => void;
}

const initialValues = {
	identification: '',
	identificationType: 'DNI',
	phoneNumber: '',
	email: '',
	password: '',
	repeatPassword: '',
	address: '',
	ubigeo: '',
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
	dateLaboratory: {
		minWidth: 320,
		paddingTop: 20,
		float: 'left',
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

const LaboratoryForm = ({ onChangeStep }: ContactFormProps) => {
	const { t } = useTranslation('clinicalExamination');
	const classes = useStyles();
	const onSubmit = useCallback(
		async (values: ContactValues, { setSubmitting, setFieldError }: FormikHelpers<FormikContactValues>) => {
			try {
				onChangeStep(values);
				setSubmitting(false);
			} catch (e) {
				setFieldError('identification', t('contact.fields.identification.error'));
				setFieldError('phoneNumber', t('contact.phoneNumber.error'));

				if (values.email) {
					setFieldError('email', t('contact.email.error'));
				}
			}
		},
		[onChangeStep, t],
	);

	const sweetArray = ['Laboratorio Pulso', 'Laboratorio Mi Lab'];
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.fieldWrapper}>
					<div className={classes.form}>
						<FormControl className={classes.text}>
							<Typography variant="body1" className={classes.type}>
								{t('left.label.modalidad')}
							</Typography>
						</FormControl>
						<FormControl className={classes.select}>
							<Field
								component={TextField}
								name="modality"
								variant="outlined"
								select
								input={<OutlinedInput classes={{ input: classes.input }} />}
							>
								<MenuItem value={'1'}>A Domicilio</MenuItem>
								<MenuItem value={'2'}> Presencial</MenuItem>
							</Field>
						</FormControl>
						<FormControl className={classes.right}>
							<FormControl className={classes.text}>
								<Typography variant="body1">{t('right.label.calle')}</Typography>
								<div>
									<Button className={classes.editModality}>{t('right.modality.edit')}</Button>
								</div>
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
							/>
						</FormControl>
					</div>
					{/* <div className={classes.form}>
						<div className={classes.spacy}></div>
						<Button onClick={submitForm} disabled={isSubmitting} className={classes.left} variant="outlined" fullWidth>
							<span className={classes.buttonLabel}>Pagar</span>
						</Button>
						<Button className={classes.right} variant="outlined" fullWidth>
							<span className={classes.buttonLabel}>Agendar</span>
						</Button>
					</div> */}
					<div className={classes.form}></div>
					<div className={classes.spacy}></div>
					<div className={classes.form}></div>
					<div className={classes.spacy}></div>
					<div className={classes.form}>
						{sweetArray.map((laboratory) => (
							<div key={laboratory} className={classes.laboratorioWrapper}>
								<div className={classes.laboratory}>
									<div className={classes.photoWrapper}>
										<img className={classes.photo} src="" alt="doctor" />
									</div>
									<div className={classes.info}>
										<div className={classes.nameWrapper}>
											<Typography component="span" className={clsx(classes.name, 'no-caps')}>
												{laboratory}
											</Typography>
											<Typography component="span" className={classes.name}></Typography>
										</div>
										<div className={classes.flexWrapper}>
											<div className={classes.specialityWrapper}>
												<Typography className={classes.speciality}>Modalidad de Servicio:</Typography>
											</div>
											<div>
												<Typography className={classes.cmp}>Domicilio - Presencial</Typography>
											</div>
											<div className={classes.right}></div>
											<div className={classes.right}>
												<Typography className={classes.precio}>S/256</Typography>
											</div>
										</div>

										<div className={classes.ratingWrapper}>
											{/* <Rating className={classes.doctorRating} value={rating} precision={0.5} readOnly /> */}
											<Button className={classes.editModality}>Ver Detalle</Button>
										</div>

										<div>
											<Button
												className={classes.doctorMoreInfo}
												// onClick={() => {
												// 	selectDoctorForModal(doctorIndex);
												// 	openDetailedDoctorModal();
												// }}
											>
												Mas Información
											</Button>
										</div>
									</div>
								</div>
								<div className={classes.availableTitleWrapper}>
									<Typography className={classes.availableTitle} component="span">
										ELIGE UN HORARIO:
									</Typography>
								</div>
								<div className={classes.timesWrapper}>
									<AvailableTimes />
								</div>
							</div>
						))}
					</div>
					<div className={classes.form}></div>
					<div className={classes.spacy}></div>
					<div className={classes.form}></div>
					<div className={classes.spacy}></div>
					<div className={classes.form}>
						<FormControl className={classes.leftBottonAdentro}>
							<Button
								className={classes.leftBottonAdentro}
								variant="contained"
								fullWidth
								onClick={submitForm}
								disabled={isSubmitting}
							>
								{t('left.button.pago')}
							</Button>
						</FormControl>
						<FormControl className={classes.rightBottonAdentro}>
							<Button
								className={classes.rightBottonAdentro}
								variant="outlined"
								onClick={submitForm}
								disabled={isSubmitting}
								fullWidth
							>
								{t('left.button.agendar')}
							</Button>
						</FormControl>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default LaboratoryForm;
