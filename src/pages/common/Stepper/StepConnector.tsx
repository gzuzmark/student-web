import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import MuiStepConnector from '@material-ui/core/StepConnector';

const StepConnector = withStyles(({ palette, breakpoints }: Theme) =>
	createStyles({
		root: {
			padding: 0,
		},
		lineVertical: {
			borderLeftStyle: 'none',
			borderRightStyle: 'solid',
			minHeight: 59,
			marginRight: '26.5px',
		},
		alternativeLabel: {
			top: 19,
			left: 'calc(-50% + 17px)',
			right: 'calc(50% + 17px)',
		},
		line: {
			borderColor: palette.action.disabled,
			[breakpoints.up('lg')]: {
				padding: '0 46px 0 0',
				borderTopWidth: 2,
				borderRightWidth: 2,
				borderLeftWidth: 2,
			},
		},
	}),
)(MuiStepConnector);

export default StepConnector;
