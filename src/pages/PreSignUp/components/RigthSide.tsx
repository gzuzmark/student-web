import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link, useHistory } from 'react-router-dom';

import { RightLayout } from 'pages/common';
import { MYSELF, RELATIVE, GUEST } from 'AppContext';
import { ReactComponent as RightIcon } from 'icons/right.svg';
import { stylesWithTheme } from 'utils/createStyles';

interface StylesProps {
	isForMyself: boolean;
}

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	rightContainer: {
		minHeight: 'calc(100vh - 167px)',
		[breakpoints.up('lg')]: {
			minHeight: 'calc(100vh - 80px)',
		},
	},
	wrapper: {
		padding: '21px 26px 0',
		[breakpoints.up('lg')]: {
			paddingTop: (props: StylesProps) => (props.isForMyself ? '86px' : '106px'),
		},
	},
	titleWrapper: {
		paddingBottom: '15px',
	},
	mobileSubTitle: {
		fontSize: '15px',
		padding: (props: StylesProps) => (props.isForMyself ? '0 0 5px 0' : '30px 0 15px 0'),
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	boldTitle: {
		fontWeight: 'bold',
	},
	cards: {
		marginBottom: '37px',
	},
	card: {
		marginBottom: '20px',
		boxShadow: '0px 4px 10px rgba(83, 91, 108, 0.12)',
		borderRadius: '4px',
		padding: '27px 48px 32px 24px',
		position: 'relative',
		maxWidth: '366px',
		minHeight: '68px',
		'&:last-child': {
			marginBottom: 0,
		},
		[breakpoints.up('lg')]: {
			padding: '27px 109px 25px 30px',
			boxShadow: 'none',
			cursor: 'pointer',
			'&:hover': {
				boxShadow: '0px 4px 10px rgba(83, 91, 108, 0.12)',
			},
		},
	},
	cardHeader: {
		paddingBottom: '8px',
		fontSize: '10px',
	},
	iconButton: {
		position: 'absolute',
		padding: '10px',
		top: '13px',
		right: '16px',
		'& > span > svg': {
			width: '24px',
			height: '24px',
		},
		[breakpoints.up('lg')]: {
			top: '32px',
			right: '29px',
			'& > span > svg': {
				width: '37px',
				height: '37px',
			},
		},
	},
	linkWrapper: {
		textAlign: 'center',
		paddingBottom: '9px',
		[breakpoints.up('lg')]: {
			textAlign: 'left',
		},
	},
	changeOwnerLink: {
		padding: 0,
		textTransform: 'none',
		color: palette.primary.main,
	},
}));

interface RightSideProps {
	appointmentOwner?: string;
	updateState?: Function;
}

const RightSide = ({ appointmentOwner, updateState }: RightSideProps) => {
	const { t } = useTranslation('preSignUp');
	const history = useHistory();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const isForMyself = appointmentOwner === MYSELF;
	const l18nSelector = isForMyself ? 'toYou' : 'toSomeoneElse';
	const classes = useStyles({ isForMyself });
	const changeAppoinmentOwner = () => {
		if (updateState) {
			updateState({ appointmentOwner: isForMyself ? RELATIVE : MYSELF });
		}
	};
	const goToLogin = () => {
		history.push('/iniciar_sesion');
	};
	const goToSignUp = (ownerType = appointmentOwner) => () => {
		if (updateState && ownerType !== appointmentOwner) {
			updateState({ appointmentOwner: ownerType });
		}
		history.push('/registro');
	};

	return (
		<RightLayout className={classes.rightContainer}>
			<div className={classes.wrapper}>
				<div className={classes.titleWrapper}>
					<Typography component="span">{t('right.subTitle.base')} </Typography>
					{isForMyself ? (
						<Typography className={classes.boldTitle} component="span">
							{t('right.subTitle.toYou')}
						</Typography>
					) : (
						<Typography className={classes.boldTitle} component="span">
							{t('right.subTitle.toSmeoneElse')}
						</Typography>
					)}
					<Typography className={classes.mobileSubTitle}>{t('right.subTitle.continueQuestion.mobile')}</Typography>
				</div>
				<div className={classes.cards}>
					{isForMyself ? (
						<Card className={classes.card} onClick={goToLogin}>
							<Typography className={classes.cardHeader} variant="h3">
								{t('right.signIn.label.toYou')}
							</Typography>
							<Typography>{t('right.signIn.body.toYou')}</Typography>
							<IconButton className={classes.iconButton} color="primary">
								<RightIcon />
							</IconButton>
						</Card>
					) : null}
					<Card className={classes.card} onClick={goToSignUp()}>
						<Typography className={classes.cardHeader} variant="h3">
							{t(`right.signUp.label.${l18nSelector}`)}
						</Typography>
						<Typography>{t(`right.signUp.body.${l18nSelector}`)} </Typography>
						<IconButton className={classes.iconButton} color="primary">
							<RightIcon />
						</IconButton>
					</Card>
					<Card className={classes.card} onClick={goToSignUp(GUEST)}>
						<Typography className={classes.cardHeader} variant="h3">
							{matches ? t('right.signUp.label.guest') : t('right.signUp.label.guest.mobile')}
						</Typography>
						<Typography>{t(`right.signUp.body.guest.${l18nSelector}`)}</Typography>
						<IconButton className={classes.iconButton} color="primary">
							<RightIcon />
						</IconButton>
					</Card>
				</div>
				<div className={classes.linkWrapper}>
					<Typography component="span">
						{t(`right.newOwner.label.${!isForMyself ? 'toYou' : 'toSomeoneElse'}`)}{' '}
					</Typography>
					<Button className={classes.changeOwnerLink} variant="text" onClick={changeAppoinmentOwner} disableRipple>
						<Typography component="span" color="primary">
							{t(`right.newOwner.link.${!isForMyself ? 'toYou' : 'toSomeoneElse'}`)}
						</Typography>
					</Button>
				</div>
				{isForMyself ? null : (
					<div className={classes.linkWrapper}>
						<Typography component="span">{t('right.signIn.label.toSomeoneElse')} </Typography>
						<Link to="/iniciar_sesion" className={classes.changeOwnerLink}>
							<Typography component="span" color="primary">
								{t('right.signIn.link.toSomeoneElse')}
							</Typography>
						</Link>
					</div>
				)}
			</div>
		</RightLayout>
	);
};

export default RightSide;
