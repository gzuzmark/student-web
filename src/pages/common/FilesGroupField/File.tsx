import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as FilledCloseIcon } from 'icons/filledClose.svg';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(() => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: '255px',
		backgroundColor: '#ffffff',
		padding: '8px 14px 8px 18px',
		marginBottom: '10px',
	},
	iconWrapper: {
		height: '20px',
		cursor: 'pointer',
	},
	progressBar: {
		height: '10px',
		borderRadius: '255px',
		marginBottom: '10px',
	},
}));

interface FileProps {
	fileName: string;
	isLoading: boolean;
	onRemove: () => void;
}

const File = ({ fileName, onRemove, isLoading }: FileProps) => {
	const classes = useStyles();

	return isLoading ? (
		<LinearProgress className={classes.progressBar} color="primary" />
	) : (
		<div className={classes.wrapper}>
			<Typography>{fileName}</Typography>
			<div className={classes.iconWrapper}>
				<FilledCloseIcon onClick={onRemove} />
			</div>
		</div>
	);
};

export default File;
