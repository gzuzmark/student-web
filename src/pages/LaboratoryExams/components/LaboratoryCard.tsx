import React, { ReactElement, MouseEvent } from 'react';
import { Card, Typography, Theme } from '@material-ui/core';

import { stylesWithTheme } from 'utils';
import { ReactComponent as PhoneIcon } from 'icons/phone.svg';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	card: {
		border: ({ isActive }: { isActive: boolean }) => (isActive ? `1px solid ${palette.primary.main}` : 'none'),
		boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.24)',
		cursor: 'pointer',
		width: '312px',
		height: '108px',
		marginRight: '8px',
		'&:last-child': {
			marginRight: '12px',
		},
		[breakpoints.up('lg')]: {
			height: '123px',
			marginRight: '29px',
			'&:last-child': {
				marginRight: '24px',
			},
		},
	},
	wrapper: {
		display: 'flex',
	},
	imgWrapper: {
		borderRadius: '4px',
		height: '108px',
		[breakpoints.up('lg')]: {
			height: '123px',
		},
	},
	img: {
		width: '88px',
		height: '108px',
		[breakpoints.up('lg')]: {
			height: '123px',
		},
	},
	contentWrapper: {
		padding: '14px 13px 12px 11px',
	},
	name: {
		color: 'black',
		paddingBottom: '2px',
		[breakpoints.up('lg')]: {
			paddingBottom: '4px',
		},
	},
	address: {
		fontSize: '11px',
		maxWidth: '200px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		paddingBottom: '2px',
		[breakpoints.up('lg')]: {
			maxWidth: '175px',
			fontSize: '13px',
			paddingBottom: '3px',
		},
	},
	workingHours: {
		fontSize: '11px',
		paddingBottom: '8px',
		[breakpoints.up('lg')]: {
			fontSize: '13px',
			paddingBottom: '12px',
		},
	},
	phoneNumberWrapper: {
		display: 'flex',
	},
	phoneIconWrapper: {
		paddingRight: '4px',
	},
	phoneNumber: {
		fontSize: '11px',
		[breakpoints.up('lg')]: {
			fontSize: '13px',
			fontStyle: 'italic',
		},
	},
}));

interface LaboratoryCardProps {
	isActive: boolean;
	onClick: (event: MouseEvent) => void;
	name: string;
	address: string;
	phoneNumber: string;
	imgUrl: string;
	openHours: string;
}

const LaboratoryCard = ({
	isActive,
	onClick,
	name,
	address,
	phoneNumber,
	imgUrl,
	openHours,
}: LaboratoryCardProps): ReactElement | null => {
	const classes = useStyles({ isActive });

	return (
		<Card className={classes.card} onClick={onClick}>
			<div className={classes.wrapper}>
				<div className={classes.imgWrapper}>
					<img className={classes.img} src={imgUrl} alt="laboratory" />
				</div>
				<div className={classes.contentWrapper}>
					<Typography className={classes.name}>{name}</Typography>
					<Typography className={classes.address}>{address}</Typography>
					<Typography className={classes.workingHours}>Horario: {openHours}</Typography>
					<div className={classes.phoneNumberWrapper}>
						<div className={classes.phoneIconWrapper}>
							<PhoneIcon />
						</div>
						<Typography className={classes.phoneNumber}>{phoneNumber}</Typography>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default LaboratoryCard;
