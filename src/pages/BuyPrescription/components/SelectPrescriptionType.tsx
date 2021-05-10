import React, { ReactElement } from 'react';
import { Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';
import { ReactComponent as InkafarmaIcon } from 'icons/inkafarma.svg';
import callMedic from 'icons/call_medic.svg';
import recieptMedic from 'icons/reciept_medic.svg';
import cartMedic from 'icons/cart_medic.svg';
import cartMedicB from 'icons/cart_back_medic.svg';

import { ReactComponent as BrandLogo } from 'icons/brand.svg';

import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

import { redirectToURL } from 'utils';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useLocation, useHistory } from 'react-router';
import { parse } from 'query-string';

import { sendLogs } from 'pages/api';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		[breakpoints.up('lg')]: {
			height: 'calc(100vh - 108px)',
			backgroundColor: '#FAF9F8',
			paddingTop: '40px',
		},
	},
	wrapper: {
		[breakpoints.up('lg')]: {
			backgroundColor: 'white',
			margin: '0 auto',
			// height: '632px',
			height: '700px',
			// width: '889px',
			width: '1040px',
		},
	},
	content: {
		// padding: '68px 26px 0',
		padding: '68px 26px 0',
		[breakpoints.up('lg')]: {
			// padding: '80px 206px 0',
			padding: '80px 80px 0',
		},
	},
	brandLogoWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			marginBottom: '15px',
			textAlign: 'center',
		},
	},
	brandLogo: {
		[breakpoints.up('lg')]: {
			// height: '19px',
		},
	},
	brandLogo1: {
		height: '19px',
	},

	title: {
		fontWeight: 'bold',
		fontSize: '28px',
		paddingBottom: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '40px',
			textAlign: 'center',
			paddingBottom: '20px',
			paddingTop: '40px',
		},
	},

	title1: {
		fontWeight: 'bold',
		fontSize: '15px',
		paddingBottom: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			textAlign: 'center',
			paddingBottom: '20px',
			paddingTop: '40px',
		},
	},

	actionsWrapper: {
		[breakpoints.up('lg')]: {
			width: '401px',
			margin: '0 auto',
		},
	},
	seeQuotedPrescription: {
		marginBottom: '12px',
		padding: '11px 0',
		[breakpoints.up('lg')]: {
			marginBottom: '26px',
			padding: '19.5px 0',
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
	buttonLabel: {
		marginRight: '15px',
	},
	benefitText: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		margin: '0',
		marginBottom: '20px',
		'& > span': {
			fontSize: '13px',
		},
	},
	wrapperFlex: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '40px',
		marginBottom: '40px',
	},
	containerButtonCompartir: {
		display: 'flex',
		background: '#BBF0DF',
		borderRadius: '50px',
		width: '30rem',
		maxWidth: '30rem',
	},
	gridText: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		margin: 'auto',
		marginLeft: '15px',
	},
	gridButtom: {
		margin: '0 auto',
		textAlign: 'center',
		fontWeight: '600',
	},
	buttonCompartir: {
		padding: '15px',
		background: '#8CE6C9',
		cursor: 'pointer',
	},
	textCompartirTitle: {
		marginBottom: 15,
		textAlign: 'center',
	},
	img: {
		height: '64px',
	},
	img1: {
		position: 'absolute',
		height: '64px',
	},
	inkafarmaIcon: {
		position: 'absolute',
		width: '88px',
		marginTop: '-7px',
		marginLeft: '5px',
	},
	success: {
		backgroundColor: '#1ecd96 !important',
	},

	containerCard: {
		border: '1px solid #1ecd96',
		borderRadius: '5px',
		textAlign: 'center',
		padding: '2.2rem 1rem',
		margin: '0 16px 22px 0',
		width: '13rem',
		cursor: 'pointer',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		'&:hover': {
			boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.05)',
		},
	},
	containerIMG: {
		paddingBottom: '15px',
	},
}));

interface SelectPrescriptionType {
	sessionId?: string;
	showQuotedPrescription: () => void;
	openEPrescription: () => void;
}

