import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { ReactComponent as Ellipse } from 'icons/ellipse.svg';
import { ReactComponent as InkafarmaIcon } from 'icons/inkafarma.svg';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		border: '1px solid #1ECD96',
		borderRadius: '5px',
		padding: '22px 20px 30px',
		[breakpoints.up('lg')]: {
			padding: '24px 29px 31px',
			height: '139px',
		},
	},
	title: {
		fontSize: '15px',
		paddingBottom: '15px',
		[breakpoints.up('lg')]: {
			paddingBottom: '11px',
		},
	},
	benefits: {
		padding: '0',
	},
	benefit: {
		padding: '0 0 16px 0',
		'&:last-child': {
			padding: '0',
		},
	},
	benefitIcon: {
		minWidth: '26px',
	},
	benefitText: {
		margin: '0',
		'& > span': {
			fontSize: '13px',
			[breakpoints.up('lg')]: {
				display: 'flex',
				alignItems: 'center',
			},
		},
	},
	inkafarmaIcon: {
		paddingLeft: '2px',
	},
}));

const AddressBenefits = (): ReactElement | null => {
	const classes = useStyles();
	const { t } = useTranslation('askAddress');

	return (
		<div className={classes.container}>
			<Typography className={classes.title}>{t('askAddress.addressBenefits.title')}</Typography>
			<List className={classes.benefits}>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText} primary={t('askAddress.addressBenefits.firstReason')} />
				</ListItem>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText} primary={t('askAddress.addressBenefits.secondReason')} />
				</ListItem>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText}>
						<span>{t('askAddress.addressBenefits.thirdReason')}</span>
						<InkafarmaIcon className={classes.inkafarmaIcon} />
					</ListItemText>
				</ListItem>
			</List>
		</div>
	);
};

export default AddressBenefits;
