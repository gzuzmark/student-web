import React, { ReactElement, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';
import { Doctor } from 'pages/api';
import { ReactComponent as HospitalIcon } from 'icons/hospital.svg';
import { ReactComponent as SchoolIcon } from 'icons/birrete.svg';
import { ReactComponent as FirstAidKitIcon } from 'icons/destacados.svg';

import PatientOpinion from './PatientOpinion';
import { Box, Grid, Tab, Tabs } from '@material-ui/core';

const useStyles = stylesWithTheme(({ breakpoints }) => ({
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
			display: 'block',
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
		padding: '18px 24px',
		[breakpoints.up('lg')]: {
			padding: '18px 96px',
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
		zIndex: '10',
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
	patientsSection: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0 24px',
		[breakpoints.up('lg')]: {
			padding: '0 96px 24px 96px',
		},
	},
	banner_patients_age_range: {
		backgroundColor: '#E5EFFF',
		borderRadius: '4px',
		color: '#2C7BFD',
		fontWeight: 700,
		padding: '4px',
		textAlign: 'center',
		fontSize: '14px',
		display: 'inline-block',
		minWidth: '84px',
	},
	titleHelp: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: '#494F66',
		fontWeight: '700',
		paddingTop: '20px',
		paddingBottom: '16px',
	},
	tab: {
		fontFamily: 'Mulish, sans-serif',
		'& .MuiTab-root': {
			textTransform: 'initial',
			width: '100%',
			fontSize: '16px',
			//backgroundColor: "orange"
		},
	},
	itemTab: {
		fontFamily: 'Mulish, sans-serif !important',
		color: '#A3ABCC',
		maxWidth: '50%',
	},
	'MuiButtonBase-root MuiTab-root': {
		width: '50%',
	},
	selectedTab: {
		color: '#1ECD96 !important',
		fontWeight: 'bold',
		height: '5px',
	},
	experienceItemBox: {
		backgroundColor: '#FFFFFF',
		borderRadius: '11px',
		padding: '16px',
		color: '#676F8F !important',
		fontFamily: 'Mulish, sans-serif',
		fontWeight: '700',
		marginBottom: '10px',
	},
	dateInfoItem: {
		fontWeight: '600',
		color: '#A3ABCC',
		fontSize: '12px',
		fontFamily: 'Mulish, sans-serif',
	},
	formationItemBox: {
		backgroundColor: '#FFFFFF',
		borderRadius: '11px',
		padding: '12px 16px',
		border: '1px solid #CDD4F0',
		color: '#676F8F !important',
		fontFamily: 'Mulish, sans-serif',
		fontWeight: '700',
		marginBottom: '10px',
	},
	diagnosticItem: {
		background: '#F7F8FC',
		borderRadius: '4px',
		padding: '2px 5px',
		color: '#A3ABCC',
		marginRight: '8px',
		marginBottom: '8px',
	},
}));

