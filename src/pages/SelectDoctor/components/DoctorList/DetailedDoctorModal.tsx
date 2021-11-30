import React, { ReactElement, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';
import { Doctor } from 'pages/api';
import { ReactComponent as HospitalIcon } from 'icons/hospital.svg';
import { ReactComponent as SchoolIcon } from 'icons/birrete.svg';
import { ReactComponent as FirstAidKitIcon } from 'icons/likeDoctor.svg';

import PatientOpinion from './PatientOpinion';
import { Grid } from '@material-ui/core';

const useStyles = stylesWithTheme(({ breakpoints, palette }) => ({
	paper: {
		[breakpoints.up('lg')]: {
			width: '756px',
			maxHeight: '676px',
			maxWidth: 'none',
		},
	},
	wrapper: {
		position: 'relative',
	},
	doctor: {
		display: 'flex',
		alignItems: 'center',
		padding: '24px',
		[breakpoints.up('lg')]: {
			padding: '68px 96px 49px 96px',
		},
	},
	photoWrapper: {
		paddingRight: '20px',
		[breakpoints.up('lg')]: {
			paddingRight: '58px',
		},
	},
	infoDocWrapper: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
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
		display: 'none',
		[breakpoints.up('lg')]: {
			paddingBottom: '8px',
			display: 'flex',
		},
	},
	nameWrapperMobile: {
		padding: '24px 0 0 24px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	name: {
		fontSize: '20px',
		lineHeight: '24px',
		fontFamily: 'Mulish',
		fontWeight: '700',
		color: '#494F66',
		textTransform: 'capitalize',
		'&.no-caps': {
			textTransform: 'none',
		},
		[breakpoints.up('lg')]: {
			fontSize: '24px',
			lineHeight: '28px',
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
		fontSize: '20px',
		lineHeight: '24px',
		fontFamily: 'Mulish',
		fontWeight: '400',
		color: '#494F66',
		textTransform: 'capitalize',
		[breakpoints.up('lg')]: {
			fontSize: '24px',
			lineHeight: '28px',
		},
	},
	cmp: {
		fontSize: '14px',
		lineHeight: '17px',
		color: '#A3ABCC',
		[breakpoints.up('lg')]: {
			fontSize: '16px',
			lineHeight: '20px',
		},
	},
	flexWrapper: {
		paddingBottom: '2px',
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
			color: '#FACD40',
			fontSize: '14px',
			[breakpoints.up('lg')]: {
				fontSize: '20px',
			},
		},
	},
	ratingNumber: {
		fontFamily: 'Mulish',
		fontSize: '12px',
		lineHeight: '16px',
		marginLeft: '15px',
		color: '#A3ABCC',
		[breakpoints.up('lg')]: {
			fontSize: '14px',
			lineHeight: '18px',
		},
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
		backgroundColor: '#F7F8FC',
		padding: '32px 24px',
		[breakpoints.up('lg')]: {
			padding: '56px 96px',
		},
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
		padding: '34px 24px',
		[breakpoints.up('lg')]: {
			padding: '48px 96px',
		},
	},
	userOpinionsSectionTitle: {
		paddingBottom: '24px',
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
	},
	btnWrapper: {
		display: 'flex',
		flexDirection: 'row-reverse',
	},
	viewMoreButton: {
		textDecoration: 'none',
		textTransform: 'none',
		color: '#1ECD96',
		padding: '6px 0',
		fontSize: '16px',
		fontWeight: '800',
		lineHeight: '20px',
		fontFamily: 'Mulish',
		'&:hover': {
			textDecoration: 'none',
		},
	},
	titleText: {
		color: ' #494F66',
		fontWeight: '700',
		fontSize: '16px',
		fontFamily: 'Mulish',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
		},
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
		textAlign: 'center',
		backgroundColor: '#ffffff',
		padding: '24px',
		boxShadow: '0px 5px 25px rgba(103, 111, 143, 0.15)',
	},
	mobileStickyButton: {
		borderRadius: '8px',
		width: '100%',
		[breakpoints.up('lg')]: {
			maxWidth: '312px',
		},
	},
	bodyText: {
		fontSize: '12px',
		fontFamily: 'Mulish',
		color: '#777E9A',
		[breakpoints.up('lg')]: {
			fontSize: '16px',
		},
	},
	noComments: {
		fontFamily: 'Mulish',
		fontSize: '12px',
		fontWeight: '600',
		color: '#676F8F',
		[breakpoints.up('lg')]: {
			fontSize: '16px',
		},
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
				<div className={classes.nameWrapperMobile}>
					<Typography component="span" className={clsx(classes.name, 'no-caps')}>
						{t('right.doctor.prefix')}{' '}
					</Typography>
					<Typography component="span" className={classes.name}>
						{name} {lastName}
					</Typography>
				</div>
				<div className={classes.doctor}>
					<div className={classes.photoWrapper}>
						<img className={classes.photo} src={profilePicture} alt="doctor" />
					</div>
					<div className={classes.infoDocWrapper}>
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
						</div>
						<Grid container spacing={1} xl={12}>
							<Grid item xs={6} md={4} xl={4}>
								<Typography className={classes.cmp}>CMP: {cmp}</Typography>
							</Grid>
							<Grid item xs={6} md={4} xl={4}>
								<Typography className={classes.cmp}>RNE: {cmp}</Typography>
							</Grid>
							{patientOpinions.length >= 5 && (
								<Grid item xs={12} md={4} xl={4} className={classes.ratingWrapper}>
									<Rating className={classes.doctorRating} value={rating} precision={0.5} readOnly />
									<Typography className={classes.ratingNumber}>({patientOpinions.length})</Typography>
								</Grid>
							)}
						</Grid>
					</div>
				</div>
				<div className={classes.extraInforWrapper}>
					<div className={classes.aboutMeSection}>
						<div className={classes.aboutMeTitle}>
							<div className={classes.aboutMeIcon}>
								<HospitalIcon />
							</div>
							<Typography className={classes.titleText}>{t('doctorModal.aboutMe.title')}</Typography>
						</div>
						<div>
							<Typography className={classes.bodyText}>
								{isALongAboutMe ? (showMoreAboutMe ? aboutMe : `${aboutMe.substring(0, 165)}...`) : aboutMe}
							</Typography>
						</div>
						{isALongAboutMe ? (
							<div className={classes.btnWrapper}>
								<Button className={classes.viewMoreButton} onClick={toggleShowMoreAboutMe}>
									{showMoreAboutMe ? t('doctorModal.seeLess') : t('doctorModal.seeMore')}
									<ExpandMoreIcon style={{ color: '#1ECD96', lineHeight: '12px', marginLeft: '12px' }} />
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
							<Typography className={classes.bodyText}>
								{isALongEducation ? (showMoreEducation ? education : `${education.substring(0, 165)}...`) : education}
							</Typography>
						</div>
						{isALongEducation ? (
							<div className={classes.btnWrapper}>
								<Button className={classes.viewMoreButton} onClick={toggleShowMoreEducation}>
									{showMoreAboutMe ? t('doctorModal.seeLess') : t('doctorModal.seeMore')}
									<ExpandMoreIcon style={{ color: '#1ECD96', lineHeight: '12px', marginLeft: '12px' }} />
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
							<div className={classes.btnWrapper}>
								<Button className={classes.viewMoreButton} onClick={toggleShowMoreDiseases}>
									{showMoreDiseases ? t('doctorModal.seeLess') : t('doctorModal.seeMore')}
									<ExpandMoreIcon style={{ color: '#1ECD96', lineHeight: '12px', marginLeft: '12px' }} />
								</Button>
							</div>
						) : null}
					</div>
				</div>
				<div className={classes.userOpinionsSection}>
					<div className={classes.userOpinionsSectionTitle}>
						<Typography className={classes.titleText}>
							{t('doctorModal.userOpinionsSection.title')} ({patientOpinions.length})
						</Typography>
						{patientOpinions.length >= 5 && (
							<Rating className={classes.doctorRating} value={rating} precision={0.5} readOnly />
						)}
					</div>
					{patientOpinions.map((opinion) => (
						<PatientOpinion key={`${cmp}-${opinion.datePublished}`} opinion={opinion} />
					))}
					{patientOpinions.length === 0 && (
						<Typography className={classes.noComments}>El especialista aún no tiene comentarios.</Typography>
					)}
				</div>
				<div className={classes.mobileStickyButtonWrapper}>
					<Button className={classes.mobileStickyButton} variant="contained" onClick={closeModal}>
						{t('doctorModal.seeAvailability')}
					</Button>
				</div>
			</div>
		</Dialog>
	);
};

export default DetailedDoctorModal;
