import React, { useRef, useLayoutEffect } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import animateScrollTo from 'animated-scroll-to';
import clsx from 'clsx';

import { OptionsGroup, Option } from 'pages/common';
import { ReactComponent as UserIcon } from 'icons/user.svg';
import { ReactComponent as CompanionIcon } from 'icons/companion.svg';
import { ReactComponent as MehIcon } from 'icons/meh.svg';
import { ReactComponent as SadIcon } from 'icons/sad.svg';
import { TriagePair, MYSELF, RELATIVE, SELECT_DOCTOR_STEP } from 'AppContext';
import { getKeyValue, addGAEvent } from 'utils';

import validationSchema from './validationSchema';
import useStyles from './styles';

interface TriageFromValues {
	appointmentOwner: string;
	discomfortLvl: string;
	discomfortDescription: string;
	discomfortDuration: string;
}

interface TriageFormProps {
	updateContextState: Function | undefined;
}

const STRONG = 'strong';
const MODERATE = 'moderate';
const SLIGHT = 'slight';

const initialValues = {
	appointmentOwner: '',
	discomfortLvl: '',
	discomfortDescription: '',
	discomfortDuration: '',
};

const createQuestionsMap = (t: Function): Record<string, string> => ({
	appointmentOwner: t('triage.fields.appointmentOwner.label'),
	discomfortLvl: t('triage.fields.discomfortLvl.label'),
	discomfortDescription: t('triage.fields.discomfortDescription.label'),
	discomfortDuration: t('triage.fields.discomfortDuration.label'),
});

const createQuestionsAndAnswersArr = (values: TriageFromValues, t: Function): TriagePair[] => {
	const questions = createQuestionsMap(t);

	// TODO: if the form value ever changes, a validation of the key type would beneeded
	return Object.keys(values).map<TriagePair>((key: string) => ({
		question: questions[key],
		answer: getKeyValue<keyof TriageFromValues, TriageFromValues>(key as keyof TriageFromValues)(values),
	}));
};

