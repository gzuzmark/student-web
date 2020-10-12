import React, { ReactElement, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';
import { Doctor } from 'pages/api';
import { ReactComponent as PersonIcon } from 'icons/person.svg';
import { ReactComponent as SchoolIcon } from 'icons/school.svg';
import { ReactComponent as FirstAidKitIcon } from 'icons/first_aid_kit.svg';

import PatientOpinion from './PatientOpinion';

const useStyles = stylesWithTheme(({ breakpoints, palette }) => ({
	paper: {
		[breakpoints.up('lg')]: {
			width: '714px',
			maxHeight: '676px',
			maxWidth: 'none',
		},
	},
	wrapper: {
		position: 'relative',
		padding: '40px 0 0 0',
		[breakpoints.up('lg')]: {
			padding: '60px 70px 0 76px',
		},
	},
	doctor: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 0 36px 24px',
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
			width: '112px',
			height: '117px',
		},
	},
	nameWrapper: {
		paddingBottom: '10px',
	},
	name: {
		fontSize: '15px',
		lineHeight: '18px',
		textTransform: 'capitalize',
		'&.no-caps': {
			textTransform: 'none',
		},
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			lineHeight: '25px',
		},
	},
	specialityWrapper: {
		paddingBottom: '5px',
		[breakpoints.up('lg')]: {
			paddingRight: '27px',
			paddingBottom: '11px',
		},
	},
	speciality: {
		fontSize: '12px',
		lineHeight: '17px',
		textTransform: 'uppercase',
	},
	cmp: {
		fontSize: '12px',
		lineHeight: '17px',
	},
	flexWrapper: {
		paddingBottom: '8px',
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
	ratingWrapper: {
		display: 'flex',
		paddingBottom: '12px',
		[breakpoints.up('lg')]: {
			paddingBottom: '12px',
		},
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
	availabilityButtonDesktop: {
		padding: '7.5px 28px',
		fontSize: '15px',
	},
	divider: {
		marginBottom: '37px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	extraInforWrapper: {
		padding: '0 24px',
	},
	aboutMeSection: {
		paddingBottom: '26px',
		[breakpoints.up('lg')]: {
			paddingBottom: '20px',
		},
	},
	aboutMeTitle: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 0 12px 3px',
		[breakpoints.up('lg')]: {
			padding: '0 0 5px 3px',
		},
	},
	aboutMeIcon: {
		marginRight: '11px',
		[breakpoints.up('lg')]: {
			marginRight: '16px',
		},
	},
	educationSection: {
		paddingBottom: '26px',
		[breakpoints.up('lg')]: {
			paddingBottom: '20px',
		},
	},
	educationTitle: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '12px',
		[breakpoints.up('lg')]: {
			paddingBottom: '6px',
		},
	},
	educationIcon: {
		marginRight: '8px',
		[breakpoints.up('lg')]: {
			marginRight: '12px',
		},
	},
	diseasesSection: {
		paddingBottom: '12px',
		[breakpoints.up('lg')]: {
			paddingBottom: '17px',
		},
	},
	diseasesTitle: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '12px',
		[breakpoints.up('lg')]: {
			paddingBottom: '15px',
		},
	},
	diseasesIcon: {
		marginRight: '7px',
		[breakpoints.up('lg')]: {
			marginRight: '12px',
		},
	},
	disease: {
		[breakpoints.up('lg')]: {
			display: 'inline-block',
			width: '260px',
		},
	},
	userOpinionsSection: {
		padding: '0 24px',
	},
	userOpinionsSectionTitle: {
		paddingBottom: '24px',
	},
	viewMoreButton: {
		textDecoration: 'none',
		textTransform: 'none',
		padding: '6px 0',
		fontSize: '13px',

		'&:hover': {
			textDecoration: 'none',
		},
	},
	titleText: {
		color: palette.info.main,
	},
	commentsDivider: {
		margin: '0 24px 12px',
		[breakpoints.up('lg')]: {
			margin: '0 0 14px 0',
		},
	},
	mobileStickyButtonWrapper: {
		position: 'sticky',
		bottom: 0,
		left: 0,
		right: 0,
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	mobileStickyButton: {
		borderRadius: 0,
	},
}));

export interface DetailedDoctorModalProps {
	closeModal: () => void;
	isOpen: boolean;
	doctor: Doctor | null;
}

