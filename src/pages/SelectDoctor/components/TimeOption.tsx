import { Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { formatApiDate, stylesWithTheme } from 'utils';
interface StylesProps {
	active: boolean;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	dateButtonWrapper: {
		display: 'flex',

		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		boxSizing: 'border-box',
		borderRadius: '8px',

		marginBottom: '10px',
		// padding: '12px 14px',
		// margin: '0px 3.5px',

		// width: '98px',
		// marginRight: '7px',

		// '&:nth-child(3n)': {
		// 	marginRight: '0',
		// 	[breakpoints.up('lg')]: {
		// 		marginRight: '7px',
		// 	},
		// },
		width: '23%',
		marginRight: '9px',
		padding: '10px 0',

		[breakpoints.up('lg')]: {
			width: '18%',
			marginRight: '9px',
			padding: '10px 0',
		},

		[breakpoints.down('md')]: {
			// padding: '12px 10px',
			// margin: '4px 2px',
			width: '23%',

			marginRight: '8px',
		},
		[breakpoints.down('xs')]: {
			// padding: '12px 10px',
			// margin: '4px 2px',
			width: '22.5%',
			marginRight: '7px',
		},
		'&:first-child': {
			// marginLeft: '0px',
			// marginRight: '7.5px',
			[breakpoints.up('lg')]: {
				// marginRight: '7.5px',
			},
		},
		'&:last-child': {
			// marginRight: '0px',
			// marginLeft: '7.5px',
			// [breakpoints.up('lg')]: {
			// 	marginLeft: '7.5px',
			// },
		},
	},
	buttonDefault: {
		border: '2px solid #84E4C6',
		backgroundColor: '#ffffff',
		color: '#52575C',
		cursor: 'pointer',
	},
	buttonDisabled: {
		border: '1.5px solid #F0F2FA',
		backgroundColor: '#F0F2FA',
		color: '#A3ABCC',
	},
	buttonSelected: {
		border: '1.5px solid #1ECD96',
		backgroundColor: '#1ECD96',
	},
	dateButton: {
		textTransform: 'lowercase',
		fontSize: '14px',
		lineHeight: '15px',
		padding: '12.5px 0',
		boxShadow: (props: StylesProps) => (props.active ? '0px 4px 4px rgba(83, 91, 108, 0.28)' : 'none'),
		[breakpoints.up('lg')]: {
			marginRight: '7px',
			minWidth: 'auto',
			fontSize: '13px',
			lineHeight: '18px',
			padding: '11.5px 8px',
		},
	},
	text: {
		fontFamily: 'Montserrat, sans-serif',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '12px',
		lineHeight: '16px',
	},
	textDefault: {
		color: '#52575C',
	},
	textDisabled: {
		color: '#A3ABCC',
	},
	textSelected: {
		color: '#ffffff',
		fontWeight: 'bold',
	},
}));

type StatusType = 'default' | 'disabled' | 'selected';

interface TimeOptionProps {
	scheduleId?: string;
	date: Date;
	onClick: () => void;
	disabled?: boolean;
	active?: boolean;
	format?: string;
	status?: StatusType;
}

const TimeOption = ({ date, onClick, format, active = false, status }: TimeOptionProps) => {
	const classes = useStyles({ active });

	const onClickTimeOption = () => {
		if (status !== 'disabled') {
			onClick();
		}
	};

	return (
		<div
			className={clsx(
				classes.dateButtonWrapper,
				status === 'default'
					? classes.buttonDefault
					: status === 'disabled'
					? classes.buttonDisabled
					: classes.buttonSelected,
			)}
			onClick={onClickTimeOption}
		>
			{/* <Button className={classes.dateButton} variant="contained" onClick={onClick} disabled={disabled} fullWidth> */}
			<Typography
				component="span"
				className={clsx(
					classes.text,
					status === 'default'
						? classes.textDefault
						: status === 'disabled'
						? classes.textDisabled
						: classes.textSelected,
				)}
			>
				{formatApiDate(date, 'h:mm a' || format)}
			</Typography>
			{/* </Button> */}
		</div>
	);
};

export default TimeOption;