const TriageForm = ({ updateContextState }: TriageFormProps) => {
	const classes = useStyles();
	const history = useHistory();
	const howBadIsItQuestionRef = useRef<Element | null>(null);
	const discomfortDescriptionQuestionRef = useRef<Element | null>(null);
	const { t } = useTranslation('triage');
	const scrollToElement = (element: Element | null) => () => {
		if (element) {
			animateScrollTo(element, { verticalOffset: -50, speed: 750 });
		}
	};
	const onSubmit = (
		{ appointmentOwner, ...others }: TriageFromValues,
		{ setSubmitting }: { setSubmitting: Function },
	) => {
		if (updateContextState) {
			const triageArr = createQuestionsAndAnswersArr({ appointmentOwner, ...others }, t);

			updateContextState({ appointmentOwner, triage: triageArr, appointmentCreationStep: SELECT_DOCTOR_STEP });
			setSubmitting(false);
			history.push('/seleccionar_doctor');
		}
	};
	useLayoutEffect(() => {
		howBadIsItQuestionRef.current = document.querySelector('.how-bad-it-is-question');
		discomfortDescriptionQuestionRef.current = document.querySelector('.discomfort-description-question');
	}, []);

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ submitForm, isSubmitting }) => (
				<>
					<Form className={classes.form}>
						<div className={classes.fieldWrapper}>
							<Typography className={classes.fieldPrefix} variant="h3">
								{t('triage.fields.appointmentOwner.prefix')}
							</Typography>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel className={classes.fieldLabel}>{t('triage.fields.appointmentOwner.label')}</FormLabel>
							</div>
							<Field
								component={OptionsGroup}
								className={classes.optionField}
								fieldClassName={classes.smallerOptionField}
								name="appointmentOwner"
								fullWidth
							>
								<Option
									variant="outlined"
									wrapperClassName={classes.optionWrapper}
									className={classes.option}
									classes={{ active: classes.optionActive }}
									value={MYSELF}
									onClick={scrollToElement(howBadIsItQuestionRef.current)}
									disableRipple
									disableFocusRipple
									disableTouchRipple
								>
									<div className={classes.optionBody}>
										<div className={clsx(classes.optionIconWrapper, 'option-icon-wrapper')}>
											<UserIcon className={classes.userIcon} />
										</div>
										<Typography variant="h3">{t('triage.fields.appointmentOwner.forMe')}</Typography>
									</div>
								</Option>
								<Option
									variant="outlined"
									wrapperClassName={classes.optionWrapper}
									classes={{ active: classes.optionActive }}
									className={classes.option}
									value={RELATIVE}
									onClick={scrollToElement(howBadIsItQuestionRef.current)}
									disableRipple
									disableFocusRipple
									disableTouchRipple
								>
									<div className={classes.optionBody}>
										<div className={clsx(classes.optionIconWrapper, 'option-icon-wrapper')}>
											<CompanionIcon className={classes.companionIcon} />
										</div>
										<Typography variant="h3">{t('triage.fields.appointmentOwner.forSomeoneElse')}</Typography>
									</div>
								</Option>
							</Field>
						</div>
						<div className={clsx(classes.fieldWrapper, 'how-bad-it-is-question')}>
							<Typography className={classes.fieldPrefix} variant="h3">
								{t('triage.fields.discomfortLvl.prefix')}
							</Typography>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel className={classes.fieldLabel}>{t('triage.fields.discomfortLvl.label')}</FormLabel>
							</div>
							<Field component={OptionsGroup} className={classes.optionField} name="discomfortLvl" fullWidth>
								<Option
									variant="outlined"
									wrapperClassName={classes.optionWrapper}
									classes={{ active: classes.optionActive }}
									className={clsx(classes.option, 'long-text')}
									value={STRONG}
									onClick={scrollToElement(discomfortDescriptionQuestionRef.current)}
									disableRipple
									disableFocusRipple
									disableTouchRipple
								>
									<div className={classes.optionBody}>
										<div className={clsx(classes.optionIconWrapper, 'option-icon-wrapper')}>
											<SadIcon className={classes.companionIcon} />
										</div>
										<div className={classes.discomfortLvlText}>
											<Typography variant="h3">{t('triage.fields.discomfortLvl.strong')}</Typography>
											<Typography>{t('triage.fields.discomfortLvl.strong.helpText')}</Typography>
										</div>
									</div>
								</Option>
								<Option
									variant="outlined"
									wrapperClassName={classes.optionWrapper}
									classes={{ active: classes.optionActive }}
									className={clsx(classes.option, 'long-text')}
									value={MODERATE}
									onClick={scrollToElement(discomfortDescriptionQuestionRef.current)}
									disableRipple
									disableFocusRipple
									disableTouchRipple
								>
									<div className={classes.optionBody}>
										<div className={clsx(classes.optionIconWrapper, 'option-icon-wrapper')}>
											<SadIcon className={classes.companionIcon} />
										</div>
										<div className={classes.discomfortLvlText}>
											<Typography variant="h3">{t('triage.fields.discomfortLvl.moderate')}</Typography>
											<Typography>{t('triage.fields.discomfortLvl.moderate.helpText')}</Typography>
										</div>
									</div>
								</Option>
								<Option
									variant="outlined"
									wrapperClassName={classes.optionWrapper}
									classes={{ active: classes.optionActive }}
									className={clsx(classes.option, 'long-text')}
									value={SLIGHT}
									onClick={scrollToElement(discomfortDescriptionQuestionRef.current)}
									disableRipple
									disableFocusRipple
									disableTouchRipple
								>
									<div className={classes.optionBody}>
										<div className={clsx(classes.optionIconWrapper, 'option-icon-wrapper')}>
											<MehIcon className={classes.companionIcon} />
										</div>
										<div className={classes.discomfortLvlText}>
											<Typography variant="h3">{t('triage.fields.discomfortLvl.slight')}</Typography>
											<Typography>{t('triage.fields.discomfortLvl.slight.helpText')}</Typography>
										</div>
									</div>
								</Option>
							</Field>
						</div>
						<div className={clsx(classes.fieldWrapper, 'text-field', 'discomfort-description-question')}>
							<Typography className={classes.fieldPrefix} variant="h3">
								{t('triage.fields.discomfortDescription.prefix')}
							</Typography>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel className={classes.fieldLabel}>{t('triage.fields.discomfortDescription.label')}</FormLabel>
							</div>
							<Field
								component={TextField}
								name="discomfortDescription"
								type="text"
								placeholder={t('triage.fields.discomfortDescription.placeholder')}
								fullWidth
							/>
						</div>
						<div className={clsx(classes.fieldWrapper, 'text-field')}>
							<Typography className={classes.fieldPrefix} variant="h3">
								{t('triage.fields.discomfortDuration.prefix')}
							</Typography>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel className={classes.fieldLabel}>{t('triage.fields.discomfortDuration.label')}</FormLabel>
							</div>
							<Field
								component={TextField}
								name="discomfortDuration"
								type="text"
								placeholder={t('triage.fields.discomfortDuration.placeholder')}
								fullWidth
							/>
						</div>
					</Form>
					<div>
						<Button
							className={classes.submit}
							onClick={() => {
								addGAEvent('event', 'Triaje', 'click');
								submitForm();
							}}
							disabled={isSubmitting}
							variant="contained"
						>
							{t('triage.submit.label')}
						</Button>
					</div>
				</>
			)}
		</Formik>
	);
};

export default TriageForm;