const DetailedDoctorModal = ({ closeModal, isOpen, doctor }: DetailedDoctorModalProps): ReactElement | null => {
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const [showMoreAboutMe, setShowMoreAboutMe] = useState<boolean>(false);
	const [showMoreDiseases, setShowMoreDiseases] = useState<boolean>(false);
	const [showMoreEducation, setShowMoreEducation] = useState<boolean>(false);
	const toggleShowMoreEducation = () => {
		setShowMoreEducation(!showMoreEducation);
	};
	const toggleShowMoreAboutMe = () => {
		setShowMoreAboutMe(!showMoreAboutMe);
	};
	const toggleShowMoreDiseases = () => {
		setShowMoreDiseases(!showMoreDiseases);
	};
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');

	if (!doctor) {
		return null;
	}

	const {
		profilePicture,
		name,
		lastName,
		speciality,
		cmp,
		rating,
		aboutMe,
		education,
		diseases,
		patientOpinions,
	} = doctor;
	const isALongAboutMe = aboutMe.length > 165;
	const isALongEducation = education.length > 165;
	const isALongDiseaseList = diseases.length > 6;
	const filterDiseases = isALongDiseaseList ? diseases.slice(0, 6) : diseases;
	const viewableDiseases = showMoreDiseases ? diseases : filterDiseases;

	return (
		<Dialog open={isOpen} onClose={closeModal} fullScreen={!isDesktop} PaperProps={{ className: classes.paper }}>
			<div className={classes.wrapper}>
				<div className={classes.doctor}>
					<div className={classes.photoWrapper}>
						<img className={classes.photo} src={profilePicture} alt="doctor" />
					</div>
					<div>
						<div className={classes.nameWrapper}>
							<Typography component="span" className={clsx(classes.name, 'no-caps')}>
								{t('right.doctor.prefix')}{' '}
							</Typography>
							<Typography component="span" className={classes.name}>
								{name} {lastName}
							</Typography>
						</div>
						<div className={classes.flexWrapper}>
							<div className={classes.specialityWrapper}>
								<Typography className={classes.speciality}>{speciality}</Typography>
							</div>
							<div>
								<Typography className={classes.cmp}>CMP: {cmp}</Typography>
							</div>
						</div>
						<div className={classes.ratingWrapper}>
							<Rating className={classes.doctorRating} value={rating} precision={0.5} readOnly />
							<Typography className={classes.ratingNumber}>({rating})</Typography>
						</div>
						{isDesktop ? (
							<div>
								<Button className={classes.availabilityButtonDesktop} variant="contained" onClick={closeModal}>
									{t('doctorModal.seeAvailability')}
								</Button>
							</div>
						) : null}
					</div>
				</div>
				<Divider className={classes.divider} />
				<div className={classes.extraInforWrapper}>
					<div className={classes.aboutMeSection}>
						<div className={classes.aboutMeTitle}>
							<div className={classes.aboutMeIcon}>
								<PersonIcon />
							</div>
							<Typography className={classes.titleText}>{t('doctorModal.aboutMe.title')}</Typography>
						</div>
						<div>
							<Typography>
								{isALongAboutMe ? (showMoreAboutMe ? aboutMe : `${aboutMe.substring(0, 165)}...`) : aboutMe}
							</Typography>
						</div>
						{isALongAboutMe ? (
							<div>
								<Button className={classes.viewMoreButton} onClick={toggleShowMoreAboutMe}>
									{showMoreAboutMe ? t('doctorModal.seeLess') : t('doctorModal.seeMore')}
								</Button>
							</div>
						) : null}
					</div>
					<div className={classes.educationSection}>
						<div className={classes.educationTitle}>
							<div className={classes.educationIcon}>
								<SchoolIcon />
							</div>
							<Typography className={classes.titleText}>{t('doctorModal.educationSection.title')}</Typography>
						</div>
						<div>
							<Typography>
								{isALongEducation ? (showMoreEducation ? education : `${education.substring(0, 165)}...`) : education}
							</Typography>
						</div>
						{isALongEducation ? (
							<div>
								<Button className={classes.viewMoreButton} onClick={toggleShowMoreEducation}>
									{showMoreAboutMe ? t('doctorModal.seeLess') : t('doctorModal.seeMore')}
								</Button>
							</div>
						) : null}
					</div>
					<div className={classes.diseasesSection}>
						<div className={classes.diseasesTitle}>
							<div className={classes.diseasesIcon}>
								<FirstAidKitIcon />
							</div>
							<Typography className={classes.titleText}>{t('doctorModal.diseasesSection.title')}</Typography>
						</div>
						<div>
							{viewableDiseases.map(({ name }) => (
								<Typography className={classes.disease} key={`${cmp}-${name}`}>
									- {name}
								</Typography>
							))}
						</div>
						{isALongDiseaseList ? (
							<div>
								<Button className={classes.viewMoreButton} onClick={toggleShowMoreDiseases}>
									{showMoreDiseases ? t('doctorModal.seeLess') : t('doctorModal.seeMore')}
								</Button>
							</div>
						) : null}
					</div>
				</div>
				<Divider className={classes.commentsDivider} />
				<div className={classes.userOpinionsSection}>
					<div className={classes.userOpinionsSectionTitle}>
						<Typography className={classes.titleText}>
							{t('doctorModal.userOpinionsSection.title')} ({patientOpinions.length})
						</Typography>
					</div>
					{patientOpinions.map((opinion) => (
						<PatientOpinion key={`${cmp}-${opinion.datePublished}`} opinion={opinion} />
					))}
				</div>
				<div className={classes.mobileStickyButtonWrapper}>
					<Button className={classes.mobileStickyButton} variant="contained" onClick={closeModal} fullWidth>
						{t('doctorModal.seeAvailability')}
					</Button>
				</div>
			</div>
		</Dialog>
	);
};

export default DetailedDoctorModal;
