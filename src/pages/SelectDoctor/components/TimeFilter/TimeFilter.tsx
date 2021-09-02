import React from 'react';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness2Icon from '@material-ui/icons/Brightness2';
// import filter from 'icons/filter.png';
// import useStyles from './styles';

// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
// import { Button, withStyles } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/styles';

const BootstrapButton = withStyles({
	root: {
		width: '100px',
		textTransform: 'none',
		background: '#FFFFFF;',
		borderColor: '#E5EFFF',
		'&:hover': {},
		'&$selected': {
			color: '#FFFFFF',
			backgroundColor: '#2C7BFD',
		},
	},
	selected: {
		'&:hover': {},
	},
	'&:hover': {},
	'&:active': {
		boxShadow: 'none',
		backgroundColor: '#0062cc',
		borderColor: '#005cbf',
	},
	'&:focus': {
		boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
	},
})(ToggleButton);

const StyledToggleButtonGroup = withStyles((theme) => ({
	grouped: {
		margin: theme.spacing(0.5),
		border: 'none',
		'&:not(:first-child)': {
			borderRadius: theme.shape.borderRadius,
		},
		'&:first-child': {
			borderRadius: theme.shape.borderRadius,
		},
	},
}))(ToggleButtonGroup);

const TimeFrameFilter = () => {
	// const classes = useStyles();

	const [formats, setFormats] = React.useState(() => ['italic']);

	const handleFormat = (event: any, newFormats: any) => {
		setFormats(newFormats);
	};

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

			<StyledToggleButtonGroup size="small" value={formats} onChange={handleFormat} aria-label="text formatting">
				<BootstrapButton value="bold" aria-label="bold">
					<WbSunnyIcon /> Mañana
				</BootstrapButton>
				<BootstrapButton value="italic" aria-label="italic">
					<Brightness4Icon /> Tarde
				</BootstrapButton>
				<BootstrapButton value="underlined" aria-label="underlined">
					<Brightness2Icon /> Noche
				</BootstrapButton>
			</StyledToggleButtonGroup>
		</>
	);
};

export default TimeFrameFilter;