export interface DetailedDoctorModalProps {
	closeModal: () => void;
	isOpen: boolean;
	doctor: Doctor | null;
}
interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
};
const DetailedDoctorModal = ({ closeModal, isOpen, doctor }: DetailedDoctorModalProps): ReactElement | null => {
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const [showMoreExperience, setShowMoreExperience] = useState<boolean>(false);
	const [showMoreDiagnostics, setShowMoreDiagnostics] = useState<boolean>(false);
	const [showMoreEducation, setShowMoreEducation] = useState<boolean>(false);
	const [showMoreAwards, setShowMoreAwards] = useState<boolean>(false);
	const [value, setValue] = useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};
	const toggleShowMoreExperience = () => {
		setShowMoreExperience(!showMoreExperience);
	};
	const toggleShowMoreEducation = () => {
		setShowMoreEducation(!showMoreEducation);
	};
	const toggleShowMoreDiagnostics = () => {
		setShowMoreDiagnostics(!showMoreDiagnostics);
	};
	const toggleShowMoreAwards = () => {
		setShowMoreAwards(!showMoreAwards);
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
		specialityName,
		cmp,
		rating,
		aboutMe,
		gender,
		patientOpinions,
		experiences, // experiencias
		education,
		awards,
		diagnostics,
		ageFrom,
		ageTo,
	} = doctor;

	const isALongExperiencesList = experiences.length > 3;
	const filterExperience = isALongExperiencesList ? experiences.slice(0, 3) : experiences;
	const viewableExperience = showMoreExperience ? experiences : filterExperience;
	const isALongEducation = education.length > 3;
	const filterEducation = isALongExperiencesList ? education.slice(0, 3) : education;
	const viewableEducation = showMoreEducation ? education : filterEducation;
	const isALongDiseaseList = diagnostics.length > 4;
	const filterDiagnostics = isALongDiseaseList ? diagnostics.slice(0, 4) : diagnostics;
	const viewableDiagnostics = showMoreDiagnostics ? diagnostics : filterDiagnostics;
	const genderText = gender === 'M' ? 'Dr. ' : gender === 'F' ? 'Dra. ' : '';
	const renderExperienceType = (name: string) => {
		let colorClass, bgColor;
		if (name === 'Profesional') {
			colorClass = '#2C7BFD';
			bgColor = '#E5EFFF';
		} else if (name === 'Residentado') {
			colorClass = '#A0A4A8';
			bgColor = '#FEF9E7';
		} else if (name === 'Serums') {
			colorClass = '#50B9E9';
			bgColor = '#E5F6FE';
		} else if (name === 'Intercambio') {
			colorClass = '#A0A4A8';
			bgColor = '#FEE6E6';
		}
		return (
			<span
				className={classes.banner_patients_age_range}
				style={{ backgroundColor: `${bgColor}`, color: `${colorClass}` }}
			>
				{name}
			</span>
		);
	};
	return (
		<Dialog open={isOpen} onClose={closeModal} fullScreen={!isDesktop} PaperProps={{ className: classes.paper }}>
			<div className={classes.wrapper}>
				<div className={classes.nameWrapperMobile}>
					<Typography component="span" className={clsx(classes.name, 'no-caps')}>
						{genderText}{' '}
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
								{genderText}
							</Typography>
							<Typography component="span" className={classes.name}>
								{name} {lastName}
							</Typography>
						</div>
						<div className={classes.flexWrapper}>
							<div className={classes.specialityWrapper}>
								<Typography className={classes.speciality}>{specialityName}</Typography>
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
				<div className={classes.patientsSection}>
					<div className={classes.banner_patients_age_range}>
						<span>
							Pacientes a partir de los {ageFrom} hasta los {ageTo} años
						</span>
					</div>
					<div className={classes.titleHelp}>
						¿En qué te puedo ayudar?
						{isALongDiseaseList ? (
							<Button onClick={toggleShowMoreDiagnostics}>
								<NavigateNextIcon style={{ color: '#1ECD96', lineHeight: '12px', marginLeft: '12px' }} />
							</Button>
						) : null}
					</div>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{viewableDiagnostics.map(({ name }) => (
							<div className={classes.diagnosticItem} key={`diagnostico-${name}`}>
								{name}
							</div>
						))}
					</div>
				</div>
				<div>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor={'primary'}
						className={classes.tab}
						classes={{ flexContainer: classes.flexContainer }}
					>
						<Tab label="Mi perfil" classes={{ selected: classes.selectedTab }} id="1" className={classes.itemTab}></Tab>
						<Tab
							label="Comentarios"
							classes={{ selected: classes.selectedTab }}
							id="2"
							className={classes.itemTab}
						></Tab>
					</Tabs>
					<TabPanel value={value} index={0}>
						<div className={classes.extraInforWrapper}>
							<div className={classes.titleHelp}>¿Porqué elegí ser especialista en {specialityName}?</div>
							<div className={classes.noComments} style={{ paddingBottom: '20px' }}>
								{aboutMe}
							</div>
							<div className={classes.aboutMeSection}>
								<div className={classes.aboutMeTitle}>
									<div className={classes.aboutMeIcon}>
										<HospitalIcon />
									</div>
									<Typography className={classes.titleText}>{t('doctorModal.aboutMe.title')}</Typography>
								</div>
								<div>
									{viewableExperience.map((value, index) => (
										<div className={classes.experienceItemBox} key={index}>
											<Grid container spacing={1} xl={12}>
												<Grid item xs={6} md={6} xl={6}>
													<span style={{ fontSize: '14px' }}>{value.title}</span>
												</Grid>
												<Grid item xs={6} md={6} xl={6} style={{ textAlign: 'end' }}>
													{renderExperienceType(value.type)}
												</Grid>
											</Grid>
											<div style={{ fontSize: '16px', padding: '8px 0' }}>{value.company}</div>
											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
													justifyContent: 'space-between',
													color: '#A3ABCC',
													fontSize: '10px',
												}}
											>
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
													<CalendarTodayOutlinedIcon style={{ color: '#A3ABCC', width: '12px', marginRight: '6px' }} />
													<Typography className={classes.dateInfoItem}>
														{value.yearStart} - {value.yearEnd}
													</Typography>
												</div>
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
													<RoomOutlinedIcon style={{ color: '#A3ABCC', lineHeight: '12px', width: '13px' }} />
													<Typography className={classes.dateInfoItem}>{value.city}</Typography>
												</div>
											</div>
										</div>
									))}
								</div>
								{isALongExperiencesList ? (
									<div className={classes.btnWrapper}>
										<Button className={classes.viewMoreButton} onClick={toggleShowMoreExperience}>
											{showMoreExperience ? (
												<>
													<Typography className={classes.viewMoreButton}>{t('doctorModal.seeLess')} </Typography>
													<ExpandLess style={{ color: '#1ECD96', lineHeight: '12px', marginLeft: '12px' }} />
												</>
											) : (
												<>
													<Typography className={classes.viewMoreButton}>{t('doctorModal.seeMore')} </Typography>
													<ExpandMoreIcon style={{ color: '#1ECD96', lineHeight: '12px', marginLeft: '12px' }} />
												</>
											)}
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
									{viewableEducation.map((value, index) => (
										<div className={classes.formationItemBox} key={index}>
											<span style={{ fontSize: '14px' }}>{value.school}</span>
											<div style={{ fontSize: '16px', padding: '8px 0' }}>{value.title}</div>
											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
													justifyContent: 'space-between',
													color: '#A3ABCC',
													fontSize: '10px',
												}}
											>
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
													<CalendarTodayOutlinedIcon style={{ color: '#A3ABCC', width: '12px', marginRight: '6px' }} />
													<Typography className={classes.dateInfoItem}>
														{value.type} - {value.year}
													</Typography>
												</div>
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
													<RoomOutlinedIcon style={{ color: '#A3ABCC', lineHeight: '12px', width: '13px' }} />
													<Typography className={classes.dateInfoItem}>{value.city}</Typography>
												</div>
											</div>
										</div>
									))}
								</div>
								{isALongEducation ? (
									<div className={classes.btnWrapper}>
										<Button className={classes.viewMoreButton} onClick={toggleShowMoreEducation}>
											{showMoreEducation ? (
												<>
													<Typography className={classes.viewMoreButton}>{t('doctorModal.seeLess')} </Typography>
													<ExpandLess style={{ color: '#1ECD96', lineHeight: '12px', marginLeft: '12px' }} />
												</>
											) : (
												<>
													<Typography className={classes.viewMoreButton}>{t('doctorModal.seeMore')} </Typography>
													<ExpandMoreIcon style={{ color: '#1ECD96', lineHeight: '12px', marginLeft: '12px' }} />
												</>
											)}
										</Button>
									</div>
								) : null}
							</div>
							<div className={classes.diseasesSection}>
								<div className={classes.diseasesTitle}>
									<div className={classes.diseasesIcon}>
										<FirstAidKitIcon />
									</div>
									<div className={classes.titleHelp} style={{ width: '100%' }}>
										<Typography className={classes.titleText}>Destacados</Typography>
										{awards.length > 1 ? (
											<Button onClick={toggleShowMoreAwards}>
												<NavigateNextIcon style={{ color: '#1ECD96', lineHeight: '12px', marginLeft: '12px' }} />
											</Button>
										) : null}
									</div>
								</div>
								{showMoreAwards ? (
									awards.map((val, index) => (
										<div
											key={`destacado-${index}`}
											className={classes.noComments}
											style={{ paddingLeft: '6px', paddingBottom: '10px' }}
										>
											- {val.description}
										</div>
									))
								) : awards.length > 0 ? (
									<div className={classes.noComments} style={{ paddingLeft: '6px', paddingBottom: '10px' }}>
										- {awards[0].description}
									</div>
								) : null}
							</div>
						</div>
					</TabPanel>
					<TabPanel value={value} index={1}>
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
					</TabPanel>
					<div className={classes.mobileStickyButtonWrapper}>
						<Button className={classes.mobileStickyButton} variant="contained" onClick={closeModal}>
							{t('doctorModal.seeAvailability')}
						</Button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default DetailedDoctorModal;