const SelectPrescriptionType = ({
	showQuotedPrescription,
	openEPrescription,
	sessionId,
}: SelectPrescriptionType): ReactElement => {
	const classes = useStyles();
	const { t } = useTranslation('buyPrescription');

	const location = useLocation();
	const params = parse(location.search);

	// BUTTON COPY
	const urlShare = window.location + '';
	const copyShare = () => {
		navigator.clipboard.writeText(urlShare);
		notiShare();
	};
	// NOTIFI COPY
	const { enqueueSnackbar } = useSnackbar();
	const notiShare = () => {
		enqueueSnackbar('Link copiado', {
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'right',
			},
			variant: 'success',
		});
	};
	// POPPUP CALL MEDIC
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// DATA LOG
	//const pid = localStorage.getItem('_hjid');
	const pid = sessionId || (params.sessionId as string);
	const onSubmit = async (_paramActionType: number) => {
		const logData = {
			action_date: new Date().toISOString().slice(0, 10) + '',
			type_action_id: _paramActionType,
			student_id: pid === null ? '12abd749-e529-4005-9b6f-ac5201198363' : pid,
		};
		await sendLogs(logData);
	};

	const pressKey = (_param: number) => {
		if (_param === 1) {
			openEPrescription();
			onSubmit(1);
		} else if (_param === 2) {
			showQuotedPrescription();
			onSubmit(2);
		} else if (_param === 3) {
			handleClickOpen();
			onSubmit(3);
		}
		console.log(_param);
	};

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<div className={classes.brandLogoWrapper}>
						<BrandLogo className={classes.brandLogo} />
					</div>
					<Typography className={classes.title} variant="h1">
						{t('buyPrescription.selectPrescriptionType.title2')}
					</Typography>

					<div className={classes.wrapperFlex}>
						<div className={classes.containerCard} onClick={() => pressKey(1)}>
							<div className={classes.containerIMG}>
								<img className={classes.img} src={recieptMedic} alt="working" />
							</div>
							<div>
								<Typography component="span" color="primary">
									{t('buyPrescription.selectPrescriptionType.ePrescription2')}
								</Typography>
							</div>
						</div>

						<div className={classes.containerCard} onClick={() => pressKey(2)}>
							<div className={classes.containerIMG}>
								<img className={classes.img1} src={cartMedic} alt="working" />
								<img className={classes.img} src={cartMedicB} alt="working" />
							</div>
							<div style={{ textAlign: 'justify' }}>
								<Typography component="span" color="primary">
									{t('buyPrescription.selectPrescriptionType.quotedPrescription2')}
								</Typography>
								<InkafarmaIcon className={classes.inkafarmaIcon} />
							</div>
						</div>

						<div className={classes.containerCard} onClick={() => pressKey(3)}>
							<div className={classes.containerIMG}>
								<img className={classes.img} src={callMedic} alt="working" />
							</div>
							<div style={{ textAlign: 'justify' }}>
								<Typography component="span" color="primary">
									{t('buyPrescription.selectPrescriptionType.callfarma')}
								</Typography>
								<InkafarmaIcon className={classes.inkafarmaIcon} />
							</div>
						</div>
					</div>

					<div className={classes.textCompartirTitle}>
						<Typography color="primary" component="span">
							{t('buyPrescription.selectPrescriptionType.compartir')}
						</Typography>
					</div>

					<div className={classes.benefitText}>
						<Card className={classes.containerButtonCompartir}>
							<Grid item xs={8} className={classes.gridText}>
								<span>{urlShare}</span>
							</Grid>
							<Grid item xs={4} className={classes.gridButtom}>
								<Card className={classes.buttonCompartir} onClick={copyShare}>
									{t('buyPrescription.selectPrescriptionType.buttomCompartir')}
								</Card>
							</Grid>
						</Card>
					</div>
				</div>
			</div>

			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle style={{ textAlign: 'center' }}>
					<BrandLogo className={classes.brandLogo1} />
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Typography className={classes.title1} component="span">
							{t('buyPrescription.selectPrescriptionType.contactcall')}
						</Typography>
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button style={{ textDecoration: 'auto', fontSize: 15 }} onClick={handleClose} color="primary">
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SelectPrescriptionType;
