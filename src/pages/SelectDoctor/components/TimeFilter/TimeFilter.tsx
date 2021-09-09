import React, { useEffect, useState } from 'react';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import { ReactComponent as FilterIcon } from 'icons/filter.svg';
import { ReactComponent as SunIcon } from 'icons/sun.svg';
import { ReactComponent as SunsetIcon } from 'icons/sunset.svg';
import { ReactComponent as MoonIcon } from 'icons/moon.svg';
// import filter from 'icons/filter.png';
import useStyles from './styles';

// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
// import { Button, withStyles } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { createStyles, withStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

const BootstrapButton = withStyles((theme: Theme) =>
	createStyles({
		root: {
			width: theme.typography.pxToRem(104),
			height: theme.typography.pxToRem(32),
			textTransform: 'none',
			background: '#FFFFFF;',
			borderColor: '#E5EFFF',
			'&:hover': {
				backgroundColor: '#FFFFFF',
			},
			'&$selected': {
				color: '#FFFFFF',
				backgroundColor: '#2C7BFD',
				fill: '#FFFFFF',
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
		},
		label: {
			width: '100%', // Ensure the correct width for iOS Safari
			// color: '#676F8F',
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
		// '&:hover': {},
		// '&:active': {
		// 	boxShadow: 'none',
		// 	backgroundColor: '#0062cc',
		// 	borderColor: '#005cbf',
		// },
		// '&:focus': {
		// 	boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
		// },
	}),
)(ToggleButton);

const StyledToggleButtonGroup = withStyles((theme) => ({
	grouped: {
		margin: theme.spacing(2),
		border: 'none',
		'&:not(:first-child)': {
			borderRadius: theme.shape.borderRadius,
		},
		'&:first-child': {
			borderRadius: theme.shape.borderRadius,
		},
	},
}))(ToggleButtonGroup);

interface TimeFrameFilterProps {
	onChange: (filters: string[]) => void;
}

// export enum TimereFrameOptionsEnum {
// 	morning = 1,
// 	afternoon = 2,
// 	evening = 3,
// }

const TimeFrameFilter = ({ onChange }: TimeFrameFilterProps) => {
	const classes = useStyles();
	// const timeFrameOptions = ['morning', 'afternoon', 'evening'];
	const [formats, setFormats] = useState<string[]>([]);

	const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
		if (newFormats) {
			setFormats(newFormats);
			onChange(newFormats);
		}
	};

	// useEffect(() => {
	// 	console.log('useEffect');
	// 	onChange([]);
	// }, [onChange]);

	// const [alignment, setAlignment] = React.useState<string | null>('left');
	// const [buttonColor, setColor] = React.useState<string | null>('outlined');

	// const changeColor = () => {
	// 	setColor('container');
	// };

	// const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
	// 	setAlignment(newAlignment);
	// };

	return (
		// <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
		// 	<ToggleButton value="morning" aria-label="morning time">
		// 		<WbSunnyIcon />
		// 		mañana
		// 	</ToggleButton>
		// 	<ToggleButton value="afternoon" aria-label="afternoon time">
		// 		<Brightness4Icon />
		// 		tarde
		// 	</ToggleButton>
		// 	<ToggleButton value="evening" aria-label="evening time">
		// 		<Brightness2Icon />
		// 		noche
		// 	</ToggleButton>
		// </ToggleButtonGroup>
		<>
			{/* <div className={classes.imgWrapper}>
				<img src={filter} width={18} height={18} alt="filter frame icon" />
			</div>
			<ButtonGroup>
				<BootstrapButton
					className={classes.outlinedPrimary}
					size="small"
					variant="outlined"
					color="primary"
					startIcon={<WbSunnyIcon />}
				>
					{' '}
					Mañana
				</BootstrapButton>
				<BootstrapButton
					className={classes.outlinedPrimary}
					size="small"
					variant="outlined"
					color="primary"
					startIcon={<Brightness4Icon />}
				>
					{' '}
					Tarde
				</BootstrapButton>
				<BootstrapButton
					className={classes.outlinedPrimary}
					size="small"
					variant="outlined"
					color="primary"
					startIcon={<Brightness2Icon />}
				>
					{' '}
					Noche
				</BootstrapButton>
			</ButtonGroup> */}

			<div className={classes.imgWrapper}>
				<FilterIcon />
			</div>
			<StyledToggleButtonGroup size="small" value={formats} onChange={handleFormat} aria-label="text formatting">
				<BootstrapButton value="morning" aria-label="morning">
					<SunIcon /> <p>Mañana</p>
				</BootstrapButton>
				<BootstrapButton value="afternoon" aria-label="afternoon">
					<SunsetIcon /> <p>Tarde</p>
				</BootstrapButton>
				<BootstrapButton value="evening" aria-label="evening">
					<MoonIcon />
					<p>Noche</p>
				</BootstrapButton>
			</StyledToggleButtonGroup>
		</>
	);
};

export default TimeFrameFilter;
