import React, { useState } from 'react';

import { ReactComponent as FilterIcon } from 'icons/filter.svg';
import useStyles from './styles';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { createStyles, withStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { timeFrames } from 'AppContext';

const BootstrapButton = withStyles((theme: Theme) =>
	createStyles({
		root: {
			width: theme.typography.pxToRem(104),
			height: theme.typography.pxToRem(32),
			textTransform: 'none',
			background: '#FFFFFF;',
			borderColor: '#E5EFFF',
			fontFamily: 'Mulish, sans-serif',
			'&:hover': {
				backgroundColor: '#FFFFFF',
			},
			'&$selected': {
				fontFamily: 'Mulish, sans-serif',
				color: '#FFFFFF',
				backgroundColor: '#2C7BFD',
				fill: '#FFFFFF',
				fontWeight: '800',
				fontStyle: 'bold',
				'&:hover': {
					backgroundColor: '#2C7BFD',
				},
				'& p': {
					color: '#FFFFFF',
				},
				'& svg': {
					fill: '#FFFFFF',
				},
			},
			border: '1px solid #E5EFFF',
			boxSizing: 'border-box',
			borderRadius: '4px',
			[theme.breakpoints.down('xs')]: {
				width: 'calc((100% - 24px) / 3)',
			},
		},
		label: {
			width: '100%', // Ensure the correct width for iOS Safari
			display: 'inherit',
			alignItems: 'inherit',
			justifyContent: 'inherit',
			'& > svg': {
				fill: '#2C7BFD',
				paddingRight: '8px',
			},
			'& > p': {
				color: '#676F8F',
			},
		},
		selected: {
			'&:hover': {},
		},
	}),
)(ToggleButton);

const StyledToggleButtonGroup = withStyles((theme) => ({
	root: {
		borderRadius: '4px',
		display: 'grid',
		gap: '1.25rem',
		gridTemplateColumns: '1fr 1fr 1fr',
		[theme.breakpoints.down('xs')]: {
			display: 'flex',
			gap: '12px',
			flex: '1',
		},
	},
	grouped: {
		'&:not(:first-child)': {
			borderRadius: theme.shape.borderRadius,
		},
		'&:first-child': {
			borderRadius: theme.shape.borderRadius,
		},
		[theme.breakpoints.down('xs')]: {
			// margin: theme.spacing(2),
		},
	},
}))(ToggleButtonGroup);

interface TimeFrameFilterProps {
	onChange: (filters: string[]) => void;
}

const TimeFrameFilter = ({ onChange }: TimeFrameFilterProps) => {
	const classes = useStyles();
	const [formats, setFormats] = useState<string[]>([]);

	const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
		if (newFormats) {
			setFormats(newFormats);
			onChange(newFormats);
		}
	};

	return (
		<>
			<div className={classes.imgWrapper}>
				<FilterIcon />
			</div>
			<StyledToggleButtonGroup size="small" value={formats} onChange={handleFormat} aria-label="text formatting">
				{Object.entries(timeFrames).map(([time, timeOption]) => {
					return (
						<BootstrapButton key={time} value={time} aria-label={time} disableRipple>
							{timeOption.icon ? <timeOption.icon /> : null} <p>{timeOption.value}</p>
						</BootstrapButton>
					);
				})}
			</StyledToggleButtonGroup>
		</>
	);
};

export default TimeFrameFilter;
